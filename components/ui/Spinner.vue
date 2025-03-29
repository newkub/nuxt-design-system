<script setup lang="ts">
interface Props {
  size?: 'sm' | 'md' | 'lg'
  color?: string
  speed?: string
  thickness?: number
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
  color: 'primary-500',
  speed: '1s',
  thickness: 4
})

const sizes = {
  sm: 'h-4 w-4',
  md: 'h-8 w-8',
  lg: 'h-12 w-12'
}
</script>

<template>
  <div role="status" class="flex justify-center">
    <svg
      class="animate-spin"
      :class="[sizes[props.size], `duration-${props.speed.replace('s', '')}`]"
      viewBox="0 0 24 24"
    >
      <circle
        class="opacity-25"
        cx="12"
        cy="12"
        r="10"
        :class="`stroke-${props.color}`"
        :stroke-width="props.thickness"
        fill="none"
      />
      <path
        class="opacity-75"
        :class="`fill-${props.color}`"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
    <span class="sr-only">Loading...</span>
  </div>
</template>
