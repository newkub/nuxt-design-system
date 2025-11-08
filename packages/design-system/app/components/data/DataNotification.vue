<script setup lang="ts">
interface Notification {
  id: string
  title: string
  message: string
  time: string
  read?: boolean
  type?: 'info' | 'success' | 'warning' | 'error'
  icon?: string
  avatar?: string
}

interface Props {
  notifications: Notification[]
  maxHeight?: number
}

const props = withDefaults(defineProps<Props>(), {
  maxHeight: 500
})

const emit = defineEmits<{
  notificationClick: [notification: Notification]
  markAsRead: [notification: Notification]
  markAllRead: []
}>()

const getTypeColor = (type?: string) => {
  const colors = {
    info: 'text-blue-600',
    success: 'text-green-600',
    warning: 'text-yellow-600',
    error: 'text-red-600'
  }
  return colors[type as keyof typeof colors] || 'text-gray-600'
}

const getTypeIcon = (type?: string) => {
  const icons = {
    info: 'i-mdi-information',
    success: 'i-mdi-check-circle',
    warning: 'i-mdi-alert',
    error: 'i-mdi-alert-circle'
  }
  return icons[type as keyof typeof icons] || 'i-mdi-bell'
}
</script>

<template>
  <div class="data-notification">
    <div class="notification-header">
      <h3 class="header-title">Notifications</h3>
      <button @click="emit('markAllRead')" class="mark-all-btn">
        Mark all as read
      </button>
    </div>

    <div class="notification-list" :style="{ maxHeight: `${maxHeight}px` }">
      <div
        v-for="notification in notifications"
        :key="notification.id"
        :class="['notification-item', !notification.read && 'unread']"
        @click="emit('notificationClick', notification)"
      >
        <div class="notification-icon">
          <img v-if="notification.avatar" :src="notification.avatar" alt="" />
          <div v-else :class="[notification.icon || getTypeIcon(notification.type), 'w-5 h-5', getTypeColor(notification.type)]" />
        </div>

        <div class="notification-content">
          <h4 class="notification-title">{{ notification.title }}</h4>
          <p class="notification-message">{{ notification.message }}</p>
          <span class="notification-time">{{ notification.time }}</span>
        </div>

        <button
          v-if="!notification.read"
          @click.stop="emit('markAsRead', notification)"
          class="mark-read-btn"
        >
          <div class="i-mdi-check w-4 h-4" />
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.data-notification {
  @apply bg-white rounded-lg border border-gray-200 overflow-hidden;
}

.notification-header {
  @apply flex items-center justify-between p-4 border-b border-gray-200;
}

.header-title {
  @apply font-semibold text-gray-900;
}

.mark-all-btn {
  @apply text-sm text-blue-600 hover:text-blue-700;
}

.notification-list {
  @apply overflow-y-auto;
}

.notification-item {
  @apply flex gap-3 p-4 border-b border-gray-100 last:border-0 hover:bg-gray-50 cursor-pointer transition-colors;
}

.notification-item.unread {
  @apply bg-blue-50;
}

.notification-icon {
  @apply w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0 overflow-hidden;
}

.notification-icon img {
  @apply w-full h-full object-cover;
}

.notification-content {
  @apply flex-1;
}

.notification-title {
  @apply font-medium text-gray-900 mb-1;
}

.notification-message {
  @apply text-sm text-gray-600 mb-1;
}

.notification-time {
  @apply text-xs text-gray-500;
}

.mark-read-btn {
  @apply p-1 hover:bg-gray-200 rounded;
}
</style>
