<script setup lang="ts">
interface ProgressData {
  label: string
  value: number
  max: number
  color?: string
}

interface Props {
  data: ProgressData[]
  height?: number
  showPercentage?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  height: 200,
  showPercentage: true
})

const items = computed(() => {
  return props.data.map(item => ({
    ...item,
    percentage: (item.value / item.max) * 100,
    color: item.color || '#3b82f6'
  }))
})
</script>

<template>
  <div class="space-y-4" :style="{ minHeight: `${height}px` }">
    <div v-for="item in items" :key="item.label" class="space-y-2">
      <div class="flex items-center justify-between">
        <span class="text-sm font-medium text-gray-700">{{ item.label }}</span>
        <span v-if="showPercentage" class="text-sm text-gray-600">
          {{ item.value }} / {{ item.max }} ({{ Math.round(item.percentage) }}%)
        </span>
      </div>
      <div class="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
        <div
          class="h-full rounded-full transition-all duration-500"
          :style="{
            width: `${item.percentage}%`,
            backgroundColor: item.color
          }"
        />
      </div>
    </div>
  </div>
</template>
