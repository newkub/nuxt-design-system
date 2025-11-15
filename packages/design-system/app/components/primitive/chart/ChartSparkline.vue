<script setup lang="ts">
interface Props {
  data: number[]
  color?: string
  height?: number
  showFill?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  color: '#3b82f6',
  height: 40,
  showFill: true
})

const maxValue = computed(() => Math.max(...props.data))
const minValue = computed(() => Math.min(...props.data))
const range = computed(() => maxValue.value - minValue.value || 1)

const points = computed(() => {
  return props.data.map((value, i) => {
    const x = (i / (props.data.length - 1)) * 100
    const y = 100 - ((value - minValue.value) / range.value) * 100
    return { x, y, value }
  })
})

const linePath = computed(() => {
  return points.value.map(p => `${p.x},${p.y}`).join(' ')
})

const areaPath = computed(() => {
  if (!props.showFill) return ''
  const path = points.value.map(p => `${p.x},${p.y}`).join(' ')
  return `0,100 ${path} 100,100`
})
</script>

<template>
  <div class="relative" :style="{ height: `${height}px` }">
    <svg class="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
      <polygon v-if="showFill" :points="areaPath" :fill="color" opacity="0.2" />
      <polyline :points="linePath" fill="none" :stroke="color" stroke-width="2" />
    </svg>
  </div>
</template>
