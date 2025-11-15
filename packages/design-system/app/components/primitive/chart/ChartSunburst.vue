<script setup lang="ts">
interface SunburstData {
  name: string
  value: number
  children?: SunburstData[]
  color?: string
}

interface Props {
  data: SunburstData[]
  size?: number
}

const props = withDefaults(defineProps<Props>(), {
  size: 400
})

const colors = ['#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981']

const segments = computed(() => {
  const result: any[] = []
  let startAngle = 0
  
  const total = props.data.reduce((sum, d) => sum + d.value, 0)
  
  props.data.forEach((item, i) => {
    const angle = (item.value / total) * 360
    result.push({
      ...item,
      startAngle,
      endAngle: startAngle + angle,
      color: item.color || colors[i % colors.length],
      radius: 40
    })
    startAngle += angle
  })
  
  return result
})

const polarToCartesian = (cx: number, cy: number, radius: number, angle: number) => {
  const rad = (angle - 90) * Math.PI / 180
  return {
    x: cx + radius * Math.cos(rad),
    y: cy + radius * Math.sin(rad)
  }
}

const getArcPath = (cx: number, cy: number, radius: number, startAngle: number, endAngle: number) => {
  const start = polarToCartesian(cx, cy, radius, endAngle)
  const end = polarToCartesian(cx, cy, radius, startAngle)
  const largeArc = endAngle - startAngle <= 180 ? 0 : 1
  
  return [
    'M', cx, cy,
    'L', start.x, start.y,
    'A', radius, radius, 0, largeArc, 0, end.x, end.y,
    'Z'
  ].join(' ')
}
</script>

<template>
  <div class="relative" :style="{ width: `${size}px`, height: `${size}px` }">
    <svg class="w-full h-full" viewBox="0 0 100 100">
      <g v-for="segment in segments" :key="segment.name">
        <path
          :d="getArcPath(50, 50, segment.radius, segment.startAngle, segment.endAngle)"
          :fill="segment.color"
          opacity="0.8"
          stroke="white"
          stroke-width="0.3"
          class="hover:opacity-100 transition-opacity cursor-pointer"
        >
          <title>{{ segment.name }}: {{ segment.value }}</title>
        </path>
      </g>
    </svg>
  </div>
</template>
