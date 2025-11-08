<script setup lang="ts">
const props = withDefaults(defineProps<{
  inline?: boolean
  maxWidth?: string
}>(), {
  inline: false
})

const centerStyle = computed(() => {
  const styles: Record<string, string> = {
    display: props.inline ? 'inline-flex' : 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }

  if (props.maxWidth) {
    styles.maxWidth = props.maxWidth
    styles.marginLeft = 'auto'
    styles.marginRight = 'auto'
  }

  return styles
})
</script>

<template>
  <div :style="centerStyle">
    <slot />
  </div>
</template>
