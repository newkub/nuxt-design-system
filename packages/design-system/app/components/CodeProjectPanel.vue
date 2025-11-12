<template>
  <div class="h-full flex flex-col">
    <div class="flex-1 overflow-y-auto relative h-full">
      <!-- Always render all panel components but show/hide with v-show -->
      <Terminal
        v-show="activeTabs['panel'] === 'terminal'"
        class="h-full w-full"
      />
      <Dependencies
        v-show="activeTabs['panel'] === 'dependencies'"
        class="h-full w-full"
      />
      <!-- Add a fallback for when no tab is active or matches -->
      <div
        v-show="!activeTabs['panel'] || !['terminal', 'dependencies'].includes(activeTabs['panel'])"
        class="h-full w-full flex items-center justify-center text-gray-500"
      >
        <p>Select a panel tab to view content</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent } from "vue";

// Async components for better performance
const Terminal = defineAsyncComponent(
	() => import("~/components/code/Terminal.vue"),
);
const Dependencies = defineAsyncComponent(
	() => import("~/components/devtools/PackageJsonViewer.vue"),
);

// Props
interface Props {
	activeTabs: Record<string, string>;
}

defineProps<Props>();
</script>
