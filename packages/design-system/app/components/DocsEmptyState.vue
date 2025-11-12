<script setup lang="ts">
const handleGoHome = () => {
	navigateTo("/docs");
};
</script>

<template>
  <div class="flex flex-col items-center justify-center min-h-[60vh] p-8">
    <div class="text-center max-w-md space-y-6">
      <div class="relative inline-block">
        <div class="i-mdi-file-document-outline text-9xl text-gray-300" />
        <div class="absolute bottom-0 right-0 bg-orange-100 rounded-full p-3">
          <div class="i-mdi-help-circle text-3xl text-orange-500" />
        </div>
      </div>
      <div class="space-y-3">
        <h2 class="text-3xl font-bold text-gray-900">Document Not Found</h2>
        <p class="text-base text-gray-600 leading-relaxed">
          The document you're looking for doesn't exist. Please select a topic from the menu on the left.
        </p>
      </div>
      <button 
        class="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-all font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
        @click="handleGoHome"
      >
        <div class="i-mdi-home-outline text-lg" />
        <span>Go to Documentation Home</span>
      </button>
    </div>
  </div>
</template>
