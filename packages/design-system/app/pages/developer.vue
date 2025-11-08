<script setup lang="ts">
import { ref } from 'vue'

const components = [
  { id: 'browser', name: 'Browser', description: 'Web browser with responsive preview', icon: 'i-mdi-web' },
  { id: 'terminal', name: 'Terminal', description: 'Interactive command line interface', icon: 'i-mdi-console' },
  { id: 'file-explorer', name: 'File Explorer', description: 'File system navigator', icon: 'i-mdi-folder' },
  { id: 'console', name: 'Console', description: 'Debug console with log filtering', icon: 'i-mdi-console-line' },
  { id: 'code-editor', name: 'Code Editor', description: 'Syntax highlighting code editor', icon: 'i-mdi-code-tags' },
  { id: 'network', name: 'Network Monitor', description: 'Network request inspector', icon: 'i-mdi-network' },
  { id: 'database', name: 'Database Schema', description: 'Database structure viewer', icon: 'i-mdi-database' },
  { id: 'api-tester', name: 'API Tester', description: 'REST API testing tool', icon: 'i-mdi-api' },
  { id: 'json-viewer', name: 'JSON Viewer', description: 'JSON formatter and viewer', icon: 'i-mdi-code-json' },
  { id: 'git', name: 'Git Viewer', description: 'Git commit history', icon: 'i-mdi-git' },
  { id: 'performance', name: 'Performance Monitor', description: 'Real-time performance metrics', icon: 'i-mdi-speedometer' },
  { id: 'package', name: 'Package Manager', description: 'NPM package manager', icon: 'i-mdi-package' },
  { id: 'env', name: 'Environment Variables', description: 'Manage environment variables', icon: 'i-mdi-cog' },
  { id: 'logs', name: 'Log Viewer', description: 'Application log viewer', icon: 'i-mdi-text-box' },
  { id: 'query', name: 'Query Builder', description: 'SQL query builder', icon: 'i-mdi-database-search' },
  { id: 'preview', name: 'Component Preview', description: 'Component showcase', icon: 'i-mdi-view-dashboard' },
  { id: 'test', name: 'Test Runner', description: 'Unit test runner', icon: 'i-mdi-test-tube' },
  { id: 'regex', name: 'Regex Tester', description: 'Regular expression tester', icon: 'i-mdi-regex' },
  { id: 'color', name: 'Color Picker', description: 'Color palette generator', icon: 'i-mdi-palette' },
  { id: 'markdown', name: 'Markdown Editor', description: 'Live markdown editor', icon: 'i-mdi-markdown' },
  { id: 'websocket', name: 'WebSocket Client', description: 'WebSocket testing tool', icon: 'i-mdi-lan-connect' }
]

const selectedComponent = ref('browser')
const codeContent = ref('// Write your code here')
</script>

<template>
  <div class="h-screen flex flex-col">
    <header class="bg-gray-900 text-white p-4">
      <div class="max-w-7xl mx-auto">
        <h1 class="text-2xl font-bold">Developer Tools</h1>
        <p class="text-gray-400">Component library for developer tools and utilities</p>
      </div>
    </header>

    <div class="flex-1 flex overflow-hidden">
      <!-- Sidebar -->
      <aside class="w-64 bg-gray-50 border-r overflow-y-auto">
        <nav class="p-2">
          <button
            v-for="component in components"
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
            <div class="flex-1 min-w-0">
              <div class="font-medium truncate">{{ component.name }}</div>
            </div>
          </button>
        </nav>
      </aside>

      <!-- Content -->
      <main class="flex-1 overflow-hidden">
        <div class="h-full">
          <DeveloperBrowser v-if="selectedComponent === 'browser'" />
          <DeveloperTerminal v-else-if="selectedComponent === 'terminal'" />
          <DeveloperFileExplorer v-else-if="selectedComponent === 'file-explorer'" />
          <DeveloperConsole v-else-if="selectedComponent === 'console'" />
          <DeveloperCodeEditor v-else-if="selectedComponent === 'code-editor'" v-model="codeContent" />
          <DeveloperNetworkMonitor v-else-if="selectedComponent === 'network'" />
          <DeveloperDatabaseSchema v-else-if="selectedComponent === 'database'" />
          <DeveloperAPITester v-else-if="selectedComponent === 'api-tester'" />
          <DeveloperJSONViewer v-else-if="selectedComponent === 'json-viewer'" />
          <DeveloperGitViewer v-else-if="selectedComponent === 'git'" />
          <DeveloperPerformanceMonitor v-else-if="selectedComponent === 'performance'" />
          <DeveloperPackageManager v-else-if="selectedComponent === 'package'" />
          <DeveloperEnvViewer v-else-if="selectedComponent === 'env'" />
          <DeveloperLogViewer v-else-if="selectedComponent === 'logs'" />
          <DeveloperQueryBuilder v-else-if="selectedComponent === 'query'" />
          <DeveloperComponentPreview v-else-if="selectedComponent === 'preview'" />
          <DeveloperTestRunner v-else-if="selectedComponent === 'test'" />
          <DeveloperRegexTester v-else-if="selectedComponent === 'regex'" />
          <DeveloperColorPicker v-else-if="selectedComponent === 'color'" />
          <DeveloperMarkdownEditor v-else-if="selectedComponent === 'markdown'" />
          <DeveloperWebSocketClient v-else-if="selectedComponent === 'websocket'" />
        </div>
      </main>
    </div>
  </div>
</template>
