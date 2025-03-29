<template>
  <button
    class="rounded-md font-medium transition-all duration-200 cursor-pointer disabled:(opacity-50 cursor-not-allowed)"
    :class="[
      size === 'small' ? 'text-sm py-1 px-3' : size === 'large' ? 'text-lg py-3 px-6' : 'py-2 px-4',
      variant === 'primary' 
        ? 'bg-blue-500 text-white border-blue-500 hover:bg-blue-600 dark:(bg-blue-600 border-blue-600 hover:bg-blue-700)' 
        : 'bg-white text-blue-500 border-gray-200 hover:bg-gray-100 dark:(bg-gray-800 text-blue-400 border-gray-700 hover:bg-gray-700)'
    ]"
    :disabled="disabled"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
interface ButtonProps {
  variant?: 'primary' | 'secondary'
  size?: 'small' | 'medium' | 'large'
  disabled?: boolean
}

withDefaults(defineProps<ButtonProps>(), {
  variant: 'primary',
  size: 'medium',
  disabled: false
})
</script>
