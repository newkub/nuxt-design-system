<script setup lang="ts">
interface RadialData {
  name: string
  value: number
  max: number
  color?: string
}

interface Props {
  data: RadialData[]
  size?: number
}

const props = withDefaults(defineProps<Props>(), {
  size: 300
})

const colors = ['#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b']

const bars = computed(() => {
  const baseRadius = 20
  const barWidth = 8
  const gap = 2
  
  return props.data.map((item, i) => {
    const radius = baseRadius + i * (barWidth + gap)
    const percentage = (item.value / item.max) * 100
    const circumference = 2 * Math.PI * radius
    const dashArray = `${(percentage / 100) * circumference} ${circumference}`
    
    return {
      ...item,
      radius,
      strokeWidth: barWidth,
      circumference,
      dashArray,
      color: item.color || colors[i % colors.length]
    }
  })
})
</script>

<template>
  <div class="relative" :style="{ width: `${size}px`, height: `${size}px` }">
    <svg class="w-full h-full -rotate-90" viewBox="0 0 100 100">
      <g v-for="bar in bars" :key="bar.name">
        <circle
          cx="50"
          cy="50"
          :r="bar.radius"
          fill="none"
          stroke="#e5e7eb"
          :stroke-width="bar.strokeWidth"
        />
        <circle
          cx="50"
          cy="50"
          :r="bar.radius"
          fill="none"
          :stroke="bar.color"
          :stroke-width="bar.strokeWidth"
          :stroke-dasharray="bar.dashArray"
          stroke-linecap="round"
          class="transition-all duration-500"
        >
          <title>{{ bar.name }}: {{ bar.value }} / {{ bar.max }}</title>
        </circle>
      </g>
    </svg>
    
    <div class="absolute inset-0 flex items-center justify-center">
      <div class="text-center">
        <div class="text-2xl font-bold text-gray-900">{{ data[0]?.value }}</div>
        <div class="text-sm text-gray-600">{{ data[0]?.name }}</div>
      </div>
    </div>
  </div>
</template>
