<template>
  <input
    :type="type"
    :class="['input', { 'input--error': error }, 'w-full px-4 py-2 border rounded transition-all focus:(outline-none border-blue-500 ring-3 ring-blue-100)', error ? 'border-red-500 focus:(border-red-500 ring-red-100)' : 'border-gray-200', 'dark:(border-gray-700 focus:border-blue-500)']"
    :placeholder="placeholder"
    :value="modelValue"
    @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
  />
</template>

<script setup lang="ts">
interface InputProps {
  type?: string
  placeholder?: string
  modelValue?: string
  error?: boolean
}

withDefaults(defineProps<InputProps>(), {
  type: 'text',
  placeholder: '',
  modelValue: '',
  error: false
})

defineEmits(['update:modelValue'])
</script>

<style scoped>
/* Removed styles as they are now handled by unocss */
</style>
