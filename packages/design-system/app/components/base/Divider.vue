<script setup lang="ts">
const props = withDefaults(defineProps<{
  orientation?: 'horizontal' | 'vertical'
  thickness?: number
  color?: string
  spacing?: number
  text?: string
  textAlign?: 'left' | 'center' | 'right'
}>(), {
  orientation: 'horizontal',
  thickness: 1,
  spacing: 4,
  textAlign: 'center'
})

const dividerStyle = computed(() => {
  const styles: Record<string, string> = {}
  
  if (props.orientation === 'horizontal') {
    styles.height = `${props.thickness}px`
    styles.marginTop = `${props.spacing * 0.25}rem`
    styles.marginBottom = `${props.spacing * 0.25}rem`
  } else {
    styles.width = `${props.thickness}px`
    styles.marginLeft = `${props.spacing * 0.25}rem`
    styles.marginRight = `${props.spacing * 0.25}rem`
  }
  
  if (props.color) {
    styles.backgroundColor = props.color
  }
  
  return styles
})
</script>

<template>
  <div
    v-if="!text"
    :class="['base-divider', orientation]"
    :style="dividerStyle"
  />
  
  <div v-else :class="['base-divider-with-text', orientation]">
    <div class="divider-line" :style="dividerStyle" />
    <span :class="['divider-text', textAlign]">{{ text }}</span>
    <div class="divider-line" :style="dividerStyle" />
  </div>
</template>

<style scoped>
.base-divider {
  @apply bg-gray-200;
}

.base-divider.horizontal {
  @apply w-full;
}

.base-divider.vertical {
  @apply h-full;
}

.base-divider-with-text {
  @apply flex items-center gap-4;
}

.base-divider-with-text.vertical {
  @apply flex-col;
}

.divider-line {
  @apply flex-1 bg-gray-200;
}

.divider-text {
  @apply text-sm text-gray-600;
}

.divider-text.left {
  @apply order-first;
}

.divider-text.right {
  @apply order-last;
}
</style>
