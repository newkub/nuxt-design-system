<script setup lang="ts">
import type { SelectedFile } from "~/types/code";

interface Props {
	selectedFile: SelectedFile | null;
}

withDefaults(defineProps<Props>(), {
	selectedFile: null,
});

const { getFileIcon } = useFileIcons();
</script>

<template>
  <div class="h-full flex flex-col">
    <div v-if="selectedFile" class="flex-1 flex flex-col bg-gray-900 overflow-y-auto">
      <div class="bg-gray-800 px-4 py-3 border-b border-gray-700 sticky top-0 z-10">
        <div class="flex items-center space-x-2 text-sm">
          <div :class="getFileIcon(selectedFile.name)" class="w-4 h-4 text-gray-500" />
          <span class="font-medium text-white">{{ selectedFile.name }}</span>
        </div>
      </div>
      <div class="p-4">
        <Codeblock 
          :code="selectedFile.content"
          :language="selectedFile.language"
        />
      </div>
    </div>
    <div v-else class="flex-1 flex items-center justify-center text-gray-500 bg-gray-900">
      Select a file to view its content
    </div>
  </div>
</template>
