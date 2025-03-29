<script setup lang="ts">
// Components page
import type { DefineComponent } from 'vue'
import { defineAsyncComponent, ref } from 'vue'

interface ComponentInfo {
  name: string
  component: DefineComponent
  path: string
  componentProps?: Record<string, any>
}

const componentsList = ref<ComponentInfo[]>([])

const modules = import.meta.glob<DefineComponent>('~/components/ui/*.vue')

for (const path in modules) {
  const componentName = path.split('/').pop()?.replace(/\.\w+$/, '') || ''
  if (componentName) {
    const componentProps = componentName === 'Select' ? {
      options: [
        { value: '1', label: 'Option 1' },
        { value: '2', label: 'Option 2' }
      ]
    } : undefined

    componentsList.value.push({
      name: componentName,
      component: defineAsyncComponent(() => 
        modules[path]().then((module) => module.default)
      ),
      path,
      componentProps
    })
  }
}

definePageMeta({
  layout: 'default'
})
</script>

<template>
  <div class="components-page container mx-auto p-4 md:p-6 lg:p-8">
    <h1 class="text-2xl font-bold mb-6">Components</h1>
    
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div v-for="item in componentsList" :key="item.name" class="component-card p-4 border rounded-lg">
        <h2 class="text-lg font-semibold mb-2">{{ item.name }}</h2>
        <div class="component-preview bg-gray-50 p-4 rounded mb-2">
          <component :is="item.component" v-bind="item.componentProps" />
        </div>
        <div class="text-sm text-gray-500">{{ item.path }}</div>
      </div>
    </div>
  </div>
</template>
