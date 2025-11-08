<script setup lang="ts">
const props = withDefaults(defineProps<{
  label?: string
  icon?: string
  disabled?: boolean
  danger?: boolean
  href?: string
}>(), {
  disabled: false,
  danger: false
})

const emit = defineEmits<{
  click: []
}>()

const handleClick = () => {
  if (!props.disabled) {
    emit('click')
  }
}
</script>

<template>
  <component
    :is="href ? 'a' : 'button'"
    :href="href"
    :class="['menu-item', { disabled, danger }]"
    @click="handleClick"
  >
    <span v-if="icon" class="menu-item-icon">{{ icon }}</span>
    <span class="menu-item-label">
      <slot>{{ label }}</slot>
    </span>
    <slot name="end" />
  </component>
</template>

<style scoped>
.menu-item {
  @apply w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-3 transition-colors;
}

.menu-item.disabled {
  @apply text-gray-400 cursor-not-allowed hover:bg-transparent;
}

.menu-item.danger {
  @apply text-red-600 hover:bg-red-50;
}

.menu-item-icon {
  @apply text-base;
}

.menu-item-label {
  @apply flex-1;
}
</style>
