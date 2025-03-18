<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps({
  content: { type: String, default: '' },
  position: {
    type: String,
    default: 'top',
    validator: (value: string) => ['top', 'bottom', 'left', 'right'].includes(value)
  },
  delay: { type: Number, default: 100 },
  disabled: { type: Boolean, default: false }
})

const show = ref(false)
let timeout: ReturnType<typeof setTimeout> | null = null

const showTooltip = () => {
  if (props.disabled) return
  timeout = setTimeout(() => {
    show.value = true
  }, props.delay)
}

const hideTooltip = () => {
  if (timeout) {
    clearTimeout(timeout)
  }
  show.value = false
}
</script>

<template>
  <div class="relative inline-block" @mouseenter="showTooltip" @mouseleave="hideTooltip">
    <!-- Trigger element -->
    <slot />

    <!-- Tooltip content -->
    <Transition name="fade">
      <div
        v-if="show && !disabled"
        role="tooltip"
        class="absolute z-50 px-3 py-2 text-sm text-white bg-gray-800 rounded-md shadow-lg"
        :class="{
          'bottom-full mb-2': position === 'top',
          'top-full mt-2': position === 'bottom',
          'right-full mr-2': position === 'left',
          'left-full ml-2': position === 'right'
        }"
      >
        <slot name="content">
          {{ content }}
        </slot>
        <div
          class="absolute w-2 h-2 bg-gray-800 rotate-45"
          :class="{
            'bottom-[-0.25rem] left-1/2 -translate-x-1/2': position === 'top',
            'top-[-0.25rem] left-1/2 -translate-x-1/2': position === 'bottom',
            'right-[-0.25rem] top-1/2 -translate-y-1/2': position === 'left',
            'left-[-0.25rem] top-1/2 -translate-y-1/2': position === 'right'
          }"
        />
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
