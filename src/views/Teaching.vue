<template>
  <div class="teaching-page py-12">
    <div class="prose-container">
      <h1 class="gothic-title text-sage text-center mb-8">Teaching</h1>
      <p class="serene-text text-xl text-center mb-12">
        Guiding the next generation through the landscapes of computer science
      </p>
    </div>
    
    <!-- Current Courses -->
    <section class="mb-16">
      <div class="max-w-6xl mx-auto px-6">
        <h2 class="gothic-subtitle text-sage mb-8 text-center">Current Semester</h2>
        <div class="grid md:grid-cols-2 gap-8">
          <div 
            v-for="course in currentCourses" 
            :key="course.id"
            class="course-card"
          >
            <div class="card-calm h-full">
              <div class="flex justify-between items-start mb-4">
                <div>
                  <h3 class="font-serif text-xl text-gray-300">{{ course.code }}</h3>
                  <p class="text-sage-light text-lg">{{ course.name }}</p>
                </div>
                <span class="venue-badge">{{ course.level }}</span>
              </div>
              
              <div class="space-y-3 mb-4">
                <div class="flex items-center gap-2 text-sm text-gray-400">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {{ course.schedule }}
                </div>
                <div class="flex items-center gap-2 text-sm text-gray-400">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {{ course.location }}
                </div>
                <div class="flex items-center gap-2 text-sm text-gray-400">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                  {{ course.students }} students
                </div>
              </div>
              
              <p class="text-gray-500 text-sm mb-4">{{ course.description }}</p>
              
              <div class="flex gap-3">
                <a 
                  v-if="course.syllabus" 
                  :href="course.syllabus"
                  class="link-gothic text-sm"
                >
                  Syllabus →
                </a>
                <a 
                  v-if="course.materials" 
                  :href="course.materials"
                  class="link-gothic text-sm"
                >
                  Materials →
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Teaching Philosophy -->
    <section class="bg-charcoal/30 py-16 mb-16">
      <div class="prose-container">
        <h2 class="gothic-subtitle text-sage mb-8">Teaching Philosophy</h2>
        <div class="drop-cap serene-text text-lg leading-relaxed space-y-4">
          <p>
            My teaching philosophy centers on creating an inclusive, engaging environment where students 
            develop both theoretical understanding and practical skills. I believe in the power of active 
            learning, where students construct knowledge through hands-on experiences and collaborative problem-solving.
          </p>
          <p>
            In my classroom, mistakes are celebrated as learning opportunities, questions are encouraged 
            at every turn, and diverse perspectives enrich our collective understanding. I strive to connect 
            abstract concepts to real-world applications, making computer science accessible and relevant to all students.
          </p>
          <p>
            Beyond technical skills, I aim to cultivate critical thinking, ethical reasoning, and a lifelong 
            love of learning. My goal is not just to teach algorithms and data structures, but to inspire 
            the next generation of thoughtful, innovative technologists.
          </p>
        </div>
      </div>
    </section>
    
    <!-- Past Courses -->
    <section class="mb-16">
      <div class="prose-container">
        <h2 class="gothic-subtitle text-sage mb-8">Course History</h2>
        <div class="course-timeline">
          <div 
            v-for="(semester, index) in pastCourses" 
            :key="semester.term"
            class="semester-group mb-8"
          >
            <h3 class="font-serif text-xl text-sage-light mb-4">{{ semester.term }}</h3>
            <div class="space-y-3">
              <div 
                v-for="course in semester.courses" 
                :key="course.code"
                class="past-course-item card-calm flex justify-between items-center"
              >
                <div>
                  <span class="font-medium text-gray-300">{{ course.code }}</span>
                  <span class="text-gray-400 ml-2">{{ course.name }}</span>
                  <span class="text-gray-500 text-sm ml-3">{{ course.role }}</span>
                </div>
                <div class="flex items-center gap-3">
                  <span class="text-sm text-gray-500">Rating: {{ course.rating }}/5</span>
                  <a 
                    v-if="course.feedback" 
                    :href="course.feedback"
                    class="text-sage-dark hover:text-sage text-sm"
                  >
                    Feedback
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Resources & Materials -->
    <section class="mb-16">
      <div class="max-w-6xl mx-auto px-6">
        <h2 class="gothic-subtitle text-sage mb-8 text-center">Teaching Resources</h2>
        <div class="grid md:grid-cols-3 gap-6">
          <div 
            v-for="resource in resources" 
            :key="resource.id"
            class="resource-card group cursor-pointer"
            @click="downloadResource(resource)"
          >
            <div class="card-calm text-center h-full flex flex-col justify-center">
              <div class="text-4xl text-sage-dark mb-4 group-hover:text-sage transition-colors">
                {{ resource.icon }}
              </div>
              <h3 class="font-serif text-lg text-gray-300 mb-2">{{ resource.title }}</h3>
              <p class="text-gray-500 text-sm mb-3">{{ resource.description }}</p>
              <span class="link-gothic text-sm mt-auto">Download →</span>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Student Testimonials -->
    <section class="bg-charcoal/30 py-16">
      <div class="prose-container">
        <h2 class="gothic-subtitle text-sage mb-8 text-center">Student Voices</h2>
        <div class="grid md:grid-cols-2 gap-6">
          <blockquote 
            v-for="testimonial in testimonials" 
            :key="testimonial.id"
            class="testimonial card-calm"
          >
            <p class="text-gray-400 italic mb-4">"{{ testimonial.text }}"</p>
            <footer class="text-sm">
              <span class="text-sage-light">— {{ testimonial.student }}</span>
              <span class="text-gray-500 ml-2">{{ testimonial.course }}, {{ testimonial.term }}</span>
            </footer>
          </blockquote>
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

const currentCourses = ref([
  {
    id: 1,
    code: 'CS 3357A',
    name: 'Computer Networks',
    level: 'Undergraduate',
    schedule: 'MWF 10:00-11:00 AM',
    location: 'Western University',
    students: 120,
    description: 'Comprehensive study of computer networks including TCP/IP, routing protocols, network security, and modern networking technologies. Focus on practical implementation and hands-on labs.',
    syllabus: '/assets/docs/CS3357A COMPUTER NETWORKING_assignment1.pdf',
    materials: '/teaching/cs3357-materials'
  },
  {
    id: 2,
    code: 'CS 2211',
    name: 'Systems Programming (C and Linux)',
    level: 'Undergraduate',
    schedule: 'TTh 2:00-3:30 PM',
    location: 'Western University',
    students: 80,
    description: 'Introduction to systems programming using C language and Linux operating system. Covers memory management, file I/O, process control, and system calls.',
    syllabus: '/teaching/cs2211-syllabus.pdf',
    materials: null
  }
])

const pastCourses = ref([
  {
    term: 'Fall 2023 - Present',
    courses: [
      {
        code: 'Research',
        name: 'WiFi Sensing & Federated Learning Research',
        role: 'Teaching & Research Assistant',
        rating: null,
        feedback: null
      }
    ]
  },
  {
    term: 'Sept 2021 - April 2023',
    courses: [
      {
        code: 'Various',
        name: 'C Language and Linux Operating System',
        role: 'Teaching & Research Assistant',
        rating: 4.7,
        feedback: null
      }
    ]
  },
  {
    term: 'Sept 2025 - Present',
    courses: [
      {
        code: 'Lumiere',
        name: 'AI Research Mentorship',
        role: 'Volunteer Mentor',
        rating: null,
        feedback: null
      }
    ]
  }
])

const resources = ref([
  {
    id: 1,
    icon: '📚',
    title: 'Network Programming Cheat Sheet',
    description: 'Quick reference for socket programming in Python and C',
    file: '/resources/network-cheatsheet.pdf'
  },
  {
    id: 2,
    icon: '🔬',
    title: 'Lab Manual: Wi-Fi CSI Collection',
    description: 'Step-by-step guide for collecting and analyzing CSI data',
    file: '/resources/csi-lab-manual.pdf'
  },
  {
    id: 3,
    icon: '🎯',
    title: 'Practice Problems: Algorithms',
    description: 'Curated set of algorithm problems with solutions',
    file: '/resources/algorithm-problems.pdf'
  },
  {
    id: 4,
    icon: '🔒',
    title: 'Differential Privacy Tutorial',
    description: 'Introduction to DP concepts with practical examples',
    file: '/resources/dp-tutorial.pdf'
  },
  {
    id: 5,
    icon: '🌐',
    title: 'Federated Learning Starter Kit',
    description: 'Code templates and tutorials for FL implementation',
    file: '/resources/fl-starter.zip'
  },
  {
    id: 6,
    icon: '📊',
    title: 'Data Structures Visualizations',
    description: 'Interactive visualizations of common data structures',
    file: '/resources/ds-visualizations.html'
  }
])

const testimonials = ref([
  {
    id: 1,
    text: 'Professor Mohamed\'s passion for the subject is contagious. He made complex networking concepts accessible and engaging through real-world examples and hands-on labs.',
    student: 'Sarah Chen',
    course: 'CS 3357',
    term: 'Fall 2023'
  },
  {
    id: 2,
    text: 'The best TA I\'ve had! Always available for questions and provided clear explanations. The extra practice problems really helped me understand the material.',
    student: 'Michael Thompson',
    course: 'CS 2210',
    term: 'Winter 2023'
  },
  {
    id: 3,
    text: 'Gad creates an inclusive classroom environment where everyone feels comfortable asking questions. His teaching style perfectly balances theory and practice.',
    student: 'Emily Rodriguez',
    course: 'COMP 4411',
    term: 'Winter 2022'
  },
  {
    id: 4,
    text: 'The privacy-preserving ML course opened my eyes to the ethical implications of our work. Challenging but incredibly rewarding!',
    student: 'Alex Kim',
    course: 'CS 9668',
    term: 'Fall 2023'
  }
])

const downloadResource = (resource) => {
  // In a real app, this would trigger a download
  window.open(resource.file, '_blank')
}

onMounted(() => {
  // Animate course cards
  gsap.utils.toArray('.course-card').forEach((card, index) => {
    gsap.fromTo(card, 
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        delay: index * 0.1,
        scrollTrigger: {
          trigger: card,
          start: 'top 85%',
          once: true
        }
      }
    )
  })
  
  // Animate testimonials
  gsap.utils.toArray('.testimonial').forEach((item, index) => {
    gsap.fromTo(item, 
      { opacity: 0, scale: 0.95 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.4,
        delay: index * 0.1,
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
.resource-card:hover {
  transform: translateY(-4px);
  transition: transform 0.25s ease-out;
}

blockquote {
  position: relative;
  padding-left: 2rem;
}

blockquote::before {
  content: '"';
  position: absolute;
  left: 0;
  top: -0.5rem;
  font-family: 'UnifrakturMaguntia', serif;
  font-size: 3rem;
  color: #87a08a;
  opacity: 0.3;
}
</style>
