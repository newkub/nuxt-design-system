<script setup lang="ts">
const props = withDefaults(defineProps<{
  src?: string
  alt?: string
  name?: string
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  shape?: 'circle' | 'square'
  status?: 'online' | 'offline' | 'away' | 'busy'
}>(), {
  size: 'md',
  shape: 'circle'
})

const initials = computed(() => {
  if (!props.name) return ''
  return props.name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
})

const hasError = ref(false)
</script>

<template>
  <div :class="['avatar', size, shape]">
    <img
      v-if="src && !hasError"
      :src="src"
      :alt="alt || name"
      @error="hasError = true"
      class="avatar-image"
    />
    <div v-else class="avatar-initials">
      {{ initials || '?' }}
    </div>
    
    <div v-if="status" :class="['avatar-status', status]" />
  </div>
</template>

<style scoped>
.avatar {
  @apply relative inline-flex items-center justify-center bg-gray-200 text-gray-600 font-medium overflow-hidden;
}

.avatar.circle {
  @apply rounded-full;
}

.avatar.square {
  @apply rounded-lg;
}

.avatar.xs {
  @apply w-6 h-6 text-xs;
}

.avatar.sm {
  @apply w-8 h-8 text-sm;
}

.avatar.md {
  @apply w-10 h-10 text-base;
}

.avatar.lg {
  @apply w-12 h-12 text-lg;
}

.avatar.xl {
  @apply w-16 h-16 text-xl;
}

.avatar-image {
  @apply w-full h-full object-cover;
}

.avatar-initials {
  @apply select-none;
}

.avatar-status {
  @apply absolute bottom-0 right-0 w-3 h-3 border-2 border-white rounded-full;
}

.avatar.xs .avatar-status {
  @apply w-2 h-2;
}

.avatar.xl .avatar-status {
  @apply w-4 h-4;
}

.avatar-status.online {
  @apply bg-green-500;
}

.avatar-status.offline {
  @apply bg-gray-400;
}

.avatar-status.away {
  @apply bg-yellow-500;
}

.avatar-status.busy {
  @apply bg-red-500;
}
</style>
