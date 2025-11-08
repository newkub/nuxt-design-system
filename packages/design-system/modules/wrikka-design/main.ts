/**
 * Wrikka Design - Main Export
 * สำหรับใช้งานใน wrikka-theme.config.ts และ uno.config.ts
 */

import type { UserConfig } from 'unocss'
import { defineConfig as unoDefineConfig } from 'unocss'
import type { WrikkaThemeOptions } from './core-types'
import { presetWrikka } from './preset'

// Re-export types จาก core-types (single source of truth)
export type {
  // Main config
  WrikkaThemeOptions,
  
  // Theme types
  ThemeName,
  ColorMode,
  ColorPair,
  ColorSet,
  ColorPalette,
  PreinstalledIcon,
  IconCollection,
  FontFamily,
  
  // Config types
  IconPresetConfig,
  WebFontsConfig,
  PresetConfig,
  ThemeConfig,
  AnimationConfig,
  FeatureFlags
} from './core-types'

// Re-export type guards
export { isThemeName, isColorMode } from './core-types'

// Re-export theme data
export {
  themeNames,
  colorPalettes,
  baseTheme,
  defaultTheme,
  preinstalledIcons
} from './theme'

// Re-export preset
export { presetWrikka } from './preset'

/**
 * Custom config type ที่รองรับทั้ง UnoCSS และ Wrikka format
 */
type WrikkaConfigInput = UserConfig | { unocss: UserConfig }

/**
 * Helper function สำหรับ type-safe configuration
 * รองรับ 2 รูปแบบ:
 * 
 * @example
 * ```ts
 * // รูปแบบที่ 1: UnoCSS standard
 * export default defineConfig(
 *   presetWrikka({
 *     theme: 'Thailand Night',
 *     mode: 'dark'
 *   })
 * )
 * 
 * // รูปแบบที่ 2: Wrikka wrapper
 * export default defineConfig({
 *   unocss: presetWrikka({
 *     theme: 'Thailand Night',
 *     mode: 'dark'
 *   })
 * })
 * ```
 */
export function defineConfig(config: WrikkaConfigInput): UserConfig {
  // ถ้าเป็นรูปแบบ { unocss: ... } ให้ extract unocss config
  if ('unocss' in config && config.unocss) {
    return unoDefineConfig(config.unocss)
  }
  
  // รูปแบบปกติ (UnoCSS config)
  return unoDefineConfig(config as UserConfig)
}

/**
 * Helper function สำหรับ Wrikka config พร้อม autocomplete
 * 
 * @example
 * ```ts
 * const options = defineWrikkaConfig({
 *   theme: 'Thailand Night',  // autocomplete!
 *   mode: 'dark',
 *   icons: ['mdi'],
 *   font: 'Noto Sans Thai'
 * })
 * ```
 */
export function defineWrikkaConfig<T extends WrikkaThemeOptions>(options: T): T {
  return options
}
