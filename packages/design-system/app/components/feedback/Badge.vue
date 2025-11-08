<script setup lang="ts">
const props = withDefaults(defineProps<{
  content?: string | number
  type?: 'primary' | 'success' | 'warning' | 'error' | 'info'
  dot?: boolean
  max?: number
  show?: boolean
}>(), {
  type: 'primary',
  dot: false,
  max: 99,
  show: true
})

const displayContent = computed(() => {
  if (props.dot) return ''
  if (typeof props.content === 'number' && props.content > props.max) {
    return `${props.max}+`
  }
  return props.content
})
</script>

<template>
  <div class="badge-container">
    <slot />
    <span v-if="show" :class="['badge', type, { dot }]">
      {{ displayContent }}
    </span>
  </div>
</template>

<style scoped>
.badge-container {
  @apply relative inline-flex;
}

.badge {
  @apply absolute -top-2 -right-2 px-1.5 py-0.5 rounded-full text-xs font-medium text-white min-w-[1.25rem] text-center;
}

.badge.dot {
  @apply w-2 h-2 p-0 min-w-0;
}

.badge.primary {
  @apply bg-blue-600;
}

.badge.success {
  @apply bg-green-600;
}

.badge.warning {
  @apply bg-yellow-600;
}

.badge.error {
  @apply bg-red-600;
}

.badge.info {
  @apply bg-gray-600;
}
</style>
