<script setup lang="ts">
import { ref } from 'vue'

interface Column {
  name: string
  type: string
  nullable: boolean
  primary?: boolean
  unique?: boolean
  default?: string
}

interface Table {
  name: string
  columns: Column[]
  expanded: boolean
}

const tables = ref<Table[]>([
  {
    name: 'users',
    expanded: true,
    columns: [
      { name: 'id', type: 'INTEGER', nullable: false, primary: true },
      { name: 'email', type: 'VARCHAR(255)', nullable: false, unique: true },
      { name: 'name', type: 'VARCHAR(100)', nullable: false },
      { name: 'created_at', type: 'TIMESTAMP', nullable: false, default: 'CURRENT_TIMESTAMP' }
    ]
  },
  {
    name: 'posts',
    expanded: false,
    columns: [
      { name: 'id', type: 'INTEGER', nullable: false, primary: true },
      { name: 'user_id', type: 'INTEGER', nullable: false },
      { name: 'title', type: 'VARCHAR(255)', nullable: false },
      { name: 'content', type: 'TEXT', nullable: true },
      { name: 'created_at', type: 'TIMESTAMP', nullable: false }
    ]
  }
])

const toggleTable = (table: Table) => {
  table.expanded = !table.expanded
}

const getColumnIcon = (column: Column) => {
  if (column.primary) return 'i-mdi-key'
  if (column.unique) return 'i-mdi-lock'
  return 'i-mdi-table-column'
}

const getTypeColor = (type: string) => {
  if (type.includes('INT')) return 'text-blue-600'
  if (type.includes('VARCHAR') || type.includes('TEXT')) return 'text-green-600'
  if (type.includes('TIMESTAMP') || type.includes('DATE')) return 'text-purple-600'
  return 'text-gray-600'
}
</script>

<template>
  <div class="h-full flex flex-col bg-white">
    <!-- Header -->
    <div class="p-4 border-b border-gray-200 bg-gray-50">
      <h2 class="text-lg font-semibold text-gray-900">Database Schema</h2>
      <p class="text-sm text-gray-600">View and explore database tables</p>
    </div>

    <!-- Tables List -->
    <div class="flex-1 overflow-y-auto p-4">
      <div v-for="table in tables" :key="table.name" class="mb-4">
        <div
          class="flex items-center gap-2 p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
          @click="toggleTable(table)"
        >
          <div
            class="i-mdi-chevron-right w-5 h-5 transition-transform"
            :class="{ 'rotate-90': table.expanded }"
          />
          <div class="i-mdi-table w-5 h-5 text-blue-600" />
          <span class="font-semibold text-gray-900">{{ table.name }}</span>
          <span class="text-sm text-gray-500 ml-auto">{{ table.columns.length }} columns</span>
        </div>

        <!-- Columns -->
        <div v-if="table.expanded" class="mt-2 ml-8">
          <div
            v-for="column in table.columns"
            :key="column.name"
            class="flex items-center gap-3 p-2 hover:bg-gray-50 rounded"
          >
            <div :class="[getColumnIcon(column), 'w-4 h-4 text-gray-400']" />
            <div class="flex-1">
              <div class="flex items-center gap-2">
                <span class="font-medium text-gray-900">{{ column.name }}</span>
                <span v-if="column.primary" class="px-2 py-0.5 bg-yellow-100 text-yellow-700 text-xs rounded">
                  PRIMARY
                </span>
                <span v-if="column.unique" class="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded">
                  UNIQUE
                </span>
              </div>
              <div class="flex items-center gap-2 mt-1">
                <span :class="['text-sm font-mono', getTypeColor(column.type)]">
                  {{ column.type }}
                </span>
                <span class="text-xs text-gray-500">
                  {{ column.nullable ? 'NULL' : 'NOT NULL' }}
                </span>
                <span v-if="column.default" class="text-xs text-gray-500">
                  DEFAULT: {{ column.default }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
