import { computed, onMounted, ref } from "vue";
import type { RouteLocationRaw } from "#vue-router";
import type {
	HostingProject,
	ProjectForm,
} from "~/types/hosting";

export const useHosting = () => {
	// --- Reactive State ---
	const projects = ref<HostingProject[]>([]);
	const selectedProject = ref<HostingProject | null>(null);
	const isLoading = ref(false);
	const error = ref<string | null>(null);

	// Project creation form
	const projectForm = ref<ProjectForm>({
		description: "",
		framework: "nuxt",
		name: "",
		region: "asia-southeast1",
	});

	// --- Computed Properties ---
	const activeProjects = computed(() =>
		projects.value.filter((p) => p.status === "active"),
	);

	const totalStorageUsed = computed(() =>
		projects.value.reduce((total, project) => total + project.storageUsed, 0),
	);

	const totalProjects = computed(() => projects.value.length);

	const hostingTabs = computed(() => [
		{ name: "Overview", path: "/hosting/[project]/overview" },
		{ name: "Deployments", path: "/hosting/[project]/deployments" },
		{ name: "Database", path: "/hosting/[project]/database" },
		{ name: "Storage", path: "/hosting/[project]/storage" },
		{ name: "Settings", path: "/hosting/[project]/settings" },
	]);

	// --- Options ---
	const regions = [
		{
			flag: "🇸🇬",
			label: "Asia Southeast (Singapore)",
			value: "asia-southeast1",
		},
		{ flag: "🇺🇸", label: "US Central (Iowa)", value: "us-central1" },
		{ flag: "🇧🇪", label: "Europe West (Belgium)", value: "europe-west1" },
		{ flag: "🇯🇵", label: "Asia Northeast (Tokyo)", value: "asia-northeast1" },
	];

	const frameworks = [
		{ icon: "i-mdi-nuxt", label: "Nuxt.js", value: "nuxt" },
		{ icon: "i-mdi-react", label: "Next.js", value: "next" },
		{ icon: "i-mdi-vuejs", label: "Vue.js", value: "vue" },
		{ icon: "i-mdi-react", label: "React", value: "react" },
		{ icon: "i-mdi-code-tags", label: "Static HTML", value: "static" },
		{ icon: "i-mdi-svelte", label: "Svelte", value: "svelte" },
		{ icon: "i-mdi-angular", label: "Angular", value: "angular" },
	];

	// --- Utility Functions ---
	const getStatusIcon = (status: string) => {
		const iconMap: Record<string, string> = {
			active: "i-mdi-check-circle",
			archived: "i-mdi-archive",
			building: "i-mdi-loading",
			draft: "i-mdi-circle-outline",
			failed: "i-mdi-alert-circle",
			inactive: "i-mdi-pause-circle",
			queued: "i-mdi-clock-outline",
			success: "i-mdi-check-circle",
		};
		return iconMap[status] || "i-mdi-help-circle";
	};

	const getStatusColor = (status: string) => {
		const colorMap: Record<string, string> = {
			active: "text-green-500",
			archived: "text-red-500",
			building: "text-blue-500 animate-spin",
			draft: "text-yellow-500",
			failed: "text-red-500",
			inactive: "text-gray-500",
			queued: "text-gray-500",
			success: "text-green-500",
		};
		return colorMap[status] || "text-gray-500";
	};

	const getRoleColor = (role: string) => {
		const colorMap: Record<string, string> = {
			admin: "bg-orange-100 text-orange-800",
			developer: "bg-blue-100 text-blue-800",
			owner: "bg-red-100 text-red-800",
			viewer: "bg-gray-100 text-gray-800",
		};
		return colorMap[role] || "bg-gray-100 text-gray-800";
	};

	const formatDate = (date: string) => {
		return new Date(date).toLocaleString("th-TH", {
			day: "numeric",
			hour: "2-digit",
			minute: "2-digit",
			month: "short",
			year: "numeric",
		});
	};

	const formatDateLong = (date: string) => {
		return new Date(date).toLocaleDateString("th-TH", {
			day: "numeric",
			month: "long",
			year: "numeric",
		});
	};

	const formatDateShort = (date: string) => {
		return new Date(date).toLocaleDateString("th-TH", {
			day: "numeric",
			month: "short",
			year: "numeric",
		});
	};

	const formatStorage = (bytes: number) => {
		const units = ["B", "KB", "MB", "GB", "TB"];
		let value = bytes;
		let unitIndex = 0;

		while (value >= 1024 && unitIndex < units.length - 1) {
			value /= 1024;
			unitIndex++;
		}

		return `${value.toFixed(1)} ${units[unitIndex]}`;
	};

	// --- Validation ---
	const validateProjectForm = () => {
		const errors: string[] = [];

		if (!projectForm.value.name.trim()) {
			errors.push("Project name is required");
		}
		if (projectForm.value.name.length < 3) {
			errors.push("Project name must be at least 3 characters");
		}
		if (!projectForm.value.region) {
			errors.push("Region is required");
		}
		if (!projectForm.value.framework) {
			errors.push("Framework is required");
		}

		return errors;
	};

	// --- API Functions ---
	async function fetchProjects() {
		isLoading.value = true;
		error.value = null;

		try {
			// In production, this would call server API
			// const { data } = await $fetch('/api/hosting/projects')
			await new Promise((resolve) => setTimeout(resolve, 500));

			// Mock data
			projects.value = [
				{
					billing: {
						nextBilling: "2023-07-15",
						paymentMethod: "**** **** **** 1234",
						period: "monthly",
						plan: "Pro",
						price: 25,
					},
					buckets: [],
					createdAt: "2023-06-15T10:00:00Z",
					customDomain: "mywebsite.com",
					databases: [],
					deployments: [],
					description: "My personal portfolio and blog website",
					environmentVariables: [],
					framework: "nuxt",
					id: "project-1",
					lastUpdated: "2023-06-15T10:00:00Z",
					name: "Personal Website",
					region: "asia-southeast1",
					status: "active",
					storageLimit: 1000000000, // 1GB
					storageUsed: 125000000, // 125MB
					teamMembers: [],
					url: "https://my-website.wrikka.com",
				},
				{
					billing: {
						nextBilling: "2023-07-10",
						paymentMethod: "**** **** **** 5678",
						period: "monthly",
						plan: "Business",
						price: 75,
					},
					buckets: [],
					createdAt: "2023-06-10T10:00:00Z",
					databases: [],
					deployments: [],
					description: "Online store for selling products",
					environmentVariables: [],
					framework: "next",
					id: "project-2",
					lastUpdated: "2023-06-14T10:00:00Z",
					name: "E-commerce Store",
					region: "us-central1",
					status: "active",
					storageLimit: 5000000000, // 5GB
					storageUsed: 450000000, // 450MB
					teamMembers: [],
					url: "https://store.wrikka.com",
				},
			];
		} catch (err) {
			error.value =
				err instanceof Error ? err.message : "Failed to load projects";
		} finally {
			isLoading.value = false;
		}
	}

	async function createProject() {
		const errors = validateProjectForm();
		if (errors.length > 0) {
			throw new Error(errors.join(", "));
		}

		isLoading.value = true;
		error.value = null;

		try {
			// In production, this would call server API
			// const { data } = await $fetch('/api/hosting/projects', {
			//   method: 'POST',
			//   body: projectForm.value
			// })

			await new Promise((resolve) => setTimeout(resolve, 800));

			// Mock response
			const newProject: HostingProject = {
				billing: {
					nextBilling: "",
					paymentMethod: "",
					period: "monthly",
					plan: "Free",
					price: 0,
				},
				buckets: [],
				createdAt: new Date().toISOString(),
				databases: [],
				deployments: [],
				description: projectForm.value.description,
				environmentVariables: [],
				framework: projectForm.value.framework,
				id: `project-${Date.now()}`,
				lastUpdated: new Date().toISOString(),
				name: projectForm.value.name,
				region: projectForm.value.region,
				status: "draft",
				storageLimit: 100000000, // 100MB for free tier
				storageUsed: 0,
				teamMembers: [],
			};

			projects.value.push(newProject);
			selectedProject.value = newProject;

			// Reset form
			projectForm.value = {
				description: "",
				framework: "nuxt",
				name: "",
				region: "asia-southeast1",
			};

			return newProject;
		} catch (err) {
			error.value =
				err instanceof Error ? err.message : "Failed to create project";
			throw err;
		} finally {
			isLoading.value = false;
		}
	}

	async function fetchProject(projectId: string) {
		isLoading.value = true;
		error.value = null;

		try {
			// In production, this would call server API
			// const { data } = await $fetch(`/api/hosting/projects/${projectId}`)
			await new Promise((resolve) => setTimeout(resolve, 300));

			const project = projects.value.find((p) => p.id === projectId);
			if (!project) {
				throw new Error("Project not found");
			}

			selectedProject.value = project;
			return project;
		} catch (err) {
			error.value =
				err instanceof Error ? err.message : "Failed to load project";
			throw err;
		} finally {
			isLoading.value = false;
		}
	}

	function selectProject(project: HostingProject | null) {
		selectedProject.value = project;
	}

	function updateProject(updatedProject: HostingProject) {
		const index = projects.value.findIndex((p) => p.id === updatedProject.id);
		if (index !== -1) {
			projects.value[index] = updatedProject;
			if (selectedProject.value?.id === updatedProject.id) {
				selectedProject.value = updatedProject;
			}
		}
	}

	function deleteProject(projectId: string) {
		projects.value = projects.value.filter((p) => p.id !== projectId);
		if (selectedProject.value?.id === projectId) {
			selectedProject.value = null;
		}
	}

	// --- Navigation Helpers ---
	const viewDeploymentDetail = (deployment: Deployment): RouteLocationRaw => {
		return `/hosting/${selectedProject.value?.id}/deployments/${deployment.id}`;
	};

	// Load initial data
	onMounted(() => {
		fetchProjects();
	});

	return {
		// Computed
		activeProjects,
		createProject,
		deleteProject,
		error,
		fetchProject,

		// Methods
		fetchProjects,
		formatDate,
		formatDateLong,
		formatDateShort,
		formatStorage,
		frameworks,
		getRoleColor,
		getStatusColor,

		// Utility functions
		getStatusIcon,
		hostingTabs,
		isLoading,
		projectForm,
		// State
		projects,

		// Options
		regions,
		selectedProject,
		selectProject,
		totalProjects,
		totalStorageUsed,
		updateProject,
		validateProjectForm,
		viewDeploymentDetail,
	};
};
