<script setup lang="ts">
interface Activity {
  id: string
  user: string
  action: string
  target?: string
  time: string
  avatar?: string
  icon?: string
}

interface Props {
  activities: Activity[]
  maxHeight?: number
}

const props = withDefaults(defineProps<Props>(), {
  maxHeight: 400
})
</script>

<template>
  <div class="data-activity" :style="{ maxHeight: `${maxHeight}px` }">
    <div v-for="activity in activities" :key="activity.id" class="activity-item">
      <div class="activity-avatar">
        <img v-if="activity.avatar" :src="activity.avatar" :alt="activity.user" />
        <div v-else-if="activity.icon" :class="[activity.icon, 'w-5 h-5 text-gray-600']" />
        <div v-else class="i-mdi-account w-5 h-5 text-gray-600" />
      </div>

      <div class="activity-content">
        <p class="activity-text">
          <span class="font-semibold">{{ activity.user }}</span>
          {{ activity.action }}
          <span v-if="activity.target" class="font-semibold">{{ activity.target }}</span>
        </p>
        <span class="activity-time">{{ activity.time }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.data-activity {
  @apply bg-white rounded-lg border border-gray-200 overflow-y-auto;
}

.activity-item {
  @apply flex gap-3 p-4 border-b border-gray-100 last:border-0 hover:bg-gray-50;
}

.activity-avatar {
  @apply w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden flex-shrink-0;
}

.activity-avatar img {
  @apply w-full h-full object-cover;
}

.activity-content {
  @apply flex-1;
}

.activity-text {
  @apply text-sm text-gray-900 mb-1;
}

.activity-time {
  @apply text-xs text-gray-500;
}
</style>
