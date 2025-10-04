import { ref, onMounted } from 'vue'

export function useData(dataPath) {
  const data = ref(null)
  const loading = ref(true)
  const error = ref(null)

  const processItem = (item) => {
    if (!item) return item
    
    // Create a new object to avoid mutating the original
    const processed = { ...item }
    
    // Handle image paths
    if (item.image) {
      // Handle both relative and absolute paths
      let imagePath = item.image.startsWith('/') ? item.image.substring(1) : item.image
      
      // In development, use the full path from src
      // In production, the assets will be in the root
      if (import.meta.env.DEV) {
        // For development, use the full path from src
        processed.image = new URL(`/src/${imagePath}`, import.meta.url).href;
      } else {
        // For production, use the path as is (it will be relative to the public directory)
        processed.image = `/${imagePath}`;
      }
    }
    
    return processed
  }

  const loadData = async () => {
    try {
      loading.value = true
      error.value = null
      
      // In production, the data files will be in the public directory
      const isProduction = import.meta.env.PROD
      const basePath = isProduction ? '/data' : '/src/data'
      const fullPath = dataPath.replace(/^\/src\/data/, basePath)
      
      console.log(`Loading data from: ${fullPath}`)
      
      const response = await fetch(fullPath, {
        headers: {
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache'
        }
      })
      
      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(`HTTP ${response.status} - Failed to load data from ${fullPath}\n${errorText}`)
      }
      
      const jsonData = await response.json()
      
      if (!jsonData) {
        throw new Error(`No data returned from ${fullPath}`)
      }
      
      // Process the data to update image paths
      if (Array.isArray(jsonData)) {
        if (jsonData.length === 0) {
          console.warn(`Warning: Empty data array received from ${fullPath}`)
        }
        data.value = jsonData.map(processItem)
      } else {
        data.value = processItem(jsonData)
      }
      
      console.log(`Successfully loaded data from ${fullPath}`, data.value)
    } catch (err) {
      error.value = err.message
      console.error('Error loading data:', err)
    } finally {
      loading.value = false
    }
  }

  onMounted(() => {
    loadData()
  })

  return {
    data,
    loading,
    error,
    reload: loadData
  }
}

// Specific data loaders
export function useProfile() {
  return useData('/src/data/cv/profile.json')
}

export function useExperience() {
  return useData('/src/data/cv/experience.json')
}

export function useEducation() {
  return useData('/src/data/cv/education.json')
}

export function useSkills() {
  return useData('/src/data/cv/skills.json')
}

export function useAwards() {
  return useData('/src/data/cv/awards.json')
}

export function usePublications() {
  return useData('/src/data/publications.json')
}
