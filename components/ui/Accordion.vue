<script setup lang="ts">
import { ref, provide, withDefaults, defineProps } from 'vue'

interface Props {
  multiple?: boolean
  defaultOpen?: number[]
  index?: number
}

const props = withDefaults(defineProps<Props>(), {
  multiple: false,
  defaultOpen: () => []
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
    <slot>
      <div class="border rounded-lg overflow-hidden">
        <button
          class="w-full p-4 text-left flex items-center justify-between"
          @click="toggleItem(props.index)"
          :aria-expanded="activeItems.includes(props.index)"
        >
          <slot name="header" />
          <span class="transform transition-transform duration-200" :class="{ 'rotate-180': activeItems.includes(props.index) }">
            ▼
          </span>
        </button>

        <Transition
          enter-active-class="transition-opacity duration-300"
          enter-from-class="opacity-0 max-h-0"
          leave-active-class="transition-opacity duration-300"
          leave-to-class="opacity-0 max-h-0"
        >
          <div v-if="activeItems.includes(props.index)" class="p-4 pt-0">
            <slot name="content" />
          </div>
        </Transition>
      </div>
    </slot>
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
