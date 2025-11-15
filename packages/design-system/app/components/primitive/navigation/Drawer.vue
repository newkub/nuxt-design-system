<script setup lang="ts">
const props = withDefaults(defineProps<{
  modelValue: boolean
  position?: 'left' | 'right' | 'top' | 'bottom'
  size?: string
}>(), {
  modelValue: false,
  position: 'right',
  size: '400px'
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  close: []
}>()

const handleClose = () => {
  emit('update:modelValue', false)
  emit('close')
}
</script>

<template>
  <Teleport to="body">
    <Transition name="drawer-overlay">
      <div v-if="modelValue" class="drawer-overlay" @click="handleClose" />
    </Transition>
    
    <Transition :name="`drawer-${position}`">
      <div v-if="modelValue" :class="['drawer', position]" :style="getDrawerStyle">
        <div class="drawer-header">
          <slot name="header" />
          <button @click="handleClose" class="drawer-close">✕</button>
        </div>
        
        <div class="drawer-content">
          <slot />
        </div>
        
        <div class="drawer-footer">
          <slot name="footer" />
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script lang="ts">
export default {
  computed: {
    getDrawerStyle() {
      const { position, size } = this
      if (position === 'left' || position === 'right') {
        return { width: size }
      }
      return { height: size }
    }
  }
}
</script>

<style scoped>
.drawer-overlay {
  @apply fixed inset-0 bg-black bg-opacity-50 z-40;
}

.drawer {
  @apply fixed bg-white z-50 flex flex-col shadow-xl;
}

.drawer.left {
  @apply top-0 bottom-0 left-0 border-r border-gray-200;
}

.drawer.right {
  @apply top-0 bottom-0 right-0 border-l border-gray-200;
}

.drawer.top {
  @apply top-0 left-0 right-0 border-b border-gray-200;
}

.drawer.bottom {
  @apply bottom-0 left-0 right-0 border-t border-gray-200;
}

.drawer-header {
  @apply p-4 border-b border-gray-200 flex items-center justify-between;
}

.drawer-close {
  @apply p-2 hover:bg-gray-100 rounded-lg text-xl;
}

.drawer-content {
  @apply flex-1 overflow-y-auto p-4;
}

.drawer-footer {
  @apply p-4 border-t border-gray-200;
}

.drawer-overlay-enter-active,
.drawer-overlay-leave-active {
  @apply transition-opacity duration-300;
}

.drawer-overlay-enter-from,
.drawer-overlay-leave-to {
  @apply opacity-0;
}

.drawer-left-enter-active,
.drawer-left-leave-active,
.drawer-right-enter-active,
.drawer-right-leave-active,
.drawer-top-enter-active,
.drawer-top-leave-active,
.drawer-bottom-enter-active,
.drawer-bottom-leave-active {
  @apply transition-transform duration-300;
}

.drawer-left-enter-from,
.drawer-left-leave-to {
  transform: translateX(-100%);
}

.drawer-right-enter-from,
.drawer-right-leave-to {
  transform: translateX(100%);
}

.drawer-top-enter-from,
.drawer-top-leave-to {
  transform: translateY(-100%);
}

.drawer-bottom-enter-from,
.drawer-bottom-leave-to {
  transform: translateY(100%);
}
</style>
