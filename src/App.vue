<template>
  <div id="app" class="min-h-screen bg-ink dark:bg-ink bg-paper text-gray-300 dark:text-gray-300 text-gray-700 transition-colors duration-300">
    <!-- Navigation -->
    <NavBar />
    
    <!-- Main Content -->
    <main class="relative">
      <router-view v-slot="{ Component }">
        <transition name="page" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
    
    <!-- Footer -->
    <Footer />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import NavBar from './components/NavBar.vue'
import Footer from './components/Footer.vue'
import { useKeyboardShortcuts } from './composables/useKeyboardShortcuts'

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger)

// Enable keyboard shortcuts
useKeyboardShortcuts()

onMounted(() => {
  // Initialize GSAP animations
  initAnimations()
})

const initAnimations = () => {
  // Fade in elements with .fade-in class
  gsap.utils.toArray('.fade-in').forEach(el => {
    gsap.fromTo(el, 
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.25,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 90%',
          once: true
        }
      }
    )
  })
  
  // Animate drop caps
  gsap.utils.toArray('.drop-cap').forEach(el => {
    gsap.fromTo(el, 
      { opacity: 0 },
      {
        opacity: 1,
        duration: 0.4,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 80%',
          once: true
        }
      }
    )
  })
}
</script>

<style scoped>
/* Page transitions */
.page-enter-active,
.page-leave-active {
  transition: all 0.25s ease-out;
}

.page-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.page-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>
