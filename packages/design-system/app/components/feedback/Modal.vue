<script setup lang="ts">
const props = withDefaults(defineProps<{
  modelValue: boolean
  title?: string
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  closable?: boolean
}>(), {
  modelValue: false,
  size: 'md',
  closable: true
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  close: []
}>()

const handleClose = () => {
  emit('update:modelValue', false)
  emit('close')
}

watch(() => props.modelValue, (newVal) => {
  if (newVal) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
})

onUnmounted(() => {
  document.body.style.overflow = ''
})
</script>

<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="modelValue" class="modal-overlay" @click="closable && handleClose()">
        <div :class="['modal', size]" @click.stop>
          <div class="modal-header">
            <h3 class="modal-title">
              <slot name="title">{{ title }}</slot>
            </h3>
            <button v-if="closable" @click="handleClose" class="modal-close">✕</button>
          </div>
          
          <div class="modal-body">
            <slot />
          </div>
          
          <div v-if="$slots.footer" class="modal-footer">
            <slot name="footer" />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.modal-overlay {
  @apply fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4;
}

.modal {
  @apply bg-white rounded-lg shadow-xl max-h-[90vh] flex flex-col;
}

.modal.sm {
  @apply w-full max-w-sm;
}

.modal.md {
  @apply w-full max-w-md;
}

.modal.lg {
  @apply w-full max-w-lg;
}

.modal.xl {
  @apply w-full max-w-2xl;
}

.modal.full {
  @apply w-full h-full max-w-none max-h-none rounded-none;
}

.modal-header {
  @apply flex items-center justify-between p-6 border-b border-gray-200;
}

.modal-title {
  @apply text-xl font-semibold text-gray-900;
}

.modal-close {
  @apply text-2xl text-gray-500 hover:text-gray-700;
}

.modal-body {
  @apply p-6 overflow-y-auto flex-1;
}

.modal-footer {
  @apply p-6 border-t border-gray-200 flex items-center justify-end gap-3;
}

.modal-enter-active,
.modal-leave-active {
  @apply transition-opacity duration-300;
}

.modal-enter-from,
.modal-leave-to {
  @apply opacity-0;
}

.modal-enter-active .modal,
.modal-leave-active .modal {
  @apply transition-transform duration-300;
}

.modal-enter-from .modal,
.modal-leave-to .modal {
  @apply scale-95;
}
</style>
