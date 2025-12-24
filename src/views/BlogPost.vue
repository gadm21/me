<template>
  <div class="blog-post-page py-12">
    <div v-if="post" class="max-w-4xl mx-auto px-6">
      <!-- Back to Blog -->
      <nav class="mb-8">
        <router-link to="/blog" class="link-gothic text-sm">
          ← Back to Blog
        </router-link>
      </nav>
      
      <!-- Article Header -->
      <header class="mb-8">
        <div class="mb-4">
          <span class="text-sage-dark text-sm font-medium">{{ post.category }}</span>
        </div>
        <h1 class="gothic-title text-sage-light mb-4">{{ post.title }}</h1>
        <div class="flex items-center gap-4 text-sm text-gray-400 mb-6">
          <span>{{ formatDate(post.date) }}</span>
          <span>•</span>
          <span>{{ post.readTime }} min read</span>
        </div>
        <div v-if="post.image" class="mb-8">
          <img 
            :src="post.image" 
            :alt="post.title"
            class="w-full h-64 object-cover rounded-lg"
          >
        </div>
      </header>
      
      <!-- Article Content -->
      <article class="prose prose-invert prose-sage max-w-none">
        <div v-html="renderedContent"></div>
      </article>
      
      <!-- Article Footer -->
      <footer class="mt-12 pt-8 border-t border-slate">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-4">
            <span class="text-gray-400 text-sm">Share this article:</span>
            <button @click="shareArticle('twitter')" class="link-gothic text-sm">
              Twitter
            </button>
            <button @click="shareArticle('linkedin')" class="link-gothic text-sm">
              LinkedIn
            </button>
          </div>
          <router-link to="/blog" class="btn-gothic">
            More Articles
          </router-link>
        </div>
      </footer>
      
      <!-- Comments Section -->
      <GiscusComments />
    </div>
    
    <!-- Article Not Found -->
    <div v-else class="max-w-4xl mx-auto px-6 text-center">
      <h1 class="gothic-title text-sage mb-4">Article Not Found</h1>
      <p class="text-gray-400 mb-8">The article you're looking for doesn't exist or has been moved.</p>
      <router-link to="/blog" class="btn-gothic">
        Back to Blog
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { marked } from 'marked'
import blogData from '@/data/blog.json'
import GiscusComments from '@/components/GiscusComments.vue'

const route = useRoute()
const post = ref(null)

// Find the post by slug
const findPost = () => {
  const slug = route.params.slug
  post.value = blogData.find(p => p.slug === slug)
}

// Convert markdown content to HTML
const renderedContent = computed(() => {
  if (!post.value?.content) return ''
  return marked(post.value.content)
})

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  }).format(date)
}

const shareArticle = (platform) => {
  const url = window.location.href
  const title = post.value.title
  
  let shareUrl = ''
  
  switch (platform) {
    case 'twitter':
      shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`
      break
    case 'linkedin':
      shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
      break
  }
  
  if (shareUrl) {
    window.open(shareUrl, '_blank', 'width=600,height=400')
  }
}

onMounted(() => {
  findPost()
  
  // Update page title
  if (post.value) {
    document.title = `${post.value.title} - Gad Mohamed`
  }
})
</script>

<style scoped>
.prose {
  @apply text-gray-300;
}

.prose h1 {
  @apply text-sage-light text-3xl font-serif mb-6;
}

.prose h2 {
  @apply text-sage text-2xl font-serif mb-4 mt-8;
}

.prose h3 {
  @apply text-sage-dark text-xl font-serif mb-3 mt-6;
}

.prose p {
  @apply mb-4 leading-relaxed;
}

.prose ul, .prose ol {
  @apply mb-4 pl-6;
}

.prose li {
  @apply mb-2;
}

.prose strong {
  @apply text-sage-light font-semibold;
}

.prose code {
  @apply bg-midnight px-2 py-1 rounded text-sage-light text-sm;
}

.prose blockquote {
  @apply border-l-4 border-sage-dark pl-4 italic text-gray-400 my-6;
}
</style>
