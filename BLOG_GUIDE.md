# Blog System Guide

This guide explains how to use and extend the blog system in your portfolio.

## Current Blog Structure

The blog system consists of:

1. **Blog listing page** (`/blog`) - Shows all articles with filtering
2. **Individual blog posts** (`/blog/:slug`) - Full article view
3. **Data structure** (`src/data/blog.json`) - Article content and metadata
4. **Components**:
   - `src/views/Blog.vue` - Main blog listing
   - `src/views/BlogPost.vue` - Individual article display

## Adding New Blog Posts

To add a new blog post, edit `src/data/blog.json` and add a new object with this structure:

```json
{
  "id": 6,
  "title": "Your Article Title",
  "slug": "your-article-slug",
  "category": "Research|Technology|Teaching|Academia",
  "date": "2024-03-20",
  "readTime": 8,
  "excerpt": "Brief description for the blog listing page",
  "image": "/assets/img/your-image.jpg",
  "featured": false,
  "content": "# Your Article Title\n\nYour full article content in Markdown format..."
}
```

### Field Descriptions:

- **id**: Unique identifier (increment from last post)
- **title**: Article title displayed on both listing and detail pages
- **slug**: URL-friendly version for the article URL (`/blog/your-article-slug`)
- **category**: Used for filtering (Research, Technology, Teaching, Academia)
- **date**: Publication date in YYYY-MM-DD format
- **readTime**: Estimated reading time in minutes
- **excerpt**: Short description shown on the blog listing
- **image**: Optional header image path
- **featured**: Set to `true` to make it the featured post (only one should be featured)
- **content**: Full article content in Markdown format

## Markdown Support

The blog supports full Markdown syntax including:

- Headers (`# ## ###`)
- **Bold** and *italic* text
- Lists (bulleted and numbered)
- Code blocks and `inline code`
- Links and images
- Blockquotes

## Categories

Current categories:
- **Research**: Academic research, papers, methodologies
- **Technology**: Technical tutorials, tools, frameworks
- **Teaching**: Educational content, pedagogy, course design
- **Academia**: PhD journey, academic life, career advice

You can add new categories by simply using them in new posts - the system automatically detects and displays all categories.

## Featured Posts

Only one post should have `"featured": true`. Featured posts appear in a special section at the top of the blog page.

## Images

Store blog images in `/public/assets/img/` and reference them as `/assets/img/filename.jpg`.

## Testing Your Changes

1. Add your new post to `src/data/blog.json`
2. Run `npm run dev` to start the development server
3. Navigate to `http://localhost:5175/blog` to see your new post
4. Click "Read more" to test the individual article view

## Deployment

After adding new posts:
1. Commit your changes to git
2. Push to your repository
3. Your hosting platform will automatically rebuild and deploy

## Future Enhancements

You can extend the blog system by:

1. **Adding tags**: Extend the data structure to include tags for more granular filtering
2. **Search functionality**: Add a search bar to find articles by title or content
3. **Comments**: Integrate a commenting system like Disqus
4. **RSS feed**: Generate an RSS feed for subscribers
5. **Related posts**: Show related articles at the end of each post
6. **Reading progress**: Add a reading progress indicator
7. **Social sharing**: Enhance sharing options with more platforms

## File Structure

```
src/
├── data/
│   └── blog.json          # Blog post data
├── views/
│   ├── Blog.vue           # Blog listing page
│   └── BlogPost.vue       # Individual post page
└── router/
    └── index.js           # Routing configuration
```

## Troubleshooting

**Problem**: "Article Not Found" error
- **Solution**: Check that the slug in the URL matches the slug in your blog.json file

**Problem**: Markdown not rendering properly
- **Solution**: Ensure you're using proper Markdown syntax and escaping special characters

**Problem**: Images not loading
- **Solution**: Verify image paths start with `/assets/img/` and files exist in `/public/assets/img/`

**Problem**: New category not showing in filter
- **Solution**: The system auto-detects categories, so ensure you've saved the file and refreshed the page
