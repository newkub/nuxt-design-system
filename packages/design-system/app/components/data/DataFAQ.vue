<script setup lang="ts">
interface FAQItem {
  id: string
  question: string
  answer: string
  category?: string
}

interface Props {
  items: FAQItem[]
  searchable?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  searchable: true
})

const searchQuery = ref('')
const expandedItems = ref<Set<string>>(new Set())

const filteredItems = computed(() => {
  if (!searchQuery.value) return props.items
  
  const query = searchQuery.value.toLowerCase()
  return props.items.filter(item =>
    item.question.toLowerCase().includes(query) ||
    item.answer.toLowerCase().includes(query)
  )
})

const toggleItem = (id: string) => {
  if (expandedItems.value.has(id)) {
    expandedItems.value.delete(id)
  } else {
    expandedItems.value.add(id)
  }
}
</script>

<template>
  <div class="data-faq">
    <div v-if="searchable" class="faq-search">
      <div class="i-mdi-magnify search-icon" />
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search FAQ..."
        class="search-input"
      />
    </div>

    <div class="faq-list">
      <div
        v-for="item in filteredItems"
        :key="item.id"
        :class="['faq-item', expandedItems.has(item.id) && 'expanded']"
      >
        <button
          @click="toggleItem(item.id)"
          class="faq-question"
        >
          <span>{{ item.question }}</span>
          <div
            :class="[
              'i-mdi-chevron-down w-5 h-5 transition-transform',
              expandedItems.has(item.id) && 'rotate-180'
            ]"
          />
        </button>

        <div v-if="expandedItems.has(item.id)" class="faq-answer">
          {{ item.answer }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.data-faq {
  @apply bg-white rounded-lg border border-gray-200 p-6;
}

.faq-search {
  @apply relative mb-6;
}

.search-icon {
  @apply absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400;
}

.search-input {
  @apply w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none;
}

.faq-list {
  @apply space-y-4;
}

.faq-item {
  @apply border border-gray-200 rounded-lg overflow-hidden;
}

.faq-item.expanded {
  @apply border-blue-500;
}

.faq-question {
  @apply w-full flex items-center justify-between p-4 text-left font-medium text-gray-900 hover:bg-gray-50 transition-colors;
}

.faq-answer {
  @apply px-4 pb-4 text-gray-600;
}
</style>
