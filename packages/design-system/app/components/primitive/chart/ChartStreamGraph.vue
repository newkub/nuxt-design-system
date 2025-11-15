<script setup lang="ts">
interface StreamData {
  name: string
  values: number[]
  color?: string
}

interface Props {
  data: StreamData[]
  height?: number
}

const props = withDefaults(defineProps<Props>(), {
  height: 300
})

const colors = ['#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981']

const streams = computed(() => {
  const numPoints = props.data[0]?.values.length || 0
  const baseline = Array.from({ length: numPoints }, () => 0)
  
  return props.data.map((stream, streamIndex) => {
    const points: string[] = []
    
    for (let i = 0; i < numPoints; i++) {
      const x = (i / (numPoints - 1)) * 100
      const y = 50 - baseline[i] - stream.values[i] / 2
      points.push(`${x},${y}`)
      baseline[i] += stream.values[i]
    }
    
    for (let i = numPoints - 1; i >= 0; i--) {
      const x = (i / (numPoints - 1)) * 100
      const y = 50 - baseline[i] + stream.values[i] / 2
      points.push(`${x},${y}`)
    }
    
    return {
      name: stream.name,
      path: points.join(' '),
      color: stream.color || colors[streamIndex % colors.length]
    }
  })
})
</script>

<template>
  <div class="relative" :style="{ height: `${height}px` }">
    <svg class="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
      <g v-for="stream in streams" :key="stream.name">
        <polygon
          :points="stream.path"
          :fill="stream.color"
          opacity="0.7"
          class="hover:opacity-90 transition-opacity cursor-pointer"
        >
          <title>{{ stream.name }}</title>
        </polygon>
      </g>
    </svg>
  </div>
</template>
