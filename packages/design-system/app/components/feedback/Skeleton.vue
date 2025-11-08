<script setup lang="ts">
const props = withDefaults(defineProps<{
  variant?: 'text' | 'circular' | 'rectangular'
  width?: string | number
  height?: string | number
  animated?: boolean
}>(), {
  variant: 'text',
  animated: true
})

const style = computed(() => {
  const s: Record<string, string> = {}
  if (props.width) {
    s.width = typeof props.width === 'number' ? `${props.width}px` : props.width
  }
  if (props.height) {
    s.height = typeof props.height === 'number' ? `${props.height}px` : props.height
  }
  return s
})
</script>

<template>
  <div :class="['skeleton', variant, { animated }]" :style="style" />
</template>

<style scoped>
.skeleton {
  @apply bg-gray-200;
}

.skeleton.text {
  @apply h-4 rounded;
}

.skeleton.circular {
  @apply rounded-full;
}

.skeleton.rectangular {
  @apply rounded-lg;
}

.skeleton.animated {
  animation: skeleton-pulse 1.5s ease-in-out infinite;
}

@keyframes skeleton-pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.4;
  }
}
</style>
