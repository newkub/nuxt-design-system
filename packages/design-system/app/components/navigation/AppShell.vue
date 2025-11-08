<script setup lang="ts">
const props = withDefaults(defineProps<{
  showNavbar?: boolean
  showSidebar?: boolean
  showFooter?: boolean
  sidebarOpen?: boolean
}>(), {
  showNavbar: true,
  showSidebar: true,
  showFooter: true,
  sidebarOpen: true
})

const emit = defineEmits<{
  'update:sidebarOpen': [value: boolean]
}>()
</script>

<template>
  <div class="app-shell">
    <header v-if="showNavbar" class="app-navbar">
      <slot name="navbar" />
    </header>
    
    <div class="app-container">
      <aside 
        v-if="showSidebar" 
        :class="['app-sidebar', { open: sidebarOpen }]"
      >
        <slot name="sidebar" />
      </aside>
      
      <main class="app-main">
        <slot />
      </main>
    </div>
    
    <footer v-if="showFooter" class="app-footer">
      <slot name="footer" />
    </footer>
  </div>
</template>

<style scoped>
.app-shell {
  @apply min-h-screen flex flex-col;
}

.app-navbar {
  @apply sticky top-0 z-30 bg-white border-b border-gray-200;
}

.app-container {
  @apply flex-1 flex;
}

.app-sidebar {
  @apply w-64 bg-white border-r border-gray-200 transition-all duration-300;
}

.app-sidebar:not(.open) {
  @apply w-0 overflow-hidden;
}

.app-main {
  @apply flex-1 p-6 bg-gray-50;
}

.app-footer {
  @apply bg-white border-t border-gray-200 p-6;
}
</style>
