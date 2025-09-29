<template>
  <div class="not-found-page min-h-screen flex items-center justify-center">
    <div class="text-center px-6">
      <h1 class="gothic-title text-sage mb-4">404</h1>
      <p class="serene-text text-2xl mb-8">Page Not Found</p>
      <p class="text-gray-400 mb-8">
        The page you seek has vanished into the digital ether
      </p>
      <router-link to="/" class="btn-gothic">
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
    .from('.gothic-title', { opacity: 0, scale: 0.8, duration: 0.5 })
    .from('.serene-text', { opacity: 0, y: 20, duration: 0.3 }, '-=0.2')
    .from('.text-gray-400', { opacity: 0, y: 20, duration: 0.3 }, '-=0.2')
    .from('.btn-gothic', { opacity: 0, y: 20, duration: 0.3 }, '-=0.2')
})
</script>
