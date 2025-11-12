import { onMounted } from "vue";
import type { FileItem } from "~/types/code";
import { useProjectCodeCore } from "./useProjectCodeCore";
import { useProjectFileManagement } from "./useProjectFileManagement";
import { useProjectMockData } from "./useProjectMockData";
import { useProjectState } from "./useProjectState";

/**
 * Main composable for project code functionality
 * Combines all project-related composables into a single interface
 */
export function useProjectCode() {
	// Initialize all sub-composables
	const core = useProjectCodeCore();
	const state = useProjectState();
	const fileManagement = useProjectFileManagement();
	const mockData = useProjectMockData();

	// Enhanced selectFile that integrates with file management
	const selectFile = (file: FileItem) => {
		if (file.type === "file") {
			const fileContent = fileManagement.mockFileContents.value[file.path];
			if (fileContent) {
				const { language, content } = fileContent;
				state.selectedFile.value = {
					content,
					language,
					name: file.name,
					path: file.path,
					size: `${content.length} bytes`,
				};
			}
		}
	};

	// Enhanced file operations that update the state
	const handleNewFile = (parentPath?: string) => {
		const { newFile, newFilePath } = fileManagement.handleNewFile(parentPath);

		// Add to file structure
		fileManagement.addItemToStructure(state.fileStructure, newFile, parentPath);

		return { newFile, newFilePath };
	};

	const handleNewFolder = (parentPath?: string) => {
		const { newFolder, newFolderPath } =
			fileManagement.handleNewFolder(parentPath);

		// Add to file structure
		fileManagement.addItemToStructure(
			state.fileStructure,
			newFolder,
			parentPath,
		);

		return { newFolder, newFolderPath };
	};

	const handleDelete = (item: FileItem) => {
		const { deletedItem } = fileManagement.handleDelete(item);

		// Remove from file structure
		fileManagement.removeItemFromStructure(state.fileStructure, item.path);

		return { deletedItem };
	};

	const handleRename = (item: FileItem) => {
		const result = fileManagement.handleRename(item);

		if (result) {
			// Update file structure
			state.fileStructure.value = [...state.fileStructure.value];
		}

		return result;
	};

	const handleToggleFolder = (folder: FileItem) => {
		return fileManagement.handleToggleFolder(folder);
	};

	// Enhanced project loading that integrates with state management
	const loadFullProject = async () => {
		state.isLoading.value = true;

		try {
			// Use mock data loading - now returns a Promise
			const result = await mockData.loadFullProject();

			// Update state with the loaded data
			state.fileStructure.value = result.fileStructure;
			Object.assign(fileManagement.mockFileContents.value, result.mockContents);

			// Automatically select the README again to show the updated content
			const readmeFile = state.fileStructure.value.find(
				(f) => f.path === "README.md",
			);
			if (readmeFile) selectFile(readmeFile);

			state.isLoading.value = false;

			return result;
		} catch (error) {
			state.isLoading.value = false;
			state.error.value =
				error instanceof Error ? error.message : String(error);
			throw error;
		}
	};

	// Set initial selected file after the project is loaded
	onMounted(() => {
		setTimeout(() => {
			if (!state.selectedFile.value && state.fileStructure.value.length > 0) {
				const initialFile = state.fileStructure.value.find(
					(item) => item.type === "file",
				);
				if (initialFile) {
					selectFile(initialFile);
				}
			}
		}, 1600); // Slightly after the loadFullProject timeout
	});

	// Return combined interface
	return {
		activeTabs: core.activeTabs,
		closeAllTabs: core.closeAllTabs,
		closeOtherTabs: core.closeOtherTabs,
		closePluginDetails: core.closePluginDetails,
		closeTab: core.closeTab,

		// Repository management (from state)
		currentRepo: state.currentRepo,
		error: state.error,
		fileStructure: state.fileStructure,
		findFileByPath: state.findFileByPath,
		handleDelete,
		handleNewFile,
		handleNewFolder,
		handleRename,
		handleTabChange: core.handleTabChange,
		handleTabDrop: core.handleTabDrop,
		handleTabReorder: core.handleTabReorder,
		handleToggleFolder,

		// File management (enhanced with state integration)
		isLoading: state.isLoading,
		leftSidebarTabs: core.leftSidebarTabs,

		// Project loading (enhanced)
		loadFullProject,
		mainTabs: core.mainTabs,
		// Tab management (from core)
		panels: core.panels,
		panelTabs: core.panelTabs,
		repos: state.repos,
		rightSidebarTabs: core.rightSidebarTabs,
		selectedFile: state.selectedFile,

		// Plugin management (from core)
		selectedPlugin: core.selectedPlugin,
		selectFile,
		selectPlugin: core.selectPlugin,
		selectRepo: state.selectRepo,
	};
}
