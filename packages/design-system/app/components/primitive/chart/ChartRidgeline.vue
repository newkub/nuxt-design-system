<script setup lang="ts">
interface RidgelineData {
  name: string
  values: number[]
  color?: string
}

interface Props {
  data: RidgelineData[]
  height?: number
}

const props = withDefaults(defineProps<Props>(), {
  height: 400
})

const colors = ['#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b']

const ridges = computed(() => {
  return props.data.map((item, i) => {
    const baseY = 15 + i * 15
    const maxValue = Math.max(...item.values)
    
    const points = item.values.map((value, j) => {
      const x = (j / (item.values.length - 1)) * 80 + 10
      const y = baseY - (value / maxValue) * 10
      return `${x},${y}`
    }).join(' ')
    
    const closedPath = `10,${baseY} ${points} 90,${baseY}`
    
    return {
      ...item,
      path: closedPath,
      color: item.color || colors[i % colors.length]
    }
  })
})
</script>

<template>
  <div class="relative" :style="{ height: `${height}px` }">
    <svg class="w-full h-full" viewBox="0 0 100 100">
      <g v-for="ridge in ridges" :key="ridge.name">
        <polygon
          :points="ridge.path"
          :fill="ridge.color"
          opacity="0.6"
          :stroke="ridge.color"
          stroke-width="0.5"
          class="hover:opacity-80 transition-opacity cursor-pointer"
        >
          <title>{{ ridge.name }}</title>
        </polygon>
      </g>
    </svg>
  </div>
</template>
