import { Effect, pipe } from 'effect'
import { NuxtService } from './services/nuxt.service'
import type { DesignSystemModuleOptions } from './types/module-options'
import { Logger } from './context'
import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { createResolver } from '@nuxt/kit'

const setupUnoCSS = (options: DesignSystemModuleOptions, themeConfigExists: boolean) =>
  Effect.gen(function* (_) {
    const nuxt = yield* _(NuxtService)
    const logger = yield* _(Logger)

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
      yield* _(nuxt.installModule('@unocss/nuxt'))
      yield* _(nuxt.hook('config:resolved', () => {
        if (themeConfigExists) {
          logger.info('🔗 Linking wrikka-theme.config.ts to UnoCSS')
        }
      }))
    }
  })

const setupComponents = (options: DesignSystemModuleOptions, resolver: any) =>
  Effect.gen(function* (_) {
    const nuxt = yield* _(NuxtService)
    const logger = yield* _(Logger)
    if (options.components?.enabled !== false) {
      logger.info('📦 Component Auto-import')
      logger.info(`   Global: ${options.components?.global !== false ? 'enabled' : 'disabled'}`)
      yield* _(nuxt.updateNuxtOptions(opts => {
        opts.components = opts.components || { dirs: [] }
        if (Array.isArray(options.components?.dirs)) {
          options.components.dirs.forEach(dir => {
            if (typeof dir === 'string') {
              opts.components.dirs.push({ path: resolver.resolve(dir), global: options.components?.global ?? true, pathPrefix: false })
            } else {
              opts.components.dirs.push({ path: resolver.resolve(dir.path), global: dir.global ?? options.components?.global ?? true, pathPrefix: dir.pathPrefix ?? false })
            }
          })
        }
        opts.components.global = options.components?.global ?? true
      }))
    }
  })

const setupTheme = (options: DesignSystemModuleOptions, rootDir: string) =>
  Effect.gen(function* (_) {
    const nuxt = yield* _(NuxtService)
    const logger = yield* _(Logger)
    if (options.theme?.cssPath) {
      logger.info('🎨 Theme CSS')
      logger.info(`   Path: ${options.theme.cssPath}`)
      yield* _(nuxt.updateNuxtOptions(opts => {
        opts.css = opts.css || []
        opts.css.push('@unocss/reset/tailwind-compat.css')
        opts.css.push(resolve(rootDir, options.theme.cssPath!))
      }))
    }
  })

const setupColorMode = (options: DesignSystemModuleOptions) =>
  Effect.gen(function* (_) {
    const nuxt = yield* _(NuxtService)
    const logger = yield* _(Logger)
    if (options.theme?.colorMode !== false) {
      logger.info('🌙 Color Mode')
      logger.info(`   Preference: ${options.theme?.colorModeOptions?.preference || 'system'}`)
      yield* _(nuxt.installModule('@nuxtjs/color-mode', { ...options.theme?.colorModeOptions }))
    }
  })

const setupDevTools = (options: DesignSystemModuleOptions) =>
  Effect.gen(function* (_) {
    const nuxt = yield* _(NuxtService)
    const logger = yield* _(Logger)
    if (options.devtools?.enabled !== false) {
      logger.info('🛠️  DevTools')
      logger.info(`   TypeScript Strict: ${options.devtools?.strictTypeScript !== false ? 'enabled' : 'disabled'}`)
      yield* _(nuxt.updateNuxtOptions(opts => {
        opts.devtools = { enabled: true }
        if (options.devtools?.strictTypeScript !== false) {
          opts.typescript = { strict: true }
        }
      }))
    }
  })

const setupTypeDeclarations = (resolver: any, rootDir: string) =>
  Effect.gen(function* (_) {
    const nuxt = yield* _(NuxtService)
    const logger = yield* _(Logger)
    yield* _(nuxt.hook('prepare:types', ({ references, tsConfig }) => {
      references.push({ path: resolver.resolve('../../types/design-system.d.ts') })
      tsConfig.references = tsConfig.references || []
      if (!tsConfig.references.some((ref: any) => ref.path === './wdesign.json')) {
        tsConfig.references.push({ path: './wdesign.json' })
      }
    }))
    const templatePath = resolve(rootDir, 'tsconfig.wdesign.json')
    yield* _(nuxt.addTemplate({
      filename: 'wdesign.json',
      getContents: () => {
        try {
          if (existsSync(templatePath)) {
            return JSON.stringify(JSON.parse(readFileSync(templatePath, 'utf-8')), null, 2)
          }
        } catch (error) {
          logger.warn('Failed to read tsconfig.wdesign.json template, using default')
        }
        return JSON.stringify({ /* default config */ }, null, 2)
      },
      write: true
    }))
  })

const mainProgram = Effect.gen(function* (_) {
  const options = yield* _(Effect.context<DesignSystemModuleOptions>())
  const nuxt = yield* _(NuxtService)
  const logger = yield* _(Logger)

  if (options.enabled === false) {
    logger.info('Module disabled')
    return
  }

  const resolver = createResolver(import.meta.url)
  const themeConfigPath = resolve(nuxt.options.rootDir, 'wrikka-theme.config.ts')
  const themeConfigExists = existsSync(themeConfigPath)

  logger.log('\n')
  logger.success('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
  logger.success('  🎨  Wrikka Design System                      ')
  logger.success('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n')

  if (themeConfigExists) logger.info('📄 Found wrikka-theme.config.ts')

  yield* _(setupUnoCSS(options, themeConfigExists))
  yield* _(setupComponents(options, resolver))
  yield* _(setupTheme(options, nuxt.options.rootDir))
  yield* _(setupColorMode(options))
  yield* _(setupDevTools(options))
  yield* _(setupTypeDeclarations(resolver, nuxt.options.rootDir))

  logger.log('\n')
  logger.success('✨ Setup Complete!')
  logger.success('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n')
})

export const main = (options: DesignSystemModuleOptions, nuxt: any) => 
  Effect.provideContext(mainProgram, Effect.succeed(options))
