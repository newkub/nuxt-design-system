import { computed, ref } from 'vue'
import { themeNames, colorPalettes, baseTheme } from '../../modules/wrikka-design/theme'
import type { ThemeName } from '../../modules/wrikka-design/core-types'

// Nuxt auto-imports
declare const useState: typeof import('#app')['useState']

/**
 * Theme State
 */
const currentThemeVariant = useState<ThemeName>('wrikka-theme-variant', () => 'default')
const currentMode = useState<'light' | 'dark' | 'auto'>('wrikka-theme-mode', () => 'auto')

/**
 * useTheme - Type-safe theme composable
 * รองรับ 4 themes (default, ocean, forest, Thailand Night) x 2 modes (light, dark)
 * 
 * @example
 * ```ts
 * const theme = useTheme()
 * 
 * // Switch theme variant
 * theme.setThemeVariant('ocean')
 * 
 * // Switch mode
 * theme.setMode('dark')
 * 
 * // Get current colors
 * const colors = theme.colors()
 * console.log(colors.primary.normal) // '#0284c7' (ocean theme)
 * 
 * // Toggle dark mode
 * theme.toggleMode()
 * ```
 */
export const useTheme = () => {
  const themeVariant = computed(() => currentThemeVariant.value)
  const mode = computed(() => currentMode.value)

  /**
   * Get current effective mode (resolve 'auto')
   */
  const effectiveMode = computed(() => {
    if (mode.value === 'auto') {
      if (import.meta.client) {
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
      }
      return 'light'
    }
    return mode.value
  })

  /**
   * Get current color palette
   */
  const colors = computed(() => {
    const variant = themeVariant.value as ThemeName
    const palette = colorPalettes[variant]
    const modeKey = effectiveMode.value as 'light' | 'dark'
    return palette[modeKey]
  })

  /**
   * Get spacing values
   */
  const spacing = baseTheme.spacing

  /**
   * Get font size values
   */
  const fontSize = baseTheme.fontSize

  /**
   * Get border radius values
   */
  const borderRadius = baseTheme.borderRadius

  /**
   * Get animation values
   */
  const animation = baseTheme.animation

  /**
   * Set theme variant
   */
  const setThemeVariant = (variant: ThemeName) => {
    currentThemeVariant.value = variant

    if (import.meta.client) {
      document.documentElement.setAttribute('data-theme', variant)
      localStorage.setItem('wrikka-theme-variant', variant)
    }
  }

  /**
   * Set theme mode
   */
  const setMode = (newMode: 'light' | 'dark' | 'auto') => {
    currentMode.value = newMode

    if (import.meta.client) {
      const html = document.documentElement
      
      if (newMode === 'dark') {
        html.classList.add('dark')
        localStorage.setItem('wrikka-theme-mode', 'dark')
      } else if (newMode === 'light') {
        html.classList.remove('dark')
        localStorage.setItem('wrikka-theme-mode', 'light')
      } else {
        // Auto mode - follow system preference
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
        if (prefersDark) {
          html.classList.add('dark')
        } else {
          html.classList.remove('dark')
        }
        localStorage.setItem('wrikka-theme-mode', 'auto')
      }
    }
  }

  /**
   * Toggle between light and dark
   */
  const toggleMode = () => {
    const newMode = effectiveMode.value === 'dark' ? 'light' : 'dark'
    setMode(newMode)
  }

  /**
   * Generate CSS variables for current theme
   */
  const cssVars = computed(() => {
    const vars: Record<string, string> = {}
    const currentColors = colors.value

    // Colors
    Object.entries(currentColors).forEach(([category, colorPair]) => {
      if (typeof colorPair === 'object' && colorPair && 'normal' in colorPair && 'active' in colorPair) {
        vars[`--${category}-normal`] = String(colorPair.normal)
        vars[`--${category}-active`] = String(colorPair.active)
      }
    })

    // Spacing
    Object.entries(spacing).forEach(([size, value]) => {
      vars[`--spacing-${size}`] = value
    })

    // Font Size
    Object.entries(fontSize).forEach(([size, value]) => {
      if (Array.isArray(value) && value.length > 0) {
        vars[`--font-size-${size}`] = String(value[0])
        if (value.length > 1 && typeof value[1] === 'object' && value[1] && 'lineHeight' in value[1]) {
          vars[`--line-height-${size}`] = String(value[1].lineHeight)
        }
      }
    })

    // Border Radius
    Object.entries(borderRadius).forEach(([size, value]) => {
      vars[`--border-radius-${size}`] = value
    })

    return vars
  })

  /**
   * Initialize from localStorage
   */
  if (import.meta.client) {
    const savedVariant = localStorage.getItem('wrikka-theme-variant') as ThemeName | null
    const savedMode = localStorage.getItem('wrikka-theme-mode') as 'light' | 'dark' | 'auto' | null

    if (savedVariant && themeNames.includes(savedVariant)) {
      setThemeVariant(savedVariant)
    }

    if (savedMode) {
      setMode(savedMode)
    } else {
      setMode('auto')
    }
  }

  return {
    // State
    themeVariant,
    mode,
    effectiveMode,
    
    // Getters
    colors,
    spacing,
    fontSize,
    borderRadius,
    animation,
    
    // CSS
    cssVars,
    
    // Actions
    setThemeVariant,
    setMode,
    toggleMode,
    
    // Available themes
    availableThemes: themeNames,
  }
}

/**
 * Theme utilities
 */
export const themeUtils = {
  /**
   * Check if dark mode is active
   */
  isDark: () => {
    if (import.meta.client) {
      return document.documentElement.classList.contains('dark')
    }
    return false
  },

  /**
   * Get system preference
   */
  getSystemPreference: (): 'light' | 'dark' => {
    if (import.meta.client) {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    }
    return 'light'
  },

  /**
   * Get current theme variant from DOM
   */
  getCurrentThemeVariant: (): ThemeName => {
    if (import.meta.client) {
      const theme = document.documentElement.getAttribute('data-theme') as ThemeName | null
      return theme && themeNames.includes(theme) ? theme : 'default'
    }
    return 'default'
  }
}
