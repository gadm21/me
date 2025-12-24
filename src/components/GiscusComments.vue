<template>
  <div class="giscus-container mt-12 pt-8 border-t border-slate">
    <h3 class="gothic-subtitle text-sage mb-6">Comments</h3>
    <p v-if="!isLoaded" class="text-gray-500 text-sm mb-4">Loading comments...</p>
    <div ref="giscusContainer" class="giscus"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, nextTick } from 'vue'
import { useRoute } from 'vue-router'

const props = defineProps({
  repo: {
    type: String,
    default: 'gadm21/me'
  },
  repoId: {
    type: String,
    default: 'R_kgDOP48dLA'
  },
  category: {
    type: String,
    default: 'Comments'
  },
  categoryId: {
    type: String,
    default: 'DIC_kwDOP48dLM4C0KGW'
  }
})

const route = useRoute()
const giscusContainer = ref(null)
const isLoaded = ref(false)

const loadGiscus = () => {
  if (!giscusContainer.value) return
  
  // Remove any existing giscus iframe and script
  const existingIframe = giscusContainer.value.querySelector('.giscus')
  if (existingIframe) {
    existingIframe.remove()
  }
  const existingScript = giscusContainer.value.querySelector('script')
  if (existingScript) {
    existingScript.remove()
  }
  
  const script = document.createElement('script')
  script.src = 'https://giscus.app/client.js'
  script.setAttribute('data-repo', props.repo)
  script.setAttribute('data-repo-id', props.repoId)
  script.setAttribute('data-category', props.category)
  script.setAttribute('data-category-id', props.categoryId)
  script.setAttribute('data-mapping', 'pathname')
  script.setAttribute('data-strict', '0')
  script.setAttribute('data-reactions-enabled', '1')
  script.setAttribute('data-emit-metadata', '0')
  script.setAttribute('data-input-position', 'bottom')
  script.setAttribute('data-theme', 'dark_dimmed')
  script.setAttribute('data-lang', 'en')
  script.crossOrigin = 'anonymous'
  script.async = true
  
  script.onload = () => {
    isLoaded.value = true
  }
  
  giscusContainer.value.appendChild(script)
}

onMounted(async () => {
  await nextTick()
  loadGiscus()
})

// Reload giscus when route changes
watch(() => route.path, () => {
  loadGiscus()
})
</script>

<style scoped>
.giscus-container {
  min-height: 300px;
}
</style>
