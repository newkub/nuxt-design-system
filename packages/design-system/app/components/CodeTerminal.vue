<script setup lang="ts">
// Use terminal composable
const {
	sessions,
	activeSessionId,
	currentCommand,
	currentProfile,
	activeSession,
	handleCommand,
	handleKeydown,
	createNewSession,
	closeSession,
	copyAll,
	copySelection,
} = useTerminal();

// Template refs
const terminalBody = ref<HTMLElement | null>(null);
const inputRef = ref<HTMLInputElement | null>(null);

// Scroll to bottom of terminal
async function scrollToBottom() {
	await nextTick();
	if (terminalBody.value) {
		terminalBody.value.scrollTop = terminalBody.value.scrollHeight;
	}
}

// Focus input
function focusInput() {
	inputRef.value?.focus();
}

// Handle close session with event
function handleCloseSession(sessionId: string, event: Event) {
	event.stopPropagation();
	closeSession(sessionId);
}

// Handle command with scroll
function handleCommandWithScroll() {
	handleCommand();
	scrollToBottom();
}

// Handle keydown with scroll
function handleKeydownWithScroll(e: KeyboardEvent) {
	handleKeydown(e);
	if (e.key === "Enter") {
		scrollToBottom();
	}
}

onMounted(() => {
	focusInput();
});
</script>

<template>
  <div class="h-full w-full relative flex flex-col">
    <!-- Terminal header with tabs -->
    <div class="flex justify-between items-center border-b border-gray-700 bg-gray-800">
      <!-- Tabs on the left -->
      <div class="flex overflow-x-auto">
        <div
          v-for="session in sessions"
          :key="session.id"
          :class="[
            'flex items-center px-4 py-2 text-sm cursor-pointer border-r border-gray-700 relative group',
            activeSessionId === session.id 
              ? 'bg-gray-900 text-white' 
              : 'bg-gray-800 text-gray-300 hover:bg-gray-750'
          ]"
          @click="activeSessionId = session.id"
        >
          <span class="mr-2">❯</span>
          <span class="truncate max-w-[120px]">{{ session.name }}</span>
          <button
            v-if="sessions.length > 1"
            class="ml-2 text-gray-400 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity"
            @click="handleCloseSession(session.id, $event)"
          >
            ×
          </button>
        </div>
      </div>
      
      <!-- Controls on the right -->
      <div class="flex items-center px-2">
        <button 
          class="p-1 text-gray-400 hover:text-white"
          title="Copy terminal content"
          @click="copyAll"
        >
          <div class="i-mdi-console-line text-current" />
        </button>
        <button 
          class="p-1 text-gray-400 hover:text-white ml-2"
          title="New terminal"
          @click="createNewSession"
        >
          <div class="i-mdi-console-line text-current" />
        </button>
      </div>
    </div>
    
    <!-- Terminal body with dynamic styling -->
    <div 
      :class="[
        'flex-1 overflow-y-auto p-4 font-mono text-sm',
        currentProfile.bg,
        currentProfile.text
      ]"
      ref="terminalBody"
      @contextmenu.prevent="copySelection"
      @click="focusInput"
    >
      <div 
        v-for="(line, index) in activeSession.history" 
        :key="index" 
        class="whitespace-pre-wrap mb-1"
      >
        {{ line }}
      </div>
      <div class="flex items-center mt-1">
        <span :class="currentProfile.prompt">$</span>
        <input
          ref="inputRef"
          v-model="currentCommand"
          type="text"
          :class="[
            'bg-transparent border-none focus:outline-none flex-1 ml-2',
            currentProfile.text
          ]"
          autofocus
          @keydown="handleKeydownWithScroll"
        />
      </div>
    </div>
  </div>
</template>