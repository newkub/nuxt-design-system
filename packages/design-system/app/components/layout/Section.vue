<script setup lang="ts">
const props = withDefaults(defineProps<{
  as?: 'section' | 'div' | 'article' | 'main' | 'aside' | 'header' | 'footer'
  padding?: number | string
  maxWidth?: string
  centered?: boolean
}>(), {
  as: 'section',
  padding: 0,
  centered: false
})

const sectionStyle = computed(() => {
  const styles: Record<string, string> = {}

  if (props.padding) {
    styles.padding = typeof props.padding === 'number' 
      ? `${props.padding * 0.25}rem` 
      : props.padding
  }

  if (props.maxWidth) {
    styles.maxWidth = props.maxWidth
  }

  if (props.centered && props.maxWidth) {
    styles.marginLeft = 'auto'
    styles.marginRight = 'auto'
  }

  return styles
})
</script>

<template>
  <component :is="as" :style="sectionStyle">
    <slot />
  </component>
</template>
