import type { UserConfig, Preset } from 'unocss'
import { presetIcons, presetWind4, presetAttributify, presetWebFonts, presetTypography } from 'unocss'
import type { WrikkaThemeOptions } from './core-types'
import { defaultTheme } from './theme'

export function createPresets(options: WrikkaThemeOptions): Preset[] {
  const {
    prefix = '',
    presets: presetsConfig = {},
    themeConfig: themeConfigOption = {},
    animation: animationConfig = {},
    features = {},
    // Flat options
    icons: iconsFlat,
    font: fontFlat,
    typography: typographyFlat,
    attributify: attributifyFlat,
    theme: themeVariant
  } = options

  const presets: Preset[] = []

  // Preset UnoCSS (default)
  if (presetsConfig.uno !== false) {
    presets.push(presetWind4({
      dark: features.darkMode === 'media' ? 'media' : 'class',
      prefix
    }))
  }

  // Preset Icons
  const shouldLoadIcons = iconsFlat || presetsConfig.icons !== false
  if (shouldLoadIcons) {
    const iconsConfig = typeof presetsConfig.icons === 'object' ? presetsConfig.icons : {}
    
    // Handle flat icons array (auto-load collections)
    const collectionsToLoad = iconsFlat 
      ? iconsFlat.reduce((acc, name) => {
          acc[name] = () => import(`@iconify-json/${name}/icons.json`).then(m => m.default)
          return acc
        }, {} as Record<string, () => Promise<any>>)
      : iconsConfig.collections
    
    presets.push(
      presetIcons({
        scale: iconsConfig.scale || 1.2,
        cdn: iconsConfig.cdn || 'https://esm.sh/',
        collections: collectionsToLoad,
        extraProperties: iconsConfig.extraProperties
      })
    )
  }

  // Preset Attributify
  if (attributifyFlat || presetsConfig.attributify) {
    presets.push(presetAttributify({ prefix }))
  }

  // Preset Typography
  if (typographyFlat || presetsConfig.typography) {
    presets.push(presetTypography())
  }

  // Preset Web Fonts
  const shouldLoadWebFonts = fontFlat || presetsConfig.webFonts
  if (shouldLoadWebFonts) {
    const fontsConfig = typeof presetsConfig.webFonts === 'object' ? presetsConfig.webFonts : {}
    
    // Handle flat font option
    const fonts = fontFlat
      ? { sans: fontFlat }
      : fontsConfig.fonts || {
          sans: 'Inter:400,500,600,700',
          mono: 'Fira Code:400,500'
        }
    
    presets.push(presetWebFonts({
      provider: fontsConfig.provider || 'google',
      fonts
    }))
  }

  // Wrikka Custom Theme Preset
  presets.push({
    name: 'wrikka-custom-theme',
    theme: {
      colors: {
        ...defaultTheme.colors,
        ...themeConfigOption.colors
      },
      spacing: {
        ...defaultTheme.spacing,
        ...themeConfigOption.spacing
      },
      fontSize: {
        ...defaultTheme.fontSize,
        ...themeConfigOption.fontSize
      },
      fontFamily: themeConfigOption.fontFamily,
      fontWeight: themeConfigOption.fontWeight,
      lineHeight: themeConfigOption.lineHeight,
      letterSpacing: themeConfigOption.letterSpacing,
      borderRadius: {
        ...defaultTheme.borderRadius,
        ...themeConfigOption.borderRadius
      },
      borderWidth: themeConfigOption.borderWidth,
      boxShadow: themeConfigOption.boxShadow,
      opacity: themeConfigOption.opacity,
      zIndex: themeConfigOption.zIndex,
      breakpoints: themeConfigOption.breakpoints,
      screens: themeConfigOption.screens,
      container: themeConfigOption.container,
      animation: {
        keyframes: {
          ...defaultTheme.animation.keyframes,
          ...animationConfig.keyframes
        },
        durations: {
          ...defaultTheme.animation.durations,
          ...animationConfig.durations
        },
        timingFunctions: {
          ...defaultTheme.animation.timingFns,
          ...animationConfig.timingFunctions
        },
        counts: animationConfig.counts
      }
    }
  })

  return presets
}

/**
 * Wrikka UnoCSS Preset
 */
export function presetWrikka<T extends WrikkaThemeOptions>(options?: T): UserConfig {
  const opts = options || {} as WrikkaThemeOptions
  const {
    rules = [],
    shortcuts = [],
    safelist = []
  } = opts

  return {
    presets: createPresets(opts),
    rules,
    shortcuts,
    safelist: Array.isArray(safelist) ? safelist : [safelist].filter(Boolean)
  }
}
