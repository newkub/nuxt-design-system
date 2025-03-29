<template>
  <div class="relative">
    <select
      :class="[
        'w-full px-4 py-2 border rounded-md cursor-pointer transition-colors',
        'bg-white dark:bg-gray-800',
        'border-gray-300 dark:border-gray-600',
        'focus:(border-primary-500 ring-2 ring-primary-500/30)',
        props.error ? 'border-error-500 focus:(border-error-500 ring-error-500/30)' : ''
      ]"
      :value="props.modelValue"
      @change="emit('update:modelValue', ($event.target as HTMLSelectElement).value)"
    >
      <option
        v-for="option in props.options"
        :key="option.value"
        :value="option.value"
        class="bg-white dark:bg-gray-800"
      >
        {{ option.label }}
      </option>
    </select>
    <div class="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
      <div class="i-[mdi-chevron-down] text-gray-400" />
    </div>
  </div>
</template>

<script setup lang="ts">
interface Option {
  value: string | number
  label: string
}

interface Props {
  options: Option[]
  modelValue?: string | number
  error?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  error: false
})

const emit = defineEmits(['update:modelValue'])
</script>

