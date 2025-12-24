<template>
  <div class="home-page">
    <!-- Hero Section -->
    <section class="hero min-h-[80vh] flex items-center justify-center relative overflow-hidden">
      <!-- Subtle gradient background -->
      <div class="absolute inset-0 bg-gradient-to-b from-primary-subtle/50 to-transparent dark:from-primary/5 dark:to-transparent"></div>
      
      <!-- Animated circles background -->
      <div class="absolute inset-0 flex items-center justify-center opacity-10 dark:opacity-5">
        <div class="wifi-ripple-container">
          <div class="wifi-circle"></div>
          <div class="wifi-circle"></div>
          <div class="wifi-circle"></div>
        </div>
      </div>
      
      <div class="relative z-10 text-center px-6 max-w-3xl mx-auto">
        <h1 class="text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-text-primary dark:text-text-primary-dark mb-6 animate-fade-in">
          Gad Gad
        </h1>
        <p class="text-xl md:text-2xl text-text-secondary dark:text-text-secondary-dark mb-8 animate-slide-up font-normal" style="animation-delay: 0.1s">
          <a href="https://www.thothcraft.com/" class="link font-medium">Thothcraft</a>er
        </p>
        
        <!-- CTA Buttons -->
        <div class="flex flex-wrap justify-center gap-4 animate-fade-in" style="animation-delay: 0.2s">
          <router-link to="/research" class="btn-primary">
            View Research
          </router-link>
          <router-link to="/contact" class="btn-secondary">
            Get in Touch
          </router-link>
        </div>
      </div>
    </section>
    
    <!-- About Section -->
    <section class="section">
      <div class="content-container">
        <div class="max-w-2xl mx-auto">
          <h2 class="section-title text-center mb-8">About Me</h2>
          <div class="space-y-4 text-lg leading-relaxed text-text-secondary dark:text-text-secondary-dark fade-in">
            <p>
              I am a Computer Science Ph.D. student at Western University. 
              My work focuses on creating intelligent privacy-preserving sensing systems.
            </p>
            <p>
              Initially I wanted to learn everything, but I realized I am not cool enough, so instead I am exploring these areas: Integrated Sensing and Communication (ISAC), AI, federated learning, differential privacy, and quantum networks.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Research Areas Preview -->
    <section class="section bg-surface-hover/50 dark:bg-surface-hover-dark/30">
      <div class="wide-container">
        <h2 class="section-title text-center mb-12">Research Focus</h2>
        <div class="grid md:grid-cols-3 gap-6">
          <div 
            v-for="pillar in pillars" 
            :key="pillar.title"
            class="card card-hover text-center"
          >
            <div class="text-4xl mb-4">{{ pillar.icon }}</div>
            <h3 class="text-lg font-semibold text-text-primary dark:text-text-primary-dark mb-2">
              {{ pillar.title }}
            </h3>
            <p class="text-sm text-text-secondary dark:text-text-secondary-dark">
              {{ pillar.description }}
            </p>
          </div>
        </div>
        <div class="text-center mt-10">
          <router-link to="/research" class="btn-ghost inline-flex items-center gap-2">
            Learn more about my research
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import gsap from 'gsap'

const router = useRouter()

const pillars = [
  {
    icon: '◈',
    title: 'Wi-Fi Sensing',
    description: 'Transforming wireless signals into environmental awareness'
  },
  {
    icon: '◉',
    title: 'FL + DP',
    description: 'Federated Learning with Differential Privacy guarantees'
  },
  {
    icon: '◊',
    title: 'Teaching',
    description: 'Guiding minds through the labyrinth of computer science'
  }
]

const recentWork = [
  {
    type: 'Research',
    title: 'Privacy-Preserving Wi-Fi Sensing in Distributed Networks',
    abstract: 'A novel approach to maintaining user privacy while leveraging Wi-Fi signals for human activity recognition in smart environments.',
    link: '/research'
  },
  {
    type: 'Publication',
    title: 'Differential Privacy in Federated Learning: A Comprehensive Survey',
    abstract: 'An extensive review of current methodologies and future directions in privacy-preserving distributed machine learning.',
    link: '/publications'
  }
]

const navigateToWork = (link) => {
  router.push(link)
}

onMounted(() => {
  // Hero entrance animation
  gsap.timeline()
    .from('.gothic-title', { 
      opacity: 0, 
      y: 30, 
      duration: 0.6, 
      ease: 'power2.out' 
    })
    .from('.serene-text', { 
      opacity: 0, 
      y: 20, 
      duration: 0.4, 
      ease: 'power2.out' 
    }, '-=0.3')
    .from('.pillar-card', { 
      opacity: 0, 
      y: 20, 
      duration: 0.4, 
      stagger: 0.1, 
      ease: 'power2.out' 
    }, '-=0.2')
})
</script>

<style scoped>
.wifi-ripple-container {
  position: relative;
  width: 400px;
  height: 400px;
}

.wifi-circle {
  position: absolute;
  inset: 0;
  border: 2px solid #3B82F6;
  border-radius: 50%;
  animation: wifi-pulse 4s ease-out infinite;
}

.wifi-circle:nth-child(2) {
  animation-delay: 1.3s;
}

.wifi-circle:nth-child(3) {
  animation-delay: 2.6s;
}

@keyframes wifi-pulse {
  0% {
    transform: scale(0.5);
    opacity: 0.4;
  }
  100% {
    transform: scale(2.5);
    opacity: 0;
  }
}

.animate-fade-in {
  animation: fadeIn 0.4s ease-out forwards;
  opacity: 0;
}

.animate-slide-up {
  animation: slideUp 0.4s ease-out forwards;
  opacity: 0;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(16px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
