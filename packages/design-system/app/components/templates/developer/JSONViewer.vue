<script setup lang="ts">
import { ref, computed } from 'vue'

interface Props {
  data?: any
  expanded?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  data: () => ({}),
  expanded: true
})

const jsonInput = ref(JSON.stringify(props.data, null, 2))
const parsedData = ref<any>(props.data)
const error = ref('')
const searchQuery = ref('')

const parseJSON = () => {
  try {
    parsedData.value = JSON.parse(jsonInput.value)
    error.value = ''
  } catch (e: any) {
    error.value = e.message
  }
}

const formatJSON = () => {
  try {
    const parsed = JSON.parse(jsonInput.value)
    jsonInput.value = JSON.stringify(parsed, null, 2)
    error.value = ''
  } catch (e: any) {
    error.value = e.message
  }
}

const minifyJSON = () => {
  try {
    const parsed = JSON.parse(jsonInput.value)
    jsonInput.value = JSON.stringify(parsed)
    error.value = ''
  } catch (e: any) {
    error.value = e.message
  }
}

const copyJSON = () => {
  navigator.clipboard.writeText(jsonInput.value)
}

const filteredData = computed(() => {
  if (!searchQuery.value) return parsedData.value
  
  const search = (obj: any, query: string): any => {
    if (typeof obj !== 'object' || obj === null) return obj
    
    const result: any = Array.isArray(obj) ? [] : {}
    
    for (const key in obj) {
      if (key.toLowerCase().includes(query.toLowerCase())) {
        result[key] = obj[key]
      } else if (typeof obj[key] === 'object') {
        const nested = search(obj[key], query)
        if (nested && Object.keys(nested).length > 0) {
          result[key] = nested
        }
      } else if (String(obj[key]).toLowerCase().includes(query.toLowerCase())) {
        result[key] = obj[key]
      }
    }
    
    return result
  }
  
  return search(parsedData.value, searchQuery.value)
})
</script>

<template>
  <div class="h-full flex bg-white">
    <!-- Input Panel -->
    <div class="flex-1 flex flex-col border-r border-gray-200">
      <div class="p-3 border-b border-gray-200 bg-gray-50 flex items-center justify-between">
        <h3 class="font-semibold text-gray-900">JSON Input</h3>
        <div class="flex items-center gap-2">
          <button
            class="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
            @click="formatJSON"
          >
            Format
          </button>
          <button
            class="px-3 py-1 text-sm bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
            @click="minifyJSON"
          >
            Minify
          </button>
          <button
            class="p-1 text-gray-600 hover:bg-gray-200 rounded"
            @click="copyJSON"
          >
            <div class="i-mdi-content-copy w-4 h-4" />
          </button>
        </div>
      </div>
      
      <textarea
        v-model="jsonInput"
        class="flex-1 p-4 font-mono text-sm resize-none outline-none"
        placeholder='{ "key": "value" }'
        @input="parseJSON"
      />
      
      <div v-if="error" class="p-3 bg-red-50 border-t border-red-200 text-red-600 text-sm">
        {{ error }}
      </div>
    </div>

    <!-- Preview Panel -->
    <div class="flex-1 flex flex-col">
      <div class="p-3 border-b border-gray-200 bg-gray-50">
        <h3 class="font-semibold text-gray-900 mb-2">Formatted View</h3>
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search keys or values..."
          class="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 outline-none"
        />
      </div>
      
      <div class="flex-1 overflow-y-auto p-4">
        <JSONNode :data="filteredData" :name="'root'" :expanded="expanded" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export const JSONNode = {
  name: 'JSONNode',
  props: {
    data: { required: true },
    name: { type: String, required: true },
    expanded: { type: Boolean, default: false }
  },
  setup(props: any) {
    const isExpanded = ref(props.expanded)
    
    const isObject = computed(() => {
      return typeof props.data === 'object' && props.data !== null
    })
    
    const isArray = computed(() => {
      return Array.isArray(props.data)
    })
    
    const getValueType = (value: any) => {
      if (value === null) return 'null'
      if (Array.isArray(value)) return 'array'
      return typeof value
    }
    
    const getValueColor = (value: any) => {
      const type = getValueType(value)
      const colors: Record<string, string> = {
        string: 'text-green-600',
        number: 'text-blue-600',
        boolean: 'text-purple-600',
        null: 'text-gray-400'
      }
      return colors[type] || 'text-gray-900'
    }
    
    return { isExpanded, isObject, isArray, getValueType, getValueColor }
  },
  template: `
    <div class="json-node">
      <div class="flex items-start gap-2 py-1">
        <button
          v-if="isObject"
          class="p-0.5 hover:bg-gray-200 rounded"
          @click="isExpanded = !isExpanded"
        >
          <div
            class="i-mdi-chevron-right w-4 h-4 transition-transform"
            :class="{ 'rotate-90': isExpanded }"
          />
        </button>
        <div v-else class="w-5" />
        
        <div class="flex-1">
          <span class="font-medium text-blue-700">{{ name }}:</span>
          
          <span v-if="!isObject" :class="getValueColor(data)" class="ml-2">
            {{ typeof data === 'string' ? '"' + data + '"' : String(data) }}
          </span>
          
          <span v-else class="ml-2 text-gray-500">
            {{ isArray ? '[' + Object.keys(data).length + ']' : '{' + Object.keys(data).length + '}' }}
          </span>
        </div>
      </div>
      
      <div v-if="isObject && isExpanded" class="ml-6 border-l border-gray-200 pl-2">
        <JSONNode
          v-for="(value, key) in data"
          :key="key"
          :data="value"
          :name="String(key)"
          :expanded="false"
        />
      </div>
    </div>
  `
}
</script>
