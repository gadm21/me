<template>
  <div class="books-page" :dir="isRTL ? 'rtl' : 'ltr'">
    <!-- Header -->
    <section class="section pb-8">
      <div class="content-container text-center">
        <h1 class="page-title mb-4">{{ t('books.title') }}</h1>
        <p class="subtitle">
          {{ t('books.subtitle') }}
        </p>
      </div>
    </section>
    
    <!-- Category Filter -->
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
    
    <!-- Reading Stats -->
    <section class="pb-16 bg-surface-hover/50 dark:bg-surface-hover-dark/30 py-12">
      <div class="content-container">
        <h2 class="section-title text-center mb-8">{{ t('books.readingStats') }}</h2>
        <div class="grid md:grid-cols-3 gap-6 text-center">
          <div class="stat-card card">
            <div class="text-3xl font-bold text-primary mb-2">{{ totalBooks }}</div>
            <div class="text-text-tertiary text-sm">{{ t('books.booksRead') }}</div>
          </div>
          <div class="stat-card card">
            <div class="text-3xl font-bold text-primary mb-2">{{ favoriteAuthor }}</div>
            <div class="text-text-tertiary text-sm">{{ t('books.favoriteAuthor') }}</div>
          </div>
          <div class="stat-card card">
            <div class="text-3xl font-bold text-primary mb-2">{{ categories.length - 1 }}</div>
            <div class="text-text-tertiary text-sm">{{ t('books.categories') }}</div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Books Grid -->
    <section class="pb-16">
      <div class="wide-container">
        <div class="books-grid">
          <div 
            v-for="book in filteredBooks" 
            :key="book.id"
            class="book-card"
            @click="selectedBook = book"
          >
            <div class="book-cover">
              <img 
                :src="book.image" 
                :alt="book.title"
                class="w-full h-full object-cover"
                @error="handleImageError"
              >
              <div class="book-overlay">
                <div class="book-info">
                  <h3 class="font-semibold text-lg text-white mb-2">{{ book.title }}</h3>
                  <p class="text-gray-300 text-sm mb-2">{{ book.author }}</p>
                  <span class="category-badge">{{ book.category }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Book Modal -->
    <transition name="modal">
      <div 
        v-if="selectedBook" 
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
        @click.self="selectedBook = null"
      >
        <div class="bg-surface-elevated dark:bg-surface-elevated-dark border border-border dark:border-border-dark rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-elevated">
          <div class="p-6">
            <div class="flex justify-between items-start mb-4">
              <div>
                <h2 class="section-title mb-2">{{ selectedBook.title }}</h2>
                <p class="text-text-secondary dark:text-text-secondary-dark mb-2">by {{ selectedBook.author }}</p>
                <span class="tag tag-primary">{{ selectedBook.category }}</span>
              </div>
              <button 
                @click="selectedBook = null"
                class="text-text-tertiary hover:text-text-primary dark:hover:text-text-primary-dark text-2xl transition-colors"
              >
                ×
              </button>
            </div>
            
            <div class="flex gap-6">
              <div class="flex-shrink-0">
                <img 
                  :src="selectedBook.image" 
                  :alt="selectedBook.title"
                  class="w-32 h-48 object-cover rounded"
                  @error="handleImageError"
                >
              </div>
              <div class="flex-1">
                <p class="text-text-secondary dark:text-text-secondary-dark leading-relaxed">{{ selectedBook.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
    
    <!-- Reading Philosophy -->
    <section class="bg-surface-hover/50 dark:bg-surface-hover-dark/30 py-12">
      <div class="content-container text-center">
        <h2 class="section-title mb-6">{{ t('books.readingPhilosophy') }}</h2>
        <p class="text-text-secondary dark:text-text-secondary-dark text-lg leading-relaxed max-w-3xl mx-auto">
          {{ t('books.philosophyText') }}
        </p>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useData } from '../composables/useData'
import { useI18n } from '@/composables/useI18n'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const { t, isRTL } = useI18n()

const { data: books, loading, error } = useData('/src/data/books.json')
const selectedCategory = ref(null)
const selectedBook = ref(null)

const categories = computed(() => {
  if (!books.value) return ['All']
  const cats = ['All', ...new Set(books.value.map(book => book.category))]
  return cats
})

const filteredBooks = computed(() => {
  if (!books.value) return []
  
  let filtered = books.value
  if (selectedCategory.value && selectedCategory.value !== 'All') {
    filtered = filtered.filter(book => book.category === selectedCategory.value)
  }
  
  return filtered
})

const totalBooks = computed(() => books.value?.length || 0)

const uniqueAuthors = computed(() => {
  if (!books.value) return 0
  return new Set(books.value.map(book => book.author)).size
})

const favoriteGenre = computed(() => {
  if (!books.value) return 'Novel'
  const genreCounts = {}
  books.value.forEach(book => {
    genreCounts[book.category] = (genreCounts[book.category] || 0) + 1
  })
  return Object.keys(genreCounts).reduce((a, b) => 
    genreCounts[a] > genreCounts[b] ? a : b
  )
})

const favoriteAuthor = computed(() => {
  if (!books.value) return 'Unknown'
  const authorCounts = {}
  books.value.forEach(book => {
    authorCounts[book.author] = (authorCounts[book.author] || 0) + 1
  })
  return Object.keys(authorCounts).reduce((a, b) => 
    authorCounts[a] > authorCounts[b] ? a : b
  )
})

const handleImageError = (event) => {
  console.error('Error loading image:', event.target.src)
  event.target.src = '/assets/img/book-placeholder.jpg'
  event.target.onerror = null // Prevent infinite loop if placeholder also fails
  event.target.alt = 'Book cover not available'
  event.target.classList.add('opacity-50')
}

onMounted(() => {
  // Animate book cards on scroll
  gsap.utils.toArray('.book-card').forEach((card, index) => {
    gsap.fromTo(card, 
      { opacity: 0, y: 30, rotateY: -15 },
      {
        opacity: 1,
        y: 0,
        rotateY: 0,
        duration: 0.6,
        delay: index * 0.05,
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
.books-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 2rem;
}

@media (max-width: 768px) {
  .books-grid {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 1rem;
  }
}

.book-card {
  cursor: pointer;
  transition: all 0.3s ease;
  perspective: 1000px;
}

.book-card:hover {
  transform: scale(1.05);
}

.book-cover {
  position: relative;
  width: 100%;
  aspect-ratio: 3/4;
  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  background: linear-gradient(135deg, #E5E7EB, #D1D5DB);
}

.dark .book-cover {
  background: linear-gradient(135deg, #374151, #4B5563);
}

.book-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0,0,0,0.8), transparent, transparent);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.book-card:hover .book-overlay {
  opacity: 1;
}

.book-info {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 1rem;
}

.category-badge {
  display: inline-block;
  padding: 0.25rem 0.5rem;
  background-color: #3B82F6;
  color: white;
  font-size: 0.75rem;
  border-radius: 0.25rem;
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.2s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

@media (max-width: 640px) {
  .books-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .book-info h3 {
    font-size: 0.9rem;
  }
  
  .book-info p {
    font-size: 0.8rem;
  }
}
</style>
