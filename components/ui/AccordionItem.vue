<script setup lang="ts">
import { inject, ref, withDefaults, defineProps } from 'vue'

interface AccordionContext {
  activeItems: number[]
  toggleItem: (index: number) => void
}

interface Props {
  index: number
  disabled?: boolean
}

const { activeItems, toggleItem } = inject<AccordionContext>('accordion', {
  activeItems: [],
  toggleItem: () => {}
})

const props = withDefaults(defineProps<Props>(), {
  disabled: false
})

const isOpen = ref(activeItems.includes(props.index))

const toggle = () => {
  if (props.disabled) return
  toggleItem(props.index)
  isOpen.value = !isOpen.value
}
</script>

<template>
  <div class="border rounded-lg overflow-hidden">
    <button
      class="w-full p-4 text-left flex items-center justify-between"
      :disabled="disabled"
      @click="toggle"
      :aria-expanded="isOpen"
    >
      <slot name="header" />
      <span class="transform transition-transform duration-200" :class="{ 'rotate-180': isOpen }">
        ▼
      </span>
    </button>

    <Transition name="accordion">
      <div v-if="isOpen" class="p-4 pt-0">
        <slot name="content" />
      </div>
    </Transition>
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
