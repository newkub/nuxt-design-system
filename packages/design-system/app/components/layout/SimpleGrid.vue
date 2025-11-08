<script setup lang="ts">
const props = withDefaults(defineProps<{
  columns?: number
  spacing?: number | string
  minChildWidth?: string
}>(), {
  columns: 3,
  spacing: 4
})

const gridStyle = computed(() => {
  const styles: Record<string, string> = {
    display: 'grid'
  }

  // Gap
  const gap = typeof props.spacing === 'number' ? `${props.spacing * 0.25}rem` : props.spacing
  styles.gap = gap

  // Columns
  if (props.minChildWidth) {
    styles.gridTemplateColumns = `repeat(auto-fit, minmax(${props.minChildWidth}, 1fr))`
  } else {
    styles.gridTemplateColumns = `repeat(${props.columns}, 1fr)`
  }

  return styles
})
</script>

<template>
  <div :style="gridStyle">
    <slot />
  </div>
</template>
