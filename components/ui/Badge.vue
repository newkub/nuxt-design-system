<template>
  <span :class="[
    'inline-block px-2 py-1 rounded text-xs font-medium',
    props.variant === 'primary' && 'bg-blue-500 text-white',
    props.variant === 'secondary' && 'bg-gray-200 text-gray-700',
    props.variant === 'success' && 'bg-green-500 text-white',
    props.variant === 'warning' && 'bg-yellow-500 text-white',
    props.variant === 'danger' && 'bg-red-500 text-white',
    'hover:(bg-opacity-90)',
    'dark:(bg-gray-800 text-white)'
  ]">
    <slot />
  </span>
</template>

<script setup lang="ts">
interface BadgeProps {
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger'
}

const props = withDefaults(defineProps<BadgeProps>(), {
  variant: 'primary'
})
</script>
