import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BLOG_POSTS_DIR = path.join(__dirname, '../src/data/blog-posts');
const OUTPUT_FILE = path.join(__dirname, '../src/data/blog.json');
const EXISTING_BLOG = path.join(__dirname, '../src/data/blog.json');

function buildBlog() {
  console.log('📝 Building blog posts...');
  
  let posts = [];
  let nextId = 1;
  
  // Load existing blog.json if it exists (for backward compatibility)
  if (fs.existsSync(EXISTING_BLOG)) {
    try {
      const existing = JSON.parse(fs.readFileSync(EXISTING_BLOG, 'utf-8'));
      if (Array.isArray(existing)) {
        posts = existing;
        nextId = Math.max(...posts.map(p => p.id || 0)) + 1;
      }
    } catch (e) {
      console.log('⚠️  Could not parse existing blog.json, starting fresh');
    }
  }
  
  // Load CMS posts from blog-posts directory
  if (fs.existsSync(BLOG_POSTS_DIR)) {
    const files = fs.readdirSync(BLOG_POSTS_DIR).filter(f => f.endsWith('.json'));
    
    for (const file of files) {
      const filePath = path.join(BLOG_POSTS_DIR, file);
      try {
        const post = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
        
        // Check if post with same slug already exists
        const existingIndex = posts.findIndex(p => p.slug === post.slug);
        
        if (existingIndex >= 0) {
          // Update existing post
          posts[existingIndex] = { ...posts[existingIndex], ...post };
          console.log(`  📝 Updated: ${post.title}`);
        } else {
          // Add new post with ID
          posts.push({ id: nextId++, ...post });
          console.log(`  ✨ Added: ${post.title}`);
        }
      } catch (e) {
        console.error(`  ❌ Error parsing ${file}:`, e.message);
      }
    }
  }
  
  // Sort by date (newest first)
  posts.sort((a, b) => new Date(b.date) - new Date(a.date));
  
  // Write output
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(posts, null, 2) + '\n');
  console.log(`✅ Built ${posts.length} blog posts`);
}

buildBlog();
