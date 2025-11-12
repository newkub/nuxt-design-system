<script setup lang="ts">
import { inject, onMounted, onUnmounted, ref, watch } from "vue";

interface ConsoleLog {
	type: "log" | "error" | "warn" | "info";
	message: string;
	timestamp: string;
	stack?: string;
}

const logs = ref<ConsoleLog[]>([]);
const updateConsoleCount =
	inject<(count: number) => void>("updateConsoleCount");

// Watch logs count and update parent
watch(
	() => logs.value.length,
	(count) => {
		updateConsoleCount?.(count);
	},
);

const getIconForType = (type: string) => {
	switch (type) {
		case "error":
			return "i-mdi-alert-circle text-red-500";
		case "warn":
			return "i-mdi-alert text-yellow-500";
		case "info":
			return "i-mdi-information text-blue-500";
		default:
			return "i-mdi-console text-gray-500";
	}
};

const formatArg = (arg: unknown): string => {
	if (arg === null) return "null";
	if (arg === undefined) return "undefined";
	if (typeof arg === "string") return arg;
	if (typeof arg === "number" || typeof arg === "boolean") return String(arg);
	if (arg instanceof Error)
		return `${arg.name}: ${arg.message}\n${arg.stack || ""}`;
	if (typeof arg === "object") {
		try {
			return JSON.stringify(arg, null, 2);
		} catch {
			return String(arg);
		}
	}
	return String(arg);
};

const addLog = (type: ConsoleLog["type"], args: unknown[], stack?: string) => {
	const message = args.map(formatArg).join(" ");

	logs.value.push({
		message,
		stack,
		timestamp: new Date().toLocaleTimeString("th-TH"),
		type,
	});

	// Keep only last 200 logs
	if (logs.value.length > 200) {
		logs.value.shift();
	}
};

const clearLogs = () => {
	logs.value = [];
};

// Store original console methods
const originalMethods = {
	debug: console.debug.bind(console),
	error: console.error.bind(console),
	info: console.info.bind(console),
	log: console.log.bind(console),
	warn: console.warn.bind(console),
};

onMounted(() => {
	// Intercept all console methods
	console.log = (...args: unknown[]) => {
		originalMethods.log(...args);
		addLog("log", args);
	};

	console.error = (...args: unknown[]) => {
		originalMethods.error(...args);
		const stack = new Error().stack;
		addLog("error", args, stack);
	};

	console.warn = (...args: unknown[]) => {
		originalMethods.warn(...args);
		addLog("warn", args);
	};

	console.info = (...args: unknown[]) => {
		originalMethods.info(...args);
		addLog("info", args);
	};

	console.debug = (...args: unknown[]) => {
		originalMethods.debug(...args);
		addLog("log", args);
	};

	// Capture unhandled errors
	window.addEventListener("error", (event) => {
		addLog("error", [event.message], event.error?.stack);
	});

	// Capture unhandled promise rejections
	window.addEventListener("unhandledrejection", (event) => {
		addLog("error", ["Unhandled Promise Rejection:", event.reason]);
	});

	// Add welcome message
	addLog("info", [
		"🔧 Console is capturing all browser logs, errors, and warnings",
	]);
});

onUnmounted(() => {
	// Restore original console methods
	console.log = originalMethods.log;
	console.error = originalMethods.error;
	console.warn = originalMethods.warn;
	console.info = originalMethods.info;
	console.debug = originalMethods.debug;
});
</script>

<template>
  <div class="flex flex-col h-full">
    <div class="flex items-center justify-between mb-4">
      <h3 class="text-lg font-semibold">Browser Console</h3>
      <div class="flex items-center gap-2">
        <button
          class="px-3 py-1 text-sm rounded-md bg-gray-100 hover:bg-gray-200 flex items-center gap-2"
          @click="clearLogs"
        >
          <div class="i-mdi-delete" />
          <span>Clear</span>
        </button>
      </div>
    </div>

    <div class="flex-1 overflow-y-auto bg-gray-50 rounded-md p-3 font-mono text-sm">
      <div v-if="logs.length === 0" class="text-gray-500 text-center py-8">
        No console logs yet
      </div>
      <div
        v-for="(log, index) in logs"
        :key="index"
        class="flex items-start gap-2 mb-2 pb-2 border-b border-gray-200"
      >
        <div :class="getIconForType(log.type)" class="mt-0.5 flex-shrink-0" />
        <div class="flex-1 min-w-0">
          <div class="text-xs text-gray-500 mb-1">{{ log.timestamp }}</div>
          <div :class="{
            'text-red-600': log.type === 'error',
            'text-yellow-600': log.type === 'warn',
            'text-blue-600': log.type === 'info',
            'text-gray-700': log.type === 'log'
          }" class="whitespace-pre-wrap break-words">
            {{ log.message }}
          </div>
          <div v-if="log.stack" class="mt-2 text-xs text-gray-500 whitespace-pre-wrap">
            {{ log.stack }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
