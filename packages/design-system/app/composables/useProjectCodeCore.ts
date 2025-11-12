import { computed, onMounted, onUnmounted, ref } from "vue";
import { useDraggableTabs } from "~/composables/useDraggableTabs";
import { findPanel, findTabInPanel } from "~/composables/usePanelUtils";
import type { Plugin } from "~/types/code";

/**
 * Core composable for project code functionality
 * Handles tab management, plugin management, and basic project state
 */
export function useProjectCodeCore() {
	// Initialize draggable tabs composable
	const {
		panels,
		activeTabs,
		setActiveTab,
		moveTab,
		reorderTabs,
		addTab,
		removeTab,
	} = useDraggableTabs();

	// Selected plugin for details view
	const selectedPlugin = ref<Plugin | null>(null);

	// Function to select a plugin and show its details in a new tab
	const selectPlugin = (plugin: Plugin) => {
		// Set the selected plugin
		selectedPlugin.value = plugin;

		// Create a new tab for the plugin details
		const pluginTabId = `plugin-${plugin.id}`;
		const pluginTab = {
			icon: plugin.logo,
			id: pluginTabId,
			name: plugin.name,
		};

		// Check if the tab already exists
		const mainPanel = findPanel(panels.value, "main");
		const existingTab = mainPanel
			? findTabInPanel(mainPanel, pluginTabId)
			: null;

		if (!existingTab) {
			// Add the new tab to the main panel
			addTab("main", pluginTab);
		}

		// Switch to the plugin details tab
		setActiveTab("main", pluginTabId);
	};

	// Function to close plugin details view
	const closePluginDetails = () => {
		if (selectedPlugin.value) {
			const pluginTabId = `plugin-${selectedPlugin.value.id}`;
			// Remove the plugin tab from the main panel
			removeTab("main", pluginTabId);
		}
		selectedPlugin.value = null;
	};

	// Computed properties for panel tabs
	const mainTabs = computed(() => {
		const panel = findPanel(panels.value, "main");
		return panel ? panel.tabs : [];
	});

	const panelTabs = computed(() => {
		const panel = findPanel(panels.value, "panel");
		return panel ? panel.tabs : [];
	});

	const leftSidebarTabs = computed(() => {
		const panel = findPanel(panels.value, "left-sidebar");
		return panel ? panel.tabs : [];
	});

	const rightSidebarTabs = computed(() => {
		const panel = findPanel(panels.value, "right-sidebar");
		return panel ? panel.tabs : [];
	});

	// Tab event handlers
	const handleTabChange = (panelId: string, tabId: string) => {
		setActiveTab(panelId, tabId);
	};

	const handleTabDrop = (
		tab: any,
		targetPanelId: string,
		sourcePanelId: string,
	) => {
		moveTab(tab, targetPanelId, sourcePanelId);
	};

	const handleTabReorder = (
		panelId: string,
		fromIndex: number,
		toIndex: number,
	) => {
		reorderTabs(panelId, fromIndex, toIndex);
	};

	const closeTab = (panelId: string, tabId: string) => {
		removeTab(panelId, tabId);
	};

	const closeOtherTabs = (panelId: string, tabId: string) => {
		const panel = findPanel(panels.value, panelId);
		if (panel) {
			// Create a copy of tabs to avoid modifying while iterating
			const tabsToClose = [...panel.tabs];
			tabsToClose.forEach((tab) => {
				if (tab.id !== tabId) {
					removeTab(panelId, tab.id);
				}
			});
		}
	};

	const closeAllTabs = (panelId: string) => {
		const panel = findPanel(panels.value, panelId);
		if (panel) {
			// Create a copy of tabs to avoid modifying while iterating
			const tabsToClose = [...panel.tabs];
			tabsToClose.forEach((tab) => {
				removeTab(panelId, tab.id);
			});
		}
	};

	// Global tab drop handler
	const handleGlobalTabDrop = (event: any) => {
		const { tab, targetPanelId, sourcePanelId } = event.detail;
		moveTab(tab, targetPanelId, sourcePanelId);
	};

	// Add event listener for global tab drop events
	onMounted(() => {
		window.addEventListener("tab-drop", handleGlobalTabDrop as EventListener);
	});

	// Remove event listener when component is unmounted
	onUnmounted(() => {
		window.removeEventListener(
			"tab-drop",
			handleGlobalTabDrop as EventListener,
		);
	});

	return {
		activeTabs,
		closeAllTabs,
		closeOtherTabs,
		closePluginDetails,
		closeTab,
		handleTabChange,
		handleTabDrop,
		handleTabReorder,
		leftSidebarTabs,
		mainTabs,
		// Tab management
		panels,
		panelTabs,
		rightSidebarTabs,

		// Plugin management
		selectedPlugin,
		selectPlugin,
	};
}
