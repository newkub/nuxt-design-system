<script setup lang="ts">
interface PageData {
	path: string;
	views: number;
	change: number;
}

interface Props {
	pages: PageData[];
}

const props = defineProps<Props>();
</script>

<template>
  <div class="space-y-4">
    <div
      v-for="(page, index) in pages"
      :key="page.path"
      class="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors"
    >
      <div class="flex items-center gap-3">
        <span class="w-6 h-6 flex items-center justify-center rounded-full bg-blue-100 text-blue-800 text-xs font-medium">
          {{ index + 1 }}
        </span>
        <div>
          <div class="font-medium text-gray-900">{{ page.path }}</div>
          <div class="text-xs text-gray-500">{{ page.views.toLocaleString() }} views</div>
        </div>
      </div>

      <div class="flex items-center gap-2">
        <span class="text-sm text-gray-600">{{ page.views.toLocaleString() }}</span>
        <span
          class="px-2 py-1 text-xs rounded-full font-medium"
          :class="{
            'bg-green-100 text-green-800': page.change > 0,
            'bg-red-100 text-red-800': page.change < 0,
            'bg-gray-100 text-gray-800': page.change === 0
          }"
        >
          {{ page.change > 0 ? '+' : '' }}{{ page.change }}%
        </span>
      </div>
    </div>

    <div v-if="pages.length === 0" class="text-center py-8 text-gray-500">
      <div class="i-mdi-chart-bar w-8 h-8 mx-auto mb-2 opacity-50" />
      <p>No page data available</p>
    </div>
  </div>
</template>
