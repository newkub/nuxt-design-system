export function useTabManagement() {
	const draggingTab = ref<unknown>(null);
	const sourcePanel = ref<string | null>(null);

	function onPanelDragStart(tab: unknown, panelId: string) {
		draggingTab.value = tab;
		sourcePanel.value = panelId;
	}

	function onPanelDragOver(event: DragEvent) {
		event.preventDefault();
		if (event.dataTransfer) {
			event.dataTransfer.dropEffect = "move";
		}
	}

	function onPanelDrop(targetPanelId: string, event: DragEvent) {
		event.preventDefault();
		if (
			draggingTab.value &&
			sourcePanel.value &&
			sourcePanel.value !== targetPanelId
		) {
			const dropEvent = new CustomEvent("tab-drop", {
				detail: {
					sourcePanelId: sourcePanel.value,
					tab: draggingTab.value,
					targetPanelId,
				},
			});
			window.dispatchEvent(dropEvent);
		}
		draggingTab.value = null;
		sourcePanel.value = null;
	}

	function onPanelDragEnd() {
		draggingTab.value = null;
		sourcePanel.value = null;
	}

	return {
		draggingTab,
		onPanelDragEnd,
		onPanelDragOver,
		onPanelDragStart,
		onPanelDrop,
		sourcePanel,
	};
}
