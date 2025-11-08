<script setup lang="ts">
import { useCanvas, type Tool } from '~/composables/useCanvas'

const {
  tool,
  color,
  fillColor,
  strokeWidth,
  zoom,
  undo,
  redo,
  deleteSelected,
  clear,
  exportToJSON,
  importFromJSON
} = useCanvas()

const tools: Array<{ id: Tool; label: string; icon: string }> = [
  { id: 'select', label: 'Select', icon: 'i-mdi-cursor-default' },
  { id: 'hand', label: 'Hand', icon: 'i-mdi-hand-back-right' },
  { id: 'pen', label: 'Pen', icon: 'i-mdi-pen' },
  { id: 'rectangle', label: 'Rectangle', icon: 'i-mdi-rectangle-outline' },
  { id: 'circle', label: 'Circle', icon: 'i-mdi-circle-outline' },
  { id: 'line', label: 'Line', icon: 'i-mdi-minus' },
  { id: 'text', label: 'Text', icon: 'i-mdi-format-text' },
  { id: 'eraser', label: 'Eraser', icon: 'i-mdi-eraser' }
]

const handleExport = () => {
  const json = exportToJSON()
  const blob = new Blob([json], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'canvas-export.json'
  a.click()
}

const handleImport = () => {
  const input = document.createElement('input')
  input.type = 'file'
  input.accept = '.json'
  input.onchange = (e) => {
    const file = (e.target as HTMLInputElement).files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const content = e.target?.result as string
        importFromJSON(content)
      }
      reader.readAsText(file)
    }
  }
  input.click()
}
</script>

<template>
  <div class="canvas-toolbar">
    <!-- Main Tools -->
    <div class="toolbar-section">
      <button
        v-for="t in tools"
        :key="t.id"
        :class="['tool-btn', tool === t.id && 'active']"
        :title="t.label"
        @click="tool = t.id"
      >
        <div :class="[t.icon, 'w-5 h-5']" />
      </button>
    </div>

    <div class="toolbar-divider" />

    <!-- Colors -->
    <div class="toolbar-section">
      <div class="color-picker">
        <label>Stroke</label>
        <input v-model="color" type="color" class="color-input" />
      </div>
      <div class="color-picker">
        <label>Fill</label>
        <input v-model="fillColor" type="color" class="color-input" />
      </div>
    </div>

    <div class="toolbar-divider" />

    <!-- Stroke Width -->
    <div class="toolbar-section">
      <label class="text-xs">Width</label>
      <input v-model.number="strokeWidth" type="range" min="1" max="20" class="stroke-slider" />
      <span class="text-xs">{{ strokeWidth }}px</span>
    </div>

    <div class="toolbar-divider" />

    <!-- History -->
    <div class="toolbar-section">
      <button class="tool-btn" title="Undo" @click="undo">
        <div class="i-mdi-undo w-5 h-5" />
      </button>
      <button class="tool-btn" title="Redo" @click="redo">
        <div class="i-mdi-redo w-5 h-5" />
      </button>
    </div>

    <div class="toolbar-divider" />

    <!-- Actions -->
    <div class="toolbar-section">
      <button class="tool-btn" title="Delete Selected" @click="deleteSelected">
        <div class="i-mdi-delete w-5 h-5" />
      </button>
      <button class="tool-btn" title="Clear All" @click="clear">
        <div class="i-mdi-delete-sweep w-5 h-5" />
      </button>
    </div>

    <div class="toolbar-divider" />

    <!-- Zoom -->
    <div class="toolbar-section">
      <button class="tool-btn" @click="zoom = Math.max(0.1, zoom - 0.1)">
        <div class="i-mdi-minus w-5 h-5" />
      </button>
      <span class="text-sm font-medium">{{ Math.round(zoom * 100) }}%</span>
      <button class="tool-btn" @click="zoom = Math.min(3, zoom + 0.1)">
        <div class="i-mdi-plus w-5 h-5" />
      </button>
    </div>

    <div class="toolbar-divider" />

    <!-- File -->
    <div class="toolbar-section">
      <button class="tool-btn" title="Export" @click="handleExport">
        <div class="i-mdi-download w-5 h-5" />
      </button>
      <button class="tool-btn" title="Import" @click="handleImport">
        <div class="i-mdi-upload w-5 h-5" />
      </button>
    </div>
  </div>
</template>

<style scoped>
.canvas-toolbar {
  @apply flex items-center gap-2 p-3 bg-white border-b border-gray-200 flex-wrap;
}

.toolbar-section {
  @apply flex items-center gap-2;
}

.toolbar-divider {
  @apply w-px h-8 bg-gray-300;
}

.tool-btn {
  @apply p-2 rounded hover:bg-gray-100 transition-colors;
}

.tool-btn.active {
  @apply bg-blue-100 text-blue-600;
}

.color-picker {
  @apply flex flex-col items-center gap-1;
}

.color-picker label {
  @apply text-xs text-gray-600;
}

.color-input {
  @apply w-8 h-8 rounded cursor-pointer;
}

.stroke-slider {
  @apply w-24;
}
</style>
