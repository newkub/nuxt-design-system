import { defineNuxtModule, useLogger } from '@nuxt/kit'
import { Effect, Layer } from 'effect'
import { join } from 'node:path'
import { main } from './src/app'
import { makeLogger } from './src/services/logger.service'

export default defineNuxtModule({
  meta: {
    name: 'component-schema-validator',
    configKey: 'componentSchemaValidator',
  },
  defaults: {
    enabled: true,
    componentDir: 'components',
    schemaDir: 'components/schemas',
    schemaSuffix: '.schema.ts',
    strict: false,
  },
  setup(options, nuxt) {
    if (!options.enabled) return

    const nuxtLogger = useLogger('component-schema-validator')
    const rootDir = nuxt.options.srcDir

    nuxt.hook('modules:done', async () => {
      const program = main({
        componentDir: join(rootDir, options.componentDir),
        schemaDir: join(rootDir, options.schemaDir),
        schemaSuffix: options.schemaSuffix,
        strict: options.strict,
      })

      const LoggerLive = makeLogger({
        info: nuxtLogger.info,
        success: nuxtLogger.success,
        warn: nuxtLogger.warn,
        error: nuxtLogger.error,
        log: console.log, // Nuxt logger doesn't have a plain .log
      })

      const runnable = Effect.provide(program, LoggerLive)

      await Effect.runPromise(runnable)
    })
  },
})
