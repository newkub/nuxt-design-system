<script setup>
import { useRoute } from 'vue-router'

const config = useRuntimeConfig()
const docsConfig = config.public.docs
const route = useRoute()

const activeSidebar = computed(() => {
  if (!docsConfig.sidebar) return []
  for (const path in docsConfig.sidebar) {
    if (route.path.startsWith(path)) {
      return docsConfig.sidebar[path]
    }
  }
  return []
})
</script>

<template>
  <div class="grid grid-areas-[nav_nav,sidebar_content] grid-cols-[240px_1fr] grid-rows-[auto_1fr] h-screen">
    <header class="grid-in-[nav] border-b border-gray-200 dark:border-gray-800 p-4 flex justify-between items-center">
      <a href="/" class="font-bold text-lg">{{ docsConfig.title }}</a>
      <nav class="flex gap-4">
        <a v-for="item in docsConfig.nav" :key="item.link" :href="item.link" class="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200">{{ item.text }}</a>
      </nav>
    </header>
    <aside class="grid-in-[sidebar] border-r border-gray-200 dark:border-gray-800 p-4">
      <div v-for="group in activeSidebar" :key="group.text">
        <h3 class="font-semibold mb-2">{{ group.text }}</h3>
        <ul class="space-y-1">
          <li v-for="item in group.items" :key="item.link">
            <a :href="item.link" class="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200">{{ item.text }}</a>
          </li>
        </ul>
      </div>
    </aside>
    <main class="grid-in-[content] p-4">
      <slot />
    </main>
  </div>
</template>
