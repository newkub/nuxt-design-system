import { computed, ref } from "vue";
import type { ChatMessage } from "~/types/chat";

export interface MessageState {
	isEditing: boolean;
	isTranslating: boolean;
	isSummarizing: boolean;
	showOriginal: boolean;
	translatedContent: string | null;
}

export const useChatMessage = (message: Ref<ChatMessage>) => {
	// State
	const isEditing = ref(false);
	const isTranslating = ref(false);
	const isSummarizing = ref(false);
	const showOriginal = ref(false);
	const translatedContent = ref<string | null>(null);
	const editedContent = ref(message.value.content);
	const summary = ref<string | null>(null);

	// Computed
	const displayContent = computed(() => {
		if (translatedContent.value && !showOriginal.value) {
			return translatedContent.value;
		}
		if (isEditing.value) {
			return editedContent.value;
		}
		return message.value.content;
	});

	const isLoading = computed(() => isTranslating.value || isSummarizing.value);

	const canEdit = computed(
		() => message.value.type === "user" && !isLoading.value,
	);

	// Actions
	const startEdit = () => {
		if (canEdit.value) {
			isEditing.value = true;
			editedContent.value = message.value.content;
		}
	};

	const cancelEdit = () => {
		isEditing.value = false;
		editedContent.value = message.value.content;
	};

	const saveEdit = async () => {
		if (editedContent.value.trim() !== message.value.content) {
			// In real implementation, this would save to backend
			message.value.content = editedContent.value.trim();
		}
		isEditing.value = false;
	};

	const translateMessage = async (targetLanguage: string = "th") => {
		if (isLoading.value) return;

		isTranslating.value = true;
		showOriginal.value = false;

		try {
			// Simulate API call for translation
			await new Promise((resolve) => setTimeout(resolve, 1500));
			// In real implementation, this would call translation API
			translatedContent.value = `[${targetLanguage}] ${message.value.content}`;
		} catch (error) {
			console.error("Error translating message:", error);
			translatedContent.value = null;
		} finally {
			isTranslating.value = false;
		}
	};

	const summarizeMessage = async () => {
		if (isLoading.value || !message.value.content) return;

		isSummarizing.value = true;

		try {
			// Simulate API call for summarization
			await new Promise((resolve) => setTimeout(resolve, 2000));
			// In real implementation, this would call summarization API
			summary.value = `สรุป: ${message.value.content.substring(0, 100)}...`;
		} catch (error) {
			console.error("Error summarizing message:", error);
			summary.value = null;
		} finally {
			isSummarizing.value = false;
		}
	};

	const toggleOriginal = () => {
		showOriginal.value = !showOriginal.value;
	};

	const copyToClipboard = async () => {
		try {
			await navigator.clipboard.writeText(displayContent.value);
			// You could add a toast notification here
		} catch (error) {
			console.error("Error copying to clipboard:", error);
		}
	};

	const regenerateResponse = async () => {
		// In real implementation, this would regenerate the AI response
		console.log("Regenerating response for message:", message.value.id);
	};

	const deleteMessage = async () => {
		// In real implementation, this would delete the message
		console.log("Deleting message:", message.value.id);
	};

	const replyToMessage = () => {
		// In real implementation, this would set up a reply context
		console.log("Replying to message:", message.value.id);
	};

	return {
		cancelEdit,
		canEdit,
		copyToClipboard,
		deleteMessage,

		// Computed
		displayContent,
		editedContent,
		// State
		isEditing,
		isLoading,
		isSummarizing,
		isTranslating,
		regenerateResponse,
		replyToMessage,
		saveEdit,
		showOriginal,

		// Methods
		startEdit,
		summarizeMessage,
		summary,
		toggleOriginal,
		translatedContent,
		translateMessage,
	};
};
