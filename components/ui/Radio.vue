<template>
  <label class="flex items-center gap-2 cursor-pointer">
    <input
      type="radio"
      :value="props.value"
      :checked="props.modelValue === props.value"
      @change="emit('update:modelValue', props.value)"
      class="w-4 h-4 border border-gray-300 rounded-full appearance-none transition-colors
        checked:(bg-primary-500 border-primary-500)
        focus:(ring-2 ring-primary-500/30)
        dark:(border-gray-600)"
    />
    <span class="text-sm text-gray-700 dark:text-gray-200">
      <slot />
    </span>
  </label>
</template>

<script setup lang="ts">
interface Props {
  value: string | number
  modelValue?: string | number
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: ''
})

const emit = defineEmits(['update:modelValue'])
</script>

