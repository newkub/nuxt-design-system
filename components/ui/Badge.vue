<template>
  <span :class="['badge', `badge--${variant}`]">
    <slot />
  </span>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger'
}>(), {
  variant: 'primary'
})
</script>

<style scoped>
.badge {
  display: inline-block;
  padding: 0.25rem 0.5rem;
  border-radius: 0.375rem;
  font-size: 0.75rem;
  font-weight: 500;
  line-height: 1;
}

.badge--primary {
  background-color: #3b82f6;
  color: white;
}

.badge--secondary {
  background-color: #e5e7eb;
  color: #4b5563;
}

.badge--success {
  background-color: #10b981;
  color: white;
}

.badge--warning {
  background-color: #f59e0b;
  color: white;
}

.badge--danger {
  background-color: #ef4444;
  color: white;
}
</style>
