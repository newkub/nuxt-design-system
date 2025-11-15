<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'
import { useTerminal } from '~/composables/useTerminal'

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
  copyAll
} = useTerminal()

const terminalBody = ref<HTMLElement | null>(null)
const inputRef = ref<HTMLInputElement | null>(null)

const scrollToBottom = async () => {
  await nextTick()
  if (terminalBody.value) {
    terminalBody.value.scrollTop = terminalBody.value.scrollHeight
  }
}

const focusInput = () => {
  inputRef.value?.focus()
}

const handleCloseSession = (sessionId: string, event: Event) => {
  event.stopPropagation()
  closeSession(sessionId)
}

const handleCommandWithScroll = () => {
  handleCommand()
  scrollToBottom()
}

const handleKeydownWithScroll = (e: KeyboardEvent) => {
  handleKeydown(e)
  if (e.key === 'Enter') {
    scrollToBottom()
  }
}

onMounted(() => {
  focusInput()
})
</script>

<template>
  <div class="h-full w-full flex flex-col">
    <!-- Terminal Header -->
    <div class="flex justify-between items-center border-b border-gray-700 bg-gray-800">
      <div class="flex overflow-x-auto">
        <div
          v-for="session in sessions"
          :key="session.id"
          :class="[
            'flex items-center px-4 py-2 text-sm cursor-pointer border-r border-gray-700 group',
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
            class="ml-2 text-gray-400 hover:text-white opacity-0 group-hover:opacity-100"
            @click="handleCloseSession(session.id, $event)"
          >
            ×
          </button>
        </div>
      </div>

      <div class="flex items-center px-2">
        <button
          class="p-2 text-gray-400 hover:text-white"
          title="Copy all"
          @click="copyAll"
        >
          <div class="i-mdi-content-copy w-4 h-4" />
        </button>
        <button
          class="p-2 text-gray-400 hover:text-white"
          title="New terminal"
          @click="createNewSession"
        >
          <div class="i-mdi-plus w-4 h-4" />
        </button>
      </div>
    </div>

    <!-- Terminal Body -->
    <div
      ref="terminalBody"
      :class="[
        'flex-1 overflow-y-auto p-4 font-mono text-sm',
        currentProfile.bg,
        currentProfile.text
      ]"
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