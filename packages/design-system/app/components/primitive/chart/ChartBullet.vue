<script setup lang="ts">
interface Props {
  value: number
  target: number
  ranges?: number[]
  height?: number
  label?: string
}

const props = withDefaults(defineProps<Props>(), {
  ranges: () => [60, 80, 100],
  height: 60,
  label: ''
})

const rangeColors = ['#e5e7eb', '#d1d5db', '#9ca3af']
</script>

<template>
  <div class="relative" :style="{ height: `${height}px` }">
    <div class="flex items-center h-full gap-4">
      <span v-if="label" class="text-sm font-medium text-gray-700 w-24">{{ label }}</span>
      
      <div class="flex-1 relative h-8">
        <div v-for="(range, i) in ranges" :key="i" class="absolute inset-y-0 left-0 rounded"
          :style="{
            width: `${range}%`,
            backgroundColor: rangeColors[i],
            zIndex: ranges.length - i
          }"
        />
        
        <div class="absolute inset-y-0 left-0 h-full bg-blue-600 rounded transition-all"
          :style="{ width: `${value}%` }"
        />
        
        <div class="absolute top-1/2 -translate-y-1/2 w-1 h-full bg-red-600"
          :style="{ left: `${target}%` }"
        />
      </div>
      
      <span class="text-sm font-medium text-gray-900 w-16 text-right">{{ value }}%</span>
    </div>
  </div>
</template>
