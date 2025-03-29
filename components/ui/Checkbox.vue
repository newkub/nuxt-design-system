<template>
  <label class="flex items-center gap-2 cursor-pointer">
    <input
      type="checkbox"
      :checked="modelValue"
      @change="$emit('update:modelValue', ($event.target as HTMLInputElement).checked)"
      class="w-4 h-4 appearance-none cursor-pointer border border-gray-200 dark:border-gray-600 rounded transition-all duration-200 checked:(bg-blue-500 border-blue-500) focus:(outline-none shadow-outline-blue)"
    />
    <span class="text-sm text-gray-600 dark:text-gray-300">
      <slot />
    </span>
  </label>
</template>

<script setup lang="ts">
interface Props {
  modelValue?: boolean
}

withDefaults(defineProps<Props>(), {
  modelValue: false
})

defineEmits(['update:modelValue'])
</script>