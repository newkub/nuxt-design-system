import { computed, defineAsyncComponent } from "vue";

export const useProjectCodeLayout = () => {
	// Async components for better performance
	const Browser = defineAsyncComponent(
		() => import("~/components/code/Browser.vue"),
	);
	const Console = defineAsyncComponent(
		() => import("~/components/code/Console.vue"),
	);
	const CodeSearch = defineAsyncComponent(
		() => import("~/components/code/CodeSearch.vue"),
	);
	const Problems = defineAsyncComponent(
		() => import("~/components/code/Problems.vue"),
	);
	const Tasks = defineAsyncComponent(
		() => import("~/components/code/Tasks.vue"),
	);
	const Git = defineAsyncComponent(() => import("~/components/code/Git.vue"));
	const PluginDetails = defineAsyncComponent(
		() => import("~/components/code/PluginDetails.vue"),
	);

	// Layout configuration computed properties
	const mainContentComponents = computed(() => ({
		Browser,
		CodeSearch,
		Console,
		Git,
		PluginDetails,
		Problems,
		Tasks,
	}));

	const panelComponents = computed(() => ({
		dependencies: defineAsyncComponent(
			() => import("~/components/devtools/PackageJsonViewer.vue"),
		),
		terminal: defineAsyncComponent(
			() => import("~/components/code/Terminal.vue"),
		),
	}));

	const sidebarComponents = computed(() => ({
		chat: defineAsyncComponent(() => import("~/components/chat/AIChat.vue")),
		"git-sidebar": Git,
	}));

	return {
		mainContentComponents,
		panelComponents,
		sidebarComponents,
	};
};
