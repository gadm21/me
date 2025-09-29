import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import { useAnalytics } from '../composables/useAnalytics'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/research',
    name: 'Research',
    component: () => import('../views/Research.vue')
  },
  {
    path: '/publications',
    name: 'Publications',
    component: () => import('../views/Publications.vue')
  },
  {
    path: '/teaching',
    name: 'Teaching',
    component: () => import('../views/Teaching.vue')
  },
  {
    path: '/awards',
    name: 'Awards',
    component: () => import('../views/Awards.vue')
  },
  {
    path: '/contact',
    name: 'Contact',
    component: () => import('../views/Contact.vue')
  },
  {
    path: '/blog',
    name: 'Blog',
    component: () => import('../views/Blog.vue')
  },
  {
    path: '/blog/:slug',
    name: 'BlogPost',
    component: () => import('../views/BlogPost.vue')
  },
  {
    path: '/stats',
    name: 'Stats',
    component: () => import('../views/Stats.vue')
  },
  {
    path: '/books',
    name: 'Books',
    component: () => import('../views/Books.vue')
  },
  {
    path: '/projects',
    name: 'Projects',
    component: () => import('../views/Projects.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('../views/NotFound.vue')
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

// Track page views
router.afterEach((to) => {
  const { trackPageView } = useAnalytics()
  trackPageView(to.path)
})

export default router
