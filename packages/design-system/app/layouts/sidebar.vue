<template>
  <div class="flex flex-row h-screen bg-gray-100">
    <!-- Sidebar -->
    <div class="w-1/4 flex-shrink-0 border-r border-gray-200 p-2 overflow-y-auto">
      <slot name="left" />
    </div>

    <!-- Main Content -->
    <div class="flex-1 overflow-y-auto">
      <slot name="right">
        <NuxtPage />
      </slot>
    </div>
  </div>
</template>