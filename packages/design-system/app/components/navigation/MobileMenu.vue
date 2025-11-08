<script setup lang="ts">
const props = withDefaults(defineProps<{
  modelValue: boolean
}>(), {
  modelValue: false
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
    <Transition name="mobile-menu">
      <div v-if="modelValue" class="mobile-menu-overlay" @click="handleClose">
        <div class="mobile-menu" @click.stop>
          <div class="mobile-menu-header">
            <slot name="header" />
            <button @click="handleClose" class="close-btn">✕</button>
          </div>
          
          <div class="mobile-menu-content">
            <slot />
          </div>
          
          <div class="mobile-menu-footer">
            <slot name="footer" />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.mobile-menu-overlay {
  @apply fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end;
}

.mobile-menu {
  @apply w-full bg-white rounded-t-2xl max-h-[80vh] flex flex-col;
}

.mobile-menu-header {
  @apply p-4 border-b border-gray-200 flex items-center justify-between;
}

.close-btn {
  @apply p-2 hover:bg-gray-100 rounded-lg text-xl;
}

.mobile-menu-content {
  @apply flex-1 overflow-y-auto p-4;
}

.mobile-menu-footer {
  @apply p-4 border-t border-gray-200;
}

.mobile-menu-enter-active,
.mobile-menu-leave-active {
  @apply transition-all duration-300;
}

.mobile-menu-enter-from .mobile-menu,
.mobile-menu-leave-to .mobile-menu {
  transform: translateY(100%);
}

.mobile-menu-enter-from,
.mobile-menu-leave-to {
  @apply opacity-0;
}
</style>
