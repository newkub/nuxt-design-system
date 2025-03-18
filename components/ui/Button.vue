<template>
  <button
    :class="[
      'button',
      {
        'button--primary': variant === 'primary',
        'button--secondary': variant === 'secondary',
        'button--small': size === 'small',
        'button--large': size === 'large'
      }
    ]"
    :disabled="disabled"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  variant?: 'primary' | 'secondary'
  size?: 'small' | 'medium' | 'large'
  disabled?: boolean
}>(), {
  variant: 'primary',
  size: 'medium',
  disabled: false
})
</script>

<style scoped>
.button {
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  font-weight: 500;
  transition: all 0.2s;
  cursor: pointer;
}

.button--primary {
  background: #3b82f6;
  color: white;
  border: 1px solid #3b82f6;
}

.button--primary:hover {
  background: #2563eb;
}

.button--secondary {
  background: white;
  color: #3b82f6;
  border: 1px solid #e5e7eb;
}

.button--secondary:hover {
  background: #f3f4f6;
}

.button--small {
  font-size: 0.875rem;
  padding: 0.25rem 0.75rem;
}

.button--large {
  font-size: 1.125rem;
  padding: 0.75rem 1.5rem;
}

.button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
