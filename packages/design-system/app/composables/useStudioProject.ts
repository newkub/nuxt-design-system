import { computed, onMounted, reactive, ref } from "vue";
import type {
	ProjectForm,
	StudioAsset,
	StudioExport,
	StudioProject,
	StudioTemplate,
	StudioType,
} from "~/types/studio";

export function useStudioProject(mediaType?: StudioType) {
	// State for current view
	const currentView = ref<"list" | "edit" | "view">("list");
	const selectedProjectId = ref<string | undefined>(undefined);
	const projects = ref<StudioProject[]>([]);

	// Loading and error states
	const isLoading = ref(false);
	const error = ref<string | null>(null);

	// Project creation form
	const projectForm = reactive<ProjectForm>({
		description: "",
		name: "",
		settings: {
			autoSave: true,
			autoSaveInterval: 5,
			colorSpace: "sRGB",
			exportSettings: {
				bitrate: 5000,
				codec: "libx264",
				compression: "lossless",
				format: "png",
				fps: 30,
				quality: "high",
				resolution: "1920x1080",
			},
			format: "png",
			fps: 30,
			height: 1080,
			quality: "high",
			width: 1920,
		},
		type: mediaType || "image",
	});

	// Search and filter
	const searchQuery = ref("");
	const selectedTags = ref<string[]>([]);
	const sortBy = ref<"name" | "date" | "type" | "status">("date");
	const sortOrder = ref<"asc" | "desc">("desc");

	// Asset management
	const selectedAssets = ref<StudioAsset[]>([]);
	const assetLibrary = ref<StudioAsset[]>([]);

	// Templates
	const availableTemplates = ref<StudioTemplate[]>([]);

	// Computed properties
	const filteredProjects = computed(() => {
		let filtered = [...projects.value];

		// Filter by search query
		if (searchQuery.value.trim()) {
			const query = searchQuery.value.toLowerCase();
			filtered = filtered.filter(
				(project) =>
					project.name.toLowerCase().includes(query) ||
					project.description.toLowerCase().includes(query) ||
					project.tags.some((tag) => tag.toLowerCase().includes(query)),
			);
		}

		// Filter by tags
		if (selectedTags.value.length > 0) {
			filtered = filtered.filter((project) =>
				selectedTags.value.some((tag) => project.tags.includes(tag)),
			);
		}

		// Sort
		filtered.sort((a, b) => {
			let comparison = 0;

			switch (sortBy.value) {
				case "name":
					comparison = a.name.localeCompare(b.name);
					break;
				case "date":
					comparison =
						new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
					break;
				case "type":
					comparison = a.type.localeCompare(b.type);
					break;
				case "status": {
					const statusOrder = {
						active: 4,
						archived: 1,
						draft: 2,
						published: 3,
					};
					comparison =
						(statusOrder[b.status] || 0) - (statusOrder[a.status] || 0);
					break;
				}
			}

			return sortOrder.value === "desc" ? -comparison : comparison;
		});

		return filtered;
	});

	const currentProject = computed(() => {
		if (!selectedProjectId.value) return null;
		return (
			projects.value.find(
				(project) => project.id === selectedProjectId.value,
			) || null
		);
	});

	const projectStats = computed(() => {
		const total = projects.value.length;
		const active = projects.value.filter((p) => p.status === "active").length;
		const published = projects.value.filter(
			(p) => p.status === "published",
		).length;
		const drafts = projects.value.filter((p) => p.status === "draft").length;

		return { active, drafts, published, total };
	});

	// API functions
	const fetchProjects = async () => {
		isLoading.value = true;
		error.value = null;

		try {
			// In production, this would call server API
			// const { data } = await $fetch(`/api/studio/${mediaType}/projects`)

			// Mock data based on media type
			const mockProjects: StudioProject[] = [
				{
					assets: [],
					author: "Current User",
					collaborators: [],
					createdAt: new Date().toISOString(),
					description: `A sample ${mediaType} project for demonstration`,
					exports: [],
					id: "1",
					name: `Sample ${mediaType} Project 1`,
					settings: {
						autoSave: true,
						autoSaveInterval: 5,
						colorSpace: "sRGB",
						exportSettings: {
							bitrate: 5000,
							codec: "libx264",
							compression: "lossless",
							format: "png",
							fps: 30,
							quality: "high",
							resolution: "1920x1080",
						},
						format: "png",
						fps: 30,
						height: 1080,
						quality: "high",
						width: 1920,
					},
					status: "active",
					storageLimit: 1000000000,
					storageUsed: 0,
					tags: ["sample", "demo"],
					thumbnail: "https://via.placeholder.com/300x200",
					type: mediaType || "image",
					updatedAt: new Date().toISOString(),
					versions: [],
				},
				{
					assets: [],
					author: "Current User",
					collaborators: [],
					createdAt: new Date().toISOString(),
					description: `Another sample ${mediaType} project`,
					exports: [],
					id: "2",
					name: `Sample ${mediaType} Project 2`,
					settings: {
						autoSave: true,
						autoSaveInterval: 5,
						colorSpace: "sRGB",
						exportSettings: {
							bitrate: 5000,
							codec: "libx264",
							compression: "lossless",
							format: "png",
							fps: 30,
							quality: "high",
							resolution: "1920x1080",
						},
						format: "png",
						fps: 30,
						height: 1080,
						quality: "high",
						width: 1920,
					},
					status: "draft",
					storageLimit: 1000000000,
					storageUsed: 0,
					tags: ["sample", "draft"],
					thumbnail: "https://via.placeholder.com/300x200",
					type: mediaType || "image",
					updatedAt: new Date().toISOString(),
					versions: [],
				},
			];

			projects.value = mockProjects;
		} catch (err) {
			error.value =
				err instanceof Error ? err.message : "Failed to load projects";
		} finally {
			isLoading.value = false;
		}
	};

	const createProject = async () => {
		isLoading.value = true;
		error.value = null;

		try {
			// In production, this would call server API
			// const { data } = await $fetch(`/api/studio/${mediaType}/projects`, {
			//   method: 'POST',
			//   body: projectForm
			// })

			const newProject: StudioProject = {
				assets: [],
				author: "Current User",
				collaborators: [],
				createdAt: new Date().toISOString(),
				description: projectForm.description,
				exports: [],
				id: `project-${Date.now()}`,
				name: projectForm.name,
				settings: projectForm.settings,
				status: "draft",
				storageLimit: 1000000000,
				storageUsed: 0,
				tags: [],
				thumbnail: "https://via.placeholder.com/300x200",
				type: projectForm.type,
				updatedAt: new Date().toISOString(),
				versions: [],
			};

			projects.value.push(newProject);
			selectedProjectId.value = newProject.id;
			currentView.value = "edit";

			return newProject;
		} catch (err) {
			error.value =
				err instanceof Error ? err.message : "Failed to create project";
			throw err;
		} finally {
			isLoading.value = false;
		}
	};

	const updateProject = async (
		projectId: string,
		updates: Partial<StudioProject>,
	) => {
		isLoading.value = true;
		error.value = null;

		try {
			const index = projects.value.findIndex((p) => p.id === projectId);
			if (index === -1) {
				throw new Error("Project not found");
			}

			const projectToUpdate = projects.value[index];
			if (projectToUpdate) {
				Object.assign(projectToUpdate, updates);
				projectToUpdate.updatedAt = new Date().toISOString();
				return projectToUpdate;
			}

			throw new Error("Project not found after index check");
		} catch (err) {
			error.value =
				err instanceof Error ? err.message : "Failed to update project";
			throw err;
		} finally {
			isLoading.value = false;
		}
	};

	const deleteProject = async (projectId: string) => {
		isLoading.value = true;
		error.value = null;

		try {
			projects.value = projects.value.filter((p) => p.id !== projectId);
			if (selectedProjectId.value === projectId) {
				selectedProjectId.value = undefined;
				currentView.value = "list";
			}
		} catch (err) {
			error.value =
				err instanceof Error ? err.message : "Failed to delete project";
			throw err;
		} finally {
			isLoading.value = false;
		}
	};

	// Navigation functions
	const handleProjectClick = (project: StudioProject) => {
		selectedProjectId.value = project.id;
		currentView.value = "edit";
	};

	const handleViewProject = (project: StudioProject) => {
		selectedProjectId.value = project.id;
		currentView.value = "view";
	};

	const handleCloseEditor = () => {
		currentView.value = "list";
		selectedProjectId.value = undefined;
	};

	const handleCloseViewer = () => {
		currentView.value = "list";
		selectedProjectId.value = undefined;
	};

	// Asset management
	const addAsset = async (asset: Omit<StudioAsset, "id" | "uploadedAt">) => {
		const newAsset: StudioAsset = {
			...asset,
			id: `asset-${Date.now()}`,
			uploadedAt: new Date().toISOString(),
		};

		assetLibrary.value.push(newAsset);
		return newAsset;
	};

	const removeAsset = (assetId: string) => {
		assetLibrary.value = assetLibrary.value.filter((a) => a.id !== assetId);
	};

	// Template functions
	const fetchTemplates = async () => {
		// Mock templates
		availableTemplates.value = [
			{
				category: "Image Editing",
				complexity: "beginner",
				createdAt: new Date().toISOString(),
				description: "Simple template for image editing",
				downloads: 150,
				estimatedTime: 10,
				id: "1",
				name: "Basic Image Template",
				rating: 4.5,
				reviews: 45,
				tags: ["basic", "simple"],
				thumbnail: "https://via.placeholder.com/200x150",
				type: "image",
				updatedAt: new Date().toISOString(),
			},
		];
	};

	// Search and filter functions
	const setSearchQuery = (query: string) => {
		searchQuery.value = query;
	};

	const toggleTag = (tag: string) => {
		const index = selectedTags.value.indexOf(tag);
		if (index === -1) {
			selectedTags.value.push(tag);
		} else {
			selectedTags.value.splice(index, 1);
		}
	};

	const setSort = (
		field: typeof sortBy.value,
		order: typeof sortOrder.value,
	) => {
		sortBy.value = field;
		sortOrder.value = order;
	};

	// Initialize
	onMounted(() => {
		if (mediaType) {
			fetchProjects();
			fetchTemplates();
		}
	});

	return {
		addAsset,
		assetLibrary,

		// Templates
		availableTemplates,
		createProject,
		currentProject,
		// State
		currentView,
		deleteProject,
		error,
		fetchProjects,
		fetchTemplates,
		handleCloseEditor,
		handleCloseViewer,

		// Methods
		handleProjectClick,
		handleViewProject,
		isLoading,
		projectForm,

		// Stats
		projectStats,
		projects: filteredProjects,
		removeAsset,

		// Search and filter
		searchQuery,

		// Assets
		selectedAssets,
		selectedProjectId,
		selectedTags,
		setSearchQuery,
		setSort,
		sortBy,
		sortOrder,
		toggleTag,
		updateProject,
	};
}
