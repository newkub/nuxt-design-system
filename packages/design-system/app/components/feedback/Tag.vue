<script setup lang="ts">
const props = withDefaults(defineProps<{
  label?: string
  color?: 'primary' | 'success' | 'warning' | 'error' | 'gray'
  size?: 'sm' | 'md' | 'lg'
  closable?: boolean
}>(), {
  color: 'gray',
  size: 'md',
  closable: false
})

const emit = defineEmits<{
  close: []
  click: []
}>()
</script>

<template>
  <span :class="['tag', color, size]" @click="emit('click')">
    <span class="tag-label">
      <slot>{{ label }}</slot>
    </span>
    <button v-if="closable" @click.stop="emit('close')" class="tag-close">✕</button>
  </span>
</template>

<style scoped>
.tag {
  @apply inline-flex items-center gap-1 rounded font-medium;
}

.tag.sm {
  @apply px-2 py-0.5 text-xs;
}

.tag.md {
  @apply px-2.5 py-1 text-sm;
}

.tag.lg {
  @apply px-3 py-1.5 text-base;
}

.tag.primary {
  @apply bg-blue-100 text-blue-800;
}

.tag.success {
  @apply bg-green-100 text-green-800;
}

.tag.warning {
  @apply bg-yellow-100 text-yellow-800;
}

.tag.error {
  @apply bg-red-100 text-red-800;
}

.tag.gray {
  @apply bg-gray-100 text-gray-800;
}

.tag-label {
  @apply truncate;
}

.tag-close {
  @apply hover:opacity-70;
}
</style>
