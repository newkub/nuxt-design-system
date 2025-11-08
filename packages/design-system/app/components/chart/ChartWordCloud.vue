<script setup lang="ts">
interface WordData {
  text: string
  value: number
}

interface Props {
  data: WordData[]
  height?: number
}

const props = withDefaults(defineProps<Props>(), {
  height: 400
})

const maxValue = computed(() => Math.max(...props.data.map(d => d.value)))

const words = computed(() => {
  return props.data.map((item, i) => {
    const size = 10 + (item.value / maxValue.value) * 30
    const x = 10 + (i % 4) * 22
    const y = 20 + Math.floor(i / 4) * 20
    const rotation = Math.random() > 0.7 ? -45 : 0
    
    return {
      ...item,
      size,
      x,
      y,
      rotation
    }
  })
})
</script>

<template>
  <div class="relative flex items-center justify-center" :style="{ height: `${height}px` }">
    <svg class="w-full h-full" viewBox="0 0 100 100">
      <g v-for="word in words" :key="word.text">
        <text
          :x="word.x"
          :y="word.y"
          :font-size="word.size"
          :transform="`rotate(${word.rotation}, ${word.x}, ${word.y})`"
          class="fill-blue-600 font-bold hover:fill-blue-800 transition-colors cursor-pointer"
          opacity="0.8"
        >
          {{ word.text }}
          <title>{{ word.text }}: {{ word.value }}</title>
        </text>
      </g>
    </svg>
  </div>
</template>
