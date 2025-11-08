<script setup lang="ts">
const props = withDefaults(defineProps<{
  modelValue?: boolean
  width?: string
  position?: 'left' | 'right'
  overlay?: boolean
}>(), {
  modelValue: true,
  width: '256px',
  position: 'left',
  overlay: true
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
  <div>
    <div 
      v-if="overlay && modelValue" 
      @click="handleClose"
      class="sidebar-overlay"
    />
    
    <aside 
      :class="['sidebar', position, { open: modelValue }]"
      :style="{ width }"
    >
      <div class="sidebar-header">
        <slot name="header" />
        <button @click="handleClose" class="close-btn">✕</button>
      </div>
      
      <div class="sidebar-content">
        <slot />
      </div>
      
      <div class="sidebar-footer">
        <slot name="footer" />
      </div>
    </aside>
  </div>
</template>

<style scoped>
.sidebar-overlay {
  @apply fixed inset-0 bg-black bg-opacity-50 z-40;
}

.sidebar {
  @apply fixed top-0 bottom-0 bg-white border-gray-200 z-50 transform transition-transform duration-300 flex flex-col;
}

.sidebar.left {
  @apply left-0 border-r;
  transform: translateX(-100%);
}

.sidebar.right {
  @apply right-0 border-l;
  transform: translateX(100%);
}

.sidebar.left.open {
  transform: translateX(0);
}

.sidebar.right.open {
  transform: translateX(0);
}

.sidebar-header {
  @apply p-4 border-b border-gray-200 flex items-center justify-between;
}

.close-btn {
  @apply p-2 hover:bg-gray-100 rounded-lg;
}

.sidebar-content {
  @apply flex-1 overflow-y-auto p-4;
}

.sidebar-footer {
  @apply p-4 border-t border-gray-200;
}
</style>
