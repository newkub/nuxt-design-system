<script setup lang="ts">
import { computed } from 'vue'

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

const typeClasses = computed(() => {
  switch (props.type) {
    case 'primary':
      return 'bg-blue-600'
    case 'success':
      return 'bg-green-600'
    case 'warning':
      return 'bg-yellow-600'
    case 'error':
      return 'bg-red-600'
    default:
      return 'bg-gray-600'
  }
})
</script>

<template>
  <div class="relative inline-flex">
    <slot />
    <span v-if="show" :class="[
      'absolute -top-2 -right-2 px-1.5 py-0.5 rounded-full text-xs font-medium text-white min-w-[1.25rem] text-center',
      typeClasses,
      { 'w-2 h-2 p-0 min-w-0': dot }
    ]">
      {{ displayContent }}
    </span>
  </div>
</template>

<style scoped>
/* Styles removed in favor of UnoCSS utility classes */
</style>
