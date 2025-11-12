
type Hotkey = {
	key: string;
	ctrl?: boolean;
	meta?: boolean;
	shift?: boolean;
	alt?: boolean;
	callback: (event: KeyboardEvent) => void;
};

export function useGlobalHotkeys(hotkeys: Hotkey[]) {
	// Convert to our general format
	const generalHotkeys = hotkeys.map((hotkey) => ({
		alt: hotkey.alt,
		callback: hotkey.callback,
		ctrl: hotkey.ctrl,
		key: hotkey.key,
		meta: hotkey.meta,
		shift: hotkey.shift,
	}));

	const { cleanup } = useHotkeys(generalHotkeys);

	// Return cleanup function
	return { cleanup };
}
