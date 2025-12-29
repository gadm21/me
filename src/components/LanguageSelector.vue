<template>
  <div class="language-selector" ref="selectorRef">
    <button 
      @click="toggleMenu" 
      class="lang-toggle"
      :title="'Language: ' + langConfig.name"
    >
      <span class="lang-flag">{{ langConfig.flag }}</span>
      <svg class="chevron" :class="{ 'rotate': isOpen }" width="12" height="12" viewBox="0 0 12 12" fill="none">
        <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </button>
    
    <Transition name="dropdown">
      <div v-if="isOpen" class="lang-dropdown">
        <button 
          v-for="lang in SUPPORTED_LANGUAGES" 
          :key="lang.code"
          @click="selectLanguage(lang.code)"
          :class="['lang-option', { active: currentLanguage === lang.code }]"
        >
          <span class="option-flag">{{ lang.flag }}</span>
          <span class="option-name">{{ lang.name }}</span>
          <svg v-if="currentLanguage === lang.code" class="check-icon" width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M13.5 4.5L6 12L2.5 8.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useI18n } from '@/composables/useI18n'

const { currentLanguage, langConfig, setLanguage, SUPPORTED_LANGUAGES } = useI18n()

const isOpen = ref(false)
const selectorRef = ref(null)

const toggleMenu = () => {
  isOpen.value = !isOpen.value
}

const selectLanguage = (langCode) => {
  setLanguage(langCode)
  isOpen.value = false
}

// Close dropdown when clicking outside
const handleClickOutside = (event) => {
  if (selectorRef.value && !selectorRef.value.contains(event.target)) {
    isOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
.language-selector {
  position: relative;
}

.lang-toggle {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 10px;
  background: transparent;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  color: var(--color-text-secondary);
  cursor: pointer;
  transition: all 0.2s ease;
}

.lang-toggle:hover {
  border-color: var(--color-primary);
  color: var(--color-primary);
}

.lang-flag {
  font-size: 18px;
  line-height: 1;
}

.chevron {
  transition: transform 0.2s ease;
}

.chevron.rotate {
  transform: rotate(180deg);
}

.lang-dropdown {
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  min-width: 160px;
  background: var(--color-surface-elevated);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  z-index: 1000;
}

.lang-option {
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  padding: 12px 16px;
  background: transparent;
  border: none;
  color: var(--color-text-primary);
  font-size: 14px;
  cursor: pointer;
  transition: all 0.15s ease;
  text-align: left;
}

.lang-option:hover {
  background: var(--color-surface-hover);
}

.lang-option.active {
  background: rgba(45, 212, 191, 0.1);
  color: var(--color-primary);
}

.option-flag {
  font-size: 20px;
}

.option-name {
  flex: 1;
}

.check-icon {
  color: var(--color-primary);
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

/* Dark mode adjustments */
:root.dark .lang-dropdown {
  background: #1c2128;
  border-color: #30363d;
}

:root.dark .lang-option:hover {
  background: #30363d;
}
</style>
