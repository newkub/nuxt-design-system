<script setup lang="ts">
import { onMounted, ref } from "vue";

const componentCount = ref(0);
const composableCount = ref(0);

onMounted(async () => {
	try {
		const componentsResponse = await $fetch("/api/devtools/stats/components");
		componentCount.value = componentsResponse?.count || 0;

		const composablesResponse = await $fetch("/api/devtools/stats/composables");
		composableCount.value = composablesResponse?.count || 0;
	} catch (error) {
		// Silently fail
	}
});
</script>

<template>
  <div class="p-4 space-y-6">
    <div>
      <h2 class="text-2xl font-bold mb-2">Project Information</h2>
      <p class="text-gray-600 mt-1">Development environment details</p>
    </div>

    <div class="grid sm:grid-cols-2 gap-4">
      <!-- Nuxt Version -->
      <div class="p-4 rounded-lg bg-gradient-to-br from-green-50 to-green-100 border border-green-200">
        <div class="flex items-center gap-3 mb-2">
          <div class="i-mdi-nuxt text-2xl text-green-600" />
          <h3 class="font-semibold text-lg">Nuxt.js</h3>
        </div>
        <p class="text-sm text-gray-600">Framework Version</p>
      </div>

      <!-- Vue Version -->
      <div class="p-4 rounded-lg bg-gradient-to-br from-emerald-50 to-emerald-100 border border-emerald-200">
        <div class="flex items-center gap-3 mb-2">
          <div class="i-mdi-vuejs text-2xl text-emerald-600" />
          <h3 class="font-semibold text-lg">Vue.js</h3>
        </div>
        <p class="text-sm text-gray-600">UI Framework</p>
      </div>

      <!-- Components -->
      <div class="p-4 rounded-lg bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200">
        <div class="flex items-center gap-3 mb-2">
          <div class="i-mdi-widgets text-2xl text-blue-600" />
          <h3 class="font-semibold text-lg">{{ componentCount }}</h3>
        </div>
        <p class="text-sm text-gray-600">Components</p>
      </div>

      <!-- Composables -->
      <div class="p-4 rounded-lg bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200">
        <div class="flex items-center gap-3 mb-2">
          <div class="i-mdi-function text-2xl text-purple-600" />
          <h3 class="font-semibold text-lg">{{ composableCount }}</h3>
        </div>
        <p class="text-sm text-gray-600">Composables</p>
      </div>
    </div>

    <!-- DevTools Info -->
    <div class="p-4 rounded-lg border border-gray-200 bg-gray-50">
      <div class="flex items-center gap-2 mb-3">
        <div class="i-mdi-information text-xl text-primary-500" />
        <h3 class="font-semibold">About DevTools</h3>
      </div>
      <div class="space-y-2 text-sm text-gray-600">
        <p>• <strong>Console:</strong> Real-time browser console logs with error tracking</p>
        <p>• <strong>Terminal:</strong> Server logs from Nitro including HTTP requests and responses</p>
        <p>• <strong>Components:</strong> Auto-extracted props from all Vue components</p>
        <p>• <strong>Theme:</strong> Design system colors and configuration</p>
        <p>• <strong>package.json:</strong> Dependencies and scripts overview</p>
      </div>
    </div>

    <!-- Environment -->
    <div class="p-4 rounded-lg border border-gray-200">
      <div class="flex items-center gap-2 mb-3">
        <div class="i-mdi-cog text-xl text-gray-600" />
        <h3 class="font-semibold">Environment</h3>
      </div>
      <div class="grid gap-2 text-sm">
        <div class="flex justify-between p-2 rounded bg-gray-50">
          <span class="text-gray-600">Mode:</span>
          <span class="font-mono">Development</span>
        </div>
        <div class="flex justify-between p-2 rounded bg-gray-50">
          <span class="text-gray-600">Server:</span>
          <span class="font-mono">Nitro</span>
        </div>
        <div class="flex justify-between p-2 rounded bg-gray-50">
          <span class="text-gray-600">Build Tool:</span>
          <span class="font-mono">Vite</span>
        </div>
      </div>
    </div>
  </div>
</template>