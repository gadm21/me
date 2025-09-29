<template>
  <div class="teaching-page py-12">
    <div class="prose-container">
      <h1 class="gothic-title text-sage text-center mb-8">Teaching</h1>
      <p class="serene-text text-xl text-center mb-12">
        Guiding the next generation through the landscapes of computer science
      </p>
    </div>
    
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
    
    <!-- Course History -->
    <section class="mb-16">
      <div class="max-w-6xl mx-auto px-6">
        <h2 class="gothic-subtitle text-sage mb-8 text-center">Teaching Experience</h2>
        <div class="grid md:grid-cols-2 gap-8">
          <!-- Lumiere Volunteering -->
          <div class="course-card">
            <div class="card-calm h-full">
              <div class="flex justify-between items-start mb-4">
                <div>
                  <h3 class="font-serif text-xl text-gray-300">Lumiere Education</h3>
                  <p class="text-sage-light text-lg">Research Mentor</p>
                </div>
                <span class="venue-badge">Volunteer</span>
              </div>
              
              <div class="space-y-3 mb-4">
                <div class="flex items-center gap-2 text-sm text-gray-400">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  2023 - Present
                </div>
                <div class="flex items-center gap-2 text-sm text-gray-400">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Remote (Global)
                </div>
              </div>
              
              <p class="text-gray-500 text-sm mb-4">
                Mentoring high school students from around the world on research projects in computer science and machine learning. Guiding students through the research process from ideation to paper writing and presentation.
              </p>
            </div>
          </div>
          
          <!-- Past Courses -->
          <div 
            v-for="course in pastCourses" 
            :key="course.id"
            class="course-card"
          >
            <div class="card-calm h-full">
              <div class="flex justify-between items-start mb-4">
                <div>
                  <h3 class="font-serif text-xl text-gray-300">{{ course.code }}</h3>
                  <p class="text-sage-light text-lg">{{ course.name }}</p>
                </div>
                <span class="venue-badge">{{ course.role }}</span>
              </div>
              
              <div class="space-y-3 mb-4">
                <div class="flex items-center gap-2 text-sm text-gray-400">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {{ course.term }}
                </div>
                <div class="flex items-center gap-2 text-sm text-gray-400">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {{ course.location }}
                </div>
                <div v-if="course.rating" class="flex items-center gap-2 text-sm text-gray-400">
                  <span>Rating: {{ course.rating }}/5</span>
                </div>
              </div>
              
              <p v-if="course.description" class="text-gray-500 text-sm mb-4">{{ course.description }}</p>
              
              <div class="flex gap-3">
                <a 
                  v-if="course.feedback" 
                  :href="course.feedback"
                  class="link-gothic text-sm"
                >
                  Student Feedback →
                </a>
              </div>
            </div>
          </div>
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

const pastCourses = ref([
  {
    id: 1,
    code: 'CS 2211',
    name: 'C and Linux',
    role: 'Instructor',
    term: 'Fall 2023',
    location: 'Western University',
    rating: 4.8,
    description: 'Introduction to systems programming using C language and Linux operating system. Covers memory management, file I/O, process control, and system calls.',
    feedback: null
  },
  {
    id: 2,
    code: 'CS 1027',
    name: 'C and Linux',
    role: 'Instructor',
    term: 'Winter 2023',
    location: 'Western University',
    rating: 4.7,
    description: 'Fundamentals of computer science using C programming language and Linux environment. Introduces data structures, algorithms, and software development practices.',
    feedback: null
  },
  {
    id: 3,
    code: 'CS 3357',
    name: 'Computer Networks',
    role: 'Teaching Assistant',
    term: 'Fall 2022',
    location: 'Western University',
    rating: 4.9,
    description: 'Comprehensive study of computer networks including TCP/IP, routing protocols, network security, and modern networking technologies.',
    feedback: null
  },
  {
    id: 4,
    code: 'CS 1026',
    name: 'Python',
    role: 'Teaching Assistant',
    term: 'Winter 2022',
    location: 'Western University',
    rating: 4.6,
    description: 'Introduction to computer science concepts using Python programming language. Covers basic programming constructs, data structures, and problem-solving techniques.',
    feedback: null
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
