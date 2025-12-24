<template>
  <div class="publications-page">
    <!-- Header -->
    <section class="section pb-8">
      <div class="content-container text-center">
        <h1 class="page-title mb-4">Publications</h1>
        
        <!-- Publication Statistics -->
        <div class="flex flex-wrap justify-center gap-8 mb-8">
          <div class="stat-item">
            <span class="stat-value">{{ stats.publications }}</span>
            <span class="stat-label">Publications</span>
          </div>
          <div class="stat-item">
            <span class="stat-value">{{ stats.hIndex }}</span>
            <span class="stat-label">h-index</span>
            <a href="https://scholar.google.com/citations?user=bZRYJuAAAAAJ&hl=en" 
               target="_blank" 
               class="text-primary hover:text-primary-dark text-xs ml-1">
              ↗
            </a>
          </div>
        </div>
        
        <!-- Filters -->
        <div class="flex flex-wrap gap-3 justify-center">
          <select 
            v-model="selectedYear" 
            class="input max-w-[160px]"
          >
            <option value="">All Years</option>
            <option v-for="year in years" :key="year" :value="year">{{ year }}</option>
          </select>
          
          <select 
            v-model="selectedVenue" 
            class="input max-w-[200px]"
          >
            <option value="">All Venues</option>
            <option v-for="venue in venues" :key="venue" :value="venue">{{ venue }}</option>
          </select>
          
          <select 
            v-model="selectedTopic" 
            class="input max-w-[180px]"
          >
            <option value="">All Topics</option>
            <option v-for="topic in topics" :key="topic" :value="topic">{{ topic }}</option>
          </select>
        </div>
      </div>
    </section>
    
    <!-- Publications List -->
    <section class="pb-16">
      <div class="wide-container">
        <div class="space-y-6">
          <article 
            v-for="pub in filteredPublications" 
            :key="pub.id"
            class="publication-card card card-hover fade-in"
          >
            <div class="flex justify-between items-start mb-3">
              <a 
                v-if="pub.scholarLink"
                :href="pub.scholarLink"
                target="_blank"
                class="text-lg font-semibold text-text-primary dark:text-text-primary-dark flex-1 hover:text-primary transition-colors"
              >{{ pub.title }}</a>
              <h2 v-else class="text-lg font-semibold text-text-primary dark:text-text-primary-dark flex-1">{{ pub.title }}</h2>
              <button 
                @click="showBibTeX(pub)"
                class="ml-4 text-primary hover:text-primary-dark text-sm font-medium transition-colors"
                title="View BibTeX"
              >
                BibTeX
              </button>
            </div>
            
            <p class="text-text-secondary dark:text-text-secondary-dark text-sm mb-3">
              {{ pub.authors.join(', ') }}
            </p>
            
            <div class="flex flex-wrap items-center gap-2 mb-3">
              <span class="tag tag-primary">{{ pub.venue }}</span>
              <span class="text-text-tertiary text-sm">{{ pub.year }}</span>
              <span v-for="topic in pub.topics" :key="topic" class="tag">
                {{ topic }}
              </span>
            </div>
            
            <div class="flex flex-wrap gap-4 text-sm">
              <a 
                v-if="pub.pdf" 
                :href="pub.pdf" 
                target="_blank"
                class="link"
              >
                PDF ↗
              </a>
              <a 
                v-if="pub.arxiv" 
                :href="pub.arxiv" 
                target="_blank"
                class="link"
              >
                arXiv ↗
              </a>
              <a 
                v-if="pub.code" 
                :href="pub.code" 
                target="_blank"
                class="link"
              >
                Code ↗
              </a>
            </div>
          </article>
        </div>
        
        <!-- No results message -->
        <div v-if="filteredPublications.length === 0" class="text-center py-12">
          <p class="text-text-tertiary">No publications found matching your filters.</p>
        </div>
      </div>
    </section>
    
    <!-- BibTeX Modal -->
    <Teleport to="body">
      <div 
        v-if="showBibTeXModal" 
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
        @click.self="closeBibTeX"
      >
        <div class="bg-surface-elevated dark:bg-surface-elevated-dark border border-border dark:border-border-dark rounded-lg p-6 max-w-2xl w-full max-h-[80vh] overflow-auto shadow-elevated">
          <div class="flex justify-between items-start mb-4">
            <h3 class="section-title text-primary">BibTeX Citation</h3>
            <button 
              @click="closeBibTeX"
              class="text-text-tertiary hover:text-text-primary dark:hover:text-text-primary-dark transition-colors"
            >
              ✕
            </button>
          </div>
          <pre class="bg-surface-hover dark:bg-surface-hover-dark p-4 rounded overflow-x-auto text-sm text-text-primary dark:text-text-primary-dark">{{ currentBibTeX }}</pre>
          <div class="mt-4 flex gap-3">
            <button 
              @click="copyBibTeX"
              class="btn-primary text-sm"
            >
              Copy to Clipboard
            </button>
            <button 
              @click="downloadBibTeX"
              class="btn-secondary text-sm"
            >
              Download .bib
            </button>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import publicationsData from '@/data/publications.json'

gsap.registerPlugin(ScrollTrigger)

// Filters
const selectedYear = ref('')
const selectedVenue = ref('')
const selectedTopic = ref('')
const showBibTeXModal = ref(false)
const currentBibTeX = ref('')
const currentPub = ref(null)

// Load publications from JSON file
const publications = ref(publicationsData)

// Publication Statistics
const stats = computed(() => {
  const totalCitations = publications.value.reduce((sum, pub) => sum + (pub.citations || 0), 0)
  const uniqueVenues = new Set(publications.value.map(p => p.venue))
  
  return {
    publications: publications.value.length,
    hIndex: 9 // Based on your actual h-index

  }
})

// Computed properties for filters
const years = computed(() => {
  const uniqueYears = [...new Set(publications.value.map(p => p.year))]
  return uniqueYears.sort((a, b) => b - a)
})

const venues = computed(() => {
  const uniqueVenues = [...new Set(publications.value.map(p => p.venue))]
  return uniqueVenues.sort()
})

const topics = computed(() => {
  const allTopics = publications.value.flatMap(p => p.topics)
  const uniqueTopics = [...new Set(allTopics)]
  return uniqueTopics.sort()
})

const filteredPublications = computed(() => {
  return publications.value.filter(pub => {
    const yearMatch = !selectedYear.value || pub.year === parseInt(selectedYear.value)
    const venueMatch = !selectedVenue.value || pub.venue === selectedVenue.value
    const topicMatch = !selectedTopic.value || pub.topics.includes(selectedTopic.value)
    return yearMatch && venueMatch && topicMatch
  }).sort((a, b) => b.year - a.year)
})

// Methods
const showBibTeX = (pub) => {
  currentPub.value = pub
  currentBibTeX.value = pub.bibtex
  showBibTeXModal.value = true
}

const closeBibTeX = () => {
  showBibTeXModal.value = false
}

const copyBibTeX = () => {
  navigator.clipboard.writeText(currentBibTeX.value)
  alert('BibTeX copied to clipboard!')
}

const downloadBibTeX = () => {
  const blob = new Blob([currentBibTeX.value], { type: 'text/plain' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `${currentPub.value.title.replace(/\s+/g, '_').toLowerCase()}.bib`
  a.click()
  URL.revokeObjectURL(url)
}

onMounted(() => {
  // Animate publication cards on scroll
  gsap.utils.toArray('.publication-card').forEach(card => {
    gsap.fromTo(card, 
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.4,
        scrollTrigger: {
          trigger: card,
          start: 'top 90%',
          once: true
        }
      }
    )
  })
})
</script>

<style scoped>
.stat-item {
  text-align: center;
}

.stat-value {
  display: block;
  font-size: 1.5rem;
  font-weight: 700;
  color: #3B82F6;
  margin-bottom: 0.25rem;
}

.stat-label {
  font-size: 0.875rem;
  color: #6B7280;
}

.dark .stat-label {
  color: #9CA3AF;
}

pre {
  font-family: 'JetBrains Mono', 'Fira Code', monospace;
  white-space: pre-wrap;
  word-wrap: break-word;
}
</style>
