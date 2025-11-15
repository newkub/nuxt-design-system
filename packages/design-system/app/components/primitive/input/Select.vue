<script setup lang="ts">
interface SelectOption {
  label: string
  value: string | number
  disabled?: boolean
}

const props = withDefaults(defineProps<{
  modelValue?: string | number
  options: SelectOption[]
  placeholder?: string
  disabled?: boolean
  required?: boolean
  size?: 'sm' | 'md' | 'lg'
  error?: boolean
}>(), {
  disabled: false,
  required: false,
  size: 'md',
  error: false
})

const emit = defineEmits<{
  'update:modelValue': [value: string | number]
  change: [value: string | number]
}>()

const handleChange = (event: Event) => {
  const value = (event.target as HTMLSelectElement).value
  emit('update:modelValue', value)
  emit('change', value)
}
</script>

<template>
  <select
    :value="modelValue"
    :disabled="disabled"
    :required="required"
    :class="['base-select', size, { error, disabled }]"
    @change="handleChange"
  >
    <option v-if="placeholder" value="" disabled selected>
      {{ placeholder }}
    </option>
    <option
      v-for="option in options"
      :key="option.value"
      :value="option.value"
      :disabled="option.disabled"
    >
      {{ option.label }}
    </option>
  </select>
</template>

<style scoped>
.base-select {
  @apply w-full border border-gray-300 rounded-lg bg-white outline-none transition-colors cursor-pointer;
}

.base-select:focus {
  @apply border-blue-500 ring-2 ring-blue-500 ring-opacity-20;
}

.base-select.error {
  @apply border-red-500;
}

.base-select.error:focus {
  @apply border-red-500 ring-red-500 ring-opacity-20;
}

.base-select.disabled {
  @apply bg-gray-100 cursor-not-allowed;
}

.base-select.sm {
  @apply px-3 py-1.5 text-sm;
}

.base-select.md {
  @apply px-4 py-2 text-base;
}

.base-select.lg {
  @apply px-5 py-3 text-lg;
}
</style>
