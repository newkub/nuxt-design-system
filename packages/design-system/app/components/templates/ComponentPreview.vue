<script setup lang="ts">
import { ref, onMounted } from 'vue'

const props = defineProps<{
  fileName: string
}>()

const component = ref<any>(null)
const loading = ref(true)
const error = ref<string | null>(null)
const componentInfo = ref<any>(null)

// Function to extract component interface information
const extractComponentInfo = async (componentModule: any) => {
  try {
    // Get the component definition
    const comp = componentModule.default || componentModule
    
    // Extract props information if available
    const propsInfo: any[] = []
    if (comp.props) {
      // Handle array of prop names
      if (Array.isArray(comp.props)) {
        comp.props.forEach((propName: string) => {
          propsInfo.push({
            name: propName,
            type: 'any',
            required: false,
            default: undefined
          })
        })
      } 
      // Handle object with prop definitions
      else if (typeof comp.props === 'object') {
        Object.keys(comp.props).forEach(propName => {
          const propDef = comp.props[propName]
          propsInfo.push({
            name: propName,
            type: propDef.type ? (Array.isArray(propDef.type) ? propDef.type.map((t: any) => t.name || t).join(' | ') : propDef.type.name || propDef.type) : 'any',
            required: propDef.required || false,
            default: propDef.default
          })
        })
      }
    }
    
    // Extract emits information if available
    const emitsInfo: string[] = []
    if (comp.emits) {
      if (Array.isArray(comp.emits)) {
        emitsInfo.push(...comp.emits)
      } else if (typeof comp.emits === 'object') {
        emitsInfo.push(...Object.keys(comp.emits))
      }
    }
    
    // Extract slots information if available
    const slotsInfo: string[] = []
    if (comp.slots) {
      if (Array.isArray(comp.slots)) {
        slotsInfo.push(...comp.slots)
      } else if (typeof comp.slots === 'object') {
        slotsInfo.push(...Object.keys(comp.slots))
      }
    }
    
    return {
      props: propsInfo,
      emits: emitsInfo,
      slots: slotsInfo
    }
  } catch (err) {
    console.error('Error extracting component info:', err)
    return null
  }
}

onMounted(async () => {
  try {
    console.log('ComponentPreview requested for:', props.fileName)
    
    // Skip if trying to load ComponentPreview.vue itself
    if (props.fileName === 'ComponentPreview.vue') {
      error.value = 'Cannot preview ComponentPreview component'
      loading.value = false
      return
    }
    
    // Import all components dynamically
    const modules = import.meta.glob('./*.vue')
    console.log('Available modules:', Object.keys(modules))
    
    // The fileName from the API includes the .vue extension
    const path = `./${props.fileName}`
    console.log('Trying to load component from path:', path)
    
    if (modules[path]) {
      const module: any = await modules[path]()
      component.value = module.default || module
      
      // Extract component interface information
      componentInfo.value = await extractComponentInfo(module)
    } else {
      error.value = `Component not found: ${props.fileName}`
    }
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Failed to load component'
    console.error('Error loading component:', err)
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div class="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-white dark:bg-gray-900">
    <div class="text-xs text-gray-500 dark:text-gray-400 mb-2">Preview:</div>
    <div class="min-h-16 flex items-center justify-center">
      <div v-if="loading" class="text-gray-500 dark:text-gray-400">
        Loading...
      </div>
      <div v-else-if="error" class="text-red-500 dark:text-red-400 text-sm">
        {{ error }}
      </div>
      <component 
        :is="component" 
        v-else-if="component"
        class="w-full max-w-full max-h-32 overflow-hidden"
      />
      <div v-else class="text-gray-500 dark:text-gray-400 text-sm">
        Preview not available
      </div>
    </div>
    
    <!-- Component interface information -->
    <div v-if="componentInfo" class="mt-4">
      <!-- Props table -->
      <div v-if="componentInfo.props && componentInfo.props.length > 0" class="mb-3">
        <h4 class="text-sm font-medium text-gray-900 dark:text-white mb-2">Props</h4>
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead class="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th class="px-3 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Name</th>
                <th class="px-3 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Type</th>
                <th class="px-3 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Required</th>
                <th class="px-3 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Default</th>
              </tr>
            </thead>
            <tbody class="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
              <tr v-for="prop in componentInfo.props" :key="prop.name">
                <td class="px-3 py-2 text-sm text-gray-900 dark:text-white font-mono">{{ prop.name }}</td>
                <td class="px-3 py-2 text-sm text-gray-500 dark:text-gray-400 font-mono">{{ prop.type }}</td>
                <td class="px-3 py-2 text-sm">
                  <span v-if="prop.required" class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100">
                    Yes
                  </span>
                  <span v-else class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                    No
                  </span>
                </td>
                <td class="px-3 py-2 text-sm text-gray-500 dark:text-gray-400 font-mono">
                  {{ prop.default !== undefined ? JSON.stringify(prop.default) : '-' }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      
      <!-- Emits -->
      <div v-if="componentInfo.emits && componentInfo.emits.length > 0" class="mb-3">
        <h4 class="text-sm font-medium text-gray-900 dark:text-white mb-2">Emits</h4>
        <div class="flex flex-wrap gap-2">
          <span 
            v-for="emit in componentInfo.emits" 
            :key="emit"
            class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100"
          >
            {{ emit }}
          </span>
        </div>
      </div>
      
      <!-- Slots -->
      <div v-if="componentInfo.slots && componentInfo.slots.length > 0">
        <h4 class="text-sm font-medium text-gray-900 dark:text-white mb-2">Slots</h4>
        <div class="flex flex-wrap gap-2">
          <span 
            v-for="slot in componentInfo.slots" 
            :key="slot"
            class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100"
          >
            {{ slot }}
          </span>
        </div>
      </div>
    </div>
    
    <!-- File information -->
    <div class="mt-3 pt-3 border-t border-gray-100 dark:border-gray-800 flex flex-wrap gap-2">
      <div class="text-xs text-gray-500 dark:text-gray-400">
        File: {{ fileName }}
      </div>
    </div>
  </div>
</template>