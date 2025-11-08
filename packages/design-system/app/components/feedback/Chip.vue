<script setup lang="ts">
const props = withDefaults(defineProps<{
  label?: string
  icon?: string
  closable?: boolean
  variant?: 'filled' | 'outlined'
  color?: 'primary' | 'success' | 'warning' | 'error' | 'gray'
}>(), {
  closable: false,
  variant: 'filled',
  color: 'primary'
})

const emit = defineEmits<{
  close: []
  click: []
}>()
</script>

<template>
  <div :class="['chip', variant, color]" @click="emit('click')">
    <span v-if="icon" class="chip-icon">{{ icon }}</span>
    <span class="chip-label">
      <slot>{{ label }}</slot>
    </span>
    <button v-if="closable" @click.stop="emit('close')" class="chip-close">✕</button>
  </div>
</template>

<style scoped>
.chip {
  @apply inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium transition-colors;
}

.chip.filled.primary {
  @apply bg-blue-100 text-blue-800;
}

.chip.filled.success {
  @apply bg-green-100 text-green-800;
}

.chip.filled.warning {
  @apply bg-yellow-100 text-yellow-800;
}

.chip.filled.error {
  @apply bg-red-100 text-red-800;
}

.chip.filled.gray {
  @apply bg-gray-100 text-gray-800;
}

.chip.outlined {
  @apply bg-transparent border;
}

.chip.outlined.primary {
  @apply border-blue-600 text-blue-600;
}

.chip.outlined.success {
  @apply border-green-600 text-green-600;
}

.chip.outlined.warning {
  @apply border-yellow-600 text-yellow-600;
}

.chip.outlined.error {
  @apply border-red-600 text-red-600;
}

.chip.outlined.gray {
  @apply border-gray-600 text-gray-600;
}

.chip-icon {
  @apply text-base;
}

.chip-label {
  @apply truncate;
}

.chip-close {
  @apply hover:opacity-70 ml-1;
}
</style>
