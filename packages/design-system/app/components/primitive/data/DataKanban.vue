<script setup lang="ts">
import { useDragDrop } from '~/composables/useDragDrop'

interface KanbanCard {
  id: string
  title: string
  description?: string
  assignee?: string
  priority?: 'low' | 'medium' | 'high'
  tags?: string[]
}

interface KanbanColumn {
  id: string
  title: string
  cards: KanbanCard[]
  color?: string
}

interface Props {
  columns: KanbanColumn[]
}

const props = defineProps<Props>()

const emit = defineEmits<{
  cardMove: [card: KanbanCard, fromColumn: string, toColumn: string]
  cardClick: [card: KanbanCard]
}>()

const columns = ref(props.columns)
const draggedCard = ref<KanbanCard | null>(null)
const sourceColumnId = ref<string | null>(null)

const onCardDragStart = (card: KanbanCard, columnId: string) => {
  draggedCard.value = card
  sourceColumnId.value = columnId
}

const onCardDrop = (targetColumnId: string) => {
  if (!draggedCard.value || !sourceColumnId.value) return

  const sourceColumn = columns.value.find(c => c.id === sourceColumnId.value)
  const targetColumn = columns.value.find(c => c.id === targetColumnId)

  if (!sourceColumn || !targetColumn) return

  const cardIndex = sourceColumn.cards.findIndex(c => c.id === draggedCard.value?.id)
  if (cardIndex > -1) {
    const [card] = sourceColumn.cards.splice(cardIndex, 1)
    targetColumn.cards.push(card)
    // biome-ignore lint/style/noNonNullAssertion: The value is checked in the 'onCardDrop' function.
    emit('cardMove', card, sourceColumnId.value!, targetColumnId)
  }

  draggedCard.value = null
  sourceColumnId.value = null
}

const getPriorityColor = (priority?: string) => {
  const colors = {
    low: 'bg-green-100 text-green-700',
    medium: 'bg-yellow-100 text-yellow-700',
    high: 'bg-red-100 text-red-700'
  }
  return colors[priority as keyof typeof colors] || 'bg-gray-100 text-gray-700'
}
</script>

<template>
  <div class="kanban-board">
    <div
      v-for="column in columns"
      :key="column.id"
      class="kanban-column"
      @dragover.prevent
      @drop="onCardDrop(column.id)"
    >
      <div class="column-header" :style="{ borderTopColor: column.color }">
        <h3 class="column-title">{{ column.title }}</h3>
        <span class="card-count">{{ column.cards.length }}</span>
      </div>

      <div class="cards-container">
        <div
          v-for="card in column.cards"
          :key="card.id"
          class="kanban-card"
          draggable="true"
          @dragstart="onCardDragStart(card, column.id)"
          @click="emit('cardClick', card)"
        >
          <div class="card-header">
            <h4 class="card-title">{{ card.title }}</h4>
            <span v-if="card.priority" :class="['priority-badge', getPriorityColor(card.priority)]">
              {{ card.priority }}
            </span>
          </div>

          <p v-if="card.description" class="card-description">
            {{ card.description }}
          </p>

          <div v-if="card.tags && card.tags.length" class="card-tags">
            <span v-for="tag in card.tags" :key="tag" class="tag">
              {{ tag }}
            </span>
          </div>

          <div v-if="card.assignee" class="card-footer">
            <div class="assignee">
              <div class="i-mdi-account w-4 h-4" />
              <span>{{ card.assignee }}</span>
            </div>
          </div>
        </div>

        <button class="add-card-btn">
          <div class="i-mdi-plus w-4 h-4" />
          Add Card
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.kanban-board {
  @apply flex gap-4 overflow-x-auto p-4 bg-gray-50 rounded-lg;
}

.kanban-column {
  @apply flex-shrink-0 w-80 bg-gray-100 rounded-lg;
}

.column-header {
  @apply p-4 border-t-4 rounded-t-lg bg-white flex items-center justify-between;
}

.column-title {
  @apply font-semibold text-gray-900;
}

.card-count {
  @apply text-sm text-gray-500 bg-gray-200 px-2 py-1 rounded-full;
}

.cards-container {
  @apply p-2 space-y-2 max-h-[600px] overflow-y-auto;
}

.kanban-card {
  @apply p-4 bg-white rounded-lg shadow-sm border border-gray-200 cursor-move hover:shadow-md transition-shadow;
}

.card-header {
  @apply flex items-start justify-between mb-2;
}

.card-title {
  @apply font-medium text-gray-900 flex-1;
}

.priority-badge {
  @apply text-xs px-2 py-1 rounded-full font-medium;
}

.card-description {
  @apply text-sm text-gray-600 mb-3;
}

.card-tags {
  @apply flex flex-wrap gap-1 mb-3;
}

.tag {
  @apply text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded;
}

.card-footer {
  @apply flex items-center text-sm text-gray-600;
}

.assignee {
  @apply flex items-center gap-1;
}

.add-card-btn {
  @apply w-full p-3 text-gray-600 hover:bg-white hover:text-gray-900 rounded-lg transition-colors flex items-center justify-center gap-2;
}
</style>
