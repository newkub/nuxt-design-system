<script setup lang="ts">
const emit = defineEmits(["create"]);
</script>

<template>
  <header class="flex items-center justify-between mb-8">
    <h1 class="text-3xl font-bold text-gray-800">My Notes</h1>
    <button
      class="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      @click="emit('create')"
    >
      <div class="i-mdi-plus w-5 h-5" />
      <span>Create Note</span>
    </button>
  </header>
</template>
