<script setup lang="ts">
interface TooltipProps {
  content?: string
  position?: 'top' | 'bottom' | 'left' | 'right'
  delay?: number
  disabled?: boolean
}

const props = withDefaults(defineProps<TooltipProps>(), {
  content: '',
  position: 'top',
  delay: 100,
  disabled: false
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
    <Transition
      enter-active-class="transition-opacity duration-150"
      enter-from-class="opacity-0"
      leave-active-class="transition-opacity duration-150"
      leave-to-class="opacity-0"
    >
      <div
        v-if="show && !props.disabled"
        role="tooltip"
        class="absolute z-50 px-3 py-2 text-sm text-white bg-gray-800 rounded-md shadow-lg
               dark:(bg-gray-700)"
        :class="{
          'bottom-full mb-2': props.position === 'top',
          'top-full mt-2': props.position === 'bottom',
          'right-full mr-2': props.position === 'left',
          'left-full ml-2': props.position === 'right'
        }"
      >
        <slot name="content">
          {{ props.content }}
        </slot>
        <div
          class="absolute w-2 h-2 bg-gray-800 rotate-45
                 dark:(bg-gray-700)"
          :class="{
            'bottom-[-0.25rem] left-1/2 -translate-x-1/2': props.position === 'top',
            'top-[-0.25rem] left-1/2 -translate-x-1/2': props.position === 'bottom',
            'right-[-0.25rem] top-1/2 -translate-y-1/2': props.position === 'left',
            'left-[-0.25rem] top-1/2 -translate-y-1/2': props.position === 'right'
          }"
        />
      </div>
    </Transition>
  </div>
</template>
