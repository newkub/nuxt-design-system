<script setup lang="ts">
const props = withDefaults(defineProps<{
  fullscreen?: boolean
  text?: string
  overlay?: boolean
}>(), {
  fullscreen: false,
  overlay: true
})
</script>

<template>
  <Teleport v-if="fullscreen" to="body">
    <div :class="['loading', { fullscreen, overlay }]">
      <FeedbackSpinner size="lg" :text="text" />
    </div>
  </Teleport>
  
  <div v-else :class="['loading', { overlay }]">
    <FeedbackSpinner :text="text" />
  </div>
</template>

<style scoped>
.loading {
  @apply flex items-center justify-center p-12;
}

.loading.fullscreen {
  @apply fixed inset-0 z-50;
}

.loading.overlay {
  @apply bg-white/80 backdrop-blur-sm;
}
</style>
