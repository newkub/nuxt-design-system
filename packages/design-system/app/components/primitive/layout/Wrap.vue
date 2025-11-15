<script setup lang="ts">
const props = withDefaults(defineProps<{
  spacing?: number | string
  spacingX?: number | string
  spacingY?: number | string
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly'
  align?: 'start' | 'center' | 'end' | 'stretch'
}>(), {
  spacing: 2,
  justify: 'start',
  align: 'start'
})

const wrapStyle = computed(() => {
  const styles: Record<string, string> = {
    display: 'flex',
    flexWrap: 'wrap'
  }

  // Gap
  if (props.spacingX !== undefined || props.spacingY !== undefined) {
    const gapX = props.spacingX !== undefined
      ? (typeof props.spacingX === 'number' ? `${props.spacingX * 0.25}rem` : props.spacingX)
      : (typeof props.spacing === 'number' ? `${props.spacing * 0.25}rem` : props.spacing)
    
    const gapY = props.spacingY !== undefined
      ? (typeof props.spacingY === 'number' ? `${props.spacingY * 0.25}rem` : props.spacingY)
      : (typeof props.spacing === 'number' ? `${props.spacing * 0.25}rem` : props.spacing)
    
    styles.rowGap = gapY
    styles.columnGap = gapX
  } else {
    const gap = typeof props.spacing === 'number' ? `${props.spacing * 0.25}rem` : props.spacing
    styles.gap = gap
  }

  // Justify
  const justifyMap = {
    start: 'flex-start',
    center: 'center',
    end: 'flex-end',
    between: 'space-between',
    around: 'space-around',
    evenly: 'space-evenly'
  }
  styles.justifyContent = justifyMap[props.justify]

  // Align
  const alignMap = {
    start: 'flex-start',
    center: 'center',
    end: 'flex-end',
    stretch: 'stretch'
  }
  styles.alignItems = alignMap[props.align]

  return styles
})
</script>

<template>
  <div :style="wrapStyle">
    <slot />
  </div>
</template>
