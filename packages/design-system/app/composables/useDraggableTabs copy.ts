import {
	findPanel,
	findTabIndexInPanel,
	getFirstTabInPanel,
	hasTabs,
} from "~/composables/usePanelUtils";
import type { DraggableTab, Panel, PanelConfig } from "~/types/panel";

// Default panel configurations (moved from tabs.ts)
const DEFAULT_PANELS: PanelConfig[] = [
	{
		id: "main",
		name: "Main",
		tabs: [
			{ icon: "i-mdi-code-braces", id: "editor", name: "Editor" },
			{ icon: "i-mdi-magnify", id: "code-search", name: "Search" },
			{ icon: "i-mdi-git", id: "git", name: "Git" },
			{ icon: "i-mdi-console", id: "console", name: "Console" },
			{ icon: "i-mdi-shield-bug-outline", id: "problems", name: "Problems" },
			{ icon: "i-mdi-format-list-checks", id: "tasks", name: "Tasks" },
		],
	},
	{
		id: "panel",
		name: "Panel",
		tabs: [
			{ icon: "i-mdi-console-line", id: "terminal", name: "Terminal" },
			{
				icon: "i-mdi-package-variant-closed",
				id: "dependencies",
				name: "Dependencies",
			},
		],
	},
	{
		id: "left-sidebar",
		name: "Left Sidebar",
		tabs: [
			{ icon: "i-mdi-file-tree", id: "files", name: "Files" },
			{ icon: "i-mdi-puzzle", id: "plugins", name: "Plugins" },
		],
	},
	{
		id: "right-sidebar",
		name: "Right Sidebar",
		tabs: [
			{ icon: "i-mdi-chat", id: "chat", name: "Chat" },
			{ icon: "i-mdi-git", id: "git-sidebar", name: "Git" },
		],
	},
];

// Default active tabs for each panel (moved from tabs.ts)
const DEFAULT_ACTIVE_TABS: Record<string, string> = {
	"left-sidebar": "files",
	main: "editor",
	panel: "terminal",
	"right-sidebar": "chat",
};

export function useDraggableTabs(
	initialPanels?: PanelConfig[],
	initialActiveTabs?: Record<string, string>,
) {
	// Define panels with their initial tabs
	const panels = ref<Panel[]>(initialPanels || DEFAULT_PANELS);

	// Active tabs for each panel
	const activeTabs = ref<Record<string, string>>(
		initialActiveTabs || DEFAULT_ACTIVE_TABS,
	);

	// Get tabs for a specific panel
	const getPanelTabs = (panelId: string) => {
		const panel = findPanel(panels.value, panelId);
		return panel ? panel.tabs : [];
	};

	// Get active tab for a panel
	const getActiveTab = (panelId: string) => {
		return activeTabs.value[panelId] || "";
	};

	// Set active tab for a panel
	const setActiveTab = (panelId: string, tabId: string) => {
		activeTabs.value[panelId] = tabId;
	};

	// Move tab between panels
	const moveTab = (tabId: string, fromPanelId: string, toPanelId: string) => {
		// Find the tab in the source panel
		const fromPanel = findPanel(panels.value, fromPanelId);
		if (!fromPanel) return;

		const tabIndex = findTabIndexInPanel(fromPanel, tabId);
		if (tabIndex === -1) return;

		// Remove tab from source panel
		const [tab] = fromPanel.tabs.splice(tabIndex, 1);

		// Add tab to target panel
		const toPanel = findPanel(panels.value, toPanelId);
		if (toPanel && tab) {
			// Add the tab to the end of the target panel
			toPanel.tabs.push(tab);

			// Set the moved tab as active in the target panel
			activeTabs.value[toPanelId] = tabId;
		}

		// If the moved tab was active, activate the first tab in the source panel
		if (activeTabs.value[fromPanelId] === tabId) {
			if (hasTabs(fromPanel) && getFirstTabInPanel(fromPanel)) {
				activeTabs.value[fromPanelId] = getFirstTabInPanel(fromPanel)?.id;
			} else {
				// Instead of deleting, set to empty string to maintain panel structure
				activeTabs.value[fromPanelId] = "";
			}
		}
	};

	// Reorder tabs within a panel
	const reorderTabs = (panelId: string, fromIndex: number, toIndex: number) => {
		const panel = findPanel(panels.value, panelId);
		if (
			!panel ||
			fromIndex < 0 ||
			toIndex < 0 ||
			fromIndex >= panel.tabs.length ||
			toIndex >= panel.tabs.length
		) {
			return;
		}

		const [movedTab] = panel.tabs.splice(fromIndex, 1);
		if (movedTab) {
			panel.tabs.splice(toIndex, 0, movedTab);
		}
	};

	// Add a new tab to a panel
	const addTab = (panelId: string, tab: DraggableTab) => {
		const panel = findPanel(panels.value, panelId);
		if (panel) {
			panel.tabs.push(tab);
			// If this is the first tab, make it active
			if (panel.tabs.length === 1) {
				activeTabs.value[panelId] = tab.id;
			}
		}
	};

	// Remove a tab from a panel
	const removeTab = (panelId: string, tabId: string) => {
		const panel = findPanel(panels.value, panelId);
		if (panel) {
			const tabIndex = findTabIndexInPanel(panel, tabId);
			if (tabIndex !== -1) {
				panel.tabs.splice(tabIndex, 1);
				// If we removed the active tab, activate the first tab if available
				if (activeTabs.value[panelId] === tabId) {
					if (hasTabs(panel) && getFirstTabInPanel(panel)) {
						activeTabs.value[panelId] = getFirstTabInPanel(panel)?.id;
					} else {
						// Instead of deleting, set to empty string to maintain panel structure
						activeTabs.value[panelId] = "";
					}
				}
			}
		}
	};

	return {
		activeTabs,
		addTab,
		getActiveTab,
		getPanelTabs,
		moveTab,
		panels,
		removeTab,
		reorderTabs,
		setActiveTab,
	};
}
