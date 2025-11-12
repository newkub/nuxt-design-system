<template>
  <div class="flex flex-col h-full">
    <div class="flex-1 overflow-y-auto relative h-full">
      <!-- Show PluginDetails in the center area when a plugin is selected -->
      <PluginDetails
        v-if="selectedPlugin"
        :plugin="selectedPlugin"
        @close="closePluginDetails"
        class="h-full w-full"
      />
      <Codeblock
        v-else-if="activeTabs['main'] === 'editor'"
        :code="selectedFile?.content || ''"
        :language="selectedFile?.language || 'plaintext'"
        class="h-full w-full"
      />
      <Suspense>
        <template #default>
          <div class="h-full w-full">
            <Browser v-if="activeTabs['main'] === 'browser' && !selectedPlugin" class="h-full w-full" />
            <CodeSearch v-if="activeTabs['main'] === 'code-search' && !selectedPlugin" @select-file="handleSearchFileSelect" class="h-full w-full" />
            <Git v-if="activeTabs['main'] === 'git' && !selectedPlugin" class="h-full w-full" />
            <Console v-if="activeTabs['main'] === 'console' && !selectedPlugin" class="h-full w-full" />
            <Problems v-if="activeTabs['main'] === 'problems' && !selectedPlugin" class="h-full w-full" />
            <Tasks v-if="activeTabs['main'] === 'tasks' && !selectedPlugin" class="h-full w-full" />
          </div>
        </template>
        <template #fallback><div class="absolute inset-0 flex items-center justify-center h-full"><p>Loading tab...</p></div></template>
      </Suspense>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent } from "vue";
import Codeblock from "~/components/code/Codeblock.vue";
import PluginDetails from "~/components/code/PluginDetails.vue";

// Async components for better performance
const Browser = defineAsyncComponent(
	() => import("~/components/code/Browser.vue"),
);
const Console = defineAsyncComponent(
	() => import("~/components/code/Console.vue"),
);
const CodeSearch = defineAsyncComponent(
	() => import("~/components/code/CodeSearch.vue"),
);
const Problems = defineAsyncComponent(
	() => import("~/components/code/Problems.vue"),
);
const Tasks = defineAsyncComponent(() => import("~/components/code/Tasks.vue"));
const Git = defineAsyncComponent(() => import("~/components/code/Git.vue"));

// Define interfaces for better type safety
interface Plugin {
	name: string;
	publisher?: string;
	rating?: number;
	downloads?: number;
	readme?: string;
	version: string;
	category: string;
	logo: string;
	enabled: boolean;
	description: string;
}

interface CodeFile {
	content: string;
	language: string;
}

// Props
interface Props {
	activeTabs: Record<string, string>;
	selectedPlugin: Plugin | null;
	selectedFile: CodeFile | null;
}

const props = defineProps<Props>();

// Emits
const emit = defineEmits<{
	"close-plugin-details": [];
	"select-file": [file: CodeFile];
}>();

// Event handlers
const closePluginDetails = () => emit("close-plugin-details");
const handleSearchFileSelect = (file: CodeFile) => emit("select-file", file);
</script>
