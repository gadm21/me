<template>
  <nav class="fixed top-0 w-full z-50 glass-nav transition-all duration-200">
    <div class="max-w-wide mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <!-- Logo/Name -->
        <router-link to="/" class="flex items-center gap-2">
          <span class="text-lg font-semibold text-text-primary dark:text-text-primary-dark">
            Gad Gad
          </span>
        </router-link>
        
        <!-- Desktop Navigation -->
        <div class="hidden md:flex items-center gap-1">
          <router-link 
            v-for="item in navItems" 
            :key="item.name"
            :to="item.path"
            class="nav-link-item px-3 py-2 rounded text-sm font-medium transition-all duration-200"
            :class="{ 
              'bg-primary-subtle dark:bg-primary/10 text-primary dark:text-primary-light': $route.name === item.name,
              'text-text-secondary dark:text-text-secondary-dark hover:text-text-primary dark:hover:text-text-primary-dark hover:bg-surface-hover dark:hover:bg-surface-hover-dark': $route.name !== item.name
            }"
          >
            {{ item.label }}
          </router-link>
          
          <!-- Search Button -->
          <button 
            @click="searchOpen = true"
            class="ml-2 p-2 text-text-secondary dark:text-text-secondary-dark hover:text-text-primary dark:hover:text-text-primary-dark hover:bg-surface-hover dark:hover:bg-surface-hover-dark rounded transition-all duration-200"
            aria-label="Search"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
          
          <!-- Language Selector -->
          <LanguageSelector />
          
          <!-- Theme Toggle -->
          <ThemeToggle />
        </div>
        
        <!-- Mobile Menu Button -->
        <div class="flex items-center gap-2 md:hidden">
          <button 
            @click="searchOpen = true"
            class="p-2 text-text-secondary dark:text-text-secondary-dark hover:text-text-primary dark:hover:text-text-primary-dark rounded transition-colors"
            aria-label="Search"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
          <LanguageSelector />
          <ThemeToggle />
          <button 
            @click="mobileMenuOpen = !mobileMenuOpen"
            class="p-2 text-text-secondary dark:text-text-secondary-dark hover:text-text-primary dark:hover:text-text-primary-dark hover:bg-surface-hover dark:hover:bg-surface-hover-dark rounded transition-all duration-200"
            aria-label="Toggle menu"
          >
            <svg v-if="!mobileMenuOpen" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
      
      <!-- Mobile Menu -->
      <transition name="mobile-menu">
        <div 
          v-show="mobileMenuOpen"
          class="md:hidden absolute top-16 left-0 right-0 bg-surface-elevated dark:bg-surface-elevated-dark border-t border-border dark:border-border-dark shadow-elevated"
        >
          <div class="px-4 py-3 space-y-1">
            <router-link 
              v-for="item in navItems" 
              :key="item.name"
              :to="item.path"
              @click="mobileMenuOpen = false"
              class="block py-2.5 px-4 text-sm font-medium rounded transition-all duration-200"
              :class="{ 
                'bg-primary-subtle dark:bg-primary/10 text-primary dark:text-primary-light': $route.name === item.name,
                'text-text-secondary dark:text-text-secondary-dark hover:text-text-primary dark:hover:text-text-primary-dark hover:bg-surface-hover dark:hover:bg-surface-hover-dark': $route.name !== item.name
              }"
            >
              {{ item.label }}
            </router-link>
          </div>
        </div>
      </transition>
    </div>
  </nav>
  
  <!-- Spacer for fixed nav -->
  <div class="h-16"></div>
  
  <!-- Search Modal -->
  <SearchModal :is-open="searchOpen" @close="searchOpen = false" />
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import SearchModal from './SearchModal.vue'
import ThemeToggle from './ThemeToggle.vue'
import LanguageSelector from './LanguageSelector.vue'
import { useI18n } from '@/composables/useI18n'

const { t, currentLanguage } = useI18n()

const mobileMenuOpen = ref(false)
const searchOpen = ref(false)

// Listen for keyboard shortcuts
const handleOpenSearch = () => {
  searchOpen.value = true
}

const handleCloseModals = () => {
  searchOpen.value = false
  mobileMenuOpen.value = false
}

onMounted(() => {
  window.addEventListener('open-search', handleOpenSearch)
  window.addEventListener('close-modals', handleCloseModals)
})

onUnmounted(() => {
  window.removeEventListener('open-search', handleOpenSearch)
  window.removeEventListener('close-modals', handleCloseModals)
})

// Nav items with translation keys
const navItems = computed(() => {
  // Access currentLanguage to make reactive
  const _ = currentLanguage.value
  return [
    { name: 'Home', path: '/', label: t('nav.home') },
    { name: 'Research', path: '/research', label: t('nav.research') },
    { name: 'Publications', path: '/publications', label: t('nav.publications') },
    { name: 'Projects', path: '/projects', label: t('nav.projects') },
    { name: 'Teaching', path: '/teaching', label: t('nav.teaching') },
    { name: 'Blog', path: '/blog', label: t('nav.blog') },
    { name: 'Books', path: '/books', label: t('nav.books') },
    { name: 'Awards', path: '/awards', label: t('nav.awards') },
    { name: 'Contact', path: '/contact', label: t('nav.contact') }
  ]
})
</script>

<style scoped>
/* Mobile menu animation */
.mobile-menu-enter-active,
.mobile-menu-leave-active {
  transition: all 0.2s ease-out;
}

.mobile-menu-enter-from,
.mobile-menu-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

/* Nav link hover underline effect */
.nav-link-item {
  position: relative;
}

.nav-link-item::after {
  content: '';
  position: absolute;
  bottom: 4px;
  left: 12px;
  right: 12px;
  height: 2px;
  background: #3B82F6;
  border-radius: 1px;
  transform: scaleX(0);
  transition: transform 0.2s ease-out;
}

.nav-link-item:hover::after {
  transform: scaleX(1);
}

.nav-link-item.router-link-active::after {
  transform: scaleX(0);
}
</style>
