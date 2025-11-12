<script setup lang="ts">
import ConsoleMessage from "./ConsoleMessage.vue";

// Use code console composable
const {
	showMockData,
	autoScroll,
	allMessages,
	clearConsole,
	toggleMockData,
	generateLog,
	generateInfo,
	generateWarn,
	generateError,
	generateObject,
} = useCodeConsole();

// Template refs
const messagesContainer = ref<HTMLElement | null>(null);

// Scroll management
function scrollToBottom() {
	const container = document.querySelector(".console-messages");
	if (container) {
		container.scrollTop = container.scrollHeight;
	}
}

function handleScroll() {
	if (!messagesContainer.value) return;
	const { scrollTop, scrollHeight, clientHeight } = messagesContainer.value;
	autoScroll.value = scrollHeight - scrollTop - clientHeight < 10;
}

// Auto-scroll observer
onMounted(() => {
	const observer = new MutationObserver(() => {
		if (autoScroll.value) {
			scrollToBottom();
		}
	});

	if (messagesContainer.value) {
		observer.observe(messagesContainer.value, {
			childList: true,
			subtree: true,
		});
	}

	onUnmounted(() => observer.disconnect());
});
</script>

<template>
  <div class="h-full w-full relative flex flex-col bg-gray-900 text-white font-mono text-sm">
    <header class="flex-shrink-0 flex items-center justify-between p-2 border-b border-gray-700">
      <h3 class="font-semibold">Browser Console</h3>
      <div class="flex items-center gap-2">
        <label class="flex items-center text-xs text-gray-400">
          <input 
            type="checkbox" 
            v-model="showMockData" 
            @change="toggleMockData"
            class="mr-1 rounded"
          />
          Mock Data
        </label>
        <button 
          @click="clearConsole" 
          class="flex items-center gap-1 text-gray-400 hover:text-white transition-colors text-xs"
        >
          <div class="i-mdi-clear w-4 h-4"></div>
          <span>Clear</span>
        </button>
      </div>
    </header>

    <!-- Test buttons for demonstration -->
    <div class="flex-shrink-0 p-2 border-b border-gray-700 bg-gray-800 flex flex-wrap gap-1">
      <button 
        @click="generateLog"
        class="px-2 py-1 text-xs bg-gray-700 hover:bg-gray-600 rounded"
      >
        Log
      </button>
      <button 
        @click="generateInfo"
        class="px-2 py-1 text-xs bg-blue-700 hover:bg-blue-600 rounded"
      >
        Info
      </button>
      <button 
        @click="generateWarn"
        class="px-2 py-1 text-xs bg-yellow-700 hover:bg-yellow-600 rounded"
      >
        Warn
      </button>
      <button 
        @click="generateError"
        class="px-2 py-1 text-xs bg-red-700 hover:bg-red-600 rounded"
      >
        Error
      </button>
      <button 
        @click="generateObject"
        class="px-2 py-1 text-xs bg-purple-700 hover:bg-purple-600 rounded"
      >
        Object
      </button>
    </div>

    <div 
      ref="messagesContainer"
      class="flex-1 p-2 overflow-y-auto console-messages"
      @scroll="handleScroll"
    >
      <div v-if="allMessages.length === 0" class="text-gray-500 h-full flex items-center justify-center">
        <div class="text-center">
          <div class="i-mdi-console text-4xl mx-auto mb-2"></div>
          <p>// Console output will appear here</p>
          <p class="text-xs mt-1">Try logging something in the browser console</p>
        </div>
      </div>
      <ConsoleMessage
        v-else
        v-for="(msg, index) in allMessages"
        :key="index"
        :message="msg"
      />
    </div>
    
    <footer class="flex-shrink-0 px-2 py-1 text-xs border-t border-gray-700 bg-gray-800 text-gray-400 flex justify-between">
      <div>{{ allMessages.length }} messages</div>
      <div>
        <button 
          v-if="!autoScroll" 
          @click="scrollToBottom"
          class="text-blue-400 hover:text-blue-300"
        >
          Scroll to bottom
        </button>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.console-messages {
  scrollbar-width: thin;
  scrollbar-color: #4B5563 #1F2937;
}

.console-messages::-webkit-scrollbar {
  width: 6px;
}

.console-messages::-webkit-scrollbar-track {
  background: #1F2937;
}

.console-messages::-webkit-scrollbar-thumb {
  background-color: #4B5563;
  border-radius: 3px;
}
</style>