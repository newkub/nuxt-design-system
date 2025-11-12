export interface ConsoleMessage {
	type: "log" | "warn" | "error" | "info";
	message: any[];
	timestamp: Date;
}

export function useBrowserConsole() {
	const messages = ref<ConsoleMessage[]>([]);

	const originalConsole = {
		error: console.error,
		info: console.info,
		log: console.log,
		warn: console.warn,
	};

	const intercept =
		(type: ConsoleMessage["type"]) =>
		(...args: unknown[]) => {
			messages.value.push({ message: args, timestamp: new Date(), type });
			originalConsole[type](...args);
		};

	onMounted(() => {
		console.log = intercept("log");
		console.warn = intercept("warn");
		console.error = intercept("error");
		console.info = intercept("info");
	});

	onUnmounted(() => {
		console.log = originalConsole.log;
		console.warn = originalConsole.warn;
		console.error = originalConsole.error;
		console.info = originalConsole.info;
	});

	const clearConsole = () => {
		messages.value = [];
	};

	return {
		clearConsole,
		messages,
	};
}
