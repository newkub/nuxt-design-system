<script setup lang="ts">
import { inject } from 'vue'

const { activeTab, setActiveTab } = inject('tabs', {
  activeTab: 0,
  setActiveTab: () => {}
}) as {
  activeTab: number
  setActiveTab: (index: number) => void
}

const props = defineProps({
  index: { type: Number, required: true },
  disabled: { type: Boolean, default: false }
})

const isActive = activeTab === props.index

const handleClick = () => {
  if (props.disabled) return
  setActiveTab(props.index)
}
</script>

<template>
  <div
    class="p-3 cursor-pointer border-b-2"
    :class="{
      'border-blue-500 text-blue-500': isActive,
      'border-transparent text-gray-500': !isActive,
      'cursor-not-allowed opacity-50': disabled
    }"
    @click="handleClick"
    role="tab"
    :aria-selected="isActive"
    :aria-disabled="disabled"
  >
    <slot name="label" />
  </div>
</template>
