<script setup lang="ts">
import { ref, computed } from 'vue'

interface EnvVariable {
  key: string
  value: string
  masked: boolean
  description?: string
}

const variables = ref<EnvVariable[]>([
  { key: 'NODE_ENV', value: 'development', masked: false, description: 'Application environment' },
  { key: 'API_KEY', value: 'sk_test_1234567890abcdef', masked: true, description: 'API authentication key' },
  { key: 'DATABASE_URL', value: 'postgresql://localhost:5432/mydb', masked: true, description: 'Database connection string' },
  { key: 'PORT', value: '3000', masked: false, description: 'Server port number' },
  { key: 'SECRET_KEY', value: 'super_secret_key_xyz', masked: true, description: 'Application secret key' }
])

const searchQuery = ref('')
const showMasked = ref(false)

const filteredVariables = computed(() => {
  if (!searchQuery.value) return variables.value
  return variables.value.filter(v =>
    v.key.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    v.description?.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

const toggleMask = (variable: EnvVariable) => {
  variable.masked = !variable.masked
}

const copyValue = (value: string) => {
  navigator.clipboard.writeText(value)
}

const addVariable = () => {
  variables.value.push({
    key: 'NEW_VAR',
    value: '',
    masked: false
  })
}

const deleteVariable = (index: number) => {
  variables.value.splice(index, 1)
}

const exportEnv = () => {
  const content = variables.value
    .map(v => `${v.key}=${v.value}`)
    .join('\n')
  const blob = new Blob([content], { type: 'text/plain' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = '.env'
  a.click()
}
</script>

<template>
  <div class="h-full flex flex-col bg-white">
    <!-- Header -->
    <div class="p-4 border-b border-gray-200 bg-gray-50">
      <div class="flex items-center justify-between mb-3">
        <h2 class="text-lg font-semibold text-gray-900">Environment Variables</h2>
        <div class="flex items-center gap-2">
          <button
            class="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
            @click="addVariable"
          >
            + Add Variable
          </button>
          <button
            class="px-3 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 text-sm"
            @click="exportEnv"
          >
            Export .env
          </button>
        </div>
      </div>

      <div class="flex items-center gap-2">
        <div class="relative flex-1">
          <div class="i-mdi-magnify absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search variables..."
            class="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>
        
        <label class="flex items-center gap-2 text-sm text-gray-700">
          <input
            v-model="showMasked"
            type="checkbox"
            class="w-4 h-4 rounded border-gray-300"
          />
          Show masked values
        </label>
      </div>
    </div>

    <!-- Variables List -->
    <div class="flex-1 overflow-y-auto">
      <div
        v-for="(variable, index) in filteredVariables"
        :key="variable.key"
        class="p-4 border-b border-gray-100 hover:bg-gray-50"
      >
        <div class="flex items-start gap-4">
          <div class="flex-1 grid grid-cols-2 gap-4">
            <div>
              <label class="text-xs font-medium text-gray-600 mb-1 block">Key</label>
              <input
                v-model="variable.key"
                type="text"
                class="w-full px-3 py-2 border border-gray-300 rounded font-mono text-sm focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            
            <div>
              <label class="text-xs font-medium text-gray-600 mb-1 block">Value</label>
              <div class="relative">
                <input
                  v-model="variable.value"
                  :type="variable.masked && !showMasked ? 'password' : 'text'"
                  class="w-full px-3 py-2 pr-20 border border-gray-300 rounded font-mono text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                />
                <div class="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                  <button
                    class="p-1 hover:bg-gray-200 rounded"
                    @click="toggleMask(variable)"
                  >
                    <div :class="[variable.masked ? 'i-mdi-eye-off' : 'i-mdi-eye', 'w-4 h-4 text-gray-500']" />
                  </button>
                  <button
                    class="p-1 hover:bg-gray-200 rounded"
                    @click="copyValue(variable.value)"
                  >
                    <div class="i-mdi-content-copy w-4 h-4 text-gray-500" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <button
            class="mt-6 p-2 text-red-600 hover:bg-red-50 rounded"
            @click="deleteVariable(index)"
          >
            <div class="i-mdi-delete w-5 h-5" />
          </button>
        </div>

        <div v-if="variable.description" class="mt-2 text-sm text-gray-600">
          {{ variable.description }}
        </div>
      </div>

      <div v-if="filteredVariables.length === 0" class="text-center text-gray-400 py-8">
        No environment variables
      </div>
    </div>
  </div>
</template>
