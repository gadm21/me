<template>
  <div class="not-found-page min-h-screen flex items-center justify-center">
    <div class="text-center px-6">
      <h1 class="page-title text-primary mb-4 animate-title">404</h1>
      <p class="text-2xl text-text-primary dark:text-text-primary-dark mb-8 animate-subtitle">Page Not Found</p>
      <p class="text-text-secondary dark:text-text-secondary-dark mb-8 animate-text">
        The page you seek has vanished into the digital ether
      </p>
      <router-link to="/" class="btn-primary animate-btn">
        Return Home
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import gsap from 'gsap'

onMounted(() => {
  gsap.timeline()
    .from('.animate-title', { opacity: 0, scale: 0.8, duration: 0.5 })
    .from('.animate-subtitle', { opacity: 0, y: 20, duration: 0.3 }, '-=0.2')
    .from('.animate-text', { opacity: 0, y: 20, duration: 0.3 }, '-=0.2')
    .from('.animate-btn', { opacity: 0, y: 20, duration: 0.3 }, '-=0.2')
})
</script>
