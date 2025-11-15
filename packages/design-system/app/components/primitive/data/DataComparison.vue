<script setup lang="ts">
interface ComparisonItem {
  label: string
  values: (string | number | boolean)[]
}

interface Props {
  items: ComparisonItem[]
  headers: string[]
  highlightBest?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  highlightBest: true
})

const getBestIndex = (values: (string | number | boolean)[]) => {
  if (!props.highlightBest) return -1
  
  const numericValues = values.map(v => typeof v === 'number' ? v : 0)
  const maxValue = Math.max(...numericValues)
  return numericValues.indexOf(maxValue)
}
</script>

<template>
  <div class="data-comparison">
    <table class="comparison-table">
      <thead>
        <tr>
          <th class="feature-header"></th>
          <th v-for="(header, i) in headers" :key="i" class="product-header">
            {{ header }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in items" :key="index">
          <th class="feature-label">{{ item.label }}</th>
          <td
            v-for="(value, i) in item.values"
            :key="i"
            :class="[
              'comparison-cell',
              getBestIndex(item.values) === i && 'best-value'
            ]"
          >
            <template v-if="typeof value === 'boolean'">
              <div v-if="value" class="i-mdi-check w-5 h-5 text-green-600" />
              <div v-else class="i-mdi-close w-5 h-5 text-red-600" />
            </template>
            <template v-else>
              {{ value }}
            </template>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.data-comparison {
  @apply overflow-x-auto bg-white rounded-lg border border-gray-200;
}

.comparison-table {
  @apply w-full;
}

.feature-header {
  @apply px-4 py-3 bg-gray-50 border-b border-r border-gray-200;
}

.product-header {
  @apply px-4 py-3 text-center font-semibold bg-blue-50 border-b border-gray-200;
}

.feature-label {
  @apply px-4 py-3 text-left font-medium text-gray-700 bg-gray-50 border-b border-r border-gray-100;
}

.comparison-cell {
  @apply px-4 py-3 text-center border-b border-gray-100;
}

.best-value {
  @apply bg-green-50 font-semibold text-green-900;
}
</style>
