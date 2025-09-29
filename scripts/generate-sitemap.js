import { writeFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const BASE_URL = 'https://gadm21.github.io'

const routes = [
  { path: '/', priority: 1.0, changefreq: 'weekly' },
  { path: '/research', priority: 0.9, changefreq: 'monthly' },
  { path: '/publications', priority: 0.9, changefreq: 'monthly' },
  { path: '/projects', priority: 0.8, changefreq: 'monthly' },
  { path: '/teaching', priority: 0.8, changefreq: 'monthly' },
  { path: '/blog', priority: 0.8, changefreq: 'weekly' },
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
    <lastmod>${today}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`).join('\n')}
</urlset>`
  
  const outputPath = join(__dirname, '..', 'public', 'sitemap.xml')
  writeFileSync(outputPath, sitemap)
  console.log('✅ Sitemap generated successfully!')
}

generateSitemap()
