<script setup lang="ts">
const props = withDefaults(defineProps<{
  as?: string
  padding?: string | number
  margin?: string | number
  width?: string
  height?: string
  bg?: string
  border?: boolean
  rounded?: boolean | string
  shadow?: boolean | string
}>(), {
  as: 'div',
  padding: 0,
  margin: 0,
  border: false,
  rounded: false,
  shadow: false
})

const boxStyle = computed(() => {
  const styles: Record<string, string> = {}
  
  if (props.padding) {
    styles.padding = typeof props.padding === 'number' ? `${props.padding * 0.25}rem` : props.padding
  }
  
  if (props.margin) {
    styles.margin = typeof props.margin === 'number' ? `${props.margin * 0.25}rem` : props.margin
  }
  
  if (props.width) {
    styles.width = props.width
  }
  
  if (props.height) {
    styles.height = props.height
  }
  
  if (props.bg) {
    styles.backgroundColor = props.bg
  }
  
  return styles
})

const boxClasses = computed(() => {
  const classes: string[] = ['base-box']
  
  if (props.border) {
    classes.push('border', 'border-gray-200')
  }
  
  if (props.rounded) {
    if (typeof props.rounded === 'string') {
      classes.push(props.rounded)
    } else {
      classes.push('rounded-lg')
    }
  }
  
  if (props.shadow) {
    if (typeof props.shadow === 'string') {
      classes.push(props.shadow)
    } else {
      classes.push('shadow-md')
    }
  }
  
  return classes
})
</script>

<template>
  <component
    :is="as"
    :class="boxClasses"
    :style="boxStyle"
  >
    <slot />
  </component>
</template>

<style scoped>
.base-box {
  @apply box-border;
}
</style>
