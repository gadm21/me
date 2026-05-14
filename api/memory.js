import fs from 'fs'
import path from 'path'

const MEMORY_FILE_PATH = path.join(process.cwd(), 'public', 'data', 'memory.json')

export default async function handler(req, res) {
  // Only allow POST method
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' })
  }

  try {
    const { content } = req.body

    // Validate content
    if (!content || typeof content !== 'string' || content.trim().length === 0) {
      return res.status(400).json({ success: false, error: 'Content is required' })
    }

    // Read existing memory file
    let memoryData = { entries: [], last_updated: null }
    try {
      const fileContent = fs.readFileSync(MEMORY_FILE_PATH, 'utf8')
      memoryData = JSON.parse(fileContent)
    } catch (error) {
      console.error('Error reading memory file:', error)
      // If file doesn't exist or is corrupted, start with empty memory
    }

    // Add new entry
    const newEntry = {
      content: content.trim(),
      timestamp: new Date().toISOString()
    }

    memoryData.entries.push(newEntry)
    memoryData.last_updated = new Date().toISOString()

    // Keep only last 100 entries to prevent file from growing too large
    if (memoryData.entries.length > 100) {
      memoryData.entries = memoryData.entries.slice(-100)
    }

    // Write updated memory file
    fs.writeFileSync(MEMORY_FILE_PATH, JSON.stringify(memoryData, null, 2), 'utf8')

    return res.status(200).json({ 
      success: true, 
      message: 'Memory saved successfully',
      entry: newEntry 
    })
  } catch (error) {
    console.error('Memory API error:', error)
    return res.status(500).json({ 
      success: false, 
      error: 'Failed to save memory' 
    })
  }
}
