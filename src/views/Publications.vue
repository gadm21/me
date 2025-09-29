<template>
  <div class="publications-page py-12">
    <div class="prose-container mb-12">
      <h1 class="gothic-title text-sage text-center mb-8">Publications</h1>
      
      <!-- Publication Statistics -->
      <div class="flex flex-wrap justify-center gap-6 mb-8">
        <div class="stat-item">
          <span class="stat-value">{{ stats.publications }}</span>
          <span class="stat-label">Publications</span>
        </div>
        <div class="stat-item">
          <span class="stat-value">{{ stats.hIndex }}</span>
          <span class="stat-label">h-index</span>
          <a href="https://scholar.google.com/citations?user=bZRYJuAAAAAJ&hl=en" 
             target="_blank" 
             class="text-sage-dark hover:text-sage text-xs ml-1">
            ↗
          </a>
        </div>

      </div>
      
      <!-- Filters -->
      <div class="filters mb-8">
        <div class="flex flex-wrap gap-4 justify-center">
          <select 
            v-model="selectedYear" 
            class="filter-select"
          >
            <option value="">All Years</option>
            <option v-for="year in years" :key="year" :value="year">{{ year }}</option>
          </select>
          
          <select 
            v-model="selectedVenue" 
            class="filter-select"
          >
            <option value="">All Venues</option>
            <option v-for="venue in venues" :key="venue" :value="venue">{{ venue }}</option>
          </select>
          
          <select 
            v-model="selectedTopic" 
            class="filter-select"
          >
            <option value="">All Topics</option>
            <option v-for="topic in topics" :key="topic" :value="topic">{{ topic }}</option>
          </select>
        </div>
      </div>
    </div>
    
    <!-- Publications List -->
    <div class="max-w-5xl mx-auto px-6">
      <div class="space-y-8">
        <article 
          v-for="pub in filteredPublications" 
          :key="pub.id"
          class="publication-card card-calm fade-in"
        >
          <div class="flex justify-between items-start mb-3">
            <h2 class="font-serif text-xl text-gray-300 flex-1">{{ pub.title }}</h2>
            <button 
              @click="showBibTeX(pub)"
              class="ml-4 text-sage-dark hover:text-sage text-sm transition-colors"
              title="View BibTeX"
            >
              BibTeX
            </button>
          </div>
          
          <p class="text-gray-400 mb-3">
            {{ pub.authors.join(', ') }}
          </p>
          
          <div class="flex flex-wrap items-center gap-3 mb-3">
            <span class="venue-badge">{{ pub.venue }}</span>
            <span class="text-gray-500 text-sm">{{ pub.year }}</span>
            <span v-for="topic in pub.topics" :key="topic" class="topic-tag">
              {{ topic }}
            </span>
          </div>
          
          <p class="text-gray-500 text-sm mb-4 italic">{{ pub.abstract }}</p>
          
          <div class="flex flex-wrap gap-4 text-sm">
            <a 
              v-if="pub.pdf" 
              :href="pub.pdf" 
              target="_blank"
              class="link-gothic"
            >
              PDF ↗
            </a>
            <a 
              v-if="pub.arxiv" 
              :href="pub.arxiv" 
              target="_blank"
              class="link-gothic"
            >
              arXiv ↗
            </a>
            <a 
              v-if="pub.citations" 
              :href="`https://scholar.google.com/scholar?cites=${pub.scholarId}`"
              target="_blank"
              class="link-gothic"
            >
              Cited by {{ pub.citations }} ↗
            </a>
            <a 
              v-if="pub.code" 
              :href="pub.code" 
              target="_blank"
              class="link-gothic"
            >
              Code ↗
            </a>
          </div>
        </article>
      </div>
      
      <!-- No results message -->
      <div v-if="filteredPublications.length === 0" class="text-center py-12">
        <p class="text-gray-500">No publications found matching your filters.</p>
      </div>
    </div>
    
    <!-- BibTeX Modal -->
    <Teleport to="body">
      <div 
        v-if="showBibTeXModal" 
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80"
        @click.self="closeBibTeX"
      >
        <div class="bg-charcoal border border-slate rounded-lg p-6 max-w-2xl w-full max-h-[80vh] overflow-auto">
          <div class="flex justify-between items-start mb-4">
            <h3 class="gothic-subtitle text-sage">BibTeX Citation</h3>
            <button 
              @click="closeBibTeX"
              class="text-gray-400 hover:text-gray-300"
            >
              ✕
            </button>
          </div>
          <pre class="bg-midnight p-4 rounded overflow-x-auto text-sm text-gray-300">{{ currentBibTeX }}</pre>
          <div class="mt-4 flex gap-3">
            <button 
              @click="copyBibTeX"
              class="btn-gothic text-sm"
            >
              Copy to Clipboard
            </button>
            <button 
              @click="downloadBibTeX"
              class="btn-gothic text-sm"
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
    hIndex: 8 // Based on your actual h-index

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
  @apply text-center;
}

.stat-value {
  @apply block text-2xl font-bold text-sage-light mb-1;
}

.stat-label {
  @apply text-sm text-gray-500 dark:text-gray-500 text-gray-600;
}

.filter-select {
  @apply px-4 py-2 bg-charcoal dark:bg-charcoal bg-pearl border border-slate dark:border-slate border-silver text-gray-300 dark:text-gray-300 text-gray-700
         focus:border-sage-dark focus:outline-none transition-colors duration-250;
}

.topic-tag {
  @apply px-2 py-1 bg-midnight text-xs text-gray-400 border border-slate;
}

pre {
  font-family: 'Courier New', monospace;
  white-space: pre-wrap;
  word-wrap: break-word;
}
</style>
