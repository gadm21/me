import { onMounted } from 'vue'

export function useSEO(options = {}) {
  const upsertMeta = ({ key, value, isProperty }) => {
    if (!value) return

    const selector = `meta[name="${key}"], meta[property="${key}"]`

    let meta = document.querySelector(selector)
    if (!meta) {
      meta = document.createElement('meta')
      if (isProperty) {
        meta.setAttribute('property', key)
      } else {
        meta.setAttribute('name', key)
      }
      document.head.appendChild(meta)
    }
    meta.setAttribute('content', value)
  }

  const upsertLink = ({ rel, href }) => {
    if (!href) return
    let link = document.querySelector(`link[rel="${rel}"]`)
    if (!link) {
      link = document.createElement('link')
      link.setAttribute('rel', rel)
      document.head.appendChild(link)
    }
    link.setAttribute('href', href)
  }

  const normalizeUrl = (url) => {
    if (!url) return ''
    try {
      return new URL(url, window.location.origin).toString()
    } catch {
      return url
    }
  }

  const updateMeta = (overrideOptions = null) => {
    const {
      title = 'Gad Gad Gad - Ph.D. Student in Computer Science',
      description = 'Exploring the frontiers of Wi-Fi Sensing, Federated Learning, and Differential Privacy',
      keywords = 'Gad Gad Gad, Computer Science, PhD, Wi-Fi Sensing, Federated Learning, Differential Privacy',
      image = '/assets/img/me.jpg',
      url = window.location.href,
      canonical = null,
      ogType = 'website',
      twitterCard = 'summary_large_image',
      jsonLd = null
    } = overrideOptions || options

    const absoluteUrl = normalizeUrl(url)
    const absoluteImage = normalizeUrl(image)
    const canonicalUrl = normalizeUrl(canonical || absoluteUrl)
    
    // Update document title
    document.title = title
    
    // Update basic tags
    upsertMeta({ key: 'description', value: description, isProperty: false })
    upsertMeta({ key: 'keywords', value: keywords, isProperty: false })

    // Canonical
    upsertLink({ rel: 'canonical', href: canonicalUrl })

    // Open Graph
    upsertMeta({ key: 'og:type', value: ogType, isProperty: true })
    upsertMeta({ key: 'og:title', value: title, isProperty: true })
    upsertMeta({ key: 'og:description', value: description, isProperty: true })
    upsertMeta({ key: 'og:url', value: canonicalUrl, isProperty: true })
    upsertMeta({ key: 'og:image', value: absoluteImage, isProperty: true })

    // Twitter
    upsertMeta({ key: 'twitter:card', value: twitterCard, isProperty: true })
    upsertMeta({ key: 'twitter:title', value: title, isProperty: true })
    upsertMeta({ key: 'twitter:description', value: description, isProperty: true })
    upsertMeta({ key: 'twitter:url', value: canonicalUrl, isProperty: true })
    upsertMeta({ key: 'twitter:image', value: absoluteImage, isProperty: true })

    // Add per-page JSON-LD structured data (do not overwrite existing global JSON-LD scripts)
    const existingSeoScript = document.getElementById('seo-jsonld')
    if (!jsonLd) {
      if (existingSeoScript) existingSeoScript.remove()
      return
    }

    const structuredDataText = JSON.stringify(jsonLd)
    let seoScript = existingSeoScript
    if (!seoScript) {
      seoScript = document.createElement('script')
      seoScript.id = 'seo-jsonld'
      seoScript.type = 'application/ld+json'
      document.head.appendChild(seoScript)
    }
    seoScript.textContent = structuredDataText
  }
  
  onMounted(() => updateMeta())
  
  return { updateMeta }
}
