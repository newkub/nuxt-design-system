<script setup lang="ts">
import { ref, computed } from 'vue'

const queryType = ref<'select' | 'insert' | 'update' | 'delete'>('select')
const selectedTable = ref('users')
const selectedColumns = ref<string[]>(['*'])
const whereConditions = ref<Array<{ column: string; operator: string; value: string }>>([])
const limit = ref(10)
const offset = ref(0)

const tables = ['users', 'posts', 'comments', 'categories']
const columns: Record<string, string[]> = {
  users: ['id', 'email', 'name', 'created_at'],
  posts: ['id', 'user_id', 'title', 'content', 'created_at'],
  comments: ['id', 'post_id', 'user_id', 'text', 'created_at'],
  categories: ['id', 'name', 'slug']
}
const operators = ['=', '!=', '>', '<', '>=', '<=', 'LIKE', 'IN']

const generatedSQL = computed(() => {
  let sql = ''

  if (queryType.value === 'select') {
    const cols = selectedColumns.value.includes('*') ? '*' : selectedColumns.value.join(', ')
    sql = `SELECT ${cols}\nFROM ${selectedTable.value}`
    
    if (whereConditions.value.length > 0) {
      const conditions = whereConditions.value
        .map(c => `${c.column} ${c.operator} '${c.value}'`)
        .join(' AND ')
      sql += `\nWHERE ${conditions}`
    }
    
    if (limit.value > 0) {
      sql += `\nLIMIT ${limit.value}`
    }
    
    if (offset.value > 0) {
      sql += `\nOFFSET ${offset.value}`
    }
  }

  return `${sql};`
})

const addCondition = () => {
  whereConditions.value.push({ column: columns[selectedTable.value][0], operator: '=', value: '' })
}

const removeCondition = (index: number) => {
  whereConditions.value.splice(index, 1)
}

const executeQuery = () => {
  console.log('Executing query:', generatedSQL.value)
}

const copySQL = () => {
  navigator.clipboard.writeText(generatedSQL.value)
}
</script>

<template>
  <div class="h-full flex flex-col bg-white">
    <!-- Header -->
    <div class="p-4 border-b border-gray-200 bg-gray-50">
      <h2 class="text-lg font-semibold text-gray-900">SQL Query Builder</h2>
    </div>

    <div class="flex-1 flex overflow-hidden">
      <!-- Builder Panel -->
      <div class="flex-1 overflow-y-auto p-4 border-r border-gray-200">
        <!-- Query Type -->
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 mb-2">Query Type</label>
          <div class="flex gap-2">
            <button
              v-for="type in ['select', 'insert', 'update', 'delete']"
              :key="type"
              :class="[
                'px-4 py-2 rounded text-sm font-medium transition-colors',
                queryType === type
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              ]"
              @click="queryType = type as any"
            >
              {{ type.toUpperCase() }}
            </button>
          </div>
        </div>

        <!-- Table Selection -->
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 mb-2">Table</label>
          <select
            v-model="selectedTable"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          >
            <option v-for="table in tables" :key="table" :value="table">
              {{ table }}
            </option>
          </select>
        </div>

        <!-- Column Selection (for SELECT) -->
        <div v-if="queryType === 'select'" class="mb-4">
          <label class="block text-sm font-medium text-gray-700 mb-2">Columns</label>
          <div class="space-y-2">
            <label v-for="col in ['*', ...columns[selectedTable]]" :key="col" class="flex items-center gap-2">
              <input
                type="checkbox"
                :value="col"
                v-model="selectedColumns"
                class="w-4 h-4 rounded border-gray-300"
              />
              <span class="text-sm text-gray-700">{{ col }}</span>
            </label>
          </div>
        </div>

        <!-- WHERE Conditions -->
        <div class="mb-4">
          <div class="flex items-center justify-between mb-2">
            <label class="text-sm font-medium text-gray-700">WHERE Conditions</label>
            <button
              class="text-sm text-blue-600 hover:text-blue-700"
              @click="addCondition"
            >
              + Add Condition
            </button>
          </div>
          
          <div class="space-y-2">
            <div
              v-for="(condition, index) in whereConditions"
              :key="index"
              class="flex items-center gap-2"
            >
              <select
                v-model="condition.column"
                class="flex-1 px-3 py-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option v-for="col in columns[selectedTable]" :key="col" :value="col">
                  {{ col }}
                </option>
              </select>
              
              <select
                v-model="condition.operator"
                class="px-3 py-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option v-for="op in operators" :key="op" :value="op">
                  {{ op }}
                </option>
              </select>
              
              <input
                v-model="condition.value"
                type="text"
                placeholder="Value"
                class="flex-1 px-3 py-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 outline-none"
              />
              
              <button
                class="p-2 text-red-600 hover:bg-red-50 rounded"
                @click="removeCondition(index)"
              >
                <div class="i-mdi-delete w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <!-- Limit & Offset -->
        <div v-if="queryType === 'select'" class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Limit</label>
            <input
              v-model.number="limit"
              type="number"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Offset</label>
            <input
              v-model.number="offset"
              type="number"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
        </div>
      </div>

      <!-- Generated SQL Panel -->
      <div class="w-1/2 flex flex-col bg-gray-50">
        <div class="p-3 border-b border-gray-200 bg-gray-100 flex items-center justify-between">
          <h3 class="font-semibold text-gray-900">Generated SQL</h3>
          <div class="flex items-center gap-2">
            <button
              class="p-2 text-gray-600 hover:bg-gray-200 rounded"
              title="Copy SQL"
              @click="copySQL"
            >
              <div class="i-mdi-content-copy w-4 h-4" />
            </button>
            <button
              class="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 text-sm"
              @click="executeQuery"
            >
              Execute
            </button>
          </div>
        </div>
        
        <div class="flex-1 overflow-y-auto">
          <pre class="p-4 font-mono text-sm text-gray-900 whitespace-pre-wrap">{{ generatedSQL }}</pre>
        </div>
      </div>
    </div>
  </div>
</template>
