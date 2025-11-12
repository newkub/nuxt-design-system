type TabEventEmit = {
	(e: "update:activeTab", payload: { panelId: string; tabId: string }): void;
	(
		e: "tabDrop",
		payload: { tab: unknown; targetPanelId: string; sourcePanelId: string },
	): void;
	(
		e: "tabReorder",
		payload: { panelId: string; fromIndex: number; toIndex: number },
	): void;
	(e: "closeTab", payload: { panelId: string; tabId: string }): void;
	(e: "closeOthers", payload: { panelId: string; tabId: string }): void;
	(e: "closeAll", payload: { panelId: string }): void;
};

export function useTabEvents(emit: TabEventEmit) {
	function handleTabChange(panelId: string, tabId: string) {
		emit("update:activeTab", { panelId, tabId });
	}

	function handleTabDrop(
		tab: unknown,
		targetPanelId: string,
		sourcePanelId: string,
	) {
		emit("tabDrop", { sourcePanelId, tab, targetPanelId });
	}

	function handleTabReorder(
		panelId: string,
		fromIndex: number,
		toIndex: number,
	) {
		emit("tabReorder", { fromIndex, panelId, toIndex });
	}

	function closeTab(panelId: string, tabId: string) {
		emit("closeTab", { panelId, tabId });
	}

	function closeOtherTabs(panelId: string, tabId: string) {
		emit("closeOthers", { panelId, tabId });
	}

	function closeAllTabs(panelId: string) {
		emit("closeAll", { panelId });
	}

	function createPanelHandlers(panelId: string) {
		return {
			handleCloseAll: () => closeAllTabs(panelId),
			handleCloseOthers: (tabId: string) => closeOtherTabs(panelId, tabId),
			handleCloseTab: (tabId: string) => closeTab(panelId, tabId),
			handleTabChange: (tabId: string) => handleTabChange(panelId, tabId),
			handleTabDrop: (
				tab: unknown,
				targetPanelId: string,
				sourcePanelId: string,
			) => handleTabDrop(tab, targetPanelId, sourcePanelId),
			handleTabReorder: (fromIndex: number, toIndex: number) =>
				handleTabReorder(panelId, fromIndex, toIndex),
		};
	}

	return {
		closeAllTabs,
		closeOtherTabs,
		closeTab,
		createPanelHandlers,
		handleTabChange,
		handleTabDrop,
		handleTabReorder,
	};
}
