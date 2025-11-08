<script setup lang="ts">
defineProps<{
  type?: 'button' | 'link'
  to?: string
  active?: boolean
  collapsed?: boolean
  layout?: 'horizontal' | 'vertical'
  icon?: string
  label?: string
  isFolder?: boolean
  isExpanded?: boolean
}>()

defineEmits<{
  click: []
}>()
</script>

<template>
  <component
    :is="type === 'link' && to ? 'a' : 'button'"
    :href="type === 'link' ? to : undefined"
    :class="[
      'flex items-center gap-2 px-3 py-2 rounded-lg transition-colors',
      active ? 'bg-primary-100 text-primary-700' : 'hover:bg-gray-100',
      collapsed ? 'justify-center' : '',
    ]"
    @click="$emit('click')"
  >
    <i v-if="icon" :class="icon" class="text-lg" />
    <span v-if="!collapsed && label" class="flex-1">{{ label }}</span>
    <i 
      v-if="isFolder && !collapsed" 
      :class="isExpanded ? 'i-mdi-chevron-down' : 'i-mdi-chevron-right'"
      class="text-sm"
    />
  </component>
</template>
