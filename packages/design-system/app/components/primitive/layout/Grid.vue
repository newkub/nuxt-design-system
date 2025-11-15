<script setup lang="ts">
const props = withDefaults(defineProps<{
  cols?: number | string
  gap?: number | string
  rowGap?: number | string
  colGap?: number | string
  responsive?: boolean
}>(), {
  cols: 12,
  gap: 4,
  responsive: true
})

const gridStyle = computed(() => {
  const styles: Record<string, string> = {}
  
  if (typeof props.cols === 'number') {
    styles.gridTemplateColumns = `repeat(${props.cols}, minmax(0, 1fr))`
  } else {
    styles.gridTemplateColumns = props.cols
  }
  
  if (props.rowGap) {
    styles.rowGap = typeof props.rowGap === 'number' ? `${props.rowGap * 0.25}rem` : props.rowGap
  } else if (props.gap) {
    styles.gap = typeof props.gap === 'number' ? `${props.gap * 0.25}rem` : props.gap
  }
  
  if (props.colGap) {
    styles.columnGap = typeof props.colGap === 'number' ? `${props.colGap * 0.25}rem` : props.colGap
  }
  
  return styles
})
</script>

<template>
  <div :class="['grid-container', { responsive }]" :style="gridStyle">
    <slot />
  </div>
</template>

<style scoped>
.grid-container {
  @apply grid;
}

.grid-container.responsive {
  @apply grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4;
}
</style>
