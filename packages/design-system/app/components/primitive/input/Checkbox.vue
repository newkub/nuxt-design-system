<script setup lang="ts">
const props = withDefaults(defineProps<{
  modelValue?: boolean
  label?: string
  disabled?: boolean
  indeterminate?: boolean
  size?: 'sm' | 'md' | 'lg'
}>(), {
  modelValue: false,
  disabled: false,
  indeterminate: false,
  size: 'md'
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  change: [value: boolean]
}>()

const handleChange = (event: Event) => {
  const checked = (event.target as HTMLInputElement).checked
  emit('update:modelValue', checked)
  emit('change', checked)
}
</script>

<template>
  <label :class="['base-checkbox', size, { disabled }]">
    <input
      type="checkbox"
      :checked="modelValue"
      :disabled="disabled"
      :indeterminate="indeterminate"
      class="checkbox-input"
      @change="handleChange"
    />
    <span class="checkbox-box">
      <span v-if="indeterminate" class="checkbox-icon">−</span>
      <span v-else-if="modelValue" class="checkbox-icon">✓</span>
    </span>
    <span v-if="label || $slots.default" class="checkbox-label">
      <slot>{{ label }}</slot>
    </span>
  </label>
</template>

<style scoped>
.base-checkbox {
  @apply inline-flex items-center gap-2 cursor-pointer;
}

.base-checkbox.disabled {
  @apply opacity-50 cursor-not-allowed;
}

.checkbox-input {
  @apply sr-only;
}

.checkbox-box {
  @apply flex items-center justify-center border-2 border-gray-300 rounded transition-colors;
}

.base-checkbox.sm .checkbox-box {
  @apply w-4 h-4;
}

.base-checkbox.md .checkbox-box {
  @apply w-5 h-5;
}

.base-checkbox.lg .checkbox-box {
  @apply w-6 h-6;
}

.checkbox-input:checked + .checkbox-box {
  @apply bg-blue-600 border-blue-600;
}

.checkbox-input:focus + .checkbox-box {
  @apply ring-2 ring-blue-500 ring-opacity-20;
}

.checkbox-icon {
  @apply text-white font-bold;
}

.base-checkbox.sm .checkbox-icon {
  @apply text-xs;
}

.base-checkbox.md .checkbox-icon {
  @apply text-sm;
}

.base-checkbox.lg .checkbox-icon {
  @apply text-base;
}

.checkbox-label {
  @apply text-gray-700 select-none;
}

.base-checkbox.sm .checkbox-label {
  @apply text-sm;
}

.base-checkbox.md .checkbox-label {
  @apply text-base;
}

.base-checkbox.lg .checkbox-label {
  @apply text-lg;
}
</style>
