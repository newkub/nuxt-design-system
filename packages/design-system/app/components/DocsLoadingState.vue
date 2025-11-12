<script setup lang="ts">
</script>

<template>
  <div class="flex flex-col items-center justify-center min-h-[60vh] px-4">
    <div class="relative">
      <div class="i-mdi-book-open-page-variant-outline text-7xl text-primary/20 mb-8" />
      <div class="absolute inset-0 flex items-center justify-center">
        <div class="i-mdi-loading text-3xl animate-spin text-primary" />
      </div>
    </div>
    <div class="text-center space-y-2">
      <p class="text-xl font-semibold text-gray-900">Loading documentation...</p>
      <p class="text-sm text-gray-500">Please wait while we fetch the content</p>
    </div>
  </div>
</template>
