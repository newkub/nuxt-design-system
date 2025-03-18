<script setup lang="ts">
interface PositionClasses {
  bottom: string
  top: string
  left: string
  right: string
}

const props = defineProps({
  position: {
    type: String as () => keyof PositionClasses,
    default: 'bottom',
    validator: (value: string) => ['bottom', 'top', 'left', 'right'].includes(value)
  },
  trigger: {
    type: String,
    default: 'click',
    validator: (value: string) => ['click', 'hover'].includes(value)
  },
  disabled: { type: Boolean, default: false }
})

const isOpen = ref(false)

const toggleDropdown = () => {
  if (props.disabled) return
  isOpen.value = !isOpen.value
}

const positionClasses: PositionClasses = {
  bottom: 'top-full mt-2',
  top: 'bottom-full mb-2',
  left: 'right-full mr-2',
  right: 'left-full ml-2'
}
</script>

<template>
  <div class="relative inline-block">
    <!-- Trigger element -->
    <div
      @click="trigger === 'click' && toggleDropdown()"
      @mouseenter="trigger === 'hover' && !disabled && (isOpen = true)"
      @mouseleave="trigger === 'hover' && !disabled && (isOpen = false)"
    >
      <slot />
    </div>

    <!-- Dropdown content -->
    <Transition name="fade">
      <div
        v-if="isOpen && !disabled"
        class="absolute z-50 bg-white rounded-md shadow-lg"
        :class="positionClasses[props.position]"
        role="menu"
      >
        <slot name="content" />
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
