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
        </div>
      </div>
    </section>

    <!-- Thoth Accountability Grid Section -->
    <section class="section relative z-10 bg-surface dark:bg-surface-dark pb-16">
      <div class="content-container">
        <div class="max-w-4xl mx-auto">
          <h2 class="section-title text-center mb-8">{{ t('home.thothAccountability') || 'Thoth Accountability' }}</h2>
          <div class="thoth-contributions-wrapper">
            <!-- Header with stats -->
            <div class="thoth-header">
              <div class="thoth-title">
                <span class="thoth-icon">𓂀</span>
                <span>Thoth Accountability</span>
              </div>
              <div class="thoth-stats" v-if="thothStats">
                <span class="stat-item">
                  <span class="stat-emoji">{{ thothStats.level?.emoji || '🌱' }}</span>
                  <span class="stat-label">{{ thothStats.level?.level || 'Novice' }}</span>
                </span>
                <span class="stat-item">
                  <span class="stat-value">{{ thothStats.stats?.total_xp || 0 }}</span>
                  <span class="stat-label">XP</span>
                </span>
                <span class="stat-item" v-if="thothStats.stats?.current_streak > 0">
                  <span class="stat-emoji">🔥</span>
                  <span class="stat-value">{{ thothStats.stats?.current_streak }}</span>
                  <span class="stat-label">streak</span>
                </span>
                <span class="stat-item">
                  <span class="stat-value">{{ thothStats.stats?.tasks_completed || 0 }}</span>
                  <span class="stat-label">tasks</span>
                </span>
                <span class="stat-item">
                  <span class="stat-emoji">💯</span>
                  <span class="stat-value">{{ thothStats.stats?.perfect_days || 0 }}</span>
                  <span class="stat-label">perfect</span>
                </span>
              </div>
            </div>
            
            <!-- Contribution Grid -->
            <div class="contribution-grid-container">
              <div class="contribution-grid">
                <div 
                  v-for="(day, index) in thothContributions" 
                  :key="index"
                  class="contribution-cell"
                  :class="'level-' + day.level"
                  :title="`${day.date}: ${day.tasks_completed || 0} tasks${day.completed ? ' completed' : ''} (${day.xp_earned || 0} XP)`"
                ></div>
              </div>
              <div class="contribution-legend">
                <span class="legend-label">Less</span>
                <div class="legend-cell level-0"></div>
                <div class="legend-cell level-1"></div>
                <div class="legend-cell level-2"></div>
                <div class="legend-cell level-3"></div>
                <div class="legend-cell level-4"></div>
                <span class="legend-label">More</span>
              </div>
            </div>
            
            <!-- Progress bar to next level -->
            <div class="level-progress" v-if="thothStats?.level">
              <div class="progress-info">
                <span>{{ thothStats.level.emoji }} {{ thothStats.level.level }}</span>
                <span>{{ thothStats.level.xp_to_next }} XP to {{ thothStats.level.next_level }}</span>
              </div>
              <div class="progress-bar">
                <div 
                  class="progress-fill" 
                  :style="{ width: thothStats.level.progress_percent + '%' }"
                ></div>
              </div>
            </div>
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

// GitHub contributions graph URL
const githubContributionsUrl = computed(() => {
  const theme = isDark.value ? 'teal' : '2dd4bf'
  return `https://ghchart.rshah.org/${theme}/${GITHUB_USERNAME}`
})

// Thoth Accountability data
const thothStats = ref(null)
const thothContributions = ref([])

// Fetch Thoth gamification data
const fetchThothData = async () => {
  try {
    const response = await fetch('https://api.thothcraft.com/data/gamification')
    if (response.ok) {
      const data = await response.json()
      if (data.success && data.data) {
        thothStats.value = data.data
        thothContributions.value = data.data.contributions || []
      }
    }
  } catch (error) {
    console.log('Thoth data not available:', error)
    // Generate placeholder data for demo
    generatePlaceholderData()
  }
}

// Generate placeholder data if API is not available
const generatePlaceholderData = () => {
  const contributions = []
  const today = new Date()
  
  for (let i = 364; i >= 0; i--) {
    const date = new Date(today)
    date.setDate(date.getDate() - i)
    const dateStr = date.toISOString().split('T')[0]
    
    // Generate task count similar to GitHub contribution pattern
    // Most days have 0-1 tasks, some have 2-3, few have 4+ tasks
    const rand = Math.random()
    let tasksCompleted = 0
    let xpEarned = 0
    
    if (rand > 0.7) {
      tasksCompleted = 1
      xpEarned = Math.floor(Math.random() * 20) + 10
    }
    if (rand > 0.85) {
      tasksCompleted = 2
      xpEarned = Math.floor(Math.random() * 30) + 25
    }
    if (rand > 0.93) {
      tasksCompleted = 3
      xpEarned = Math.floor(Math.random() * 40) + 40
    }
    if (rand > 0.97) {
      tasksCompleted = Math.floor(Math.random() * 3) + 4
      xpEarned = Math.floor(Math.random() * 50) + 60
    }
    
    // GitHub-style level calculation based on task count
    let level = 0
    if (tasksCompleted >= 1 && tasksCompleted <= 1) level = 1
    else if (tasksCompleted >= 2 && tasksCompleted <= 2) level = 2
    else if (tasksCompleted >= 3 && tasksCompleted <= 4) level = 3
    else if (tasksCompleted >= 5) level = 4
    
    contributions.push({
      date: dateStr,
      xp_earned: xpEarned,
      completed: tasksCompleted > 0,
      tasks_completed: tasksCompleted,
      level: level
    })
  }
  
  thothContributions.value = contributions
  thothStats.value = {
    level: { emoji: '🔥', level: 'Master', xp: 1250, xp_to_next: 250, next_level: 'Grandmaster', progress_percent: 50 },
    stats: { total_xp: 1250, current_streak: 7, longest_streak: 14, tasks_completed: 89, perfect_days: 23 }
  }
}

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
  signalParams.value.perturbation = 1.5
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

// Rainbow colors for light refraction (7 colors - ROYGBIV)
const rainbowColors = [
  '#ff0000', // Red
  '#ff8c00', // Orange
  '#ffff00', // Yellow
  '#00ff00', // Green
  '#00ffff', // Cyan
  '#0000ff', // Blue
  '#8b00ff', // Violet
]

// Pre-calculate sin/cos for angles (optimization)
const numRays = 7
const angleSpread = Math.PI * 0.55
const baseAngle = -angleSpread / 2
const rayAngles = []
for (let i = 0; i < numRays; i++) {
  const angle = baseAngle + (i / (numRays - 1)) * angleSpread
  rayAngles.push({ cos: Math.cos(angle), sin: Math.sin(angle) })
}

// Polished rainbow ray drawing - smooth lines with proper line caps
const drawRainbowRay = (centerX, centerY, dotRadius, endX, t, index) => {
  if (!ctx) return
  
  const { cos: cosA, sin: sinA } = rayAngles[index]
  const color = rainbowColors[index]
  const startDistance = dotRadius + 8
  const maxDistance = endX - centerX + 200
  
  // Smooth line rendering
  ctx.lineCap = 'round'
  ctx.lineJoin = 'round'
  
  ctx.beginPath()
  ctx.strokeStyle = color
  // Thicker lines in center, thinner at edges for depth
  ctx.lineWidth = 2.2 - Math.abs(index - 3) * 0.15
  // Fade opacity towards edges of spectrum
  ctx.globalAlpha = 0.9 - Math.abs(index - 3) * 0.05
  
  const step = 3 // Smoother curves
  let firstPoint = true
  
  for (let d = 0; d <= maxDistance; d += step) {
    const progress = d / maxDistance
    const baseX = centerX + cosA * (startDistance + d)
    const baseY = centerY + sinA * (startDistance + d)
    
    // Smooth wave with fade-in and fade-out
    const fadeIn = Math.min(d / 60, 1) // Smooth start
    const wavePhase = d * 0.008 - t * 1.0
    const waveAmp = 12 * fadeIn * Math.min(progress * 2.5, 1) * (1 - progress * 0.6)
    const wave = Math.sin(wavePhase) * waveAmp
    
    const x = baseX - sinA * wave
    const y = baseY + cosA * wave
    
    if (firstPoint) {
      ctx.moveTo(x, y)
      firstPoint = false
    } else {
      ctx.lineTo(x, y)
    }
  }
  ctx.stroke()
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
    
    // Draw input signal (left side) - spans from edge to center
    const leftMargin = 0
    const dotRadius = 20
    const step = 3 // Smoother curves
    
    // Polished input beam - smooth line caps
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
    ctx.beginPath()
    ctx.strokeStyle = isDark.value ? '#ffffff' : '#1a1a1a'
    ctx.lineWidth = 2.5
    ctx.globalAlpha = 0.92
    
    for (let x = leftMargin; x < centerX - dotRadius - 10; x += step) {
      const fadeOut = Math.min((centerX - dotRadius - 10 - x) / 80, 1)
      const fadeIn = Math.min(x / 60, 1) // Smooth fade in from edge
      const value = generateSignal(x, time, centerY, true) * fadeOut * fadeIn
      
      if (x === leftMargin) {
        ctx.moveTo(x, centerY + value)
      } else {
        ctx.lineTo(x, centerY + value)
      }
    }
    ctx.stroke()
    ctx.globalAlpha = 1
    
    // Draw rainbow refracted rays - span to right edge
    const rightEnd = width // Extend to full width
    for (let i = 0; i < numRays; i++) {
      drawRainbowRay(centerX, centerY, dotRadius, rightEnd, time, i)
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

// Optimized particle system - fewer particles, no shadows
let particleList = []
const maxParticles = 25 // Reduced from 80

// Rainbow particle colors (pre-computed RGB strings)
const particleColorsLight = [
  'rgba(0,0,0,',       // Black (input) for light theme
  'rgba(255,0,0,',     // Red
  'rgba(255,140,0,',   // Orange  
  'rgba(255,255,0,',   // Yellow
  'rgba(0,200,0,',     // Green (darker for light bg)
  'rgba(0,200,200,',   // Cyan (darker for light bg)
  'rgba(0,0,255,',     // Blue
  'rgba(139,0,255,',   // Violet
]

const particleColorsDark = [
  'rgba(255,255,255,', // White (input) for dark theme
  'rgba(255,0,0,',     // Red
  'rgba(255,140,0,',   // Orange  
  'rgba(255,255,0,',   // Yellow
  'rgba(0,255,0,',     // Green
  'rgba(0,255,255,',   // Cyan
  'rgba(0,0,255,',     // Blue
  'rgba(139,0,255,',   // Violet
]

const drawParticles = (centerX, centerY, dotRadius) => {
  if (!ctx) return
  
  const particleColors = isDark.value ? particleColorsDark : particleColorsLight
  
  // Spawn particles from left edge only (no mouse interaction)
  if (particleList.length < maxParticles && Math.random() < 0.25) {
    particleList.push({
      x: 10 + Math.random() * 40,
      y: centerY + (Math.random() - 0.5) * 100,
      vx: 2.5 + Math.random() * 2,
      vy: (Math.random() - 0.5) * 1,
      life: 1,
      size: 2 + Math.random() * 3,
      colorIdx: 0,
      isRainbow: false
    })
  }
  
  // Update and draw particles
  const newParticles = []
  for (let i = 0; i < particleList.length; i++) {
    const p = particleList[i]
    p.x += p.vx
    p.y += p.vy
    p.life -= 0.012
    
    // Attract towards center on input side
    if (p.x < centerX - dotRadius) {
      p.vy += (centerY - p.y) * 0.002
    }
    
    // Transform to rainbow at prism
    if (!p.isRainbow && p.x > centerX - dotRadius) {
      p.isRainbow = true
      p.colorIdx = 1 + Math.floor(Math.random() * 7)
      const spreadAngle = (Math.random() - 0.5) * Math.PI * 0.6
      const speed = 2.5 + Math.random() * 2
      p.vx = Math.cos(spreadAngle) * speed
      p.vy = Math.sin(spreadAngle) * speed
      p.life = 0.85
    }
    
    // Draw particle
    if (p.life > 0) {
      const radius = p.size * p.life
      ctx.beginPath()
      ctx.fillStyle = particleColors[p.colorIdx] + (p.life * 0.85) + ')'
      ctx.arc(p.x, p.y, radius, 0, Math.PI * 2)
      ctx.fill()
    }
    
    if (p.life > 0.02 && p.x < canvasWidth + 20) {
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
  
  // Fetch Thoth accountability data
  fetchThothData()
  
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
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: 
    radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.6) 30%, transparent 60%),
    conic-gradient(from 180deg, 
      #ff0000 0deg, 
      #ff8c00 30deg, 
      #ffff00 60deg, 
      #00ff00 120deg, 
      #00ffff 180deg, 
      #0000ff 240deg, 
      #8b00ff 300deg, 
      #ff0000 360deg
    );
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 
    0 0 25px rgba(255, 255, 255, 0.8),
    0 0 50px rgba(255, 200, 100, 0.4),
    0 0 80px rgba(255, 100, 100, 0.2),
    inset 0 0 15px rgba(255, 255, 255, 0.5);
  position: relative;
  overflow: visible;
}

.center-dot::before {
  content: '';
  position: absolute;
  inset: -4px;
  border-radius: 50%;
  background: conic-gradient(from 0deg, 
    rgba(255, 0, 0, 0.6), 
    rgba(255, 140, 0, 0.6), 
    rgba(255, 255, 0, 0.6), 
    rgba(0, 255, 0, 0.6), 
    rgba(0, 255, 255, 0.6), 
    rgba(0, 0, 255, 0.6), 
    rgba(139, 0, 255, 0.6), 
    rgba(255, 0, 0, 0.6)
  );
  animation: rotate-glow 4s linear infinite;
  opacity: 0.8;
  z-index: -1;
  filter: blur(3px);
}

.center-dot::after {
  content: '';
  position: absolute;
  inset: -8px;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.5);
  animation: pulse-ring 2s ease-out infinite;
  background: conic-gradient(from 90deg, 
    transparent, 
    rgba(255, 255, 255, 0.3), 
    transparent, 
    rgba(255, 255, 255, 0.3), 
    transparent
  );
}

.center-dot.hovered {
  transform: scale(1.3);
  box-shadow: 
    0 0 40px rgba(255, 255, 255, 1),
    0 0 80px rgba(255, 200, 100, 0.6),
    0 0 120px rgba(255, 100, 100, 0.4),
    inset 0 0 20px rgba(255, 255, 255, 0.6);
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

/* Thoth Accountability Grid */
.thoth-contributions-wrapper {
  background: var(--color-surface-elevated, #f9fafb);
  border: 1px solid var(--color-border, #e5e7eb);
  border-radius: 12px;
  padding: 20px;
  transition: all 0.3s ease;
}

:root.dark .thoth-contributions-wrapper {
  background: rgba(22, 27, 34, 0.8);
  border-color: rgba(48, 54, 61, 0.8);
}

.thoth-contributions-wrapper:hover {
  border-color: #216e39;
  box-shadow: 0 4px 20px rgba(33, 110, 57, 0.15);
}

.thoth-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  flex-wrap: wrap;
  gap: 12px;
}

.thoth-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--color-text, #1f2937);
}

:root.dark .thoth-title {
  color: #e5e7eb;
}

.thoth-icon {
  font-size: 1.4rem;
}

.thoth-stats {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 0.85rem;
  color: var(--color-text-secondary, #6b7280);
}

:root.dark .stat-item {
  color: #9ca3af;
}

.stat-emoji {
  font-size: 1rem;
}

.stat-value {
  font-weight: 700;
  color: var(--color-text, #1f2937);
}

:root.dark .stat-value {
  color: #f3f4f6;
}

.stat-label {
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

/* Contribution Grid */
.contribution-grid-container {
  overflow-x: auto;
  padding-bottom: 8px;
}

.contribution-grid {
  display: grid;
  grid-template-columns: repeat(53, 1fr);
  grid-template-rows: repeat(7, 1fr);
  gap: 3px;
  min-width: 700px;
}

.contribution-cell {
  width: 12px;
  height: 12px;
  border-radius: 2px;
  transition: all 0.2s ease;
  cursor: pointer;
}

.contribution-cell:hover {
  transform: scale(1.3);
  z-index: 10;
}

/* Light mode colors - GitHub-style green theme */
.contribution-cell.level-0 {
  background: #ebedf0;
}
.contribution-cell.level-1 {
  background: #9be9a8;
}
.contribution-cell.level-2 {
  background: #40c463;
}
.contribution-cell.level-3 {
  background: #30a14e;
}
.contribution-cell.level-4 {
  background: #216e39;
}

/* Dark mode colors - GitHub-style green theme */
:root.dark .contribution-cell.level-0 {
  background: #0d1117;
}
:root.dark .contribution-cell.level-1 {
  background: #0e4429;
}
:root.dark .contribution-cell.level-2 {
  background: #006d32;
}
:root.dark .contribution-cell.level-3 {
  background: #26a641;
}
:root.dark .contribution-cell.level-4 {
  background: #39d353;
}

/* Legend */
.contribution-legend {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 4px;
  margin-top: 12px;
  font-size: 0.75rem;
  color: var(--color-text-secondary, #6b7280);
}

:root.dark .contribution-legend {
  color: #9ca3af;
}

.legend-label {
  margin: 0 4px;
}

.legend-cell {
  width: 12px;
  height: 12px;
  border-radius: 2px;
}

/* Level Progress Bar */
.level-progress {
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid var(--color-border, #e5e7eb);
}

:root.dark .level-progress {
  border-top-color: rgba(48, 54, 61, 0.8);
}

.progress-info {
  display: flex;
  justify-content: space-between;
  font-size: 0.85rem;
  margin-bottom: 8px;
  color: var(--color-text-secondary, #6b7280);
}

:root.dark .progress-info {
  color: #9ca3af;
}

.progress-bar {
  height: 8px;
  background: var(--color-border, #e5e7eb);
  border-radius: 4px;
  overflow: hidden;
}

:root.dark .progress-bar {
  background: #374151;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #216e39, #30a14e);
  border-radius: 4px;
  transition: width 0.5s ease;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .thoth-header {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .contribution-grid {
    gap: 2px;
  }
  
  .contribution-cell {
    width: 10px;
    height: 10px;
  }
  
  .legend-cell {
    width: 10px;
    height: 10px;
  }
}
</style>
