<script setup lang="ts">
const props = withDefaults(defineProps<{
  name: string
  size?: string | number
  color?: string
}>(), {
  size: '1em'
})

const sizeValue = computed(() => {
  return typeof props.size === 'number' ? `${props.size}px` : props.size
})
</script>

<template>
  <span
    class="base-icon"
    :style="{
      fontSize: sizeValue,
      color: color
    }"
  >
    {{ name }}
  </span>
</template>

<style scoped>
.base-icon {
  @apply inline-flex items-center justify-center leading-none;
}
</style>
