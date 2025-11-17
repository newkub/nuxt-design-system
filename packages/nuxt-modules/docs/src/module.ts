import { defineNuxtModule, addComponent, createResolver, installModule, loadNuxtConfig } from '@nuxt/kit'
import type { ModuleOptions as ContentModuleOptions } from '@nuxt/content'
import type { DocsConfig } from './config'

export default defineNuxtModule<DocsConfig & { srcDir?: string }>({
  meta: {
    name: '@wrikka/docs',
    configKey: 'docs'
  },
  defaults: {
    srcDir: '.wdocs'
  },
  async setup (options, nuxt) {
    const { resolve } = createResolver(import.meta.url)
    const srcDir = options.srcDir || '.wdocs'

    // Load user config
    const userConfig = await loadNuxtConfig({
      cwd: nuxt.options.rootDir,
      configFile: `${srcDir}/config.ts`
    })

    nuxt.options.runtimeConfig.public.docs = userConfig

    // Install @unocss/nuxt
    await installModule('@unocss/nuxt')

    // Install @nuxt/content
    const contentOptions: ContentModuleOptions = {
      sources: {
        content: {
          driver: 'fs',
          prefix: '/', // All contents inside this source will be prefixed with `/`
          base: resolve(nuxt.options.rootDir, srcDir, 'content')
        }
      }
    }
    await installModule('@nuxt/content', contentOptions)

    // Add components
    addComponent({
      name: 'Button',
      filePath: resolve('./runtime/components/Button.vue')
    })
    addComponent({
      name: 'DocsLayout',
      filePath: resolve('./runtime/components/DocsLayout.vue')
    })

    // Add layouts
    const layoutsDir = resolve('./runtime/layouts')
    nuxt.hook('app:resolve', (app) => {
      app.layouts = app.layouts || {}
      app.layouts.docs = {
        filePath: resolve(layoutsDir, 'docs.vue'),
        name: 'docs'
      }
      app.layouts.blog = {
        filePath: resolve(layoutsDir, 'blog.vue'),
        name: 'blog'
      }
    })
  }
})
