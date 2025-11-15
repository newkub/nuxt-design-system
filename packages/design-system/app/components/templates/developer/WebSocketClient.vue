<script setup lang="ts">
import { ref } from 'vue'

interface Message {
  id: string
  type: 'sent' | 'received' | 'system'
  content: string
  timestamp: Date
}

const url = ref('wss://echo.websocket.org')
const messages = ref<Message[]>([])
const messageInput = ref('')
const isConnected = ref(false)
const ws = ref<WebSocket | null>(null)

const connect = () => {
  try {
    ws.value = new WebSocket(url.value)
    
    ws.value.onopen = () => {
      isConnected.value = true
      addMessage('system', 'Connected to server')
    }
    
    ws.value.onmessage = (event) => {
      addMessage('received', event.data)
    }
    
    ws.value.onclose = () => {
      isConnected.value = false
      addMessage('system', 'Disconnected from server')
    }
    
    ws.value.onerror = () => {
      addMessage('system', 'Connection error')
    }
  } catch (error: any) {
    addMessage('system', `Error: ${error.message}`)
  }
}

const disconnect = () => {
  ws.value?.close()
}

const sendMessage = () => {
  if (!messageInput.value || !isConnected.value) return
  
  ws.value?.send(messageInput.value)
  addMessage('sent', messageInput.value)
  messageInput.value = ''
}

const addMessage = (type: Message['type'], content: string) => {
  messages.value.push({
    id: String(Date.now()),
    type,
    content,
    timestamp: new Date()
  })
}

const clearMessages = () => {
  messages.value = []
}
</script>

<template>
  <div class="h-full flex flex-col bg-white">
    <div class="p-4 border-b bg-gray-50">
      <h2 class="text-lg font-semibold mb-3">WebSocket Client</h2>
      <div class="flex gap-2">
        <input
          v-model="url"
          type="text"
          placeholder="wss://echo.websocket.org"
          class="flex-1 px-3 py-2 border rounded text-sm"
          :disabled="isConnected"
        />
        <button
          v-if="!isConnected"
          @click="connect"
          class="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Connect
        </button>
        <button
          v-else
          @click="disconnect"
          class="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Disconnect
        </button>
      </div>
    </div>

    <div class="flex-1 overflow-y-auto p-4 space-y-2">
      <div
        v-for="msg in messages"
        :key="msg.id"
        :class="[
          'p-3 rounded',
          msg.type === 'sent' ? 'bg-blue-50 ml-auto max-w-md' : 
          msg.type === 'received' ? 'bg-gray-50 mr-auto max-w-md' :
          'bg-yellow-50 text-center text-sm'
        ]"
      >
        <div class="text-xs text-gray-500 mb-1">{{ msg.timestamp.toLocaleTimeString() }}</div>
        <div>{{ msg.content }}</div>
      </div>
    </div>

    <div class="p-4 border-t">
      <div class="flex gap-2">
        <input
          v-model="messageInput"
          type="text"
          placeholder="Type a message..."
          class="flex-1 px-3 py-2 border rounded"
          :disabled="!isConnected"
          @keyup.enter="sendMessage"
        />
        <button
          @click="sendMessage"
          :disabled="!isConnected"
          class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
        >
          Send
        </button>
        <button
          @click="clearMessages"
          class="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
        >
          Clear
        </button>
      </div>
    </div>
  </div>
</template>
