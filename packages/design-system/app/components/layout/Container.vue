<script setup lang="ts">
const props = withDefaults(defineProps<{
  fluid?: boolean
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'
  padding?: boolean
}>(), {
  fluid: false,
  size: 'xl',
  padding: true
})

const sizeClasses = {
  xs: 'max-w-screen-xs',
  sm: 'max-w-screen-sm',
  md: 'max-w-screen-md',
  lg: 'max-w-screen-lg',
  xl: 'max-w-screen-xl',
  '2xl': 'max-w-screen-2xl',
  full: 'max-w-full'
}
</script>

<template>
  <div :class="['container', fluid ? 'container-fluid' : sizeClasses[size], { 'container-padding': padding }]">
    <slot />
  </div>
</template>

<style scoped>
.container {
  @apply w-full mx-auto;
}

.container-fluid {
  @apply max-w-full;
}

.container-padding {
  @apply px-4 md:px-6 lg:px-8;
}
</style>
