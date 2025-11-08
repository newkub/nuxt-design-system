<script setup lang="ts">
import { ref, computed } from 'vue'

interface Header {
  key: string
  value: string
  enabled: boolean
}

const url = ref('https://jsonplaceholder.typicode.com/posts/1')
const method = ref('GET')
const headers = ref<Header[]>([
  { key: 'Content-Type', value: 'application/json', enabled: true }
])
const body = ref('{\n  "title": "foo",\n  "body": "bar"\n}')
const response = ref<any>(null)
const responseTime = ref(0)
const loading = ref(false)

const methods = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE']

const addHeader = () => {
  headers.value.push({ key: '', value: '', enabled: true })
}

const removeHeader = (index: number) => {
  headers.value.splice(index, 1)
}

const sendRequest = async () => {
  loading.value = true
  response.value = null
  
  const startTime = performance.now()
  
  try {
    const enabledHeaders = headers.value
      .filter(h => h.enabled && h.key)
      .reduce((acc, h) => ({ ...acc, [h.key]: h.value }), {})

    const options: RequestInit = {
      method: method.value,
      headers: enabledHeaders
    }

    if (method.value !== 'GET' && body.value) {
      options.body = body.value
    }

    const res = await fetch(url.value, options)
    const data = await res.json()
    
    responseTime.value = Math.round(performance.now() - startTime)
    
    response.value = {
      status: res.status,
      statusText: res.statusText,
      headers: Object.fromEntries(res.headers.entries()),
      data
    }
  } catch (error: any) {
    response.value = {
      error: error.message
    }
  } finally {
    loading.value = false
  }
}

const getStatusColor = (status: number) => {
  if (status >= 200 && status < 300) return 'text-green-600'
  if (status >= 300 && status < 400) return 'text-blue-600'
  if (status >= 400 && status < 500) return 'text-orange-600'
  return 'text-red-600'
}
</script>

<template>
  <div class="h-full flex flex-col bg-white">
    <!-- Header -->
    <div class="p-4 border-b border-gray-200">
      <h2 class="text-lg font-semibold text-gray-900">API Tester</h2>
    </div>

    <!-- Request Section -->
    <div class="flex-1 overflow-y-auto p-4">
      <!-- URL Bar -->
      <div class="flex gap-2 mb-4">
        <select
          v-model="method"
          class="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
        >
          <option v-for="m in methods" :key="m" :value="m">{{ m }}</option>
        </select>
        <input
          v-model="url"
          type="text"
          placeholder="https://api.example.com/endpoint"
          class="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
        />
        <button
          class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
          :disabled="loading"
          @click="sendRequest"
        >
          {{ loading ? 'Sending...' : 'Send' }}
        </button>
      </div>

      <!-- Headers -->
      <div class="mb-4">
        <div class="flex items-center justify-between mb-2">
          <h3 class="font-semibold text-gray-900">Headers</h3>
          <button
            class="text-sm text-blue-600 hover:text-blue-700"
            @click="addHeader"
          >
            + Add Header
          </button>
        </div>
        <div class="space-y-2">
          <div
            v-for="(header, index) in headers"
            :key="index"
            class="flex items-center gap-2"
          >
            <input
              type="checkbox"
              v-model="header.enabled"
              class="w-4 h-4 rounded border-gray-300"
            />
            <input
              v-model="header.key"
              type="text"
              placeholder="Key"
              class="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            />
            <input
              v-model="header.value"
              type="text"
              placeholder="Value"
              class="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            />
            <button
              class="p-2 text-red-600 hover:bg-red-50 rounded"
              @click="removeHeader(index)"
            >
              <div class="i-mdi-delete w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <!-- Body -->
      <div v-if="method !== 'GET'" class="mb-4">
        <h3 class="font-semibold text-gray-900 mb-2">Body</h3>
        <textarea
          v-model="body"
          class="w-full h-32 px-3 py-2 border border-gray-300 rounded-lg font-mono text-sm focus:ring-2 focus:ring-blue-500 outline-none resize-none"
          placeholder='{ "key": "value" }'
        />
      </div>

      <!-- Response -->
      <div v-if="response" class="mt-6">
        <div class="flex items-center justify-between mb-2">
          <h3 class="font-semibold text-gray-900">Response</h3>
          <div v-if="response.status" class="flex items-center gap-3">
            <span :class="['font-semibold', getStatusColor(response.status)]">
              {{ response.status }} {{ response.statusText }}
            </span>
            <span class="text-sm text-gray-600">{{ responseTime }}ms</span>
          </div>
        </div>
        <pre class="p-4 bg-gray-900 text-green-400 rounded-lg overflow-x-auto text-sm">{{ JSON.stringify(response.data || response, null, 2) }}</pre>
      </div>
    </div>
  </div>
</template>
