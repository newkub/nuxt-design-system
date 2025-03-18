<script setup lang="ts">
const props = defineProps({
  size: {
    type: String,
    default: 'md',
    validator: (value: string) => ['sm', 'md', 'lg'].includes(value)
  },
  color: { type: String, default: '#3b82f6' },
  speed: { type: String, default: '1s' },
  thickness: { type: Number, default: 4 }
})

const sizes = {
  sm: 'h-4 w-4',
  md: 'h-8 w-8',
  lg: 'h-12 w-12'
}
</script>

<template>
  <div role="status">
    <svg
      class="animate-spin"
      :class="sizes[size as keyof typeof sizes]"
      :style="{
        animationDuration: speed
      }"
      viewBox="0 0 24 24"
    >
      <circle
        class="opacity-25"
        cx="12"
        cy="12"
        r="10"
        :stroke="color"
        :stroke-width="thickness"
        fill="none"
      />
      <path
        class="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
    <span class="sr-only">Loading...</span>
  </div>
</template>
