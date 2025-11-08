<script setup lang="ts">
interface DataPoint {
  name: string
  value: number
  type?: 'increase' | 'decrease' | 'total'
}

interface Props {
  data: DataPoint[]
  height?: number
}

const props = withDefaults(defineProps<Props>(), {
  height: 320
})

const chartData = computed(() => {
  let cumulative = 0
  return props.data.map(item => {
    const start = cumulative
    cumulative += item.value
    const isTotal = item.type === 'total'
    return {
      ...item,
      start: isTotal ? 0 : start,
      end: cumulative,
      height: Math.abs(item.value),
      color: item.type === 'decrease' ? '#ef4444' : '#10b981'
    }
  })
})

const maxValue = computed(() => Math.max(...chartData.value.map(d => Math.abs(d.end))))
</script>

<template>
  <div class="relative" :style="{ height: `${height}px` }">
    <div class="h-full flex items-end justify-between gap-2">
      <div v-for="(item, i) in chartData" :key="i" class="flex-1 flex flex-col items-center gap-2">
        <div class="relative w-full h-full flex flex-col justify-end">
          <div
            class="w-full rounded transition-all"
            :style="{
              height: `${(item.height / maxValue) * 100}%`,
              backgroundColor: item.color,
              marginBottom: `${(item.start / maxValue) * 100}%`
            }"
            :title="`${item.name}: ${item.value}`"
          />
        </div>
        <span class="text-xs text-gray-600">{{ item.name }}</span>
      </div>
    </div>
  </div>
</template>
