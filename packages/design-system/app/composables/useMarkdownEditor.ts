import { useMagicKeys, whenever } from "@vueuse/core";
import type { MenuItem } from "~/shared/types/ui";
import type { UseMarkdownEditorOptions } from "~/types/markdown";

export function useMarkdownEditor(options: UseMarkdownEditorOptions = {}) {
	const appConfig = useAppConfig();

	const {
		onSubmit,
		submitOnEnter = true,
		slashCommands = appConfig.markdown.slashCommands,
		mentionItems = appConfig.markdown.mentionItems,
	} = options;

	// Menu Context State
	const showMenu = ref(false);
	const menuPosition = ref({ x: 0, y: 0 });
	const menuTrigger = ref<"@" | "/" | null>(null);
	const menuSearchQuery = ref("");

	const menuItems = computed(() => {
		const items = menuTrigger.value === "/" ? slashCommands : mentionItems;
		if (!menuSearchQuery.value) return items;

		return items.filter(
			(item) =>
				!item.separator &&
				item.label?.toLowerCase().includes(menuSearchQuery.value.toLowerCase()),
		);
	});

	// Magic Keys for keyboard shortcuts
	const keys = useMagicKeys();
	const ctrlB = keys["Ctrl+B"];
	const ctrlI = keys["Ctrl+I"];
	const ctrlZ = keys["Ctrl+Z"];
	const ctrlShiftZ = keys["Ctrl+Shift+Z"];
	const ctrlEnter = keys["Ctrl+Enter"];

	// Keyboard shortcuts handlers
	function setupKeyboardShortcuts(applyFormat: (cmd: string) => void) {
		if (ctrlB) whenever(ctrlB, () => applyFormat("bold"));
		if (ctrlI) whenever(ctrlI, () => applyFormat("italic"));
		if (ctrlEnter) whenever(ctrlEnter, () => onSubmit?.());
	}

	function getCursorPosition() {
		const selection = window.getSelection();
		if (!selection || selection.rangeCount === 0) return null;

		const range = selection.getRangeAt(0);
		const rect = range.getBoundingClientRect();

		return {
			x: rect.left,
			y: rect.top + rect.height,
		};
	}

	function checkForTrigger() {
		const selection = window.getSelection();
		if (!selection || selection.rangeCount === 0) return;

		const range = selection.getRangeAt(0);
		const textNode = range.startContainer;

		if (textNode.nodeType !== Node.TEXT_NODE) return;

		const text = textNode.textContent || "";
		const cursorPos = range.startOffset;

		if (cursorPos > 0) {
			const charBefore = text[cursorPos - 1];

			if (charBefore === "@" || charBefore === "/") {
				const position = getCursorPosition();
				if (position) {
					menuTrigger.value = charBefore;
					menuPosition.value = position;
					menuSearchQuery.value = "";
					showMenu.value = true;
				}
			} else if (showMenu.value) {
				const lastTriggerIndex = text.lastIndexOf(
					menuTrigger.value || "",
					cursorPos,
				);
				if (lastTriggerIndex !== -1) {
					menuSearchQuery.value = text.substring(
						lastTriggerIndex + 1,
						cursorPos,
					);
				}
			}
		}
	}

	function handleKeydown(event: KeyboardEvent) {
		// Shift+Enter: New line (default behavior)
		// Enter: Submit (if enabled)
		if (
			event.key === "Enter" &&
			!event.shiftKey &&
			submitOnEnter &&
			!showMenu.value
		) {
			event.preventDefault();
			onSubmit?.();
			return;
		}

		// Close menu on Escape
		if (event.key === "Escape" && showMenu.value) {
			event.preventDefault();
			showMenu.value = false;
			return;
		}

		// Check for trigger after key input
		setTimeout(checkForTrigger, 0);
	}

	const { htmlToMarkdown } = useMarkdownRender();

	function handlePaste(event: ClipboardEvent) {
		if (!event.clipboardData) return;

		// Handle rich text/HTML content
		const html = event.clipboardData.getData("text/html");
		if (html) {
			event.preventDefault();
			const markdown = htmlToMarkdown(html);
			document.execCommand("insertText", false, markdown);
			return;
		}

		// Handle plain text content
		const text = event.clipboardData.getData("text/plain");
		if (text) {
			event.preventDefault();
			// For plain text, we might want to preserve formatting like links
			const formattedText = text
				.replace(/https?:\/\/[^\s]+/g, (url) => `[${url}](${url})`) // Convert URLs to markdown links
				.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") // Convert **bold** to HTML
				.replace(/\*(.*?)\*/g, "<em>$1</em>"); // Convert *italic* to HTML
			document.execCommand("insertText", false, formattedText);
		}
		// If no HTML or text, let the default paste happen
	}

	return {
		// Methods
		checkForTrigger,
		getCursorPosition,
		handleKeydown,
		handlePaste,

		// Keyboard shortcuts
		keys: {
			ctrlB,
			ctrlEnter,
			ctrlI,
			ctrlShiftZ,
			ctrlZ,
		},
		menuItems,
		menuPosition,
		menuSearchQuery,
		menuTrigger,
		setupKeyboardShortcuts,
		// Menu state
		showMenu,
	};
}
