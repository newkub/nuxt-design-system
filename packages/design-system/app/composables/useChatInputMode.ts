import type { ChatMode } from "~/app/config/chatinput";

export const useChatInputMode = (
	selectedMode: Ref<ChatMode>,
	isModeSelectorOpen: Ref<boolean>,
	modeMenuPosition: Ref<{ x: number; y: number }>,
	_modeMenuItems: Ref<ChatMode[]>,
) => {
	const openModeSelector = (event: MouseEvent) => {
		isModeSelectorOpen.value = true;
		modeMenuPosition.value = { x: event.clientX, y: event.clientY };
	};

	const closeModeSelector = () => {
		isModeSelectorOpen.value = false;
	};

	const handleModeMenuItemClick = (mode: ChatMode) => {
		selectedMode.value = mode;
		closeModeSelector();
	};

	return {
		closeModeSelector,
		handleModeMenuItemClick,
		openModeSelector,
	};
};
