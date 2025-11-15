<script setup lang="ts">
// This layout is designed to be simple and driven by slots.
// Responsiveness should be handled by the parent page or CSS media queries.
</script>

<template>
  <div class="flex flex-col h-screen bg-gray-50 text-gray-800">
    <header class="sticky top-0 z-50 flex-shrink-0 border-b border-gray-200 bg-white/80 backdrop-blur-sm">
      <div class="h-16 flex items-center justify-between px-4 border-b border-gray-200">
        <slot name="navbar-top-row" />
      </div>
      <div class="h-14 flex items-center px-4">
        <slot name="navbar-bottom-row" />
      </div>
    </header>

    <div class="flex flex-1 overflow-hidden">
      <!-- Left Sidebar -->
      <aside class="hidden md:flex md:flex-col w-72 lg:w-80 flex-shrink-0 border-r border-gray-200 bg-white">
        <div class="p-4">
          <slot name="left-header" />
        </div>
        <div class="flex-1 overflow-y-auto p-4">
          <slot name="left-body" />
        </div>
        <div class="p-4 border-t border-gray-200">
          <slot name="left-footer" />
        </div>
      </aside>

      <!-- Main Content -->
      <main class="flex-1 overflow-y-auto">
        <slot name="center" />
      </main>

      <!-- Right Sidebar -->
      <aside class="hidden lg:block w-72 xl:w-80 flex-shrink-0 border-l border-gray-200 p-4 overflow-y-auto">
        <slot name="right" />
      </aside>
    </div>
  </div>
</template>