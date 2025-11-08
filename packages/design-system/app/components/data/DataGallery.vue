<script setup lang="ts">
interface GalleryItem {
  id: string
  url: string
  title?: string
  description?: string
  thumbnail?: string
}

interface Props {
  items: GalleryItem[]
  columns?: number
}

const props = withDefaults(defineProps<Props>(), {
  columns: 4
})

const emit = defineEmits<{
  imageClick: [item: GalleryItem]
}>()

const selectedImage = ref<GalleryItem | null>(null)
const showLightbox = ref(false)

const openLightbox = (item: GalleryItem) => {
  selectedImage.value = item
  showLightbox.value = true
}

const closeLightbox = () => {
  showLightbox.value = false
}

const gridCols = computed(() => {
  const cols: Record<number, string> = {
    2: 'grid-cols-2',
    3: 'grid-cols-3',
    4: 'grid-cols-4',
    5: 'grid-cols-5'
  }
  return cols[props.columns] || 'grid-cols-4'
})
</script>

<template>
  <div class="data-gallery">
    <div :class="['gallery-grid', gridCols]">
      <div
        v-for="item in items"
        :key="item.id"
        class="gallery-item"
        @click="openLightbox(item)"
      >
        <img :src="item.thumbnail || item.url" :alt="item.title" class="gallery-image" />
        <div v-if="item.title" class="gallery-overlay">
          <h4 class="overlay-title">{{ item.title }}</h4>
        </div>
      </div>
    </div>

    <!-- Lightbox -->
    <div v-if="showLightbox" class="lightbox" @click="closeLightbox">
      <div class="lightbox-content" @click.stop>
        <button @click="closeLightbox" class="close-btn">
          <div class="i-mdi-close w-6 h-6" />
        </button>
        <img :src="selectedImage?.url" :alt="selectedImage?.title" class="lightbox-image" />
        <div v-if="selectedImage?.title || selectedImage?.description" class="lightbox-info">
          <h3 v-if="selectedImage?.title" class="lightbox-title">{{ selectedImage.title }}</h3>
          <p v-if="selectedImage?.description" class="lightbox-description">{{ selectedImage.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.data-gallery {
  @apply bg-white rounded-lg p-4;
}

.gallery-grid {
  @apply grid gap-4;
}

.gallery-item {
  @apply relative aspect-square rounded-lg overflow-hidden cursor-pointer group;
}

.gallery-image {
  @apply w-full h-full object-cover transition-transform group-hover:scale-110;
}

.gallery-overlay {
  @apply absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all flex items-end p-4;
}

.overlay-title {
  @apply text-white font-medium opacity-0 group-hover:opacity-100 transition-opacity;
}

.lightbox {
  @apply fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4;
}

.lightbox-content {
  @apply relative max-w-5xl max-h-full;
}

.close-btn {
  @apply absolute top-4 right-4 p-2 bg-white rounded-full hover:bg-gray-100;
}

.lightbox-image {
  @apply max-w-full max-h-[80vh] rounded-lg;
}

.lightbox-info {
  @apply mt-4 text-white;
}

.lightbox-title {
  @apply text-xl font-semibold mb-2;
}

.lightbox-description {
  @apply text-gray-300;
}
</style>
