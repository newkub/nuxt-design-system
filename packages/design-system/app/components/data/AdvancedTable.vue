<script setup lang="ts" generic="T extends Record<string, any>">
import { useDataTable, type Column } from '~/composables/useDataTable'
import { useDragDrop } from '~/composables/useDragDrop'

interface Props {
  columns: Column[]
  data: T[]
  enableSearch?: boolean
  enableSort?: boolean
  enableFilter?: boolean
  enableGrouping?: boolean
  enableSelection?: boolean
  enablePagination?: boolean
  enableDragDrop?: boolean
  enableExport?: boolean
  pageSize?: number
}

const props = withDefaults(defineProps<Props>(), {
  enableSearch: true,
  enableSort: true,
  enableFilter: true,
  enableGrouping: false,
  enableSelection: true,
  enablePagination: true,
  enableDragDrop: false,
  enableExport: true,
  pageSize: 10
})

const emit = defineEmits<{
  rowClick: [row: T]
  rowsSelected: [rows: T[]]
  dataChanged: [data: T[]]
}>()

const {
  data: tableData,
  searchQuery,
  sortKey,
  sortOrder,
  filters,
  selectedRows,
  groupByKey,
  pageSize,
  currentPage,
  paginatedData,
  groupedData,
  totalPages,
  sort,
  setFilter,
  clearFilters,
  toggleRowSelection,
  selectAll,
  exportData
} = useDataTable(props.data, props.columns)

const {
  onDragStart,
  onDragOver,
  onDragLeave,
  onDrop,
  onDragEnd
} = useDragDrop<T>()

pageSize.value = props.pageSize

const showFilters = ref(false)
const filterValues = ref<Record<string, string>>({})

const handleSort = (column: Column) => {
  if (!props.enableSort || !column.sortable) return
  sort(column.key)
}

const handleFilter = (key: string, value: string) => {
  filterValues.value[key] = value
  setFilter(key, value)
}

const handleExport = (format: 'csv' | 'json') => {
  const content = exportData(format)
  const blob = new Blob([content], { type: format === 'csv' ? 'text/csv' : 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `export.${format}`
  a.click()
}

const handleDrop = (targetIndex: number) => {
  const newData = onDrop(targetIndex, tableData.value)
  tableData.value = newData
  emit('dataChanged', newData)
}

const getSortIcon = (column: Column) => {
  if (sortKey.value !== column.key) return 'i-mdi-sort'
  return sortOrder.value === 'asc' ? 'i-mdi-sort-ascending' : 'i-mdi-sort-descending'
}
</script>

<template>
  <div class="advanced-table">
    <!-- Toolbar -->
    <div class="toolbar">
      <div class="toolbar-left">
        <input
          v-if="enableSearch"
          v-model="searchQuery"
          type="text"
          placeholder="Search..."
          class="search-input"
        />
        
        <button
          v-if="enableFilter"
          @click="showFilters = !showFilters"
          class="btn-secondary"
        >
          <div class="i-mdi-filter w-4 h-4" />
          Filters
        </button>
        
        <button
          v-if="enableGrouping"
          class="btn-secondary"
        >
          <div class="i-mdi-group w-4 h-4" />
          Group
        </button>
      </div>
      
      <div class="toolbar-right">
        <span v-if="selectedRows.size > 0" class="selected-count">
          {{ selectedRows.size }} selected
        </span>
        
        <button
          v-if="enableExport"
          @click="handleExport('csv')"
          class="btn-secondary"
        >
          <div class="i-mdi-download w-4 h-4" />
          Export CSV
        </button>
        
        <button
          v-if="enableExport"
          @click="handleExport('json')"
          class="btn-secondary"
        >
          <div class="i-mdi-code-json w-4 h-4" />
          Export JSON
        </button>
      </div>
    </div>

    <!-- Filters Row -->
    <div v-if="showFilters" class="filters-row">
      <div v-for="column in columns.filter(c => c.filterable)" :key="column.key" class="filter-item">
        <label>{{ column.label }}</label>
        <input
          :value="filterValues[column.key]"
          @input="handleFilter(column.key, ($event.target as HTMLInputElement).value)"
          type="text"
          placeholder="Filter..."
          class="filter-input"
        />
      </div>
      
      <button @click="clearFilters" class="btn-link">
        Clear All
      </button>
    </div>

    <!-- Table -->
    <div class="table-container">
      <table class="table">
        <thead>
          <tr>
            <th v-if="enableSelection" class="selection-cell">
              <input
                type="checkbox"
                @change="selectAll"
                :checked="selectedRows.size === paginatedData.length && paginatedData.length > 0"
              />
            </th>
            
            <th v-if="enableDragDrop" class="drag-cell"></th>
            
            <th
              v-for="column in columns"
              :key="column.key"
              :class="[
                'table-header',
                column.sortable && 'sortable',
                column.align && `text-${column.align}`
              ]"
              :style="{ width: column.width }"
              @click="handleSort(column)"
            >
              <div class="header-content">
                <span>{{ column.label }}</span>
                <div v-if="column.sortable" :class="[getSortIcon(column), 'w-4 h-4 ml-2']" />
              </div>
            </th>
          </tr>
        </thead>
        
        <tbody>
          <tr
            v-for="(row, index) in paginatedData"
            :key="index"
            :class="[
              'table-row',
              selectedRows.has(index) && 'selected'
            ]"
            :draggable="enableDragDrop"
            @dragstart="enableDragDrop && onDragStart(row, index)"
            @dragover="enableDragDrop && onDragOver($event)"
            @dragleave="enableDragDrop && onDragLeave()"
            @drop="enableDragDrop && handleDrop(index)"
            @dragend="enableDragDrop && onDragEnd()"
            @click="emit('rowClick', row)"
          >
            <td v-if="enableSelection" class="selection-cell">
              <input
                type="checkbox"
                :checked="selectedRows.has(index)"
                @change.stop="toggleRowSelection(index)"
              />
            </td>
            
            <td v-if="enableDragDrop" class="drag-cell">
              <div class="i-mdi-drag w-4 h-4 cursor-move" />
            </td>
            
            <td
              v-for="column in columns"
              :key="column.key"
              :class="[column.align && `text-${column.align}`]"
            >
              <template v-if="column.render">
                <div v-html="column.render(row[column.key], row)" />
              </template>
              <template v-else>
                {{ row[column.key] }}
              </template>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination -->
    <div v-if="enablePagination" class="pagination">
      <div class="pagination-info">
        Showing {{ (currentPage - 1) * pageSize + 1 }} to {{ Math.min(currentPage * pageSize, paginatedData.length) }} of {{ paginatedData.length }} entries
      </div>
      
      <div class="pagination-controls">
        <button
          @click="currentPage--"
          :disabled="currentPage === 1"
          class="btn-pagination"
        >
          Previous
        </button>
        
        <span class="page-numbers">
          Page {{ currentPage }} of {{ totalPages }}
        </span>
        
        <button
          @click="currentPage++"
          :disabled="currentPage === totalPages"
          class="btn-pagination"
        >
          Next
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.advanced-table {
  @apply w-full bg-white rounded-lg border border-gray-200;
}

.toolbar {
  @apply flex items-center justify-between p-4 border-b border-gray-200;
}

.toolbar-left, .toolbar-right {
  @apply flex items-center gap-2;
}

.search-input {
  @apply px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none;
}

.btn-secondary {
  @apply px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm flex items-center gap-2;
}

.btn-link {
  @apply text-blue-600 hover:text-blue-700 text-sm;
}

.selected-count {
  @apply text-sm font-medium text-gray-700;
}

.filters-row {
  @apply p-4 bg-gray-50 border-b border-gray-200 flex items-end gap-4 flex-wrap;
}

.filter-item {
  @apply flex flex-col gap-1;
}

.filter-item label {
  @apply text-xs font-medium text-gray-700;
}

.filter-input {
  @apply px-2 py-1 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 outline-none;
}

.table-container {
  @apply overflow-x-auto;
}

.table {
  @apply w-full;
}

.table-header {
  @apply px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider bg-gray-50 border-b border-gray-200;
}

.table-header.sortable {
  @apply cursor-pointer hover:bg-gray-100;
}

.header-content {
  @apply flex items-center;
}

.table-row {
  @apply border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer;
}

.table-row.selected {
  @apply bg-blue-50;
}

.table-row td {
  @apply px-4 py-3 text-sm text-gray-900;
}

.selection-cell {
  @apply w-12 text-center;
}

.drag-cell {
  @apply w-12 text-center text-gray-400;
}

.pagination {
  @apply flex items-center justify-between p-4 border-t border-gray-200;
}

.pagination-info {
  @apply text-sm text-gray-700;
}

.pagination-controls {
  @apply flex items-center gap-4;
}

.btn-pagination {
  @apply px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed;
}

.page-numbers {
  @apply text-sm text-gray-700;
}
</style>
