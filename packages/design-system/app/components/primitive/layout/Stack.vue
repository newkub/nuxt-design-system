<script setup lang="ts">
const props = withDefaults(defineProps<{
  direction?: 'vertical' | 'horizontal'
  spacing?: number | string
  align?: 'start' | 'center' | 'end' | 'stretch'
  justify?: 'start' | 'center' | 'end' | 'between' | 'around'
  wrap?: boolean
}>(), {
  direction: 'vertical',
  spacing: 4,
  align: 'stretch',
  justify: 'start',
  wrap: false
})

const stackStyle = computed(() => {
  const isVertical = props.direction === 'vertical'
  
  const styles: Record<string, string> = {
    display: 'flex',
    flexDirection: isVertical ? 'column' : 'row',
    flexWrap: props.wrap ? 'wrap' : 'nowrap'
  }

  // Spacing
  const gap = typeof props.spacing === 'number' ? `${props.spacing * 0.25}rem` : props.spacing
  styles.gap = gap

  // Align
  const alignMap = {
    start: 'flex-start',
    center: 'center',
    end: 'flex-end',
    stretch: 'stretch'
  }
  styles.alignItems = alignMap[props.align]

  // Justify
  const justifyMap = {
    start: 'flex-start',
    center: 'center',
    end: 'flex-end',
    between: 'space-between',
    around: 'space-around'
  }
  styles.justifyContent = justifyMap[props.justify]

  return styles
})
</script>

<template>
  <div :style="stackStyle">
    <slot />
  </div>
</template>
