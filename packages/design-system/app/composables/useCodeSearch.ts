import type { Ref } from "vue";
import type { FileItem } from "~/types/code";

export function useCodeSearch(
	fileStructure: Ref<FileItem[]>,
	selectFile: (file: FileItem) => void,
	activeTabs: Ref<Record<string, string>>,
) {
	// Function to find a file by path in the file structure
	const findFileByPath = (path: string, items: FileItem[]): FileItem | null => {
		for (const item of items) {
			if (item.path === path) {
				return item;
			}
			if (item.children) {
				const found = findFileByPath(path, item.children);
				if (found) return found;
			}
		}
		return null;
	};

	// Function to handle file selection from search
	const handleSearchFileSelect = (filePath: string) => {
		// Switch to editor tab
		activeTabs.value.main = "editor";

		// Find the file in the file structure
		const file = findFileByPath(filePath, fileStructure.value);
		if (file) {
			selectFile(file);
		}
	};

	return {
		findFileByPath,
		handleSearchFileSelect,
	};
}
