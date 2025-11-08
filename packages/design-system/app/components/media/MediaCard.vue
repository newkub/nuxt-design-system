<script setup lang="ts">
const props = withDefaults(defineProps<{
  src: string
  title?: string
  description?: string
  type?: 'image' | 'video'
  aspectRatio?: string
}>(), {
  type: 'image',
  aspectRatio: '16/9'
})

const emit = defineEmits<{
  click: []
  playClick: []
}>()
</script>

<template>
  <div class="media-card" @click="emit('click')">
    <div class="media-container" :style="{ aspectRatio }">
      <img v-if="type === 'image'" :src="src" alt="media" class="media-content" />
      <video v-else :src="src" class="media-content" />
      
      <button 
        v-if="type === 'video'"
        @click.stop="emit('playClick')"
        class="play-button"
      >
        ▶
      </button>
    </div>
    
    <div v-if="title || description" class="media-info">
      <h3 v-if="title" class="media-title">{{ title }}</h3>
      <p v-if="description" class="media-description">{{ description }}</p>
    </div>
  </div>
</template>

<style scoped>
.media-card {
  @apply bg-white rounded-lg overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow cursor-pointer;
}

.media-container {
  @apply relative bg-gray-100 overflow-hidden;
}

.media-content {
  @apply w-full h-full object-cover;
}

.play-button {
  @apply absolute inset-0 flex items-center justify-center bg-black/30 text-white text-5xl hover:bg-black/50 transition-colors;
}

.media-info {
  @apply p-4;
}

.media-title {
  @apply font-semibold text-gray-900 mb-1;
}

.media-description {
  @apply text-sm text-gray-600;
}
</style>
