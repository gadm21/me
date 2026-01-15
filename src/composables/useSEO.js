import { onMounted } from 'vue'

export function useSEO(options = {}) {
  const updateMeta = () => {
    const {
      title = 'Gad Mohamed Gad - Ph.D. Student in Computer Science',
      description = 'Exploring the frontiers of Wi-Fi Sensing, Federated Learning, and Differential Privacy',
      keywords = 'Gad Mohamed Gad, Computer Science, PhD, Wi-Fi Sensing, Federated Learning, Differential Privacy',
      image = '/assets/img/me.jpg',
      url = window.location.href
    } = options
    
    // Update document title
    document.title = title
    
    // Update meta tags
    const metaTags = {
      'description': description,
      'keywords': keywords,
      'og:title': title,
      'og:description': description,
      'og:image': image,
      'og:url': url,
      'twitter:title': title,
      'twitter:description': description,
      'twitter:image': image
    }
    
    Object.entries(metaTags).forEach(([property, content]) => {
      let meta = document.querySelector(`meta[property="${property}"], meta[name="${property}"]`)
      if (!meta) {
        meta = document.createElement('meta')
        if (property.startsWith('og:') || property.startsWith('twitter:')) {
          meta.setAttribute('property', property)
        } else {
          meta.setAttribute('name', property)
        }
        document.head.appendChild(meta)
      }
      meta.setAttribute('content', content)
    })
    
    // Add JSON-LD structured data
    const structuredData = {
      '@context': 'https://schema.org',
      '@type': 'Person',
      'name': 'Gad Mohamed',
      'jobTitle': 'Ph.D. Student',
      'affiliation': {
        '@type': 'Organization',
        'name': 'Western University'
      },
      'url': 'https://gadgad.me',
      'sameAs': [
        'https://github.com/gadm21',
        'https://scholar.google.com/citations?user=bZRYJuAAAAAJ&hl=en',
        'https://www.linkedin.com/in/gadm/'
      ],
      'knowsAbout': [
        'Wi-Fi Sensing',
        'Federated Learning',
        'Differential Privacy',
        'Machine Learning',
        'Computer Networks'
      ]
    }
    
    let script = document.querySelector('script[type="application/ld+json"]')
    if (!script) {
      script = document.createElement('script')
      script.type = 'application/ld+json'
      document.head.appendChild(script)
    }
    script.textContent = JSON.stringify(structuredData)
  }
  
  onMounted(updateMeta)
  
  return { updateMeta }
}
