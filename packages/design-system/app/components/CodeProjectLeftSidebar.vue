<template>
  <div class="flex flex-col h-full w-full">
    <div class="flex-1 overflow-y-auto relative h-full">
      <FileStructure
        v-show="activeTabs['left-sidebar'] === 'files'"
        class="w-full h-full"
        :file-structure="fileStructure"
        :selected-file-path="selectedFile?.path"
        :is-loading="isLoading"
        :error="error"
        @select-file="selectFile"
        @toggle-folder="handleToggleFolder"
        @new-file="handleNewFile"
        @new-folder="handleNewFolder"
        @delete="handleDelete"
        @rename="handleRename"
      >
        <template #header>
          <MenuDropdown>
            <MenuDropdownTrigger class="w-full">
              <div class="flex items-center gap-2 p-2 rounded-md hover:bg-gray-200 w-full text-left">
                <div class="i-mdi-github text-xl"></div>
                <span class="font-semibold flex-1 truncate">{{ currentRepo.owner }} / {{ currentRepo.name }}</span>
                <div class="i-mdi-chevron-down transition-transform"></div>
              </div>
            </MenuDropdownTrigger>
            <MenuDropdownContent class="w-full bg-white">
              <MenuDropdownItem
                v-for="repo in repos"
                :key="`${repo.owner}/${repo.name}`"
                @click="selectRepo(repo)"
                class="w-full text-left px-3 py-2 hover:bg-gray-100"
              >
                {{ repo.owner }} / {{ repo.name }}
              </MenuDropdownItem>
            </MenuDropdownContent>
          </MenuDropdown>
        </template>
      </FileStructure>
      <Plugins
        v-show="activeTabs['left-sidebar'] === 'plugins'"
        class="w-full h-full"
        @select-plugin="handleSelectPlugin"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import Plugins from "~/components/code/Plugins.vue";
import FileStructure from "~/components/ui/FileStructure.vue";
import {
	MenuDropdown,
	MenuDropdownContent,
	MenuDropdownItem,
	MenuDropdownTrigger,
} from "~/components/ui/MenuDropdown.vue";

// Props
interface Props {
	activeTabs: Record<string, string>;
	fileStructure: unknown;
	selectedFile: unknown;
	isLoading: boolean;
	error: string | null;
	currentRepo: unknown;
	repos: unknown[];
}

const props = defineProps<Props>();

// Emits
const emit = defineEmits<{
	"select-file": [file: unknown];
	"toggle-folder": [path: string];
	"new-file": [path: string];
	"new-folder": [path: string];
	delete: [path: string];
	rename: [oldPath: string, newPath: string];
	"select-repo": [repo: unknown];
	"select-plugin": [plugin: unknown];
}>();

// Event handlers
const selectFile = (file: unknown) => emit("select-file", file);
const handleToggleFolder = (path: string) => emit("toggle-folder", path);
const handleNewFile = (path: string) => emit("new-file", path);
const handleNewFolder = (path: string) => emit("new-folder", path);
const handleDelete = (path: string) => emit("delete", path);
const handleRename = (oldPath: string, newPath: string) =>
	emit("rename", oldPath, newPath);
const selectRepo = (repo: unknown) => emit("select-repo", repo);
const handleSelectPlugin = (plugin: unknown) => emit("select-plugin", plugin);
</script>
