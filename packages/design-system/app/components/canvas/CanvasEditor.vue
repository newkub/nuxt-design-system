<script setup lang="ts">
const showSidebar = ref(true)
</script>

<template>
  <div class="canvas-editor">
    <CanvasToolbar />
    
    <div class="editor-content">
      <aside v-if="showSidebar" class="editor-sidebar">
        <h3 class="sidebar-title">Layers</h3>
        <div class="layers-list">
          <!-- Layers will be listed here -->
          <p class="text-sm text-gray-500">No layers yet</p>
        </div>
      </aside>

      <main class="editor-main">
        <DrawingCanvas />
      </main>

      <aside class="editor-properties">
        <h3 class="sidebar-title">Properties</h3>
        <div class="properties-content">
          <p class="text-sm text-gray-500">Select a shape to edit properties</p>
        </div>
      </aside>
    </div>
  </div>
</template>

<style scoped>
.canvas-editor {
  @apply h-screen flex flex-col bg-gray-50;
}

.editor-content {
  @apply flex-1 flex overflow-hidden;
}

.editor-sidebar {
  @apply w-64 bg-white border-r border-gray-200 p-4 overflow-y-auto;
}

.editor-main {
  @apply flex-1 p-4 overflow-auto flex items-center justify-center;
}

.editor-properties {
  @apply w-64 bg-white border-l border-gray-200 p-4 overflow-y-auto;
}

.sidebar-title {
  @apply font-semibold text-gray-900 mb-4;
}

.layers-list {
  @apply space-y-2;
}

.properties-content {
  @apply space-y-4;
}
</style>
