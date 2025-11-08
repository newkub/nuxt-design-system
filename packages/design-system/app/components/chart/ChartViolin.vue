<script setup lang="ts">
interface ViolinData {
  name: string
  values: number[]
  color?: string
}

interface Props {
  data: ViolinData[]
  height?: number
}

const props = withDefaults(defineProps<Props>(), {
  height: 320
})

const violins = computed(() => {
  return props.data.map((item, i) => {
    const sorted = [...item.values].sort((a, b) => a - b)
    const min = sorted[0]
    const max = sorted[sorted.length - 1]
    const median = sorted[Math.floor(sorted.length / 2)]
    
    return {
      ...item,
      min,
      max,
      median,
      x: 10 + i * 30,
      color: item.color || '#3b82f6'
    }
  })
})
</script>

<template>
  <div class="relative" :style="{ height: `${height}px` }">
    <svg class="w-full h-full" viewBox="0 0 100 100">
      <g v-for="violin in violins" :key="violin.name">
        <ellipse
          :cx="violin.x"
          cy="50"
          rx="8"
          ry="40"
          :fill="violin.color"
          opacity="0.3"
          :stroke="violin.color"
          stroke-width="0.3"
          class="hover:opacity-50 transition-opacity cursor-pointer"
        >
          <title>{{ violin.name }}</title>
        </ellipse>
        
        <line :x1="violin.x" y1="10" :x2="violin.x" y2="90" :stroke="violin.color" stroke-width="0.3" />
        
        <text :x="violin.x" y="98" text-anchor="middle" class="text-[2.5px] fill-gray-600">
          {{ violin.name }}
        </text>
      </g>
    </svg>
  </div>
</template>
