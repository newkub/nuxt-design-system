<script setup lang="ts">
const props = withDefaults(defineProps<{
  value: number
  max?: number
  showLabel?: boolean
  color?: 'primary' | 'success' | 'warning' | 'error'
  striped?: boolean
  animated?: boolean
}>(), {
  max: 100,
  showLabel: false,
  color: 'primary',
  striped: false,
  animated: false
})

const percentage = computed(() => {
  return Math.min(100, Math.max(0, (props.value / props.max) * 100))
})
</script>

<template>
  <div class="progress">
    <div class="progress-track">
      <div
        :class="['progress-bar', color, { striped, animated }]"
        :style="{ width: `${percentage}%` }"
      />
    </div>
    <span v-if="showLabel" class="progress-label">
      {{ Math.round(percentage) }}%
    </span>
  </div>
</template>

<style scoped>
.progress {
  @apply flex items-center gap-3;
}

.progress-track {
  @apply flex-1 h-2 bg-gray-200 rounded-full overflow-hidden;
}

.progress-bar {
  @apply h-full transition-all duration-300 rounded-full;
}

.progress-bar.primary {
  @apply bg-blue-600;
}

.progress-bar.success {
  @apply bg-green-600;
}

.progress-bar.warning {
  @apply bg-yellow-600;
}

.progress-bar.error {
  @apply bg-red-600;
}

.progress-bar.striped {
  background-image: linear-gradient(
    45deg,
    rgba(255, 255, 255, 0.15) 25%,
    transparent 25%,
    transparent 50%,
    rgba(255, 255, 255, 0.15) 50%,
    rgba(255, 255, 255, 0.15) 75%,
    transparent 75%,
    transparent
  );
  background-size: 1rem 1rem;
}

.progress-bar.animated {
  animation: progress-stripes 1s linear infinite;
}

@keyframes progress-stripes {
  0% {
    background-position: 1rem 0;
  }
  100% {
    background-position: 0 0;
  }
}

.progress-label {
  @apply text-sm font-medium text-gray-700 min-w-[3rem] text-right;
}
</style>
