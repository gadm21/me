<template>
  <div class="stats-page py-12">
    <div class="prose-container">
      <h1 class="gothic-title text-sage text-center mb-8">Research Statistics</h1>
      <p class="serene-text text-xl text-center mb-12">
        A quantitative view of my academic journey
      </p>
    </div>
    
    <!-- Key Metrics -->
    <section class="mb-16">
      <div class="max-w-6xl mx-auto px-6">
        <div class="grid md:grid-cols-4 gap-6">
          <div 
            v-for="metric in keyMetrics" 
            :key="metric.label"
            class="metric-card card-calm text-center"
          >
            <div class="text-4xl font-bold text-sage-light mb-2">
              <span class="counter" :data-target="metric.value">0</span>
            </div>
            <div class="text-gray-400 text-sm mb-1">{{ metric.label }}</div>
            <div class="text-xs text-gray-500">{{ metric.description }}</div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Publication Trends -->
    <section class="mb-16 bg-charcoal/30 py-12">
      <div class="max-w-6xl mx-auto px-6">
        <h2 class="gothic-subtitle text-sage mb-8">Publication Trends</h2>
        <div class="chart-container bg-midnight p-6 rounded-lg">
          <div class="flex items-end justify-between gap-2 h-64">
            <div 
              v-for="year in publicationsByYear" 
              :key="year.year"
              class="flex-1 flex flex-col items-center justify-end"
            >
              <div 
                class="w-full bg-sage-dark hover:bg-sage transition-colors duration-250 rounded-t"
                :style="`height: ${(year.count / maxPublications) * 100}%`"
              >
                <span class="block text-center text-ink font-bold py-2">{{ year.count }}</span>
              </div>
              <span class="text-gray-400 text-sm mt-2">{{ year.year }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Research Impact -->
    <section class="mb-16">
      <div class="max-w-6xl mx-auto px-6">
        <h2 class="gothic-subtitle text-sage mb-8 text-center">Research Impact</h2>
        <div class="grid md:grid-cols-2 gap-8">
          <!-- Citations Over Time -->
          <div class="impact-card card-calm">
            <h3 class="font-serif text-xl text-gray-300 mb-4">Citations Growth</h3>
            <div class="space-y-3">
              <div v-for="item in citationsGrowth" :key="item.year" class="flex items-center gap-3">
                <span class="text-gray-400 text-sm w-16">{{ item.year }}</span>
                <div class="flex-1 bg-midnight rounded-full h-6 overflow-hidden">
                  <div 
                    class="h-full bg-gradient-to-r from-sage-dark to-sage flex items-center justify-end pr-2"
                    :style="`width: ${(item.citations / maxCitations) * 100}%`"
                  >
                    <span class="text-xs text-ink font-medium">{{ item.citations }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Top Venues -->
          <div class="impact-card card-calm">
            <h3 class="font-serif text-xl text-gray-300 mb-4">Top Publication Venues</h3>
            <div class="space-y-3">
              <div v-for="venue in topVenues" :key="venue.name" class="flex justify-between items-center">
                <span class="text-gray-400">{{ venue.name }}</span>
                <span class="venue-badge">{{ venue.count }} papers</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Collaboration Network -->
    <section class="mb-16 bg-charcoal/30 py-12">
      <div class="max-w-6xl mx-auto px-6">
        <h2 class="gothic-subtitle text-sage mb-8 text-center">Collaboration Network</h2>
        <div class="grid md:grid-cols-3 gap-6 text-center">
          <div class="stat-item">
            <div class="text-3xl text-sage-light font-bold mb-2">{{ collaborators.total }}</div>
            <div class="text-gray-400">Total Collaborators</div>
          </div>
          <div class="stat-item">
            <div class="text-3xl text-sage-light font-bold mb-2">{{ collaborators.institutions }}</div>
            <div class="text-gray-400">Institutions</div>
          </div>
          <div class="stat-item">
            <div class="text-3xl text-sage-light font-bold mb-2">{{ collaborators.countries }}</div>
            <div class="text-gray-400">Countries</div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Teaching Statistics -->
    <section class="mb-16">
      <div class="prose-container">
        <h2 class="gothic-subtitle text-sage mb-8">Teaching Impact</h2>
        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div class="teaching-stat card-calm text-center">
            <div class="text-2xl text-sage-light font-bold mb-1">{{ teaching.coursesTeught }}</div>
            <div class="text-gray-400 text-sm">Courses Taught</div>
          </div>
          <div class="teaching-stat card-calm text-center">
            <div class="text-2xl text-sage-light font-bold mb-1">{{ teaching.studentsTotal }}</div>
            <div class="text-gray-400 text-sm">Students Reached</div>
          </div>
          <div class="teaching-stat card-calm text-center">
            <div class="text-2xl text-sage-light font-bold mb-1">{{ teaching.rating }}/5</div>
            <div class="text-gray-400 text-sm">Average Rating</div>
          </div>
          <div class="teaching-stat card-calm text-center">
            <div class="text-2xl text-sage-light font-bold mb-1">{{ teaching.mentored }}</div>
            <div class="text-gray-400 text-sm">Students Mentored</div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Skills Proficiency -->
    <section class="mb-16">
      <div class="prose-container">
        <h2 class="gothic-subtitle text-sage mb-8">Technical Proficiency</h2>
        <div class="space-y-4">
          <div v-for="skill in skills" :key="skill.name" class="skill-item">
            <div class="flex justify-between items-center mb-2">
              <span class="text-gray-300 font-medium">{{ skill.name }}</span>
              <span class="text-sage-light text-sm">{{ skill.level }}%</span>
            </div>
            <div class="bg-midnight rounded-full h-3 overflow-hidden">
              <div 
                class="h-full bg-gradient-to-r from-sage-dark to-sage-light transition-all duration-1000 ease-out skill-bar"
                :style="`width: ${skill.level}%`"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Key Metrics
const keyMetrics = ref([
  { value: 18, label: 'Publications', description: 'Peer-reviewed papers' },
  { value: 213, label: 'Citations', description: 'Google Scholar' },
  { value: 9, label: 'h-index', description: 'Research impact' },
  { value: 3, label: 'Active Projects', description: 'Ongoing research' }
])

// Publication data
const publicationsByYear = ref([
  { year: 2020, count: 1 },
  { year: 2021, count: 1 },
  { year: 2022, count: 2 },
  { year: 2023, count: 6 },
  { year: 2024, count: 5 },
  { year: 2025, count: 3 }
])

const maxPublications = computed(() => 
  Math.max(...publicationsByYear.value.map(y => y.count))
)

// Citations data
const citationsGrowth = ref([
  { year: '2020', citations: 5 },
  { year: '2021', citations: 15 },
  { year: '2022', citations: 35 },
  { year: '2023', citations: 75 },
  { year: '2024', citations: 120 }
])

const maxCitations = computed(() => 
  Math.max(...citationsGrowth.value.map(c => c.citations))
)

// Top venues
const topVenues = ref([
  { name: 'IEEE INFOCOM', count: 2 },
  { name: 'NeurIPS', count: 2 },
  { name: 'ACM Computing Surveys', count: 1 },
  { name: 'IEEE TWC', count: 1 },
  { name: 'ICML', count: 1 }
])

// Collaboration stats
const collaborators = ref({
  total: 15,
  institutions: 8,
  countries: 4
})

// Teaching stats
const teaching = ref({
  coursesTeught: 6,
  studentsTotal: 350,
  rating: 4.8,
  mentored: 25
})

// Skills
const skills = ref([
  { name: 'Machine Learning / Deep Learning', level: 95 },
  { name: 'Federated Learning', level: 90 },
  { name: 'Python / PyTorch', level: 95 },
  { name: 'Wi-Fi Sensing / Signal Processing', level: 85 },
  { name: 'Differential Privacy', level: 88 },
  { name: 'Research Writing', level: 92 },
  { name: 'Teaching & Mentoring', level: 90 }
])

onMounted(() => {
  // Animate counters
  gsap.utils.toArray('.counter').forEach(counter => {
    const target = parseInt(counter.dataset.target)
    gsap.to(counter, {
      textContent: target,
      duration: 2,
      ease: 'power2.out',
      snap: { textContent: 1 },
      scrollTrigger: {
        trigger: counter,
        start: 'top 85%',
        once: true
      }
    })
  })
  
  // Animate skill bars
  gsap.utils.toArray('.skill-bar').forEach(bar => {
    const width = bar.style.width
    bar.style.width = '0%'
    gsap.to(bar, {
      width: width,
      duration: 1.5,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: bar,
        start: 'top 85%',
        once: true
      }
    })
  })
})
</script>

<style scoped>
.metric-card {
  @apply transition-transform duration-250 hover:scale-105;
}

.chart-container {
  @apply overflow-hidden;
}

.skill-bar {
  position: relative;
  overflow: hidden;
}

.skill-bar::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
  animation: shimmer 2s infinite;
}

@keyframes shimmer {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}
</style>
