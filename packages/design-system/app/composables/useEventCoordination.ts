import { useEventBus } from "@vueuse/core";

export interface EventCoordinationOptions {
	isVisible: Ref<boolean>;
	close: () => void;
	eventChannel: string;
	globalFlag?: Ref<boolean>;
}

export function useEventCoordination(options: EventCoordinationOptions) {
	// Use VueUse's event emitter for better coordination
	const { emit, on: onEvent } = useEventBus<string>(options.eventChannel);

	// Listen for close events from other components
	const unsubscribe = onEvent((event: string) => {
		if (event === "close-all" && options.isVisible.value) {
			options.close();
		}
	});

	// Notify other components to close
	const closeOthers = () => {
		emit("close-all");
	};

	// Set/reset the global flag when visibility changes (if provided)
	if (options.globalFlag) {
		watch(options.isVisible, (newVal) => {
			if (options.globalFlag) {
				options.globalFlag.value = newVal;
			}
		});
	}

	return {
		closeOthers,
		emit,
		unsubscribe,
	};
}
