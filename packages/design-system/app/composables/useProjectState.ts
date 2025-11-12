import { ref } from "vue";
import type { FileItem, SelectedFile } from "~/types/code";
import type { Repo } from "./useProjectCodeCore";

/**
 * Composable for project state management
 * Handles repositories, loading states, and file structure state
 */
export function useProjectState() {
	// Repository management
	const currentRepo = ref<Repo>({ name: "my-project", owner: "myorg" });
	const repos = ref<Repo[]>([
		{ name: "my-project", owner: "myorg" },
		{ name: "another-project", owner: "myorg" },
		{ name: "sample-repo", owner: "otherorg" },
	]);

	const selectRepo = (repo: Repo) => {
		currentRepo.value = repo;
		console.log("Selected repo:", repo);
	};

	// File management state
	const isLoading = ref(true);
	const error = ref<string | null>(null);
	const fileStructure = ref<FileItem[]>([]);
	const selectedFile = ref<SelectedFile | null>(null);

	const selectFile = (file: FileItem) => {
		if (file.type === "file") {
			// This will be handled by the file management composable
			console.log("Selecting file:", file.path);
		}
	};

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

	return {
		// Repository management
		currentRepo,
		error,
		fileStructure,
		findFileByPath,

		// File management state
		isLoading,
		repos,
		selectedFile,
		selectFile,
		selectRepo,
	};
}
