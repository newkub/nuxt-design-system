import type { UserConfig } from 'unocss'
import type { WrikkaThemeOptions } from './types'
import { createPresets } from './presets'

export { 
  defaultTheme, 
  baseTheme,
  colorPalettes,
  themeNames,
  preinstalledIcons,
  type ThemeName,
  type ColorPalette,
  type PreinstalledIcon
} from './theme'
export { wrikkaPreset } from './utils'
export type { WrikkaThemeOptions, ThemeName as ThemeNameType } from './types'

/**
 * Helper function to define Wrikka config with full autocomplete
 * Use this for better TypeScript IntelliSense
 * 
 * @example
 * ```ts
 * const config = defineWrikkaConfig({
 *   theme: 'Thailand Night',  // autocomplete works!
 *   mode: 'dark',              // autocomplete works!
 *   icons: ['mdi', 'logos'],   // autocomplete works!
 *   font: 'Noto Sans Thai'     // autocomplete works!
 * })
 * ```
 */
export function defineWrikkaConfig(options: WrikkaThemeOptions): WrikkaThemeOptions {
  return options
}

/**
 * Wrikka UnoCSS Preset with full TypeScript autocomplete support
 * 
 * @param options - Configuration options with autocomplete
 * @param options.theme - Theme variant: 'default' | 'ocean' | 'forest' | 'Thailand Night'
 * @param options.mode - Color mode: 'light' | 'dark' | 'auto'
 * @param options.icons - Icon collections: ['mdi', 'logos', 'heroicons', 'lucide', 'carbon', 'tabler']
 * @param options.font - Font family: 'Noto Sans Thai' | 'Inter' | 'Roboto' | 'Kanit' | 'Sarabun'
 * @param options.typography - Enable typography preset
 * @param options.attributify - Enable attributify mode
 * @param options.prefix - Prefix for utility classes
 * @param options.presets - Advanced preset configuration
 * @param options.themeConfig - Advanced theme configuration
 * @param options.rules - Custom UnoCSS rules
 * @param options.shortcuts - Custom UnoCSS shortcuts
 * @param options.safelist - Safelist classes
 * @param options.features - Feature flags
 * 
 * @returns UnoCSS UserConfig
 * 
 * @example Flat Options (แนะนำ - มี autocomplete ทุกอัน)
 * ```ts
 * import { defineConfig } from 'unocss'
 * import { presetWrikka } from './app/plugins/wrikka-uno-preset'
 * 
 * export default defineConfig(
 *   presetWrikka({
 *     theme: 'Thailand Night',
 *     mode: 'dark',
 *     icons: ['mdi', 'logos'],
 *     font: 'Noto Sans Thai'
 *   })
 * )
 * ```
 * 
 * @example Advanced Configuration
 * ```ts
 * export default defineConfig(
 *   presetWrikka({
 *     presets: {
 *       icons: {
 *         collections: { mdi: () => import('@iconify-json/mdi/icons.json') },
 *         scale: 1.5
 *       },
 *       webFonts: {
 *         provider: 'google',
 *         fonts: { sans: 'Inter:400,500,600,700' }
 *       }
 *     },
 *     themeConfig: {
 *       colors: { brand: '#00DC82' }
 *     }
 *   })
 * )
 * ```
 * 
 * @see docs/WRIKKA-UNO-PRESET-USAGE.md สำหรับตัวอย่างเพิ่มเติม
 */
export function presetWrikka<T extends WrikkaThemeOptions>(options?: T): UserConfig {
  const opts = options || {} as WrikkaThemeOptions
  const {
    /**
     * Custom UnoCSS rules
     */
    rules = [],
    /**
     * Custom UnoCSS shortcuts
     */
    shortcuts = [],
    /**
     * Safelist classes
     */
    safelist = []
  } = opts

  return {
    presets: createPresets(opts),
    rules,
    shortcuts,
    safelist: Array.isArray(safelist) ? safelist : [safelist].filter(Boolean)
  }
}
