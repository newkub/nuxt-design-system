<script setup lang="ts">
interface PivotData {
  rows: string[]
  columns: string[]
  values: Record<string, Record<string, number>>
  aggregation?: 'sum' | 'avg' | 'count'
}

interface Props {
  data: PivotData
}

const props = defineProps<Props>()

const getAggregatedValue = (row: string, col: string) => {
  return props.data.values[row]?.[col] || 0
}

const getRowTotal = (row: string) => {
  return props.data.columns.reduce((sum, col) => sum + getAggregatedValue(row, col), 0)
}

const getColumnTotal = (col: string) => {
  return props.data.rows.reduce((sum, row) => sum + getAggregatedValue(row, col), 0)
}

const grandTotal = computed(() => {
  return props.data.rows.reduce((sum, row) => sum + getRowTotal(row), 0)
})
</script>

<template>
  <div class="data-pivot">
    <table class="pivot-table">
      <thead>
        <tr>
          <th class="corner-cell"></th>
          <th v-for="col in data.columns" :key="col" class="column-header">
            {{ col }}
          </th>
          <th class="total-header">Total</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in data.rows" :key="row">
          <th class="row-header">{{ row }}</th>
          <td v-for="col in data.columns" :key="col" class="data-cell">
            {{ getAggregatedValue(row, col).toLocaleString() }}
          </td>
          <td class="total-cell">{{ getRowTotal(row).toLocaleString() }}</td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <th class="total-header">Total</th>
          <td v-for="col in data.columns" :key="col" class="total-cell">
            {{ getColumnTotal(col).toLocaleString() }}
          </td>
          <td class="grand-total">{{ grandTotal.toLocaleString() }}</td>
        </tr>
      </tfoot>
    </table>
  </div>
</template>

<style scoped>
.data-pivot {
  @apply overflow-x-auto bg-white rounded-lg border border-gray-200;
}

.pivot-table {
  @apply w-full text-sm;
}

.corner-cell {
  @apply bg-gray-50 border-b border-r border-gray-200;
}

.column-header, .row-header, .total-header {
  @apply px-4 py-2 bg-gray-50 font-medium text-gray-700 border-b border-gray-200;
}

.row-header {
  @apply text-left border-r border-gray-200;
}

.data-cell {
  @apply px-4 py-2 text-right border-b border-r border-gray-100 hover:bg-gray-50;
}

.total-cell {
  @apply px-4 py-2 text-right font-medium bg-blue-50 border-b border-gray-200;
}

.grand-total {
  @apply px-4 py-2 text-right font-bold bg-blue-100 text-blue-900;
}
</style>
