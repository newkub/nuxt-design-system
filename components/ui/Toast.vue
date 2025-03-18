<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'

const props = defineProps({
  message: { type: String, required: true },
  type: { 
    type: String, 
    default: 'info',
    validator: (value: string) => ['success', 'error', 'warning', 'info'].includes(value)
  },
  duration: { type: Number, default: 3000 },
  position: {
    type: String,
    default: 'top-right',
    validator: (value: string) => 
      ['top-right', 'top-left', 'bottom-right', 'bottom-left'].includes(value)
  }
})

const emit = defineEmits(['close'])
const show = ref(true)

const types = {
  success: 'bg-green-500',
  error: 'bg-red-500',
  warning: 'bg-yellow-500',
  info: 'bg-blue-500'
}

const positions = {
  'top-right': 'top-4 right-4',
  'top-left': 'top-4 left-4',
  'bottom-right': 'bottom-4 right-4',
  'bottom-left': 'bottom-4 left-4'
}

const toastClass = computed(() => {
  const typeClass = types[props.type as keyof typeof types]
  const positionClass = positions[props.position as keyof typeof positions]
  return `${typeClass} ${positionClass}`
})

onMounted(() => {
  if (props.duration > 0) {
    setTimeout(() => {
      show.value = false
      emit('close')
    }, props.duration)
  }
})
</script>

<template>
  <Transition name="fade">
    <div
      v-if="show"
      class="fixed p-4 rounded-lg shadow-lg text-white"
      :class="toastClass"
      role="alert"
    >
      <slot name="icon">
        <span class="mr-2">
          {{ type === 'success' ? '✅' : type === 'error' ? '❌' : type === 'warning' ? '⚠️' : 'ℹ️' }}
        </span>
      </slot>
      <span>{{ message }}</span>
    </div>
  </Transition>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
