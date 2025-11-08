<script setup lang="ts">
interface CalendarData {
  date: string
  value: number
}

interface Props {
  data: CalendarData[]
  year?: number
  height?: number
}

const props = withDefaults(defineProps<Props>(), {
  year: new Date().getFullYear(),
  height: 200
})

const maxValue = computed(() => Math.max(...props.data.map(d => d.value)))

const weeks = computed(() => {
  const result: any[] = []
  for (let week = 0; week < 52; week++) {
    const days = []
    for (let day = 0; day < 7; day++) {
      const dayData = props.data.find(d => {
        const date = new Date(d.date)
        const weekNum = Math.floor((date.getTime() - new Date(props.year, 0, 1).getTime()) / (7 * 24 * 60 * 60 * 1000))
        return weekNum === week && date.getDay() === day
      })
      
      days.push({
        value: dayData?.value || 0,
        date: dayData?.date,
        intensity: dayData ? (dayData.value / maxValue.value) : 0
      })
    }
    result.push(days)
  }
  return result
})

const getColor = (intensity: number) => {
  if (intensity === 0) return '#ebedf0'
  if (intensity < 0.25) return '#9be9a8'
  if (intensity < 0.5) return '#40c463'
  if (intensity < 0.75) return '#30a14e'
  return '#216e39'
}
</script>

<template>
  <div class="relative" :style="{ minHeight: `${height}px` }">
    <div class="grid grid-cols-52 gap-0.5">
      <div v-for="(week, weekIndex) in weeks" :key="weekIndex" class="grid grid-rows-7 gap-0.5">
        <div
          v-for="(day, dayIndex) in week"
          :key="dayIndex"
          class="w-3 h-3 rounded-sm transition-all hover:ring-2 hover:ring-blue-500 cursor-pointer"
          :style="{ backgroundColor: getColor(day.intensity) }"
          :title="day.date ? `${day.date}: ${day.value}` : 'No data'"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.grid-cols-52 {
  grid-template-columns: repeat(52, minmax(0, 1fr));
}
</style>
