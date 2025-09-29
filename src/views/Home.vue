<template>
  <div class="home-page">
    <!-- Hero Section -->
    <section class="hero min-h-screen flex items-center justify-center relative overflow-hidden">
      <!-- WiFi Ripple Background -->
      <div class="absolute inset-0 flex items-center justify-center opacity-20">
        <div class="wifi-ripple-container">
          <div class="wifi-circle"></div>
          <div class="wifi-circle"></div>
          <div class="wifi-circle"></div>
        </div>
      </div>
      
        
        
      <div class="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <h1 class="gothic-title text-sage mb-4 animate-fade-in">
          Gad Gad
        </h1>
        <p class="serene-text text-xl md:text-2xl mb-8 animate-slide-up" style="animation-delay: 0.1s">
          
          <a href="https://gadm21.github.io/">Thothcraft</a>er.  
        </p>
        
        
        
      </div>
    </section>
    
    <!-- About Section -->
    <section class="py-20 px-6">
      <div class="prose-container">
        <h2 class="gothic-subtitle text-sage mb-8 fade-in">About</h2>
        <div class="drop-cap serene-text text-lg leading-relaxed space-y-4 fade-in">
          <p>
            Welcome to my digital realm. I am a Computer Science Ph.D. student at Western University, Canada, 
            specializing in the convergence of wireless sensing technologies and privacy-preserving machine learning. 
            My work focuses on creating intelligent systems that can sense and learn while protecting user privacy.
          </p>
          <p>
            My research explores federated learning, differential privacy, and WiFi sensing technologies. 
            I develop communication-efficient algorithms for resource-constrained environments like UAV-IoT systems, 
            and work on explainable AI systems for medical applications. With 18+ publications in top-tier venues, 
            I bridge the gap between theoretical advances and practical implementations.
          </p>
          <p>
            As a Teaching and Research Assistant, I mentor students in computer networks and systems programming, 
            while also volunteering with Lumiere to guide high school students through AI research projects. 
            My journey spans from software engineering roles at Delta-care and Vortex to research internships at UN ESCWA.
          </p>
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
  width: 300px;
  height: 300px;
}

.wifi-circle {
  position: absolute;
  inset: 0;
  border: 2px solid #87a08a;
  border-radius: 50%;
  animation: wifi-pulse 3s ease-out infinite;
}

.wifi-circle:nth-child(2) {
  animation-delay: 1s;
}

.wifi-circle:nth-child(3) {
  animation-delay: 2s;
}

@keyframes wifi-pulse {
  0% {
    transform: scale(1);
    opacity: 0.6;
  }
  100% {
    transform: scale(3);
    opacity: 0;
  }
}

.animate-fade-in {
  animation: fadeIn 0.25s ease-out forwards;
  opacity: 0;
}

.animate-slide-up {
  animation: slideUp 0.3s ease-out forwards;
  opacity: 0;
}

@keyframes fadeIn {
  to {
    opacity: 1;
  }
}

@keyframes slideUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
  from {
    opacity: 0;
    transform: translateY(20px);
  }
}
</style>
