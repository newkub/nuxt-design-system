import { useClipboard } from "@vueuse/core";
import type { Ref } from "vue";
import type { ChatHistoryItem, ChatMessage } from "~/types/chat";

export const useChatActions = (
	currentChat: Ref<ChatHistoryItem | null>,
	chatId: Ref<string>,
	messageRefs: Ref<Record<string, unknown>>,
) => {
	const { copy, copied } = useClipboard();

	// Chat operations
	const clearChat = async () => {
		if (currentChat.value) {
			currentChat.value.messages = [];
		}
	};

	const exportChat = async () => {
		if (currentChat.value?.messages) {
			const chatData = {
				exportDate: new Date().toISOString(),
				messages: currentChat.value.messages,
				title: currentChat.value.title,
			};
			// Create download
			const blob = new Blob([JSON.stringify(chatData, null, 2)], {
				type: "application/json",
			});
			const url = URL.createObjectURL(blob);
			const a = document.createElement("a");
			a.href = url;
			a.download = `chat-${chatId.value}-${Date.now()}.json`;
			a.click();
			URL.revokeObjectURL(url);
		}
	};

	const handleMessageAction = async ({
		actionId,
		message,
	}: {
		actionId: string;
		message: ChatMessage;
	}) => {
		// Handle message actions
		console.log("Message action:", actionId, message);

		// You can extend this to handle different actions
		switch (actionId) {
			case "copy":
				await copy(message.content);
				// You could add a toast notification here to show 'copied.value'
				break;
			case "reply":
				// This will be handled by the UI component
				break;
			default:
				console.log("Unhandled action:", actionId);
		}
	};

	const scrollToMessage = (messageId: string) => {
		const messageElement = messageRefs.value[messageId]?.$el;
		if (messageElement) {
			// Simple scroll implementation
			messageElement.scrollIntoView({ behavior: "smooth", block: "center" });

			// Highlight effect
			messageElement.classList.add(
				"ring-2",
				"ring-blue-500",
				"transition-all",
				"duration-500",
			);
			setTimeout(() => {
				messageElement.classList.remove("ring-2", "ring-blue-500");
			}, 2000);
		}
	};

	return {
		clearChat,
		copied, // Expose copied status
		exportChat,
		handleMessageAction,
		scrollToMessage,
	};
};
