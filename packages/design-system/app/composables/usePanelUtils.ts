// Utility functions for panel operations
import type { Panel, PanelConfig } from "~/app/types/panel";

/**
 * Find a panel by ID
 * @param panels - Array of panels to search
 * @param panelId - The ID of the panel to find
 * @returns The panel with the specified ID or undefined if not found
 */
export function findPanel(
	panels: Panel[] | PanelConfig[],
	panelId: string,
): Panel | PanelConfig | undefined {
	return panels.find((p) => p.id === panelId);
}

/**
 * Find the index of a panel by ID
 * @param panels - Array of panels to search
 * @param panelId - The ID of the panel to find
 * @returns The index of the panel with the specified ID or -1 if not found
 */
export function findPanelIndex(
	panels: Panel[] | PanelConfig[],
	panelId: string,
): number {
	return panels.findIndex((p) => p.id === panelId);
}

/**
 * Find a tab by ID within a panel
 * @param panel - The panel to search
 * @param tabId - The ID of the tab to find
 * @returns The tab with the specified ID or undefined if not found
 */
export function findTabInPanel(panel: Panel | PanelConfig, tabId: string) {
	return panel.tabs.find((t) => t.id === tabId);
}

/**
 * Find the index of a tab by ID within a panel
 * @param panel - The panel to search
 * @param tabId - The ID of the tab to find
 * @returns The index of the tab with the specified ID or -1 if not found
 */
export function findTabIndexInPanel(
	panel: Panel | PanelConfig,
	tabId: string,
): number {
	return panel.tabs.findIndex((t) => t.id === tabId);
}

/**
 * Get the first tab in a panel
 * @param panel - The panel to get the first tab from
 * @returns The first tab in the panel or undefined if the panel is empty
 */
export function getFirstTabInPanel(panel: Panel | PanelConfig) {
	return panel.tabs.length > 0 ? panel.tabs[0] : undefined;
}

/**
 * Check if a panel has tabs
 * @param panel - The panel to check
 * @returns Whether the panel has any tabs
 */
export function hasTabs(panel: Panel | PanelConfig): boolean {
	return panel.tabs.length > 0;
}

