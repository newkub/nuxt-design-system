import type { ConsoleMessage } from "./useBrowserConsole";

/**
 * Code IDE Console composable
 * Manages console messages, mock data, and test functions
 */
export function useCodeConsole() {
	const { messages: realMessages, clearConsole } = useBrowserConsole();

	// Mock console messages for demonstration
	const mockMessages: ConsoleMessage[] = [
		{
			message: ["Application started"],
			timestamp: new Date(Date.now() - 300000),
			type: "log",
		},
		{
			message: ["User logged in: John Doe"],
			timestamp: new Date(Date.now() - 240000),
			type: "info",
		},
		{
			message: ["Loading user preferences..."],
			timestamp: new Date(Date.now() - 180000),
			type: "log",
		},
		{
			message: ["Deprecated API usage detected"],
			timestamp: new Date(Date.now() - 120000),
			type: "warn",
		},
		{
			message: ["Preferences loaded successfully"],
			timestamp: new Date(Date.now() - 60000),
			type: "log",
		},
		{
			message: ["Failed to load widget data: Network error"],
			timestamp: new Date(Date.now() - 30000),
			type: "error",
		},
		{
			message: ["Retrying widget data load..."],
			timestamp: new Date(Date.now() - 15000),
			type: "log",
		},
		{
			message: ["Widget data loaded successfully"],
			timestamp: new Date(Date.now() - 5000),
			type: "log",
		},
	];

	// State
	const showMockData = ref(true);
	const autoScroll = ref(true);
	const allMessages = ref<ConsoleMessage[]>([...mockMessages]);

	// Watch for new real messages
	onMounted(() => {
		const intervalId = setInterval(() => {
			if (realMessages.value.length > 0) {
				const newMessages = realMessages.value.filter(
					(realMsg) =>
						!allMessages.value.some(
							(existingMsg) =>
								existingMsg.timestamp === realMsg.timestamp &&
								existingMsg.type === realMsg.type &&
								JSON.stringify(existingMsg.message) ===
									JSON.stringify(realMsg.message),
						),
				);

				if (newMessages.length > 0) {
					allMessages.value = [...allMessages.value, ...newMessages];

					// Limit to last 100 messages
					if (allMessages.value.length > 100) {
						allMessages.value = allMessages.value.slice(-100);
					}
				}
			}
		}, 100);

		// Cleanup on unmount
		onUnmounted(() => clearInterval(intervalId));
	});

	// Actions
	function toggleMockData() {
		showMockData.value = !showMockData.value;
		if (showMockData.value) {
			allMessages.value = [...mockMessages, ...realMessages.value];
		} else {
			allMessages.value = [...realMessages.value];
		}
	}

	// Test functions to generate console messages
	function generateLog() {
		console.log("This is a log message");
	}

	function generateInfo() {
		console.info("This is an info message");
	}

	function generateWarn() {
		console.warn("This is a warning message");
	}

	function generateError() {
		console.error("This is an error message");
	}

	function generateObject() {
		console.log("User object:", {
			age: 30,
			email: "john@example.com",
			name: "John Doe",
		});
	}

	return {
		// State
		showMockData,
		autoScroll,
		allMessages,
		// Actions
		clearConsole,
		toggleMockData,
		generateLog,
		generateInfo,
		generateWarn,
		generateError,
		generateObject,
	};
}
