<template>
  <div class="chatbot-wrapper">
    <!-- Toggle Button -->
    <button 
      @click="toggleChat" 
      class="chat-toggle"
      :class="{ 'chat-open': isOpen }"
    >
      <svg v-if="!isOpen" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
      <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>

    <!-- Chat Window -->
    <Transition name="chat-slide">
      <div v-if="isOpen" class="chat-window">
        <!-- Header -->
        <div class="chat-header">
          <div class="flex items-center gap-3">
            <div class="pulse-dot"></div>
            <span class="font-serif text-sage-light">Ask me anything</span>
          </div>
        </div>

        <!-- Messages -->
        <div ref="messagesContainer" class="chat-messages">
          <div 
            v-for="(msg, index) in messages" 
            :key="index"
            class="message"
            :class="msg.role"
          >
            <div class="message-content">
              <p>{{ msg.content }}</p>
            </div>
          </div>
          
          <!-- Typing indicator -->
          <div v-if="isTyping" class="message assistant">
            <div class="message-content typing">
              <span class="dot"></span>
              <span class="dot"></span>
              <span class="dot"></span>
            </div>
          </div>
        </div>

        <!-- Input -->
        <form @submit.prevent="sendMessage" class="chat-input">
          <input 
            v-model="userInput"
            type="text"
            placeholder="Type your message..."
            :disabled="isTyping"
            class="input-field"
          />
          <button 
            type="submit" 
            :disabled="!userInput.trim() || isTyping"
            class="send-btn"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </form>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, nextTick, onMounted } from 'vue'

const isOpen = ref(false)
const isTyping = ref(false)
const userInput = ref('')
const messagesContainer = ref(null)
const chatId = ref(`chat_${Date.now()}`)

const messages = ref([
  { role: 'assistant', content: "Hello! I'm Gad's AI assistant. Ask me about his research, publications, or anything else!" }
])

const API_URL = 'https://web-production-d7d37.up.railway.app/query'
const API_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMTE3IiwiZXhwIjoxNzY5MTE5MTk0fQ.4BWXrMwzhrDrt6A--B_jqLkUoHxYFA-76vETbinUgvA'

const toggleChat = () => {
  isOpen.value = !isOpen.value
}

const scrollToBottom = async () => {
  await nextTick()
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
  }
}

const sendMessage = async () => {
  const query = userInput.value.trim()
  if (!query || isTyping.value) return

  messages.value.push({ role: 'user', content: query })
  userInput.value = ''
  isTyping.value = true
  scrollToBottom()

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query: query,
        chat_id: chatId.value
      })
    })

    const data = await response.json()
    
    if (data.success && data.response) {
      messages.value.push({ role: 'assistant', content: data.response })
    } else {
      messages.value.push({ role: 'assistant', content: "I couldn't process that request. Please try again." })
    }
  } catch (error) {
    console.error('Chat error:', error)
    messages.value.push({ role: 'assistant', content: "Sorry, I'm having trouble connecting. Please try again later." })
  } finally {
    isTyping.value = false
    scrollToBottom()
  }
}
</script>

<style scoped>
.chatbot-wrapper {
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 1000;
}

.chat-toggle {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: linear-gradient(135deg, #4a5d4a 0%, #2d3a2d 100%);
  border: 1px solid rgba(138, 154, 138, 0.3);
  color: #c4d4c4;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
}

.chat-toggle:hover {
  transform: scale(1.05);
  box-shadow: 0 6px 25px rgba(0, 0, 0, 0.5);
}

.chat-toggle.chat-open {
  background: linear-gradient(135deg, #3d4a3d 0%, #252d25 100%);
}

.chat-window {
  position: absolute;
  bottom: 70px;
  right: 0;
  width: 380px;
  height: 500px;
  background: linear-gradient(180deg, #1a1f1a 0%, #141814 100%);
  border: 1px solid rgba(138, 154, 138, 0.2);
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
}

.chat-header {
  padding: 16px 20px;
  background: rgba(45, 58, 45, 0.5);
  border-bottom: 1px solid rgba(138, 154, 138, 0.15);
}

.pulse-dot {
  width: 8px;
  height: 8px;
  background: #8a9a8a;
  border-radius: 50%;
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 0.4; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.2); }
}

.chat-messages {
  flex: 1;
  overflow-y: auto;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.message {
  display: flex;
  animation: fadeSlideIn 0.3s ease;
}

@keyframes fadeSlideIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.message.user {
  justify-content: flex-end;
}

.message.assistant {
  justify-content: flex-start;
}

.message-content {
  max-width: 80%;
  padding: 10px 14px;
  border-radius: 12px;
  font-size: 14px;
  line-height: 1.5;
}

.message.user .message-content {
  background: linear-gradient(135deg, #4a5d4a 0%, #3d4a3d 100%);
  color: #e8f0e8;
  border-bottom-right-radius: 4px;
}

.message.assistant .message-content {
  background: rgba(45, 58, 45, 0.4);
  color: #c4d4c4;
  border: 1px solid rgba(138, 154, 138, 0.15);
  border-bottom-left-radius: 4px;
}

.message-content.typing {
  display: flex;
  gap: 4px;
  padding: 14px 18px;
}

.typing .dot {
  width: 6px;
  height: 6px;
  background: #8a9a8a;
  border-radius: 50%;
  animation: typingBounce 1.4s ease-in-out infinite;
}

.typing .dot:nth-child(2) {
  animation-delay: 0.2s;
}

.typing .dot:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes typingBounce {
  0%, 60%, 100% { transform: translateY(0); }
  30% { transform: translateY(-6px); }
}

.chat-input {
  padding: 12px 16px;
  background: rgba(45, 58, 45, 0.3);
  border-top: 1px solid rgba(138, 154, 138, 0.15);
  display: flex;
  gap: 8px;
}

.input-field {
  flex: 1;
  padding: 10px 14px;
  background: rgba(20, 24, 20, 0.8);
  border: 1px solid rgba(138, 154, 138, 0.2);
  border-radius: 8px;
  color: #e8f0e8;
  font-size: 14px;
  outline: none;
  transition: border-color 0.2s;
}

.input-field::placeholder {
  color: #6b7b6b;
}

.input-field:focus {
  border-color: rgba(138, 154, 138, 0.5);
}

.send-btn {
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #4a5d4a 0%, #3d4a3d 100%);
  border: 1px solid rgba(138, 154, 138, 0.3);
  border-radius: 8px;
  color: #c4d4c4;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
}

.send-btn:hover:not(:disabled) {
  background: linear-gradient(135deg, #5a6d5a 0%, #4a5d4a 100%);
}

.send-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Transition animations */
.chat-slide-enter-active,
.chat-slide-leave-active {
  transition: all 0.3s ease;
}

.chat-slide-enter-from,
.chat-slide-leave-to {
  opacity: 0;
  transform: translateY(20px) scale(0.95);
}

/* Scrollbar styling */
.chat-messages::-webkit-scrollbar {
  width: 6px;
}

.chat-messages::-webkit-scrollbar-track {
  background: transparent;
}

.chat-messages::-webkit-scrollbar-thumb {
  background: rgba(138, 154, 138, 0.3);
  border-radius: 3px;
}

/* Mobile responsive */
@media (max-width: 480px) {
  .chatbot-wrapper {
    bottom: 16px;
    right: 16px;
  }
  
  .chat-window {
    width: calc(100vw - 32px);
    height: 60vh;
    right: -8px;
  }
}
</style>
