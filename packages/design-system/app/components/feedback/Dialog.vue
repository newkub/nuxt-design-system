<script setup lang="ts">
const props = withDefaults(defineProps<{
  modelValue: boolean
  title?: string
  message?: string
  type?: 'info' | 'warning' | 'error' | 'success'
  confirmText?: string
  cancelText?: string
  showCancel?: boolean
}>(), {
  modelValue: false,
  type: 'info',
  confirmText: 'Confirm',
  cancelText: 'Cancel',
  showCancel: true
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  confirm: []
  cancel: []
}>()

const handleConfirm = () => {
  emit('confirm')
  emit('update:modelValue', false)
}

const handleCancel = () => {
  emit('cancel')
  emit('update:modelValue', false)
}

const typeIcons = {
  success: '✓',
  error: '✕',
  warning: '⚠',
  info: 'ℹ'
}
</script>

<template>
  <Teleport to="body">
    <Transition name="dialog">
      <div v-if="modelValue" class="dialog-overlay" @click="handleCancel">
        <div class="dialog" @click.stop>
          <div :class="['dialog-icon', type]">
            {{ typeIcons[type] }}
          </div>
          
          <div class="dialog-content">
            <h3 v-if="title" class="dialog-title">{{ title }}</h3>
            <p v-if="message" class="dialog-message">{{ message }}</p>
            <slot />
          </div>
          
          <div class="dialog-actions">
            <button v-if="showCancel" @click="handleCancel" class="dialog-btn cancel">
              {{ cancelText }}
            </button>
            <button @click="handleConfirm" class="dialog-btn confirm">
              {{ confirmText }}
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.dialog-overlay {
  @apply fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4;
}

.dialog {
  @apply bg-white rounded-lg shadow-xl w-full max-w-md p-6 text-center;
}

.dialog-icon {
  @apply w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center text-3xl font-bold;
}

.dialog-icon.success {
  @apply bg-green-100 text-green-600;
}

.dialog-icon.error {
  @apply bg-red-100 text-red-600;
}

.dialog-icon.warning {
  @apply bg-yellow-100 text-yellow-600;
}

.dialog-icon.info {
  @apply bg-blue-100 text-blue-600;
}

.dialog-content {
  @apply mb-6;
}

.dialog-title {
  @apply text-xl font-semibold text-gray-900 mb-2;
}

.dialog-message {
  @apply text-gray-600;
}

.dialog-actions {
  @apply flex items-center justify-center gap-3;
}

.dialog-btn {
  @apply px-6 py-2 rounded-lg font-medium transition-colors;
}

.dialog-btn.cancel {
  @apply border border-gray-300 text-gray-700 hover:bg-gray-50;
}

.dialog-btn.confirm {
  @apply bg-blue-600 text-white hover:bg-blue-700;
}

.dialog-enter-active,
.dialog-leave-active {
  @apply transition-opacity duration-300;
}

.dialog-enter-from,
.dialog-leave-to {
  @apply opacity-0;
}

.dialog-enter-active .dialog,
.dialog-leave-active .dialog {
  @apply transition-transform duration-300;
}

.dialog-enter-from .dialog,
.dialog-leave-to .dialog {
  @apply scale-95;
}
</style>
