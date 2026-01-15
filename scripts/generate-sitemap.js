import { writeFileSync, readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const BASE_URL = 'https://gadgad.me'

// Read blog posts to include in sitemap
let blogPosts = []
let publications = []
let projects = []

try {
  // Read blog posts
  const blogData = readFileSync(join(__dirname, '..', 'src', 'data', 'blog.json'), 'utf8')
  const posts = JSON.parse(blogData)
  blogPosts = posts.filter(post => post.slug && post.slug.trim() !== '').map(post => ({
    path: `/blog/${post.slug}`,
    priority: 0.9,
    changefreq: 'weekly',
    lastmod: post.date
  }))
  
  // Read publications
  const pubData = readFileSync(join(__dirname, '..', 'src', 'data', 'publications.json'), 'utf8')
  const pubs = JSON.parse(pubData)
  publications = pubs.map(pub => ({
    path: `/publications#${pub.id}`,
    priority: 0.8,
    changefreq: 'monthly',
    lastmod: `${pub.year}-12-31`
  }))
  
  // Read projects
  const projData = readFileSync(join(__dirname, '..', 'src', 'data', 'projects.json'), 'utf8')
  const projs = JSON.parse(projData)
  projects = projs.map(project => ({
    path: `/projects#${project.id}`,
    priority: 0.8,
    changefreq: 'monthly',
    lastmod: `${project.year}-12-31`
  }))
  
} catch (error) {
  console.log('⚠️  Could not read data files:', error.message)
}

const routes = [
  { path: '/', priority: 1.0, changefreq: 'weekly' },
  { path: '/research', priority: 0.9, changefreq: 'monthly' },
  { path: '/publications', priority: 0.9, changefreq: 'monthly' },
  { path: '/projects', priority: 0.8, changefreq: 'monthly' },
  { path: '/teaching', priority: 0.8, changefreq: 'monthly' },
  { path: '/blog', priority: 0.8, changefreq: 'weekly' },
  ...blogPosts,
  ...publications,
  ...projects,
  { path: '/books', priority: 0.7, changefreq: 'monthly' },
  { path: '/cv', priority: 0.8, changefreq: 'monthly' },
  { path: '/stats', priority: 0.7, changefreq: 'weekly' },
  { path: '/contact', priority: 0.7, changefreq: 'yearly' }
]

const generateSitemap = () => {
  const today = new Date().toISOString().split('T')[0]
  
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map(route => `  <url>
    <loc>${BASE_URL}${route.path}</loc>
    <lastmod>${route.lastmod || today}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`).join('\n')}
</urlset>`
  
  const outputPath = join(__dirname, '..', 'public', 'sitemap.xml')
  writeFileSync(outputPath, sitemap)
  console.log('✅ Sitemap generated successfully!')
}

generateSitemap()
