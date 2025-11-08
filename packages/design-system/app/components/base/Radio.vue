<script setup lang="ts">
const props = withDefaults(defineProps<{
  modelValue?: string | number
  value: string | number
  label?: string
  disabled?: boolean
  size?: 'sm' | 'md' | 'lg'
}>(), {
  disabled: false,
  size: 'md'
})

const emit = defineEmits<{
  'update:modelValue': [value: string | number]
  change: [value: string | number]
}>()

const isChecked = computed(() => props.modelValue === props.value)

const handleChange = () => {
  if (!props.disabled) {
    emit('update:modelValue', props.value)
    emit('change', props.value)
  }
}
</script>

<template>
  <label :class="['base-radio', size, { disabled }]">
    <input
      type="radio"
      :checked="isChecked"
      :value="value"
      :disabled="disabled"
      class="radio-input"
      @change="handleChange"
    />
    <span class="radio-circle">
      <span v-if="isChecked" class="radio-dot" />
    </span>
    <span v-if="label || $slots.default" class="radio-label">
      <slot>{{ label }}</slot>
    </span>
  </label>
</template>

<style scoped>
.base-radio {
  @apply inline-flex items-center gap-2 cursor-pointer;
}

.base-radio.disabled {
  @apply opacity-50 cursor-not-allowed;
}

.radio-input {
  @apply sr-only;
}

.radio-circle {
  @apply flex items-center justify-center border-2 border-gray-300 rounded-full transition-colors;
}

.base-radio.sm .radio-circle {
  @apply w-4 h-4;
}

.base-radio.md .radio-circle {
  @apply w-5 h-5;
}

.base-radio.lg .radio-circle {
  @apply w-6 h-6;
}

.radio-input:checked + .radio-circle {
  @apply bg-white border-blue-600;
}

.radio-input:focus + .radio-circle {
  @apply ring-2 ring-blue-500 ring-opacity-20;
}

.radio-dot {
  @apply block rounded-full bg-blue-600;
}

.base-radio.sm .radio-dot {
  @apply w-2 h-2;
}

.base-radio.md .radio-dot {
  @apply w-2.5 h-2.5;
}

.base-radio.lg .radio-dot {
  @apply w-3 h-3;
}

.radio-label {
  @apply text-gray-700 select-none;
}

.base-radio.sm .radio-label {
  @apply text-sm;
}

.base-radio.md .radio-label {
  @apply text-base;
}

.base-radio.lg .radio-label {
  @apply text-lg;
}
</style>
