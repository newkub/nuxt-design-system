import type { Preset } from 'unocss'
import { defaultTheme } from './theme'

/**
 * สร้าง Wrikka Preset พื้นฐาน
 */
export function wrikkaPreset(): Preset {
  return {
    name: 'wrikka-preset',
    theme: {
      animation: defaultTheme.animation,
      borderRadius: {
        ...defaultTheme.borderRadius,
      },
      colors: {
        ...defaultTheme.colors,
      },
      fontSize: {
        ...defaultTheme.fontSize,
      },
      spacing: {
        ...defaultTheme.spacing,
      },
    },
  }
}
