<script setup lang="ts">
import { ref, computed } from 'vue'

interface ComponentDemo {
  name: string
  category: string
  props: Record<string, any>
  code: string
}

const components: ComponentDemo[] = [
  {
    name: 'Button',
    category: 'UI',
    props: { variant: 'default', size: 'default' },
    code: '<Button variant="default">Click me</Button>'
  },
  {
    name: 'Card',
    category: 'UI',
    props: {},
    code: '<Card><CardHeader><CardTitle>Title</CardTitle></CardHeader></Card>'
  },
  {
    name: 'Input',
    category: 'Form',
    props: { type: 'text', placeholder: 'Enter text...' },
    code: '<Input type="text" placeholder="Enter text..." />'
  }
]

const selectedComponent = ref(components[0])
const selectedVariant = ref('default')
const darkMode = ref(false)
const showCode = ref(false)

const categories = computed(() => {
  return [...new Set(components.map(c => c.category))]
})

const filteredComponents = computed(() => {
  return components
})
</script>

<template>
  <div class="h-full flex flex-col bg-white">
    <!-- Header -->
    <div class="p-4 border-b border-gray-200 bg-gray-50">
      <div class="flex items-center justify-between">
        <h2 class="text-lg font-semibold text-gray-900">Component Preview</h2>
        <div class="flex items-center gap-2">
          <label class="flex items-center gap-2 text-sm text-gray-700">
            <input
              v-model="darkMode"
              type="checkbox"
              class="w-4 h-4 rounded border-gray-300"
            />
            Dark Mode
          </label>
          <button
            :class="[
              'px-3 py-2 rounded text-sm',
              showCode ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
            ]"
            @click="showCode = !showCode"
          >
            {{ showCode ? 'Hide Code' : 'Show Code' }}
          </button>
        </div>
      </div>
    </div>

    <div class="flex-1 flex overflow-hidden">
      <!-- Component List -->
      <div class="w-64 border-r border-gray-200 overflow-y-auto">
        <div v-for="category in categories" :key="category" class="p-2">
          <h3 class="px-3 py-2 text-sm font-semibold text-gray-700">{{ category }}</h3>
          <div
            v-for="component in filteredComponents.filter(c => c.category === category)"
            :key="component.name"
            :class="[
              'px-3 py-2 text-sm cursor-pointer rounded transition-colors',
              selectedComponent.name === component.name
                ? 'bg-blue-50 text-blue-700 font-medium'
                : 'text-gray-700 hover:bg-gray-50'
            ]"
            @click="selectedComponent = component"
          >
            {{ component.name }}
          </div>
        </div>
      </div>

      <!-- Preview Area -->
      <div class="flex-1 flex flex-col">
        <div class="flex-1 overflow-y-auto">
          <div
            :class="[
              'min-h-full p-8 flex items-center justify-center',
              darkMode ? 'bg-gray-900' : 'bg-gray-50'
            ]"
          >
            <div class="text-center">
              <div class="mb-4">
                <component
                  :is="selectedComponent.name"
                  v-bind="selectedComponent.props"
                >
                  {{ selectedComponent.name }} Preview
                </component>
              </div>
              <p :class="darkMode ? 'text-gray-400' : 'text-gray-600'" class="text-sm">
                {{ selectedComponent.name }} Component
              </p>
            </div>
          </div>
        </div>

        <!-- Code Panel -->
        <div v-if="showCode" class="border-t border-gray-200 bg-gray-900 text-gray-100 p-4">
          <div class="flex items-center justify-between mb-2">
            <span class="text-sm font-medium">Component Code</span>
            <button
              class="text-xs text-gray-400 hover:text-white"
              @click="navigator.clipboard.writeText(selectedComponent.code)"
            >
              Copy
            </button>
          </div>
          <pre class="text-sm font-mono">{{ selectedComponent.code }}</pre>
        </div>
      </div>

      <!-- Props Panel -->
      <div class="w-80 border-l border-gray-200 p-4 overflow-y-auto bg-gray-50">
        <h3 class="font-semibold text-gray-900 mb-4">Props</h3>
        
        <div class="space-y-4">
          <div v-for="(value, key) in selectedComponent.props" :key="key">
            <label class="block text-sm font-medium text-gray-700 mb-1">
              {{ key }}
            </label>
            
            <input
              v-if="typeof value === 'string'"
              v-model="selectedComponent.props[key]"
              type="text"
              class="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none text-sm"
            />
            
            <input
              v-else-if="typeof value === 'number'"
              v-model.number="selectedComponent.props[key]"
              type="number"
              class="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none text-sm"
            />
            
            <input
              v-else-if="typeof value === 'boolean'"
              v-model="selectedComponent.props[key]"
              type="checkbox"
              class="w-4 h-4 rounded border-gray-300"
            />
          </div>
        </div>

        <div class="mt-6">
          <h4 class="font-semibold text-gray-900 mb-2">Documentation</h4>
          <p class="text-sm text-gray-600">
            This is a preview of the {{ selectedComponent.name }} component.
            Adjust the props above to see how they affect the component.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
