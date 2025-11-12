import type { ThemeName, ColorPalette } from './core-types'

/**
 * Theme Names - รายชื่อ themes ทั้งหมด
 */
export const themeNames: ReadonlyArray<ThemeName> = ['default', 'ocean', 'forest', 'Thailand Night'] as const

/**
 * Color Palettes สำหรับแต่ละ Theme
 */
export const colorPalettes: Record<ThemeName, ColorPalette> = {
  default: {
    light: {
      background: { normal: '#ffffff', active: '#f5f5f5' },
      border: { normal: '#e5e5e5', active: '#d4d4d4' },
      primary: { normal: '#0ea5e9', active: '#0284c7' },
      danger: { normal: '#ef4444', active: '#dc2626' },
      info: { normal: '#3b82f6', active: '#2563eb' },
      success: { normal: '#10b981', active: '#059669' },
      warning: { normal: '#f59e0b', active: '#d97706' },
    },
    dark: {
      background: { normal: '#1a1a1a', active: '#262626' },
      border: { normal: '#404040', active: '#525252' },
      primary: { normal: '#38bdf8', active: '#0ea5e9' },
      danger: { normal: '#f87171', active: '#ef4444' },
      info: { normal: '#60a5fa', active: '#3b82f6' },
      success: { normal: '#34d399', active: '#10b981' },
      warning: { normal: '#fbbf24', active: '#f59e0b' },
    },
  },
  ocean: {
    light: {
      background: { normal: '#f0f9ff', active: '#e0f2fe' },
      border: { normal: '#bae6fd', active: '#7dd3fc' },
      primary: { normal: '#0284c7', active: '#0369a1' },
      danger: { normal: '#dc2626', active: '#b91c1c' },
      info: { normal: '#0891b2', active: '#0e7490' },
      success: { normal: '#059669', active: '#047857' },
      warning: { normal: '#ea580c', active: '#c2410c' },
    },
    dark: {
      background: { normal: '#082f49', active: '#0c4a6e' },
      border: { normal: '#075985', active: '#0369a1' },
      primary: { normal: '#22d3ee', active: '#06b6d4' },
      danger: { normal: '#f87171', active: '#ef4444' },
      info: { normal: '#22d3ee', active: '#06b6d4' },
      success: { normal: '#2dd4bf', active: '#14b8a6' },
      warning: { normal: '#fb923c', active: '#f97316' },
    },
  },
  forest: {
    light: {
      background: { normal: '#f0fdf4', active: '#dcfce7' },
      border: { normal: '#bbf7d0', active: '#86efac' },
      primary: { normal: '#16a34a', active: '#15803d' },
      danger: { normal: '#dc2626', active: '#b91c1c' },
      info: { normal: '#0891b2', active: '#0e7490' },
      success: { normal: '#10b981', active: '#059669' },
      warning: { normal: '#f59e0b', active: '#d97706' },
    },
    dark: {
      background: { normal: '#14532d', active: '#166534' },
      border: { normal: '#15803d', active: '#16a34a' },
      primary: { normal: '#4ade80', active: '#22c55e' },
      danger: { normal: '#f87171', active: '#ef4444' },
      info: { normal: '#22d3ee', active: '#06b6d4' },
      success: { normal: '#34d399', active: '#10b981' },
      warning: { normal: '#fbbf24', active: '#f59e0b' },
    },
  },
  'Thailand Night': {
    light: {
      background: { normal: '#fef3c7', active: '#fde68a' },
      border: { normal: '#fcd34d', active: '#fbbf24' },
      primary: { normal: '#d97706', active: '#b45309' },
      danger: { normal: '#dc2626', active: '#b91c1c' },
      info: { normal: '#0891b2', active: '#0e7490' },
      success: { normal: '#059669', active: '#047857' },
      warning: { normal: '#ea580c', active: '#c2410c' },
    },
    dark: {
      background: { normal: '#1e1b4b', active: '#312e81' },
      border: { normal: '#4338ca', active: '#6366f1' },
      primary: { normal: '#fbbf24', active: '#f59e0b' },
      danger: { normal: '#f87171', active: '#ef4444' },
      info: { normal: '#60a5fa', active: '#3b82f6' },
      success: { normal: '#34d399', active: '#10b981' },
      warning: { normal: '#fb923c', active: '#f97316' },
    },
  },
}

/**
 * Base Theme Configuration
 */
export const baseTheme = {
  animation: {
    durations: {
      'fade-in-up': '0.4s',
      'fade-out': '0.2s',
      'slide-in': '0.3s',
      'bounce': '0.6s',
    },
    keyframes: {
      'fade-in-up': '{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}',
      'fade-out': '{from{opacity:1}to{opacity:0}}',
      'slide-in': '{from{transform:translateX(-100%)}to{transform:translateX(0)}}',
      'bounce': '{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}',
    },
    timingFns: {
      'fade-in-up': 'cubic-bezier(0.16, 1, 0.3, 1)',
      'fade-out': 'ease-out',
      'slide-in': 'ease-out',
      'bounce': 'ease-in-out',
    },
  },
  borderRadius: {
    none: '0',
    sm: '0.25rem',
    md: '0.5rem',
    lg: '1rem',
    xl: '1.5rem',
    full: '9999px',
  },
  fontSize: {
    xs: ['0.75rem', { lineHeight: '1rem' }],
    sm: ['0.875rem', { lineHeight: '1.25rem' }],
    md: ['1rem', { lineHeight: '1.5rem' }],
    lg: ['1.25rem', { lineHeight: '1.75rem' }],
    xl: ['1.5rem', { lineHeight: '2rem' }],
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '2rem',
    xl: '3rem',
  },
}

/**
 * Default Theme (using CSS variables)
 */
export const defaultTheme = {
  ...baseTheme,
  colors: {
    background: {
      active: 'var(--background-active)',
      normal: 'var(--background-normal)',
    },
    border: {
      active: 'var(--border-active)',
      normal: 'var(--border-normal)',
    },
    primary: {
      active: 'var(--primary-active)',
      normal: 'var(--primary-normal)',
    },
    danger: {
      active: 'var(--danger-active)',
      normal: 'var(--danger-normal)',
    },
    info: {
      active: 'var(--info-active)',
      normal: 'var(--info-normal)',
    },
    success: {
      active: 'var(--success-active)',
      normal: 'var(--success-normal)',
    },
    warning: {
      active: 'var(--warning-active)',
      normal: 'var(--warning-normal)',
    },
  },
}

/**
 * Pre-installed Icon Collections
 */
export { PREINSTALLED_ICONS as preinstalledIcons } from './core-types'
export type { PreinstalledIcon } from './core-types'
