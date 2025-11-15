<script setup lang="ts">
interface DataPoint {
  name: string
  value: number
  color?: string
}

interface Props {
  data: DataPoint[]
  size?: number
}

const props = withDefaults(defineProps<Props>(), {
  size: 300
})

const maxValue = computed(() => Math.max(...props.data.map(d => d.value)))

const segments = computed(() => {
  const angleStep = (2 * Math.PI) / props.data.length
  return props.data.map((item, index) => {
    const angle = index * angleStep - Math.PI / 2
    const radius = (item.value / maxValue.value) * 40
    const x = 50 + radius * Math.cos(angle)
    const y = 50 + radius * Math.sin(angle)
    return { ...item, x, y, angle, radius }
  })
})

const polygonPoints = computed(() => {
  return segments.value.map(s => `${s.x},${s.y}`).join(' ')
})
</script>

<template>
  <div class="relative" :style="{ width: `${size}px`, height: `${size}px` }">
    <svg class="w-full h-full" viewBox="0 0 100 100">
      <circle cx="50" cy="50" r="40" fill="none" stroke="#e5e7eb" stroke-width="0.5" />
      <circle cx="50" cy="50" r="30" fill="none" stroke="#e5e7eb" stroke-width="0.5" />
      <circle cx="50" cy="50" r="20" fill="none" stroke="#e5e7eb" stroke-width="0.5" />
      <circle cx="50" cy="50" r="10" fill="none" stroke="#e5e7eb" stroke-width="0.5" />
      
      <polygon
        :points="polygonPoints"
        fill="#3b82f6"
        opacity="0.3"
        stroke="#3b82f6"
        stroke-width="0.5"
      />
      
      <g v-for="segment in segments" :key="segment.name">
        <circle :cx="segment.x" :cy="segment.y" r="1" fill="#3b82f6" />
        <text :x="segment.x" :y="segment.y - 3" text-anchor="middle" class="text-[3px] fill-gray-600">
          {{ segment.name }}
        </text>
      </g>
    </svg>
  </div>
</template>
