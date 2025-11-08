<script setup lang="ts">
const props = withDefaults(defineProps<{
  status?: 'success' | 'error' | 'warning' | 'info' | '404' | '403' | '500'
  title?: string
  subtitle?: string
}>(), {
  status: 'info'
})

const statusConfig = {
  success: { icon: '✓', color: 'text-green-600', bg: 'bg-green-100' },
  error: { icon: '✕', color: 'text-red-600', bg: 'bg-red-100' },
  warning: { icon: '⚠', color: 'text-yellow-600', bg: 'bg-yellow-100' },
  info: { icon: 'ℹ', color: 'text-blue-600', bg: 'bg-blue-100' },
  '404': { icon: '404', color: 'text-gray-600', bg: 'bg-gray-100' },
  '403': { icon: '403', color: 'text-gray-600', bg: 'bg-gray-100' },
  '500': { icon: '500', color: 'text-gray-600', bg: 'bg-gray-100' }
}

const config = computed(() => statusConfig[props.status])
</script>

<template>
  <div class="result">
    <div :class="['result-icon', config.bg, config.color]">
      {{ config.icon }}
    </div>
    
    <h2 v-if="title" class="result-title">{{ title }}</h2>
    <p v-if="subtitle" class="result-subtitle">{{ subtitle }}</p>
    
    <div class="result-content">
      <slot />
    </div>
    
    <div v-if="$slots.actions" class="result-actions">
      <slot name="actions" />
    </div>
  </div>
</template>

<style scoped>
.result {
  @apply flex flex-col items-center text-center py-12 px-4;
}

.result-icon {
  @apply w-20 h-20 rounded-full flex items-center justify-center text-4xl font-bold mb-4;
}

.result-title {
  @apply text-2xl font-bold text-gray-900 mb-2;
}

.result-subtitle {
  @apply text-gray-600 mb-6;
}

.result-content {
  @apply mb-6;
}

.result-actions {
  @apply flex items-center gap-3;
}
</style>
