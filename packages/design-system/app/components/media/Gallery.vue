<script setup lang="ts">
interface GalleryImage {
  src: string
  alt?: string
  caption?: string
}

const props = withDefaults(defineProps<{
  images: GalleryImage[]
  columns?: number
  gap?: string
}>(), {
  columns: 3,
  gap: '1rem'
})

const emit = defineEmits<{
  imageClick: [image: GalleryImage, index: number]
}>()
</script>

<template>
  <div 
    class="gallery"
    :style="{ 
      gridTemplateColumns: `repeat(${columns}, 1fr)`,
      gap 
    }"
  >
    <div
      v-for="(image, index) in images"
      :key="index"
      class="gallery-item"
      @click="emit('imageClick', image, index)"
    >
      <img :src="image.src" :alt="image.alt" class="gallery-image" />
      <div v-if="image.caption" class="gallery-caption">
        {{ image.caption }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.gallery {
  @apply grid;
}

.gallery-item {
  @apply relative overflow-hidden rounded-lg cursor-pointer group;
}

.gallery-image {
  @apply w-full h-full object-cover transition-transform group-hover:scale-110;
}

.gallery-caption {
  @apply absolute bottom-0 left-0 right-0 bg-black/60 text-white p-2 text-sm;
}
</style>
