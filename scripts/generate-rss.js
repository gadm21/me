import { writeFileSync, readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const BASE_URL = 'https://gadgad.me'

function generateRSS() {
  console.log('📡 Generating RSS feed...')
  
  let blogPosts = []
  try {
    const blogData = readFileSync(join(__dirname, '..', 'src', 'data', 'blog.json'), 'utf8')
    const posts = JSON.parse(blogData)
    blogPosts = posts.filter(post => post.slug && post.slug.trim() !== '')
  } catch (error) {
    console.log('⚠️  Could not read blog data:', error.message)
    return
  }

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Gad Gad - Blog</title>
    <description>Ph.D. Student in Computer Science specializing in Wi-Fi Sensing, Federated Learning, and Differential Privacy</description>
    <link>${BASE_URL}/</link>
    <atom:link href="${BASE_URL}/rss.xml" rel="self" type="application/rss+xml"/>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <generator>Gad Gad Blog Generator</generator>
    <managingEditor>gad@gadgad.me (Gad Gad)</managingEditor>
    <webMaster>gad@gadgad.me (Gad Gad)</webMaster>
${blogPosts.map(post => `    <item>
      <title><![CDATA[${post.title}]]></title>
      <description><![CDATA[${post.excerpt || ''}]]></description>
      <link>${BASE_URL}/blog/${post.slug}</link>
      <guid>${BASE_URL}/blog/${post.slug}</guid>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <category><![CDATA[${post.category}]]></category>
    </item>`).join('\n')}
  </channel>
</rss>`

  const outputPath = join(__dirname, '..', 'public', 'rss.xml')
  writeFileSync(outputPath, rss)
  console.log(`✅ RSS feed generated with ${blogPosts.length} posts!`)
}

generateRSS()
