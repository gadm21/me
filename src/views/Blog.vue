<template>
  <div class="blog-page" :dir="isRTL ? 'rtl' : 'ltr'">
    <!-- Header -->
    <section class="section pb-8">
      <div class="content-container text-center">
        <h1 class="page-title mb-4">{{ t('blog.title') }}</h1>
      </div>
    </section>
    
    <!-- Featured Post -->
    <section v-if="featuredPost" class="pb-16 bg-surface-hover/50 dark:bg-surface-hover-dark/30 py-12">
      <div class="content-container">
        <span class="text-primary text-sm font-medium mb-2 block">{{ t('blog.featured') }}</span>
        <article class="featured-post">
          <h2 class="section-title mb-4">{{ featuredPost.title }}</h2>
          <div class="flex items-center gap-4 text-sm text-text-tertiary mb-4">
            <span>{{ formatDate(featuredPost.date) }}</span>
            <span>•</span>
            <span>{{ featuredPost.readTime }} {{ t('blog.minRead') }}</span>
            <span>•</span>
            <span class="text-primary">{{ featuredPost.category }}</span>
          </div>
          <p class="body-text text-lg mb-6">{{ featuredPost.excerpt }}</p>
          <router-link :to="`/blog/${featuredPost.slug}`" class="link">
            {{ t('blog.continueReading') }}
          </router-link>
        </article>
      </div>
    </section>
    
    <!-- Blog Categories -->
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
    
    <!-- Blog Posts Grid -->
    <section class="pb-16">
      <div class="wide-container">
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <article 
            v-for="post in filteredPosts" 
            :key="post.id"
            class="blog-card card card-hover h-full flex flex-col"
          >
            <div v-if="post.image" class="mb-4 -mx-6 -mt-6 rounded-t-lg overflow-hidden">
              <img 
                :src="post.image" 
                :alt="post.title"
                class="w-full h-48 object-cover"
              >
            </div>
            <span class="text-primary text-xs font-medium mb-2">{{ post.category }}</span>
            <h3 class="text-lg font-semibold text-text-primary dark:text-text-primary-dark mb-3">{{ post.title }}</h3>
            <p class="text-text-secondary dark:text-text-secondary-dark text-sm mb-4 flex-1">{{ post.excerpt }}</p>
            <div class="flex items-center justify-between text-sm">
              <span class="text-text-tertiary">{{ formatDate(post.date) }}</span>
              <router-link :to="`/blog/${post.slug}`" class="link text-sm">
                {{ t('blog.readMore') }}
              </router-link>
            </div>
          </article>
        </div>
        
        <!-- Load More -->
        <div v-if="hasMore" class="text-center mt-12">
          <button @click="loadMore" class="btn-secondary">
            {{ t('blog.loadMore') }}
          </button>
        </div>
      </div>
    </section>
    
    <!-- Newsletter Signup -->
    <section class="bg-surface-hover/50 dark:bg-surface-hover-dark/30 py-12">
      <div class="content-container text-center">
        <h2 class="section-title mb-4">{{ t('blog.stayConnected') }}</h2>
        <p class="text-text-secondary dark:text-text-secondary-dark mb-6">
          {{ t('blog.subscribeText') }}
        </p>
        <form @submit.prevent="subscribe" class="flex gap-3 max-w-md mx-auto">
          <input 
            v-model="email"
            type="email" 
            placeholder="your@email.com"
            required
            class="input flex-1"
          >
          <button type="submit" class="btn-primary">
            {{ t('blog.subscribe') }}
          </button>
        </form>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import blogData from '@/data/blog.json'
import { useI18n } from '@/composables/useI18n'

gsap.registerPlugin(ScrollTrigger)

const { t, isRTL } = useI18n()

const selectedCategory = ref(null)
const email = ref('')
const postsPerPage = ref(6)
const currentPage = ref(1)

// Load blog posts from JSON file and convert date strings to Date objects
const blogPosts = ref(blogData.map(post => ({
  ...post,
  date: new Date(post.date)
})))

const categories = computed(() => {
  const cats = ['All', ...new Set(blogPosts.value.map(p => p.category))]
  return cats
})

const featuredPost = computed(() => {
  return blogPosts.value.find(p => p.featured)
})

const filteredPosts = computed(() => {
  let posts = blogPosts.value.filter(p => !p.featured)
  
  if (selectedCategory.value && selectedCategory.value !== 'All') {
    posts = posts.filter(p => p.category === selectedCategory.value)
  }
  
  return posts.slice(0, currentPage.value * postsPerPage.value)
})

const hasMore = computed(() => {
  const total = selectedCategory.value && selectedCategory.value !== 'All'
    ? blogPosts.value.filter(p => p.category === selectedCategory.value).length
    : blogPosts.value.length
  return filteredPosts.value.length < total - 1 // -1 for featured post
})

const formatDate = (date) => {
  return new Intl.DateTimeFormat('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  }).format(date)
}

const loadMore = () => {
  currentPage.value++
}

const subscribe = () => {
  // In a real app, this would submit to a newsletter service
  alert(`Thank you for subscribing with ${email.value}!`)
  email.value = ''
}

onMounted(() => {
  // Animate blog cards on scroll
  gsap.utils.toArray('.blog-card').forEach((card, index) => {
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
})
</script>

<style scoped>
.featured-post {
  position: relative;
}

.featured-post::before {
  content: '✦';
  position: absolute;
  left: -2rem;
  top: 0;
  color: #3B82F6;
  font-size: 1.5rem;
}

@media (max-width: 768px) {
  .featured-post::before {
    left: -1rem;
  }
}
</style>
