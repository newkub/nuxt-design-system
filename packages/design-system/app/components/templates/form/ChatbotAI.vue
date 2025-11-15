<script setup lang="ts">
interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

interface Props {
  title?: string
  placeholder?: string
  suggestions?: string[]
}

const props = withDefaults(defineProps<Props>(), {
  title: 'AI Assistant',
  placeholder: 'Ask me anything...',
  suggestions: () => ['How can I help you?', 'Tell me about...', 'Explain this...']
})

const emit = defineEmits<{
  sendMessage: [message: string]
}>()

const messages = ref<Message[]>([
  {
    id: '1',
    role: 'assistant',
    content: 'Hello! How can I help you today?',
    timestamp: new Date()
  }
])

const input = ref('')
const loading = ref(false)
const chatContainer = ref<HTMLElement | null>(null)

const sendMessage = async () => {
  if (!input.value.trim() || loading.value) return

  const userMessage: Message = {
    id: Date.now().toString(),
    role: 'user',
    content: input.value,
    timestamp: new Date()
  }

  messages.value.push(userMessage)
  emit('sendMessage', input.value)
  
  const messageText = input.value
  input.value = ''
  loading.value = true

  // Simulate AI response
  setTimeout(() => {
    const aiMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: `I received your message: "${messageText}". This is a demo response. In a real implementation, this would be connected to an AI API like OpenAI, Anthropic, or Google AI.`,
      timestamp: new Date()
    }
    messages.value.push(aiMessage)
    loading.value = false
    scrollToBottom()
  }, 1000)

  scrollToBottom()
}

const scrollToBottom = () => {
  nextTick(() => {
    if (chatContainer.value) {
      chatContainer.value.scrollTop = chatContainer.value.scrollHeight
    }
  })
}

const useSuggestion = (suggestion: string) => {
  input.value = suggestion
  sendMessage()
}

const formatTime = (date: Date) => {
  return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
}
</script>

<template>
  <div class="chatbot-ai">
    <!-- Header -->
    <div class="chat-header">
      <div class="flex items-center gap-3">
        <div class="avatar">
          <div class="i-mdi-robot w-6 h-6 text-blue-600" />
        </div>
        <div>
          <h3 class="header-title">{{ title }}</h3>
          <span class="header-status">● Online</span>
        </div>
      </div>
      <button class="header-btn">
        <div class="i-mdi-dots-vertical w-5 h-5" />
      </button>
    </div>

    <!-- Messages -->
    <div ref="chatContainer" class="chat-messages">
      <div
        v-for="message in messages"
        :key="message.id"
        :class="['message', message.role]"
      >
        <div v-if="message.role === 'assistant'" class="message-avatar">
          <div class="i-mdi-robot w-5 h-5" />
        </div>
        
        <div class="message-content">
          <div class="message-bubble">
            {{ message.content }}
          </div>
          <span class="message-time">{{ formatTime(message.timestamp) }}</span>
        </div>

        <div v-if="message.role === 'user'" class="message-avatar user">
          <div class="i-mdi-account w-5 h-5" />
        </div>
      </div>

      <div v-if="loading" class="message assistant">
        <div class="message-avatar">
          <div class="i-mdi-robot w-5 h-5" />
        </div>
        <div class="message-content">
          <div class="message-bubble typing">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
    </div>

    <!-- Suggestions -->
    <div v-if="messages.length === 1" class="chat-suggestions">
      <button
        v-for="(suggestion, i) in suggestions"
        :key="i"
        class="suggestion-chip"
        @click="useSuggestion(suggestion)"
      >
        {{ suggestion }}
      </button>
    </div>

    <!-- Input -->
    <div class="chat-input-container">
      <textarea
        v-model="input"
        :placeholder="placeholder"
        class="chat-input"
        rows="1"
        @keydown.enter.prevent="sendMessage"
      />
      <button
        :disabled="!input.trim() || loading"
        class="send-btn"
        @click="sendMessage"
      >
        <div class="i-mdi-send w-5 h-5" />
      </button>
    </div>
  </div>
</template>

<style scoped>
.chatbot-ai {
  @apply flex flex-col h-[600px] max-w-2xl mx-auto bg-white rounded-lg border border-gray-200 overflow-hidden;
}

.chat-header {
  @apply flex items-center justify-between p-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-purple-50;
}

.avatar {
  @apply w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center;
}

.header-title {
  @apply font-semibold text-gray-900;
}

.header-status {
  @apply text-xs text-green-600;
}

.header-btn {
  @apply p-2 hover:bg-white/50 rounded transition-colors;
}

.chat-messages {
  @apply flex-1 overflow-y-auto p-4 space-y-4;
}

.message {
  @apply flex gap-2 items-end;
}

.message.user {
  @apply flex-row-reverse;
}

.message-avatar {
  @apply w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 text-blue-600;
}

.message-avatar.user {
  @apply bg-gray-100 text-gray-600;
}

.message-content {
  @apply flex flex-col gap-1 max-w-[70%];
}

.message.user .message-content {
  @apply items-end;
}

.message-bubble {
  @apply px-4 py-2 rounded-2xl;
}

.message.assistant .message-bubble {
  @apply bg-gray-100 text-gray-900 rounded-tl-sm;
}

.message.user .message-bubble {
  @apply bg-blue-600 text-white rounded-tr-sm;
}

.message-bubble.typing {
  @apply flex gap-1 items-center py-3;
}

.message-bubble.typing span {
  @apply w-2 h-2 bg-gray-400 rounded-full animate-bounce;
  animation-delay: calc(var(--i) * 0.1s);
}

.message-bubble.typing span:nth-child(1) { --i: 0; }
.message-bubble.typing span:nth-child(2) { --i: 1; animation-delay: 0.1s; }
.message-bubble.typing span:nth-child(3) { --i: 2; animation-delay: 0.2s; }

.message-time {
  @apply text-xs text-gray-500;
}

.chat-suggestions {
  @apply flex flex-wrap gap-2 px-4 pb-4;
}

.suggestion-chip {
  @apply px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full text-sm hover:bg-blue-100 transition-colors;
}

.chat-input-container {
  @apply flex gap-2 p-4 border-t border-gray-200;
}

.chat-input {
  @apply flex-1 px-4 py-2 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none;
}

.send-btn {
  @apply p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors;
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
}

.animate-bounce {
  animation: bounce 1s ease-in-out infinite;
}
</style>
