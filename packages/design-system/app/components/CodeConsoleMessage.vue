<script setup lang="ts">
import type { ConsoleMessage } from "~/composables/useBrowserConsole";

interface Props {
	message: ConsoleMessage;
}

const props = defineProps<Props>();

function getMessageClass(type: string) {
	switch (type) {
		case "warn":
			return "text-yellow-400 border-yellow-400/30";
		case "error":
			return "text-red-400 border-red-400/30";
		case "info":
			return "text-blue-400 border-blue-400/30";
		default:
			return "text-gray-300 border-gray-600";
	}
}

function formatMessage(args: unknown[]) {
	return args
		.map((arg) => {
			if (typeof arg === "object" && arg !== null) {
				try {
					return JSON.stringify(arg, null, 2);
				} catch {
					return "[Circular Object]";
				}
			}
			return String(arg);
		})
		.join(" ");
}
</script>

<template>
	<div :class="['py-1 border-b', getMessageClass(message.type)]">
		<div class="flex">
			<span class="mr-2 text-gray-500 whitespace-nowrap">
				[{{ new Date(message.timestamp).toLocaleTimeString() }}]
			</span>
			<span :class="{ 'font-bold': message.type === 'error' }">
				{{ formatMessage(message.message) }}
			</span>
		</div>
	</div>
</template>
