<script setup lang="ts">
interface GanttTask {
  name: string
  start: number
  duration: number
  progress?: number
  color?: string
}

interface Props {
  data: GanttTask[]
  height?: number
  maxDuration?: number
}

const props = withDefaults(defineProps<Props>(), {
  height: 300,
  maxDuration: 100
})

const tasks = computed(() => {
  return props.data.map(task => ({
    ...task,
    startPercent: (task.start / props.maxDuration) * 100,
    widthPercent: (task.duration / props.maxDuration) * 100,
    color: task.color || '#3b82f6',
    progress: task.progress || 0
  }))
})
</script>

<template>
  <div class="relative" :style="{ minHeight: `${height}px` }">
    <div class="space-y-3">
      <div v-for="task in tasks" :key="task.name" class="flex items-center gap-4">
        <div class="w-32 text-sm font-medium text-gray-700 truncate">{{ task.name }}</div>
        
        <div class="flex-1 relative h-8 bg-gray-100 rounded">
          <div
            class="absolute h-full rounded transition-all"
            :style="{
              left: `${task.startPercent}%`,
              width: `${task.widthPercent}%`,
              backgroundColor: task.color,
              opacity: 0.3
            }"
          />
          <div
            class="absolute h-full rounded transition-all"
            :style="{
              left: `${task.startPercent}%`,
              width: `${(task.widthPercent * task.progress) / 100}%`,
              backgroundColor: task.color
            }"
          />
        </div>
        
        <div class="w-12 text-sm text-gray-600 text-right">{{ task.progress }}%</div>
      </div>
    </div>
  </div>
</template>
