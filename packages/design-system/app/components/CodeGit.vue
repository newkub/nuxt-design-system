<script setup lang="ts">
import { ref } from "vue";

const stagedFiles = ref([
	{ name: "src/index.ts", status: "Modified" },
	{ name: "package.json", status: "Modified" },
]);

const unstagedFiles = ref([
	{ name: "README.md", status: "Modified" },
	{ name: "app/pages/code/index.vue", status: "Untracked" },
]);

const commitHistory = ref([
	{
		author: "AI Assistant",
		date: "2 hours ago",
		message: "feat: Add Git integration tab",
		sha: "a1b2c3d",
	},
	{
		author: "Developer",
		date: "1 day ago",
		message: "fix: Improve CodeSearch UI",
		sha: "e4f5g6h",
	},
	{
		author: "Developer",
		date: "2 days ago",
		message: "refactor: Update layout components",
		sha: "i7j8k9l",
	},
]);

const commitMessage = ref("");
</script>

<template>
  <div class="h-full w-full relative bg-gray-50 text-gray-800 flex flex-col">
    
    <header class="flex-shrink-0 flex items-center justify-between p-3 border-b border-gray-200">
      <h2 class="text-xl font-bold flex items-center gap-2">
        <div class="i-mdi-git text-2xl"></div>
        <span>Git Control</span>
      </h2>
      <div class="flex items-center gap-2">
        <button class="px-3 py-1.5 text-sm bg-gray-200 rounded-md hover:bg-gray-300">Pull</button>
        <button class="px-3 py-1.5 text-sm bg-gray-200 rounded-md hover:bg-gray-300">Push</button>
        <button class="px-3 py-1.5 text-sm bg-primary-600 text-white rounded-md hover:bg-primary-700">Commit</button>
      </div>
    </header>

    <div class="flex-1 flex flex-col lg:flex-row overflow-y-auto">
      
      <!-- Left Panel: Changes & Commit -->
      <div class="w-full lg:w-1/3 border-b lg:border-b-0 lg:border-r border-gray-200 p-4 flex flex-col">
        <div class="mb-4">
          <textarea 
            v-model="commitMessage"
            placeholder="Commit message..."
            rows="3"
            class="w-full bg-white border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-primary-500 outline-none text-sm"
          ></textarea>
        </div>

        <div class="flex-1 overflow-y-auto">
          <h3 class="text-sm font-semibold uppercase text-gray-500 mb-2">Staged Changes ({{ stagedFiles.length }})</h3>
          <div class="space-y-1 mb-4">
            <div v-for="file in stagedFiles" :key="file.name" class="flex items-center justify-between p-2 bg-green-50 rounded-md text-sm">
              <span>{{ file.name }}</span>
              <span class="text-green-600">{{ file.status }}</span>
            </div>
          </div>

          <h3 class="text-sm font-semibold uppercase text-gray-500 mb-2">Changes ({{ unstagedFiles.length }})</h3>
          <div class="space-y-1">
            <div v-for="file in unstagedFiles" :key="file.name" class="flex items-center justify-between p-2 bg-yellow-50 rounded-md text-sm">
              <span>{{ file.name }}</span>
              <span class="text-yellow-600">{{ file.status }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Panel: Commit History -->
      <div class="w-full lg:w-2/3 p-4 overflow-y-auto">
        <h3 class="text-lg font-bold mb-4">Commit History</h3>
        <div class="space-y-3">
          <div v-for="commit in commitHistory" :key="commit.sha" class="bg-white p-3 rounded-lg border border-gray-200">
            <p class="font-semibold">{{ commit.message }}</p>
            <div class="flex items-center justify-between text-xs text-gray-500 mt-1">
              <span>{{ commit.author }} committed {{ commit.date }}</span>
              <span class="font-mono">{{ commit.sha }}</span>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>