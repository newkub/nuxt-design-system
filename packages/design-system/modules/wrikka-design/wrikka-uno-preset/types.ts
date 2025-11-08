import type { Rule, Shortcut } from 'unocss'
import type { IconifyJSON } from '@iconify/types'

/**
 * Theme Names
 */
export type ThemeName = 'default' | 'ocean' | 'forest' | 'Thailand Night'

/**
 * Wrikka Theme Options
 * Type-safe configuration with full autocomplete support
 */
export interface WrikkaThemeOptions {
  // General
  prefix?: string
  mode?: 'light' | 'dark' | 'auto'
  
  /**
   * Theme (color scheme)
   * @example 'default' | 'ocean' | 'forest' | 'Thailand Night'
   */
  theme?: ThemeName
  
  // Flat Options (สำหรับ autocomplete ง่ายๆ)
  /** 
   * Icon collections to load
   * @example ['mdi', 'logos', 'heroicons', 'carbon', 'tabler']
   */
  icons?: Array<
    | 'mdi' | 'logos' | 'heroicons' | 'carbon' | 'tabler'
    | 'lucide' | 'ph' | 'ri' | 'solar' | 'mingcute'
    | 'material-symbols' | 'iconamoon' | 'fluent'
    | string // allow custom
  >
  /** 
   * Font family to use
   * @example 'Noto Sans Thai' | 'Inter' | 'Roboto'
   */
  font?: 
    | 'Noto Sans Thai' | 'Inter' | 'Roboto' | 'Poppins'
    | 'Open Sans' | 'Lato' | 'Montserrat' | 'Source Sans Pro'
    | 'Kanit' | 'Sarabun' | 'Prompt' | 'Sukhumvit Set'
    | string // allow custom
  /** Typography preset enabled */
  typography?: boolean
  /** Attributify mode enabled */
  attributify?: boolean
  
  // Presets (Advanced)
  presets?: {
    uno?: boolean
    icons?: boolean | {
      collections?: Record<string, () => Promise<IconifyJSON>>
      scale?: number
      cdn?: string
      extraProperties?: Record<string, string>
    }
    attributify?: boolean
    typography?: boolean
    webFonts?: boolean | {
      provider?: 'google' | 'bunny' | 'fontshare'
      fonts?: Record<string, string | string[]>
    }
  }
  
  // Theme Config (Advanced)
  themeConfig?: {
    colors?: Record<string, Record<string, string> | string>
    spacing?: Record<string, string>
    fontSize?: Record<string, string | [string, { lineHeight?: string; letterSpacing?: string }]>
    fontFamily?: Record<string, string | string[]>
    fontWeight?: Record<string, string | number>
    lineHeight?: Record<string, string | number>
    letterSpacing?: Record<string, string>
    borderRadius?: Record<string, string>
    borderWidth?: Record<string, string>
    boxShadow?: Record<string, string>
    opacity?: Record<string, string>
    zIndex?: Record<string, string | number>
    breakpoints?: Record<string, string>
    screens?: Record<string, string>
    container?: {
      center?: boolean
      padding?: string | Record<string, string>
      screens?: Record<string, string>
    }
  }
  
  // Animation
  animation?: {
    keyframes?: Record<string, string>
    durations?: Record<string, string>
    timingFunctions?: Record<string, string>
    counts?: Record<string, string>
  }
  
  // Custom
  rules?: Rule[]
  shortcuts?: Shortcut[]
  safelist?: string | string[]
  
  // Features
  features?: {
    darkMode?: 'class' | 'media'
    rtl?: boolean
    important?: boolean | string
    variablePrefix?: string
  }
}
