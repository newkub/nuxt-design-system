<script setup lang="ts">
const props = withDefaults(defineProps<{
  size?: number | string
  orientation?: 'horizontal' | 'vertical'
}>(), {
  size: 4,
  orientation: 'vertical'
})

const spacerStyle = computed(() => {
  const sizeValue = typeof props.size === 'number' ? `${props.size * 0.25}rem` : props.size
  
  if (props.orientation === 'vertical') {
    return { height: sizeValue }
  } else {
    return { width: sizeValue }
  }
})
</script>

<template>
  <div :class="['base-spacer', orientation]" :style="spacerStyle" />
</template>

<style scoped>
.base-spacer {
  @apply flex-shrink-0;
}
</style>
