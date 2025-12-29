<template>
  <div class="chatbot-wrapper">
    <!-- Toggle Button -->
    <button 
      @click="toggleChat" 
      class="chat-toggle"
      :class="{ 'chat-open': isOpen }"
      :title="isOpen ? 'Close Thoth' : 'Chat with Thoth'"
    >
      <div v-if="!isOpen" class="thoth-icon">𓂀</div>
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
            <div class="thoth-avatar">𓂀</div>
            <div class="header-info">
              <span class="thoth-name">Thoth</span>
              <span class="thoth-status">
                <span class="status-dot"></span>
                Gad's AI Assistant
              </span>
            </div>
          </div>
          <button @click="clearChat" class="clear-btn" title="Clear chat history">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>

        <!-- Messages -->
        <div ref="messagesContainer" class="chat-messages">
          <!-- Welcome message with hints -->
          <div v-if="messages.length <= 1" class="welcome-section">
            <div class="welcome-icon">𓂀</div>
            <h3 class="welcome-title">{{ t('chat.welcome') }}</h3>
            <p class="welcome-subtitle">{{ t('chat.subtitle') }}</p>
            
            <div class="capability-hints">
              <button @click="useHint(`Tell me about Gad's research`)" class="hint-chip">
                <span class="hint-icon">🔬</span>
                {{ t('chat.askAbout') }}
              </button>
              <button @click="useHint('Save this to memory: ')" class="hint-chip">
                <span class="hint-icon">💾</span>
                {{ t('chat.saveMemory') }}
              </button>
              <button @click="useHint('Send an SMS to Gad saying: ')" class="hint-chip">
                <span class="hint-icon">📱</span>
                {{ t('chat.sendSms') }}
              </button>
            </div>
          </div>

          <div 
            v-for="(msg, index) in messages" 
            :key="index"
            class="message"
            :class="msg.role"
          >
            <div v-if="msg.role === 'assistant'" class="message-avatar">𓂀</div>
            <div class="message-content">
              <p>{{ msg.content }}</p>
            </div>
          </div>
          
          <!-- Typing indicator -->
          <div v-if="isTyping" class="message assistant">
            <div class="message-avatar">𓂀</div>
            <div class="message-content typing">
              <span class="dot"></span>
              <span class="dot"></span>
              <span class="dot"></span>
            </div>
          </div>
        </div>

        <!-- Quick Actions -->
        <div class="quick-actions" v-if="!isTyping && messages.length > 1">
          <button @click="useHint(`What are Gad's publications?`)" class="quick-btn">{{ t('chat.publications') }}</button>
          <button @click="useHint('What is ThothCraft?')" class="quick-btn">{{ t('chat.thothcraft') }}</button>
          <button @click="useHint('Contact Gad')" class="quick-btn">{{ t('chat.contactBtn') }}</button>
        </div>

        <!-- Input -->
        <form @submit.prevent="sendMessage" class="chat-input">
          <input 
            v-model="userInput"
            type="text"
            :placeholder="t('chat.placeholder')"
            :disabled="isTyping || isListening"
            class="input-field"
            ref="inputField"
          />
          <!-- Voice Input Button -->
          <button 
            type="button"
            @click="toggleVoiceInput"
            :class="['voice-btn', { 'listening': isListening }]"
            :disabled="isTyping"
            :title="isListening ? 'Stop listening' : 'Voice input'"
          >
            <svg v-if="!isListening" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
            </svg>
            <div v-else class="listening-indicator">
              <span class="pulse-ring"></span>
              <span class="pulse-ring delay-1"></span>
              <span class="pulse-ring delay-2"></span>
            </div>
          </button>
          <!-- TTS Toggle Button -->
          <button 
            type="button"
            @click="toggleTTS"
            :class="['tts-btn', { 'active': ttsEnabled }]"
            :title="ttsEnabled ? 'Disable voice responses' : 'Enable voice responses'"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
            </svg>
          </button>
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
import { ref, nextTick, onMounted, onUnmounted, watch, computed } from 'vue'
import { useRoute } from 'vue-router'
import { getSiteContext } from '@/composables/useSiteContext'
import { useI18n, SUPPORTED_LANGUAGES as I18N_LANGUAGES } from '@/composables/useI18n'

const route = useRoute()
const { t, currentLanguage: websiteLanguage } = useI18n()

// Get language name from website language setting
const getWebsiteLanguageName = () => {
  const lang = I18N_LANGUAGES.find(l => l.code === websiteLanguage.value)
  return lang ? lang.name : 'English'
}

const isOpen = ref(false)
const siteContext = ref(null)
const isTyping = ref(false)
const userInput = ref('')
const messagesContainer = ref(null)

// Global chat ID - same for all visitors to share conversation
const GLOBAL_CHAT_ID = 'gad_website_global_chat'
const STORAGE_KEY = 'gad_chatbot_messages'

const defaultMessage = { role: 'assistant', content: "Hello! I'm Thoth, Gad's AI assistant. I can help you learn about Gad's research, save information to my memory, or even send him an SMS. What would you like to know?" }

const inputField = ref(null)

// Voice Input (Speech-to-Text)
const isListening = ref(false)
let recognition = null

// Text-to-Speech
const ttsEnabled = ref(false)
const synth = typeof window !== 'undefined' ? window.speechSynthesis : null

// Speech code mapping for TTS based on website language
const getSpeechCode = () => {
  const codes = { en: 'en-US', fr: 'fr-FR', ar: 'ar-SA', zh: 'zh-CN' }
  return codes[websiteLanguage.value] || 'en-US'
}

// Proactive Engagement
let inactivityTimer = null
let proactiveShown = ref(false)
const INACTIVITY_DELAY = 30000 // 30 seconds

// Context-aware suggestions based on current page
const getPageContext = () => {
  const path = route.path
  if (path === '/' || path === '/home') {
    return { page: 'Home', suggestion: "I see you're on the home page. Would you like to learn about Gad's research areas or recent publications?" }
  } else if (path === '/research') {
    return { page: 'Research', suggestion: "I see you're exploring Gad's research. Want to know more about ISAC, Federated Learning, or Quantum Networks?" }
  } else if (path === '/publications') {
    return { page: 'Publications', suggestion: "Looking at publications? I can help you find specific papers or explain Gad's key contributions." }
  } else if (path === '/contact') {
    return { page: 'Contact', suggestion: "Want to reach Gad? I can send him an SMS right now, or you can book an appointment!" }
  }
  return { page: 'Unknown', suggestion: "How can I help you learn about Gad today?" }
}

// Initialize Speech Recognition
const initSpeechRecognition = () => {
  if (typeof window === 'undefined') return false
  
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
  if (!SpeechRecognition) {
    console.warn('Speech recognition not supported in this browser')
    return false
  }
  
  try {
    recognition = new SpeechRecognition()
    recognition.continuous = false
    recognition.interimResults = true
    recognition.maxAlternatives = 1
    recognition.lang = 'en-US'
    
    recognition.onresult = (event) => {
      const results = event.results
      const lastResult = results[results.length - 1]
      const transcript = lastResult[0].transcript
      
      console.log('Transcript:', transcript, 'Final:', lastResult.isFinal)
      userInput.value = transcript
      
      if (lastResult.isFinal) {
        isListening.value = false
      }
    }
    
    recognition.onend = () => {
      console.log('Recognition ended')
      if (isListening.value) {
        isListening.value = false
      }
    }
    
    recognition.onerror = (event) => {
      console.error('Speech error:', event.error)
      isListening.value = false
      
      if (event.error === 'not-allowed') {
        alert('Microphone access was denied. Please allow microphone access and try again.')
      } else if (event.error === 'no-speech') {
        // Silent timeout - just stop
      } else if (event.error === 'audio-capture') {
        alert('No microphone detected. Please connect a microphone.')
      }
    }
    
    recognition.onaudiostart = () => {
      console.log('Audio capture started')
    }
    
    return true
  } catch (e) {
    console.error('Failed to create SpeechRecognition:', e)
    return false
  }
}

const toggleVoiceInput = async () => {
  // If already listening, stop
  if (isListening.value && recognition) {
    recognition.stop()
    isListening.value = false
    return
  }
  
  // Initialize if needed
  if (!recognition) {
    const success = initSpeechRecognition()
    if (!success) {
      alert('Voice input is not supported in your browser. Please use Chrome, Edge, or Safari.')
      return
    }
  }
  
  // Set language based on current selection
  const langConfig = getCurrentLanguageConfig()
  recognition.lang = langConfig.speechCode
  
  // Clear input and start
  userInput.value = ''
  
  try {
    recognition.start()
    isListening.value = true
    console.log('Started listening in', langConfig.speechCode)
  } catch (e) {
    console.error('Start error:', e)
    // May already be running, abort and retry
    try {
      recognition.abort()
      setTimeout(() => {
        recognition.start()
        isListening.value = true
      }, 100)
    } catch (e2) {
      console.error('Retry failed:', e2)
      isListening.value = false
    }
  }
}

// Text-to-Speech
const toggleTTS = () => {
  ttsEnabled.value = !ttsEnabled.value
  if (ttsEnabled.value) {
    speak("Voice responses enabled. I'll read my messages aloud.")
  }
}

const speak = (text) => {
  if (!synth || !ttsEnabled.value) return
  
  // Cancel any ongoing speech
  synth.cancel()
  
  const utterance = new SpeechSynthesisUtterance(text)
  utterance.rate = 1.0
  utterance.pitch = 1.0
  utterance.volume = 1.0
  
  // Try to use a nice voice
  const voices = synth.getVoices()
  const preferredVoice = voices.find(v => v.name.includes('Google') || v.name.includes('Samantha') || v.name.includes('Daniel'))
  if (preferredVoice) {
    utterance.voice = preferredVoice
  }
  
  synth.speak(utterance)
}

// Proactive Engagement
const startInactivityTimer = () => {
  clearInactivityTimer()
  if (proactiveShown.value || isOpen.value) return
  
  inactivityTimer = setTimeout(() => {
    if (!isOpen.value && !proactiveShown.value) {
      showProactiveMessage()
    }
  }, INACTIVITY_DELAY)
}

const clearInactivityTimer = () => {
  if (inactivityTimer) {
    clearTimeout(inactivityTimer)
    inactivityTimer = null
  }
}

const showProactiveMessage = async () => {
  proactiveShown.value = true
  isOpen.value = true
  
  const context = getPageContext()
  
  // Call AI to generate a unique, bold, poetic message
  try {
    isTyping.value = true
    scrollToBottom()
    
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query: `Generate a proactive greeting for a visitor on the ${context.page} page. Be bold, poetic, and philosophical like Gad's blog style. Reference: "God, delete my data now" - that level of boldness. Make it unique and thought-provoking. Keep it under 2 sentences.`,
        chat_id: GLOBAL_CHAT_ID,
        context: { page: context.page, ...siteContext.value },
        language: websiteLanguage.value,
        language_name: getWebsiteLanguageName(),
        is_proactive: true
      })
    })

    const data = await response.json()
    
    if (data.success && data.response) {
      messages.value.push({ role: 'assistant', content: `👋 ${data.response}` })
      speak(data.response)
    } else {
      // Fallback to context suggestion if AI fails
      messages.value.push({ role: 'assistant', content: `👋 ${context.suggestion}` })
      speak(context.suggestion)
    }
  } catch (error) {
    console.error('Proactive message error:', error)
    // Fallback to context suggestion
    messages.value.push({ role: 'assistant', content: `👋 ${context.suggestion}` })
    speak(context.suggestion)
  } finally {
    isTyping.value = false
    scrollToBottom()
  }
}

// Reset inactivity timer on user activity
const resetInactivityTimer = () => {
  proactiveShown.value = false
  startInactivityTimer()
}

const useHint = (hint) => {
  userInput.value = hint
  nextTick(() => {
    if (inputField.value) {
      inputField.value.focus()
    }
  })
}

const clearChat = () => {
  messages.value = [defaultMessage]
  localStorage.removeItem(STORAGE_KEY)
}

// Load messages from localStorage or use default
const loadMessages = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      const parsed = JSON.parse(stored)
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed
      }
    }
  } catch (e) {
    console.error('Failed to load chat history:', e)
  }
  return [defaultMessage]
}

// Save messages to localStorage (limit to 50 messages)
const MAX_MESSAGES = 50
const saveMessages = () => {
  try {
    // Keep only the last 50 messages
    const toSave = messages.value.slice(-MAX_MESSAGES)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave))
  } catch (e) {
    console.error('Failed to save chat history:', e)
  }
}

const messages = ref(loadMessages())

// Watch for message changes and persist
watch(messages, saveMessages, { deep: true })

const API_URL = import.meta.env.DEV 
  ? '/api/chat' 
  : 'https://web-production-80b7.up.railway.app/query'
const API_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMTE3IiwiZXhwIjoxNzY5Mzc4MjgzfQ.lo9eqn6ZIS4pqFA7K8tzf2J80rtSjB96syaOcbVVH8E'

const toggleChat = async () => {
  isOpen.value = !isOpen.value
  // Load site context when chat is opened for the first time
  if (isOpen.value && !siteContext.value) {
    siteContext.value = await getSiteContext()
  }
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
        chat_id: GLOBAL_CHAT_ID,
        context: siteContext.value || {},
        language: websiteLanguage.value,
        language_name: getWebsiteLanguageName()
      })
    })

    const data = await response.json()
    
    if (data.success && data.response) {
      messages.value.push({ role: 'assistant', content: data.response })
      // Speak the response if TTS is enabled
      speak(data.response)
    } else {
      const errorMsg = "I couldn't process that request. Please try again."
      messages.value.push({ role: 'assistant', content: errorMsg })
      speak(errorMsg)
    }
  } catch (error) {
    console.error('Chat error:', error)
    const errorMsg = "Sorry, I'm having trouble connecting. Please try again later."
    messages.value.push({ role: 'assistant', content: errorMsg })
    speak(errorMsg)
  } finally {
    isTyping.value = false
    scrollToBottom()
  }
}

// Lifecycle hooks
onMounted(() => {
  // Initialize speech recognition
  initSpeechRecognition()
  
  // Start proactive engagement timer
  startInactivityTimer()
  
  // Listen for user activity to reset timer
  document.addEventListener('mousemove', resetInactivityTimer)
  document.addEventListener('keypress', resetInactivityTimer)
  document.addEventListener('scroll', resetInactivityTimer)
  document.addEventListener('click', resetInactivityTimer)
})

onUnmounted(() => {
  clearInactivityTimer()
  document.removeEventListener('mousemove', resetInactivityTimer)
  document.removeEventListener('keypress', resetInactivityTimer)
  document.removeEventListener('scroll', resetInactivityTimer)
  document.removeEventListener('click', resetInactivityTimer)
  
  // Stop any ongoing speech
  if (synth) {
    synth.cancel()
  }
})

// Watch for route changes to update context
watch(() => route.path, () => {
  // Reset proactive shown when navigating to new page
  proactiveShown.value = false
  startInactivityTimer()
})
</script>

<style scoped>
.chatbot-wrapper {
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 1000;
}

.chat-toggle {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: linear-gradient(135deg, #2dd4bf 0%, #14b8a6 100%);
  border: 2px solid rgba(94, 234, 212, 0.4);
  color: #0d1117;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 20px rgba(45, 212, 191, 0.4), 0 0 40px rgba(45, 212, 191, 0.2);
}

.chat-toggle:hover {
  transform: scale(1.08);
  box-shadow: 0 6px 30px rgba(45, 212, 191, 0.5), 0 0 50px rgba(45, 212, 191, 0.3);
}

.chat-toggle.chat-open {
  background: linear-gradient(135deg, #14b8a6 0%, #0d9488 100%);
}

.thoth-icon {
  font-size: 28px;
  filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3));
}

.chat-window {
  position: absolute;
  bottom: 70px;
  right: 0;
  width: 380px;
  height: 500px;
  background: rgba(22, 27, 34, 0.95);
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  border: 1px solid rgba(48, 54, 61, 0.8);
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
}

.chat-header {
  padding: 14px 16px;
  background: linear-gradient(135deg, rgba(45, 212, 191, 0.15) 0%, rgba(20, 184, 166, 0.1) 100%);
  border-bottom: 1px solid rgba(48, 54, 61, 0.8);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.thoth-avatar {
  width: 36px;
  height: 36px;
  background: linear-gradient(135deg, #2dd4bf 0%, #14b8a6 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  box-shadow: 0 2px 8px rgba(45, 212, 191, 0.3);
}

.header-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.thoth-name {
  font-weight: 600;
  color: #e6edf3;
  font-size: 15px;
}

.thoth-status {
  font-size: 11px;
  color: #8b949e;
  display: flex;
  align-items: center;
  gap: 6px;
}

.status-dot {
  width: 6px;
  height: 6px;
  background: #2dd4bf;
  border-radius: 50%;
  animation: pulse 2s ease-in-out infinite;
}

/* Language Selector */
.language-selector {
  position: relative;
}

.lang-btn {
  width: 32px;
  height: 32px;
  background: rgba(48, 54, 61, 0.5);
  border: 1px solid rgba(48, 54, 61, 0.8);
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.lang-btn:hover {
  background: rgba(45, 212, 191, 0.2);
  border-color: rgba(45, 212, 191, 0.4);
}

.lang-flag {
  font-size: 16px;
}

.lang-menu {
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 8px;
  background: rgba(22, 27, 34, 0.98);
  border: 1px solid rgba(48, 54, 61, 0.8);
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
  z-index: 100;
  min-width: 140px;
}

.lang-option {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  padding: 10px 14px;
  background: transparent;
  border: none;
  color: #e6edf3;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.2s;
  text-align: left;
}

.lang-option:hover {
  background: rgba(45, 212, 191, 0.15);
}

.lang-option.active {
  background: rgba(45, 212, 191, 0.2);
  color: #2dd4bf;
}

.lang-name {
  flex: 1;
}

/* Dropdown animation */
.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.2s ease;
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

.clear-btn {
  padding: 6px;
  background: rgba(48, 54, 61, 0.5);
  border: 1px solid rgba(48, 54, 61, 0.8);
  border-radius: 6px;
  color: #8b949e;
  cursor: pointer;
  transition: all 0.2s;
}

.clear-btn:hover {
  background: rgba(248, 81, 73, 0.2);
  border-color: rgba(248, 81, 73, 0.4);
  color: #f85149;
}

@keyframes pulse {
  0%, 100% { opacity: 0.6; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.3); }
}

/* Welcome Section */
.welcome-section {
  text-align: center;
  padding: 20px 10px;
}

.welcome-icon {
  font-size: 48px;
  margin-bottom: 12px;
  filter: drop-shadow(0 4px 8px rgba(45, 212, 191, 0.3));
}

.welcome-title {
  font-size: 18px;
  font-weight: 600;
  color: #e6edf3;
  margin-bottom: 4px;
}

.welcome-subtitle {
  font-size: 13px;
  color: #8b949e;
  margin-bottom: 20px;
}

.capability-hints {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.hint-chip {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 14px;
  background: rgba(48, 54, 61, 0.4);
  border: 1px solid rgba(48, 54, 61, 0.8);
  border-radius: 10px;
  color: #e6edf3;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.2s;
  text-align: left;
}

.hint-chip:hover {
  background: rgba(45, 212, 191, 0.15);
  border-color: rgba(45, 212, 191, 0.4);
}

.hint-icon {
  font-size: 16px;
}

/* Quick Actions */
.quick-actions {
  display: flex;
  gap: 6px;
  padding: 8px 12px;
  border-top: 1px solid rgba(48, 54, 61, 0.5);
  overflow-x: auto;
}

.quick-btn {
  padding: 6px 12px;
  background: rgba(48, 54, 61, 0.4);
  border: 1px solid rgba(48, 54, 61, 0.8);
  border-radius: 16px;
  color: #8b949e;
  font-size: 12px;
  white-space: nowrap;
  cursor: pointer;
  transition: all 0.2s;
}

.quick-btn:hover {
  background: rgba(45, 212, 191, 0.15);
  border-color: rgba(45, 212, 191, 0.4);
  color: #2dd4bf;
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
  align-items: flex-start;
  gap: 8px;
}

.message-avatar {
  width: 28px;
  height: 28px;
  min-width: 28px;
  background: linear-gradient(135deg, #2dd4bf 0%, #14b8a6 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  box-shadow: 0 2px 6px rgba(45, 212, 191, 0.2);
}

.message-content {
  max-width: 80%;
  padding: 10px 14px;
  border-radius: 12px;
  font-size: 14px;
  line-height: 1.5;
}

.message.user .message-content {
  background: linear-gradient(135deg, #2dd4bf 0%, #14b8a6 100%);
  color: #0d1117;
  border-bottom-right-radius: 4px;
}

.message.assistant .message-content {
  background: rgba(48, 54, 61, 0.6);
  color: #e6edf3;
  border: 1px solid rgba(48, 54, 61, 0.8);
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
  background: #2dd4bf;
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
  background: rgba(13, 17, 23, 0.5);
  border-top: 1px solid rgba(48, 54, 61, 0.8);
  display: flex;
  gap: 8px;
}

.input-field {
  flex: 1;
  padding: 10px 14px;
  background: rgba(48, 54, 61, 0.5);
  border: 1px solid rgba(48, 54, 61, 0.8);
  border-radius: 8px;
  color: #e6edf3;
  font-size: 14px;
  outline: none;
  transition: border-color 0.2s;
}

.input-field::placeholder {
  color: #8b949e;
}

.input-field:focus {
  border-color: rgba(45, 212, 191, 0.5);
}

.send-btn {
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #2dd4bf 0%, #14b8a6 100%);
  border: none;
  border-radius: 8px;
  color: #0d1117;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
}

.send-btn:hover:not(:disabled) {
  background: linear-gradient(135deg, #5eead4 0%, #2dd4bf 100%);
}

.send-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Voice Input Button */
.voice-btn {
  width: 40px;
  height: 40px;
  background: rgba(48, 54, 61, 0.6);
  border: 1px solid rgba(48, 54, 61, 0.8);
  border-radius: 8px;
  color: #8b949e;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
  position: relative;
}

.voice-btn:hover:not(:disabled) {
  background: rgba(45, 212, 191, 0.2);
  border-color: rgba(45, 212, 191, 0.4);
  color: #2dd4bf;
}

.voice-btn.listening {
  background: rgba(239, 68, 68, 0.2);
  border-color: rgba(239, 68, 68, 0.5);
  color: #ef4444;
}

.listening-indicator {
  position: relative;
  width: 20px;
  height: 20px;
}

.pulse-ring {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 8px;
  height: 8px;
  background: #ef4444;
  border-radius: 50%;
  animation: voicePulse 1.5s ease-out infinite;
}

.pulse-ring.delay-1 {
  animation-delay: 0.3s;
}

.pulse-ring.delay-2 {
  animation-delay: 0.6s;
}

@keyframes voicePulse {
  0% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 1;
  }
  100% {
    transform: translate(-50%, -50%) scale(3);
    opacity: 0;
  }
}

/* TTS Toggle Button */
.tts-btn {
  width: 40px;
  height: 40px;
  background: rgba(48, 54, 61, 0.6);
  border: 1px solid rgba(48, 54, 61, 0.8);
  border-radius: 8px;
  color: #8b949e;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
}

.tts-btn:hover {
  background: rgba(45, 212, 191, 0.2);
  border-color: rgba(45, 212, 191, 0.4);
  color: #2dd4bf;
}

.tts-btn.active {
  background: rgba(45, 212, 191, 0.3);
  border-color: rgba(45, 212, 191, 0.6);
  color: #2dd4bf;
  box-shadow: 0 0 10px rgba(45, 212, 191, 0.3);
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
