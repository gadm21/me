<template>
  <Teleport to="body">
    <transition name="modal">
      <div 
        v-if="isOpen" 
        class="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/80"
        @click.self="close"
      >
        <div class="bg-charcoal dark:bg-charcoal bg-cream border border-slate dark:border-slate border-silver rounded-lg p-8 max-w-3xl w-full max-h-[80vh] overflow-auto transition-colors duration-300">
          <div class="p-4">
            <div class="relative">
              <input 
                ref="searchInput"
                v-model="searchQuery"
                type="text"
                placeholder="Search publications, research, blog posts..."
                class="w-full px-4 py-3 pr-12 bg-midnight dark:bg-midnight bg-pearl border border-slate dark:border-slate border-silver text-gray-300 dark:text-gray-300 text-gray-700 
                       placeholder-gray-500 dark:placeholder-gray-500 placeholder-gray-400 focus:border-sage-dark focus:outline-none transition-colors duration-300"
                @input="performSearch"
              >
              <button 
                @click="close"
                class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <!-- Search Results -->
            <div v-if="searchResults.length > 0" class="mt-4 max-h-96 overflow-y-auto">
              <div class="space-y-2">
                <router-link 
                  v-for="result in searchResults" 
                  :key="result.id"
                  :to="result.link"
                  @click="close"
                  class="block p-3 bg-midnight dark:bg-midnight bg-pearl hover:bg-slate dark:hover:bg-slate hover:bg-silver transition-colors rounded"
                >
                  <div class="flex items-start justify-between">
                    <div class="flex-1">
                      <h3 class="text-gray-300 dark:text-gray-300 text-gray-700 font-medium">{{ result.title }}</h3>
                      <p class="text-gray-500 dark:text-gray-500 text-gray-600 text-sm mt-1">{{ result.description }}</p>
                    </div>
                    <span class="ml-3 px-2 py-1 bg-charcoal dark:bg-charcoal bg-silver text-sage-dark text-xs rounded">
                      {{ result.type }}
                    </span>
                  </div>
                </router-link>
              </div>
            </div>
            
            <!-- No Results -->
            <div v-else-if="searchQuery && !loading" class="mt-4 text-center py-8 text-gray-500">
              No results found for "{{ searchQuery }}"
            </div>
            
            <!-- Loading -->
            <div v-if="loading" class="mt-4 text-center py-8">
              <div class="inline-block animate-spin w-6 h-6 border-2 border-sage-dark border-t-transparent rounded-full"></div>
            </div>
            
            <!-- Quick Links -->
            <div v-if="!searchQuery" class="mt-4 pt-4 border-t border-slate">
              <p class="text-gray-500 text-sm mb-3">Quick Links</p>
              <div class="flex flex-wrap gap-2">
                <router-link 
                  v-for="link in quickLinks" 
                  :key="link.path"
                  :to="link.path"
                  @click="close"
                  class="px-3 py-1 bg-midnight text-gray-400 hover:text-sage-light 
                         hover:bg-slate text-sm transition-all"
                >
                  {{ link.label }}
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </Teleport>
</template>

<script setup>
import { ref, watch, nextTick } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps({
  isOpen: Boolean
})

const emit = defineEmits(['close'])

const router = useRouter()
const searchInput = ref(null)
const searchQuery = ref('')
const searchResults = ref([])
const loading = ref(false)

const quickLinks = [
  { path: '/publications', label: 'Recent Publications' },
  { path: '/research', label: 'Research Projects' },
  { path: '/awards', label: 'Awards & Recognition' },
  { path: '/blog', label: 'Latest Blog Posts' }
]

// Import data from your actual content
import publicationsData from '@/data/publications.json'
import blogData from '@/data/blog.json'
import projectsData from '@/data/projects.json'

// Build searchable content from actual data
const buildSearchableContent = () => {
  const content = []
  
  // Add publications
  publicationsData.forEach(pub => {
    content.push({
      id: `pub-${pub.id}`,
      title: pub.title,
      description: `${pub.venue} (${pub.year}) - ${pub.citations} citations`,
      type: 'Publication',
      link: '/publications'
    })
  })
  
  // Add blog posts
  blogData.forEach(post => {
    content.push({
      id: `blog-${post.id}`,
      title: post.title,
      description: post.excerpt,
      type: 'Blog',
      link: `/blog/${post.slug}`
    })
  })
  
  // Add projects
  projectsData.forEach(project => {
    content.push({
      id: `project-${project.id}`,
      title: project.title,
      description: project.description,
      type: 'Project',
      link: '/projects'
    })
  })
  
  // Add static pages
  const staticPages = [
    {
      id: 'research-wifi',
      title: 'Wi-Fi Sensing & ISAC',
      description: 'Leveraging wireless signals for environmental awareness and smart device security',
      type: 'Research',
      link: '/research'
    },
    {
      id: 'research-fl',
      title: 'Federated Learning',
      description: 'Communication-efficient and privacy-preserving distributed machine learning',
      type: 'Research',
      link: '/research'
    },
    {
      id: 'research-dp',
      title: 'Differential Privacy',
      description: 'Privacy-preserving techniques for federated learning systems',
      type: 'Research',
      link: '/research'
    },
    {
      id: 'teaching-networks',
      title: 'CS 3357A - Computer Networks',
      description: 'Comprehensive study of computer networks including TCP/IP, routing protocols, network security',
      type: 'Teaching',
      link: '/teaching'
    },
    {
      id: 'teaching-systems',
      title: 'CS 2211 - Systems Programming',
      description: 'Introduction to systems programming using C language and Linux operating system',
      type: 'Teaching',
      link: '/teaching'
    }
  ]
  
  return [...content, ...staticPages]
}

const searchableContent = buildSearchableContent()

const performSearch = () => {
  if (!searchQuery.value) {
    searchResults.value = []
    return
  }
  
  loading.value = true
  
  // Simulate search delay
  setTimeout(() => {
    const query = searchQuery.value.toLowerCase()
    searchResults.value = searchableContent.filter(item => 
      item.title.toLowerCase().includes(query) || 
      item.description.toLowerCase().includes(query)
    )
    loading.value = false
  }, 300)
}

const close = () => {
  emit('close')
  searchQuery.value = ''
  searchResults.value = []
}

// Focus input when modal opens
watch(() => props.isOpen, (newVal) => {
  if (newVal) {
    nextTick(() => {
      searchInput.value?.focus()
    })
  }
})

// Keyboard shortcut (Escape to close)
const handleKeydown = (e) => {
  if (props.isOpen && e.key === 'Escape') {
    close()
  }
}

// Add/remove keyboard listener
watch(() => props.isOpen, (newVal) => {
  if (newVal) {
    document.addEventListener('keydown', handleKeydown)
  } else {
    document.removeEventListener('keydown', handleKeydown)
  }
})
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.2s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>
