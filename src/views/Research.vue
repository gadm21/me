<template>
  <div class="research-page py-12">
    <div class="prose-container">
      <h1 class="gothic-title text-sage text-center mb-8">Research</h1>
      <p class="serene-text text-xl text-center mb-12">
        Exploring the intersection of wireless sensing and privacy-preserving machine learning
      </p>
    </div>
    
    <!-- Research Areas -->
    <section class="mb-16">
      <div class="max-w-6xl mx-auto px-6">
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <article 
            v-for="area in researchAreas" 
            :key="area.id"
            class="research-card group"
            @click="expandArea(area)"
          >
            <div class="card-calm h-full cursor-pointer">
              <div class="flex items-start justify-between mb-4">
                <span class="text-4xl text-sage-dark group-hover:text-sage transition-colors">
                  {{ area.icon }}
                </span>
                <button class="text-gray-500 group-hover:text-sage-light transition-colors">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
              <h3 class="font-serif text-xl text-gray-300 mb-3 group-hover:text-sage-light transition-colors">
                {{ area.title }}
              </h3>
              <p class="text-gray-500 text-sm mb-4">{{ area.summary }}</p>
              <div class="flex flex-wrap gap-2">
                <span 
                  v-for="tag in area.tags" 
                  :key="tag"
                  class="text-xs px-2 py-1 bg-midnight text-gray-400 border border-slate"
                >
                  {{ tag }}
                </span>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
    


    
    <!-- Expanded Area Modal -->
    <Teleport to="body">
      <transition name="modal">
        <div 
          v-if="expandedArea" 
          class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80"
          @click.self="closeExpandedArea"
        >
          <div class="bg-charcoal border border-slate rounded-lg p-8 max-w-3xl w-full max-h-[80vh] overflow-auto">
            <div class="flex justify-between items-start mb-6">
              <div>
                <span class="text-4xl text-sage">{{ expandedArea.icon }}</span>
                <h2 class="gothic-subtitle text-sage mt-4">{{ expandedArea.title }}</h2>
              </div>
              <button 
                @click="closeExpandedArea"
                class="text-gray-400 hover:text-gray-300 text-2xl"
              >
                ×
              </button>
            </div>
            <div class="prose prose-invert max-w-none">
              <p class="serene-text text-lg mb-6">{{ expandedArea.fullDescription }}</p>
              <h3 class="font-serif text-xl text-gray-300 mb-4">Key Contributions</h3>
              <ul class="space-y-2 text-gray-400">
                <li v-for="contribution in expandedArea.contributions" :key="contribution">
                  {{ contribution }}
                </li>
              </ul>
              <h3 class="font-serif text-xl text-gray-300 mt-6 mb-4">Related Publications</h3>
              <div class="space-y-3">
                <div 
                  v-for="pub in expandedArea.publications" 
                  :key="pub"
                  class="flex items-center gap-2"
                >
                  <span class="text-sage">→</span>
                  <router-link to="/publications" class="link-gothic">
                    {{ pub }}
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const expandedArea = ref(null)

const researchAreas = ref([
  {
    id: 1,
    title: 'Integrated Sensing and Communication (ISAC)',
    summary: 'Leveraging wireless signals for environmental awareness.',
    tags: ['WiFi Sensing', 'FMCW Radar', 'Smart Home', 'Environmental Awareness'],
    fullDescription: 'Wireless sensing represents a paradigm shift in how we perceive and interact with our environments. By analyzing wireless signals (e.g., Channel State Information (CSI) from Wi-Fi signals, radar signals), we can detect human presence, recognize activities, and enhance security, all without invasive cameras or wearable devices.',
    contributions: [
      'Enhanced environmental awareness and security for smart devices using WiFi-Sensing',
      'Developed integrated sensing and communication (ISAC) systems based on FMCW radar',
      'Created privacy-preserving sensing techniques for smart homes'
    ],
    publications: [
      'Enhanced Environmental Awareness and Security for Smart Devices using WiFi-Sensing (2025)'
      
    ]
  },
  {
    id: 2,
    title: 'Federated Learning',
    summary: 'Communication-efficient and privacy-preserving distributed machine learning for heterogeneous systems.',
    tags: ['Federated Learning', 'Knowledge Distillation', 'UAV-IoT', 'Communication Efficiency'],
    fullDescription: 'Federated Learning enables collaborative model training across decentralized data sources without sharing raw data. My research focuses on making federated learning more efficient and practical for resource-constrained environments like UAV-IoT systems and heterogeneous networks.',
    contributions: [
      'Joint self-organizing maps and knowledge distillation for UAV-IoT systems',
      'Communication-efficient federated learning with selective knowledge distillation',
      'Federated learning via augmented knowledge distillation for human activity recognition'
    ],
    publications: [
      'Joint self-organizing maps and knowledge-distillation-based communication-efficient federated learning for resource-constrained UAV-IoT systems (2024)',
      'Communication-efficient federated learning in drone-assisted IoT networks (2023)', 
      'Federated learning via augmented knowledge distillation for heterogenous deep human activity recognition systems (2022)'
    ]
  },
  {
    id: 3,
    title: 'Differential Privacy',
    summary: 'Privacy-preserving deep learning models',
    tags: ['Differential Privacy', 'Privacy Preservation', 'Membership Inference Attack (MIA)'],
    fullDescription: 'Differential Privacy provides rigorous mathematical guarantees about the privacy of individuals in datasets. My research focuses on integrating differential privacy with federated learning and knowledge distillation for practical privacy-preserving systems.',
    contributions: [
      'Communication-efficient and privacy-preserving federated learning via joint knowledge distillation and differential privacy',
      'Joint knowledge distillation and local differential privacy for heterogeneous systems',
      'Privacy-preserving federated learning for human activity recognition systems'
    ],
    publications: [
      'Communication-efficient and privacy-preserving federated learning via joint knowledge distillation and differential privacy in bandwidth-constrained networks (2024)',
      'Joint knowledge distillation and local differential privacy for communication-efficient federated learning in heterogeneous systems (2023)'
    ]
  }
])

const currentProjects = ref([
  {
    id: 1,
    title: 'Enhanced WiFi-Sensing for Smart Devices',
    collaborators: ['Western University', 'Industry Partners'],
    description: 'Developing enhanced environmental awareness and security systems for smart devices using WiFi-sensing technologies.',
    status: 'active',
    progress: 85,
    paper: 'Enhanced Environmental Awareness and Security for Smart Devices using WiFi-Sensing (2025)',
    code: null,
    demo: null
  },
  {
    id: 2,
    title: 'REDUS: Adaptive Resampling for Federated IoT Networks',
    collaborators: ['Western University', 'International Collaborators'],
    description: 'Developing adaptive resampling techniques for efficient deep learning in centralized and federated IoT networks.',
    status: 'active',
    progress: 70,
    paper: 'REDUS: Adaptive Resampling for Efficient Deep Learning in Centralized and Federated IoT Networks (2025)',
    code: null,
    demo: null
  },
  {
    id: 3,
    title: 'Collaborative Learning for Network Security',
    collaborators: ['Western University', 'Security Research Group'],
    description: 'Developing collaborative learning approaches for combating malware traffic in emerging networks.',
    status: 'active',
    progress: 60,
    paper: 'Combating Malware Traffic in Emerging Networks: A Collaborative Learning Approach (2024)',
    code: null,
    demo: null
  }
])

const researchTimeline = ref([
  {
    id: 1,
    date: '2024 Q3',
    title: 'IEEE IoT Journal Publication',
    description: 'Published research on joint self-organizing maps and knowledge-distillation-based federated learning for UAV-IoT systems.'
  },
  {
    id: 2,
    date: '2024 Q2',
    title: 'IEEE TVT Journal Publication',
    description: 'Published work on communication-efficient and privacy-preserving federated learning via joint knowledge distillation and differential privacy.'
  },
  {
    id: 3,
    date: '2023 Q4',
    title: 'Multiple Conference Publications',
    description: 'Published papers at GLOBECOM 2023 and ICC 2023 on federated learning and privacy-preserving techniques.'
  },
  {
    id: 4,
    date: '2023 Q3',
    title: 'Started PhD at Western University',
    description: 'Began doctoral studies focusing on WiFi sensing, federated learning, and differential privacy.'
  },
  {
    id: 5,
    date: '2022 Q1',
    title: 'Sensors Journal Publication',
    description: 'Published foundational work on federated learning via augmented knowledge distillation for human activity recognition systems.'
  }
])

const expandArea = (area) => {
  expandedArea.value = area
}

const closeExpandedArea = () => {
  expandedArea.value = null
}

onMounted(() => {
  // Animate research cards
  gsap.utils.toArray('.research-card').forEach((card, index) => {
    gsap.fromTo(card, 
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        delay: index * 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 85%',
          once: true
        }
      }
    )
  })
  
  // Animate timeline
  gsap.utils.toArray('.timeline-milestone').forEach((milestone, index) => {
    gsap.fromTo(milestone, 
      { 
        opacity: 0, 
        x: index % 2 === 0 ? -30 : 30 
      },
      {
        opacity: 1,
        x: 0,
        duration: 0.5,
        scrollTrigger: {
          trigger: milestone,
          start: 'top 85%',
          once: true
        }
      }
    )
  })
})
</script>

<style scoped>
.project-status {
  @apply relative pt-2;
}

.status-dot {
  @apply w-3 h-3 rounded-full;
  animation: pulse 2s infinite;
}

.status-active .status-dot {
  @apply bg-sage;
}

.status-planning .status-dot {
  @apply bg-violet-dusty;
}

.status-completed .status-dot {
  @apply bg-doppler-teal;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.timeline-container {
  @apply relative;
}

.timeline-container::before {
  content: '';
  @apply absolute left-1/2 transform -translate-x-1/2 w-px h-full bg-slate;
}

.timeline-milestone {
  @apply relative mb-8;
}

.milestone-content {
  @apply w-5/12;
}

.milestone-right .milestone-content {
  @apply ml-auto;
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

@media (max-width: 768px) {
  .timeline-container::before {
    @apply left-4;
  }
  
  .milestone-content {
    @apply w-full ml-8;
  }
}
</style>
