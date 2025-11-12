import { useEventListener } from "@vueuse/core";

export function useCommandPalette() {
	const isCommandPaletteOpen = ref(false);
	const initialSearchQuery = ref("");

	// Check if element is an input field
	const isInputElement = (element: Element | null): boolean => {
		if (!element) return false;
		return (
			element instanceof HTMLInputElement ||
			element instanceof HTMLTextAreaElement ||
			element instanceof HTMLSelectElement ||
			(element as HTMLElement).isContentEditable
		);
	};

	const openCommandPalette = (initialQuery = "") => {
		initialSearchQuery.value = initialQuery;
		isCommandPaletteOpen.value = true;
	};

	const closeCommandPalette = () => {
		isCommandPaletteOpen.value = false;
		initialSearchQuery.value = "";
	};

	const toggleCommandPalette = () => {
		if (isCommandPaletteOpen.value) {
			closeCommandPalette();
		} else {
			openCommandPalette();
		}
	};

	// Keyboard event handler for direct typing activation
	const handleGlobalKeydown = (e: KeyboardEvent) => {
		// Skip if command palette is already open
		if (isCommandPaletteOpen.value) return;

		// Skip if we're already in an input field
		if (isInputElement(document.activeElement)) return;

		// Skip modifier keys
		if (e.ctrlKey || e.metaKey || e.altKey) return;

		// Skip special keys
		if (
			e.key === "Escape" ||
			e.key === "Enter" ||
			e.key === "Tab" ||
			e.key === "Backspace"
		)
			return;

		// Only activate on printable characters
		if (e.key.length === 1) {
			// Prevent default behavior to avoid the character being typed elsewhere
			e.preventDefault();

			// Set the initial query to the typed character
			initialSearchQuery.value = e.key;

			// Open the command palette
			isCommandPaletteOpen.value = true;
		}
	};

	// Add keyboard shortcut listener (Ctrl+K or Cmd+K)
	const handleShortcutKeydown = (e: KeyboardEvent) => {
		// Allow Ctrl+K or Cmd+K to toggle the command palette
		if ((e.metaKey || e.ctrlKey) && e.key === "k") {
			e.preventDefault();
			toggleCommandPalette();
		}
	};

	// Combined event handler
	const handleKeydown = (e: KeyboardEvent) => {
		handleGlobalKeydown(e);
		handleShortcutKeydown(e);
	};

	// Add global keydown listener
	useEventListener(document, "keydown", handleKeydown);

	return {
		closeCommandPalette,
		initialSearchQuery,
		isCommandPaletteOpen,
		openCommandPalette,
		toggleCommandPalette,
	};
}
