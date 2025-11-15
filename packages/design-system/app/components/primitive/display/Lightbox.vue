<script setup lang="ts">
const props = defineProps<{
  modelValue: boolean
  images: string[]
  currentIndex?: number
}>()

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  'update:currentIndex': [value: number]
}>()

const index = ref(props.currentIndex || 0)

const next = () => {
  index.value = (index.value + 1) % props.images.length
  emit('update:currentIndex', index.value)
}

const prev = () => {
  index.value = (index.value - 1 + props.images.length) % props.images.length
  emit('update:currentIndex', index.value)
}

const close = () => {
  emit('update:modelValue', false)
}
</script>

<template>
  <Teleport to="body">
    <Transition name="lightbox">
      <div v-if="modelValue" class="lightbox" @click.self="close">
        <button @click="close" class="lightbox-close">✕</button>
        
        <div class="lightbox-content">
          <button @click="prev" class="lightbox-nav prev">‹</button>
          
          <img :src="images[index]" alt="lightbox image" class="lightbox-image" />
          
          <button @click="next" class="lightbox-nav next">›</button>
        </div>
        
        <div class="lightbox-counter">
          {{ index + 1 }} / {{ images.length }}
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.lightbox {
  @apply fixed inset-0 bg-black/95 z-50 flex items-center justify-center;
}

.lightbox-close {
  @apply absolute top-4 right-4 text-white text-4xl hover:text-gray-300 z-10;
}

.lightbox-content {
  @apply relative w-full h-full flex items-center justify-center p-12;
}

.lightbox-image {
  @apply max-w-full max-h-full object-contain;
}

.lightbox-nav {
  @apply absolute top-1/2 -translate-y-1/2 text-white text-6xl hover:text-gray-300 px-4;
}

.lightbox-nav.prev {
  @apply left-0;
}

.lightbox-nav.next {
  @apply right-0;
}

.lightbox-counter {
  @apply absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-lg;
}

.lightbox-enter-active,
.lightbox-leave-active {
  @apply transition-opacity duration-300;
}

.lightbox-enter-from,
.lightbox-leave-to {
  @apply opacity-0;
}
</style>
