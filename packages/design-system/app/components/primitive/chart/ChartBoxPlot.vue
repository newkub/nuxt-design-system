<script setup lang="ts">
interface BoxPlotData {
  name: string
  min: number
  q1: number
  median: number
  q3: number
  max: number
  outliers?: number[]
}

interface Props {
  data: BoxPlotData[]
  height?: number
}

const props = withDefaults(defineProps<Props>(), {
  height: 320
})

const globalMin = computed(() => Math.min(...props.data.map(d => d.min)))
const globalMax = computed(() => Math.max(...props.data.map(d => d.max)))
const range = computed(() => globalMax.value - globalMin.value || 1)

const boxes = computed(() => {
  return props.data.map(item => ({
    ...item,
    minY: 95 - ((item.min - globalMin.value) / range.value) * 90,
    q1Y: 95 - ((item.q1 - globalMin.value) / range.value) * 90,
    medianY: 95 - ((item.median - globalMin.value) / range.value) * 90,
    q3Y: 95 - ((item.q3 - globalMin.value) / range.value) * 90,
    maxY: 95 - ((item.max - globalMin.value) / range.value) * 90
  }))
})
</script>

<template>
  <div class="relative" :style="{ height: `${height}px` }">
    <svg class="w-full h-full" viewBox="0 0 100 100">
      <g v-for="(box, i) in boxes" :key="box.name">
        <g :transform="`translate(${10 + i * 20}, 0)`">
          <line :x1="5" :y1="box.minY" :x2="5" :y2="box.maxY" stroke="#3b82f6" stroke-width="0.3" />
          
          <rect
            x="2"
            :y="box.q3Y"
            width="6"
            :height="box.q1Y - box.q3Y"
            fill="#3b82f6"
            opacity="0.3"
            stroke="#3b82f6"
            stroke-width="0.3"
          />
          
          <line :x1="2" :y1="box.medianY" :x2="8" :y2="box.medianY" stroke="#3b82f6" stroke-width="0.5" />
          
          <line :x1="3" :y1="box.minY" :x2="7" :y2="box.minY" stroke="#3b82f6" stroke-width="0.3" />
          <line :x1="3" :y1="box.maxY" :x2="7" :y2="box.maxY" stroke="#3b82f6" stroke-width="0.3" />
          
          <text x="5" y="98" text-anchor="middle" class="text-[2.5px] fill-gray-600">
            {{ box.name }}
          </text>
        </g>
      </g>
    </svg>
  </div>
</template>
