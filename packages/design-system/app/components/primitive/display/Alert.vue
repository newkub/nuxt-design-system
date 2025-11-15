<script setup lang="ts">
import { computed, ref } from 'vue'

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

const typeClasses = computed(() => {
  switch (props.type) {
    case 'success':
      return 'bg-green-50 border-green-200 text-green-800'
    case 'error':
      return 'bg-red-50 border-red-200 text-red-800'
    case 'warning':
      return 'bg-yellow-50 border-yellow-200 text-yellow-800'
    default:
      return 'bg-blue-50 border-blue-200 text-blue-800'
  }
})
</script>

<template>
  <Transition name="alert">
    <div v-if="isVisible" :class="[
      'flex items-start gap-3 p-4 rounded-lg border',
      typeClasses
    ]">
      <div class="text-xl flex-shrink-0">
        {{ icon || typeIcons[type] }}
      </div>
      
      <div class="flex-1">
        <div v-if="title" class="font-semibold mb-1">{{ title }}</div>
        <div class="text-sm">
          <slot />
        </div>
      </div>
      
      <button v-if="closable" @click="handleClose" class="flex-shrink-0 hover:opacity-70 text-lg">
        ✕
      </button>
    </div>
  </Transition>
</template>

<style scoped>
.alert-enter-active,
.alert-leave-active {
  @apply transition-all duration-300;
}

.alert-enter-from,
.alert-leave-to {
  @apply opacity-0 transform scale-95;
}
</style>
