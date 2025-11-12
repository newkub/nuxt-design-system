<script setup lang="ts">
interface Props {
	message: string;
}

defineProps<Props>();

const handleBackToDocs = () => {
	navigateTo("/docs");
};
</script>

<template>
  <div class="flex flex-col items-center justify-center min-h-[70vh] p-4 text-center">
    <div class="max-w-md w-full">
      <div class="i-mdi-file-question-outline text-8xl text-primary/30 mx-auto mb-6"></div>
      <h1 class="text-4xl font-bold text-gray-800 mb-2">Document Not Found</h1>
      <p class="text-lg text-gray-600 mb-8">
        We couldn't find the page you were looking for. It might have been moved or deleted.
      </p>
      
      <div class="bg-gray-100 p-4 rounded-lg mb-8">
        <p class="text-sm text-gray-700">Error details: <code class="text-sm bg-red-100 text-red-700 px-1.5 py-1 rounded">{{ message }}</code></p>
      </div>

      <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
        <button 
          class="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium w-full sm:w-auto"
          @click="handleBackToDocs"
        >
          <div class="i-mdi-home-outline text-lg" />
          <span>Go to Homepage</span>
        </button>
        <p class="text-gray-500 text-sm">or</p>
        <button 
          class="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors font-medium w-full sm:w-auto"
          @click="() => { /* Implement search focus */ }"
        >
          <div class="i-mdi-magnify text-lg" />
          <span>Search Docs</span>
        </button>
      </div>
    </div>
  </div>
</template>
