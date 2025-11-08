<script setup lang="ts">
const props = withDefaults(defineProps<{
  type?: 'success' | 'error' | 'warning' | 'info'
  title?: string
  closable?: boolean
  icon?: string
}>(), {
  type: 'info',
  closable: true
})

const emit = defineEmits<{
  close: []
}>()

const isVisible = ref(true)

const handleClose = () => {
  isVisible.value = false
  emit('close')
}

const typeIcons = {
  success: '✓',
  error: '✕',
  warning: '⚠',
  info: 'ℹ'
}
</script>

<template>
  <Transition name="alert">
    <div v-if="isVisible" :class="['alert', type]">
      <div class="alert-icon">
        {{ icon || typeIcons[type] }}
      </div>
      
      <div class="alert-content">
        <div v-if="title" class="alert-title">{{ title }}</div>
        <div class="alert-message">
          <slot />
        </div>
      </div>
      
      <button v-if="closable" @click="handleClose" class="alert-close">
        ✕
      </button>
    </div>
  </Transition>
</template>

<style scoped>
.alert {
  @apply flex items-start gap-3 p-4 rounded-lg border;
}

.alert.success {
  @apply bg-green-50 border-green-200 text-green-800;
}

.alert.error {
  @apply bg-red-50 border-red-200 text-red-800;
}

.alert.warning {
  @apply bg-yellow-50 border-yellow-200 text-yellow-800;
}

.alert.info {
  @apply bg-blue-50 border-blue-200 text-blue-800;
}

.alert-icon {
  @apply text-xl flex-shrink-0;
}

.alert-content {
  @apply flex-1;
}

.alert-title {
  @apply font-semibold mb-1;
}

.alert-message {
  @apply text-sm;
}

.alert-close {
  @apply flex-shrink-0 hover:opacity-70 text-lg;
}

.alert-enter-active,
.alert-leave-active {
  @apply transition-all duration-300;
}

.alert-enter-from,
.alert-leave-to {
  @apply opacity-0 transform scale-95;
}
</style>
