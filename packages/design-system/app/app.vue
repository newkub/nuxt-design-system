<script setup lang="ts">
import { useHead } from '#app'

// Get docs config from runtime config
const { config } = useDocs()

// Setup global meta tags for docs
useHead({
  titleTemplate: (title?: string) => {
    const baseTitle = config.theme?.logoText || 'Documentation'
    return title ? `${title} - ${baseTitle}` : baseTitle
  },
  meta: [
    { name: 'description', content: 'Documentation powered by Nuxt' },
    { name: 'theme-color', content: config.theme?.primaryColor || '#00dc82' }
  ],
  htmlAttrs: {
    lang: 'en'
  }
})
</script>

<template>
  <div id="app">
    <NuxtPage />
  </div>
</template>

<style>
:root {
  --color-primary: v-bind('config.theme?.primaryColor || "#00dc82"');
  --color-background-primary: #0f0f0f;
  --color-background-secondary: #1a1a1a;
  --color-background-hover: #2a2a2a;
  --color-background-active: #252525;
  --color-background-code: #1a1a1a;
  --color-background-info: #1a2f3a;
  --color-text-primary: #ffffff;
  --color-text-secondary: #a0a0a0;
  --color-border: #2a2a2a;
  --color-primary-alpha: rgba(0, 220, 130, 0.1);
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  background: var(--color-background-primary);
  color: var(--color-text-primary);
  line-height: 1.6;
}

#app {
  min-height: 100vh;
}

/* Scrollbar styling */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: var(--color-background-secondary);
}

::-webkit-scrollbar-thumb {
  background: var(--color-text-secondary);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: var(--color-text-primary);
}
</style>