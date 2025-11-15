<script setup lang="ts">
interface TimelineItem {
  id: string
  title: string
  description?: string
  date: string
  icon?: string
  color?: string
  status?: 'completed' | 'active' | 'pending'
}

interface Props {
  items: TimelineItem[]
  vertical?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  vertical: true
})

const getStatusColor = (status?: string) => {
  const colors = {
    completed: 'bg-green-500',
    active: 'bg-blue-500',
    pending: 'bg-gray-300'
  }
  return colors[status as keyof typeof colors] || 'bg-blue-500'
}
</script>

<template>
  <div :class="['data-timeline', !vertical && 'horizontal']">
    <div v-for="(item, index) in items" :key="item.id" class="timeline-item">
      <div class="timeline-marker">
        <div :class="['marker-dot', getStatusColor(item.status)]">
          <div v-if="item.icon" :class="[item.icon, 'w-3 h-3 text-white']" />
        </div>
        <div v-if="index < items.length - 1" class="connector" />
      </div>

      <div class="timeline-content">
        <div class="content-header">
          <h4 class="content-title">{{ item.title }}</h4>
          <span class="content-date">{{ item.date }}</span>
        </div>
        <p v-if="item.description" class="content-description">{{ item.description }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.data-timeline {
  @apply bg-white rounded-lg p-4;
}

.data-timeline.horizontal {
  @apply flex gap-4 overflow-x-auto;
}

.timeline-item {
  @apply flex gap-4 mb-8 last:mb-0;
}

.data-timeline.horizontal .timeline-item {
  @apply flex-col mb-0 min-w-64;
}

.timeline-marker {
  @apply flex flex-col items-center;
}

.marker-dot {
  @apply w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0;
}

.connector {
  @apply w-0.5 flex-1 bg-gray-200 my-2;
}

.data-timeline.horizontal .connector {
  @apply w-full h-0.5 my-0 mx-2;
}

.timeline-content {
  @apply flex-1 pb-4;
}

.content-header {
  @apply flex items-start justify-between mb-2;
}

.content-title {
  @apply font-semibold text-gray-900;
}

.content-date {
  @apply text-sm text-gray-500;
}

.content-description {
  @apply text-sm text-gray-600;
}
</style>
