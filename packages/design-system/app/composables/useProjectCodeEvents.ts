import type { QueuedMessage } from "~/types/chat";

export const useProjectCodeEvents = (
	useProjectCodeReturn: {
		projectCode: Ref<string>;
		isLoading: Ref<boolean>;
		isError: Ref<boolean>;
		error: Ref<Error | null>;
		handleTabChange: (panelId: string, tabId: string) => void;
		handleTabDrop: (tab: { id: string; name: string }, targetPanelId: string, sourcePanelId: string) => void;
		handleTabReorder: (panelId: string, fromIndex: number, toIndex: number) => void;
		closeTab: (panelId: string, tabId: string) => void;
		closeOtherTabs: (panelId: string, tabId: string) => void;
		closeAllTabs: (panelId: string) => void;
		selectPlugin: (plugin: { id: string; name: string }) => void;
	},
	chatId: Ref<string>,
	messageQueue: Ref<QueuedMessage[]>,
	_handleUpdateContainer: (el: HTMLElement) => void,
) => {
	const {
		handleTabChange,
		handleTabDrop,
		handleTabReorder,
		closeTab,
		closeOtherTabs,
		closeAllTabs,
		selectPlugin,
	} = useProjectCodeReturn;

	// Event handler functions to avoid inline destructuring issues
	const handleUpdateActiveTab = (payload: {
		panelId: string;
		tabId: string;
	}) => {
		handleTabChange(payload.panelId, payload.tabId);
	};

	const handleTabDropEvent = (payload: {
		tab: { id: string; name: string };
		targetPanelId: string;
		sourcePanelId: string;
	}) => {
		handleTabDrop(payload.tab, payload.targetPanelId, payload.sourcePanelId);
	};

	const handleTabReorderEvent = (payload: {
		panelId: string;
		fromIndex: number;
		toIndex: number;
	}) => {
		handleTabReorder(payload.panelId, payload.fromIndex, payload.toIndex);
	};

	const handleCloseTab = (payload: { panelId: string; tabId: string }) => {
		closeTab(payload.panelId, payload.tabId);
	};

	const handleCloseOthers = (payload: { panelId: string; tabId: string }) => {
		closeOtherTabs(payload.panelId, payload.tabId);
	};

	const handleCloseAll = (payload: { panelId: string }) => {
		closeAllTabs(payload.panelId);
	};

	// Handle plugin selection from Plugins component
	const handleSelectPlugin = (plugin: { id: string; name: string }) => {
		selectPlugin(plugin);
		// Also switch to the editor tab to show plugin details
		handleTabChange("main", "editor");
	};

	// Handle sending messages to the AI chat
	const handleSendMessage = (payload: {
		content: string;
		file: File | null;
		model: string;
		modelName?: string;
		modelIcon?: string;
		mode?: string;
	}) => {
		// For now, just log the message - in real implementation this would interact with the chat
		console.log("Sending message:", payload);
		// You could add the message to currentChat.messages here if needed
	};

	// Method to handle removing messages from queue
	const handleRemoveFromQueue = (id: string) => {
		const index = messageQueue.value.findIndex(
			(msg: QueuedMessage) => msg.id === id,
		);
		if (index !== -1) messageQueue.value.splice(index, 1);
	};

	return {
		handleCloseAll,
		handleCloseOthers,
		handleCloseTab,
		handleRemoveFromQueue,
		handleSelectPlugin,
		handleSendMessage,
		handleTabDropEvent,
		handleTabReorderEvent,
		handleUpdateActiveTab,
	};
};
