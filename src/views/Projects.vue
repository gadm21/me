<template>
  <div class="projects-page py-12">
    <div class="prose-container">
      <h1 class="gothic-title text-sage text-center mb-8">Project Portfolio</h1>
      <p class="serene-text text-xl text-center mb-12">
        A collection of research projects, implementations, and experiments across various domains
      </p>
    </div>
    
    <!-- Category Filter -->
    <section class="mb-12">
      <div class="max-w-6xl mx-auto px-6">
        <div class="flex flex-wrap gap-3 justify-center mb-8">
          <button 
            v-for="category in categories" 
            :key="category"
            @click="selectedCategory = selectedCategory === category ? null : category"
            class="category-btn"
            :class="{ 'active': selectedCategory === category }"
          >
            {{ category }}
          </button>
        </div>
      </div>
    </section>
    

    
    <!-- Projects Grid -->
    <section class="mb-16">
      <div class="max-w-7xl mx-auto px-6">
        <div class="projects-grid">
          <article 
            v-for="project in filteredProjects" 
            :key="project.id"
            class="project-card card-calm"
          >
            <div class="project-image">
              <img 
                :src="project.image" 
                :alt="project.title"
                class="w-full h-48 object-cover"
                @error="handleImageError"
              >
              <div class="project-overlay">
                <div class="project-links">
                  <a 
                    v-if="project.github" 
                    :href="project.github" 
                    target="_blank"
                    class="project-link"
                    @click="trackOutboundLink(project.github)"
                  >
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  </a>
                  <a 
                    v-if="project.demo" 
                    :href="project.demo" 
                    target="_blank"
                    class="project-link"
                    @click="trackOutboundLink(project.demo)"
                  >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                  <a 
                    v-if="project.paper" 
                    :href="project.paper" 
                    target="_blank"
                    class="project-link"
                    @click="trackOutboundLink(project.paper)"
                  >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
            
            <div class="project-content p-6">
              <div class="flex items-start justify-between mb-3">
                <span class="category-badge">{{ project.category }}</span>
                <span class="text-gray-500 text-sm">{{ project.year }}</span>
              </div>
              
              <h3 class="font-serif text-xl text-gray-300 mb-3 leading-tight">{{ project.title }}</h3>
              <p class="text-gray-500 text-sm mb-4 leading-relaxed">{{ project.description }}</p>
              
              <div class="flex flex-wrap gap-2 mb-4">
                <span 
                  v-for="tech in project.technologies.slice(0, 4)" 
                  :key="tech"
                  class="tech-tag"
                >
                  {{ tech }}
                </span>
                <span 
                  v-if="project.technologies.length > 4"
                  class="tech-tag opacity-60"
                >
                  +{{ project.technologies.length - 4 }}
                </span>
              </div>
              
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-2">
                  <div 
                    class="status-indicator"
                    :class="project.status === 'completed' ? 'bg-green-500' : 'bg-yellow-500'"
                  ></div>
                  <span class="text-xs text-gray-400 capitalize">{{ project.status }}</span>
                </div>
                
                <button 
                  @click="selectedProject = project"
                  class="text-sage-dark hover:text-sage-light text-sm transition-colors"
                >
                  View Details →
                </button>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
    
    <!-- Project Modal -->
    <transition name="modal">
      <div 
        v-if="selectedProject" 
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80"
        @click.self="selectedProject = null"
      >
        <div class="bg-charcoal border border-slate rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div class="p-6">
            <div class="flex justify-between items-start mb-6">
              <div>
                <h2 class="gothic-subtitle text-sage-light mb-2">{{ selectedProject.title }}</h2>
                <div class="flex items-center gap-4 mb-4">
                  <span class="category-badge">{{ selectedProject.category }}</span>
                  <span class="text-gray-400">{{ selectedProject.year }}</span>
                  <div class="flex items-center gap-2">
                    <div 
                      class="status-indicator"
                      :class="selectedProject.status === 'completed' ? 'bg-green-500' : 'bg-yellow-500'"
                    ></div>
                    <span class="text-sm text-gray-400 capitalize">{{ selectedProject.status }}</span>
                  </div>
                </div>
              </div>
              <button 
                @click="selectedProject = null"
                class="text-gray-400 hover:text-gray-300 text-2xl"
              >
                ×
              </button>
            </div>
            
            <div class="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <img 
                  :src="selectedProject.image" 
                  :alt="selectedProject.title"
                  class="w-full h-64 object-cover rounded"
                  @error="handleImageError"
                >
              </div>
              <div>
                <h3 class="text-lg font-medium text-gray-300 mb-3">Description</h3>
                <p class="text-gray-400 leading-relaxed mb-4">{{ selectedProject.description }}</p>
                
                <h3 class="text-lg font-medium text-gray-300 mb-3">Technologies</h3>
                <div class="flex flex-wrap gap-2 mb-4">
                  <span 
                    v-for="tech in selectedProject.technologies" 
                    :key="tech"
                    class="tech-tag"
                  >
                    {{ tech }}
                  </span>
                </div>
                
                <div class="flex gap-3">
                  <a 
                    v-if="selectedProject.github" 
                    :href="selectedProject.github" 
                    target="_blank"
                    class="btn-gothic text-sm"
                    @click="trackOutboundLink(selectedProject.github)"
                  >
                    View Code
                  </a>
                  <a 
                    v-if="selectedProject.demo" 
                    :href="selectedProject.demo" 
                    target="_blank"
                    class="btn-gothic text-sm"
                    @click="trackOutboundLink(selectedProject.demo)"
                  >
                    Live Demo
                  </a>
                  <a 
                    v-if="selectedProject.paper" 
                    :href="selectedProject.paper" 
                    target="_blank"
                    class="btn-gothic text-sm"
                    @click="trackOutboundLink(selectedProject.paper)"
                  >
                    Read Paper
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useData } from '../composables/useData'
import { useAnalytics } from '../composables/useAnalytics'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const { data: projects, loading, error } = useData('/src/data/projects.json')
const { trackOutboundLink } = useAnalytics()
const selectedCategory = ref(null)
const selectedProject = ref(null)

const categories = computed(() => {
  if (!projects.value) return ['All']
  const cats = ['All', ...new Set(projects.value.map(project => project.category))]
  return cats
})

const filteredProjects = computed(() => {
  if (!projects.value) return []
  
  let filtered = projects.value
  if (selectedCategory.value && selectedCategory.value !== 'All') {
    filtered = filtered.filter(project => project.category === selectedCategory.value)
  }
  
  return filtered.sort((a, b) => {
    // Sort by year (most recent first)
    const yearA = parseInt(a.year.split('-')[0])
    const yearB = parseInt(b.year.split('-')[0])
    return yearB - yearA
  })
})

const totalProjects = computed(() => projects.value?.length || 0)

const completedProjects = computed(() => {
  if (!projects.value) return 0
  return projects.value.filter(project => project.status === 'completed').length
})

const yearsActive = computed(() => {
  if (!projects.value) return 0
  const years = projects.value.map(project => {
    const yearRange = project.year.split('-')
    return parseInt(yearRange[0])
  })
  const minYear = Math.min(...years)
  const maxYear = Math.max(...years)
  return maxYear - minYear + 1
})

const handleImageError = (event) => {
  event.target.src = '/assets/img/project-placeholder.jpg'
}

onMounted(() => {
  // Animate project cards on scroll
  gsap.utils.toArray('.project-card').forEach((card, index) => {
    gsap.fromTo(card, 
      { opacity: 0, y: 30, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        delay: index * 0.1,
        scrollTrigger: {
          trigger: card,
          start: 'top 85%',
          once: true
        }
      }
    )
  })
  
  // Animate stats
  gsap.utils.toArray('.stat-card').forEach((card, index) => {
    gsap.fromTo(card, 
      { opacity: 0, scale: 0.8 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.5,
        delay: index * 0.1,
        scrollTrigger: {
          trigger: card,
          start: 'top 85%',
          once: true
        }
      }
    )
  })
})
</script>

<style scoped>
.category-btn {
  @apply px-4 py-2 text-sm text-gray-400 border border-slate 
         hover:border-sage-dark hover:text-sage-light transition-all duration-250;
}

.category-btn.active {
  @apply bg-sage-dark text-ink border-sage;
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
}

@media (max-width: 768px) {
  .projects-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
}

@media (max-width: 640px) {
  .projects-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
}

.project-card {
  @apply transition-all duration-300 hover:scale-105 hover:shadow-xl;
  background: linear-gradient(135deg, rgba(45, 55, 72, 0.8), rgba(74, 85, 104, 0.8));
}

.project-image {
  @apply relative overflow-hidden;
}

.project-overlay {
  @apply absolute inset-0 bg-black/60 opacity-0 hover:opacity-100 
         transition-opacity duration-300 flex items-center justify-center;
}

.project-links {
  @apply flex gap-3;
}

.project-link {
  @apply p-3 bg-sage-dark text-ink rounded-full hover:bg-sage 
         transition-colors duration-250;
}

.category-badge {
  @apply inline-block px-3 py-1 bg-sage-dark text-ink text-xs rounded-full font-medium;
}

.tech-tag {
  @apply px-2 py-1 bg-midnight text-gray-400 text-xs rounded border border-slate;
}

.status-indicator {
  @apply w-2 h-2 rounded-full;
}

.stat-card {
  @apply p-6 bg-midnight rounded-lg;
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

/* Mobile responsiveness improvements */
@media (max-width: 640px) {
  .project-content {
    @apply p-4;
  }
  
  .project-content h3 {
    @apply text-lg;
  }
  
  .tech-tag {
    @apply text-xs px-2 py-1;
  }
  
  .category-btn {
    @apply px-3 py-1 text-xs;
  }
  
  .stat-card {
    @apply p-4;
  }
  
  .stat-card .text-3xl {
    @apply text-2xl;
  }
}

/* iPad responsiveness */
@media (min-width: 641px) and (max-width: 1024px) {
  .projects-grid {
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  }
  
  .prose-container {
    @apply px-8;
  }
}
</style>
