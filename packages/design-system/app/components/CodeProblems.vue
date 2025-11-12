<script setup lang="ts">
import { computed, ref } from "vue";

interface Problem {
	severity: "error" | "warning" | "info";
	message: string;
	file: string;
	line: number;
	column: number;
}

const problems = ref<Problem[]>([
	{
		column: 9,
		file: "src/index.ts",
		line: 12,
		message:
			"Property 'logg' does not exist on type 'Console'. Did you mean 'log'?",
		severity: "error",
	},
	{
		column: 7,
		file: "src/index.ts",
		line: 15,
		message: "'myVar' is assigned a value but never used.",
		severity: "warning",
	},
	{
		column: 1,
		file: "app/pages/code/index.vue",
		line: 5,
		message: "Cannot find name 'React'.",
		severity: "error",
	},
]);

const groupedProblems = computed(() => {
	const groups: Record<string, Problem[]> = {};
	for (const problem of problems.value) {
		if (!groups[problem.file]) {
			groups[problem.file] = [];
		}
		groups[problem.file]?.push(problem);
	}
	return groups;
});

const expandedFiles = ref<Record<string, boolean>>({
	"app/pages/code/index.vue": true,
	"src/index.ts": true,
});

const toggleFile = (file: string) => {
	expandedFiles.value[file] = !expandedFiles.value[file];
};

const getSeverityIcon = (severity: Problem["severity"]) => {
	switch (severity) {
		case "error":
			return "i-mdi-close-circle-outline text-red-500";
		case "warning":
			return "i-mdi-alert-outline text-yellow-500";
		case "info":
			return "i-mdi-information-outline text-blue-500";
	}
};
</script>

<template>
  <div class="h-full w-full relative bg-gray-50 text-gray-800 flex flex-col">
    <header class="flex-shrink-0 flex items-center justify-between p-3 border-b border-gray-200">
      <h2 class="text-xl font-bold flex items-center gap-2">
        <div class="i-mdi-alert-circle-outline text-2xl"></div>
        <span>Problems</span>
      </h2>
      <div class="text-sm text-gray-500">
        <span>{{ problems.length }} Problems in {{ Object.keys(groupedProblems).length }} Files</span>
      </div>
    </header>

    <div class="flex-1 overflow-y-auto p-2">
      <div v-if="problems.length === 0" class="text-center text-gray-500 pt-8">
        <p>No problems have been detected in the workspace.</p>
      </div>
      <div v-else v-for="(fileProblems, fileName) in groupedProblems" :key="fileName">
        <div @click="toggleFile(fileName)" class="flex items-center p-2 rounded-md hover:bg-gray-200 cursor-pointer">
          <div :class="expandedFiles[fileName] ? 'i-mdi-chevron-down' : 'i-mdi-chevron-right'" class="w-5 h-5 mr-1 text-gray-500"></div>
          <span class="font-semibold flex-1 truncate">{{ fileName }}</span>
          <span class="text-xs bg-gray-200 px-2 py-0.5 rounded-full">{{ fileProblems.length }}</span>
        </div>
        <div v-if="expandedFiles[fileName]" class="pl-6 border-l-2 border-gray-200 ml-2">
          <div v-for="(problem, index) in fileProblems" :key="index" class="flex items-start py-2">
            <div :class="getSeverityIcon(problem.severity)" class="w-5 h-5 mr-2 mt-0.5"></div>
            <div class="flex-1">
              <p class="text-sm">{{ problem.message }}</p>
              <p class="text-xs text-gray-500">line {{ problem.line }}, col {{ problem.column }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>