<script setup lang="ts">
const props = withDefaults(defineProps<{
  modelValue: boolean
  message: string
  action?: string
  duration?: number
}>(), {
  modelValue: false,
  duration: 3000
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  action: []
}>()

const isVisible = ref(props.modelValue)

watch(() => props.modelValue, (newVal) => {
  isVisible.value = newVal
  if (newVal && props.duration > 0) {
    setTimeout(() => {
      isVisible.value = false
      emit('update:modelValue', false)
    }, props.duration)
  }
})

const handleAction = () => {
  emit('action')
  isVisible.value = false
  emit('update:modelValue', false)
}
</script>

<template>
  <Teleport to="body">
    <Transition name="snackbar">
      <div v-if="isVisible" class="snackbar">
        <span class="snackbar-message">{{ message }}</span>
        <button v-if="action" @click="handleAction" class="snackbar-action">
          {{ action }}
        </button>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.snackbar {
  @apply fixed bottom-4 left-1/2 -translate-x-1/2 bg-gray-900 text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-4 z-50 min-w-[300px] max-w-[500px];
}

.snackbar-message {
  @apply flex-1;
}

.snackbar-action {
  @apply text-blue-400 hover:text-blue-300 font-medium uppercase text-sm;
}

.snackbar-enter-active,
.snackbar-leave-active {
  @apply transition-all duration-300;
}

.snackbar-enter-from,
.snackbar-leave-to {
  @apply opacity-0 transform translate-y-4;
}
</style>
