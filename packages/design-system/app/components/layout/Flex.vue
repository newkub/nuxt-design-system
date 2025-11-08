<script setup lang="ts">
const props = withDefaults(defineProps<{
  direction?: 'row' | 'column' | 'row-reverse' | 'column-reverse'
  justify?: 'start' | 'end' | 'center' | 'between' | 'around' | 'evenly'
  align?: 'start' | 'end' | 'center' | 'stretch' | 'baseline'
  wrap?: 'nowrap' | 'wrap' | 'wrap-reverse'
  gap?: number | string
  inline?: boolean
}>(), {
  direction: 'row',
  justify: 'start',
  align: 'start',
  wrap: 'nowrap',
  gap: 0,
  inline: false
})

const flexStyle = computed(() => {
  const styles: Record<string, string> = {
    display: props.inline ? 'inline-flex' : 'flex',
    flexDirection: props.direction,
    flexWrap: props.wrap
  }

  // Justify content
  const justifyMap = {
    start: 'flex-start',
    end: 'flex-end',
    center: 'center',
    between: 'space-between',
    around: 'space-around',
    evenly: 'space-evenly'
  }
  styles.justifyContent = justifyMap[props.justify]

  // Align items
  const alignMap = {
    start: 'flex-start',
    end: 'flex-end',
    center: 'center',
    stretch: 'stretch',
    baseline: 'baseline'
  }
  styles.alignItems = alignMap[props.align]

  // Gap
  if (props.gap) {
    styles.gap = typeof props.gap === 'number' ? `${props.gap * 0.25}rem` : props.gap
  }

  return styles
})
</script>

<template>
  <div :style="flexStyle">
    <slot />
  </div>
</template>
