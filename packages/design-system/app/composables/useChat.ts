import type { Ref } from "vue";
import type { ChatMessage } from "~/types/chat";

export const useChat = (
	chatId: Ref<string>,
	messageRefs: Ref<Record<string, unknown>>,
) => {
	const state = useChatState();
	const history = useChatHistory(state.currentChat);
	const actions = useChatActions(state.currentChat, chatId, messageRefs);

	// Destructure for easier access
	const { currentChat, setJustCreatedChat, focusChatInput, setReplyContext } =
		state;

	// Initialize chat lifecycle
	const initializeChat = async () => {
		// Load the chat data based on chatId
		history.loadChat(chatId.value);

		// Check if this is a newly created chat by looking at currentChat messages
		if (currentChat.value?.messages?.length === 0) {
			// If we have no messages, it means we just created this chat
			setJustCreatedChat(true);

			// Focus the input after a short delay
			nextTick(() => {
				focusChatInput();
			});

			// Reset the flag after a short delay or when messages arrive
			const stopWatcher = watch(
				currentChat,
				(newChat) => {
					if (newChat?.messages && newChat.messages.length > 0) {
						setJustCreatedChat(false);
						stopWatcher();
					}
				},
				{ immediate: true },
			);

			// Also reset after 5 seconds as a fallback
			setTimeout(() => {
				setJustCreatedChat(false);
			}, 5000);
		}

		// Focus the input after a short delay
		nextTick(() => {
			focusChatInput();
		});
	};

	// Setup lifecycle hooks
	onMounted(() => {
		initializeChat();
	});

	// Handle message actions from UI
	const handleMessageActionFromUI = async ({
		actionId,
		message,
	}: {
		actionId: string;
		message: ChatMessage;
	}) => {
		if (actionId === "reply") {
			setReplyContext(message);
			focusChatInput();
		} else {
			await actions.handleMessageAction({ actionId, message });
		}
	};

	return {
		...state,
		...history,
		...actions,

		// UI handlers
		handleMessageActionFromUI,

		// Lifecycle
		initializeChat,
	};
};
