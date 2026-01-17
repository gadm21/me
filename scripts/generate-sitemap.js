import { writeFileSync, readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const BASE_URL = 'https://gadgad.me'

const normalizeLastMod = (value, fallback) => {
  if (!value) return fallback

  const str = String(value).trim()

  if (/^\d{4}-\d{2}-\d{2}$/.test(str)) return str

  if (/^\d{4}$/.test(str)) return `${str}-12-31`

  const rangeMatch = str.match(/(\d{4})\s*-\s*(\d{4})/)
  if (rangeMatch) return `${rangeMatch[2]}-12-31`

  const datePrefixMatch = str.match(/^(\d{4}-\d{2}-\d{2})/)
  if (datePrefixMatch) return datePrefixMatch[1]

  return fallback
}

const extractEndYear = (value) => {
  if (value === null || value === undefined) return null
  const str = String(value).trim()
  if (/^\d{4}$/.test(str)) return Number(str)
  const rangeMatch = str.match(/(\d{4})\s*-\s*(\d{4})/)
  if (rangeMatch) return Number(rangeMatch[2])
  return null
}

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
  const publicationYears = pubs.map(pub => extractEndYear(pub.year)).filter(Boolean)
  const latestPublicationYear = publicationYears.length ? Math.max(...publicationYears) : null
  publications = [{
    path: `/publications`,
    priority: 0.8,
    changefreq: 'monthly',
    lastmod: latestPublicationYear ? `${latestPublicationYear}-12-31` : null
  }]
  
  // Read projects
  const projData = readFileSync(join(__dirname, '..', 'src', 'data', 'projects.json'), 'utf8')
  const projs = JSON.parse(projData)
  const projectYears = projs.map(project => extractEndYear(project.year)).filter(Boolean)
  const latestProjectYear = projectYears.length ? Math.max(...projectYears) : null
  projects = [{
    path: `/projects`,
    priority: 0.8,
    changefreq: 'monthly',
    lastmod: latestProjectYear ? `${latestProjectYear}-12-31` : null
  }]
  
} catch (error) {
  console.log('⚠️  Could not read data files:', error.message)
}

const routes = [
  { path: '/', priority: 1.0, changefreq: 'weekly' },
  { path: '/research', priority: 0.9, changefreq: 'monthly' },
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
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${routes.map(route => `  <url>
    <loc>${BASE_URL}${route.path}</loc>
    <lastmod>${normalizeLastMod(route.lastmod, today)}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`).join('\n')}
</urlset>`
  
  const outputPath = join(__dirname, '..', 'public', 'sitemap.xml')
  writeFileSync(outputPath, sitemap)
  console.log('✅ Sitemap generated successfully!')
}

generateSitemap()
