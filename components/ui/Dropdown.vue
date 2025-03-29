<script setup lang="ts">
interface Props {
  position?: 'bottom' | 'top' | 'left' | 'right'
  trigger?: 'click' | 'hover'
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  position: 'bottom',
  trigger: 'click',
  disabled: false
})

const isOpen = ref(false)

const toggleDropdown = () => {
  if (props.disabled) return
  isOpen.value = !isOpen.value
}

const positionClasses = {
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
      @click="props.trigger === 'click' && toggleDropdown()"
      @mouseenter="props.trigger === 'hover' && !props.disabled && (isOpen = true)"
      @mouseleave="props.trigger === 'hover' && !props.disabled && (isOpen = false)"
    >
      <slot />
    </div>

    <!-- Dropdown content -->
    <Transition
      enter-active-class="transition-opacity duration-150"
      enter-from-class="opacity-0"
      leave-active-class="transition-opacity duration-150"
      leave-to-class="opacity-0"
    >
      <div
        v-if="isOpen && !props.disabled"
        class="absolute z-50 bg-white dark:bg-gray-800 rounded-md shadow-lg dark:shadow-gray-900"
        :class="positionClasses[props.position]"
        role="menu"
      >
        <slot name="content">
          <div
            class="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
            role="menuitem"
            @click="$emit('click', $event)"
          >
            <slot name="item" />
          </div>
        </slot>
      </div>
    </Transition>
  </div>
</template>
