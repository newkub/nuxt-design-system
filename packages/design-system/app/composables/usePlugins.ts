import type { Plugin, PluginCategory } from "~/types/plugin";

/**
 * Plugins management composable
 * Handles plugin state, filtering, and actions
 */
export function usePlugins() {
	// State
	const plugins = ref<Plugin[]>([
		{
			category: "Linters",
			description: "Pluggable JavaScript linter",
			downloads: 15000000,
			enabled: true,
			id: 1,
			logo: "i-mdi-language-javascript",
			name: "ESLint",
			publisher: "ESLint Team",
			rating: 4.8,
			version: "8.45.0",
		},
		{
			category: "Formatters",
			description: "Opinionated code formatter",
			downloads: 12000000,
			enabled: true,
			id: 2,
			logo: "i-mdi-format-paint",
			name: "Prettier",
			publisher: "Prettier Team",
			rating: 4.9,
			version: "3.0.0",
		},
		{
			category: "Languages",
			description: "Vue tooling for VS Code",
			downloads: 8000000,
			enabled: false,
			id: 3,
			logo: "i-mdi-vuejs",
			name: "Vetur",
			publisher: "Vue.js Team",
			rating: 4.7,
			version: "0.36.0",
		},
		{
			category: "CSS",
			description: "Intelligent Tailwind CSS tooling",
			downloads: 5000000,
			enabled: true,
			id: 4,
			logo: "i-mdi-tailwind",
			name: "Tailwind CSS IntelliSense",
			publisher: "Tailwind Labs",
			rating: 4.9,
			version: "0.9.11",
		},
		{
			category: "Other",
			description: "Supercharge Git within VS Code",
			downloads: 7000000,
			enabled: false,
			id: 5,
			logo: "i-mdi-git",
			name: "GitLens",
			publisher: "GitKraken",
			rating: 4.8,
			version: "14.3.0",
		},
		{
			category: "Debuggers",
			description: "Debug your JavaScript code in the Chrome browser",
			downloads: 3000000,
			enabled: true,
			id: 6,
			logo: "i-mdi-google-chrome",
			name: "Debugger for Chrome",
			publisher: "Microsoft",
			rating: 4.6,
			version: "4.15.12",
		},
		{
			category: "Other",
			description: "Automatically rename paired HTML/XML tags",
			downloads: 2500000,
			enabled: true,
			id: 7,
			logo: "i-mdi-tag",
			name: "Auto Rename Tag",
			publisher: "Jun Han",
			rating: 4.5,
			version: "0.1.10",
		},
		{
			category: "Other",
			description: "Colorize matching brackets",
			downloads: 4000000,
			enabled: false,
			id: 8,
			logo: "i-mdi-bracket",
			name: "Bracket Pair Colorizer",
			publisher: "CoenraadS",
			rating: 4.7,
			version: "1.0.61",
		},
		{
			category: "Other",
			description: "Autocompletes filenames",
			downloads: 3500000,
			enabled: true,
			id: 9,
			logo: "i-mdi-file-find",
			name: "Path Intellisense",
			publisher: "Christian Kohler",
			rating: 4.6,
			version: "2.8.0",
		},
	]);

	const searchTerm = ref("");
	const selectedCategory = ref<PluginCategory>("All");

	// Computed
	const categories = computed(() => {
		const cats = [
			...new Set(plugins.value.map((plugin) => plugin.category)),
		] as PluginCategory[];
		return ["All", ...cats] as PluginCategory[];
	});

	const filteredPlugins = computed(() => {
		return plugins.value.filter((plugin) => {
			const matchesSearch =
				plugin.name.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
				plugin.description
					.toLowerCase()
					.includes(searchTerm.value.toLowerCase());
			const matchesCategory =
				selectedCategory.value === "All" ||
				plugin.category === selectedCategory.value;
			return matchesSearch && matchesCategory;
		});
	});

	const enabledCount = computed(() => {
		return plugins.value.filter((p) => p.enabled).length;
	});

	// Actions
	function togglePlugin(pluginId: number) {
		const plugin = plugins.value.find((p) => p.id === pluginId);
		if (plugin) {
			plugin.enabled = !plugin.enabled;
		}
	}

	function installPlugin() {
		// In a real app, this would open a plugin installation dialog
		console.log("Install plugin clicked");
	}

	return {
		// State
		plugins,
		searchTerm,
		selectedCategory,
		// Computed
		categories,
		filteredPlugins,
		enabledCount,
		// Actions
		togglePlugin,
		installPlugin,
	};
}
