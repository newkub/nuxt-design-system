<script setup lang="ts">
import Codeblock from "../code/Codeblock.vue";

const {
	data: nuxtConfig,
	pending,
	error,
} = useFetch<{ content: string }>("/api/config/nuxt", {
	lazy: true,
	server: false,
});
</script>

<template>
  <div class="space-y-4">
    <div>
      <h2 class="text-2xl font-bold">Nuxt Configuration</h2>
      <p class="text-gray-600 mt-1">nuxt.config.ts</p>
    </div>

    <div v-if="pending" class="flex items-center justify-center py-12">
      <div class="flex items-center gap-3">
        <div class="animate-spin i-mdi-loading text-2xl text-primary-500" />
        <span class="text-gray-600">Loading configuration...</span>
      </div>
    </div>

    <div v-else-if="error" class="p-4 bg-red-50 rounded-md text-red-600">
      <div class="flex items-center gap-2 mb-2">
        <div class="i-mdi-alert-circle text-xl" />
        <p class="font-bold">Error loading nuxt.config.ts</p>
      </div>
      <p class="text-sm">{{ error.message }}</p>
    </div>

    <div v-else-if="nuxtConfig?.content">
      <Codeblock :code="nuxtConfig.content" language="typescript" />
    </div>

    <div v-else class="text-center py-12 text-gray-500">
      <div class="i-mdi-file-document-outline text-6xl mb-4" />
      <p>No configuration found</p>
    </div>
  </div>
</template>
