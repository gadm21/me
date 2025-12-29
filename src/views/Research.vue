<template>
  <div class="research-page">
    <!-- Header -->
    <section class="section pb-8">
      <div class="content-container text-center">
        <h1 class="page-title mb-4">Research</h1>
        <p class="subtitle max-w-2xl mx-auto">
          Exploring the intersection of wireless sensing and privacy-preserving machine learning
        </p>
      </div>
    </section>
    
    <!-- Research Areas -->
    <section class="pb-16">
      <div class="wide-container">
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <article 
            v-for="area in researchAreas" 
            :key="area.id"
            class="research-card group"
            @click="expandArea(area)"
          >
            <div class="card card-hover h-full cursor-pointer">
              <div class="flex items-start justify-between mb-4">
                <span class="text-3xl">
                  {{ area.icon }}
                </span>
                <button class="text-text-tertiary group-hover:text-primary transition-colors">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
              <h3 class="text-lg font-semibold text-text-primary dark:text-text-primary-dark mb-2 group-hover:text-primary transition-colors">
                {{ area.title }}
              </h3>
              <p class="text-text-secondary dark:text-text-secondary-dark text-sm mb-4">{{ area.summary }}</p>
              <div class="flex flex-wrap gap-2">
                <span 
                  v-for="tag in area.tags" 
                  :key="tag"
                  class="tag"
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
          class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          @click.self="closeExpandedArea"
        >
          <div class="bg-surface-elevated dark:bg-surface-elevated-dark border border-border dark:border-border-dark rounded-lg p-8 max-w-3xl w-full max-h-[80vh] overflow-auto shadow-elevated">
            <div class="flex justify-between items-start mb-6">
              <div>
                <span class="text-4xl text-primary">{{ expandedArea.icon }}</span>
                <h2 class="section-title text-primary mt-4">{{ expandedArea.title }}</h2>
              </div>
              <button 
                @click="closeExpandedArea"
                class="text-text-tertiary hover:text-text-primary dark:hover:text-text-primary-dark text-2xl transition-colors"
              >
                ×
              </button>
            </div>
            <div class="max-w-none">
              <p class="body-text text-lg mb-6">{{ expandedArea.fullDescription }}</p>
              <h3 class="text-lg font-semibold text-text-primary dark:text-text-primary-dark mb-4">Key Contributions</h3>
              <ul class="space-y-2 text-text-secondary dark:text-text-secondary-dark">
                <li v-for="contribution in expandedArea.contributions" :key="contribution">
                  {{ contribution }}
                </li>
              </ul>
              <h3 class="text-lg font-semibold text-text-primary dark:text-text-primary-dark mt-6 mb-4">Related Publications</h3>
              <div class="space-y-3">
                <div 
                  v-for="pub in expandedArea.publications" 
                  :key="pub"
                  class="flex items-center gap-2"
                >
                  <span class="text-primary">→</span>
                  <router-link to="/publications" class="link">
                    {{ pub }}
                  </router-link>
                </div>
              </div>
              
              <!-- External Link (e.g., ThothCraft) -->
              <div v-if="expandedArea.link" class="mt-6 pt-6 border-t border-border dark:border-border-dark">
                <a 
                  :href="expandedArea.link" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  class="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 hover:bg-primary/20 text-primary rounded-lg transition-colors"
                >
                  <span>Visit ThothCraft</span>
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
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
    icon: '📡',
    title: 'Integrated Sensing and Communication (ISAC)',
    summary: 'Leveraging wireless signals for environmental awareness and next-gen wireless systems.',
    tags: ['WiFi Sensing', 'FMCW Radar', 'CSI', '6G'],
    fullDescription: 'ISAC represents a paradigm shift in wireless systems, combining communication and sensing into unified frameworks. By analyzing wireless signals (e.g., Channel State Information from Wi-Fi, radar signals), we can detect human presence, recognize activities, and enhance security without invasive cameras or wearables.',
    contributions: [
      'Enhanced environmental awareness and security for smart devices using WiFi-Sensing',
      'Developed integrated sensing and communication systems based on FMCW radar',
      'Created privacy-preserving sensing techniques for smart homes'
    ],
    publications: [
      'Enhanced Environmental Awareness and Security for Smart Devices using WiFi-Sensing (2025)'
    ]
  },
  {
    id: 2,
    icon: '🔗',
    title: 'Federated Learning (FL)',
    summary: 'Communication-efficient distributed machine learning for heterogeneous systems.',
    tags: ['Knowledge Distillation', 'UAV-IoT', 'Communication Efficiency', 'Heterogeneous Systems'],
    fullDescription: 'Federated Learning enables collaborative model training across decentralized data sources without sharing raw data. My research focuses on making FL more efficient and practical for resource-constrained environments like UAV-IoT systems and heterogeneous networks through knowledge distillation techniques.',
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
    icon: '🔒',
    title: 'Differential Privacy (DP)',
    summary: 'Rigorous mathematical privacy guarantees for machine learning models.',
    tags: ['Local DP', 'Privacy Preservation', 'MIA Defense', 'Privacy Budget'],
    fullDescription: 'Differential Privacy provides rigorous mathematical guarantees about the privacy of individuals in datasets. My research focuses on integrating DP with federated learning and knowledge distillation for practical privacy-preserving systems that defend against membership inference attacks.',
    contributions: [
      'Communication-efficient and privacy-preserving FL via joint knowledge distillation and differential privacy',
      'Joint knowledge distillation and local differential privacy for heterogeneous systems',
      'Privacy-preserving federated learning for human activity recognition systems'
    ],
    publications: [
      'Communication-efficient and privacy-preserving federated learning via joint knowledge distillation and differential privacy in bandwidth-constrained networks (2024)',
      'Joint knowledge distillation and local differential privacy for communication-efficient federated learning in heterogeneous systems (2023)'
    ]
  },
  {
    id: 4,
    icon: '⚛️',
    title: 'Quantum Networks',
    summary: 'Quantum Key Distribution (QKD) and Quantum Federated Learning (QFL).',
    tags: ['QKD', 'QFL', 'Post-Quantum Cryptography', 'Quantum Computing'],
    fullDescription: 'Quantum networks represent the future of secure communication and distributed computing. My research explores Quantum Key Distribution (QKD) for unconditionally secure communication and Quantum Federated Learning (QFL) for leveraging quantum computing advantages in distributed machine learning.',
    contributions: [
      'Exploring quantum-safe federated learning protocols',
      'Investigating QKD integration with classical networks',
      'Developing hybrid quantum-classical learning frameworks'
    ],
    publications: [
      'Research in progress - Quantum Federated Learning frameworks'
    ]
  },
  {
    id: 5,
    icon: '🤖',
    title: 'Artificial Intelligence',
    summary: 'REDUS adaptive resampling and agentic AI applications.',
    tags: ['REDUS', 'Agentic AI', 'Deep Learning', 'IoT Intelligence'],
    fullDescription: 'My AI research spans adaptive learning techniques like REDUS (adaptive resampling for efficient deep learning) and agentic AI applications that can autonomously perform complex tasks. This includes developing intelligent systems that can reason, plan, and execute multi-step workflows.',
    contributions: [
      'REDUS: Adaptive resampling for efficient deep learning in centralized and federated IoT networks',
      'Agentic AI applications for autonomous task execution',
      'Intelligent systems for complex workflow automation'
    ],
    publications: [
      'REDUS: Adaptive Resampling for Efficient Deep Learning in Centralized and Federated IoT Networks (2025)'
    ]
  },
  {
    id: 6,
    icon: '🌐',
    title: 'Edge Integrated Intelligence (EI²)',
    summary: 'A paradigm coined by our research group - ThothCraft is an implementation.',
    tags: ['Edge Computing', 'Distributed Intelligence', 'ThothCraft', 'Smart Systems'],
    fullDescription: 'Edge Integrated Intelligence (EI²) is a term coined by our research group to describe the seamless integration of AI capabilities at the network edge. ThothCraft is a practical implementation of this concept, demonstrating how intelligent agents can operate at the edge to provide personalized, context-aware services.',
    contributions: [
      'Coined the EI² paradigm for edge-native intelligence',
      'Developed ThothCraft as a reference implementation',
      'Created frameworks for distributed agentic systems at the edge'
    ],
    publications: [
      'ThothCraft: Edge Integrated Intelligence in Practice (Implementation)'
    ],
    link: 'https://www.thothcraft.com/'
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
  position: relative;
  padding-top: 0.5rem;
}

.status-dot {
  width: 0.75rem;
  height: 0.75rem;
  border-radius: 50%;
  animation: pulse 2s infinite;
}

.status-active .status-dot {
  background-color: #3B82F6;
}

.status-planning .status-dot {
  background-color: #8B5CF6;
}

.status-completed .status-dot {
  background-color: #22C55E;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

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
