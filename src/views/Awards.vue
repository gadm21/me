<template>
  <div class="awards-page" :dir="isRTL ? 'rtl' : 'ltr'">
    <!-- Header Section -->
    <section class="section pb-8">
      <div class="content-container text-center">
        <h1 class="page-title mb-4">{{ t('awards.title') }}</h1>
      </div>
    </section>
    
    <!-- Awards Categories -->
    <section class="pb-8">
      <div class="wide-container">
        <div class="flex flex-wrap gap-2 justify-center">
          <button 
            v-for="category in categories" 
            :key="category"
            @click="selectedCategory = selectedCategory === category ? null : category"
            class="px-4 py-2 text-sm font-medium rounded-lg border transition-all duration-200"
            :class="selectedCategory === category 
              ? 'bg-primary text-white border-primary' 
              : 'text-text-secondary dark:text-text-secondary-dark border-border dark:border-border-dark hover:border-primary hover:text-primary'"
          >
            {{ category }}
          </button>
        </div>
      </div>
    </section>
    
    <!-- Awards Grid -->
    <section class="pb-16">
      <div class="wide-container">
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div 
            v-for="award in filteredAwards" 
            :key="award.id"
            class="card card-hover h-full flex flex-col"
          >
            <div class="flex items-start justify-between mb-4">
              <div class="w-12 h-12 bg-primary-subtle dark:bg-primary/10 rounded-full flex items-center justify-center">
                <span class="text-2xl">{{ getAwardIcon(award) }}</span>
              </div>
              <span class="text-primary text-sm font-medium">{{ award.year }}</span>
            </div>
            
            <h3 class="text-lg font-semibold text-text-primary dark:text-text-primary-dark mb-2">
              {{ award.title }}
            </h3>
            
            <p class="text-primary text-sm mb-3">{{ award.organization }}</p>
            
            <p class="text-text-secondary dark:text-text-secondary-dark text-sm mb-4 flex-1">
              {{ award.description }}
            </p>
            
            <div v-if="award.amount" class="mt-auto pt-3 border-t border-border dark:border-border-dark">
              <span class="text-primary font-medium">{{ award.amount }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Timeline View -->
    <section class="bg-surface-hover/50 dark:bg-surface-hover-dark/30 py-16">
      <div class="content-container">
        <h2 class="section-title text-center mb-8">{{ t('awards.achievementTimeline') }}</h2>
        <div class="timeline relative">
          <div 
            v-for="(award, index) in sortedAwards" 
            :key="award.id"
            class="timeline-item"
            :class="{ 'timeline-right': index % 2 === 1 }"
          >
            <div class="timeline-content card">
              <span class="text-primary font-medium">{{ award.year }}</span>
              <h3 class="text-lg font-semibold text-text-primary dark:text-text-primary-dark mt-2 mb-2">
                {{ award.title }}
              </h3>
              <p class="text-primary text-sm mb-2">{{ award.organization }}</p>
              <p class="text-text-secondary dark:text-text-secondary-dark text-sm">
                {{ award.description }}
              </p>
              <div v-if="award.amount" class="mt-3">
                <span class="text-primary font-medium text-sm">{{ award.amount }}</span>
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
import { useI18n } from '@/composables/useI18n'

gsap.registerPlugin(ScrollTrigger)

const { t, isRTL } = useI18n()

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
.timeline {
  max-width: 56rem;
  margin-left: auto;
  margin-right: auto;
  position: relative;
}

.timeline::before {
  content: '';
  position: absolute;
  left: 50%;
  top: 0;
  bottom: 0;
  width: 2px;
  background-color: #3B82F6;
  transform: translateX(-50%);
}

.timeline-item {
  position: relative;
  margin-bottom: 2rem;
  width: 50%;
}

.timeline-item:nth-child(odd) {
  padding-right: 2rem;
}

.timeline-item:nth-child(even) {
  padding-left: 2rem;
  margin-left: auto;
}

.timeline-item::before {
  content: '';
  position: absolute;
  top: 1.5rem;
  width: 1rem;
  height: 1rem;
  background-color: #3B82F6;
  border-radius: 50%;
  border: 4px solid white;
  z-index: 10;
}

.dark .timeline-item::before {
  border-color: #1F2937;
}

.timeline-item:nth-child(odd)::before {
  right: -0.5rem;
}

.timeline-item:nth-child(even)::before {
  left: -0.5rem;
}

.timeline-content {
  position: relative;
}

@media (max-width: 768px) {
  .timeline::before {
    left: 2rem;
  }
  
  .timeline-item {
    width: 100%;
    padding-left: 4rem;
    padding-right: 0;
    margin-left: 0;
  }
  
  .timeline-item::before {
    left: 1.5rem;
    right: auto;
  }
}
</style>
