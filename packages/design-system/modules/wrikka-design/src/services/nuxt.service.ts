import { Effect, Context } from 'effect'
import type { Nuxt } from '@nuxt/schema'
import { installModule as nuxtInstallModule, addTemplate as nuxtAddTemplate } from '@nuxt/kit'

export interface NuxtService {
  readonly installModule: (moduleName: string, options?: any) => Effect.Effect<void, Error>
  readonly updateNuxtOptions: (updater: (opts: Nuxt['options']) => void) => Effect.Effect<void, Error>
  readonly addTemplate: (template: any) => Effect.Effect<void, Error>
  readonly hook: (name: string, cb: (...args: any[]) => void) => Effect.Effect<void, Error>
}

export const NuxtService = Context.Tag<NuxtService>('NuxtService')

export const makeNuxtService = (nuxt: Nuxt): NuxtService => ({
  installModule: (moduleName, options) =>
    Effect.tryPromise({
      try: () => nuxtInstallModule(moduleName, options, nuxt),
      catch: (e) => new Error(`Failed to install module ${moduleName}: ${e}`),
    }),
  updateNuxtOptions: (updater) =>
    Effect.sync(() => {
      updater(nuxt.options)
    }),
  addTemplate: (template) => Effect.sync(() => nuxtAddTemplate(template, nuxt)),
  hook: (name, cb) => Effect.sync(() => nuxt.hook(name, cb)),
})
