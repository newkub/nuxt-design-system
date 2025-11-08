<script setup lang="ts">
const props = withDefaults(defineProps<{
  ratio?: number | string
  maxWidth?: string
}>(), {
  ratio: 16 / 9
})

const aspectRatioValue = computed(() => {
  if (typeof props.ratio === 'string') {
    const [width, height] = props.ratio.split('/').map(Number)
    return width / height
  }
  return props.ratio
})

const containerStyle = computed(() => {
  const styles: Record<string, string> = {
    position: 'relative',
    width: '100%'
  }

  if (props.maxWidth) {
    styles.maxWidth = props.maxWidth
  }

  return styles
})

const paddingTop = computed(() => {
  return `${(1 / aspectRatioValue.value) * 100}%`
})
</script>

<template>
  <div :style="containerStyle" class="aspect-ratio">
    <div class="aspect-ratio-inner" :style="{ paddingTop }">
      <div class="aspect-ratio-content">
        <slot />
      </div>
    </div>
  </div>
</template>

<style scoped>
.aspect-ratio {
  @apply overflow-hidden;
}

.aspect-ratio-inner {
  @apply relative w-full;
}

.aspect-ratio-content {
  @apply absolute inset-0;
}
</style>
