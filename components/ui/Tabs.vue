<script setup lang="ts">
import { ref, provide } from 'vue'

const props = defineProps({
  modelValue: { type: Number, default: 0 },
  vertical: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false }
})

const emit = defineEmits(['update:modelValue'])

const activeTab = ref(props.modelValue)

const setActiveTab = (index: number) => {
  if (props.disabled) return
  activeTab.value = index
  emit('update:modelValue', index)
}

provide('tabs', {
  activeTab,
  setActiveTab
})
</script>

<template>
  <div class="flex" :class="{ 'flex-col': vertical, 'flex-row': !vertical }">
    <slot />
  </div>
</template>
