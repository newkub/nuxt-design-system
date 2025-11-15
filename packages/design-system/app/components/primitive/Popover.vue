<script setup lang="ts">
const props = withDefaults(defineProps<{
  modelValue?: boolean
  placement?: 'top' | 'bottom' | 'left' | 'right'
  trigger?: 'hover' | 'click'
  title?: string
}>(), {
  modelValue: false,
  placement: 'bottom',
  trigger: 'click'
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

const isOpen = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
})

const popoverRef = ref<HTMLElement>()

onClickOutside(popoverRef, () => {
  if (props.trigger === 'click') {
    isOpen.value = false
  }
})
</script>

<template>
  <div 
    ref="popoverRef"
    class="popover-container"
    @mouseenter="trigger === 'hover' && (isOpen = true)"
    @mouseleave="trigger === 'hover' && (isOpen = false)"
  >
    <div @click="trigger === 'click' && (isOpen = !isOpen)">
      <slot name="trigger" />
    </div>
    
    <Transition name="popover">
      <div v-if="isOpen" :class="['popover', placement]">
        <div v-if="title" class="popover-title">{{ title }}</div>
        <div class="popover-content">
          <slot />
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.popover-container {
  @apply relative inline-block;
}

.popover {
  @apply absolute z-50 bg-white rounded-lg border border-gray-200 shadow-lg min-w-[200px] max-w-[300px];
}

.popover.top {
  @apply bottom-full left-1/2 -translate-x-1/2 mb-2;
}

.popover.bottom {
  @apply top-full left-1/2 -translate-x-1/2 mt-2;
}

.popover.left {
  @apply right-full top-1/2 -translate-y-1/2 mr-2;
}

.popover.right {
  @apply left-full top-1/2 -translate-y-1/2 ml-2;
}

.popover-title {
  @apply px-4 py-2 border-b border-gray-200 font-semibold;
}

.popover-content {
  @apply p-4;
}

.popover-enter-active,
.popover-leave-active {
  @apply transition-all duration-200;
}

.popover-enter-from,
.popover-leave-to {
  @apply opacity-0 scale-95;
}
</style>
