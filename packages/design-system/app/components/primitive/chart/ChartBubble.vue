<script setup lang="ts">
interface BubbleData {
  name: string
  x: number
  y: number
  size: number
  color?: string
}

interface Props {
  data: BubbleData[]
  height?: number
  defaultColor?: string
}

const props = withDefaults(defineProps<Props>(), {
  height: 400,
  defaultColor: '#3b82f6'
})

const maxX = computed(() => Math.max(...props.data.map(d => d.x)))
const maxY = computed(() => Math.max(...props.data.map(d => d.y)))
const maxSize = computed(() => Math.max(...props.data.map(d => d.size)))

const bubbles = computed(() => {
  return props.data.map(item => ({
    ...item,
    cx: (item.x / maxX.value) * 90 + 5,
    cy: 95 - (item.y / maxY.value) * 90,
    r: (item.size / maxSize.value) * 8 + 2,
    color: item.color || props.defaultColor
  }))
})
</script>

<template>
  <div class="relative" :style="{ height: `${height}px` }">
    <svg class="w-full h-full" viewBox="0 0 100 100">
      <g v-for="bubble in bubbles" :key="bubble.name">
        <circle
          :cx="bubble.cx"
          :cy="bubble.cy"
          :r="bubble.r"
          :fill="bubble.color"
          opacity="0.6"
          class="hover:opacity-100 transition-opacity cursor-pointer"
        >
          <title>{{ bubble.name }}: ({{ bubble.x }}, {{ bubble.y }}) - {{ bubble.size }}</title>
        </circle>
      </g>
    </svg>
  </div>
</template>
