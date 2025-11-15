<script setup lang="ts">
import { ref, computed } from 'vue'
import { useDeveloperTools, type NetworkRequest } from '~/composables/useDeveloperTools'

const { networkRequests, addNetworkRequest, clearNetwork, filteredNetworkRequests } = useDeveloperTools()

const filterMethod = ref<string>('all')
const searchQuery = ref('')
const selectedRequest = ref<NetworkRequest | null>(null)

const filteredRequests = computed(() => {
  let requests = filterMethod.value === 'all' 
    ? networkRequests.value 
    : filteredNetworkRequests(filterMethod.value)
  
  if (searchQuery.value) {
    requests = requests.filter(req => 
      req.url.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  }
  
  return requests
})

const getStatusColor = (status: number) => {
  if (status >= 200 && status < 300) return 'text-green-600'
  if (status >= 300 && status < 400) return 'text-blue-600'
  if (status >= 400 && status < 500) return 'text-orange-600'
  return 'text-red-600'
}

const getMethodColor = (method: string) => {
  const colors: Record<string, string> = {
    GET: 'bg-blue-100 text-blue-700',
    POST: 'bg-green-100 text-green-700',
    PUT: 'bg-yellow-100 text-yellow-700',
    DELETE: 'bg-red-100 text-red-700',
    PATCH: 'bg-purple-100 text-purple-700'
  }
  return colors[method] || 'bg-gray-100 text-gray-700'
}

// Test requests
const addTestRequests = () => {
  addNetworkRequest({
    method: 'GET',
    url: 'https://api.example.com/users',
    status: 200,
    statusText: 'OK',
    duration: 245,
    headers: { 'Content-Type': 'application/json' },
    response: { users: [] }
  })
  
  addNetworkRequest({
    method: 'POST',
    url: 'https://api.example.com/users',
    status: 201,
    statusText: 'Created',
    duration: 312,
    headers: { 'Content-Type': 'application/json' }
  })
  
  addNetworkRequest({
    method: 'GET',
    url: 'https://api.example.com/not-found',
    status: 404,
    statusText: 'Not Found',
    duration: 123,
    headers: {}
  })
}
</script>

<template>
  <div class="h-full flex bg-white">
    <!-- Request List -->
    <div class="flex-1 flex flex-col border-r border-gray-200">
      <!-- Toolbar -->
      <div class="flex items-center justify-between p-2 border-b border-gray-200 bg-gray-50">
        <div class="flex items-center gap-2">
          <button
            v-for="method in ['all', 'GET', 'POST', 'PUT', 'DELETE']"
            :key="method"
            :class="[
              'px-2 py-1 rounded text-xs font-medium transition-colors',
              filterMethod === method
                ? 'bg-blue-500 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            ]"
            @click="filterMethod = method"
          >
            {{ method }}
          </button>
        </div>

        <div class="flex items-center gap-2">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Filter..."
            class="px-2 py-1 border border-gray-300 rounded text-xs focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <button
            class="p-1 rounded hover:bg-gray-200 text-gray-600"
            title="Clear"
            @click="clearNetwork"
          >
            <div class="i-mdi-delete w-4 h-4" />
          </button>
          <button
            class="p-1 rounded hover:bg-gray-200 text-gray-600"
            title="Add test requests"
            @click="addTestRequests"
          >
            <div class="i-mdi-plus w-4 h-4" />
          </button>
        </div>
      </div>

      <!-- Request List -->
      <div class="flex-1 overflow-y-auto">
        <div
          v-for="request in filteredRequests"
          :key="request.id"
          class="flex items-center gap-2 p-2 hover:bg-gray-50 cursor-pointer border-b border-gray-100"
          :class="{ 'bg-blue-50': selectedRequest?.id === request.id }"
          @click="selectedRequest = request"
        >
          <span :class="['px-2 py-0.5 rounded text-xs font-medium', getMethodColor(request.method)]">
            {{ request.method }}
          </span>
          <span :class="['font-medium', getStatusColor(request.status)]">
            {{ request.status }}
          </span>
          <span class="flex-1 text-sm truncate text-gray-700">{{ request.url }}</span>
          <span class="text-xs text-gray-500">{{ request.duration }}ms</span>
        </div>

        <div v-if="filteredRequests.length === 0" class="text-center text-gray-400 py-8">
          No network requests
        </div>
      </div>
    </div>

    <!-- Request Details -->
    <div class="w-1/3 flex flex-col bg-gray-50">
      <div v-if="selectedRequest" class="flex-1 overflow-y-auto p-4">
        <h3 class="font-semibold text-lg mb-4">Request Details</h3>
        
        <div class="mb-4">
          <div class="text-sm font-medium text-gray-700 mb-1">URL</div>
          <div class="text-sm text-gray-900 break-all bg-white p-2 rounded border">
            {{ selectedRequest.url }}
          </div>
        </div>

        <div class="mb-4">
          <div class="text-sm font-medium text-gray-700 mb-1">Method</div>
          <span :class="['px-2 py-1 rounded text-xs font-medium', getMethodColor(selectedRequest.method)]">
            {{ selectedRequest.method }}
          </span>
        </div>

        <div class="mb-4">
          <div class="text-sm font-medium text-gray-700 mb-1">Status</div>
          <div :class="['font-medium', getStatusColor(selectedRequest.status)]">
            {{ selectedRequest.status }} {{ selectedRequest.statusText }}
          </div>
        </div>

        <div class="mb-4">
          <div class="text-sm font-medium text-gray-700 mb-1">Duration</div>
          <div class="text-sm text-gray-900">{{ selectedRequest.duration }}ms</div>
        </div>

        <div class="mb-4">
          <div class="text-sm font-medium text-gray-700 mb-1">Headers</div>
          <pre class="text-xs bg-white p-2 rounded border overflow-x-auto">{{ JSON.stringify(selectedRequest.headers, null, 2) }}</pre>
        </div>

        <div v-if="selectedRequest.response" class="mb-4">
          <div class="text-sm font-medium text-gray-700 mb-1">Response</div>
          <pre class="text-xs bg-white p-2 rounded border overflow-x-auto">{{ JSON.stringify(selectedRequest.response, null, 2) }}</pre>
        </div>
      </div>

      <div v-else class="flex-1 flex items-center justify-center text-gray-400">
        Select a request to view details
      </div>
    </div>
  </div>
</template>
