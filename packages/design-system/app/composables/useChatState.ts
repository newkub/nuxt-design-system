import type { ChatHistoryItem, ChatMessage, QueuedMessage } from "~/types/chat";

export const useChatState = () => {
	// Current chat state
	const currentChat = ref<ChatHistoryItem | null>(null);

	// Chat state management
	const replyContext = ref<ChatMessage | null>(null);
	const justCreatedChat = ref(false);
	const isLoading = ref(false);
	const messageQueue = ref<QueuedMessage[]>([]);

	// Chat input ref for controlling focus and methods
	const chatInputRef = ref<{
		focus: () => void;
		setMessage: (text: string) => void;
		getMessage: () => string;
	} | null>(null);

	// Computed properties
	const hasMessages = computed(() => messageQueue.value.length > 0);
	const hasReplyContext = computed(() => replyContext.value !== null);

	// State management functions
	const setReplyContext = (message: ChatMessage | null) => {
		replyContext.value = message;
	};

	const clearReplyContext = () => {
		replyContext.value = null;
	};

	const setJustCreatedChat = (value: boolean) => {
		justCreatedChat.value = value;
	};

	const setIsLoading = (value: boolean) => {
		isLoading.value = value;
	};

	const addToMessageQueue = (message: QueuedMessage) => {
		messageQueue.value.push(message);
	};

	const removeFromMessageQueue = (id: string) => {
		const index = messageQueue.value.findIndex((msg) => msg.id === id);
		if (index !== -1) {
			messageQueue.value.splice(index, 1);
		}
	};

	const clearMessageQueue = () => {
		messageQueue.value = [];
	};

	const focusChatInput = () => {
		chatInputRef.value?.focus();
	};

	const setChatInputMessage = (text: string) => {
		chatInputRef.value?.setMessage(text);
	};

	const getChatInputMessage = (): string => {
		return chatInputRef.value?.getMessage() || "";
	};

	return {
		addToMessageQueue,
		chatInputRef,
		clearMessageQueue,
		clearReplyContext,
		// Core data
		currentChat,
		focusChatInput,
		getChatInputMessage,

		// Computed
		hasMessages,
		hasReplyContext,
		isLoading,
		justCreatedChat,
		messageQueue,
		removeFromMessageQueue,

		// State
		replyContext,
		setChatInputMessage,
		setIsLoading,
		setJustCreatedChat,

		// State methods
		setReplyContext,
	};
};
