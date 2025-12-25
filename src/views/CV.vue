<template>
  <div class="cv-page py-12">
    <!-- Header Section -->
    <section class="cv-header mb-12">
      <div class="prose-container text-center">
        <h1 class="gothic-title text-sage mb-4">Curriculum Vitae</h1>
        <p class="serene-text text-xl">Gad Mohamed</p>
        <p class="text-gray-400">Ph.D. Student in Computer Science</p>
        
        <!-- Quick Stats -->
        <div class="flex flex-wrap justify-center gap-6 mt-8">
          <div class="stat-item">
            <span class="stat-value">{{ stats.yearsTeaching }}</span>
            <span class="stat-label">Years Teaching</span>
          </div>
          <div class="stat-item">
            <span class="stat-value">{{ stats.publications }}</span>
            <span class="stat-label">Publications</span>
          </div>
          <div class="stat-item">
            <span class="stat-value">{{ stats.hIndex }}</span>
            <span class="stat-label">h-index</span>
            <a href="https://scholar.google.com/citations?user=bZRYJuAAAAAJ&hl=en" 
               target="_blank" 
               class="text-sage-dark hover:text-sage text-xs ml-1">
              ↗
            </a>
          </div>
          <div class="stat-item">
            <span class="stat-value">{{ stats.venues }}</span>
            <span class="stat-label">Venues</span>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Skills Cloud -->
    <section class="mb-12">
      <div class="prose-container">
        <h2 class="gothic-subtitle text-sage mb-6">Skills & Expertise</h2>
        <div class="skills-cloud">
          <div v-for="category in skills" :key="category.name" class="mb-6">
            <h3 class="font-serif text-lg text-gray-300 mb-3">{{ category.name }}</h3>
            <div class="flex flex-wrap gap-2">
              <span 
                v-for="skill in category.items" 
                :key="skill"
                class="skill-tag"
              >
                {{ skill }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Experience Timeline -->
    <section class="mb-12 bg-charcoal/30 py-12">
      <div class="prose-container">
        <h2 class="gothic-subtitle text-sage mb-8">Experience</h2>
        <div class="timeline">
          <div 
            v-for="exp in experience" 
            :key="exp.id"
            class="timeline-item flex flex-col md:flex-row gap-6 mb-8"
          >
            <div class="timeline-date md:w-1/4">
              <span class="text-sage-dark font-medium">{{ exp.period }}</span>
            </div>
            <div class="timeline-content md:w-3/4 card-calm">
              <h3 class="font-serif text-xl text-gray-300 mb-2">{{ exp.title }}</h3>
              <p class="text-sage-light mb-3">{{ exp.institution }}</p>
              <ul class="list-disc list-inside space-y-1 text-gray-400 text-sm">
                <li v-for="bullet in exp.bullets" :key="bullet">{{ bullet }}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Education -->
    <section class="mb-12">
      <div class="prose-container">
        <h2 class="gothic-subtitle text-sage mb-8">Education</h2>
        <div class="space-y-6">
          <div v-for="edu in education" :key="edu.id" class="card-calm">
            <h3 class="font-serif text-xl text-gray-300 mb-2">{{ edu.degree }}</h3>
            <p class="text-sage-light">{{ edu.institution }}</p>
            <p class="text-gray-500 text-sm">{{ edu.period }}</p>
            <p v-if="edu.thesis" class="text-gray-400 text-sm mt-2">
              <span class="font-medium">Thesis:</span> {{ edu.thesis }}
            </p>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Recent Publications -->
    <section class="mb-12 bg-charcoal/30 py-12">
      <div class="prose-container">
        <h2 class="gothic-subtitle text-sage mb-8">Recent Publications</h2>
        <div class="space-y-4">
          <article v-for="pub in recentPublications" :key="pub.id" class="publication-item">
            <h3 class="font-serif text-lg text-gray-300 mb-2">{{ pub.title }}</h3>
            <p class="text-gray-400 text-sm mb-2">
              {{ pub.authors.join(', ') }}
            </p>
            <div class="flex items-center gap-3">
              <span class="venue-badge">{{ pub.venue }}</span>
              <span class="text-gray-500 text-xs">{{ pub.year }}</span>
            </div>
          </article>
        </div>
        <div class="mt-6 text-center">
          <router-link to="/publications" class="link-gothic">
            View all publications →
          </router-link>
        </div>
      </div>
    </section>
    
    <!-- Awards & Grants -->
    <section class="mb-12">
      <div class="prose-container">
        <h2 class="gothic-subtitle text-sage mb-8">Awards & Grants</h2>
        <div class="grid md:grid-cols-2 gap-4">
          <div v-for="award in awards" :key="award.id" class="card-calm">
            <h3 class="font-serif text-lg text-gray-300 mb-1">{{ award.title }}</h3>
            <p class="text-sage-light text-sm">{{ award.organization }}</p>
            <p class="text-gray-500 text-xs">{{ award.year }}</p>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Teaching Snapshot -->
    <section class="mb-12">
      <div class="prose-container">
        <h2 class="gothic-subtitle text-sage mb-8">Teaching</h2>
        <div class="space-y-4">
          <div v-for="course in teaching" :key="course.id" class="card-calm">
            <h3 class="font-serif text-lg text-gray-300 mb-2">{{ course.name }}</h3>
            <p class="text-gray-400 text-sm">{{ course.role }} · {{ course.period }}</p>
            <p class="text-gray-500 text-sm mt-2">{{ course.description }}</p>
          </div>
        </div>
        <div class="mt-6 text-center">
          <router-link to="/teaching" class="link-gothic">
            View teaching portfolio →
          </router-link>
        </div>
      </div>
    </section>
    
    <!-- Download & Actions -->
    <section class="py-12 border-t border-slate">
      <div class="prose-container">
        <div class="flex flex-wrap justify-center gap-4">
          <a href="/assets/docs/Gad_Gad_CV.pdf" target="_blank" class="btn-gothic">
            Download PDF
          </a>
          <button @click="copyBio('short')" class="btn-gothic">
            Copy Short Bio
          </button>
          <button @click="copyBio('full')" class="btn-gothic">
            Copy Full Bio
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// CV Data
const stats = ref({
  yearsTeaching: 4,
  publications: 18,
  hIndex: 9,
  venues: 15
})

const skills = ref([
  {
    name: 'AI/ML & FL',
    items: ['Federated Learning', 'Differential Privacy', 'Deep Learning', 'PyTorch', 'TensorFlow', 'Knowledge Distillation']
  },
  {
    name: 'Wi-Fi/IoT',
    items: ['Wi-Fi Sensing', 'CSI Analysis', 'ISAC', 'Signal Processing', 'Wireless Communications']
  },
  {
    name: 'Teaching',
    items: ['Computer Networks', 'Data Structures', 'Algorithms', 'Operating Systems', 'Course Design']
  },
  {
    name: 'Tools & Languages',
    items: ['Python', 'C++', 'JavaScript', 'MATLAB', 'Git', 'LaTeX', 'Docker', 'Linux']
  }
])

const experience = ref([
  {
    id: 1,
    period: 'Sept. 25 - Present',
    title: 'Volunteer',
    institution: 'Lumiere (Remote)',
    bullets: [
      'Mentoring talented high-school students through AI research projects'
    ]
  },
  {
    id: 2,
    period: 'Sept. 23 - Present',
    title: 'Teaching and Research Assistant',
    institution: 'Western University (London, Canada)',
    bullets: [
      'Conducting research in WiFi sensing, federated learning, interpretable deep learning, and differential privacy',
      'Published multiple papers in top-tier IEEE conferences and journals',
      'Developing privacy-preserving machine learning systems'
    ]
  },
  {
    id: 3,
    period: 'Sept. 24 - April 25',
    title: 'Lecturer',
    institution: 'Western University (London, Canada)',
    bullets: [
      'Teaching C language and Linux operating system to undergraduate students',
      'Designing course materials and assessments for computer science courses'
    ]
  },
  {
    id: 4,
    period: 'Sept. 21 - April 23',
    title: 'Teaching and Research Assistant',
    institution: 'Lakehead University (Thunder Bay, Canada)',
    bullets: [
      'Conducting research in federated learning, knowledge distillation, and differential privacy',
      'Teaching C language and Linux operating system to undergraduate students',
      'Mentoring students in research projects and coursework'
    ]
  },
  {
    id: 5,
    period: 'Apr. 21 - Aug. 21',
    title: 'Software Engineer',
    institution: 'Delta-care (Giza, Egypt)',
    bullets: [
      'Developed the backend of an automatic microscope system',
      'Implemented deep learning detection, tracking, and segmentation algorithms',
      'Automated human semen assessment using computer vision techniques'
    ]
  },
  {
    id: 6,
    period: 'Sept. 20 - Jul. 21',
    title: 'Software Intern',
    institution: 'Vortex (Alexandria, Egypt)',
    bullets: [
      'Software development for Vortex RoboSub 2021 competition Autonomous Underwater Vehicle (AUV) team',
      'Designed and implemented collaborative ROS nodes for smart underwater detection',
      'Developed motion planning algorithms for autonomous navigation'
    ]
  },
  {
    id: 7,
    period: 'Nov. 20 - May 21',
    title: 'Machine Learning Intern',
    institution: 'UN ESCWA (Remote; Lebanon, New York)',
    bullets: [
      'Satellite imagery analysis for urban development projects',
      'Applied machine learning techniques to geospatial data analysis'
    ]
  }
])

const education = ref([
  {
    id: 1,
    degree: 'Ph.D. in Computer Science',
    institution: 'Western University, Canada',
    period: '2022 - Present',
    thesis: 'Privacy-Preserving Wi-Fi Sensing in Distributed Networks'
  },
  {
    id: 2,
    degree: 'M.Sc. in Computer Science',
    institution: 'Lakehead University, Canada',
    period: '2020 - 2022',
    thesis: 'Federated Learning with Differential Privacy Guarantees'
  },
  {
    id: 3,
    degree: 'B.Eng. in Computer Engineering',
    institution: 'Nile University, Egypt',
    period: '2015 - 2019',
    thesis: null
  }
])

const recentPublications = ref([
  {
    id: 1,
    title: 'Joint self-organizing maps and knowledge-distillation-based communication-efficient federated learning for resource-constrained UAV-IoT systems',
    authors: ['G Gad', 'A Farrag', 'A Aboulfotouh', 'K Bedda', 'ZM Fadlullah', 'MM Fouda'],
    venue: 'IEEE Internet of Things Journal',
    year: 2024
  },
  {
    id: 2,
    title: 'Communication-efficient and privacy-preserving federated learning via joint knowledge distillation and differential privacy in bandwidth-constrained networks',
    authors: ['G Gad', 'E Gad', 'ZM Fadlullah', 'MM Fouda', 'N Kato'],
    venue: 'IEEE Transactions on Vehicular Technology',
    year: 2024
  },
  {
    id: 3,
    title: 'Federated learning with selective knowledge distillation over bandwidth-constrained wireless networks',
    authors: ['G Gad', 'ZM Fadlullah', 'MM Fouda', 'MI Ibrahem', 'N Kato'],
    venue: 'ICC 2024-IEEE International Conference on Communications',
    year: 2024
  }
])

const awards = ref([
  {
    id: 1,
    title: 'Best Paper Award',
    organization: 'IEEE Conference on Communications',
    year: 2023
  },
  {
    id: 2,
    title: 'Graduate Research Excellence Award',
    organization: 'Western University',
    year: 2023
  },
  {
    id: 3,
    title: 'NSERC Doctoral Scholarship',
    organization: 'Natural Sciences and Engineering Research Council',
    year: 2022
  },
  {
    id: 4,
    title: 'Teaching Excellence Award',
    organization: 'Lakehead University',
    year: 2021
  }
])

const teaching = ref([
  {
    id: 1,
    name: 'CS 3357 - Computer Networks',
    role: 'Instructor',
    period: 'Fall 2023',
    description: 'Undergraduate course covering TCP/IP, routing protocols, and network security'
  },
  {
    id: 2,
    name: 'CS 2210 - Data Structures and Algorithms',
    role: 'Teaching Assistant',
    period: 'Winter 2023',
    description: 'Core CS course on algorithmic thinking and efficient data structures'
  }
])

const copyBio = (type) => {
  const shortBio = 'Gad Mohamed is a Ph.D. student in Computer Science at Western University, Canada, specializing in privacy-preserving Wi-Fi sensing and federated learning.'
  
  const fullBio = `Gad Mohamed is a Ph.D. student in Computer Science at Western University, Canada. His research focuses on privacy-preserving machine learning, Wi-Fi sensing technologies, and federated learning systems. He holds a Master's degree from Lakehead University and a Bachelor's in Computer Engineering from Nile University, Egypt. His work has been published in top-tier venues including IEEE INFOCOM and ACM Computing Surveys. He is passionate about teaching and has received multiple awards for research and teaching excellence.`
  
  const textToCopy = type === 'short' ? shortBio : fullBio
  navigator.clipboard.writeText(textToCopy)
  
  // Show feedback (you could add a toast notification here)
  alert(`${type === 'short' ? 'Short' : 'Full'} bio copied to clipboard!`)
}

onMounted(() => {
  // Animate elements on scroll
  gsap.utils.toArray('.timeline-item').forEach(item => {
    gsap.fromTo(item, 
      { opacity: 0, x: -20 },
      {
        opacity: 1,
        x: 0,
        duration: 0.5,
        scrollTrigger: {
          trigger: item,
          start: 'top 85%',
          once: true
        }
      }
    )
  })
})
</script>

<style scoped>
.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.stat-value {
  font-size: 1.5rem;
  font-weight: 700;
  color: #3B82F6;
}

.stat-label {
  font-size: 0.875rem;
  color: #6B7280;
}

.skill-tag {
  padding: 0.25rem 0.75rem;
  background-color: #F3F4F6;
  border: 1px solid #E5E7EB;
  color: #6B7280;
  font-size: 0.875rem;
  transition: all 0.2s ease;
}

.dark .skill-tag {
  background-color: #374151;
  border-color: #4B5563;
  color: #9CA3AF;
}

.skill-tag:hover {
  border-color: #3B82F6;
  color: #3B82F6;
}

.timeline-item {
  position: relative;
}

.timeline-item::before {
  content: '◈';
  position: absolute;
  left: 0;
  top: 0;
  color: #3B82F6;
  font-size: 1.25rem;
  transform: translateX(-2rem);
}

@media (max-width: 768px) {
  .timeline-item::before {
    display: none;
  }
}
</style>
