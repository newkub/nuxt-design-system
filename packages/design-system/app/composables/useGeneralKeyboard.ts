import { useMagicKeys } from "@vueuse/core";
import { watch } from "vue";
import type {
	HotkeyOptions,
	KeyboardNavigationOptions,
} from "~/types/keyboard";

export function useKeyboardNavigation(options: KeyboardNavigationOptions) {
	const { ArrowUp, ArrowDown, Enter, Escape } = useMagicKeys();

	watch(
		() => ArrowUp?.value,
		(v) => {
			if (v && options.isVisible.value) {
				options.activeIndex.value =
					(options.activeIndex.value - 1 + options.items.value.length) %
					options.items.value.length;
			}
		},
	);

	watch(
		() => ArrowDown?.value,
		(v) => {
			if (v && options.isVisible.value) {
				options.activeIndex.value =
					(options.activeIndex.value + 1) % options.items.value.length;
			}
		},
	);

	watch(
		() => Enter?.value,
		(v) => {
			if (v && options.isVisible.value && options.activeIndex.value !== -1) {
				const selectedItem = options.items.value[options.activeIndex.value];
				if (selectedItem) {
					options.onSelect(selectedItem);
				}
			}
		},
	);

	watch(
		() => Escape?.value,
		(v) => {
			if (v && options.isVisible.value) {
				options.onClose();
			}
		},
	);
}

export function useHotkeys(hotkeys: HotkeyOptions[]) {
	const handleKeyDown = (event: KeyboardEvent) => {
		for (const hotkey of hotkeys) {
			// Check condition first
			if (hotkey.condition && !hotkey.condition()) {
				continue;
			}

			const keyMatch = event.key.toLowerCase() === hotkey.key.toLowerCase();
			const ctrlMatch =
				hotkey.ctrl === undefined || event.ctrlKey === hotkey.ctrl;
			const metaMatch =
				hotkey.meta === undefined || event.metaKey === hotkey.meta;
			const shiftMatch =
				hotkey.shift === undefined || event.shiftKey === hotkey.shift;
			const altMatch = hotkey.alt === undefined || event.altKey === hotkey.alt;

			if (keyMatch && ctrlMatch && metaMatch && shiftMatch && altMatch) {
				event.preventDefault();
				hotkey.callback(event);
				return; // Stop after first match
			}
		}
	};

	// Add event listener
	if (typeof window !== "undefined") {
		window.addEventListener("keydown", handleKeyDown);
	}

	// Return cleanup function
	const cleanup = () => {
		if (typeof window !== "undefined") {
			window.removeEventListener("keydown", handleKeyDown);
		}
	};

	return { cleanup };
}
