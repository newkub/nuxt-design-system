<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

interface Metric {
  name: string
  value: number
  unit: string
  history: number[]
}

const metrics = ref<Metric[]>([
  { name: 'CPU Usage', value: 0, unit: '%', history: [] },
  { name: 'Memory', value: 0, unit: 'MB', history: [] },
  { name: 'FPS', value: 0, unit: 'fps', history: [] },
  { name: 'Network', value: 0, unit: 'KB/s', history: [] }
])

const isMonitoring = ref(false)
let intervalId: number | null = null

const updateMetrics = () => {
  metrics.value = metrics.value.map(metric => {
    const newValue = Math.random() * 100
    const history = [...metric.history, newValue].slice(-50)
    return { ...metric, value: Math.round(newValue), history }
  })
}

const startMonitoring = () => {
  isMonitoring.value = true
  intervalId = window.setInterval(updateMetrics, 1000)
}

const stopMonitoring = () => {
  isMonitoring.value = false
  if (intervalId) {
    clearInterval(intervalId)
  }
}

const clearHistory = () => {
  metrics.value = metrics.value.map(m => ({ ...m, history: [] }))
}

const getMetricColor = (value: number) => {
  if (value < 50) return 'text-green-600'
  if (value < 80) return 'text-yellow-600'
  return 'text-red-600'
}

const getBarColor = (value: number) => {
  if (value < 50) return 'bg-green-500'
  if (value < 80) return 'bg-yellow-500'
  return 'bg-red-500'
}

onMounted(() => {
  startMonitoring()
})

onUnmounted(() => {
  stopMonitoring()
})
</script>

<template>
  <div class="h-full flex flex-col bg-white">
    <!-- Header -->
    <div class="p-4 border-b border-gray-200 bg-gray-50 flex items-center justify-between">
      <h2 class="text-lg font-semibold text-gray-900">Performance Monitor</h2>
      <div class="flex items-center gap-2">
        <button
          v-if="!isMonitoring"
          class="px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm"
          @click="startMonitoring"
        >
          Start
        </button>
        <button
          v-else
          class="px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm"
          @click="stopMonitoring"
        >
          Stop
        </button>
        <button
          class="px-3 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 text-sm"
          @click="clearHistory"
        >
          Clear
        </button>
      </div>
    </div>

    <!-- Metrics Grid -->
    <div class="flex-1 overflow-y-auto p-4">
      <div class="grid grid-cols-2 gap-4 mb-6">
        <div
          v-for="metric in metrics"
          :key="metric.name"
          class="p-4 border border-gray-200 rounded-lg bg-gray-50"
        >
          <div class="flex items-center justify-between mb-2">
            <span class="text-sm font-medium text-gray-700">{{ metric.name }}</span>
            <span :class="['text-2xl font-bold', getMetricColor(metric.value)]">
              {{ metric.value }}{{ metric.unit }}
            </span>
          </div>
          <div class="w-full bg-gray-200 rounded-full h-2">
            <div
              :class="['h-2 rounded-full transition-all', getBarColor(metric.value)]"
              :style="{ width: metric.value + '%' }"
            />
          </div>
        </div>
      </div>

      <!-- History Charts -->
      <div class="space-y-4">
        <div
          v-for="metric in metrics"
          :key="metric.name + '-chart'"
          class="p-4 border border-gray-200 rounded-lg"
        >
          <h3 class="text-sm font-medium text-gray-700 mb-3">{{ metric.name }} History</h3>
          <div class="flex items-end gap-1 h-24">
            <div
              v-for="(value, index) in metric.history"
              :key="index"
              :class="['flex-1 rounded-t transition-all', getBarColor(value)]"
              :style="{ height: value + '%' }"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
