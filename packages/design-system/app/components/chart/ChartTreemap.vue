<script setup lang="ts">
interface TreeData {
  name: string
  value: number
  color?: string
}

interface Props {
  data: TreeData[]
  height?: number
}

const props = withDefaults(defineProps<Props>(), {
  height: 400
})

const totalValue = computed(() => props.data.reduce((sum, d) => sum + d.value, 0))

const boxes = computed(() => {
  let currentX = 0
  let currentY = 0
  let rowHeight = 0
  const result = []
  
  for (const item of props.data) {
    const percentage = item.value / totalValue.value
    const width = Math.sqrt(percentage) * 100
    const height = Math.sqrt(percentage) * 100
    
    if (currentX + width > 100) {
      currentX = 0
      currentY += rowHeight
      rowHeight = 0
    }
    
    result.push({
      ...item,
      x: currentX,
      y: currentY,
      width,
      height,
      color: item.color || '#3b82f6'
    })
    
    rowHeight = Math.max(rowHeight, height)
    currentX += width
  }
  
  return result
})
</script>

<template>
  <div class="relative" :style="{ height: `${height}px` }">
    <svg class="w-full h-full" viewBox="0 0 100 100">
      <g v-for="box in boxes" :key="box.name">
        <rect
          :x="box.x"
          :y="box.y"
          :width="box.width"
          :height="box.height"
          :fill="box.color"
          opacity="0.8"
          stroke="white"
          stroke-width="0.3"
          class="hover:opacity-100 transition-opacity cursor-pointer"
        >
          <title>{{ box.name }}: {{ box.value }}</title>
        </rect>
        <text :x="box.x + box.width / 2" :y="box.y + box.height / 2" text-anchor="middle" class="text-[2px] fill-white font-bold">
          {{ box.name }}
        </text>
      </g>
    </svg>
  </div>
</template>
