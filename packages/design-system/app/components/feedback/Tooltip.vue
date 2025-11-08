<script setup lang="ts">
const props = withDefaults(defineProps<{
  content?: string
  placement?: 'top' | 'bottom' | 'left' | 'right'
  trigger?: 'hover' | 'click'
}>(), {
  placement: 'top',
  trigger: 'hover'
})

const isVisible = ref(false)
const tooltipRef = ref<HTMLElement>()

const show = () => {
  isVisible.value = true
}
const hide = () => {
  isVisible.value = false
}

onClickOutside(tooltipRef, () => {
  if (props.trigger === 'click') {
    hide()
  }
})
</script>

<template>
  <div 
    ref="tooltipRef"
    class="tooltip-container"
    @mouseenter="trigger === 'hover' && show()"
    @mouseleave="trigger === 'hover' && hide()"
    @click="trigger === 'click' && (isVisible = !isVisible)"
  >
    <slot />
    
    <Transition name="tooltip">
      <div v-if="isVisible" :class="['tooltip', placement]">
        <slot name="content">{{ content }}</slot>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.tooltip-container {
  @apply relative inline-block;
}

.tooltip {
  @apply absolute z-50 px-2 py-1 bg-gray-900 text-white text-sm rounded whitespace-nowrap;
}

.tooltip.top {
  @apply bottom-full left-1/2 -translate-x-1/2 mb-2;
}

.tooltip.bottom {
  @apply top-full left-1/2 -translate-x-1/2 mt-2;
}

.tooltip.left {
  @apply right-full top-1/2 -translate-y-1/2 mr-2;
}

.tooltip.right {
  @apply left-full top-1/2 -translate-y-1/2 ml-2;
}

.tooltip-enter-active,
.tooltip-leave-active {
  @apply transition-all duration-200;
}

.tooltip-enter-from,
.tooltip-leave-to {
  @apply opacity-0 scale-95;
}
</style>
