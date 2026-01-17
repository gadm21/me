<template>
  <div class="blog-post-page">
    <div v-if="post" class="content-container py-12">
      <!-- Back to Blog -->
      <nav class="mb-8">
        <router-link to="/blog" class="link text-sm inline-flex items-center gap-1">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
          Back to Blog
        </router-link>
      </nav>
      
      <!-- Article Header -->
      <header class="mb-8">
        <div class="mb-4">
          <span class="text-primary text-sm font-medium">{{ post.category }}</span>
        </div>
        <h1 class="page-title mb-4">{{ post.title }}</h1>
        <div class="flex items-center gap-4 text-sm text-text-tertiary mb-6">
          <span>{{ formatDate(post.date) }}</span>
          <span>•</span>
          <span>{{ post.readTime }} min read</span>
        </div>
        <div v-if="post.image" class="mb-8">
          <img 
            :src="post.image" 
            :alt="post.title"
            loading="lazy"
            decoding="async"
            class="w-full h-64 object-cover rounded-lg"
          >
        </div>
      </header>
      
      <!-- Article Content -->
      <article class="prose-content max-w-none">
        <div v-html="renderedContent"></div>
      </article>
      
      <!-- Article Footer -->
      <footer class="mt-12 pt-8 border-t border-border dark:border-border-dark">
        <div class="flex items-center justify-between flex-wrap gap-4">
          <div class="flex items-center gap-4">
            <span class="text-text-tertiary text-sm">Share this article:</span>
            <button @click="shareArticle('twitter')" class="link text-sm">
              Twitter
            </button>
            <button @click="shareArticle('linkedin')" class="link text-sm">
              LinkedIn
            </button>
          </div>
          <router-link to="/blog" class="btn-secondary">
            More Articles
          </router-link>
        </div>
      </footer>
      
      <!-- Comments Section -->
      <GiscusComments />
    </div>
    
    <!-- Article Not Found -->
    <div v-else class="content-container py-12 text-center">
      <h1 class="page-title mb-4">Article Not Found</h1>
      <p class="text-text-secondary dark:text-text-secondary-dark mb-8">The article you're looking for doesn't exist or has been moved.</p>
      <router-link to="/blog" class="btn-primary">
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
import { useSEO } from '@/composables/useSEO'

const route = useRoute()
const post = ref(null)

const SITE_URL = 'https://gadgad.me'
const { updateMeta } = useSEO()

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

  const slug = route.params.slug
  const canonical = `${SITE_URL}/blog/${slug}`

  if (!post.value) {
    updateMeta({
      title: 'Article Not Found - Gad Gad',
      description: "The article you're looking for doesn't exist or has been moved.",
      url: canonical,
      canonical
    })
    return
  }

  const description = post.value.excerpt || ''
  const image = post.value.image || '/assets/img/me.jpg'

  updateMeta({
    title: `${post.value.title} - Gad Gad`,
    description,
    image,
    url: canonical,
    canonical,
    ogType: 'article',
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'BlogPosting',
          '@id': `${canonical}#blogpost`,
          'url': canonical,
          'headline': post.value.title,
          'name': post.value.title,
          'description': description,
          'datePublished': post.value.date,
          'dateModified': post.value.date,
          'author': {
            '@type': 'Person',
            'name': 'Gad Gad',
            'url': SITE_URL
          },
          'publisher': {
            '@type': 'Person',
            'name': 'Gad Gad',
            'url': SITE_URL
          },
          'mainEntityOfPage': {
            '@type': 'WebPage',
            '@id': canonical
          },
          'image': normalizeImageUrl(image),
          'isPartOf': {
            '@type': 'Blog',
            '@id': `${SITE_URL}/blog#blog`
          }
        },
        {
          '@type': 'BreadcrumbList',
          'itemListElement': [
            {
              '@type': 'ListItem',
              'position': 1,
              'name': 'Home',
              'item': `${SITE_URL}/`
            },
            {
              '@type': 'ListItem',
              'position': 2,
              'name': 'Blog',
              'item': `${SITE_URL}/blog`
            },
            {
              '@type': 'ListItem',
              'position': 3,
              'name': post.value.title,
              'item': canonical
            }
          ]
        }
      ]
    }
  })
})

const normalizeImageUrl = (img) => {
  if (!img) return ''
  try {
    return new URL(img, SITE_URL).toString()
  } catch {
    return img
  }
}
</script>

<style scoped>
.prose-content {
  color: var(--text-secondary, #4B5563);
  line-height: 1.75;
}

.dark .prose-content {
  color: var(--text-secondary-dark, #9CA3AF);
}

.prose-content :deep(h1) {
  font-size: 1.875rem;
  font-weight: 600;
  color: #111827;
  margin-bottom: 1.5rem;
}

.dark .prose-content :deep(h1) {
  color: #F9FAFB;
}

.prose-content :deep(h2) {
  font-size: 1.5rem;
  font-weight: 600;
  color: #1F2937;
  margin-bottom: 1rem;
  margin-top: 2rem;
}

.dark .prose-content :deep(h2) {
  color: #E5E7EB;
}

.prose-content :deep(h3) {
  font-size: 1.25rem;
  font-weight: 600;
  color: #374151;
  margin-bottom: 0.75rem;
  margin-top: 1.5rem;
}

.dark .prose-content :deep(h3) {
  color: #D1D5DB;
}

.prose-content :deep(p) {
  margin-bottom: 1rem;
}

.prose-content :deep(ul),
.prose-content :deep(ol) {
  margin-bottom: 1rem;
  padding-left: 1.5rem;
}

.prose-content :deep(li) {
  margin-bottom: 0.5rem;
}

.prose-content :deep(strong) {
  font-weight: 600;
  color: #111827;
}

.dark .prose-content :deep(strong) {
  color: #F9FAFB;
}

.prose-content :deep(code) {
  background-color: #F3F4F6;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  font-size: 0.875rem;
}

.dark .prose-content :deep(code) {
  background-color: #374151;
  color: #E5E7EB;
}

.prose-content :deep(blockquote) {
  border-left: 4px solid #3B82F6;
  padding-left: 1rem;
  font-style: italic;
  color: #6B7280;
  margin: 1.5rem 0;
}

.dark .prose-content :deep(blockquote) {
  color: #9CA3AF;
}

.prose-content :deep(a) {
  color: #3B82F6;
  text-decoration: none;
}

.prose-content :deep(a:hover) {
  text-decoration: underline;
}
</style>
