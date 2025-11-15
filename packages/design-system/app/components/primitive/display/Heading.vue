<script setup lang="ts">
const props = withDefaults(defineProps<{
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  size?: '4xl' | '3xl' | '2xl' | 'xl' | 'lg' | 'base'
  weight?: 'normal' | 'medium' | 'semibold' | 'bold' | 'extrabold'
  align?: 'left' | 'center' | 'right'
  color?: string
  truncate?: boolean
}>(), {
  as: 'h2',
  size: '2xl',
  weight: 'bold',
  align: 'left',
  truncate: false
})
</script>

<template>
  <component
    :is="as"
    :class="[
      'base-heading',
      `text-${size}`,
      `font-${weight}`,
      `text-${align}`,
      { truncate }
    ]"
    :style="color ? { color } : {}"
  >
    <slot />
  </component>
</template>

<style scoped>
.base-heading {
  @apply text-gray-900 leading-tight;
}

.truncate {
  @apply overflow-hidden text-ellipsis whitespace-nowrap;
}
</style>
