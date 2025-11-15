<script setup lang="ts">
interface Card {
  id: string
  title: string
  description?: string
  image?: string
  badge?: string
  tags?: string[]
  footer?: string
}

interface Props {
  cards: Card[]
  columns?: number
  selectable?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  columns: 3,
  selectable: false
})

const emit = defineEmits<{
  cardClick: [card: Card]
}>()

const selectedCards = ref<Set<string>>(new Set())

const gridCols = computed(() => {
  const cols: Record<number, string> = {
    1: 'grid-cols-1',
    2: 'grid-cols-2',
    3: 'grid-cols-3',
    4: 'grid-cols-4'
  }
  return cols[props.columns] || 'grid-cols-3'
})
</script>

<template>
  <div :class="['data-cards', gridCols]">
    <div
      v-for="card in cards"
      :key="card.id"
      :class="['card', selectedCards.has(card.id) && 'selected']"
      @click="emit('cardClick', card)"
    >
      <div v-if="card.image" class="card-image">
        <img :src="card.image" :alt="card.title" />
        <span v-if="card.badge" class="image-badge">{{ card.badge }}</span>
      </div>

      <div class="card-content">
        <h3 class="card-title">{{ card.title }}</h3>
        <p v-if="card.description" class="card-description">{{ card.description }}</p>

        <div v-if="card.tags && card.tags.length" class="card-tags">
          <span v-for="tag in card.tags" :key="tag" class="tag">{{ tag }}</span>
        </div>
      </div>

      <div v-if="card.footer" class="card-footer">
        {{ card.footer }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.data-cards {
  @apply grid gap-4;
}

.card {
  @apply bg-white rounded-lg border border-gray-200 overflow-hidden cursor-pointer hover:shadow-lg transition-shadow;
}

.card.selected {
  @apply ring-2 ring-blue-500;
}

.card-image {
  @apply relative w-full h-48 bg-gray-100;
}

.card-image img {
  @apply w-full h-full object-cover;
}

.image-badge {
  @apply absolute top-2 right-2 bg-blue-600 text-white text-xs px-2 py-1 rounded;
}

.card-content {
  @apply p-4;
}

.card-title {
  @apply font-semibold text-gray-900 mb-2;
}

.card-description {
  @apply text-sm text-gray-600 mb-3 line-clamp-2;
}

.card-tags {
  @apply flex flex-wrap gap-1;
}

.tag {
  @apply text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded;
}

.card-footer {
  @apply px-4 py-3 bg-gray-50 text-sm text-gray-600 border-t border-gray-200;
}
</style>
