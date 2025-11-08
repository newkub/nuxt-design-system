<script setup lang="ts">
defineProps<{
  tabs: Array<{ id: string; label: string; [key: string]: any }>
  orientation?: 'horizontal' | 'vertical'
  modelValue?: string
}>()

defineEmits<{
  'update:modelValue': [value: string]
}>()
</script>

<template>
  <div :class="orientation === 'vertical' ? 'flex flex-col' : 'flex'">
    <div
      v-for="tab in tabs"
      :key="tab.id"
      :class="[
        'cursor-pointer p-3',
        modelValue === tab.id ? 'bg-primary-100 border-l-2 border-primary-500' : 'hover:bg-gray-50'
      ]"
      @click="$emit('update:modelValue', tab.id)"
    >
      <slot name="item" :item="tab">
        {{ tab.label }}
      </slot>
    </div>
  </div>
</template>
