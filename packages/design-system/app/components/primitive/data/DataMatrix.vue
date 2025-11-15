<script setup lang="ts">
interface Cell {
  value: string | number
  editable?: boolean
}

interface Props {
  rows: number
  cols: number
  data?: Cell[][]
}

const props = withDefaults(defineProps<Props>(), {
  rows: 10,
  cols: 10
})

const emit = defineEmits<{
  cellChange: [row: number, col: number, value: string]
}>()

const matrix = ref<Cell[][]>(
  props.data || Array.from({ length: props.rows }, () =>
    Array.from({ length: props.cols }, () => ({ value: '', editable: true }))
  )
)

const selectedCell = ref<{ row: number; col: number } | null>(null)

const updateCell = (row: number, col: number, value: string) => {
  matrix.value[row][col].value = value
  emit('cellChange', row, col, value)
}
</script>

<template>
  <div class="data-matrix">
    <table class="matrix-table">
      <tbody>
        <tr v-for="(row, rowIndex) in matrix" :key="rowIndex">
          <td
            v-for="(cell, colIndex) in row"
            :key="colIndex"
            class="matrix-cell"
          >
            <input
              v-if="cell.editable"
              :value="cell.value"
              @input="updateCell(rowIndex, colIndex, ($event.target as HTMLInputElement).value)"
              class="cell-input"
            />
            <span v-else>{{ cell.value }}</span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.data-matrix {
  @apply overflow-auto bg-white rounded-lg border border-gray-200;
}

.matrix-table {
  @apply w-full border-collapse;
}

.matrix-cell {
  @apply border border-gray-200 p-0 hover:bg-gray-50;
}

.cell-input {
  @apply w-full h-full px-2 py-1 text-sm outline-none;
}
</style>
