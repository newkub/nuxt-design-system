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
  <nav class="bottom-navigation">
    <button
      v-for="item in items"
      :key="item.value"
      :class="['bottom-nav-item', { active: modelValue === item.value }]"
      @click="handleClick(item)"
    >
      <div class="nav-icon-wrapper">
        <span class="nav-icon">{{ item.icon }}</span>
        <span v-if="item.badge" class="nav-badge">{{ item.badge }}</span>
      </div>
      <span class="nav-label">{{ item.label }}</span>
    </button>
  </nav>
</template>

<style scoped>
.bottom-navigation {
  @apply fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex items-center justify-around px-2 py-2 z-40;
}

.bottom-nav-item {
  @apply flex-1 flex flex-col items-center gap-1 py-2 text-gray-600 hover:text-blue-600 transition-colors;
}

.bottom-nav-item.active {
  @apply text-blue-600;
}

.nav-icon-wrapper {
  @apply relative;
}

.nav-icon {
  @apply text-2xl;
}

.nav-label {
  @apply text-xs;
}

.nav-badge {
  @apply absolute -top-1 -right-2 bg-red-500 text-white text-xs px-1.5 rounded-full min-w-[1.25rem] text-center;
}
</style>
