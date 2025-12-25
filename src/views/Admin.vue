<template>
  <div class="admin-page py-12 min-h-screen">
    <div class="max-w-4xl mx-auto px-6">
      <h1 class="gothic-title text-sage text-center mb-8">Blog Admin</h1>
      
      <div v-if="!isLocal" class="text-center text-red-400 mb-8">
        ⚠️ Admin panel only works on localhost for security
      </div>
      
      <div v-else>
        <!-- Post List -->
        <div class="mb-8">
          <div class="flex justify-between items-center mb-4">
            <h2 class="gothic-subtitle text-sage">Posts ({{ posts.length }})</h2>
            <button @click="createNew" class="btn-gothic">+ New Post</button>
          </div>
          
          <div class="space-y-2">
            <div 
              v-for="post in posts" 
              :key="post.id"
              @click="editPost(post)"
              class="p-4 bg-charcoal/50 border border-slate hover:border-sage-dark cursor-pointer transition-colors"
            >
              <div class="flex justify-between items-start">
                <div>
                  <h3 class="text-gray-300 font-medium">{{ post.title }}</h3>
                  <p class="text-gray-500 text-sm">{{ post.date }} · {{ post.category }}</p>
                </div>
                <span v-if="post.featured" class="text-sage text-xs">Featured</span>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Editor -->
        <div v-if="editing" class="card-calm">
          <h2 class="gothic-subtitle text-sage mb-6">{{ editing.id ? 'Edit Post' : 'New Post' }}</h2>
          
          <form @submit.prevent="savePost" class="space-y-4">
            <div>
              <label class="block text-gray-400 text-sm mb-2">Title</label>
              <input v-model="editing.title" type="text" required class="input-field w-full" />
            </div>
            
            <div>
              <label class="block text-gray-400 text-sm mb-2">Slug</label>
              <input v-model="editing.slug" type="text" required class="input-field w-full" placeholder="my-post-slug" />
            </div>
            
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-gray-400 text-sm mb-2">Category</label>
                <select v-model="editing.category" class="input-field w-full">
                  <option>Research</option>
                  <option>Technology</option>
                  <option>Teaching</option>
                  <option>Personal</option>
                </select>
              </div>
              <div>
                <label class="block text-gray-400 text-sm mb-2">Date</label>
                <input v-model="editing.date" type="date" required class="input-field w-full" />
              </div>
            </div>
            
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-gray-400 text-sm mb-2">Read Time (min)</label>
                <input v-model.number="editing.readTime" type="number" min="1" class="input-field w-full" />
              </div>
              <div class="flex items-center gap-2 pt-6">
                <input v-model="editing.featured" type="checkbox" id="featured" class="w-4 h-4" />
                <label for="featured" class="text-gray-400 text-sm">Featured Post</label>
              </div>
            </div>
            
            <div>
              <label class="block text-gray-400 text-sm mb-2">Excerpt</label>
              <textarea v-model="editing.excerpt" rows="2" class="input-field w-full"></textarea>
            </div>
            
            <div>
              <label class="block text-gray-400 text-sm mb-2">Content (Markdown)</label>
              <textarea v-model="editing.content" rows="15" class="input-field w-full font-mono text-sm"></textarea>
            </div>
            
            <div class="flex gap-4">
              <button type="submit" class="btn-gothic">Save Post</button>
              <button type="button" @click="editing = null" class="text-gray-400 hover:text-gray-300">Cancel</button>
              <button v-if="editing.id" type="button" @click="deletePost" class="text-red-400 hover:text-red-300 ml-auto">Delete</button>
            </div>
          </form>
          
          <!-- JSON Output -->
          <div class="mt-8 pt-8 border-t border-slate">
            <h3 class="text-gray-400 text-sm mb-2">Copy this JSON to src/data/blog.json:</h3>
            <pre class="bg-ink p-4 text-xs text-gray-400 overflow-x-auto">{{ jsonOutput }}</pre>
            <button @click="copyJson" class="mt-2 text-sage text-sm hover:underline">Copy to clipboard</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import blogData from '@/data/blog.json'

const isLocal = ref(false)
const posts = ref([])
const editing = ref(null)

onMounted(() => {
  isLocal.value = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
  posts.value = [...blogData].sort((a, b) => new Date(b.date) - new Date(a.date))
})

const createNew = () => {
  const maxId = Math.max(...posts.value.map(p => p.id), 0)
  editing.value = {
    id: null,
    title: '',
    slug: '',
    category: 'Research',
    date: new Date().toISOString().split('T')[0],
    readTime: 5,
    excerpt: '',
    featured: false,
    content: '# Your Title\n\nWrite your content here...'
  }
}

const editPost = (post) => {
  editing.value = { ...post }
}

const savePost = () => {
  if (editing.value.id) {
    const index = posts.value.findIndex(p => p.id === editing.value.id)
    posts.value[index] = { ...editing.value }
  } else {
    const maxId = Math.max(...posts.value.map(p => p.id), 0)
    editing.value.id = maxId + 1
    posts.value.unshift({ ...editing.value })
  }
  posts.value.sort((a, b) => new Date(b.date) - new Date(a.date))
}

const deletePost = () => {
  if (confirm('Delete this post?')) {
    posts.value = posts.value.filter(p => p.id !== editing.value.id)
    editing.value = null
  }
}

const jsonOutput = computed(() => {
  return JSON.stringify(posts.value, null, 2)
})

const copyJson = () => {
  navigator.clipboard.writeText(jsonOutput.value)
  alert('Copied! Paste into src/data/blog.json')
}
</script>

<style scoped>
.input-field {
  padding: 0.5rem 1rem;
  background-color: #F9FAFB;
  border: 1px solid #E5E7EB;
  color: #374151;
  transition: border-color 0.2s ease;
}

.dark .input-field {
  background-color: #1F2937;
  border-color: #374151;
  color: #E5E7EB;
}

.input-field:focus {
  border-color: #3B82F6;
  outline: none;
}
</style>
