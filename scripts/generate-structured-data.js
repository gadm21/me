import { writeFileSync, readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const BASE_URL = 'https://gadgad.me'

function generateStructuredData() {
  console.log('🔍 Generating comprehensive structured data...')
  
  let blogPosts = []
  let publications = []
  let projects = []
  
  try {
    // Read blog posts
    const blogData = readFileSync(join(__dirname, '..', 'src', 'data', 'blog.json'), 'utf8')
    blogPosts = JSON.parse(blogData).filter(post => post.slug && post.slug.trim() !== '')
    
    // Read publications
    const pubData = readFileSync(join(__dirname, '..', 'src', 'data', 'publications.json'), 'utf8')
    publications = JSON.parse(pubData)
    
    // Read projects
    const projData = readFileSync(join(__dirname, '..', 'src', 'data', 'projects.json'), 'utf8')
    projects = JSON.parse(projData)
    
  } catch (error) {
    console.log('⚠️  Could not read data files:', error.message)
    return
  }

  // Generate comprehensive structured data
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      // Person schema
      {
        "@type": "Person",
        "@id": `${BASE_URL}#person`,
        "name": "Gad Mohamed",
        "url": BASE_URL,
        "jobTitle": "Ph.D. Student in Computer Science",
        "description": "Ph.D. Student specializing in Wi-Fi Sensing, Federated Learning, and Differential Privacy",
        "affiliation": {
          "@type": "Organization",
          "name": "Western University"
        },
        "sameAs": [
          "https://github.com/gadm21",
          "https://scholar.google.com/citations?user=bZRYJuAAAAAJ&hl=en",
          "https://www.linkedin.com/in/gadm/"
        ],
        "knowsAbout": [
          "Wi-Fi Sensing",
          "Federated Learning", 
          "Differential Privacy",
          "Machine Learning",
          "Computer Vision",
          "Deep Learning",
          "IoT",
          "Human Activity Recognition"
        ]
      },
      
      // Website schema
      {
        "@type": "WebSite",
        "@id": `${BASE_URL}#website`,
        "url": BASE_URL,
        "name": "Gad Mohamed - Ph.D. Student in Computer Science",
        "description": "Exploring the frontiers of Wi-Fi Sensing, Federated Learning, and Differential Privacy",
        "publisher": {
          "@id": `${BASE_URL}#person`
        },
        "inLanguage": "en-US"
      },
      
      // Blog posts
      ...blogPosts.map(post => ({
        "@type": "BlogPosting",
        "@id": `${BASE_URL}/blog/${post.slug}#blogpost`,
        "url": `${BASE_URL}/blog/${post.slug}`,
        "name": post.title,
        "headline": post.title,
        "description": post.excerpt,
        "datePublished": post.date,
        "dateModified": post.date,
        "author": {
          "@id": `${BASE_URL}#person`
        },
        "publisher": {
          "@id": `${BASE_URL}#person`
        },
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": `${BASE_URL}/blog/${post.slug}`
        },
        "image": post.image ? `${BASE_URL}${post.image}` : `${BASE_URL}/assets/img/me.jpg`,
        "inLanguage": "en-US",
        "isPartOf": {
          "@type": "Blog",
          "@id": `${BASE_URL}/blog#blog`
        }
      })),
      
      // Publications
      ...publications.map(pub => ({
        "@type": pub.type === 'preprint' ? "ScholarlyArticle" : "ScholarlyArticle",
        "@id": `${BASE_URL}/publications#${pub.id}`,
        "name": pub.title,
        "headline": pub.title,
        "description": pub.abstract,
        "datePublished": `${pub.year}-01-01`,
        "author": pub.authors.map(author => ({
          "@type": "Person",
          "name": author
        })),
        "publisher": {
          "@type": "Organization",
          "name": pub.venue
        },
        "isPartOf": {
          "@type": "PublicationIssue",
          "name": pub.venue
        },
        "inLanguage": "en-US",
        "about": pub.topics.map(topic => ({
          "@type": "Thing",
          "name": topic
        })),
        "url": pub.scholarLink
      })),
      
      // Projects
      ...projects.map(project => ({
        "@type": "Project",
        "@id": `${BASE_URL}/projects#${project.id}`,
        "name": project.title,
        "description": project.description,
        "startDate": `${project.year}-01-01`,
        "status": project.status === "completed" ? "Completed" : "InProgress",
        "author": {
          "@id": `${BASE_URL}#person`
        },
        "about": project.technologies.map(tech => ({
          "@type": "Thing", 
          "name": tech
        })),
        "url": `${BASE_URL}/projects`,
        "category": project.category
      }))
    ]
  }

  // Write structured data to file
  const outputPath = join(__dirname, '..', 'public', 'structured-data.json')
  writeFileSync(outputPath, JSON.stringify(structuredData, null, 2))
  console.log(`✅ Generated structured data with ${blogPosts.length + publications.length + projects.length} items!`)
}

generateStructuredData()
