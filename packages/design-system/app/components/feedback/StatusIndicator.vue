<script setup lang="ts">
const props = withDefaults(defineProps<{
  status?: 'online' | 'offline' | 'away' | 'busy' | 'custom'
  pulse?: boolean
  label?: string
  color?: string
}>(), {
  status: 'online',
  pulse: false
})

const statusColors = {
  online: 'bg-green-500',
  offline: 'bg-gray-400',
  away: 'bg-yellow-500',
  busy: 'bg-red-500',
  custom: ''
}
</script>

<template>
  <div class="status-indicator">
    <span 
      :class="['status-dot', statusColors[status], { pulse }]"
      :style="status === 'custom' && color ? { backgroundColor: color } : {}"
    />
    <span v-if="label" class="status-label">{{ label }}</span>
  </div>
</template>

<style scoped>
.status-indicator {
  @apply inline-flex items-center gap-2;
}

.status-dot {
  @apply w-3 h-3 rounded-full;
}

.status-dot.pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.status-label {
  @apply text-sm text-gray-700;
}
</style>
