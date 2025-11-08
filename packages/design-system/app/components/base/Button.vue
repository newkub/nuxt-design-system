<script setup lang="ts">
const props = withDefaults(defineProps<{
  type?: 'button' | 'submit' | 'reset'
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'link' | 'danger'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  disabled?: boolean
  loading?: boolean
  fullWidth?: boolean
  icon?: string
  iconPosition?: 'left' | 'right'
}>(), {
  type: 'button',
  variant: 'primary',
  size: 'md',
  disabled: false,
  loading: false,
  fullWidth: false,
  iconPosition: 'left'
})

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()
</script>

<template>
  <button
    :type="type"
    :disabled="disabled || loading"
    :class="[
      'base-button',
      variant,
      size,
      {
        'full-width': fullWidth,
        loading
      }
    ]"
    @click="emit('click', $event)"
  >
    <span v-if="loading" class="button-spinner" />
    <span v-if="icon && iconPosition === 'left'" class="button-icon">{{ icon }}</span>
    <span class="button-content"><slot /></span>
    <span v-if="icon && iconPosition === 'right'" class="button-icon">{{ icon }}</span>
  </button>
</template>

<style scoped>
.base-button {
  @apply inline-flex items-center justify-center gap-2 font-medium rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed;
}

.base-button.xs {
  @apply px-2 py-1 text-xs;
}

.base-button.sm {
  @apply px-3 py-1.5 text-sm;
}

.base-button.md {
  @apply px-4 py-2 text-base;
}

.base-button.lg {
  @apply px-6 py-3 text-lg;
}

.base-button.xl {
  @apply px-8 py-4 text-xl;
}

.base-button.primary {
  @apply bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800;
}

.base-button.secondary {
  @apply bg-gray-600 text-white hover:bg-gray-700 active:bg-gray-800;
}

.base-button.outline {
  @apply border-2 border-blue-600 text-blue-600 hover:bg-blue-50 active:bg-blue-100;
}

.base-button.ghost {
  @apply text-blue-600 hover:bg-blue-50 active:bg-blue-100;
}

.base-button.link {
  @apply text-blue-600 hover:underline;
}

.base-button.danger {
  @apply bg-red-600 text-white hover:bg-red-700 active:bg-red-800;
}

.base-button.full-width {
  @apply w-full;
}

.base-button.loading {
  @apply relative text-transparent hover:text-transparent;
}

.button-spinner {
  @apply absolute inset-0 flex items-center justify-center;
}

.button-spinner::after {
  content: '';
  @apply w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin;
}

.button-icon {
  @apply text-lg;
}

.button-content {
  @apply truncate;
}
</style>
