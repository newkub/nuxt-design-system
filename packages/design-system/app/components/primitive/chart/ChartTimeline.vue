<script setup lang="ts">
interface TimelineEvent {
  date: string
  title: string
  description?: string
  color?: string
}

interface Props {
  data: TimelineEvent[]
  height?: number
}

const props = withDefaults(defineProps<Props>(), {
  height: 400
})
</script>

<template>
  <div class="relative" :style="{ minHeight: `${height}px` }">
    <div class="flex">
      <div class="w-1 bg-gray-200 relative">
        <div v-for="(event, i) in data" :key="i"
          class="absolute w-3 h-3 rounded-full -left-1 bg-blue-600"
          :style="{ top: `${(i / data.length) * 100}%` }"
        />
      </div>
      
      <div class="flex-1 pl-6 space-y-8">
        <div v-for="event in data" :key="event.date" class="relative">
          <div class="text-sm font-medium text-blue-600">{{ event.date }}</div>
          <div class="text-base font-semibold text-gray-900 mt-1">{{ event.title }}</div>
          <div v-if="event.description" class="text-sm text-gray-600 mt-1">
            {{ event.description }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
