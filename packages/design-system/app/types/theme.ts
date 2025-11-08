/**
 * Theme Types (Generated from UnoCSS Wrikka Preset)
 */

// Color Types
export type ColorVariant = 'normal' | 'active'
export type ColorCategory = 'background' | 'border' | 'danger' | 'info' | 'success' | 'warning'

export interface ThemeColor {
  normal: string
  active: string
}

export type ThemeColors = {
  [K in ColorCategory]: ThemeColor
}

// Size Types
export type SizeScale = 'sm' | 'md' | 'lg'

// Spacing
export type ThemeSpacing = {
  [K in SizeScale]: string
}

// Font Size
export interface FontSizeValue {
  fontSize: string
  lineHeight: string
}

export type ThemeFontSize = {
  [K in SizeScale]: FontSizeValue
}

// Border Radius
export type ThemeBorderRadius = {
  [K in SizeScale]: string
}

// Animation
export interface ThemeAnimation {
  keyframes: {
    'fade-in-up': string
    'fade-out': string
  }
  durations: {
    'fade-in-up': string
    'fade-out': string
  }
  timingFns: {
    'fade-in-up': string
    'fade-out': string
  }
}

// Complete Theme
export interface WrikkaTheme {
  colors: ThemeColors
  spacing: ThemeSpacing
  fontSize: ThemeFontSize
  borderRadius: ThemeBorderRadius
  animation: ThemeAnimation
}

// Theme Mode
export type ThemeMode = 'light' | 'dark' | 'auto'

// Helper Types
export type ColorKey = `${ColorCategory}-${ColorVariant}`
export type SpacingKey = `spacing-${SizeScale}`
export type FontSizeKey = `fontSize-${SizeScale}`
export type BorderRadiusKey = `borderRadius-${SizeScale}`
