<script setup lang="ts">
import { useAsyncData, useHead } from '#app'

interface Props {
  path?: string
  type?: string
}

const props = withDefaults(defineProps<Props>(), {
  path: '/',
  type: undefined // Will use default from config
})

// Get API route from runtime config
const runtimeConfig = useRuntimeConfig()
const contentConfig: any = runtimeConfig.public?.content || {}
const apiRoute = contentConfig.apiRoute || '/api/content'
const defaultType = contentConfig.defaultType || 'docs'
const defaultTitle = contentConfig.defaultTitle || 'Documentation'
const defaultDescription = contentConfig.defaultDescription || 'Documentation site'
const blogIndexConfig = contentConfig.blogIndex || { enabled: true, defaultTitle: 'Blog' }

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
      type: props.type || defaultType,
      query: '{}',
      sort: '{}',
      limit: '1',
      single: 'true'
    })
    
    const response = await fetch(`${apiRoute}?${params}`)
    return await response.json()
  }
)

// Automatically set SEO metadata
if (content.value) {
  useHead({
    title: content.value.title || defaultTitle,
    meta: [
      { name: 'description', content: content.value.description || defaultDescription }
    ]
  })
  
  // Set layout based on content frontmatter
  if (content.value.layout) {
    definePageMeta({
      layout: content.value.layout
    })
  }
}
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
    
    <div v-else-if="content">
      <!-- Blog index page with posts list -->
      <div v-if="blogIndexConfig.enabled && (type || defaultType) === 'blog' && path === '/' && content.posts" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div class="text-center mb-16">
          <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {{ content.title || blogIndexConfig.defaultTitle || 'Blog' }}
          </h1>
          <p v-if="content.description" class="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {{ content.description }}
          </p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div class="lg:col-span-2">
            <div 
              v-for="post in content.posts" 
              :key="post._id"
              class="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden mb-8 hover:shadow-xl transition-shadow duration-300"
            >
              <div class="p-6">
                <div v-if="post.date || post.readTime" class="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-4">
                  <span v-if="post.date">{{ post.date }}</span>
                  <span v-if="post.date && post.readTime" class="mx-2">•</span>
                  <span v-if="post.readTime">{{ post.readTime }}</span>
                </div>
                <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                  <NuxtLink 
                    :to="`/blog/${post._id}`" 
                    class="hover:text-blue-600 dark:hover:text-blue-400"
                  >
                    {{ post.title }}
                  </NuxtLink>
                </h2>
                <p v-if="post.description || post.excerpt" class="text-gray-600 dark:text-gray-300 mb-4">
                  {{ post.description || post.excerpt }}
                </p>
                <div v-if="post.tags" class="flex flex-wrap gap-2 mb-4">
                  <span 
                    v-for="tag in post.tags" 
                    :key="tag"
                    class="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 rounded-full text-sm"
                  >
                    {{ tag }}
                  </span>
                </div>
                <NuxtLink 
                  :to="`/blog/${post._id}`" 
                  class="text-blue-600 dark:text-blue-400 hover:underline font-medium"
                >
                  Read more
                </NuxtLink>
              </div>
            </div>
          </div>

          <!-- Sidebar -->
          <div class="lg:col-span-1">
            <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden mb-8">
              <div class="p-6">
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Categories
                </h3>
                <ul class="space-y-2">
                  <li>
                    <NuxtLink to="/blog" class="flex justify-between items-center text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
                      <span>Documentation</span>
                      <span class="bg-gray-100 dark:bg-gray-700 rounded-full px-2 py-1 text-xs">12</span>
                    </NuxtLink>
                  </li>
                  <li>
                    <NuxtLink to="/blog" class="flex justify-between items-center text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
                      <span>Releases</span>
                      <span class="bg-gray-100 dark:bg-gray-700 rounded-full px-2 py-1 text-xs">5</span>
                    </NuxtLink>
                  </li>
                  <li>
                    <NuxtLink to="/blog" class="flex justify-between items-center text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
                      <span>Tutorials</span>
                      <span class="bg-gray-100 dark:bg-gray-700 rounded-full px-2 py-1 text-xs">8</span>
                    </NuxtLink>
                  </li>
                  <li>
                    <NuxtLink to="/blog" class="flex justify-between items-center text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
                      <span>Best Practices</span>
                      <span class="bg-gray-100 dark:bg-gray-700 rounded-full px-2 py-1 text-xs">7</span>
                    </NuxtLink>
                  </li>
                </ul>
              </div>
            </div>

            <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div class="p-6">
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Popular Tags
                </h3>
                <div class="flex flex-wrap gap-2">
                  <NuxtLink to="/blog" class="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 rounded-full text-sm hover:bg-blue-200 dark:hover:bg-blue-800">
                    Nuxt 3
                  </NuxtLink>
                  <NuxtLink to="/blog" class="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200 rounded-full text-sm hover:bg-purple-200 dark:hover:bg-purple-800">
                    Vue
                  </NuxtLink>
                  <NuxtLink to="/blog" class="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 rounded-full text-sm hover:bg-green-200 dark:hover:bg-green-800">
                    Performance
                  </NuxtLink>
                  <NuxtLink to="/blog" class="px-3 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200 rounded-full text-sm hover:bg-yellow-200 dark:hover:bg-yellow-800">
                    CSS
                  </NuxtLink>
                  <NuxtLink to="/blog" class="px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200 rounded-full text-sm hover:bg-red-200 dark:hover:bg-red-800">
                    Optimization
                  </NuxtLink>
                  <NuxtLink to="/blog" class="px-3 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-200 rounded-full text-sm hover:bg-indigo-200 dark:hover:bg-indigo-800">
                    Components
                  </NuxtLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Regular content display -->
      <MarkdownContent v-else :content="content.body" />
    </div>
    
    <div v-else class="text-center py-12">
      <Icon name="mdi:file-document" class="h-12 w-12 text-gray-400 mx-auto mb-4" />
      <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-1">Content not found</h3>
      <p class="text-gray-500 dark:text-gray-400">The requested content could not be found.</p>
    </div>
  </div>
</template>