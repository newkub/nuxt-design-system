import type { WrikkaThemeOptions } from './core-types'
import type { AutoReexportConfig } from '../../app/plugins/re-export/types'

/**
 * Design System Module Options
 * Type-safe configuration for Wrikka Design System (Nuxt Module)
 * 
 * @note นี่คือ options สำหรับ Nuxt module ไม่ใช่ UnoCSS config
 */
export interface DesignSystemModuleOptions {
  /**
   * เปิด/ปิด Design System Module
   * @default true
   */
  enabled?: boolean

  /**
   * Path to theme configuration file
   * @default './wrikka-theme.config.ts'
   */
  configPath?: string

  /**
   * UnoCSS Wrikka Preset Configuration
   */
  unocss?: WrikkaThemeOptions

  /**
   * Auto Re-export Configuration
   */
  reexport?: AutoReexportConfig & {
    /**
     * เปิด/ปิด auto-reexport
     * @default true
     */
    enabled?: boolean
  }

  /**
   * Component Auto-import Configuration
   */
  components?: {
    /**
     * เปิด/ปิด component auto-import
     * @default true
     */
    enabled?: boolean
    
    /**
     * Component directories
     * @default ['~/app/components']
     */
    dirs?: Array<string | { path: string; global?: boolean; pathPrefix?: boolean }>
    
    /**
     * Global components
     * @default true
     */
    global?: boolean
  }

  /**
   * Theme Configuration
   */
  theme?: {
    /**
     * CSS file path
     * @default './app/assets/theme.css'
     */
    cssPath?: string
    
    /**
     * เปิด/ปิด color mode
     * @default true
     */
    colorMode?: boolean
    
    /**
     * Color mode preferences
     */
    colorModeOptions?: {
      preference?: 'system' | 'light' | 'dark'
      fallback?: 'light' | 'dark'
      classSuffix?: string
      storageKey?: string
    }
  }

  /**
   * Development Tools
   */
  devtools?: {
    /**
     * เปิด/ปิด Nuxt DevTools
     * @default true
     */
    enabled?: boolean
    
    /**
     * TypeScript strict mode
     * @default true
     */
    strictTypeScript?: boolean
  }
}

export const defaultDesignSystemOptions: Required<DesignSystemModuleOptions> = {
  enabled: true,
  configPath: './wrikka-theme.config.ts',
  
  unocss: {
    theme: 'default',
    mode: 'auto',
    icons: ['mdi', 'logos', 'heroicons', 'lucide', 'carbon', 'tabler'],
    font: 'Inter',
    typography: true,
    attributify: false
  },
  
  reexport: {
    enabled: true,
    basePath: 'app/components',
    folders: [],
    exclude: ['node_modules', '.nuxt', 'dist'],
    extensions: ['.vue', '.ts', '.tsx'],
    outputFileName: 'index.ts',
    exportStyle: 'default',
    addHeader: true,
    headerText: '',
    sortAlphabetically: true,
    watch: true,
    verbose: false,
    generateRootIndex: true,
    rootIndexPath: 'app'
  },
  
  components: {
    enabled: true,
    dirs: ['~/app/components'],
    global: true
  },
  
  theme: {
    cssPath: './app/assets/theme.css',
    colorMode: true,
    colorModeOptions: {
      preference: 'system',
      fallback: 'light',
      classSuffix: '',
      storageKey: 'nuxt-color-mode'
    }
  },
  
  devtools: {
    enabled: true,
    strictTypeScript: true
  }
}
