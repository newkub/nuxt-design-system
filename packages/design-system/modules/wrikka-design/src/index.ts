import { defineNuxtModule, useLogger } from '@nuxt/kit'
import { Effect, Layer } from 'effect'
import { main } from './app'
import { makeNuxtService, NuxtService } from './services/nuxt.service'
import { Logger } from './context'
import { defaultDesignSystemOptions } from './types/types'

export type { DesignSystemModuleOptions } from './types/types'

export default defineNuxtModule<any>({
  meta: {
    name: 'wrikka-design-system',
    configKey: 'designSystem',
    compatibility: {
      nuxt: '^3.0.0 || ^4.0.0',
    },
  },
  defaults: defaultDesignSystemOptions,
  async setup(options, nuxt) {
    const nuxtLogger = useLogger('wrikka-design-system')

    const program = main(options, nuxt)

    const NuxtServiceLive = Layer.succeed(NuxtService, makeNuxtService(nuxt))
    const LoggerLive = Layer.succeed(Logger, {
      info: nuxtLogger.info,
      success: nuxtLogger.success,
      warn: nuxtLogger.warn,
      error: nuxtLogger.error,
      log: console.log,
    })

    const AppLayer = Layer.merge(NuxtServiceLive, LoggerLive)
    const runnable = Effect.provide(program, AppLayer)

    await Effect.runPromise(runnable)
  },
})
