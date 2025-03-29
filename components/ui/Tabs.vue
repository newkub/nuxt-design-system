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
  setActiveTab: (index: number) => setActiveTab(index)
})
</script>

<template>
  <div class="flex" :class="{ 'flex-col': vertical, 'flex-row': !vertical }">
    <Tab :index="0" :active="activeTab.value === 0">Tab 1</Tab>
    <Tab :index="1" :active="activeTab.value === 1">Tab 2</Tab>
  </div>
</template>
