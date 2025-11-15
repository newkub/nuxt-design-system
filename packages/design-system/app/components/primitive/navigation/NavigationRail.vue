<script setup lang="ts">
interface NavItem {
  icon: string
  label: string
  value: string
  badge?: string | number
}

const props = defineProps<{
  modelValue?: string
  items: NavItem[]
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
  itemClick: [item: NavItem]
}>()

const handleClick = (item: NavItem) => {
  emit('update:modelValue', item.value)
  emit('itemClick', item)
}
</script>

<template>
  <nav class="navigation-rail">
    <div class="rail-header">
      <slot name="header" />
    </div>
    
    <div class="rail-items">
      <button
        v-for="item in items"
        :key="item.value"
        :class="['rail-item', { active: modelValue === item.value }]"
        @click="handleClick(item)"
      >
        <span class="rail-icon">{{ item.icon }}</span>
        <span class="rail-label">{{ item.label }}</span>
        <span v-if="item.badge" class="rail-badge">{{ item.badge }}</span>
      </button>
    </div>
    
    <div class="rail-footer">
      <slot name="footer" />
    </div>
  </nav>
</template>

<style scoped>
.navigation-rail {
  @apply w-20 bg-white border-r border-gray-200 flex flex-col;
}

.rail-header {
  @apply p-4 border-b border-gray-200;
}

.rail-items {
  @apply flex-1 py-2 space-y-1;
}

.rail-item {
  @apply w-full px-2 py-3 flex flex-col items-center gap-1 text-gray-600 hover:bg-gray-100 transition-colors relative;
}

.rail-item.active {
  @apply text-blue-600 bg-blue-50;
}

.rail-icon {
  @apply text-2xl;
}

.rail-label {
  @apply text-xs;
}

.rail-badge {
  @apply absolute top-2 right-2 bg-red-500 text-white text-xs px-1.5 rounded-full min-w-[1.25rem] text-center;
}

.rail-footer {
  @apply p-4 border-t border-gray-200;
}
</style>
