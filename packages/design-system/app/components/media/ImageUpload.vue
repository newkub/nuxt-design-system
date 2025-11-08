<script setup lang="ts">
const props = withDefaults(defineProps<{
  accept?: string
  maxSize?: number
  multiple?: boolean
}>(), {
  accept: 'image/*',
  maxSize: 5 * 1024 * 1024,
  multiple: false
})

const emit = defineEmits<{
  upload: [files: File[]]
  error: [message: string]
}>()

const isDragging = ref(false)
const previews = ref<string[]>([])

const handleFiles = (files: FileList | null) => {
  if (!files) return
  
  const validFiles: File[] = []
  
  Array.from(files).forEach(file => {
    if (file.size > props.maxSize) {
      emit('error', `File ${file.name} exceeds maximum size`)
      return
    }
    
    validFiles.push(file)
    
    const reader = new FileReader()
    reader.onload = (e) => {
      previews.value.push(e.target?.result as string)
    }
    reader.readAsDataURL(file)
  })
  
  if (validFiles.length > 0) {
    emit('upload', validFiles)
  }
}

const handleDrop = (e: DragEvent) => {
  isDragging.value = false
  handleFiles(e.dataTransfer?.files || null)
}

const handleFileInput = (e: Event) => {
  const target = e.target as HTMLInputElement
  handleFiles(target.files)
}
</script>

<template>
  <div
    :class="['upload-area', { dragging: isDragging }]"
    @dragover.prevent="isDragging = true"
    @dragleave.prevent="isDragging = false"
    @drop.prevent="handleDrop"
  >
    <input
      type="file"
      :accept="accept"
      :multiple="multiple"
      @change="handleFileInput"
      class="upload-input"
    />
    
    <div v-if="previews.length === 0" class="upload-placeholder">
      <span class="upload-icon">📁</span>
      <p class="upload-text">Drag & drop images or click to upload</p>
      <p class="upload-hint">Max size: {{ (maxSize / 1024 / 1024).toFixed(0) }}MB</p>
    </div>
    
    <div v-else class="upload-previews">
      <img v-for="(preview, index) in previews" :key="index" :src="preview" class="preview-image" />
    </div>
  </div>
</template>

<style scoped>
.upload-area {
  @apply relative border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-500 transition-colors cursor-pointer;
}

.upload-area.dragging {
  @apply border-blue-500 bg-blue-50;
}

.upload-input {
  @apply absolute inset-0 opacity-0 cursor-pointer;
}

.upload-placeholder {
  @apply space-y-2;
}

.upload-icon {
  @apply text-5xl;
}

.upload-text {
  @apply text-gray-700 font-medium;
}

.upload-hint {
  @apply text-sm text-gray-500;
}

.upload-previews {
  @apply grid grid-cols-4 gap-4;
}

.preview-image {
  @apply w-full aspect-square object-cover rounded-lg;
}
</style>
