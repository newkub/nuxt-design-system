<script setup lang="ts">
const props = withDefaults(defineProps<{
  modelValue?: number
  max?: number
  readonly?: boolean
  size?: 'sm' | 'md' | 'lg'
  icon?: string
  activeIcon?: string
}>(), {
  modelValue: 0,
  max: 5,
  readonly: false,
  size: 'md',
  icon: '☆',
  activeIcon: '★'
})

const emit = defineEmits<{
  'update:modelValue': [value: number]
  change: [value: number]
}>()

const hoverValue = ref(0)

const handleClick = (value: number) => {
  if (props.readonly) return
  emit('update:modelValue', value)
  emit('change', value)
}
</script>

<template>
  <div class="rating">
    <button
      v-for="i in max"
      :key="i"
      type="button"
      :class="['rating-item', size, { readonly }]"
      @click="handleClick(i)"
      @mouseenter="!readonly && (hoverValue = i)"
      @mouseleave="hoverValue = 0"
    >
      {{ i <= (hoverValue || modelValue) ? activeIcon : icon }}
    </button>
  </div>
</template>

<style scoped>
.rating {
  @apply inline-flex gap-1;
}

.rating-item {
  @apply transition-transform hover:scale-110;
}

.rating-item.readonly {
  @apply cursor-default;
}

.rating-item.sm {
  @apply text-base;
}

.rating-item.md {
  @apply text-2xl;
}

.rating-item.lg {
  @apply text-4xl;
}
</style>
