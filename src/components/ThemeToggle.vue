<template>
  <button
    @click="toggleTheme"
    class="theme-toggle p-2 text-gray-400 dark:text-gray-400 text-gray-600 hover:text-sage-light dark:hover:text-sage-light hover:text-sage-dark transition-all duration-250"
    :aria-label="`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`"
  >
    <transition name="fade" mode="out-in">
      <svg v-if="theme === 'dark'" key="moon" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
      </svg>
      <svg v-else key="sun" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    </transition>
  </button>
</template>

<script setup>
import { useTheme } from '../composables/useTheme'

const { theme, toggleTheme } = useTheme()
</script>

<style scoped>
.theme-toggle {
  position: relative;
}

.theme-toggle::after {
  content: '';
  position: absolute;
  inset: -4px;
  border-radius: 50%;
  background: radial-gradient(circle, transparent, #87a08a);
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
}

.theme-toggle:hover::after {
  opacity: 0.2;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
