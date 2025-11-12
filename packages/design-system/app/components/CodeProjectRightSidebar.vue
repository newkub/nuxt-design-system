<template>
  <div class="flex flex-col h-full w-full">
    <div class="flex-1 overflow-y-auto relative h-full">
      <AIChat
        v-show="activeTabs['right-sidebar'] === 'chat'"
        :chat-id="chatId"
        :messages="messages"
        :is-loading="chatIsLoading"
        :message-queue="messageQueue"
        @send-message="handleSendMessage"
        @remove-from-queue="handleRemoveFromQueue"
        @update:messagesContainer="handleUpdateContainer"
        class="h-full w-full"
      />
      <Git
        v-show="activeTabs['right-sidebar'] === 'git-sidebar'"
        class="h-full w-full"
      />
      <!-- Add a fallback for when no tab is active or matches -->
      <div
        v-show="(!activeTabs['right-sidebar'] || !['chat', 'git-sidebar'].includes(activeTabs['right-sidebar']))"
        class="h-full w-full flex items-center justify-center text-gray-500"
      >
        <p>Select a sidebar tab to view content</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent } from "vue";
import AIChat from "~/components/chat/AIChat.vue";
import type { ChatMessage, QueuedMessage } from "~/types/chat";

// Async components for better performance
const Git = defineAsyncComponent(() => import("~/components/code/Git.vue"));

// Props
interface Props {
	activeTabs: Record<string, string>;
	chatId: string;
	messages: ChatMessage[];
	chatIsLoading: boolean;
	messageQueue: QueuedMessage[];
}

const props = defineProps<Props>();

// Emits
const emit = defineEmits<{
	"send-message": [
		payload: {
			content: string;
			chatId?: string;
			replyContext?: ChatMessage | null;
		},
	];
	"remove-from-queue": [id: string];
	"update-container": [el: HTMLElement];
}>();

// Event handlers
const handleSendMessage = (payload: {
	content: string;
	chatId?: string;
	replyContext?: ChatMessage | null;
}) => emit("send-message", payload);
const handleRemoveFromQueue = (id: string) => emit("remove-from-queue", id);
const handleUpdateContainer = (el: HTMLElement) => emit("update-container", el);
</script>
