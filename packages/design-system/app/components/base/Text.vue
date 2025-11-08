<script setup lang="ts">
const props = withDefaults(defineProps<{
  as?: 'p' | 'span' | 'div' | 'label'
  size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl'
  weight?: 'normal' | 'medium' | 'semibold' | 'bold'
  align?: 'left' | 'center' | 'right' | 'justify'
  color?: string
  truncate?: boolean
  italic?: boolean
}>(), {
  as: 'p',
  size: 'base',
  weight: 'normal',
  align: 'left',
  truncate: false,
  italic: false
})
</script>

<template>
  <component
    :is="as"
    :class="[
      'base-text',
      `text-${size}`,
      `font-${weight}`,
      `text-${align}`,
      { truncate, italic }
    ]"
    :style="color ? { color } : {}"
  >
    <slot />
  </component>
</template>

<style scoped>
.base-text {
  @apply text-gray-900;
}

.truncate {
  @apply overflow-hidden text-ellipsis whitespace-nowrap;
}

.italic {
  @apply italic;
}
</style>
