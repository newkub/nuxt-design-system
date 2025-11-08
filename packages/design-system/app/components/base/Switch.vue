<script setup lang="ts">
const props = withDefaults(defineProps<{
  modelValue?: boolean
  disabled?: boolean
  size?: 'sm' | 'md' | 'lg'
  label?: string
}>(), {
  modelValue: false,
  disabled: false,
  size: 'md'
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  change: [value: boolean]
}>()

const handleChange = () => {
  if (!props.disabled) {
    const newValue = !props.modelValue
    emit('update:modelValue', newValue)
    emit('change', newValue)
  }
}
</script>

<template>
  <label :class="['base-switch', size, { disabled }]">
    <input
      type="checkbox"
      :checked="modelValue"
      :disabled="disabled"
      class="switch-input"
      @change="handleChange"
    />
    <span class="switch-track">
      <span class="switch-thumb" />
    </span>
    <span v-if="label || $slots.default" class="switch-label">
      <slot>{{ label }}</slot>
    </span>
  </label>
</template>

<style scoped>
.base-switch {
  @apply inline-flex items-center gap-2 cursor-pointer;
}

.base-switch.disabled {
  @apply opacity-50 cursor-not-allowed;
}

.switch-input {
  @apply sr-only;
}

.switch-track {
  @apply relative rounded-full bg-gray-300 transition-colors;
}

.base-switch.sm .switch-track {
  @apply w-8 h-4;
}

.base-switch.md .switch-track {
  @apply w-11 h-6;
}

.base-switch.lg .switch-track {
  @apply w-14 h-7;
}

.switch-input:checked + .switch-track {
  @apply bg-blue-600;
}

.switch-input:focus + .switch-track {
  @apply ring-2 ring-blue-500 ring-opacity-20;
}

.switch-thumb {
  @apply absolute top-0.5 left-0.5 bg-white rounded-full transition-transform;
}

.base-switch.sm .switch-thumb {
  @apply w-3 h-3;
}

.base-switch.md .switch-thumb {
  @apply w-5 h-5;
}

.base-switch.lg .switch-thumb {
  @apply w-6 h-6;
}

.switch-input:checked + .switch-track .switch-thumb {
  transform: translateX(100%);
}

.base-switch.sm .switch-input:checked + .switch-track .switch-thumb {
  transform: translateX(calc(2rem - 0.75rem - 0.25rem));
}

.base-switch.md .switch-input:checked + .switch-track .switch-thumb {
  transform: translateX(calc(2.75rem - 1.25rem - 0.25rem));
}

.base-switch.lg .switch-input:checked + .switch-track .switch-thumb {
  transform: translateX(calc(3.5rem - 1.5rem - 0.25rem));
}

.switch-label {
  @apply text-gray-700 select-none;
}
</style>
