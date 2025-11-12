import type { MenuItem } from "~/shared/types/ui";
import type { FileItem } from "~/types/code";

const { getFileIcon } = useFileIcons();

export function useFileStructure() {
	// Internal search query
	const internalSearchQuery = ref("");

	// Menu context state
	const menuContextVisible = ref(false);
	const menuContextX = ref(0);
	const menuContextY = ref(0);
	const menuContextItems = ref<MenuItem[]>([]);
	const menuContextTarget = ref<FileItem | null>(null);

	// New state for file/folder creation
	const creatingNewItem = ref(false);
	const newItemType = ref<"file" | "folder">("file");
	const newItemName = ref("");
	const newItemParentPath = ref<string | null>(null);

	// Sort function for file/folder structure (folders first, then files, both sorted alphabetically)
	const sortFileStructure = (items: FileItem[]): FileItem[] => {
		return [...items]
			.sort((a, b) => {
				// If both are folders or both are files, sort alphabetically
				if (a.type === b.type) {
					return a.name.localeCompare(b.name);
				}
				// Folders come before files
				return a.type === "folder" ? -1 : 1;
			})
			.map((item) => {
				// Recursively sort children if it's a folder
				if (item.children) {
					return { ...item, children: sortFileStructure(item.children) };
				}
				return item;
			});
	};

	const sortedFileStructure = computed(() => (fileStructure: FileItem[]) => {
		return sortFileStructure(fileStructure);
	});

	const filteredFileStructure = computed(() => (fileStructure: FileItem[]) => {
		if (!internalSearchQuery.value)
			return sortedFileStructure.value(fileStructure);

		// A more robust search that can look inside folders
		const search = (items: FileItem[]): FileItem[] => {
			return items.reduce((acc, item) => {
				if (
					item.name
						.toLowerCase()
						.includes(internalSearchQuery.value.toLowerCase())
				) {
					acc.push(item);
				} else if (item.children) {
					const foundChildren = search(item.children);
					if (foundChildren.length > 0) {
						acc.push({ ...item, children: foundChildren, expanded: true });
					}
				}
				return acc;
			}, [] as FileItem[]);
		};

		return search(sortedFileStructure.value(fileStructure));
	});

	function showMenuContext(event: MouseEvent, item: FileItem) {
		menuContextTarget.value = item;
		menuContextX.value = event.clientX;
		menuContextY.value = event.clientY;

		if (item.type === "folder") {
			menuContextItems.value = [
				{
					action: "new-file",
					icon: "i-mdi-file-plus-outline",
					label: "New File",
				},
				{
					action: "new-folder",
					icon: "i-mdi-folder-plus-outline",
					label: "New Folder",
				},
				{ action: "rename", icon: "i-mdi-pencil-outline", label: "Rename" },
				{ action: "copy-path", icon: "i-mdi-link", label: "Copy Path" },
				{ action: "delete", icon: "i-mdi-delete-outline", label: "Delete" },
			];
		} else {
			menuContextItems.value = [
				{ action: "rename", icon: "i-mdi-pencil-outline", label: "Rename" },
				{ action: "duplicate", icon: "i-mdi-content-copy", label: "Duplicate" },
				{ action: "copy-path", icon: "i-mdi-link", label: "Copy Path" },
				{ action: "delete", icon: "i-mdi-delete-outline", label: "Delete" },
			];
		}

		menuContextVisible.value = true;
	}

	function handleMenuContextItemClick(
		item: MenuItem,
		emit: (event: string, ...args: any[]) => void,
		_closeMenuContext: () => void,
	) {
		menuContextVisible.value = false;
		if (!menuContextTarget.value || !item.action) return;

		switch (item.action) {
			case "new-file":
				emit(
					"new-file",
					menuContextTarget.value.type === "folder"
						? menuContextTarget.value.path
						: undefined,
				);
				break;
			case "new-folder":
				emit(
					"new-folder",
					menuContextTarget.value.type === "folder"
						? menuContextTarget.value.path
						: undefined,
				);
				break;
			case "delete":
				emit("delete", menuContextTarget.value);
				break;
			case "rename":
				emit("rename", menuContextTarget.value);
				break;
			default:
				console.log(
					`Action: ${item.action} on ${menuContextTarget.value.path}`,
				);
		}
	}

	function closeMenuContext() {
		menuContextVisible.value = false;
	}

	// Start the creation process for a new file or folder
	function startCreatingNewItem(type: "file" | "folder", parentPath?: string) {
		newItemType.value = type;
		newItemName.value = "";
		newItemParentPath.value = parentPath || null;
		creatingNewItem.value = true;
	}

	// Cancel the creation process
	function cancelCreatingNewItem() {
		creatingNewItem.value = false;
		newItemName.value = "";
		newItemParentPath.value = null;
	}

	// Confirm the creation process
	function confirmCreatingNewItem(emit: (event: string, ...args: any[]) => void) {
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
	function handleInputKeydown(event: KeyboardEvent, emit: (event: string, ...args: any[]) => void) {
		if (event.key === "Enter") {
			confirmCreatingNewItem(emit);
		} else if (event.key === "Escape") {
			cancelCreatingNewItem();
		}
	}

	return {
		cancelCreatingNewItem,
		closeMenuContext,
		confirmCreatingNewItem,
		creatingNewItem,
		filteredFileStructure,
		getFileIcon,
		handleInputKeydown,
		handleMenuContextItemClick,
		// Refs
		internalSearchQuery,
		menuContextItems,
		menuContextTarget,
		menuContextVisible,
		menuContextX,
		menuContextY,
		newItemName,
		newItemParentPath,
		newItemType,

		// Methods
		showMenuContext,

		// Computed
		sortedFileStructure,
		startCreatingNewItem,
	};
}
