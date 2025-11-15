<script setup lang="ts">
// This is a simple layout for our documentation site
useHead({
  title: 'DocsSite',
  meta: [
    { name: 'description', content: 'Beautiful documentation made simple with Nuxt 3 and UnoCSS' }
  ]
})
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>