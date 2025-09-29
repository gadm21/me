<template>
  <div class="contact-page py-12 min-h-screen flex items-center justify-center">
    <div class="prose-container text-center">
      <h1 class="gothic-title text-sage mb-8">Contact</h1>
      
      <div class="max-w-2xl mx-auto">
        <p class="serene-text text-xl mb-12">
          Let's connect and explore the possibilities of collaboration
        </p>
        
        <!-- Contact Methods -->
        <div class="space-y-8 mb-12">
          <div class="contact-item">
            <div class="contact-icon mb-4">
              <svg class="w-12 h-12 text-sage-dark mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 class="font-serif text-xl text-gray-300 mb-2">Email</h3>
            <a href="mailto:ggad@uwo.ca" class="link-gothic text-lg">
              ggad@uwo.ca
            </a>
            <p class="text-gray-500 text-sm mt-2">
              Primary contact for research collaborations and academic inquiries
            </p>
          </div>
          
          <div class="section-divider"></div>
          
          <div class="contact-item">
            <div class="contact-icon mb-4">
              <svg class="w-12 h-12 text-sage-dark mx-auto" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </div>
            <h3 class="font-serif text-xl text-gray-300 mb-2">GitHub</h3>
            <a href="https://github.com/gadm21" target="_blank" class="link-gothic text-lg">
              @gadm21
            </a>
            <p class="text-gray-500 text-sm mt-2">
              Open source projects and research code
            </p>
          </div>
          
          <div class="section-divider"></div>
          
          <div class="contact-item">
            <div class="contact-icon mb-4">
              <svg class="w-12 h-12 text-sage-dark mx-auto" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
              </svg>
            </div>
            <h3 class="font-serif text-xl text-gray-300 mb-2">Google Scholar</h3>
            <a href="https://scholar.google.com/citations?user=bZRYJuAAAAAJ&hl=en" target="_blank" class="link-gothic text-lg">
              View Profile
            </a>
            <p class="text-gray-500 text-sm mt-2">
              Publications and citations
            </p>
          </div>
        </div>

        
        <!-- Quick Message Form -->
        <div class="text-left">
          <h3 class="gothic-subtitle text-sage mb-6 text-center">Send a Message</h3>
          <form @submit.prevent="sendMessage" class="space-y-4">
            <div>
              <label for="name" class="block text-gray-400 text-sm mb-2">Name</label>
              <input 
                id="name"
                v-model="form.name"
                type="text" 
                required
                class="w-full px-4 py-2 bg-charcoal border border-slate text-gray-300 focus:border-sage-dark focus:outline-none transition-colors"
                placeholder="Your name"
              >
            </div>
            <div>
              <label for="email" class="block text-gray-400 text-sm mb-2">Email</label>
              <input 
                id="email"
                v-model="form.email"
                type="email" 
                required
                class="w-full px-4 py-2 bg-charcoal border border-slate text-gray-300 focus:border-sage-dark focus:outline-none transition-colors"
                placeholder="your@email.com"
              >
            </div>
            <div>
              <label for="subject" class="block text-gray-400 text-sm mb-2">Subject</label>
              <select 
                id="subject"
                v-model="form.subject"
                class="w-full px-4 py-2 bg-charcoal border border-slate text-gray-300 focus:border-sage-dark focus:outline-none transition-colors"
              >
                <option value="research">Research Collaboration</option>
                <option value="teaching">Teaching Inquiry</option>
                
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label for="message" class="block text-gray-400 text-sm mb-2">Message</label>
              <textarea 
                id="message"
                v-model="form.message"
                rows="5"
                required
                class="w-full px-4 py-2 bg-charcoal border border-slate text-gray-300 focus:border-sage-dark focus:outline-none transition-colors resize-none"
                placeholder="Your message..."
              ></textarea>
            </div>
            <div class="text-center">
              <button type="submit" class="btn-gothic">
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const form = ref({
  name: '',
  email: '',
  subject: 'research',
  message: ''
})

const sendMessage = () => {
  // In a real app, this would send the message to a backend
  const mailtoLink = `mailto:ggad@uwo.ca?subject=${encodeURIComponent(form.value.subject + ': ' + form.value.name)}&body=${encodeURIComponent(form.value.message + '\n\nFrom: ' + form.value.email)}`
  window.location.href = mailtoLink
}
</script>

<style scoped>
.contact-item {
  @apply transition-transform duration-250;
}

.contact-item:hover {
  @apply transform scale-105;
}

.contact-icon {
  @apply transition-transform duration-250;
}

.contact-item:hover .contact-icon {
  @apply transform rotate-12;
}
</style>
