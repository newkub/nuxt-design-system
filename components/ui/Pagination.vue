<script setup lang="ts">
import { computed, ref } from 'vue'

const props = defineProps({
  totalItems: { type: Number, required: true },
  itemsPerPage: { type: Number, default: 10 },
  currentPage: { type: Number, default: 1 },
  maxVisibleButtons: { type: Number, default: 5 }
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
      class="px-3 py-1 rounded-md"
      :class="{
        'bg-gray-200 cursor-not-allowed': currentPage === 1,
        'hover:bg-gray-100': currentPage > 1
      }"
      @click="goToPage(currentPage - 1)"
      :disabled="currentPage === 1"
    >
      Previous
    </button>

    <!-- Page Buttons -->
    <template v-for="page in visiblePages" :key="page">
      <button
        class="px-3 py-1 rounded-md"
        :class="{
          'bg-blue-500 text-white': page === currentPage,
          'hover:bg-gray-100': page !== currentPage
        }"
        @click="goToPage(page)"
      >
        {{ page }}
      </button>
    </template>

    <!-- Next Button -->
    <button
      class="px-3 py-1 rounded-md"
      :class="{
        'bg-gray-200 cursor-not-allowed': currentPage === totalPages,
        'hover:bg-gray-100': currentPage < totalPages
      }"
      @click="goToPage(currentPage + 1)"
      :disabled="currentPage === totalPages"
    >
      Next
    </button>
  </nav>
</template>
