<script setup lang="ts">
const props = withDefaults(defineProps<{
  src: string
  alt?: string
  size?: string | number
  shape?: 'square' | 'rounded' | 'circle'
  overlay?: boolean
}>(), {
  size: '80px',
  shape: 'rounded',
  overlay: false
})

const emit = defineEmits<{
  click: []
}>()
</script>

<template>
  <div 
    :class="['thumbnail', shape]"
    :style="{ width: typeof size === 'number' ? `${size}px` : size, height: typeof size === 'number' ? `${size}px` : size }"
    @click="emit('click')"
  >
    <img :src="src" :alt="alt" class="thumbnail-image" />
    <div v-if="overlay" class="thumbnail-overlay">
      <slot name="overlay" />
    </div>
  </div>
</template>

<style scoped>
.thumbnail {
  @apply relative overflow-hidden bg-gray-100 cursor-pointer group;
}

.thumbnail.square {
  @apply rounded-none;
}

.thumbnail.rounded {
  @apply rounded-lg;
}

.thumbnail.circle {
  @apply rounded-full;
}

.thumbnail-image {
  @apply w-full h-full object-cover;
}

.thumbnail-overlay {
  @apply absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity;
}
</style>
