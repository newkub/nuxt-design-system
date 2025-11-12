<script setup lang="ts">
interface Props {
	selectedFiles: File[];
}

const props = defineProps<Props>();

const emit = defineEmits<{
	"update:selectedFiles": [files: File[]];
	"file-selected": [files: File[]];
}>();

function handleFileSelect(event: Event) {
	const input = event.target as HTMLInputElement;
	if (input.files) {
		const newFiles = Array.from(input.files);
		emit("update:selectedFiles", [...props.selectedFiles, ...newFiles]);
		emit("file-selected", newFiles);
	}
}

function removeFile(index: number) {
	const newFiles = props.selectedFiles.filter((_, i) => i !== index);
	emit("update:selectedFiles", newFiles);
}

function triggerFileSelect() {
	const input = document.querySelector(
		'input[type="file"]',
	) as HTMLInputElement;
	input?.click();
}
</script>

<template>
  <div class="flex flex-col h-full">
    <input type="file" multiple @change="handleFileSelect" class="hidden" />
    <div
      v-if="selectedFiles.length === 0"
      @click="triggerFileSelect"
      class="border-2 border-dashed border-border-normal rounded-lg p-12 text-center flex-1 flex flex-col justify-center items-center cursor-pointer hover:border-success-normal"
    >
      <div class="i-mdi-upload-network-outline w-lg h-lg mx-auto text-border-normal"></div>
      <p class="mt-2 text-sm text-border-normal">
        Drag & drop files here or <span class="text-success-normal font-semibold">click to browse</span>
      </p>
    </div>
    <div v-else class="flex-1 overflow-y-auto -mr-3 pr-3">
      <h4 class="font-semibold mb-2">Selected Files:</h4>
      <ul class="space-y-2">
        <li
          v-for="(file, index) in selectedFiles"
          :key="index"
          class="flex items-center justify-between bg-background-active p-2 rounded-md"
        >
          <div class="flex items-center space-x-3 overflow-hidden">
            <div class="i-mdi-file-outline w-md h-md text-border-normal flex-shrink-0"></div>
            <div class="truncate">
              <p class="text-sm font-medium truncate">{{ file.name }}</p>
              <p class="text-sm text-border-normal">{{ (file.size / 1024).toFixed(2) }} KB</p>
            </div>
          </div>
          <button @click="removeFile(index)" class="p-1 rounded-full hover:bg-background-active">
            <div class="i-mdi-close w-md h-md"></div>
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>
