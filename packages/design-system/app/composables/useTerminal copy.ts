import type { TerminalProfile, TerminalSession } from "~/types/terminal";

/**
 * Terminal composable
 * Handles terminal state, commands, and sessions
 */
export function useTerminal() {
	// Profiles
	const profiles = ref<TerminalProfile[]>([
		{
			accent: "text-green-300",
			bg: "bg-gray-900",
			id: "default",
			name: "Default",
			prompt: "text-green-400",
			text: "text-white",
		},
	]);

	const currentProfileId = ref("default");

	// Sessions
	const sessions = ref<TerminalSession[]>([
		{
			history: [
				"Welcome to Wrikka Terminal!",
				"Type `help` for a list of commands.",
			],
			id: "1",
			name: "bash",
		},
	]);

	const activeSessionId = ref("1");
	const currentCommand = ref("");
	const commandHistory = ref<string[]>([]);
	const historyIndex = ref(-1);

	// Computed
	const currentProfile = computed(() => {
		return (
			profiles.value.find((p) => p.id === currentProfileId.value) ||
			profiles.value[0]
		);
	});

	const activeSession = computed(() => {
		return (
			sessions.value.find((s) => s.id === activeSessionId.value) ||
			sessions.value[0]
		);
	});

	// Command handlers
	function handleCommand() {
		const command = currentCommand.value.trim();
		if (!command) return;

		// Add to command history
		commandHistory.value.push(command);
		historyIndex.value = commandHistory.value.length;

		// Add command to history
		if (activeSession.value) {
			activeSession.value.history.push(`$ ${command}`);

			const [cmd, ...args] = command.split(" ");
			if (cmd) {
				executeCommand(cmd, args);
			}
		}

		currentCommand.value = "";
	}

	function executeCommand(cmd: string, args: string[]) {
		if (!activeSession.value) return;

		switch (cmd.toLowerCase()) {
			case "help":
				activeSession.value.history.push(
					"Available commands: help, clear, echo, theme, profile, new-profile",
				);
				break;
			case "clear":
				activeSession.value.history = [];
				break;
			case "echo":
				activeSession.value.history.push(args.join(" "));
				break;
			case "theme":
			case "profile":
				handleThemeCommand(args);
				break;
			case "new-profile":
				handleNewProfileCommand(args);
				break;
			default:
				activeSession.value.history.push(`Command not found: ${cmd}`);
				break;
		}
	}

	function handleThemeCommand(args: string[]) {
		if (!activeSession.value) return;

		if (args.length > 0) {
			const theme = args[0]?.toLowerCase();
			const profile = profiles.value.find(
				(p) => p.id === theme || p.name.toLowerCase() === theme,
			);
			if (profile) {
				currentProfileId.value = profile.id;
				activeSession.value.history.push(`Switched to ${profile.name} theme`);
			} else {
				activeSession.value.history.push(
					`Unknown theme: ${theme || "undefined"}. Available themes: ${profiles.value.map((p) => p.name).join(", ")}`,
				);
			}
		} else {
			activeSession.value.history.push(
				`Current theme: ${currentProfile.value?.name}. Available themes: ${profiles.value.map((p) => p.name).join(", ")}`,
			);
		}
	}

	function handleNewProfileCommand(args: string[]) {
		if (!activeSession.value) return;

		if (args.length >= 5) {
			const [name, bg, text, prompt, accent] = args;
			if (name && bg && text && prompt && accent) {
				const id = name.toLowerCase().replace(/\s+/g, "-");
				profiles.value.push({
					accent,
					bg,
					id,
					name,
					prompt,
					text,
				});
				activeSession.value.history.push(`Created new profile: ${name}`);
			}
		} else {
			activeSession.value.history.push(
				"Usage: new-profile <name> <bg-class> <text-class> <prompt-class> <accent-class>",
			);
			activeSession.value.history.push(
				"Example: new-profile Ocean bg-blue-900 text-blue-100 text-cyan-300 text-cyan-200",
			);
		}
	}

	// Keyboard navigation
	function handleKeydown(e: KeyboardEvent) {
		if (e.key === "ArrowUp") {
			e.preventDefault();
			navigateHistory(-1);
		} else if (e.key === "ArrowDown") {
			e.preventDefault();
			navigateHistory(1);
		} else if (e.key === "Enter") {
			handleCommand();
		}
	}

	function navigateHistory(direction: number) {
		if (commandHistory.value.length === 0) return;

		if (direction === -1) {
			// Up arrow
			if (
				historyIndex.value === -1 ||
				historyIndex.value > commandHistory.value.length - 1
			) {
				historyIndex.value = commandHistory.value.length - 1;
			} else if (historyIndex.value > 0) {
				historyIndex.value--;
			}
			currentCommand.value = commandHistory.value[historyIndex.value] || "";
		} else {
			// Down arrow
			if (historyIndex.value < commandHistory.value.length - 1) {
				historyIndex.value++;
				currentCommand.value = commandHistory.value[historyIndex.value] || "";
			} else {
				historyIndex.value = commandHistory.value.length;
				currentCommand.value = "";
			}
		}
	}

	// Session management
	function createNewSession() {
		const sessionId = Date.now().toString();
		sessions.value.push({
			history: [
				"Welcome to Wrikka Terminal!",
				"Type `help` for a list of commands.",
			],
			id: sessionId,
			name: `bash-${sessions.value.length + 1}`,
		});
		activeSessionId.value = sessionId;
	}

	function closeSession(sessionId: string) {
		if (sessions.value.length <= 1) return;

		const sessionIndex = sessions.value.findIndex((s) => s.id === sessionId);
		if (sessionIndex !== -1) {
			sessions.value.splice(sessionIndex, 1);

			if (activeSessionId.value === sessionId) {
				const newIndex = sessionIndex > 0 ? sessionIndex - 1 : 0;
				activeSessionId.value = sessions.value[newIndex]?.id || "";
			}
		}
	}

	// Clipboard operations
	function copyAll() {
		if (activeSession.value) {
			const content = activeSession.value.history.join("\n");
			navigator.clipboard.writeText(content);
		}
	}

	function copySelection() {
		const selection = window.getSelection();
		if (selection?.toString()) {
			navigator.clipboard.writeText(selection.toString());
		}
	}

	return {
		// State
		profiles,
		currentProfileId,
		sessions,
		activeSessionId,
		currentCommand,
		commandHistory,
		historyIndex,
		// Computed
		currentProfile,
		activeSession,
		// Actions
		handleCommand,
		handleKeydown,
		createNewSession,
		closeSession,
		copyAll,
		copySelection,
	};
}
