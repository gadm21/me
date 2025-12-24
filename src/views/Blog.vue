<template>
  <div class="blog-page py-12">
    <div class="prose-container">
      <h1 class="gothic-title text-sage text-center mb-8">Thoughts</h1>

    </div>
    
    <!-- Featured Post -->
    <section v-if="featuredPost" class="mb-16 bg-charcoal/30 py-12">
      <div class="max-w-4xl mx-auto px-6">
        <span class="text-sage-dark text-sm font-medium mb-2 block">Featured</span>
        <article class="featured-post">
          <h2 class="gothic-subtitle text-sage-light mb-4">{{ featuredPost.title }}</h2>
          <div class="flex items-center gap-4 text-sm text-gray-400 mb-4">
            <span>{{ formatDate(featuredPost.date) }}</span>
            <span>•</span>
            <span>{{ featuredPost.readTime }} min read</span>
            <span>•</span>
            <span class="text-sage-dark">{{ featuredPost.category }}</span>
          </div>
          <p class="serene-text text-lg text-gray-300 mb-6">{{ featuredPost.excerpt }}</p>
          <router-link :to="`/blog/${featuredPost.slug}`" class="link-gothic">
            Continue reading →
          </router-link>
        </article>
      </div>
    </section>
    
    <!-- Blog Categories -->
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
    
    <!-- Blog Posts Grid -->
    <section class="mb-16">
      <div class="max-w-6xl mx-auto px-6">
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <article 
            v-for="post in filteredPosts" 
            :key="post.id"
            class="blog-card card-calm h-full flex flex-col"
          >
            <div v-if="post.image" class="mb-4 -mx-6 -mt-6">
              <img 
                :src="post.image" 
                :alt="post.title"
                class="w-full h-48 object-cover"
              >
            </div>
            <span class="text-sage-dark text-xs font-medium mb-2">{{ post.category }}</span>
            <h3 class="font-serif text-xl text-gray-300 mb-3">{{ post.title }}</h3>
            <p class="text-gray-500 text-sm mb-4 flex-1">{{ post.excerpt }}</p>
            <div class="flex items-center justify-between text-sm">
              <span class="text-gray-400">{{ formatDate(post.date) }}</span>
              <router-link :to="`/blog/${post.slug}`" class="link-gothic text-sm">
                Read more →
              </router-link>
            </div>
          </article>
        </div>
        
        <!-- Load More -->
        <div v-if="hasMore" class="text-center mt-12">
          <button @click="loadMore" class="btn-gothic">
            Load More Posts
          </button>
        </div>
      </div>
    </section>
    
    <!-- Newsletter Signup -->
    <section class="bg-charcoal/50 py-12">
      <div class="prose-container text-center">
        <h2 class="gothic-subtitle text-sage mb-4">Stay Connected</h2>
        <p class="text-gray-400 mb-6">
          Subscribe to receive updates on new research, publications, and insights
        </p>
        <form @submit.prevent="subscribe" class="flex gap-3 max-w-md mx-auto">
          <input 
            v-model="email"
            type="email" 
            placeholder="your@email.com"
            required
            class="flex-1 px-4 py-2 bg-charcoal border border-slate text-gray-300 focus:border-sage-dark focus:outline-none transition-colors"
          >
          <button type="submit" class="btn-gothic">
            Subscribe
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

gsap.registerPlugin(ScrollTrigger)

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
.category-btn {
  @apply px-4 py-2 text-sm text-gray-400 border border-slate 
         hover:border-sage-dark hover:text-sage-light transition-all duration-250;
}

.category-btn.active {
  @apply bg-sage-dark text-ink border-sage;
}

.featured-post {
  @apply relative;
}

.featured-post::before {
  content: '✦';
  @apply absolute -left-8 top-0 text-sage-dark text-2xl;
}

@media (max-width: 768px) {
  .featured-post::before {
    @apply -left-4;
  }
}
</style>
