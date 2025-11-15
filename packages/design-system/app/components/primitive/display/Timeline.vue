<script setup lang="ts">
interface TimelineItem {
  title: string
  description?: string
  time?: string
  icon?: string
  color?: string
}

const props = defineProps<{
  items: TimelineItem[]
}>()
</script>

<template>
  <div class="timeline">
    <div
      v-for="(item, index) in items"
      :key="index"
      class="timeline-item"
    >
      <div class="timeline-dot" :style="item.color ? { backgroundColor: item.color } : {}">
        <span v-if="item.icon">{{ item.icon }}</span>
      </div>
      
      <div class="timeline-content">
        <div class="timeline-header">
          <h4 class="timeline-title">{{ item.title }}</h4>
          <span v-if="item.time" class="timeline-time">{{ item.time }}</span>
        </div>
        <p v-if="item.description" class="timeline-description">
          {{ item.description }}
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.timeline {
  @apply space-y-4;
}

.timeline-item {
  @apply flex gap-4 relative;
}

.timeline-item:not(:last-child)::before {
  content: '';
  @apply absolute left-4 top-8 bottom-0 w-0.5 bg-gray-200;
}

.timeline-dot {
  @apply w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center flex-shrink-0 relative z-10;
}

.timeline-content {
  @apply flex-1 pb-4;
}

.timeline-header {
  @apply flex items-start justify-between gap-4 mb-1;
}

.timeline-title {
  @apply font-semibold text-gray-900;
}

.timeline-time {
  @apply text-sm text-gray-500;
}

.timeline-description {
  @apply text-sm text-gray-600;
}
</style>
