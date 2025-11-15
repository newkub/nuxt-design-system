<script setup lang="ts">
interface CandleData {
  date: string
  open: number
  high: number
  low: number
  close: number
}

interface Props {
  data: CandleData[]
  height?: number
}

const props = withDefaults(defineProps<Props>(), {
  height: 320
})

const maxValue = computed(() => Math.max(...props.data.flatMap(d => [d.high])))
const minValue = computed(() => Math.min(...props.data.flatMap(d => [d.low])))
const range = computed(() => maxValue.value - minValue.value || 1)

const candles = computed(() => {
  return props.data.map((item, i) => {
    const x = (i / (props.data.length - 1)) * 90 + 5
    const openY = 95 - ((item.open - minValue.value) / range.value) * 90
    const closeY = 95 - ((item.close - minValue.value) / range.value) * 90
    const highY = 95 - ((item.high - minValue.value) / range.value) * 90
    const lowY = 95 - ((item.low - minValue.value) / range.value) * 90
    const isUp = item.close > item.open
    
    return {
      ...item,
      x,
      openY,
      closeY,
      highY,
      lowY,
      bodyTop: Math.min(openY, closeY),
      bodyHeight: Math.abs(closeY - openY),
      isUp,
      color: isUp ? '#10b981' : '#ef4444'
    }
  })
})
</script>

<template>
  <div class="relative" :style="{ height: `${height}px` }">
    <svg class="w-full h-full" viewBox="0 0 100 100">
      <g v-for="candle in candles" :key="candle.date">
        <line :x1="candle.x" :y1="candle.highY" :x2="candle.x" :y2="candle.lowY" :stroke="candle.color" stroke-width="0.3" />
        <rect
          :x="candle.x - 1"
          :y="candle.bodyTop"
          width="2"
          :height="candle.bodyHeight || 0.5"
          :fill="candle.color"
          class="hover:opacity-80 transition-opacity cursor-pointer"
        >
          <title>{{ candle.date }}
Open: {{ candle.open }}
High: {{ candle.high }}
Low: {{ candle.low }}
Close: {{ candle.close }}</title>
        </rect>
      </g>
    </svg>
  </div>
</template>
