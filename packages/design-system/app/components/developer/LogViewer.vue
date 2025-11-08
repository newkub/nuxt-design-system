<script setup lang="ts">
import { ref, computed } from 'vue'

interface LogEntry {
  id: string
  timestamp: Date
  level: 'debug' | 'info' | 'warn' | 'error'
  message: string
  source?: string
  metadata?: Record<string, any>
}

const logs = ref<LogEntry[]>([
  { id: '1', timestamp: new Date(), level: 'info', message: 'Server started on port 3000', source: 'server.ts' },
  { id: '2', timestamp: new Date(), level: 'debug', message: 'Database connected successfully', source: 'database.ts' },
  { id: '3', timestamp: new Date(), level: 'warn', message: 'API response time exceeded 1000ms', source: 'api.ts', metadata: { duration: 1234 } },
  { id: '4', timestamp: new Date(), level: 'error', message: 'Failed to fetch user data', source: 'user.service.ts', metadata: { userId: 123, error: 'Network timeout' } }
])

const filterLevel = ref<'all' | LogEntry['level']>('all')
const searchQuery = ref('')
const autoScroll = ref(true)

const filteredLogs = computed(() => {
  let result = logs.value

  if (filterLevel.value !== 'all') {
    result = result.filter(log => log.level === filterLevel.value)
  }

  if (searchQuery.value) {
    result = result.filter(log =>
      log.message.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      log.source?.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  }

  return result
})

const getLevelColor = (level: LogEntry['level']) => {
  const colors = {
    debug: 'text-gray-600 bg-gray-100',
    info: 'text-blue-600 bg-blue-100',
    warn: 'text-yellow-600 bg-yellow-100',
    error: 'text-red-600 bg-red-100'
  }
  return colors[level]
}

const getLevelIcon = (level: LogEntry['level']) => {
  const icons = {
    debug: 'i-mdi-bug',
    info: 'i-mdi-information',
    warn: 'i-mdi-alert',
    error: 'i-mdi-alert-circle'
  }
  return icons[level]
}

const clearLogs = () => {
  logs.value = []
}

const exportLogs = () => {
  const content = logs.value
    .map(log => `[${log.timestamp.toISOString()}] [${log.level.toUpperCase()}] ${log.message}`)
    .join('\n')
  const blob = new Blob([content], { type: 'text/plain' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'logs.txt'
  a.click()
}

const addTestLog = () => {
  const levels: LogEntry['level'][] = ['debug', 'info', 'warn', 'error']
  const messages = [
    'Request processed successfully',
    'Cache miss, fetching from database',
    'Memory usage high',
    'Connection refused'
  ]
  
  logs.value.push({
    id: String(Date.now()),
    timestamp: new Date(),
    level: levels[Math.floor(Math.random() * levels.length)],
    message: messages[Math.floor(Math.random() * messages.length)],
    source: 'test.ts'
  })
}
</script>

<template>
  <div class="h-full flex flex-col bg-white">
    <!-- Toolbar -->
    <div class="p-3 border-b border-gray-200 bg-gray-50">
      <div class="flex items-center justify-between mb-3">
        <h2 class="text-lg font-semibold text-gray-900">Log Viewer</h2>
        <div class="flex items-center gap-2">
          <label class="flex items-center gap-2 text-sm text-gray-700">
            <input
              v-model="autoScroll"
              type="checkbox"
              class="w-4 h-4 rounded border-gray-300"
            />
            Auto-scroll
          </label>
          <button
            class="px-3 py-1.5 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 text-sm"
            @click="exportLogs"
          >
            Export
          </button>
          <button
            class="px-3 py-1.5 bg-red-100 text-red-700 rounded hover:bg-red-200 text-sm"
            @click="clearLogs"
          >
            Clear
          </button>
          <button
            class="px-3 py-1.5 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
            @click="addTestLog"
          >
            Add Log
          </button>
        </div>
      </div>

      <div class="flex items-center gap-2">
        <div class="flex items-center gap-1">
          <button
            v-for="level in ['all', 'debug', 'info', 'warn', 'error']"
            :key="level"
            :class="[
              'px-3 py-1 rounded text-xs font-medium transition-colors',
              filterLevel === level
                ? 'bg-blue-500 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            ]"
            @click="filterLevel = level as any"
          >
            {{ level.charAt(0).toUpperCase() + level.slice(1) }}
          </button>
        </div>

        <div class="relative flex-1">
          <div class="i-mdi-magnify absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search logs..."
            class="w-full pl-9 pr-3 py-1.5 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>
      </div>
    </div>

    <!-- Logs -->
    <div class="flex-1 overflow-y-auto font-mono text-sm">
      <div
        v-for="log in filteredLogs"
        :key="log.id"
        class="flex items-start gap-3 px-4 py-2 border-b border-gray-100 hover:bg-gray-50"
      >
        <div class="text-xs text-gray-500 whitespace-nowrap mt-0.5">
          {{ log.timestamp.toLocaleTimeString() }}
        </div>
        
        <span :class="['px-2 py-0.5 rounded text-xs font-medium whitespace-nowrap', getLevelColor(log.level)]">
          {{ log.level.toUpperCase() }}
        </span>
        
        <div class="flex-1">
          <div class="text-gray-900">{{ log.message }}</div>
          <div v-if="log.source" class="text-xs text-gray-500 mt-1">{{ log.source }}</div>
          <pre v-if="log.metadata" class="text-xs text-gray-600 mt-1">{{ JSON.stringify(log.metadata, null, 2) }}</pre>
        </div>
      </div>

      <div v-if="filteredLogs.length === 0" class="text-center text-gray-400 py-8">
        No logs to display
      </div>
    </div>
  </div>
</template>
