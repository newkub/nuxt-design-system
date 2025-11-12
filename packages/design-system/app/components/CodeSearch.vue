<script setup lang="ts">
import { computed, ref } from "vue";

interface SearchResult {
	file: string;
	line: number;
	code: string;
}

// Define emit for file selection
const emit = defineEmits<(e: "select-file", filePath: string) => void>();

const searchQuery = ref("");
const searchResults = ref<SearchResult[]>([]);
const isSearching = ref(false);
const hasSearched = ref(false);

const performSearch = () => {
	if (!searchQuery.value.trim()) return;

	isSearching.value = true;
	hasSearched.value = true;
	searchResults.value = [];

	// Simulate an API call for searching
	setTimeout(() => {
		// Mockup results based on the search query
		searchResults.value = [
			{
				code: `console.log('Searching for: ${searchQuery.value}');`,
				file: "src/index.ts",
				line: 10,
			},
			{
				code: `# Project README - Contains ${searchQuery.value}`,
				file: "README.md",
				line: 2,
			},
			{
				code: `"name": "wrikka-platform-with-${searchQuery.value}",`,
				file: "package.json",
				line: 5,
			},
		];
		isSearching.value = false;
	}, 1200);
};

const highlightedCode = (code: string) => {
	if (!searchQuery.value.trim()) return code;
	const regex = new RegExp(`(${searchQuery.value})`, "gi");
	return code.replace(regex, '<span class="bg-yellow-200 rounded">$1</span>');
};

// Function to handle clicking on a search result
const handleResultClick = (filePath: string) => {
	emit("select-file", filePath);
};
</script>

<template>
  <div class="h-full w-full relative bg-gray-50 text-gray-800">
    <div class="max-w-3xl mx-auto py-8 px-4">
      <h2 class="text-3xl font-bold text-center mb-2">Code Search</h2>
      <p class="text-center text-gray-500 mb-8">Find anything across your entire project.</p>
      
      <form @submit.prevent="performSearch" class="relative mb-8">
        <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <div class="i-mdi-magnify text-gray-400 w-5 h-5"></div>
        </div>
        <input 
          v-model="searchQuery" 
          type="text" 
          placeholder="Search for functions, variables, or keywords..."
          class="w-full bg-white border border-gray-300 rounded-lg py-3 pl-11 pr-4 text-lg focus:ring-2 focus:ring-primary-500 outline-none transition"
        />
      </form>

      <div v-if="isSearching" class="flex flex-col items-center justify-center text-gray-500 p-8">
        <div class="i-mdi-loading animate-spin text-4xl mb-4"></div>
        <p>Searching for "{{ searchQuery }}"...</p>
      </div>

      <div v-else-if="hasSearched && searchResults.length > 0" class="space-y-4">
        <p class="text-sm text-gray-500">Found {{ searchResults.length }} results for "<span class="font-semibold">{{ searchQuery }}</span>"</p>
        <div v-for="(result, index) in searchResults" :key="index" class="bg-white border border-gray-200 rounded-lg overflow-hidden hover:border-primary-500 transition cursor-pointer" @click="handleResultClick(result.file)">
          <div class="p-4">
            <div class="flex items-center gap-2 text-sm mb-2">
              <div class="i-mdi-file-outline text-gray-500"></div>
              <span class="font-semibold text-primary-600">{{ result.file }}</span>
              <span class="text-gray-400">:{{ result.line }}</span>
            </div>
            <pre class="bg-gray-100 p-3 rounded-md text-sm overflow-x-auto"><code v-html="highlightedCode(result.code)"></code></pre>
          </div>
        </div>
      </div>

      <div v-else-if="hasSearched" class="text-center text-gray-400 p-8 bg-white rounded-lg">
        <p>No results found for "{{ searchQuery }}".</p>
      </div>

      <div v-else class="text-center text-gray-400 p-8">
        <p>Start a search to find code across your project.</p>
      </div>
    </div>
  </div>
</template>