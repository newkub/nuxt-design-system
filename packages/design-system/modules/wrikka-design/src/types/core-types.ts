/**
 * Core Types สำหรับ Wrikka Design System
 * รวม types ทั้งหมดไว้ที่เดียว เพื่อหลีกเลี่ยงการซ้ำซ้อน
 */

import type { Rule, Shortcut } from 'unocss'
import type { IconifyJSON } from '@iconify/types'

// ==================== Theme Types ====================

/**
 * Theme Names - รายชื่อ themes ที่มี
 */
export type ThemeName = 'default' | 'ocean' | 'forest' | 'Thailand Night'

/**
 * Color Mode
 */
export type ColorMode = 'light' | 'dark' | 'auto'

/**
 * Color Pair - สีปกติและ active
 */
export interface ColorPair {
  normal: string
  active: string
}

/**
 * Color Set - ชุดสีทั้งหมดใน theme
 */
export interface ColorSet {
  background: ColorPair
  border: ColorPair
  primary: ColorPair
  danger: ColorPair
  info: ColorPair
  success: ColorPair
  warning: ColorPair
}

/**
 * Color Palette - Light + Dark modes
 */
export interface ColorPalette {
  light: ColorSet
  dark: ColorSet
}

/**
 * Pre-installed Icon Collections
 */
export const PREINSTALLED_ICONS = [
  'mdi',
  'logos',
  'heroicons',
  'lucide',
  'carbon',
  'tabler',
] as const

export type PreinstalledIcon = typeof PREINSTALLED_ICONS[number]

/**
 * Popular Icon Collections (with autocomplete)
 */
export type IconCollection =
  | PreinstalledIcon
  | 'ph' | 'ri' | 'solar' | 'mingcute'
  | 'material-symbols' | 'iconamoon' | 'fluent'
  | string // allow custom

/**
 * Popular Font Families (with autocomplete)
 */
export type FontFamily =
  | 'Noto Sans Thai' | 'Inter' | 'Roboto' | 'Poppins'
  | 'Open Sans' | 'Lato' | 'Montserrat' | 'Source Sans Pro'
  | 'Kanit' | 'Sarabun' | 'Prompt' | 'Sukhumvit Set'
  | string // allow custom

// ==================== UnoCSS Configuration Types ====================

/**
 * Icon Preset Configuration
 */
export interface IconPresetConfig {
  collections?: Record<string, () => Promise<IconifyJSON>>
  scale?: number
  cdn?: string
  extraProperties?: Record<string, string>
}

/**
 * Web Fonts Preset Configuration
 */
export interface WebFontsConfig {
  provider?: 'google' | 'bunny' | 'fontshare'
  fonts?: Record<string, string | string[]>
}

/**
 * Preset Configuration (Advanced)
 */
export interface PresetConfig {
  uno?: boolean
  icons?: boolean | IconPresetConfig
  attributify?: boolean
  typography?: boolean
  webFonts?: boolean | WebFontsConfig
}

/**
 * Theme Configuration (Advanced)
 */
export interface ThemeConfig {
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

/**
 * Animation Configuration
 */
export interface AnimationConfig {
  keyframes?: Record<string, string>
  durations?: Record<string, string>
  timingFunctions?: Record<string, string>
  counts?: Record<string, string>
}

/**
 * Feature Flags
 */
export interface FeatureFlags {
  darkMode?: 'class' | 'media'
  rtl?: boolean
  important?: boolean | string
  variablePrefix?: string
}

// ==================== Main Configuration Type ====================

/**
 * Wrikka Theme Options
 * Type-safe configuration with full autocomplete support
 * 
 * @example
 * ```ts
 * const config: WrikkaThemeOptions = {
 *   theme: 'Thailand Night',
 *   mode: 'dark',
 *   icons: ['mdi', 'logos'],
 *   font: 'Noto Sans Thai'
 * }
 * ```
 */
export interface WrikkaThemeOptions {
  // ==================== General ====================
  
  /**
   * Class prefix for utilities
   * @default ''
   */
  prefix?: string
  
  /**
   * Color mode
   * @default 'auto'
   */
  mode?: ColorMode
  
  /**
   * Theme variant
   * @default 'default'
   */
  theme?: ThemeName
  
  // ==================== Flat Options ====================
  
  /**
   * Icon collections to load
   * @example ['mdi', 'logos', 'heroicons']
   */
  icons?: IconCollection[]
  
  /**
   * Font family to use
   * @example 'Noto Sans Thai'
   */
  font?: FontFamily
  
  /**
   * Enable typography preset
   * @default false
   */
  typography?: boolean
  
  /**
   * Enable attributify mode
   * @default false
   */
  attributify?: boolean
  
  // ==================== Advanced Options ====================
  
  /**
   * Preset configurations
   */
  presets?: PresetConfig
  
  /**
   * Theme configuration
   */
  themeConfig?: ThemeConfig
  
  /**
   * Animation configuration
   */
  animation?: AnimationConfig
  
  /**
   * Feature flags
   */
  features?: FeatureFlags
  
  // ==================== Custom ====================
  
  /**
   * Custom UnoCSS rules
   */
  rules?: Rule[]
  
  /**
   * Custom UnoCSS shortcuts
   */
  shortcuts?: Shortcut[]
  
  /**
   * Safelist classes
   */
  safelist?: string | string[]
}

// ==================== Type Guards ====================

/**
 * Check if value is valid ThemeName
 */
export function isThemeName(value: unknown): value is ThemeName {
  return typeof value === 'string' && 
    ['default', 'ocean', 'forest', 'Thailand Night'].includes(value)
}

/**
 * Check if value is valid ColorMode
 */
export function isColorMode(value: unknown): value is ColorMode {
  return typeof value === 'string' && 
    ['light', 'dark', 'auto'].includes(value)
}
