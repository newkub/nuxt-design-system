<script setup lang="ts">
interface Metric {
  label: string
  value: number
  target: number
  unit?: string
  color?: string
}

interface Props {
  metrics: Metric[]
}

const props = defineProps<Props>()

const getPercentage = (value: number, target: number) => {
  return Math.min((value / target) * 100, 100)
}

const getStatusColor = (percentage: number) => {
  if (percentage >= 100) return 'bg-green-500'
  if (percentage >= 75) return 'bg-blue-500'
  if (percentage >= 50) return 'bg-yellow-500'
  return 'bg-red-500'
}
</script>

<template>
  <div class="data-metrics">
    <div v-for="metric in metrics" :key="metric.label" class="metric-item">
      <div class="metric-header">
        <span class="metric-label">{{ metric.label }}</span>
        <span class="metric-value">
          {{ metric.value }}{{ metric.unit }} / {{ metric.target }}{{ metric.unit }}
        </span>
      </div>

      <div class="metric-bar">
        <div
          class="metric-progress"
          :class="getStatusColor(getPercentage(metric.value, metric.target))"
          :style="{ width: `${getPercentage(metric.value, metric.target)}%` }"
        />
      </div>

      <div class="metric-footer">
        <span class="metric-percentage">
          {{ Math.round(getPercentage(metric.value, metric.target)) }}%
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.data-metrics {
  @apply bg-white rounded-lg border border-gray-200 p-6 space-y-6;
}

.metric-item {
  @apply space-y-2;
}

.metric-header {
  @apply flex items-center justify-between;
}

.metric-label {
  @apply text-sm font-medium text-gray-700;
}

.metric-value {
  @apply text-sm text-gray-600;
}

.metric-bar {
  @apply w-full h-2 bg-gray-200 rounded-full overflow-hidden;
}

.metric-progress {
  @apply h-full transition-all duration-500;
}

.metric-footer {
  @apply flex justify-end;
}

.metric-percentage {
  @apply text-xs font-medium text-gray-600;
}
</style>
