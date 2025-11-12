import type { Ref } from "vue";
import { ref } from "vue";
import type { FileItem } from "~/types/code";

// Shared mock file contents store
export const mockFileContents = ref<
	Record<string, { language: string; content: string }>
>({});

/**
 * Composable for file management operations
 * Handles creating, deleting, renaming files and folders
 */
export function useProjectFileManagement() {
	// Function to create a new file
	const handleNewFile = (parentPath?: string) => {
		console.log("Creating new file in:", parentPath || "root");

		const newFileName = `new-file-${Date.now()}.txt`;
		const newFilePath = parentPath
			? `${parentPath}/${newFileName}`
			: newFileName;

		const newFile: FileItem = {
			icon: "i-mdi-file-outline",
			name: newFileName,
			path: newFilePath,
			sha: `${Date.now()}`,
			type: "file",
		};

		// Add to mock file contents
		mockFileContents.value[newFilePath] = {
			content: "// New file content",
			language: "plaintext",
		};

		return { newFile, newFilePath };
	};

	// Function to create a new folder
	const handleNewFolder = (parentPath?: string) => {
		console.log("Creating new folder in:", parentPath || "root");

		const newFolderName = `new-folder-${Date.now()}`;
		const newFolderPath = parentPath
			? `${parentPath}/${newFolderName}`
			: newFolderName;

		const newFolder: FileItem = {
			children: [],
			expanded: false,
			icon: "i-mdi-folder",
			name: newFolderName,
			path: newFolderPath,
			sha: `${Date.now()}`,
			type: "folder",
		};

		return { newFolder, newFolderPath };
	};

	// Function to delete an item
	const handleDelete = (item: FileItem) => {
		console.log("Deleting item:", item.path);

		return { deletedItem: item };
	};

	// Function to rename an item
	const handleRename = (item: FileItem) => {
		console.log("Renaming item:", item.path);

		const newName = prompt("Enter new name:", item.name);
		if (newName && newName !== item.name) {
			// Update the item name
			const oldPath = item.path;
			item.name = newName;

			// Update the path based on the new name
			const pathParts = item.path.split("/");
			pathParts[pathParts.length - 1] = newName;
			const newPath = pathParts.join("/");

			// If it's a file, update the mock file contents key
			if (item.type === "file") {
				const content = mockFileContents.value[item.path];
				if (content) {
					delete mockFileContents.value[item.path];
					mockFileContents.value[newPath] = content;
				}
			}

			// Update the path
			item.path = newPath;

			return { newPath, oldPath, renamedItem: item };
		}

		return null;
	};

	// Function to toggle folder expanded state
	const handleToggleFolder = (folder: FileItem) => {
		folder.expanded = !folder.expanded;
		return { toggledFolder: folder };
	};

	// Helper function to add item to file structure
	const addItemToStructure = (
		fileStructure: Ref<FileItem[]>,
		item: FileItem,
		parentPath?: string,
	) => {
		if (parentPath) {
			// Find the parent folder and add the item to its children
			const addToFolder = (items: FileItem[]): boolean => {
				for (const folder of items) {
					if (folder.type === "folder" && folder.path === parentPath) {
						if (!folder.children) {
							folder.children = [];
						}
						folder.children.push(item);
						return true;
					} else if (folder.type === "folder" && folder.children) {
						if (addToFolder(folder.children)) {
							return true;
						}
					}
				}
				return false;
			};

			addToFolder(fileStructure.value);
		} else {
			// Add to root level
			fileStructure.value.push(item);
		}

		// Refresh the file structure
		fileStructure.value = [...fileStructure.value];
	};

	// Helper function to remove item from file structure
	const removeItemFromStructure = (
		fileStructure: Ref<FileItem[]>,
		itemPath: string,
	) => {
		const removeFromStructure = (items: FileItem[]): boolean => {
			const index = items.findIndex((i) => i.path === itemPath);
			if (index !== -1) {
				items.splice(index, 1);
				return true;
			}

			// Check children of folders
			for (const folder of items) {
				if (folder.type === "folder" && folder.children) {
					if (removeFromStructure(folder.children)) {
						return true;
					}
				}
			}

			return false;
		};

		removeFromStructure(fileStructure.value);
		fileStructure.value = [...fileStructure.value];
	};

	return {
		addItemToStructure,
		handleDelete,
		handleNewFile,
		handleNewFolder,
		handleRename,
		handleToggleFolder,
		mockFileContents,
		removeItemFromStructure,
	};
}
