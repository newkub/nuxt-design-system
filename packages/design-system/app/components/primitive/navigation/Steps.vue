<script setup lang="ts">
interface Step {
  title: string
  description?: string
  icon?: string
  status?: 'wait' | 'process' | 'finish' | 'error'
}

const props = withDefaults(defineProps<{
  current: number
  steps: Step[]
  direction?: 'horizontal' | 'vertical'
}>(), {
  direction: 'horizontal'
})

const emit = defineEmits<{
  stepClick: [index: number]
}>()
</script>

<template>
  <div :class="['steps', direction]">
    <div
      v-for="(step, index) in steps"
      :key="index"
      :class="['step', {
        active: index === current,
        completed: index < current,
        error: step.status === 'error'
      }]"
      @click="emit('stepClick', index)"
    >
      <div class="step-indicator">
        <div class="step-icon">
          <span v-if="step.icon">{{ step.icon }}</span>
          <span v-else-if="index < current">✓</span>
          <span v-else>{{ index + 1 }}</span>
        </div>
        <div v-if="index < steps.length - 1" class="step-line" />
      </div>
      
      <div class="step-content">
        <div class="step-title">{{ step.title }}</div>
        <div v-if="step.description" class="step-description">
          {{ step.description }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.steps {
  @apply flex gap-4;
}

.steps.vertical {
  @apply flex-col;
}

.step {
  @apply flex gap-3 cursor-pointer;
}

.steps.horizontal .step {
  @apply flex-1 flex-col items-center text-center;
}

.step-indicator {
  @apply relative flex items-center;
}

.steps.vertical .step-indicator {
  @apply flex-col;
}

.step-icon {
  @apply w-8 h-8 rounded-full border-2 border-gray-300 bg-white flex items-center justify-center text-sm font-medium text-gray-500;
}

.step.active .step-icon {
  @apply border-blue-600 bg-blue-600 text-white;
}

.step.completed .step-icon {
  @apply border-blue-600 bg-blue-600 text-white;
}

.step.error .step-icon {
  @apply border-red-600 bg-red-600 text-white;
}

.step-line {
  @apply bg-gray-300;
}

.steps.horizontal .step-line {
  @apply flex-1 h-0.5 mx-2;
}

.steps.vertical .step-line {
  @apply w-0.5 flex-1 my-2 ml-4;
}

.step.completed .step-line {
  @apply bg-blue-600;
}

.step-content {
  @apply mt-2;
}

.steps.vertical .step-content {
  @apply mt-0 flex-1;
}

.step-title {
  @apply text-sm font-medium text-gray-900;
}

.step-description {
  @apply text-xs text-gray-500 mt-1;
}
</style>
