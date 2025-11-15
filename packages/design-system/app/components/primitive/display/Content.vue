<script setup lang="ts">
import { useAsyncData } from '#app'

interface Props {
  path?: string
}

const props = withDefaults(defineProps<Props>(), {
  path: '/'
})

// Get API route from runtime config
const runtimeConfig = useRuntimeConfig()
const apiRoute = runtimeConfig.public?.content?.apiRoute || '/api/content'

// Fetch content data
const { data: content, pending, error } = await useAsyncData(
  `content-${props.path}`,
  async () => {
    // Normalize path
    let normalizedPath = props.path || '/'
    if (normalizedPath.endsWith('/') && normalizedPath !== '/') {
      normalizedPath = normalizedPath.slice(0, -1)
    }
    
    // For root path, use empty string
    if (normalizedPath === '/') {
      normalizedPath = ''
    }
    
    const params = new URLSearchParams({
      path: normalizedPath,
      query: '{}',
      sort: '{}',
      limit: '1',
      single: 'true'
    })
    
    const response = await fetch(`${apiRoute}?${params}`)
    return await response.json()
  }
)
</script>

<template>
  <div>
    <div v-if="pending" class="flex items-center justify-center h-64">
      <div class="text-center">
        <Icon name="mdi:loading" class="h-8 w-8 animate-spin text-blue-600 mx-auto mb-4" />
        <p class="text-gray-600 dark:text-gray-400">Loading content...</p>
      </div>
    </div>
    
    <div v-else-if="error" class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 mb-8">
      <div class="flex items-center">
        <Icon name="mdi:alert-circle" class="h-6 w-6 text-red-500 mr-2" />
        <h3 class="text-lg font-semibold text-red-800 dark:text-red-200">Error loading content</h3>
      </div>
      <p class="text-red-700 dark:text-red-300 mt-2">{{ error }}</p>
    </div>
    
    <MarkdownContent v-else-if="content" :content="content.body" />
    
    <div v-else class="text-center py-12">
      <Icon name="mdi:file-document" class="h-12 w-12 text-gray-400 mx-auto mb-4" />
      <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-1">Content not found</h3>
      <p class="text-gray-500 dark:text-gray-400">The requested content could not be found.</p>
    </div>
  </div>
</template>