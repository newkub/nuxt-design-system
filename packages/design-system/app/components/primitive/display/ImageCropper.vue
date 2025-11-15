<script setup lang="ts">
const props = withDefaults(defineProps<{
  src: string
  aspectRatio?: number
}>(), {
  aspectRatio: 1
})

const emit = defineEmits<{
  crop: [dataUrl: string]
}>()

const canvasRef = ref<HTMLCanvasElement>()
const scale = ref(1)
const rotation = ref(0)

const handleCrop = () => {
  if (!canvasRef.value) return
  
  const dataUrl = canvasRef.value.toDataURL('image/png')
  emit('crop', dataUrl)
}

const handleZoom = (delta: number) => {
  scale.value = Math.max(0.1, Math.min(3, scale.value + delta))
}

const handleRotate = (degrees: number) => {
  rotation.value = (rotation.value + degrees) % 360
}
</script>

<template>
  <div class="image-cropper">
    <div class="cropper-canvas">
      <div
        class="image-container"
        :style="{
          transform: `scale(${scale}) rotate(${rotation}deg)`
        }"
      >
        <img :src="src" alt="crop" class="cropper-image" />
      </div>
    </div>
    
    <div class="cropper-controls">
      <div class="control-group">
        <button @click="handleZoom(-0.1)" class="control-btn">−</button>
        <span>{{ Math.round(scale * 100) }}%</span>
        <button @click="handleZoom(0.1)" class="control-btn">+</button>
      </div>
      
      <div class="control-group">
        <button @click="handleRotate(-90)" class="control-btn">↶</button>
        <button @click="handleRotate(90)" class="control-btn">↷</button>
      </div>
      
      <button @click="handleCrop" class="crop-btn">
        Crop Image
      </button>
    </div>
    
    <canvas ref="canvasRef" class="hidden" />
  </div>
</template>

<style scoped>
.image-cropper {
  @apply space-y-4;
}

.cropper-canvas {
  @apply w-full aspect-square bg-gray-900 rounded-lg overflow-hidden relative;
}

.image-container {
  @apply w-full h-full flex items-center justify-center transition-transform;
}

.cropper-image {
  @apply max-w-full max-h-full;
}

.cropper-controls {
  @apply flex items-center justify-between gap-4;
}

.control-group {
  @apply flex items-center gap-2;
}

.control-btn {
  @apply px-3 py-2 border border-gray-300 rounded hover:bg-gray-100;
}

.crop-btn {
  @apply px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700;
}
</style>
