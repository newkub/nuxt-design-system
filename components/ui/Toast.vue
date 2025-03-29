<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'

interface ToastProps {
  message: string
  type?: 'success' | 'error' | 'warning' | 'info'
  duration?: number
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'
}

const props = withDefaults(defineProps<ToastProps>(), {
  type: 'info',
  duration: 3000,
  position: 'top-right'
})

const emit = defineEmits(['close'])
const show = ref(true)

const types = {
  success: 'bg-green',
  error: 'bg-red',
  warning: 'bg-yellow',
  info: 'bg-blue'
}

const positions = {
  'top-right': 'top-4 right-4',
  'top-left': 'top-4 left-4',
  'bottom-right': 'bottom-4 right-4',
  'bottom-left': 'bottom-4 left-4'
}

const toastClass = computed(() => {
  const typeClass = types[props.type]
  const positionClass = positions[props.position]
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
  <Transition
    enter-active-class="transition-opacity duration-300"
    enter-from-class="opacity-0"
    leave-active-class="transition-opacity duration-300"
    leave-to-class="opacity-0"
  >
    <div
      v-if="show"
      class="fixed p-4 rounded-lg shadow-lg text-white"
      :class="[toastClass, 'transition-opacity duration-300']"
      role="alert"
    >
      <slot name="icon">
        <span class="mr-2">
          <i v-if="props.type === 'success'" class="i-carbon-checkmark" />
          <i v-if="props.type === 'error'" class="i-carbon-error" />
          <i v-if="props.type === 'warning'" class="i-carbon-warning" />
          <i v-if="props.type === 'info'" class="i-carbon-information" />
        </span>
      </slot>
      <span>{{ props.message }}</span>
    </div>
  </Transition>
</template>
