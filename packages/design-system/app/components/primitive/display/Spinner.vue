<script setup lang="ts">
const props = withDefaults(defineProps<{
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  color?: 'primary' | 'white' | 'gray'
  text?: string
}>(), {
  size: 'md',
  color: 'primary'
})
</script>

<template>
  <div class="spinner-container">
    <div :class="['spinner', size, color]" />
    <p v-if="text" class="spinner-text">{{ text }}</p>
  </div>
</template>

<style scoped>
.spinner-container {
  @apply flex flex-col items-center gap-2;
}

.spinner {
  @apply border-4 border-transparent rounded-full animate-spin;
}

.spinner.xs {
  @apply w-4 h-4 border-2;
}

.spinner.sm {
  @apply w-6 h-6 border-2;
}

.spinner.md {
  @apply w-8 h-8;
}

.spinner.lg {
  @apply w-12 h-12;
}

.spinner.xl {
  @apply w-16 h-16;
}

.spinner.primary {
  @apply border-t-blue-600;
}

.spinner.white {
  @apply border-t-white;
}

.spinner.gray {
  @apply border-t-gray-600;
}

.spinner-text {
  @apply text-sm text-gray-600;
}
</style>
