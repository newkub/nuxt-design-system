<script setup lang="ts">
import { inject, ref } from 'vue'

const { activeItems, toggleItem } = inject('accordion') as {
  activeItems: number[]
  toggleItem: (index: number) => void
}

const props = defineProps({
  index: { type: Number, required: true },
  disabled: { type: Boolean, default: false }
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
