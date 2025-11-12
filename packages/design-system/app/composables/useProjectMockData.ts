import type { FileItem } from "~/types/code";
import { mockFileContents } from "./useProjectFileManagement";

/**
 * Composable for mock project data and initial loading
 * Handles loading initial project structure and mock file contents
 */
export function useProjectMockData() {
	const loadFullProject = () => {
		return new Promise<{
			fileStructure: FileItem[];
			mockContents: Record<string, { language: string; content: string }>;
		}>((resolve) => {
			// Simulate a network delay
			setTimeout(() => {
				const initialFileStructure: FileItem[] = [
					{
						icon: "i-mdi-file-outline",
						name: "package.json",
						path: "package.json",
						sha: "2",
						type: "file",
					},
					{
						icon: "i-mdi-file-outline",
						name: "README.md",
						path: "README.md",
						sha: "3",
						type: "file",
					},
					{
						children: [
							{
								icon: "i-mdi-language-typescript",
								name: "index.ts",
								path: "src/index.ts",
								sha: "5",
								type: "file",
							},
							{
								children: [
									{
										icon: "i-mdi-vuejs",
										name: "Button.vue",
										path: "src/components/Button.vue",
										sha: "7",
										type: "file",
									},
								],
								icon: "i-mdi-folder-outline",
								name: "components",
								path: "src/components",
								sha: "6",
								type: "folder",
							},
						],
						expanded: true,
						icon: "i-mdi-folder",
						name: "src",
						path: "src",
						sha: "4",
						type: "folder",
					},
				];

				const initialMockContents = {
					"package.json": {
						content: JSON.stringify(
							{
								dependencies: {
									vue: "^3.3.0",
								},
								devDependencies: {
									typescript: "^5.0.0",
									vite: "^4.0.0",
								},
								name: "my-project",
								scripts: {
									build: "tsc",
									dev: "vite",
									preview: "vite preview",
								},
								version: "1.0.0",
							},
							null,
							2,
						),
						language: "json",
					},
					"README.md": {
						content: `# My Awesome Project

This is the README for a really cool project.

## Features

- Feature 1
- Feature 2
- Feature 3

## Installation

\`\`\`bash
npm install
\`\`\`

## Usage

\`\`\`typescript
import { myFunction } from './src';

myFunction();
\`\`\`
`,
						language: "markdown",
					},
					"src/components/Button.vue": {
						content: `<template>
  <button
    :class="[
      'px-4 py-2 rounded-lg font-medium transition-colors',
      variant === 'primary'
        ? 'bg-blue-600 text-white hover:bg-blue-700'
        : 'bg-gray-200 text-gray-900 hover:bg-gray-300'
    ]"
    @click="$emit('click')"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
interface Props {
  variant?: 'primary' | 'secondary'
}

defineProps<Props>();
defineEmits<{
  click: []
}>();
</script>`,
						language: "vue",
					},
					"src/index.ts": {
						content: `import { createApp } from 'vue';
import App from './App.vue';

const app = createApp(App);
app.mount('#app');

export function helloWorld() {
  console.log('Hello, World!');
}
`,
						language: "typescript",
					},
				};

				// Set the mock file contents
				Object.assign(mockFileContents.value, initialMockContents);

				resolve({
					fileStructure: initialFileStructure,
					mockContents: initialMockContents,
				});
			}, 1500); // 1.5 second delay
		});
	};

	return {
		loadFullProject,
	};
}
