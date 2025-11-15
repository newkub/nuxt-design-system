import { defineNuxtModule, addComponent, createResolver } from '@nuxt/kit'

export default defineNuxtModule({
  meta: {
    name: '@wrikka/wdocs-ui',
    configKey: 'wdocsUi'
  },
  setup (options, nuxt) {
    const { resolve } = createResolver(import.meta.url)

    // Add components
    addComponent({
      name: 'WButton', // name of the component to be used in templates
      filePath: resolve('./runtime/components/WButton.vue')
    })
  }
})
