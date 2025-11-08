<script setup lang="ts">
const props = withDefaults(defineProps<{
  modelValue: number
  steps: number
  showStepContent?: boolean
}>(), {
  showStepContent: true
})

const emit = defineEmits<{
  'update:modelValue': [value: number]
  next: []
  previous: []
  finish: []
}>()

const handleNext = () => {
  if (props.modelValue < props.steps) {
    emit('update:modelValue', props.modelValue + 1)
    emit('next')
  } else {
    emit('finish')
  }
}

const handlePrevious = () => {
  if (props.modelValue > 1) {
    emit('update:modelValue', props.modelValue - 1)
    emit('previous')
  }
}
</script>

<template>
  <div class="stepper">
    <div v-if="showStepContent" class="stepper-content">
      <slot :name="`step-${modelValue}`" />
    </div>
    
    <div class="stepper-actions">
      <button
        v-if="modelValue > 1"
        @click="handlePrevious"
        class="stepper-btn secondary"
      >
        ← Previous
      </button>
      
      <button
        @click="handleNext"
        class="stepper-btn primary"
      >
        {{ modelValue < steps ? 'Next →' : 'Finish' }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.stepper {
  @apply space-y-6;
}

.stepper-content {
  @apply min-h-[200px];
}

.stepper-actions {
  @apply flex items-center justify-between pt-6 border-t border-gray-200;
}

.stepper-btn {
  @apply px-6 py-2 rounded-lg font-medium transition-colors;
}

.stepper-btn.primary {
  @apply bg-blue-600 text-white hover:bg-blue-700;
}

.stepper-btn.secondary {
  @apply border border-gray-300 text-gray-700 hover:bg-gray-50;
}
</style>
