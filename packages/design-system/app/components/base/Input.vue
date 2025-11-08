<script setup lang="ts">
const props = withDefaults(defineProps<{
  modelValue?: string | number
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search'
  placeholder?: string
  disabled?: boolean
  readonly?: boolean
  required?: boolean
  size?: 'sm' | 'md' | 'lg'
  error?: boolean
  prefix?: string
  suffix?: string
}>(), {
  type: 'text',
  disabled: false,
  readonly: false,
  required: false,
  size: 'md',
  error: false
})

const emit = defineEmits<{
  'update:modelValue': [value: string | number]
  focus: [event: FocusEvent]
  blur: [event: FocusEvent]
  input: [event: Event]
}>()

const inputRef = ref<HTMLInputElement>()

const focus = () => inputRef.value?.focus()
const blur = () => inputRef.value?.blur()

defineExpose({ focus, blur })
</script>

<template>
  <div :class="['base-input-wrapper', size, { error, disabled }]">
    <span v-if="prefix" class="input-prefix">{{ prefix }}</span>
    <input
      ref="inputRef"
      :value="modelValue"
      :type="type"
      :placeholder="placeholder"
      :disabled="disabled"
      :readonly="readonly"
      :required="required"
      :class="['base-input', { 'has-prefix': prefix, 'has-suffix': suffix }]"
      @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      @focus="emit('focus', $event)"
      @blur="emit('blur', $event)"
    />
    <span v-if="suffix" class="input-suffix">{{ suffix }}</span>
  </div>
</template>

<style scoped>
.base-input-wrapper {
  @apply relative flex items-center border border-gray-300 rounded-lg bg-white transition-colors;
}

.base-input-wrapper:focus-within {
  @apply border-blue-500 ring-2 ring-blue-500 ring-opacity-20;
}

.base-input-wrapper.error {
  @apply border-red-500;
}

.base-input-wrapper.error:focus-within {
  @apply border-red-500 ring-red-500 ring-opacity-20;
}

.base-input-wrapper.disabled {
  @apply bg-gray-100 cursor-not-allowed;
}

.base-input-wrapper.sm {
  @apply text-sm;
}

.base-input-wrapper.sm .base-input {
  @apply px-3 py-1.5;
}

.base-input-wrapper.md {
  @apply text-base;
}

.base-input-wrapper.md .base-input {
  @apply px-4 py-2;
}

.base-input-wrapper.lg {
  @apply text-lg;
}

.base-input-wrapper.lg .base-input {
  @apply px-5 py-3;
}

.base-input {
  @apply flex-1 w-full bg-transparent outline-none disabled:cursor-not-allowed;
}

.base-input.has-prefix {
  @apply pl-0;
}

.base-input.has-suffix {
  @apply pr-0;
}

.input-prefix,
.input-suffix {
  @apply px-3 text-gray-500;
}
</style>
