<script setup lang="ts">
import type { ComponentInfo } from '../../modules/components/runtime/composables'
import { useComponents } from '../../modules/components/runtime/composables'
import ComponentPreview from '../../app/components/ComponentPreview.vue'

useHead({
  title: 'Components - DocsSite',
  meta: [
    { name: 'description', content: 'Explore all available components for building beautiful documentation sites.' }
  ]
})

// Fetch components data using the composable
const { components, loading, error } = await useComponents()

// Function to generate documentation links
const getDocumentationLink = (componentName: string) => {
  // Convert component name to lowercase and replace uppercase letters with hyphens
  const formattedName = componentName
    .replace(/([A-Z])/g, '-$1')
    .toLowerCase()
    .substring(1) // Remove leading hyphen
  
  return `/docs/api#${formattedName}`
}
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16">
        <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Components
        </h1>
        <p class="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Explore all available components for building beautiful documentation sites.
        </p>
      </div>

      <!-- Loading state -->
      <div v-if="loading" class="flex justify-center items-center h-64">
        <div class="text-center">
          <Icon name="mdi:loading" class="h-8 w-8 animate-spin text-blue-600 mx-auto mb-4" />
          <p class="text-gray-600 dark:text-gray-400">Loading components...</p>
        </div>
      </div>

      <!-- Error state -->
      <div v-else-if="error" class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 mb-8">
        <div class="flex items-center">
          <Icon name="mdi:alert-circle" class="h-6 w-6 text-red-500 mr-2" />
          <h3 class="text-lg font-semibold text-red-800 dark:text-red-200">Error loading components</h3>
        </div>
        <p class="text-red-700 dark:text-red-300 mt-2">{{ error }}</p>
      </div>

      <!-- Components grid -->
      <div v-else-if="components && components.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div 
          v-for="component in components" 
          :key="component.name"
          class="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-xl transition-shadow"
        >
          <div class="p-6">
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">{{ component.name }}</h3>
            <p class="text-gray-600 dark:text-gray-300 mb-4">
              {{ component.description }}
            </p>
            
            <!-- Component preview -->
            <ComponentPreview :file-name="component.fileName" class="mb-4" />
          </div>
        </div>
      </div>

      <!-- Empty state -->
      <div v-else class="text-center py-12">
        <Icon name="mdi:puzzle" class="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-1">No components found</h3>
        <p class="text-gray-500 dark:text-gray-400">There are no components available to display.</p>
      </div>

      <div class="mt-16 text-center">
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          More Components Coming Soon
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          <div class="bg-gray-100 dark:bg-gray-800/50 rounded-lg p-6">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Interactive Examples</h3>
            <p class="text-gray-600 dark:text-gray-400">
              Live editable code examples with preview
            </p>
          </div>
          <div class="bg-gray-100 dark:bg-gray-800/50 rounded-lg p-6">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Design System</h3>
            <p class="text-gray-600 dark:text-gray-400">
              Complete design system with tokens and guidelines
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>