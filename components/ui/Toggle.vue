<template>
  <label class="relative inline-block w-10 h-6">
    <input
      type="checkbox"
      :checked="modelValue"
      @change="emit('update:modelValue', ($event.target as HTMLInputElement).checked)"
      class="opacity-0 w-0 h-0"
      aria-label="Toggle switch"
    />
    <span 
      class="absolute cursor-pointer inset-0 bg-gray-200 rounded-full transition-all duration-200
             before:(absolute content-empty h-5 w-5 left-0.5 bottom-0.5 bg-white rounded-full transition-all duration-200)
             checked:(bg-blue-500 before:translate-x-4)
             focus:(ring-2 ring-blue-500/10)
             dark:(bg-gray-600)"
    />
  </label>
</template>

<script setup lang="ts">
interface ToggleProps {
  modelValue?: boolean
}

const props = withDefaults(defineProps<ToggleProps>(), {
  modelValue: false
})

const emit = defineEmits(['update:modelValue'])
</script>

