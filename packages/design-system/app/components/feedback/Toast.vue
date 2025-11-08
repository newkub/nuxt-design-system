<script setup lang="ts">
const props = withDefaults(defineProps<{
  type?: 'success' | 'error' | 'warning' | 'info'
  message: string
  duration?: number
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center'
}>(), {
  type: 'info',
  duration: 3000,
  position: 'top-right'
})

const emit = defineEmits<{
  close: []
}>()

const isVisible = ref(true)

onMounted(() => {
  if (props.duration > 0) {
    setTimeout(() => {
      isVisible.value = false
      emit('close')
    }, props.duration)
  }
})

const typeIcons = {
  success: '✓',
  error: '✕',
  warning: '⚠',
  info: 'ℹ'
}
</script>

<template>
  <Teleport to="body">
    <Transition name="toast">
      <div v-if="isVisible" :class="['toast', type, position]">
        <span class="toast-icon">{{ typeIcons[type] }}</span>
        <span class="toast-message">{{ message }}</span>
        <button @click="isVisible = false; emit('close')" class="toast-close">✕</button>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.toast {
  @apply fixed z-50 flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg min-w-[300px] max-w-[500px];
}

.toast.top-right {
  @apply top-4 right-4;
}

.toast.top-left {
  @apply top-4 left-4;
}

.toast.bottom-right {
  @apply bottom-4 right-4;
}

.toast.bottom-left {
  @apply bottom-4 left-4;
}

.toast.top-center {
  @apply top-4 left-1/2 -translate-x-1/2;
}

.toast.bottom-center {
  @apply bottom-4 left-1/2 -translate-x-1/2;
}

.toast.success {
  @apply bg-green-600 text-white;
}

.toast.error {
  @apply bg-red-600 text-white;
}

.toast.warning {
  @apply bg-yellow-600 text-white;
}

.toast.info {
  @apply bg-blue-600 text-white;
}

.toast-icon {
  @apply text-xl;
}

.toast-message {
  @apply flex-1;
}

.toast-close {
  @apply hover:opacity-70;
}

.toast-enter-active,
.toast-leave-active {
  @apply transition-all duration-300;
}

.toast-enter-from,
.toast-leave-to {
  @apply opacity-0 transform translate-y-2;
}
</style>
