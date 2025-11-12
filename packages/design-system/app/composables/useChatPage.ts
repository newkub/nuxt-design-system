
// Type for message refs
interface MessageRef {
	$el: HTMLElement;
}

export const useChatPage = () => {
	const route = useRoute();

	// Chat ID from route
	const chatId = computed(() =>
		Array.isArray(route.params.id) ? route.params.id[0] : route.params.id,
	);

	// Message refs for scroll functionality
	const messageRefs = ref<Record<string, MessageRef>>({});

	// Use main chat composable (now includes state and lifecycle)
	const {
		currentChat,
		replyContext,
		justCreatedChat,
		isLoading,
		messageQueue,
		chatInputRef,
		hasMessages,
		hasReplyContext,
		setReplyContext,
		clearReplyContext,
		setJustCreatedChat,
		setIsLoading,
		addToMessageQueue,
		removeFromMessageQueue,
		clearMessageQueue,
		focusChatInput,
		setChatInputMessage,
		getChatInputMessage,
		clearChat,
		exportChat,
		handleMessageAction,
		scrollToMessage,
		handleMessageActionFromUI,
		initializeChat,
	} = useChat(
		computed(() => chatId.value || ""),
		messageRefs,
	);

	// Convert chatHistory to messages format for compatibility
	const messages = computed(() => {
		const chat = currentChat.value;
		if (chat?.messages && Array.isArray(chat.messages)) {
			return chat.messages;
		}
		return [];
	});

	return {
		addToMessageQueue,
		// Core data
		chatId,
		chatInputRef,

		// Actions (from useChat + useChatActions)
		clearChat,
		clearMessageQueue,
		clearReplyContext,
		exportChat,
		focusChatInput,
		getChatInputMessage,
		handleMessageAction,
		handleMessageActionFromUI,
		hasMessages,
		hasReplyContext,

		// Lifecycle (from useChat)
		initializeChat,
		isLoading,
		justCreatedChat,
		messageQueue,
		messageRefs,
		messages,
		removeFromMessageQueue,

		// State (from useChat)
		replyContext,
		scrollToMessage,
		setChatInputMessage,
		setIsLoading,
		setJustCreatedChat,

		// State methods (from useChat)
		setReplyContext,
	};
};
