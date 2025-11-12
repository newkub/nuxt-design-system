import { computed, ref } from "vue";
import { chatInputConfig } from "~/app/config/chatinput";

// Re-export types from config for convenience
export type { ChatMode, ChatModel } from "~/app/config/chatinput";

export const useChatInputState = () => {
	// Basic state
	const userMessage = ref("");
	const attachedFile = ref<File | null>(null);
	const filePreviewUrl = ref<string>("");
	const fileInput = ref<HTMLInputElement | null>(null);

	// Recording state
	const isRecording = ref(false);
	const isPaused = ref(false);
	const formattedDuration = ref("00:00");
	const analyser = ref<AnalyserNode | null>(null);
	const dataArray = ref<Uint8Array | null>(null);

	// Mode state from config
	const modeMenuItems = ref(chatInputConfig.modes);
	const selectedMode = ref(modeMenuItems.value[0]); // Default to the first mode
	const isModeSelectorOpen = ref(false);
	const modeMenuPosition = ref({ x: 0, y: 0 });

	// Menu state
	const showMenu = ref(false);
	const menuPosition = ref({ x: 0, y: 0 });
	const isEnhancing = ref(false);
	const menuItems = ref([
		{ icon: "i-mdi-auto-awesome", id: "enhance", label: "Enhance Prompt" },
		{ icon: "i-mdi-text-box-outline", id: "summarize", label: "Summarize" },
		{ icon: "i-mdi-translate", id: "translate", label: "Translate" },
	]);

	// Computed properties
	const isEmpty = computed(
		() =>
			!userMessage.value.trim() && !attachedFile.value && !isRecording.value,
	);

	// State management functions
	const setUserMessage = (message: string) => {
		userMessage.value = message;
	};

	const setAttachedFile = (file: File | null) => {
		attachedFile.value = file;
		if (file?.type.startsWith("image/")) {
			filePreviewUrl.value = URL.createObjectURL(file);
		} else {
			filePreviewUrl.value = "";
		}
	};

	const removeAttachedFile = () => {
		attachedFile.value = null;
		filePreviewUrl.value = "";
	};

	const setRecordingState = (recording: boolean, paused = false) => {
		isRecording.value = recording;
		isPaused.value = paused;
		if (!recording) {
			formattedDuration.value = "00:00";
		}
	};

	const setFormattedDuration = (duration: string) => {
		formattedDuration.value = duration;
	};

	const setMode = (mode: ChatMode) => {
		selectedMode.value = mode;
	};

	const setModeSelectorState = (
		open: boolean,
		position?: { x: number; y: number },
	) => {
		isModeSelectorOpen.value = open;
		if (position) {
			modeMenuPosition.value = position;
		}
	};

	const setMenuState = (show: boolean, position?: { x: number; y: number }) => {
		showMenu.value = show;
		if (position) {
			menuPosition.value = position;
		}
	};

	const setEnhancing = (enhancing: boolean) => {
		isEnhancing.value = enhancing;
	};

	return {
		analyser,
		attachedFile,
		dataArray,
		fileInput,
		filePreviewUrl,
		formattedDuration,

		// Computed
		isEmpty,
		isEnhancing,
		isModeSelectorOpen,
		isPaused,
		isRecording,
		menuItems,
		menuPosition,
		modeMenuItems,
		modeMenuPosition,
		removeAttachedFile,
		selectedMode,
		setAttachedFile,
		setEnhancing,
		setFormattedDuration,
		setMenuState,
		setMode,
		setModeSelectorState,
		setRecordingState,

		// Methods
		setUserMessage,
		showMenu,
		// State
		userMessage,
	};
};
