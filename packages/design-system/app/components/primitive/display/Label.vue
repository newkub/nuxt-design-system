<script setup lang="ts">
const props = withDefaults(defineProps<{
  for?: string
  required?: boolean
  size?: 'sm' | 'md' | 'lg'
  weight?: 'normal' | 'medium' | 'semibold' | 'bold'
}>(), {
  required: false,
  size: 'md',
  weight: 'medium'
})
</script>

<template>
  <label
    :for="for"
    :class="['base-label', size, `font-${weight}`]"
  >
    <slot />
    <span v-if="required" class="required-mark">*</span>
  </label>
</template>

<style scoped>
.base-label {
  @apply block text-gray-700 mb-1;
}

.base-label.sm {
  @apply text-sm;
}

.base-label.md {
  @apply text-base;
}

.base-label.lg {
  @apply text-lg;
}

.required-mark {
  @apply text-red-500 ml-0.5;
}
</style>
