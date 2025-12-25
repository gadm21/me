<template>
  <Teleport to="body">
    <transition name="modal">
      <div 
        v-if="isOpen" 
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
        @click.self="$emit('close')"
      >
        <div class="bg-surface-elevated dark:bg-surface-elevated-dark border border-border dark:border-border-dark rounded-lg w-full max-w-5xl h-[90vh] flex flex-col shadow-elevated overflow-hidden">
          <!-- Header -->
          <div class="flex items-center justify-between px-6 py-4 border-b border-border dark:border-border-dark">
            <h3 class="text-lg font-semibold text-text-primary dark:text-text-primary-dark truncate pr-4">
              {{ title }}
            </h3>
            <div class="flex items-center gap-2">
              <!-- Open in New Tab -->
              <a 
                :href="encodedPdfUrl" 
                target="_blank"
                class="p-2 rounded-lg hover:bg-surface-hover dark:hover:bg-surface-hover-dark transition-colors text-text-secondary dark:text-text-secondary-dark hover:text-primary"
                title="Open in New Tab"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
              <!-- Download Button -->
              <a 
                :href="encodedPdfUrl" 
                download
                class="p-2 rounded-lg hover:bg-surface-hover dark:hover:bg-surface-hover-dark transition-colors text-text-secondary dark:text-text-secondary-dark hover:text-primary"
                title="Download PDF"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              </a>
              <!-- Close Button -->
              <button 
                @click="$emit('close')"
                class="p-2 rounded-lg hover:bg-surface-hover dark:hover:bg-surface-hover-dark transition-colors text-text-secondary dark:text-text-secondary-dark hover:text-text-primary dark:hover:text-text-primary-dark"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
          
          <!-- PDF Embed Container -->
          <div class="flex-1 overflow-hidden bg-gray-100 dark:bg-gray-900">
            <iframe 
              v-if="isOpen"
              :src="encodedPdfUrl"
              class="w-full h-full border-0"
              title="PDF Viewer"
            ></iframe>
          </div>
        </div>
      </div>
    </transition>
  </Teleport>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  },
  pdfUrl: {
    type: String,
    required: true
  },
  title: {
    type: String,
    default: 'PDF Viewer'
  }
})

const emit = defineEmits(['close'])

// Encode the URL to handle spaces and special characters
const encodedPdfUrl = computed(() => {
  if (!props.pdfUrl) return ''
  return encodeURI(props.pdfUrl)
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

.modal-enter-active > div,
.modal-leave-active > div {
  transition: transform 0.2s ease;
}

.modal-enter-from > div,
.modal-leave-to > div {
  transform: scale(0.95);
}
</style>
