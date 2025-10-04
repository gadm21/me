import { ref, onMounted } from 'vue'

export function useData(dataPath) {
  const data = ref(null)
  const loading = ref(true)
  const error = ref(null)

  const loadData = async () => {
    try {
      loading.value = true
      // In production, the data files will be in the public directory
      const isProduction = import.meta.env.PROD
      const basePath = isProduction ? '/data' : '/src/data'
      const fullPath = dataPath.replace(/^\/src\/data/, basePath)
      
      const response = await fetch(fullPath)
      if (!response.ok) {
        throw new Error(`Failed to load data from ${fullPath}`)
      }
      data.value = await response.json()
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
