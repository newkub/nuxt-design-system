import type { Component } from "vue";

export interface TabConfig {
	value: string;
	label: string;
	component?: Component;
	to?: string;
	icon?: string;
	disabled?: boolean;
	badge?: string | number;
}

export type RouteMode = "query" | "path" | "hash" | "none";

export interface UseTabStateOptions {
	tabs: TabConfig[];
	modelValue?: string;
	defaultTab?: string;
	routeMode?: RouteMode;
	queryParam?: string;
	onTabChange?: (value: string) => void;
}

export function useTabState(options: UseTabStateOptions) {
	const {
		tabs,
		modelValue,
		defaultTab,
		routeMode = "none",
		queryParam = "tab",
		onTabChange,
	} = options;

	const route = useRoute();
	const router = useRouter();

	// Get initial tab value
	const getInitialTab = (): string => {
		// 1. Use modelValue if provided (controlled mode)
		if (modelValue) return modelValue;

		// 2. Try to get from route
		if (routeMode === "query") {
			const queryValue = route.query[queryParam] as string;
			if (queryValue && tabs.some((tab) => tab.value === queryValue)) {
				return queryValue;
			}
		} else if (routeMode === "path") {
			const pathSegments = route.path.split("/").filter(Boolean);
			const lastSegment = pathSegments[pathSegments.length - 1] || "";
			if (tabs.some((tab) => tab.value === lastSegment)) {
				return lastSegment;
			}
		} else if (routeMode === "hash") {
			// For hash mode, we get the tab value from the hash
			const hashValue = route.hash.substring(1); // Remove the # prefix
			if (hashValue && tabs.some((tab) => tab.value === hashValue)) {
				return hashValue;
			}
		}

		// 3. Use default tab
		if (defaultTab && tabs.some((tab) => tab.value === defaultTab)) {
			return defaultTab;
		}

		// 4. Use first tab
		return tabs[0]?.value || "";
	};

	const activeTab = ref(getInitialTab());

	// Watch route changes
	watch(
		() => route.fullPath,
		() => {
			if (!modelValue) {
				activeTab.value = getInitialTab();
			}
		},
	);

	// Watch modelValue changes (controlled mode)
	watch(
		() => modelValue,
		(newValue) => {
			if (newValue !== undefined) {
				activeTab.value = newValue;
			}
		},
	);

	// Change tab function
	const changeTab = (value: string) => {
		const tab = tabs.find((t) => t.value === value);
		if (!tab || tab.disabled) return;

		activeTab.value = value;

		// Call callback
		onTabChange?.(value);

		// Update route if not in controlled mode
		if (!modelValue && routeMode !== "none") {
			if (routeMode === "query") {
				router.push({
					query: { ...route.query, [queryParam]: value },
				});
			} else if (routeMode === "path") {
				const pathSegments = route.path.split("/").filter(Boolean);
				const lastSegment = pathSegments[pathSegments.length - 1] || "";
				const isLastSegmentTab = tabs.some((tab) => tab.value === lastSegment);

				if (isLastSegmentTab) {
					pathSegments[pathSegments.length - 1] = value;
				} else {
					pathSegments.push(value);
				}

				router.push(`/${pathSegments.join("/")}`);
			} else if (routeMode === "hash") {
				// For hash mode, we update the hash in the URL
				router.push({ hash: `#${value}` });
			}
		}
	};

	// Computed values
	const activeTabConfig = computed(() =>
		tabs.find((tab) => tab.value === activeTab.value),
	);

	const activeComponent = computed(() => activeTabConfig.value?.component);

	const isTabActive = (value: string) => activeTab.value === value;

	const isTabDisabled = (value: string) => {
		const tab = tabs.find((t) => t.value === value);
		return tab?.disabled || false;
	};

	// Navigation helpers
	const nextTab = () => {
		const enabledTabs = tabs.filter((t) => !t.disabled);
		const currentEnabledIndex = enabledTabs.findIndex(
			(t) => t.value === activeTab.value,
		);
		const nextEnabledTab =
			enabledTabs[(currentEnabledIndex + 1) % enabledTabs.length];
		if (nextEnabledTab) changeTab(nextEnabledTab.value);
	};

	const prevTab = () => {
		const enabledTabs = tabs.filter((t) => !t.disabled);
		const currentEnabledIndex = enabledTabs.findIndex(
			(t) => t.value === activeTab.value,
		);
		const prevEnabledTab =
			enabledTabs[
				(currentEnabledIndex - 1 + enabledTabs.length) % enabledTabs.length
			];
		if (prevEnabledTab) changeTab(prevEnabledTab.value);
	};

	return {
		activeComponent,
		activeTab: readonly(activeTab),
		activeTabConfig,
		changeTab,
		isTabActive,
		isTabDisabled,
		nextTab,
		prevTab,
	};
}
