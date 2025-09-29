<template>
  <div class="awards-page py-12">
    <!-- Header Section -->
    <section class="awards-header mb-12">
      <div class="prose-container text-center">
        <h1 class="gothic-title text-sage mb-4">Awards & Recognition</h1>
        
        
      </div>
    </section>
    
    <!-- Awards Categories -->
    <section class="mb-16">
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
    
    <!-- Awards Grid -->
    <section class="mb-16">
      <div class="max-w-6xl mx-auto px-6">
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div 
            v-for="award in filteredAwards" 
            :key="award.id"
            class="award-card card-calm h-full"
          >
            <div class="flex items-start justify-between mb-4">
              <div class="award-icon">
                <span class="text-2xl">{{ getAwardIcon(award) }}</span>
              </div>
              <span class="text-sage-dark text-sm font-medium">{{ award.year }}</span>
            </div>
            
            <h3 class="font-serif text-lg text-gray-300 dark:text-gray-300 text-gray-700 mb-2">
              {{ award.title }}
            </h3>
            
            <p class="text-sage-light text-sm mb-3">{{ award.organization }}</p>
            
            <p class="text-gray-500 dark:text-gray-500 text-gray-600 text-sm mb-4 flex-1">
              {{ award.description }}
            </p>
            
            <div v-if="award.amount" class="award-amount">
              <span class="text-sage font-medium">{{ award.amount }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Timeline View -->
    <section class="bg-charcoal/30 dark:bg-charcoal/30 bg-cream/30 py-16 mb-16">
      <div class="prose-container">
        <h2 class="gothic-subtitle text-sage mb-8 text-center">Achievement Timeline</h2>
        <div class="timeline relative">
          <div 
            v-for="(award, index) in sortedAwards" 
            :key="award.id"
            class="timeline-item"
            :class="{ 'timeline-right': index % 2 === 1 }"
          >
            <div class="timeline-content card-calm">
              <span class="text-sage-dark font-medium">{{ award.year }}</span>
              <h3 class="font-serif text-lg text-gray-300 dark:text-gray-300 text-gray-700 mt-2 mb-2">
                {{ award.title }}
              </h3>
              <p class="text-sage-light text-sm mb-2">{{ award.organization }}</p>
              <p class="text-gray-500 dark:text-gray-500 text-gray-600 text-sm">
                {{ award.description }}
              </p>
              <div v-if="award.amount" class="mt-3">
                <span class="text-sage font-medium text-sm">{{ award.amount }}</span>
              </div>
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
import awardsData from '@/data/cv/awards.json'

gsap.registerPlugin(ScrollTrigger)

const selectedCategory = ref(null)
const awards = ref(awardsData)

// Categories for filtering
const categories = computed(() => {
  const cats = ['All']
  const uniqueTypes = new Set()
  
  awards.value.forEach(award => {
    if (award.organization.includes('University') || award.organization.includes('IEEE') || award.organization.includes('ACM')) {
      uniqueTypes.add('Academic')
    } else if (award.title.includes('Certificate') || award.title.includes('Certified') || award.title.includes('Nanodegree') || award.title.includes('MicroMaster')) {
      uniqueTypes.add('Certifications')
    } else if (award.title.includes('Grant') || award.title.includes('Scholarship')) {
      uniqueTypes.add('Grants & Scholarships')
    } else {
      uniqueTypes.add('Awards')
    }
  })
  
  return [...cats, ...Array.from(uniqueTypes)]
})

// Filter awards based on selected category
const filteredAwards = computed(() => {
  if (!selectedCategory.value || selectedCategory.value === 'All') {
    return awards.value
  }
  
  return awards.value.filter(award => {
    const category = selectedCategory.value
    
    if (category === 'Academic') {
      return award.organization.includes('University') || award.organization.includes('IEEE') || award.organization.includes('ACM')
    } else if (category === 'Certifications') {
      return award.title.includes('Certificate') || award.title.includes('Certified') || award.title.includes('Nanodegree') || award.title.includes('MicroMaster')
    } else if (category === 'Grants & Scholarships') {
      return award.title.includes('Grant') || award.title.includes('Scholarship')
    } else if (category === 'Awards') {
      return !award.title.includes('Certificate') && !award.title.includes('Certified') && 
             !award.title.includes('Nanodegree') && !award.title.includes('MicroMaster') &&
             !award.title.includes('Grant') && !award.title.includes('Scholarship')
    }
    
    return true
  })
})

// Sort awards by year (most recent first)
const sortedAwards = computed(() => {
  return [...awards.value].sort((a, b) => b.year - a.year)
})

// Statistics
const totalAwards = computed(() => awards.value.length)

const totalValue = computed(() => {
  const amounts = awards.value
    .filter(award => award.amount)
    .map(award => {
      const amount = award.amount.replace(/[^0-9.]/g, '')
      return parseFloat(amount) || 0
    })
  
  if (amounts.length === 0) return 'N/A'
  
  const total = amounts.reduce((sum, amount) => sum + amount, 0)
  return total > 1000 ? `$${(total / 1000).toFixed(0)}K+` : `$${total.toFixed(0)}+`
})

const yearsSpan = computed(() => {
  if (awards.value.length === 0) return 0
  const years = awards.value.map(award => award.year)
  const minYear = Math.min(...years)
  const maxYear = Math.max(...years)
  return `${maxYear - minYear + 1} years`
})

const certifications = computed(() => {
  return awards.value.filter(award => 
    award.title.includes('Certificate') || 
    award.title.includes('Certified') || 
    award.title.includes('Nanodegree') || 
    award.title.includes('MicroMaster')
  ).length
})

// Get appropriate icon for award type
const getAwardIcon = (award) => {
  if (award.title.includes('place') || award.title.includes('Award')) {
    return '🏆'
  } else if (award.title.includes('Grant') || award.title.includes('Scholarship')) {
    return '💰'
  } else if (award.title.includes('Certificate') || award.title.includes('Certified')) {
    return '📜'
  } else if (award.title.includes('Nanodegree') || award.title.includes('MicroMaster')) {
    return '🎓'
  } else {
    return '⭐'
  }
}

onMounted(() => {
  // Animate award cards
  gsap.utils.toArray('.award-card').forEach((card, index) => {
    gsap.fromTo(card, 
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
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
  
  // Animate timeline items
  gsap.utils.toArray('.timeline-item').forEach((item, index) => {
    gsap.fromTo(item, 
      { opacity: 0, x: index % 2 === 0 ? -50 : 50 },
      {
        opacity: 1,
        x: 0,
        duration: 0.6,
        delay: index * 0.2,
        scrollTrigger: {
          trigger: item,
          start: 'top 85%',
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

.category-btn {
  @apply px-4 py-2 text-sm text-gray-400 dark:text-gray-400 text-gray-600 border border-slate dark:border-slate border-silver
         hover:border-sage-dark hover:text-sage-light dark:hover:text-sage-light hover:text-sage-dark transition-all duration-250;
}

.category-btn.active {
  @apply bg-sage-dark text-ink border-sage;
}

.award-card {
  @apply transition-transform duration-250 hover:scale-105;
}

.award-icon {
  @apply w-12 h-12 bg-sage-dark/20 dark:bg-sage-dark/20 bg-sage-light/20 rounded-full flex items-center justify-center;
}

.award-amount {
  @apply mt-auto pt-3 border-t border-slate dark:border-slate border-silver;
}

.timeline {
  @apply max-w-4xl mx-auto relative;
}

.timeline::before {
  content: '';
  @apply absolute left-1/2 top-0 bottom-0 w-0.5 bg-sage-dark transform -translate-x-1/2;
}

.timeline-item {
  @apply relative mb-8 w-1/2;
}

.timeline-item:nth-child(odd) {
  @apply pr-8;
}

.timeline-item:nth-child(even) {
  @apply pl-8 ml-auto;
}

.timeline-item::before {
  content: '';
  @apply absolute top-6 w-4 h-4 bg-sage-dark rounded-full border-4 border-ink dark:border-ink border-paper z-10;
}

.timeline-item:nth-child(odd)::before {
  @apply -right-2;
}

.timeline-item:nth-child(even)::before {
  @apply -left-2;
}

.timeline-content {
  @apply relative;
}

@media (max-width: 768px) {
  .timeline::before {
    @apply left-8;
  }
  
  .timeline-item {
    @apply w-full pl-16 pr-0 ml-0;
  }
  
  .timeline-item::before {
    @apply left-6;
  }
}
</style>
