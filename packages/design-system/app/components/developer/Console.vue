<script setup lang="ts">
import { ref, computed } from 'vue'
import { useDeveloperTools, type ConsoleMessage } from '~/composables/useDeveloperTools'

const { consoleMessages, addConsoleMessage, clearConsole, filteredConsoleMessages } = useDeveloperTools()

const filterType = ref<ConsoleMessage['type'] | 'all'>('all')
const searchQuery = ref('')

const filteredMessages = computed(() => {
  let messages = filterType.value === 'all' 
    ? consoleMessages.value 
    : filteredConsoleMessages(filterType.value as ConsoleMessage['type'])
  
  if (searchQuery.value) {
    messages = messages.filter(msg => 
      msg.message.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  }
  
  return messages
})

const getMessageIcon = (type: ConsoleMessage['type']) => {
  const icons = {
    log: 'i-mdi-information',
    error: 'i-mdi-alert-circle',
    warn: 'i-mdi-alert',
    info: 'i-mdi-information-outline'
  }
  return icons[type]
}

const getMessageColor = (type: ConsoleMessage['type']) => {
  const colors = {
    log: 'text-gray-700',
    error: 'text-red-600',
    warn: 'text-yellow-600',
    info: 'text-blue-600'
  }
  return colors[type]
}

// Test messages
const addTestMessages = () => {
  addConsoleMessage('log', 'Application started successfully')
  addConsoleMessage('info', 'Loading user data...')
  addConsoleMessage('warn', 'API response time is slow (>1000ms)')
  addConsoleMessage('error', 'Failed to connect to database', 'Error stack trace...')
}
</script>

<template>
  <div class="h-full flex flex-col bg-white">
    <!-- Toolbar -->
    <div class="flex items-center justify-between p-2 border-b border-gray-200 bg-gray-50">
      <div class="flex items-center gap-2">
        <button
          v-for="type in ['all', 'log', 'error', 'warn', 'info']"
          :key="type"
          :class="[
            'px-3 py-1 rounded text-sm font-medium transition-colors',
            filterType === type
              ? 'bg-blue-500 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-100'
          ]"
          @click="filterType = type as any"
        >
          {{ type.charAt(0).toUpperCase() + type.slice(1) }}
        </button>
      </div>

      <div class="flex items-center gap-2">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Filter..."
          class="px-3 py-1 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
        />
        <button
          class="p-1.5 rounded hover:bg-gray-200 text-gray-600"
          title="Clear console"
          @click="clearConsole"
        >
          <div class="i-mdi-delete w-5 h-5" />
        </button>
        <button
          class="p-1.5 rounded hover:bg-gray-200 text-gray-600"
          title="Add test messages"
          @click="addTestMessages"
        >
          <div class="i-mdi-plus w-5 h-5" />
        </button>
      </div>
    </div>

    <!-- Console Messages -->
    <div class="flex-1 overflow-y-auto p-2 font-mono text-sm">
      <div
        v-for="message in filteredMessages"
        :key="message.id"
        class="flex items-start gap-2 py-1 px-2 hover:bg-gray-50 rounded"
      >
        <div :class="[getMessageIcon(message.type), getMessageColor(message.type), 'w-4 h-4 mt-0.5']" />
        <div class="flex-1 min-w-0">
          <div :class="getMessageColor(message.type)">{{ message.message }}</div>
          <div v-if="message.stack" class="text-xs text-gray-500 mt-1">{{ message.stack }}</div>
        </div>
        <div class="text-xs text-gray-400 whitespace-nowrap">
          {{ message.timestamp.toLocaleTimeString() }}
        </div>
      </div>
      
      <div v-if="filteredMessages.length === 0" class="text-center text-gray-400 py-8">
        No console messages
      </div>
    </div>
  </div>
</template>
