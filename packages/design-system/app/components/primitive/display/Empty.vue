<script setup lang="ts">
const props = withDefaults(defineProps<{
  title?: string
  description?: string
  icon?: string
  actionText?: string
}>(), {
  title: 'No Data',
  description: 'There is no data to display',
  icon: '📭'
})

const emit = defineEmits<{
  action: []
}>()
</script>

<template>
  <div class="empty">
    <div class="empty-icon">{{ icon }}</div>
    <h3 class="empty-title">{{ title }}</h3>
    <p class="empty-description">{{ description }}</p>
    <button v-if="actionText" @click="emit('action')" class="empty-action">
      {{ actionText }}
    </button>
  </div>
</template>

<style scoped>
.empty {
  @apply flex flex-col items-center justify-center py-12 text-center;
}

.empty-icon {
  @apply text-6xl mb-4;
}

.empty-title {
  @apply text-xl font-semibold text-gray-900 mb-2;
}

.empty-description {
  @apply text-gray-600 mb-6;
}

.empty-action {
  @apply px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700;
}
</style>
