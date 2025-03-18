// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: [
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxtjs/color-mode',
    '@pinia/nuxt',
    '@vueuse/nuxt',
    '@nuxtjs/robots',
    '@nuxtjs/sitemap',
    '@unocss/nuxt',
    '@nuxtjs/device',
    '@pinia/nuxt',
    'nuxt-viewport',
    '@nuxtjs/stylelint-module',
  ],
  colorMode: {
    preference: 'system',
    fallback: 'light',
    classSuffix: ''
  },
  css: [
    '@unocss/reset/normalize.css',
    '@unocss/reset/tailwind.css'
  ]
})