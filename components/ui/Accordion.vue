<script setup lang="ts">
import { ref, provide } from 'vue'

const props = defineProps({
  multiple: { type: Boolean, default: false },
  defaultOpen: { type: Array as () => number[], default: () => [] }
})

const activeItems = ref<number[]>(props.defaultOpen)

const toggleItem = (index: number) => {
  if (props.multiple) {
    const itemIndex = activeItems.value.indexOf(index)
    if (itemIndex > -1) {
      activeItems.value.splice(itemIndex, 1)
    } else {
      activeItems.value.push(index)
    }
  } else {
    activeItems.value = activeItems.value.includes(index) ? [] : [index]
  }
}

provide('accordion', {
  activeItems,
  toggleItem
})
</script>

<template>
  <div class="space-y-2">
    <slot />
  </div>
</template>

<style scoped>
.accordion-enter-active,
.accordion-leave-active {
  transition: all 0.3s ease;
}

.accordion-enter-from,
.accordion-leave-to {
  opacity: 0;
  max-height: 0;
}
</style>
