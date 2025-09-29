import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './styles/main.css'
import './styles/gothic.scss'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register GSAP plugins globally
gsap.registerPlugin(ScrollTrigger)

// Import Google Fonts
const link = document.createElement('link')
link.href = 'https://fonts.googleapis.com/css2?family=UnifrakturCook:wght@700&family=UnifrakturMaguntia&family=Spectral:wght@300;400;500;600&family=Inter:wght@300;400;500;600;700&family=EB+Garamond:wght@400;500;600&display=swap'
link.rel = 'stylesheet'
document.head.appendChild(link)

const app = createApp(App)
app.use(router)
app.mount('#app')
