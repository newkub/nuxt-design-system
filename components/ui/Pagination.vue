<script setup lang="ts">
interface Props {
  totalItems: number
  itemsPerPage?: number
  currentPage?: number
  maxVisibleButtons?: number
}

const props = withDefaults(defineProps<Props>(), {
  itemsPerPage: 10,
  currentPage: 1,
  maxVisibleButtons: 5
})

const emit = defineEmits(['update:currentPage'])

const totalPages = computed(() => {
  return Math.ceil(props.totalItems / props.itemsPerPage)
})

const visiblePages = computed(() => {
  const pages = []
  const half = Math.floor(props.maxVisibleButtons / 2)
  const start = Math.max(props.currentPage - half, 1)
  const end = Math.min(start + props.maxVisibleButtons - 1, totalPages.value)

  if (end - start + 1 < props.maxVisibleButtons) {
    const start = Math.max(end - props.maxVisibleButtons + 1, 1)
  }

  for (let i = start; i <= end; i++) {
    pages.push(i)
  }

  return pages
})

const goToPage = (page: number) => {
  if (page >= 1 && page <= totalPages.value) {
    emit('update:currentPage', page)
  }
}
</script>

<template>
  <nav class="flex items-center justify-center gap-2" role="navigation">
    <!-- Previous Button -->
    <button
      class="px-3 py-1 rounded-md transition-colors"
      :class="[
        currentPage === 1 ? 'bg-gray-200 cursor-not-allowed' : 'hover:(bg-gray-100 dark:bg-gray-700)',
        'dark:(bg-gray-800 text-gray-100)'
      ]"
      @click="goToPage(currentPage - 1)"
      :disabled="currentPage === 1"
    >
      <div class="i-[mdi-chevron-left]" />
    </button>

    <!-- Page Buttons -->
    <template v-for="page in visiblePages" :key="page">
      <button
        class="px-3 py-1 rounded-md transition-colors"
        :class="[
          page === currentPage ? 'bg-blue-500 text-white' : 'hover:(bg-gray-100 dark:bg-gray-700)',
          'dark:(bg-gray-800 text-gray-100)'
        ]"
        @click="goToPage(page)"
      >
        {{ page }}
      </button>
    </template>

    <!-- Next Button -->
    <button
      class="px-3 py-1 rounded-md transition-colors"
      :class="[
        currentPage === totalPages ? 'bg-gray-200 cursor-not-allowed' : 'hover:(bg-gray-100 dark:bg-gray-700)',
        'dark:(bg-gray-800 text-gray-100)'
      ]"
      @click="goToPage(currentPage + 1)"
      :disabled="currentPage === totalPages"
    >
      <div class="i-[mdi-chevron-right]" />
    </button>
  </nav>
</template>
