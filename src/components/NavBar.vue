<template>
  <nav class="fixed top-0 w-full z-50 glass border-b border-white/5 transition-colors duration-300">
    <div class="max-w-7xl mx-auto px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <!-- Logo/Name -->
        <router-link to="/" class="gothic-logo group flex items-center space-x-2">
          <span class="font-blackletter text-2xl text-sage transition-colors duration-250 group-hover:text-sage-light">G</span>
          <span class="font-serif text-lg text-gray-400 dark:text-gray-400 text-gray-600 group-hover:text-gray-300 dark:group-hover:text-gray-300 group-hover:text-gray-800 transition-colors duration-250">ad Mohamed Gad</span>
        </router-link>
        
        <!-- Desktop Navigation -->
        <div class="hidden md:flex items-center space-x-8">
          <router-link 
            v-for="item in navItems" 
            :key="item.name"
            :to="item.path"
            class="nav-link relative font-sans text-sm font-medium text-gray-400 dark:text-gray-400 text-gray-600 hover:text-sage-light dark:hover:text-sage-light hover:text-sage-dark transition-colors duration-250"
            :class="{ 'active': $route.name === item.name }"
          >
            {{ item.label }}
          </router-link>
          <!-- Search Button -->
          <button 
            @click="searchOpen = true"
            class="p-2 text-gray-400 dark:text-gray-400 text-gray-600 hover:text-sage-light dark:hover:text-sage-light hover:text-sage-dark transition-colors"
            aria-label="Search"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
          
          <!-- Theme Toggle -->
          <ThemeToggle />
        </div>
        
        <!-- Mobile Menu Button -->
        <button 
          @click="mobileMenuOpen = !mobileMenuOpen"
          class="md:hidden p-2 text-gray-400 dark:text-gray-400 text-gray-600 hover:text-sage-light dark:hover:text-sage-light hover:text-sage-dark transition-colors"
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
      
      <!-- Mobile Menu -->
      <div 
        v-show="mobileMenuOpen"
        class="md:hidden absolute top-16 left-0 right-0 glass border-t border-white/5 max-h-[80vh] overflow-y-auto transition-colors duration-300"
      >
        <div class="px-6 py-4 grid grid-cols-2 gap-2">
          <router-link 
            v-for="item in navItems" 
            :key="item.name"
            :to="item.path"
            @click="mobileMenuOpen = false"
            class="block py-3 px-3 text-center text-sm text-gray-400 dark:text-gray-400 text-gray-600 hover:text-sage-light dark:hover:text-sage-light hover:text-sage-dark hover:bg-slate/30 dark:hover:bg-slate/30 hover:bg-silver/30 rounded transition-all"
            :class="{ 'text-sage-light bg-sage-dark/20 dark:bg-sage-dark/20 bg-sage-light/20': $route.name === item.name }"
          >
            {{ item.label }}
          </router-link>
        </div>
        
        <!-- Mobile Search & Theme -->
        <div class="px-6 py-4 border-t border-slate dark:border-slate border-silver flex justify-center gap-4">
          <button 
            @click="searchOpen = true; mobileMenuOpen = false"
            class="p-2 text-gray-400 dark:text-gray-400 text-gray-600 hover:text-sage-light dark:hover:text-sage-light hover:text-sage-dark transition-colors"
            aria-label="Search"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
          <ThemeToggle />
        </div>
      </div>
    </div>
  </nav>
  
  <!-- Spacer for fixed nav -->
  <div class="h-16"></div>
  
  <!-- Search Modal -->
  <SearchModal :is-open="searchOpen" @close="searchOpen = false" />
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import SearchModal from './SearchModal.vue'
import ThemeToggle from './ThemeToggle.vue'

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

const navItems = [
  { name: 'Home', path: '/', label: 'Home' },
  { name: 'Research', path: '/research', label: 'Research' },
  { name: 'Publications', path: '/publications', label: 'Publications' },
  { name: 'Projects', path: '/projects', label: 'Projects' },
  { name: 'Teaching', path: '/teaching', label: 'Teaching' },
  { name: 'Blog', path: '/blog', label: 'Blog' },
  { name: 'Books', path: '/books', label: 'Books' },
  { name: 'Awards', path: '/awards', label: 'Awards' },
  { name: 'Contact', path: '/contact', label: 'Contact' }
]
</script>

<style scoped>
.nav-link::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 2px;
  background: linear-gradient(90deg, #4dd0e1, #00acc1);
  transition: width 0.25s ease-out;
}

.nav-link:hover::after,
.nav-link.active::after {
  width: 100%;
}

.mobile-menu-enter-active,
.mobile-menu-leave-active {
  transition: all 0.25s ease-out;
}

.mobile-menu-enter-from,
.mobile-menu-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
