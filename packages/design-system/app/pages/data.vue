<script setup lang="ts">
import { ref } from 'vue'
import type { Column } from '~/composables/useDataTable'

const selectedComponent = ref('advanced-table')

const components = [
  { id: 'advanced-table', name: 'Advanced Table', category: 'Tables', icon: 'i-mdi-table' },
  { id: 'tree', name: 'Tree View', category: 'Navigation', icon: 'i-mdi-file-tree' },
  { id: 'kanban', name: 'Kanban Board', category: 'Project', icon: 'i-mdi-view-column' },
  { id: 'pivot', name: 'Pivot Table', category: 'Tables', icon: 'i-mdi-table-pivot' },
  { id: 'calendar', name: 'Calendar', category: 'DateTime', icon: 'i-mdi-calendar' },
  { id: 'list', name: 'List View', category: 'Display', icon: 'i-mdi-format-list-bulleted' },
  { id: 'cards', name: 'Card Grid', category: 'Display', icon: 'i-mdi-view-grid' },
  { id: 'matrix', name: 'Matrix', category: 'Tables', icon: 'i-mdi-grid' },
  { id: 'comparison', name: 'Comparison', category: 'Analysis', icon: 'i-mdi-compare' },
  { id: 'gallery', name: 'Gallery', category: 'Media', icon: 'i-mdi-image-multiple' },
  { id: 'timeline', name: 'Timeline', category: 'Display', icon: 'i-mdi-timeline' },
  { id: 'statistics', name: 'Statistics', category: 'Metrics', icon: 'i-mdi-chart-box' },
  { id: 'activity', name: 'Activity Feed', category: 'Social', icon: 'i-mdi-history' },
  { id: 'profile', name: 'Profile', category: 'User', icon: 'i-mdi-account-box' },
  { id: 'notification', name: 'Notifications', category: 'Social', icon: 'i-mdi-bell' },
  { id: 'metrics', name: 'Metrics', category: 'Metrics', icon: 'i-mdi-gauge' },
  { id: 'invoice', name: 'Invoice', category: 'Business', icon: 'i-mdi-receipt' },
  { id: 'pricing', name: 'Pricing', category: 'Business', icon: 'i-mdi-currency-usd' },
  { id: 'testimonial', name: 'Testimonials', category: 'Marketing', icon: 'i-mdi-comment-quote' },
  { id: 'faq', name: 'FAQ', category: 'Support', icon: 'i-mdi-help-circle' }
]

const categories = [...new Set(components.map(c => c.category))]

// Sample data
const tableColumns: Column[] = [
  { key: 'id', label: 'ID', sortable: true, width: '80px' },
  { key: 'name', label: 'Name', sortable: true, filterable: true },
  { key: 'email', label: 'Email', sortable: true, filterable: true },
  { key: 'role', label: 'Role', sortable: true, filterable: true },
  { key: 'status', label: 'Status', sortable: true }
]

const tableData = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'Active' },
  { id: 3, name: 'Bob Wilson', email: 'bob@example.com', role: 'Manager', status: 'Inactive' }
]

const treeData = [
  {
    id: '1',
    label: 'Documents',
    icon: 'i-mdi-folder',
    children: [
      { id: '1-1', label: 'Work', icon: 'i-mdi-folder', children: [
        { id: '1-1-1', label: 'project.pdf', icon: 'i-mdi-file-pdf' }
      ]},
      { id: '1-2', label: 'Personal', icon: 'i-mdi-folder' }
    ]
  }
]

const kanbanColumns = [
  {
    id: 'todo',
    title: 'To Do',
    color: '#ef4444',
    cards: [
      { id: '1', title: 'Design homepage', priority: 'high' as const, assignee: 'John' }
    ]
  },
  {
    id: 'inprogress',
    title: 'In Progress',
    color: '#3b82f6',
    cards: [
      { id: '2', title: 'Implement API', priority: 'medium' as const, assignee: 'Jane' }
    ]
  }
]

const activities = [
  { id: '1', user: 'John Doe', action: 'created a new project', time: '2 minutes ago', icon: 'i-mdi-plus-circle' },
  { id: '2', user: 'Jane Smith', action: 'commented on', target: 'Design Review', time: '5 minutes ago', icon: 'i-mdi-comment' }
]

const stats = [
  { label: 'Total Revenue', value: '$45,231', change: 12.5, icon: 'i-mdi-currency-usd', color: 'text-green-600' },
  { label: 'Active Users', value: '2,543', change: 8.3, icon: 'i-mdi-account-group', color: 'text-blue-600' },
  { label: 'New Orders', value: '152', change: -3.2, icon: 'i-mdi-cart', color: 'text-purple-600' },
  { label: 'Conversion', value: '3.2%', change: 5.1, icon: 'i-mdi-chart-line', color: 'text-orange-600' }
]

const notifications = [
  { id: '1', title: 'New message', message: 'You have received a new message', time: '5 min ago', read: false, type: 'info' as const },
  { id: '2', title: 'Task completed', message: 'Your task has been completed', time: '10 min ago', read: true, type: 'success' as const }
]

const pricingPlans = [
  {
    id: 'basic',
    name: 'Basic',
    price: 9,
    period: 'month',
    features: ['5 Projects', '10 GB Storage', 'Email Support'],
    cta: 'Get Started'
  },
  {
    id: 'pro',
    name: 'Professional',
    price: 29,
    period: 'month',
    popular: true,
    features: ['Unlimited Projects', '100 GB Storage', 'Priority Support', 'Advanced Analytics'],
    cta: 'Start Free Trial'
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 99,
    period: 'month',
    features: ['Unlimited Everything', 'Dedicated Support', 'Custom Integrations', 'SLA'],
    cta: 'Contact Sales'
  }
]
</script>

<template>
  <div class="h-screen flex flex-col">
    <!-- Header -->
    <header class="bg-gray-900 text-white p-4">
      <div class="max-w-7xl mx-auto">
        <h1 class="text-2xl font-bold">Data Components Library</h1>
        <p class="text-gray-400">20 powerful data display components</p>
      </div>
    </header>

    <div class="flex-1 flex overflow-hidden">
      <!-- Sidebar -->
      <aside class="w-64 bg-gray-50 border-r overflow-y-auto">
        <nav class="p-2">
          <div v-for="category in categories" :key="category" class="mb-4">
            <h3 class="px-3 py-2 text-xs font-semibold text-gray-600 uppercase">{{ category }}</h3>
            <button
              v-for="component in components.filter(c => c.category === category)"
              :key="component.id"
              :class="[
                'w-full flex items-center gap-3 px-3 py-2 rounded text-left transition-colors',
                selectedComponent === component.id
                  ? 'bg-blue-600 text-white'
                  : 'hover:bg-gray-100 text-gray-700'
              ]"
              @click="selectedComponent = component.id"
            >
              <div :class="[component.icon, 'w-5 h-5']" />
              <span class="text-sm font-medium">{{ component.name }}</span>
            </button>
          </div>
        </nav>
      </aside>

      <!-- Content -->
      <main class="flex-1 overflow-y-auto p-8 bg-white">
        <div class="max-w-6xl mx-auto">
          <div class="mb-6">
            <h2 class="text-3xl font-bold text-gray-900 mb-2">
              {{ components.find(c => c.id === selectedComponent)?.name }}
            </h2>
            <p class="text-gray-600">Interactive data component with full functionality</p>
          </div>

          <div class="rounded-lg border border-gray-200 p-6 bg-gray-50">
            <!-- Components -->
            <AdvancedTable
              v-if="selectedComponent === 'advanced-table'"
              :columns="tableColumns"
              :data="tableData"
            />
            <DataTree v-else-if="selectedComponent === 'tree'" :data="treeData" />
            <DataKanban v-else-if="selectedComponent === 'kanban'" :columns="kanbanColumns" />
            <DataActivity v-else-if="selectedComponent === 'activity'" :activities="activities" />
            <DataStatistics v-else-if="selectedComponent === 'statistics'" :stats="stats" />
            <DataNotification v-else-if="selectedComponent === 'notification'" :notifications="notifications" />
            <DataPricing v-else-if="selectedComponent === 'pricing'" :plans="pricingPlans" />
            <div v-else class="text-center text-gray-500 py-12">
              Component preview coming soon...
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>
