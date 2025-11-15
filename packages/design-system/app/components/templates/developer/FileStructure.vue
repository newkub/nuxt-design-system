<script setup lang="ts">
import { ref } from "vue";
import type MenuContext from "~/components/ui/MenuContext.vue";
import type { MenuItem } from "~/shared/types/ui";
import Search from "~/components/ui/Search.vue";
import { useFileStructure } from "~/composables/useFileStructure";
import type { FileItem, SelectedFile } from "~/types/code";

const {
	internalSearchQuery,
	filteredFileStructure,
	getFileIcon,
	menuContextVisible,
	menuContextX,
	menuContextY,
	menuContextItems,
	showMenuContext,
	handleMenuContextItemClick,
	closeMenuContext,
} = useFileStructure();

// Context menu ref
const contextMenuRef = ref<InstanceType<typeof MenuContext> | null>(null);

// New state for file/folder creation
const creatingNewItem = ref(false);
const newItemType = ref<"file" | "folder">("file");
const newItemName = ref("");
const newItemParentPath = ref<string | null>(null);

interface Props {
	fileStructure: FileItem[];
	isLoading: boolean;
	error: string | null;
	selectedFilePath?: string | null;
}

interface Emits {
	(e: "select-file", file: FileItem): void;
	(e: "toggle-folder", folder: FileItem): void;
	(e: "file-structure-loaded", fileStructure: FileItem[]): void;
	(e: "new-file", parentPath?: string): void;
	(e: "new-folder", parentPath?: string): void;
	(e: "delete", item: FileItem): void;
	(e: "rename", item: FileItem): void;
	(e: "create-file", name: string, parentPath?: string): void;
	(e: "create-folder", name: string, parentPath?: string): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

function handleToggleFolder(folder: FileItem) {
	// Toggle the expanded state
	folder.expanded = !folder.expanded;
	emit("toggle-folder", folder);
}

function handleSelectFile(file: FileItem) {
	if (file.type === "file") {
		emit("select-file", file);
	}
}

// Handle context menu actions
function handleContextMenuAction(item: MenuItem) {
	// Check if it's a creation action
	if (item.action === "new-file" || item.action === "new-folder") {
		startCreatingNewItem(item.action === "new-folder" ? "folder" : "file");
		closeMenuContext();
		return;
	}

	handleMenuContextItemClick(item, emit, closeMenuContext);
}

// Show context menu for a file or folder (wrapper to adjust positioning)
function showContextMenu(event: MouseEvent, item: FileItem) {
	event.preventDefault();
	event.stopPropagation();

	// Call the composable function
	showMenuContext(event, item);

	// Adjust positioning to be slightly above the cursor
	menuContextY.value = menuContextY.value - 10;
}

// Start the creation process for a new file or folder
function startCreatingNewItem(type: "file" | "folder", parentPath?: string) {
	newItemType.value = type;
	newItemName.value = "";
	newItemParentPath.value = parentPath || null;
	creatingNewItem.value = true;

	// Focus the input after next render
	setTimeout(() => {
		const input = document.getElementById("new-item-name-input");
		if (input) {
			input.focus();
		}
	}, 0);
}

// Cancel the creation process
function cancelCreatingNewItem() {
	creatingNewItem.value = false;
	newItemName.value = "";
	newItemParentPath.value = null;
}

// Confirm the creation process
function confirmCreatingNewItem() {
	if (!newItemName.value.trim()) {
		cancelCreatingNewItem();
		return;
	}

	if (newItemType.value === "file") {
		emit(
			"create-file",
			newItemName.value.trim(),
			newItemParentPath.value || undefined,
		);
	} else {
		emit(
			"create-folder",
			newItemName.value.trim(),
			newItemParentPath.value || undefined,
		);
	}

	cancelCreatingNewItem();
}

// Handle Enter key in the input field
function handleInputKeydown(event: KeyboardEvent) {
	if (event.key === "Enter") {
		confirmCreatingNewItem();
	} else if (event.key === "Escape") {
		cancelCreatingNewItem();
	}
}

onMounted(() => {
	emit("file-structure-loaded", props.fileStructure);
});
</script>

<template>
  <div class="flex flex-col h-full">
    <!-- Header Slot -->
    <div class="p-2 border-b border-gray-200 flex-shrink-0">
      <slot name="header" />
    </div>

    <!-- Search -->
    <div class="p-2 flex-shrink-0">
      <Search 
        v-model="internalSearchQuery" 
        placeholder="Search files..." 
        size="sm"
        :autofocus="false"
      />
    </div>

    <!-- File Structure Content -->
    <div class="flex-1 overflow-y-auto p-2">
      <div v-if="props.isLoading" class="p-4 text-center text-gray-500">Loading...</div>
      <div v-else-if="props.error" class="p-4 text-center text-red-500">{{ props.error }}</div>
      <div v-else>
        <div class="px-2 mb-3">
          <div class="flex items-center justify-between mb-2">
            <div class="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              {{ internalSearchQuery ? 'Search Results' : 'Folders & Files' }}
            </div>
            <div class="flex items-center gap-1">
              <button
                type="button"
                class="p-1 rounded-md hover:bg-gray-200 text-gray-600 transition-colors"
                title="New File"
                @click="startCreatingNewItem('file')"
              >
                <div class="i-mdi-file-plus-outline w-4 h-4" />
              </button>
              <button
                type="button"
                class="p-1 rounded-md hover:bg-gray-200 text-gray-600 transition-colors"
                title="New Folder"
                @click="startCreatingNewItem('folder')"
              >
                <div class="i-mdi-folder-plus-outline w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <!-- File/Folder Tree -->
        <div v-if="filteredFileStructure(props.fileStructure).length === 0" class="px-2 py-8 text-center text-sm text-gray-500">
          {{ internalSearchQuery ? 'No files found' : 'No files' }}
        </div>
        
        <!-- New Item Input -->
        <div v-if="creatingNewItem" class="flex items-center p-1 mb-1">
          <div :class="[newItemType === 'folder' ? 'i-mdi-folder-outline' : 'i-mdi-file-outline', 'w-4 h-4 mr-2 flex-shrink-0 text-gray-500']" />
          <input
            id="new-item-name-input"
            v-model="newItemName"
            type="text"
            class="flex-1 bg-transparent border-b border-blue-500 focus:outline-none text-sm"
            placeholder="Enter name..."
            @keydown="handleInputKeydown"
            @blur="confirmCreatingNewItem"
          />
          <div class="flex gap-1 ml-2">
            <button 
              class="p-1 rounded hover:bg-gray-200 text-gray-500"
              @click="confirmCreatingNewItem"
            >
              <div class="i-mdi-check w-4 h-4" />
            </button>
            <button 
              class="p-1 rounded hover:bg-gray-200 text-gray-500"
              @click="cancelCreatingNewItem"
            >
              <div class="i-mdi-close w-4 h-4" />
            </button>
          </div>
        </div>
        
        <div v-for="item in filteredFileStructure(props.fileStructure)" :key="item.path" class="space-y-1">
          <!-- Folder -->
          <div v-if="item.type === 'folder'">
            <div 
              :class="['flex items-center p-1 rounded-md cursor-pointer group transition-colors', item.expanded ? 'bg-blue-50' : 'hover:bg-gray-100']"
              @click="handleToggleFolder(item)" 
              @contextmenu="showContextMenu($event, item)"
            >
              <div 
                :class="[getFileIcon(item.name, true, item.expanded), 'w-5 h-5 mr-2 flex-shrink-0 transition-transform']"
              />
              <span class="text-sm text-gray-700 flex-1 truncate">{{ item.name }}</span>
            </div>
            <div v-if="item.expanded && item.children" class="ml-4 pl-2 border-l border-gray-200 space-y-1 mt-1">
              <div 
                v-for="child in item.children" 
                :key="child.path" 
                :class="['flex items-center p-1 rounded-md cursor-pointer group transition-colors text-sm', props.selectedFilePath === child.path ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100 text-gray-600']"
                @click="handleSelectFile(child)" 
                @contextmenu="showContextMenu($event, child)"
              >
                <div :class="[getFileIcon(child.name), 'w-4 h-4 mr-2 flex-shrink-0']" />
                <span class="flex-1 truncate">{{ child.name }}</span>
              </div>
            </div>
          </div>
          <!-- File -->
          <div 
            v-else 
            :class="['flex items-center p-1 rounded-md cursor-pointer group transition-colors text-sm', props.selectedFilePath === item.path ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100 text-gray-600']"
            @click="handleSelectFile(item)" 
            @contextmenu="showContextMenu($event, item)"
          >
            <div :class="[getFileIcon(item.name), 'w-4 h-4 mr-2 flex-shrink-0']" />
            <span class="flex-1 truncate">{{ item.name }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Context Menu -->
    <MenuContext
      ref="contextMenuRef"
      v-model:show="menuContextVisible"
      :x="menuContextX"
      :y="menuContextY"
      :items="menuContextItems"
      @item-click="handleContextMenuAction"
      @close="closeMenuContext"
    />

    <!-- Bottom Slot -->
    <div class="border-t border-gray-200 flex-shrink-0">
      <slot name="bottom"></slot>
    </div>
  </div>
</template>
