<script setup lang="ts">
const props = withDefaults(defineProps<{
  modelValue?: boolean
  placement?: 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end'
}>(), {
  modelValue: false,
  placement: 'bottom-start'
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

const menuRef = ref<HTMLElement>()

onClickOutside(menuRef, () => {
  if (props.modelValue) {
    emit('update:modelValue', false)
  }
})

// Divider component functionality
const MenuDivider = defineComponent({
  name: 'MenuDivider',
  setup() {
    return () => h('div', { class: 'menu-divider' })
  }
})
</script>

<template>
  <div ref="menuRef" class="menu-container">
    <div @click="emit('update:modelValue', !modelValue)">
      <slot name="trigger" />
    </div>
    
    <Transition name="menu">
      <div v-if="modelValue" :class="['menu', placement]">
        <slot />
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.menu-container {
  @apply relative inline-block;
}

.menu {
  @apply absolute mt-2 bg-white rounded-lg border border-gray-200 shadow-lg py-1 min-w-[12rem] z-50;
}

.menu.bottom-start {
  @apply top-full left-0;
}

.menu.bottom-end {
  @apply top-full right-0;
}

.menu.top-start {
  @apply bottom-full left-0 mb-2 mt-0;
}

.menu.top-end {
  @apply bottom-full right-0 mb-2 mt-0;
}

.menu-enter-active,
.menu-leave-active {
  @apply transition-all duration-200;
}

.menu-enter-from,
.menu-leave-to {
  @apply opacity-0 scale-95;
}

/* Divider styles */
.menu-divider {
  @apply my-1 border-t border-gray-200;
}
</style>