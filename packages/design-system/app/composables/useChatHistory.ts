import type { Ref } from "vue";
import type { ChatHistoryItem } from "~/types/chat";

export const useChatHistory = (currentChat: Ref<ChatHistoryItem | null>) => {
	const router = useRouter();

	// Fetch chat history from the server
	const { data: chatHistory, refresh: refreshChatHistory } = useAsyncData<
		ChatHistoryItem[]
	>("chat-history", () => $fetch("/api/chats"), {
		default: () => [],
		transform: (data) =>
			data.map((item) => ({ ...item, timestamp: new Date(item.timestamp) })),
	});

	// Actions
	const renameChat = async (id: string, newTitle: string) => {
			await $fetch(`/api/chats/${id}`, {
			body: { title: newTitle },
			method: "PUT",
		});
		await refreshChatHistory();
	};

	const deleteChat = async (id: string) => {
		await $fetch(`/api/chats/${id}`, { method: "DELETE" });
		await refreshChatHistory();
		// If the deleted chat is the current one, navigate away
		if (currentChat.value?.id === id) {
			router.push("/chat");
		}
	};

	const createNewChat = async (title: string, firstMessage: string) => {
		const newChat = await $fetch("/api/chats", {
			body: { message: firstMessage, title },
			method: "POST",
		});
		await refreshChatHistory();
		router.push(`/chat/${newChat.id}`);
		return newChat;
	};

	const loadChat = async (id: string) => {
		if (!id) {
			currentChat.value = null;
			return null;
		}
		try {
			const loadedChat = await $fetch<ChatHistoryItem>(`/api/chats/${id}`);
			currentChat.value = {
				...loadedChat,
				timestamp: new Date(loadedChat.timestamp),
			};
			return currentChat.value;
		} catch (error) {
			console.error("Failed to load chat:", error);
			router.push("/chat"); // Redirect if chat not found
			return null;
		}
	};

	const navigateToNewChat = () => {
		router.push("/chat");
	};

	const navigateToChat = (chatId: string) => {
		router.push(`/chat/${chatId}`);
	};

	return {
		// Data
		chatHistory,
		createNewChat,
		deleteChat,
		loadChat,
		navigateToChat,
		navigateToNewChat,
		refreshChatHistory,

		// Actions
		renameChat,
	};
};
