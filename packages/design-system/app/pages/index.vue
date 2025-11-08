<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter, navigateTo } from '#app'

const router = useRouter()
const route = useRoute()
const components = ref<Array<{name: string, path: string}>>([])

// Dynamic import all components
onMounted(async () => {
  const modules = import.meta.glob('../../components/**/*.vue')
  
  for (const path in modules) {
    const name = path.split('/').pop()?.replace('.vue', '') || ''
    components.value.push({ name, path })
  }
})

const previewComponent = (path: string) => {
  navigateTo({ 
    path: '/component-preview', 
    query: { component: path } 
  })
}
</script>

<template>
  <div class="p-6">
    <div class="mb-8 flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold mb-2">Wrikka Design System</h1>
        <p class="text-gray-600">{{ components.length }} components available</p>
      </div>
      
      <!-- Link to Docs -->
      <NuxtLink 
        to="/guide" 
        class="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium flex items-center gap-2"
      >
        <Icon name="i-mdi-book-open-variant" class="text-xl" />
        <span>View Documentation</span>
      </NuxtLink>
    </div>

    <!-- Quick Links -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      <NuxtLink 
        to="/guide" 
        class="p-6 border-2 border-gray-200 rounded-lg hover:border-green-500 transition-colors"
      >
        <div class="text-3xl mb-2">📚</div>
        <h3 class="font-bold mb-1">Documentation</h3>
        <p class="text-sm text-gray-600">Learn about the design system</p>
      </NuxtLink>
      
      <NuxtLink 
        to="/guide/app/components" 
        class="p-6 border-2 border-gray-200 rounded-lg hover:border-green-500 transition-colors"
      >
        <div class="text-3xl mb-2">🧩</div>
        <h3 class="font-bold mb-1">Components</h3>
        <p class="text-sm text-gray-600">Browse component library</p>
      </NuxtLink>
      
      <NuxtLink 
        to="/guide/getting-started" 
        class="p-6 border-2 border-gray-200 rounded-lg hover:border-green-500 transition-colors"
      >
        <div class="text-3xl mb-2">🚀</div>
        <h3 class="font-bold mb-1">Getting Started</h3>
        <p class="text-sm text-gray-600">Quick start guide</p>
      </NuxtLink>
    </div>

    <h2 class="text-xl font-bold mb-4">All Components</h2>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div 
        v-for="(comp, index) in components" 
        :key="index"
        class="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer transition-colors"
        @click="previewComponent(comp.path)"
      >
        <div class="font-medium">{{ comp.name }}</div>
        <div class="text-sm text-gray-500 truncate">{{ comp.path }}</div>
      </div>
    </div>
  </div>
</template>