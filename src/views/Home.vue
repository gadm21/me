<template>
  <div class="home-page">
    <!-- Full-page Signal Animation Background -->
    <div class="fixed inset-0 z-0">
      <canvas 
        ref="signalCanvas" 
        class="w-full h-full"
        @mousemove="handleMouseMove"
        @mouseleave="handleMouseLeave"
        @touchmove="handleTouchMove"
        @touchend="handleMouseLeave"
        @click="handleClick"
      ></canvas>
      
      <!-- Center dot with ThothCrafter link -->
      <a 
        href="https://www.thothcraft.com/" 
        target="_blank"
        rel="noopener noreferrer"
        class="center-dot-link"
        @mouseenter="dotHovered = true"
        @mouseleave="dotHovered = false"
      >
        <div class="center-dot" :class="{ 'hovered': dotHovered }">
          <span class="dot-text" v-show="dotHovered">thothcrafter</span>
        </div>
      </a>
    </div>
    
    <!-- Spacer for hero section -->
    <div class="min-h-[80vh]"></div>
    
    <!-- About Section -->
    <section class="section relative z-10 bg-surface dark:bg-surface-dark">
      <div class="content-container">
        <div class="max-w-2xl mx-auto">
          <h2 class="section-title text-center mb-8">{{ t('home.aboutTitle') }}</h2>
          <div class="space-y-4 text-lg leading-relaxed text-text-secondary dark:text-text-secondary-dark fade-in" :class="{ 'text-right': isRTL }">
            <p>
              {{ t('home.aboutP1') }}
            </p>
            <p>
              {{ t('home.aboutP2') }}
            </p>
          </div>
          
          <!-- Resume Button -->
          <div class="text-center mt-8">
            <button 
              @click="showResumeModal = true"
              class="btn-primary inline-flex items-center gap-2"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              {{ t('home.myResume') }}
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Research Areas Preview -->
    <section class="section relative z-10 bg-surface-hover/50 dark:bg-surface-hover-dark/30">
      <div class="wide-container">
        <h2 class="section-title text-center mb-12">{{ t('home.researchFocus') }}</h2>
        <div class="grid md:grid-cols-3 gap-6">
          <div 
            v-for="pillar in translatedPillars" 
            :key="pillar.key"
            class="card card-hover text-center"
          >
            <div class="text-4xl mb-4">{{ pillar.icon }}</div>
            <h3 class="text-lg font-semibold text-text-primary dark:text-text-primary-dark mb-2">
              {{ pillar.title }}
            </h3>
            <p class="text-sm text-text-secondary dark:text-text-secondary-dark">
              {{ pillar.description }}
            </p>
          </div>
        </div>
        <div class="text-center mt-10">
          <router-link to="/research" class="btn-ghost inline-flex items-center gap-2">
            {{ t('home.learnMore') }}
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" :class="{ 'rotate-180': isRTL }">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </router-link>
        </div>
      </div>
    </section>

    <!-- GitHub Contributions Section -->
    <section class="section relative z-10 bg-surface dark:bg-surface-dark">
      <div class="content-container">
        <div class="max-w-4xl mx-auto">
          <div class="github-contributions-wrapper">
            <a href="https://github.com/gadm21" target="_blank" rel="noopener noreferrer" class="block">
              <img 
                :src="githubContributionsUrl" 
                alt="GitHub Contributions" 
                class="github-contributions-img"
                loading="lazy"
              />
            </a>
          </div>
          
          <div class="flex justify-center gap-4 mt-6">
            <a 
              href="https://github.com/gadm21" 
              target="_blank" 
              rel="noopener noreferrer"
              class="btn-ghost inline-flex items-center gap-2"
            >
              <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              {{ t('common.viewGithub') }}
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- Resume PDF Modal -->
    <PdfViewer 
      :is-open="showResumeModal"
      :pdf-url="RESUME_PDF_URL"
      :title="t('home.myResume')"
      @close="showResumeModal = false"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch, computed } from 'vue'
import { useRouter } from 'vue-router'
import gsap from 'gsap'
import { useI18n } from '@/composables/useI18n'
import PdfViewer from '@/components/PdfViewer.vue'

const { t, currentLanguage, isRTL } = useI18n()

// Resume modal state
const showResumeModal = ref(false)
const RESUME_PDF_URL = '/assets/docs/Gad_Gad_CV.pdf'

const router = useRouter()
const signalCanvas = ref(null)
const dotHovered = ref(false)

// GitHub username
const GITHUB_USERNAME = 'gadm21'

// GitHub contributions graph URL - uses ghchart.rshah.org service
const githubContributionsUrl = computed(() => {
  const theme = isDark.value ? 'teal' : '2dd4bf'
  return `https://ghchart.rshah.org/${theme}/${GITHUB_USERNAME}`
})

// Mouse/touch interaction state
const mouseState = ref({
  x: 0,
  y: 0,
  active: false,
  velocity: 0,
  lastX: 0,
  lastY: 0,
  clicked: false,
  clickTime: 0
})

// Animation state
let animationId = null
let ctx = null
let time = 0
let canvasWidth = 0
let canvasHeight = 0
const isDark = ref(false)

// Check for dark mode
const checkDarkMode = () => {
  isDark.value = document.documentElement.classList.contains('dark')
}

// Signal parameters (will be affected by mouse)
const signalParams = ref({
  noiseIntensity: 0.3,
  baseFrequencies: [1, 2, 3, 5, 7], // Fourier component frequencies
  baseAmplitudes: [40, 25, 15, 10, 5], // Corresponding amplitudes
  perturbation: 0 // Mouse-induced perturbation
})

const handleMouseMove = (e) => {
  if (!signalCanvas.value) return
  
  const rect = signalCanvas.value.getBoundingClientRect()
  const x = e.clientX - rect.left
  const y = e.clientY - rect.top
  
  // Calculate velocity
  const dx = x - mouseState.value.lastX
  const dy = y - mouseState.value.lastY
  const velocity = Math.sqrt(dx * dx + dy * dy)
  
  mouseState.value = {
    ...mouseState.value,
    x,
    y,
    active: true,
    velocity: Math.min(velocity, 100),
    lastX: x,
    lastY: y
  }
  
  // Increase noise based on mouse velocity - more responsive
  signalParams.value.perturbation = Math.min(signalParams.value.perturbation + velocity * 0.03, 2)
}

const handleTouchMove = (e) => {
  if (e.touches.length > 0) {
    const touch = e.touches[0]
    handleMouseMove({ clientX: touch.clientX, clientY: touch.clientY })
  }
}

const handleMouseLeave = () => {
  mouseState.value.active = false
}

const handleClick = () => {
  mouseState.value.clicked = true
  mouseState.value.clickTime = time
  signalParams.value.perturbation = 1.5 // Big perturbation on click
}

// Generate noisy composite signal value at position x
const generateSignal = (x, t, centerY, isNoisy = true) => {
  const { baseFrequencies, baseAmplitudes, noiseIntensity, perturbation } = signalParams.value
  let value = 0
  
  // Sum of sine waves (Fourier components) - all moving left to right
  for (let i = 0; i < baseFrequencies.length; i++) {
    const freq = baseFrequencies[i]
    const amp = baseAmplitudes[i]
    // Phase shifts with time to create movement from left to right
    value += amp * Math.sin(freq * x * 0.01 - t * (i + 1) * 1.2)
  }
  
  // Add noise for the left side (input signal)
  if (isNoisy) {
    const noise = (Math.random() - 0.5) * 30 * (noiseIntensity + perturbation)
    // Add perlin-like smooth noise that also moves
    const smoothNoise = Math.sin(x * 0.05 - t * 3) * 20 * (noiseIntensity + perturbation * 0.5)
    value += noise + smoothNoise
  }
  
  // Global mouse effect - disturbs entire signal based on mouse activity
  if (mouseState.value.active) {
    const mx = mouseState.value.x
    const my = mouseState.value.y
    const vel = mouseState.value.velocity
    
    // Distance from mouse to this point on the signal
    const distX = Math.abs(x - mx)
    const distY = Math.abs(centerY - my)
    const dist = Math.sqrt(distX * distX + distY * distY)
    
    // Larger influence radius, stronger effect
    const maxDist = 300
    if (dist < maxDist) {
      const influence = Math.pow((maxDist - dist) / maxDist, 1.5)
      value += Math.sin(x * 0.1 + t * 5) * 50 * influence * (vel * 0.02 + 0.3)
    }
  }
  
  return value
}

// Draw a single 3D Fourier component emanating from center dot
const draw3DFourierComponent = (centerX, centerY, dotRadius, endX, freq, amp, t, index, totalComponents, color, perturbation) => {
  if (!ctx) return
  
  // Calculate the angle for this component (spread out in a fan from center)
  const angleSpread = Math.PI * 0.5 // 90 degrees total spread
  const baseAngle = -angleSpread / 2
  const angleStep = totalComponents > 1 ? angleSpread / (totalComponents - 1) : 0
  const angle = baseAngle + index * angleStep
  
  // 3D perspective parameters - affected by click
  let clickEffect = 0
  if (mouseState.value.clicked) {
    const timeSinceClick = t - mouseState.value.clickTime
    clickEffect = Math.sin(timeSinceClick * 5) * Math.exp(-timeSinceClick * 2)
  }
  const perspective = 600 + clickEffect * 200
  const zDepth = (index - totalComponents / 2) * 50 + clickEffect * 30
  
  ctx.beginPath()
  ctx.strokeStyle = color
  ctx.lineWidth = 2.5 - Math.abs(index - totalComponents / 2) * 0.2
  ctx.globalAlpha = 0.85 - Math.abs(index - totalComponents / 2) * 0.08
  
  // Add glow effect
  ctx.shadowColor = color
  ctx.shadowBlur = 10 + perturbation * 5
  
  const startDistance = dotRadius + 3
  const maxDistance = Math.max(endX - centerX, 100)
  
  let firstPoint = true
  for (let d = 0; d <= maxDistance; d += 3) {
    const progress = d / maxDistance
    
    // Calculate base position along the ray from center
    const baseX = centerX + Math.cos(angle) * (startDistance + d)
    const baseY = centerY + Math.sin(angle) * (startDistance + d)
    
    // Add sine wave oscillation - moving from left to right (negative time)
    const wavePhase = freq * d * 0.012 - t * (index + 1) * 0.6
    const waveAmp = amp * 0.5 * Math.min(progress * 3, 1) * (1 - progress * 0.4)
    
    // Add perturbation from mouse movement
    const perturbAmp = perturbation * 15 * Math.sin(d * 0.1 + t * 3)
    
    const perpX = -Math.sin(angle) * (Math.sin(wavePhase) * waveAmp + perturbAmp)
    const perpY = Math.cos(angle) * (Math.sin(wavePhase) * waveAmp + perturbAmp)
    
    // Apply 3D perspective transformation
    const scale = perspective / (perspective + zDepth * (1 - progress))
    const x3d = centerX + (baseX + perpX - centerX) * scale
    const y3d = centerY + (baseY + perpY - centerY) * scale
    
    if (firstPoint) {
      ctx.moveTo(x3d, y3d)
      firstPoint = false
    } else {
      ctx.lineTo(x3d, y3d)
    }
  }
  ctx.stroke()
  ctx.shadowBlur = 0
  ctx.globalAlpha = 1
}

const draw = () => {
  try {
    if (!signalCanvas.value || !ctx) {
      animationId = requestAnimationFrame(draw)
      return
    }
    
    const width = canvasWidth
    const height = canvasHeight
    
    // Skip frame if canvas not ready yet
    if (width === 0 || height === 0) {
      animationId = requestAnimationFrame(draw)
      return
    }
    
    const centerX = width / 2
    const centerY = height / 2
    
    // Clear canvas with theme-aware background (trail effect)
    const bgColor = isDark.value ? 'rgba(17, 24, 39, 0.08)' : 'rgba(249, 250, 251, 0.12)'
    ctx.fillStyle = bgColor
    ctx.fillRect(0, 0, width, height)
    
    // Decay perturbation over time
    signalParams.value.perturbation *= 0.95
    
    // Colors
    const inputColor = '#2dd4bf' // Teal for noisy input
    const outputColors = [
      '#60a5fa', // Blue
      '#a78bfa', // Purple
      '#f472b6', // Pink
      '#fbbf24', // Yellow
      '#34d399', // Green
    ]
    
    // Draw noisy input signal (left side)
    ctx.beginPath()
    ctx.strokeStyle = inputColor
    ctx.lineWidth = 2.5
    ctx.shadowColor = inputColor
    ctx.shadowBlur = 10
    
    const leftMargin = 50
    const dotRadius = 20 // Smaller dot radius
    
    for (let x = leftMargin; x < centerX - dotRadius - 10; x += 2) {
      const fadeOut = Math.min((centerX - dotRadius - 10 - x) / 100, 1)
      const fadeIn = Math.min((x - leftMargin) / 50, 1)
      const value = generateSignal(x, time, centerY, true) * fadeOut * fadeIn
      
      if (x === leftMargin) {
        ctx.moveTo(x, centerY + value)
      } else {
        ctx.lineTo(x, centerY + value)
      }
    }
    ctx.stroke()
    ctx.shadowBlur = 0
    
    // Draw 3D decomposed Fourier components emanating from the dot
    const { baseFrequencies, baseAmplitudes } = signalParams.value
    const rightEnd = width - 30
    
    const perturbation = signalParams.value.perturbation
    for (let i = 0; i < baseFrequencies.length; i++) {
      draw3DFourierComponent(
        centerX,
        centerY,
        dotRadius,
        rightEnd,
        baseFrequencies[i],
        baseAmplitudes[i],
        time,
        i,
        baseFrequencies.length,
        outputColors[i % outputColors.length],
        perturbation
      )
    }
    
    // Decay click effect
    if (mouseState.value.clicked && time - mouseState.value.clickTime > 2) {
      mouseState.value.clicked = false
    }
    
    // Draw particles along the signal path
    drawParticles(centerX, centerY, dotRadius)
    
    time += 0.016
  } catch (e) {
    // Log error details for debugging
    if (e instanceof Error) {
      console.error('Animation error:', e.message, e.stack)
    } else {
      console.error('Animation error (non-Error):', JSON.stringify(e))
    }
  }
  
  // Always schedule next frame
  animationId = requestAnimationFrame(draw)
}

// Particle system for visual flair - use plain array to avoid reactivity overhead
let particleList = []
const maxParticles = 50

const drawParticles = (centerX, centerY, dotRadius) => {
  if (!ctx) return
  
  // Spawn new particles more frequently
  if (particleList.length < maxParticles && Math.random() < 0.5) {
    particleList.push({
      x: 30 + Math.random() * 50,
      y: centerY + (Math.random() - 0.5) * 150,
      vx: 1.5 + Math.random() * 2.5,
      vy: (Math.random() - 0.5) * 1.5,
      life: 1,
      size: 2 + Math.random() * 4
    })
  }
  
  // Update and draw particles
  const newParticles = []
  for (let i = 0; i < particleList.length; i++) {
    const p = particleList[i]
    p.x += p.vx
    p.y += p.vy
    p.life -= 0.005 // Slower decay
    
    // Attract towards center
    if (p.x < centerX - dotRadius) {
      const dy = centerY - p.y
      p.vy += dy * 0.002
    }
    
    // Draw particle only if radius is positive
    const radius = Math.max(0.1, p.size * p.life)
    if (radius > 0 && p.life > 0) {
      ctx.beginPath()
      ctx.fillStyle = `rgba(45, 212, 191, ${Math.max(0, p.life) * 0.8})`
      ctx.arc(p.x, p.y, radius, 0, Math.PI * 2)
      ctx.fill()
    }
    
    // Keep particle if still alive and not past center
    if (p.life > 0.01 && p.x < centerX + 50) {
      newParticles.push(p)
    }
  }
  particleList = newParticles
}

const resizeCanvas = () => {
  if (!signalCanvas.value) return
  const canvas = signalCanvas.value
  const rect = canvas.getBoundingClientRect()
  const dpr = window.devicePixelRatio || 1
  
  // Store CSS dimensions for drawing calculations
  canvasWidth = rect.width
  canvasHeight = rect.height
  
  // Set actual canvas size for high DPI
  canvas.width = rect.width * dpr
  canvas.height = rect.height * dpr
  
  ctx = canvas.getContext('2d')
  ctx.scale(dpr, dpr)
  
  // Clear particles on resize
  particleList = []
}

const pillars = [
  {
    icon: '◈',
    title: 'ISAC',
    description: 'Integrated Sensing and Communication for next-gen wireless systems'
  },
  {
    icon: '◉',
    title: 'FL + DP',
    description: 'Federated Learning with Differential Privacy guarantees'
  },
  {
    icon: '◊',
    title: 'Quantum Networks',
    description: 'Quantum Key Distribution (QKD) and Quantum Federated Learning (QFL)'
  }
]

// Translated pillars - reactive to language changes
const translatedPillars = computed(() => {
  // Access currentLanguage to trigger reactivity
  const _ = currentLanguage.value
  return [
    {
      key: 'isac',
      icon: '◈',
      title: t('home.isac'),
      description: t('home.isacDesc')
    },
    {
      key: 'fldp',
      icon: '◉',
      title: t('home.flDp'),
      description: t('home.flDpDesc')
    },
    {
      key: 'quantum',
      icon: '◊',
      title: t('home.quantum'),
      description: t('home.quantumDesc')
    }
  ]
})

const recentWork = [
  {
    type: 'Research',
    title: 'Privacy-Preserving Wi-Fi Sensing in Distributed Networks',
    abstract: 'A novel approach to maintaining user privacy while leveraging Wi-Fi signals for human activity recognition in smart environments.',
    link: '/research'
  },
  {
    type: 'Publication',
    title: 'Differential Privacy in Federated Learning: A Comprehensive Survey',
    abstract: 'An extensive review of current methodologies and future directions in privacy-preserving distributed machine learning.',
    link: '/publications'
  }
]

const navigateToWork = (link) => {
  router.push(link)
}

onMounted(() => {
  // Check dark mode and watch for changes
  checkDarkMode()
  const observer = new MutationObserver(checkDarkMode)
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
  
  // Initialize canvas
  resizeCanvas()
  window.addEventListener('resize', resizeCanvas)
  
  // Start animation
  draw()
  
  // Hero entrance animation
  gsap.timeline()
    .from('.center-dot', { 
      scale: 0, 
      opacity: 0, 
      duration: 0.8, 
      ease: 'elastic.out(1, 0.5)' 
    })
    .from('.animate-fade-in', { 
      opacity: 0, 
      y: 20, 
      duration: 0.4, 
      stagger: 0.1,
      ease: 'power2.out' 
    }, '-=0.3')
})

onUnmounted(() => {
  if (animationId) {
    cancelAnimationFrame(animationId)
  }
  window.removeEventListener('resize', resizeCanvas)
})
</script>

<style scoped>
/* Center dot styles */
.center-dot-link {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 30;
  text-decoration: none;
}

.center-dot {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: radial-gradient(circle at 30% 30%, #5eead4, #2dd4bf 40%, #14b8a6 70%, #0d9488);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 
    0 0 20px rgba(45, 212, 191, 0.6),
    0 0 40px rgba(45, 212, 191, 0.3),
    inset 0 0 10px rgba(255, 255, 255, 0.2);
  position: relative;
  overflow: visible;
}

.center-dot::before {
  content: '';
  position: absolute;
  inset: -3px;
  border-radius: 50%;
  background: conic-gradient(from 0deg, transparent, #2dd4bf, transparent, #5eead4, transparent);
  animation: rotate-glow 3s linear infinite;
  opacity: 0.7;
  z-index: -1;
}

.center-dot::after {
  content: '';
  position: absolute;
  inset: -6px;
  border-radius: 50%;
  border: 1.5px solid rgba(45, 212, 191, 0.4);
  animation: pulse-ring 2s ease-out infinite;
}

.center-dot.hovered {
  transform: scale(1.3);
  box-shadow: 
    0 0 40px rgba(45, 212, 191, 0.8),
    0 0 80px rgba(45, 212, 191, 0.5),
    inset 0 0 15px rgba(255, 255, 255, 0.3);
}

.dot-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 10px;
  font-weight: 700;
  color: #0d1117;
  text-transform: lowercase;
  letter-spacing: 0.3px;
  text-shadow: 0 1px 2px rgba(255, 255, 255, 0.4);
  white-space: nowrap;
  animation: fadeIn 0.2s ease-out;
}

@keyframes rotate-glow {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes pulse-ring {
  0% {
    transform: scale(1);
    opacity: 0.6;
  }
  100% {
    transform: scale(1.5);
    opacity: 0;
  }
}

.animate-fade-in {
  animation: fadeIn 0.4s ease-out forwards;
  opacity: 0;
}

.animate-slide-up {
  animation: slideUp 0.4s ease-out forwards;
  opacity: 0;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(16px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* GitHub Contributions */
.github-contributions-wrapper {
  background: var(--color-surface-elevated, #f9fafb);
  border: 1px solid var(--color-border, #e5e7eb);
  border-radius: 12px;
  padding: 20px;
  overflow-x: auto;
  transition: all 0.3s ease;
}

:root.dark .github-contributions-wrapper {
  background: rgba(22, 27, 34, 0.8);
  border-color: rgba(48, 54, 61, 0.8);
}

.github-contributions-wrapper:hover {
  border-color: var(--color-primary, #2dd4bf);
  box-shadow: 0 4px 20px rgba(45, 212, 191, 0.15);
}

.github-contributions-img {
  width: 100%;
  max-width: 100%;
  height: auto;
  display: block;
  margin: 0 auto;
  border-radius: 4px;
}

/* Scrollbar for mobile */
.github-contributions-wrapper::-webkit-scrollbar {
  height: 6px;
}

.github-contributions-wrapper::-webkit-scrollbar-track {
  background: transparent;
}

.github-contributions-wrapper::-webkit-scrollbar-thumb {
  background: rgba(45, 212, 191, 0.3);
  border-radius: 3px;
}
</style>
