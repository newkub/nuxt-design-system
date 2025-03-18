// https://nuxt.com/docs/api/configuration/nuxt-config
import Unocss from 'unocss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  vite: {
    plugins: [
      Unocss()
    ]
  },
  modules: ['@pinia/nuxt', '@nuxtjs/color-mode', '@unocss/nuxt'],
  colorMode: {
    preference: 'system',
    fallback: 'light',
    classSuffix: ''
  }
})