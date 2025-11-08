<script setup lang="ts">
interface CarouselImage {
  src: string
  alt?: string
  caption?: string
}

const props = withDefaults(defineProps<{
  images: CarouselImage[]
  autoplay?: boolean
  interval?: number
}>(), {
  autoplay: false,
  interval: 3000
})

const currentIndex = ref(0)
let intervalId: NodeJS.Timeout | null = null

const next = () => {
  currentIndex.value = (currentIndex.value + 1) % props.images.length
}

const prev = () => {
  currentIndex.value = (currentIndex.value - 1 + props.images.length) % props.images.length
}

const goTo = (index: number) => {
  currentIndex.value = index
}

onMounted(() => {
  if (props.autoplay) {
    intervalId = setInterval(next, props.interval)
  }
})

onUnmounted(() => {
  if (intervalId) clearInterval(intervalId)
})
</script>

<template>
  <div class="carousel">
    <div class="carousel-container">
      <div
        class="carousel-track"
        :style="{ transform: `translateX(-${currentIndex * 100}%)` }"
      >
        <div v-for="(image, index) in images" :key="index" class="carousel-slide">
          <img :src="image.src" :alt="image.alt" class="carousel-image" />
          <div v-if="image.caption" class="carousel-caption">
            {{ image.caption }}
          </div>
        </div>
      </div>
      
      <button @click="prev" class="carousel-btn prev">‹</button>
      <button @click="next" class="carousel-btn next">›</button>
    </div>
    
    <div class="carousel-indicators">
      <button
        v-for="(_, index) in images"
        :key="index"
        :class="['indicator', { active: index === currentIndex }]"
        @click="goTo(index)"
      />
    </div>
  </div>
</template>

<style scoped>
.carousel {
  @apply relative w-full;
}

.carousel-container {
  @apply relative overflow-hidden rounded-lg bg-gray-900;
}

.carousel-track {
  @apply flex transition-transform duration-500;
}

.carousel-slide {
  @apply min-w-full relative;
}

.carousel-image {
  @apply w-full h-full object-cover;
}

.carousel-caption {
  @apply absolute bottom-0 left-0 right-0 bg-black/60 text-white p-4 text-center;
}

.carousel-btn {
  @apply absolute top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-900 w-12 h-12 rounded-full text-3xl flex items-center justify-center;
}

.carousel-btn.prev {
  @apply left-4;
}

.carousel-btn.next {
  @apply right-4;
}

.carousel-indicators {
  @apply flex items-center justify-center gap-2 mt-4;
}

.indicator {
  @apply w-2 h-2 rounded-full bg-gray-400 hover:bg-gray-600 transition-colors;
}

.indicator.active {
  @apply bg-blue-600 w-8;
}
</style>
