<script setup lang="ts">
const props = withDefaults(defineProps<{
  type?: 'info' | 'success' | 'warning' | 'error'
  title?: string
  closable?: boolean
  sticky?: boolean
}>(), {
  type: 'info',
  closable: true,
  sticky: false
})

const emit = defineEmits<{
  close: []
}>()

const isVisible = ref(true)
</script>

<template>
  <Transition name="banner">
    <div v-if="isVisible" :class="['banner', type, { sticky }]">
      <div class="banner-content">
        <h3 v-if="title" class="banner-title">{{ title }}</h3>
        <div class="banner-message">
          <slot />
        </div>
      </div>
      
      <button v-if="closable" @click="isVisible = false; emit('close')" class="banner-close">
        ✕
      </button>
    </div>
  </Transition>
</template>

<style scoped>
.banner {
  @apply w-full px-6 py-4 flex items-start justify-between gap-4;
}

.banner.sticky {
  @apply sticky top-0 z-40;
}

.banner.info {
  @apply bg-blue-50 border-l-4 border-blue-500 text-blue-800;
}

.banner.success {
  @apply bg-green-50 border-l-4 border-green-500 text-green-800;
}

.banner.warning {
  @apply bg-yellow-50 border-l-4 border-yellow-500 text-yellow-800;
}

.banner.error {
  @apply bg-red-50 border-l-4 border-red-500 text-red-800;
}

.banner-content {
  @apply flex-1;
}

.banner-title {
  @apply font-semibold mb-1;
}

.banner-message {
  @apply text-sm;
}

.banner-close {
  @apply hover:opacity-70 text-xl;
}

.banner-enter-active,
.banner-leave-active {
  @apply transition-all duration-300;
}

.banner-enter-from,
.banner-leave-to {
  @apply opacity-0 transform -translate-y-full;
}
</style>
