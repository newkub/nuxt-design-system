<script setup lang="ts">
const props = defineProps<{
  images: string[]
  showThumbnails?: boolean
}>()

const currentIndex = ref(0)
</script>

<template>
  <div class="image-slider">
    <div class="slider-main">
      <img :src="images[currentIndex]" alt="slider image" class="main-image" />
    </div>
    
    <div v-if="showThumbnails" class="slider-thumbnails">
      <button
        v-for="(image, index) in images"
        :key="index"
        :class="['thumbnail', { active: index === currentIndex }]"
        @click="currentIndex = index"
      >
        <img :src="image" alt="thumbnail" />
      </button>
    </div>
  </div>
</template>

<style scoped>
.image-slider {
  @apply w-full space-y-4;
}

.slider-main {
  @apply w-full aspect-video bg-gray-100 rounded-lg overflow-hidden;
}

.main-image {
  @apply w-full h-full object-cover;
}

.slider-thumbnails {
  @apply flex gap-2 overflow-x-auto;
}

.thumbnail {
  @apply w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden border-2 border-transparent opacity-60 hover:opacity-100 transition-opacity;
}

.thumbnail.active {
  @apply border-blue-600 opacity-100;
}

.thumbnail img {
  @apply w-full h-full object-cover;
}
</style>
