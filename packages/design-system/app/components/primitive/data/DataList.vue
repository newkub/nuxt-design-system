<script setup lang="ts">
interface ListItem {
  id: string
  title: string
  subtitle?: string
  description?: string
  avatar?: string
  badge?: string
  meta?: string
}

interface Props {
  items: ListItem[]
  selectable?: boolean
  hoverable?: boolean
  divided?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  selectable: false,
  hoverable: true,
  divided: true
})

const emit = defineEmits<{
  itemClick: [item: ListItem]
  itemSelect: [item: ListItem]
}>()

const selectedItems = ref<Set<string>>(new Set())

const toggleSelection = (item: ListItem) => {
  if (selectedItems.value.has(item.id)) {
    selectedItems.value.delete(item.id)
  } else {
    selectedItems.value.add(item.id)
  }
  emit('itemSelect', item)
}
</script>

<template>
  <div class="data-list">
    <div
      v-for="item in items"
      :key="item.id"
      :class="[
        'list-item',
        hoverable && 'hoverable',
        divided && 'divided',
        selectedItems.has(item.id) && 'selected'
      ]"
      @click="emit('itemClick', item)"
    >
      <input
        v-if="selectable"
        type="checkbox"
        :checked="selectedItems.has(item.id)"
        @click.stop
        @change="toggleSelection(item)"
        class="checkbox"
      />

      <div v-if="item.avatar" class="avatar">
        <img :src="item.avatar" :alt="item.title" />
      </div>

      <div class="content">
        <div class="header">
          <h4 class="title">{{ item.title }}</h4>
          <span v-if="item.badge" class="badge">{{ item.badge }}</span>
        </div>

        <p v-if="item.subtitle" class="subtitle">{{ item.subtitle }}</p>
        <p v-if="item.description" class="description">{{ item.description }}</p>

        <div v-if="item.meta" class="meta">{{ item.meta }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.data-list {
  @apply bg-white rounded-lg border border-gray-200 overflow-hidden;
}

.list-item {
  @apply flex items-start gap-3 p-4;
}

.list-item.hoverable {
  @apply cursor-pointer hover:bg-gray-50 transition-colors;
}

.list-item.divided {
  @apply border-b border-gray-100 last:border-0;
}

.list-item.selected {
  @apply bg-blue-50;
}

.checkbox {
  @apply mt-1;
}

.avatar {
  @apply w-10 h-10 rounded-full overflow-hidden flex-shrink-0;
}

.avatar img {
  @apply w-full h-full object-cover;
}

.content {
  @apply flex-1 min-w-0;
}

.header {
  @apply flex items-center justify-between mb-1;
}

.title {
  @apply font-medium text-gray-900 truncate;
}

.badge {
  @apply text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full;
}

.subtitle {
  @apply text-sm text-gray-600 mb-1;
}

.description {
  @apply text-sm text-gray-500 line-clamp-2;
}

.meta {
  @apply text-xs text-gray-400 mt-2;
}
</style>
