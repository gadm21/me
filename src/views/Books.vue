<template>
  <div class="books-page py-12">
    <div class="prose-container">
      <h1 class="gothic-title text-sage text-center mb-8">Literary Journey</h1>
      <p class="serene-text text-xl text-center mb-12">
        Books that have shaped my perspective and understanding
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
    
    <!-- Reading Stats -->
    <section class="mb-16 bg-charcoal/30 py-12">
      <div class="max-w-4xl mx-auto px-6">
        <h2 class="gothic-subtitle text-sage mb-8 text-center">Reading Statistics</h2>
        <div class="grid md:grid-cols-4 gap-6 text-center">
          <div class="stat-card">
            <div class="text-3xl font-bold text-sage-light mb-2">{{ totalBooks }}</div>
            <div class="text-gray-400 text-sm">Books Read</div>
          </div>
          <div class="stat-card">
            <div class="text-3xl font-bold text-sage-light mb-2">{{ favoriteAuthor }}</div>
            <div class="text-gray-400 text-sm">Favorite Author</div>
          </div>

          <div class="stat-card">
            <div class="text-3xl font-bold text-sage-light mb-2">{{ categories.length - 1 }}</div>
            <div class="text-gray-400 text-sm">Categories</div>
          </div>

        </div>
      </div>
    </section>
    
    <!-- Books Grid -->
    <section class="mb-16">
      <div class="max-w-7xl mx-auto px-6">
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
                  <h3 class="font-serif text-lg text-white mb-2">{{ book.title }}</h3>
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
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80"
        @click.self="selectedBook = null"
      >
        <div class="bg-charcoal border border-slate rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div class="p-6">
            <div class="flex justify-between items-start mb-4">
              <div>
                <h2 class="gothic-subtitle text-sage-light mb-2">{{ selectedBook.title }}</h2>
                <p class="text-gray-400 mb-2">by {{ selectedBook.author }}</p>
                <span class="category-badge">{{ selectedBook.category }}</span>
              </div>
              <button 
                @click="selectedBook = null"
                class="text-gray-400 hover:text-gray-300 text-2xl"
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
                <p class="text-gray-300 leading-relaxed">{{ selectedBook.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
    
    <!-- Reading Philosophy -->
    <section class="bg-charcoal/50 py-12">
      <div class="prose-container text-center">
        <h2 class="gothic-subtitle text-sage mb-6">Reading Philosophy</h2>
        <p class="text-gray-400 text-lg leading-relaxed max-w-3xl mx-auto">
          "A reader lives a thousand lives before he dies. The man who never reads lives only one." 
          These books have been companions in my intellectual journey, each offering unique perspectives 
          on technology, philosophy, human nature, and the complexities of our world. From classic literature 
          to contemporary non-fiction, each book has contributed to shaping my understanding of both 
          technical and humanistic domains.
        </p>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useData } from '../composables/useData'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

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
  event.target.src = '/assets/img/book-placeholder.jpg'
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
.category-btn {
  @apply px-4 py-2 text-sm text-gray-400 border border-slate 
         hover:border-sage-dark hover:text-sage-light transition-all duration-250;
}

.category-btn.active {
  @apply bg-sage-dark text-ink border-sage;
}

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
  @apply cursor-pointer transition-all duration-300 hover:scale-105;
  perspective: 1000px;
}

.book-cover {
  @apply relative w-full aspect-[3/4] rounded-lg overflow-hidden shadow-lg;
  background: linear-gradient(135deg, #2d3748, #4a5568);
}

.book-overlay {
  @apply absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent 
         opacity-0 hover:opacity-100 transition-opacity duration-300;
}

.book-info {
  @apply absolute bottom-0 left-0 right-0 p-4;
}

.category-badge {
  @apply inline-block px-2 py-1 bg-sage-dark text-ink text-xs rounded;
}

.stat-card {
  @apply p-4 bg-midnight rounded-lg;
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

/* Mobile responsiveness */
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
