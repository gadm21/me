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
              <!-- Page Navigation -->
              <div class="flex items-center gap-2 mr-4">
                <button 
                  @click="prevPage" 
                  :disabled="currentPage <= 1"
                  class="p-2 rounded-lg hover:bg-surface-hover dark:hover:bg-surface-hover-dark disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <span class="text-sm text-text-secondary dark:text-text-secondary-dark min-w-[80px] text-center">
                  {{ currentPage }} / {{ totalPages }}
                </span>
                <button 
                  @click="nextPage" 
                  :disabled="currentPage >= totalPages"
                  class="p-2 rounded-lg hover:bg-surface-hover dark:hover:bg-surface-hover-dark disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
              <!-- Zoom Controls -->
              <div class="flex items-center gap-1 mr-4">
                <button 
                  @click="zoomOut" 
                  :disabled="scale <= 0.5"
                  class="p-2 rounded-lg hover:bg-surface-hover dark:hover:bg-surface-hover-dark disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4" />
                  </svg>
                </button>
                <span class="text-sm text-text-secondary dark:text-text-secondary-dark min-w-[50px] text-center">
                  {{ Math.round(scale * 100) }}%
                </span>
                <button 
                  @click="zoomIn" 
                  :disabled="scale >= 3"
                  class="p-2 rounded-lg hover:bg-surface-hover dark:hover:bg-surface-hover-dark disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                  </svg>
                </button>
              </div>
              <!-- Download Button -->
              <a 
                :href="pdfUrl" 
                target="_blank" 
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
          
          <!-- PDF Canvas Container -->
          <div ref="containerRef" class="flex-1 overflow-auto bg-gray-100 dark:bg-gray-900 flex justify-center p-4">
            <div v-if="loading" class="flex items-center justify-center h-full">
              <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
            <div v-else-if="error" class="flex items-center justify-center h-full text-error">
              <p>{{ error }}</p>
            </div>
            <canvas ref="canvasRef" class="shadow-lg"></canvas>
          </div>
        </div>
      </div>
    </transition>
  </Teleport>
</template>

<script setup>
import { ref, watch, onMounted, nextTick } from 'vue'
import * as pdfjsLib from 'pdfjs-dist'

// Set worker path
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`

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

const canvasRef = ref(null)
const containerRef = ref(null)
const loading = ref(true)
const error = ref(null)
const currentPage = ref(1)
const totalPages = ref(0)
const scale = ref(1.2)
const pdfDoc = ref(null)

const loadPdf = async () => {
  if (!props.pdfUrl || !props.isOpen) return
  
  loading.value = true
  error.value = null
  
  try {
    const loadingTask = pdfjsLib.getDocument(props.pdfUrl)
    pdfDoc.value = await loadingTask.promise
    totalPages.value = pdfDoc.value.numPages
    currentPage.value = 1
    await renderPage(currentPage.value)
  } catch (err) {
    console.error('Error loading PDF:', err)
    error.value = 'Failed to load PDF. Please try downloading instead.'
  } finally {
    loading.value = false
  }
}

const renderPage = async (pageNum) => {
  if (!pdfDoc.value || !canvasRef.value) return
  
  try {
    const page = await pdfDoc.value.getPage(pageNum)
    const viewport = page.getViewport({ scale: scale.value })
    
    const canvas = canvasRef.value
    const context = canvas.getContext('2d')
    
    canvas.height = viewport.height
    canvas.width = viewport.width
    
    const renderContext = {
      canvasContext: context,
      viewport: viewport
    }
    
    await page.render(renderContext).promise
  } catch (err) {
    console.error('Error rendering page:', err)
  }
}

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
    renderPage(currentPage.value)
  }
}

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
    renderPage(currentPage.value)
  }
}

const zoomIn = () => {
  if (scale.value < 3) {
    scale.value = Math.min(3, scale.value + 0.25)
    renderPage(currentPage.value)
  }
}

const zoomOut = () => {
  if (scale.value > 0.5) {
    scale.value = Math.max(0.5, scale.value - 0.25)
    renderPage(currentPage.value)
  }
}

watch(() => props.isOpen, async (newVal) => {
  if (newVal) {
    await nextTick()
    loadPdf()
  }
})

watch(() => props.pdfUrl, () => {
  if (props.isOpen) {
    loadPdf()
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

.modal-enter-active > div,
.modal-leave-active > div {
  transition: transform 0.2s ease;
}

.modal-enter-from > div,
.modal-leave-to > div {
  transform: scale(0.95);
}
</style>
