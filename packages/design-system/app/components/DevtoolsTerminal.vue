<script setup lang="ts">
import { inject, nextTick, onMounted, onUnmounted, ref, watch } from "vue";

const terminalOutput = ref<string[]>([]);
const isRefreshing = ref(false);
const autoScroll = ref(true);
const terminalContainer = ref<HTMLElement | null>(null);
const lastIndex = ref(0);
const updateTerminalCount = inject<(count: number) => void>(
	"updateTerminalCount",
);

// Watch terminal output count and update parent
watch(
	() => terminalOutput.value.length,
	(count) => {
		updateTerminalCount?.(count);
	},
);

const scrollToBottom = () => {
	if (autoScroll.value && terminalContainer.value) {
		nextTick(() => {
			if (terminalContainer.value) {
				terminalContainer.value.scrollTop =
					terminalContainer.value.scrollHeight;
			}
		});
	}
};

const refreshTerminal = async () => {
	isRefreshing.value = true;
	try {
		// Fetch terminal output from dev server
		const response = await $fetch<{ logs: string[]; index: number }>(
			"/api/devtools/terminal",
			{
				query: { since: lastIndex.value },
			},
		);

		if (response?.logs && response.logs.length > 0) {
			// Append new logs
			terminalOutput.value = [...terminalOutput.value, ...response.logs];
			lastIndex.value = response.index;

			// Keep only last 500 lines
			if (terminalOutput.value.length > 500) {
				const excess = terminalOutput.value.length - 500;
				terminalOutput.value = terminalOutput.value.slice(excess);
				lastIndex.value -= excess;
			}

			scrollToBottom();
		}
	} catch (error) {
		// Silently fail - don't spam console
	} finally {
		isRefreshing.value = false;
	}
};

const clearTerminal = () => {
	terminalOutput.value = [];
	lastIndex.value = 0;
};

watch(
	terminalOutput,
	() => {
		scrollToBottom();
	},
	{ deep: true },
);

let intervalId: NodeJS.Timeout | null = null;

onMounted(() => {
	refreshTerminal();
	// Auto-refresh every 500ms for real-time feel
	intervalId = setInterval(refreshTerminal, 500);
});

onUnmounted(() => {
	if (intervalId) {
		clearInterval(intervalId);
	}
});
</script>

<template>
  <div class="flex flex-col h-full">
    <div class="flex items-center justify-between mb-4">
      <h3 class="text-lg font-semibold">Dev Server Terminal</h3>
      <div class="flex items-center gap-2">
        <label class="flex items-center gap-2 text-sm">
          <input v-model="autoScroll" type="checkbox" class="rounded">
          <span>Auto-scroll</span>
        </label>
        <button
          class="px-3 py-1 text-sm rounded-md bg-gray-100 hover:bg-gray-200 flex items-center gap-2"
          :disabled="isRefreshing"
          @click="refreshTerminal"
        >
          <div :class="['i-mdi-refresh', isRefreshing && 'animate-spin']" />
          <span>Refresh</span>
        </button>
        <button
          class="px-3 py-1 text-sm rounded-md bg-gray-100 hover:bg-gray-200 flex items-center gap-2"
          @click="clearTerminal"
        >
          <div class="i-mdi-delete" />
          <span>Clear</span>
        </button>
      </div>
    </div>

    <div ref="terminalContainer" class="flex-1 overflow-y-auto bg-black text-green-400 rounded-md p-3 font-mono text-sm">
      <div v-if="terminalOutput.length === 0" class="text-gray-500 text-center py-8">
        No terminal output available
      </div>
      <div
        v-for="(line, index) in terminalOutput"
        :key="index"
        class="whitespace-pre-wrap break-words"
      >
        {{ line }}
      </div>
    </div>
  </div>
</template>
