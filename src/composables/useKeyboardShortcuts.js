import { onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

export function useKeyboardShortcuts() {
  const router = useRouter()
  
  const shortcuts = {
    'g h': () => router.push('/'),
    'g r': () => router.push('/research'),
    'g p': () => router.push('/publications'),
    'g j': () => router.push('/projects'),
    'g t': () => router.push('/teaching'),
    'g b': () => router.push('/blog'),
    'g k': () => router.push('/books'),
    'g a': () => router.push('/awards'),
    '/': () => openSearch(),
    'Escape': () => closeModals(),
    '?': () => showHelp()
  }
  
  const openSearch = () => {
    // Dispatch custom event to open search modal
    window.dispatchEvent(new CustomEvent('open-search'))
  }
  
  const closeModals = () => {
    // Dispatch custom event to close modals
    window.dispatchEvent(new CustomEvent('close-modals'))
  }
  
  let keys = []
  let lastKeyTime = 0
  
  const handleKeydown = (e) => {
    // Ignore if user is typing in an input
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
      return
    }
    
    const now = Date.now()
    if (now - lastKeyTime > 1000) {
      keys = []
    }
    lastKeyTime = now
    
    keys.push(e.key)
    const combo = keys.join(' ')
    
    if (shortcuts[combo]) {
      e.preventDefault()
      shortcuts[combo]()
      keys = []
    }
  }
  
  const showHelp = () => {
    alert(`Keyboard Shortcuts:
    
Navigation:
g h - Go to Home
g r - Go to Research  
g p - Go to Publications
g j - Go to Projects
g t - Go to Teaching
g b - Go to Blog
g k - Go to Books
g a - Go to Awards

Actions:
/ - Open Search
Escape - Close Modals
? - Show this help`)
  }
  
  onMounted(() => {
    document.addEventListener('keydown', handleKeydown)
  })
  
  onUnmounted(() => {
    document.removeEventListener('keydown', handleKeydown)
  })
  
  return {
    showHelp
  }
}
