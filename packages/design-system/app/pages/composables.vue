<script setup>
import { ref, onMounted } from 'vue'
import MarkdownContent from '../components/MarkdownContent.vue'

const composables = ref([])
const selectedComposable = ref(null)

// Fetch composables data
const { data, error } = await useFetch('/api/composables')

if (data.value) {
  composables.value = data.value
}

// Select composable
const selectComposable = (composable) => {
  selectedComposable.value = composable
}

// Handle hash navigation
onMounted(() => {
  const hash = window.location.hash.substring(1)
  if (hash) {
    const composable = composables.value.flatMap(cat => cat.composables).find(c => c.id === hash)
    if (composable) {
      selectedComposable.value = composable
    }
  }
})
</script>

<template>
  <div class="max-w-6xl mx-auto px-4 py-8">
    <div class="flex flex-col lg:flex-row gap-8">
      <!-- Sidebar -->
      <div class="lg:w-1/4">
        <div class="sticky top-24 border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-white dark:bg-gray-800">
          <h2 class="text-lg font-bold mb-4">Composables</h2>
          <ul class="space-y-2">
            <li v-for="category in composables" :key="category.name">
              <h3 class="font-semibold text-gray-900 dark:text-white mt-2 mb-1">{{ category.name }}</h3>
              <ul class="space-y-1 border-l-2 border-gray-100 dark:border-gray-800 pl-2">
                <li v-for="composable in category.composables" :key="composable.id">
                  <NuxtLink 
                    :to="`/composables#${composable.id}`"
                    class="block py-1 px-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                    @click="selectComposable(composable)"
                  >
                    {{ composable.name }}
                  </NuxtLink>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>

      <!-- Main Content -->
      <div class="lg:w-3/4">
        <div v-if="selectedComposable" class="space-y-8">
          <!-- Composable Header -->
          <div>
            <h1 class="text-3xl font-bold text-gray-900 dark:text-white">{{ selectedComposable.name }}</h1>
            <p class="mt-2 text-gray-600 dark:text-gray-400">{{ selectedComposable.description }}</p>
          </div>

          <!-- Overview -->
          <section>
            <h2 class="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Overview</h2>
            <MarkdownContent :content="selectedComposable.overview" />
          </section>

          <!-- Usage -->
          <section>
            <h2 class="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Usage</h2>
            <pre class="bg-gray-800 dark:bg-gray-900 rounded-lg p-4 overflow-x-auto"><code>{{ selectedComposable.usage }}</code></pre>
          </section>

          <!-- Parameters -->
          <section v-if="selectedComposable.parameters && selectedComposable.parameters.length">
            <h2 class="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Parameters</h2>
            <div class="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
              <table class="min-w-full">
                <thead class="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th class="py-3 px-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Name</th>
                    <th class="py-3 px-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Type</th>
                    <th class="py-3 px-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Default</th>
                    <th class="py-3 px-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Description</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
                  <tr v-for="param in selectedComposable.parameters" :key="param.name" class="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                    <td class="py-3 px-4 text-sm font-medium text-gray-900 dark:text-white">{{ param.name }}</td>
                    <td class="py-3 px-4 text-sm text-gray-700 dark:text-gray-300">
                      <code class="bg-gray-100 dark:bg-gray-800 rounded px-1 py-0.5">{{ param.type }}</code>
                    </td>
                    <td class="py-3 px-4 text-sm text-gray-700 dark:text-gray-300">
                      <code v-if="param.default" class="bg-gray-100 dark:bg-gray-800 rounded px-1 py-0.5">{{ param.default }}</code>
                      <span v-else>-</span>
                    </td>
                    <td class="py-3 px-4 text-sm text-gray-700 dark:text-gray-300">{{ param.description }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <!-- Returns -->
          <section v-if="selectedComposable.returns && selectedComposable.returns.length">
            <h2 class="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Returns</h2>
            <div class="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
              <table class="min-w-full">
                <thead class="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th class="py-3 px-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Name</th>
                    <th class="py-3 px-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Type</th>
                    <th class="py-3 px-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Description</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
                  <tr v-for="ret in selectedComposable.returns" :key="ret.name" class="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                    <td class="py-3 px-4 text-sm font-medium text-gray-900 dark:text-white">{{ ret.name }}</td>
                    <td class="py-3 px-4 text-sm text-gray-700 dark:text-gray-300">
                      <code class="bg-gray-100 dark:bg-gray-800 rounded px-1 py-0.5">{{ ret.type }}</code>
                    </td>
                    <td class="py-3 px-4 text-sm text-gray-700 dark:text-gray-300">{{ ret.description }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <!-- Examples -->
          <section v-if="selectedComposable.examples && selectedComposable.examples.length">
            <h2 class="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Examples</h2>
            <div v-for="(example, index) in selectedComposable.examples" :key="index" class="space-y-4 mb-8">
              <h3 class="text-xl font-semibold text-gray-900 dark:text-white">{{ example.title }}</h3>
              <pre class="bg-gray-800 dark:bg-gray-900 rounded-lg p-4 overflow-x-auto"><code>{{ example.code }}</code></pre>
            </div>
          </section>
        </div>

        <!-- Category Overview -->
        <div v-else class="space-y-8">
          <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Composables</h1>
          <p class="text-gray-600 dark:text-gray-400">
            Browse our collection of reusable composables designed to simplify common tasks and enhance your Vue development experience.
          </p>
          
          <div v-for="category in composables" :key="category.name" class="space-y-4">
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white">{{ category.name }}</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <NuxtLink 
                v-for="composable in category.composables" 
                :key="composable.id"
                :to="`/composables#${composable.id}`"
                class="block border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow bg-white dark:bg-gray-800"
                @click="selectComposable(composable)"
              >
                <h3 class="font-semibold text-lg text-gray-900 dark:text-white">{{ composable.name }}</h3>
                <p class="mt-2 text-sm text-gray-600 dark:text-gray-400 line-clamp-2">{{ composable.description }}</p>
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>