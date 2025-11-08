<script setup lang="ts">
const props = withDefaults(defineProps<{
  max?: number
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
}>(), {
  max: 5,
  size: 'md'
})

const slots = useSlots()
const avatars = computed(() => slots.default?.() || [])
const visibleAvatars = computed(() => avatars.value.slice(0, props.max))
const remainingCount = computed(() => Math.max(0, avatars.value.length - props.max))
</script>

<template>
  <div class="avatar-group">
    <div v-for="(avatar, index) in visibleAvatars" :key="index" class="avatar-wrapper">
      <component :is="avatar" :size="size" />
    </div>
    
    <div v-if="remainingCount > 0" :class="['avatar-more', size]">
      +{{ remainingCount }}
    </div>
  </div>
</template>

<style scoped>
.avatar-group {
  @apply flex items-center -space-x-2;
}

.avatar-wrapper {
  @apply ring-2 ring-white rounded-full;
}

.avatar-more {
  @apply flex items-center justify-center bg-gray-300 text-gray-700 font-medium rounded-full ring-2 ring-white;
}

.avatar-more.xs {
  @apply w-6 h-6 text-xs;
}

.avatar-more.sm {
  @apply w-8 h-8 text-sm;
}

.avatar-more.md {
  @apply w-10 h-10 text-base;
}

.avatar-more.lg {
  @apply w-12 h-12 text-lg;
}

.avatar-more.xl {
  @apply w-16 h-16 text-xl;
}
</style>
