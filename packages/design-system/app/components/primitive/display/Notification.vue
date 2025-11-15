<script setup lang="ts">
const props = withDefaults(defineProps<{
  title: string
  message?: string
  type?: 'info' | 'success' | 'warning' | 'error'
  duration?: number
  closable?: boolean
}>(), {
  type: 'info',
  duration: 4500,
  closable: true
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
  <Transition name="notification">
    <div v-if="isVisible" :class="['notification', type]">
      <div class="notification-icon">
        {{ typeIcons[type] }}
      </div>
      
      <div class="notification-content">
        <h4 class="notification-title">{{ title }}</h4>
        <p v-if="message" class="notification-message">{{ message }}</p>
      </div>
      
      <button v-if="closable" @click="isVisible = false; emit('close')" class="notification-close">
        ✕
      </button>
    </div>
  </Transition>
</template>

<style scoped>
.notification {
  @apply flex items-start gap-3 p-4 rounded-lg border shadow-lg min-w-[300px] max-w-[400px] bg-white;
}

.notification.success {
  @apply border-green-200;
}

.notification.error {
  @apply border-red-200;
}

.notification.warning {
  @apply border-yellow-200;
}

.notification.info {
  @apply border-blue-200;
}

.notification-icon {
  @apply text-xl flex-shrink-0;
}

.notification.success .notification-icon {
  @apply text-green-600;
}

.notification.error .notification-icon {
  @apply text-red-600;
}

.notification.warning .notification-icon {
  @apply text-yellow-600;
}

.notification.info .notification-icon {
  @apply text-blue-600;
}

.notification-content {
  @apply flex-1;
}

.notification-title {
  @apply font-semibold text-gray-900 mb-1;
}

.notification-message {
  @apply text-sm text-gray-600;
}

.notification-close {
  @apply flex-shrink-0 text-gray-400 hover:text-gray-600;
}

.notification-enter-active,
.notification-leave-active {
  @apply transition-all duration-300;
}

.notification-enter-from {
  @apply opacity-0 transform translate-x-full;
}

.notification-leave-to {
  @apply opacity-0 transform scale-95;
}
</style>
