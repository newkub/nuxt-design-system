import { defineNuxtModule, addTemplate, createResolver, installModule, useLogger, addVitePlugin, addServerPlugin } from '@nuxt/kit'
import { presetWrikka } from './preset'
import type { DesignSystemModuleOptions } from './types'
import { defaultDesignSystemOptions } from './types'
import { readFileSync, existsSync } from 'node:fs'
import { resolve } from 'node:path'

// Export module options type
export type { DesignSystemModuleOptions } from './types'

/**
 * Wrikka Design System Module
 * 
 * @example
 * ```ts
 * export default defineNuxtConfig({
 *   modules: ['./modules/design-system'],
 *   
 *   designSystem: {
 *     unocss: {
 *       theme: 'Thailand Night',
 *       mode: 'dark',
 *       icons: ['mdi', 'logos'],
 *       font: 'Noto Sans Thai'
 *     },
 *     reexport: {
 *       folders: ['auth', 'base', 'form']
 *     }
 *   }
 * })
 * ```
 */
export default defineNuxtModule<DesignSystemModuleOptions>({
  meta: {
    name: 'wrikka-design-system',
    configKey: 'designSystem',
    compatibility: {
      nuxt: '^3.0.0 || ^4.0.0'
    }
  },
  
  defaults: defaultDesignSystemOptions,
  
  async setup(options, nuxt) {
    const logger = useLogger('wrikka-design-system')
    const resolver = createResolver(import.meta.url)
    
    // ตรวจสอบว่า module enabled หรือไม่
    if (options.enabled === false) {
      logger.info('Module disabled')
      return
    }

    // โหลด wrikka-theme.config.ts ถ้ามี
    const themeConfigPath = resolve(nuxt.options.rootDir, 'wrikka-theme.config.ts')
    let themeConfigExists = false
    
    if (existsSync(themeConfigPath)) {
      themeConfigExists = true
      logger.info('📄 Found wrikka-theme.config.ts')
    }

    // Header
    console.log('\n')
    logger.success('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
    logger.success('  🎨  Wrikka Design System                      ')
    logger.success('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
    console.log('\n')

    // 1. Setup UnoCSS with Wrikka Preset
    if (options.unocss || themeConfigExists) {
      logger.info('📦 UnoCSS Wrikka Preset')
      
      if (themeConfigExists) {
        logger.info(`   Config: wrikka-theme.config.ts`)
      } else {
        logger.info(`   Theme: ${options.unocss?.theme || 'default'}`)
        logger.info(`   Mode: ${options.unocss?.mode || 'auto'}`)
        logger.info(`   Icons: ${(options.unocss?.icons || []).join(', ') || 'none'}`)
        logger.info(`   Font: ${options.unocss?.font || 'system'}`)
      }
      
      // เพิ่ม UnoCSS module ถ้ายังไม่มี
      if (!nuxt.options.modules.includes('@unocss/nuxt')) {
        await installModule('@unocss/nuxt')
      }
      
      // Hook: config:resovled - ใช้ wrikka-theme.config.ts ถ้ามี
      nuxt.hook('config:resolved', () => {
        if (themeConfigExists) {
          logger.info('🔗 Linking wrikka-theme.config.ts to UnoCSS')
        }
      })
    }

    // 2. Setup Components
    if (options.components?.enabled !== false) {
      logger.info('📦 Component Auto-import')
      logger.info(`   Global: ${options.components?.global !== false ? 'enabled' : 'disabled'}`)
      
      nuxt.options.components = nuxt.options.components || { dirs: [] }
      
      if (Array.isArray(options.components?.dirs)) {
        options.components.dirs.forEach(dir => {
          if (typeof dir === 'string') {
            nuxt.options.components.dirs.push({
              path: resolver.resolve(dir),
              global: options.components?.global ?? true,
              pathPrefix: false
            })
          } else {
            nuxt.options.components.dirs.push({
              path: resolver.resolve(dir.path),
              global: dir.global ?? options.components?.global ?? true,
              pathPrefix: dir.pathPrefix ?? false
            })
          }
        })
      }
      
      nuxt.options.components.global = options.components?.global ?? true
    }

    // 4. Setup Theme CSS
    if (options.theme?.cssPath) {
      logger.info('🎨 Theme CSS')
      logger.info(`   Path: ${options.theme.cssPath}`)
      
      nuxt.options.css = nuxt.options.css || []
      nuxt.options.css.push('@unocss/reset/tailwind-compat.css')
      nuxt.options.css.push(resolve(nuxt.options.rootDir, options.theme.cssPath))
    }

    // 5. Setup Color Mode
    if (options.theme?.colorMode !== false) {
      logger.info('🌙 Color Mode')
      logger.info(`   Preference: ${options.theme?.colorModeOptions?.preference || 'system'}`)
      
      // เพิ่ม color-mode module
      if (!nuxt.options.modules.includes('@nuxtjs/color-mode')) {
        await installModule('@nuxtjs/color-mode', {
          preference: options.theme?.colorModeOptions?.preference || 'system',
          fallback: options.theme?.colorModeOptions?.fallback || 'light',
          classSuffix: options.theme?.colorModeOptions?.classSuffix || '',
          storageKey: options.theme?.colorModeOptions?.storageKey || 'nuxt-color-mode',
          classPrefix: '',
          componentName: 'ColorScheme',
          globalName: '__NUXT_COLOR_MODE__',
          hid: 'nuxt-color-mode-script',
          storage: 'localStorage'
        })
      }
    }

    // 6. Setup DevTools
    if (options.devtools?.enabled !== false) {
      logger.info('🛠️  DevTools')
      logger.info(`   TypeScript Strict: ${options.devtools?.strictTypeScript !== false ? 'enabled' : 'disabled'}`)
      
      nuxt.options.devtools = {
        enabled: true
      }
      
      if (options.devtools?.strictTypeScript !== false) {
        nuxt.options.typescript = {
          strict: true
        }
      }
    }

    // 7. Add Type Declarations & TypeScript Config
    nuxt.hook('prepare:types', ({ references, tsConfig }) => {
      // Add design-system types
      references.push({
        path: resolver.resolve('../../types/design-system.d.ts')
      })
      
      // Add wdesign.json to project references
      tsConfig.references = tsConfig.references || []
      const hasWdesign = tsConfig.references.some(
        (ref) => ref.path === './wdesign.json'
      )
      
      if (!hasWdesign) {
        tsConfig.references.push({
          path: './wdesign.json'
        })
      }
    })
    
    // 7.1. Generate .nuxt/wdesign.json from template
    const templatePath = resolve(nuxt.options.rootDir, 'tsconfig.wdesign.json')
    
    addTemplate({
      filename: 'wdesign.json',
      getContents: () => {
        try {
          if (existsSync(templatePath)) {
            const content = readFileSync(templatePath, 'utf-8')
            // Parse and regenerate to ensure valid JSON
            const config = JSON.parse(content)
            return JSON.stringify(config, null, 2)
          }
        } catch (error) {
          logger.warn('Failed to read tsconfig.wdesign.json template, using default')
        }
        
        // Fallback to default config
        return JSON.stringify({
          extends: './tsconfig.app.json',
          compilerOptions: {
            types: ['../types/design-system'],
            paths: {
              '#wdesign/*': ['../app/*'],
              '#wdesign/components': ['../app/components'],
              '#wdesign/composables': ['../app/composables'],
              '#wdesign/utils': ['../app/utils']
            }
          },
          include: [
            '../app/**/*',
            '../types/**/*'
          ]
        }, null, 2)
      },
      write: true
    })

    // 8. Nuxt Hooks Integration
    
    // Hook: modules:done - เมื่อ modules ทั้งหมดโหลดเสร็จ
    nuxt.hook('modules:done', () => {
      logger.info('✅ All modules loaded')
    })

    // Hook: ready - เมื่อ Nuxt พร้อมใช้งาน
    nuxt.hook('ready', () => {
      if (nuxt.options.dev) {
        logger.info('🚀 Nuxt is ready!')
      }
    })

    // Hook: build:before - ก่อน build
    nuxt.hook('build:before', () => {
      logger.info('🔨 Starting build...')
    })

    // Hook: vite:extendConfig - เพิ่ม Vite config
    nuxt.hook('vite:extendConfig', (config, { isClient, isServer }) => {
      if (themeConfigExists && isClient) {
        logger.info('⚡ Extended Vite config for client')
      }
    })

    console.log('\n')
    logger.success('✨ Setup Complete!')
    logger.success('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
    
    // Tips
    if (nuxt.options.dev) {
      console.log('\n')
      logger.info('💡 Tips:')
      logger.info('   • Edit wrikka-theme.config.ts for theme customization')
      logger.info('   • Press Ctrl+Space in config for autocomplete')
      logger.info('   • Check docs/ folder for guides')
      logger.info('   • Use useTheme() composable in components')
      console.log('\n')
    }
  }
})
