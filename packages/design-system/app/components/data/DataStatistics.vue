<script setup lang="ts">
interface Stat {
  label: string
  value: string | number
  change?: number
  icon?: string
  color?: string
}

interface Props {
  stats: Stat[]
  columns?: number
}

const props = withDefaults(defineProps<Props>(), {
  columns: 4
})

const gridCols = computed(() => {
  const cols: Record<number, string> = {
    2: 'grid-cols-2',
    3: 'grid-cols-3',
    4: 'grid-cols-4'
  }
  return cols[props.columns] || 'grid-cols-4'
})

const getChangeColor = (change?: number) => {
  if (!change) return ''
  return change > 0 ? 'text-green-600' : 'text-red-600'
}

const getChangeIcon = (change?: number) => {
  if (!change) return ''
  return change > 0 ? 'i-mdi-trending-up' : 'i-mdi-trending-down'
}
</script>

<template>
  <div :class="['data-statistics', gridCols]">
    <div v-for="stat in stats" :key="stat.label" class="stat-card">
      <div class="stat-header">
        <span class="stat-label">{{ stat.label }}</span>
        <div v-if="stat.icon" :class="[stat.icon, 'w-8 h-8', stat.color || 'text-blue-600']" />
      </div>

      <div class="stat-value">{{ stat.value }}</div>

      <div v-if="stat.change !== undefined" class="stat-change">
        <div :class="[getChangeIcon(stat.change), 'w-4 h-4', getChangeColor(stat.change)]" />
        <span :class="getChangeColor(stat.change)">
          {{ Math.abs(stat.change) }}%
        </span>
        <span class="text-gray-500">vs last period</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.data-statistics {
  @apply grid gap-4;
}

.stat-card {
  @apply bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow;
}

.stat-header {
  @apply flex items-center justify-between mb-4;
}

.stat-label {
  @apply text-sm font-medium text-gray-600;
}

.stat-value {
  @apply text-3xl font-bold text-gray-900 mb-2;
}

.stat-change {
  @apply flex items-center gap-1 text-sm;
}
</style>
