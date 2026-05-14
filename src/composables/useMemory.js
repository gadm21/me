/**
 * Composable to manage long-term memory for the chatbot
 * Handles reading and writing memory entries
 */

const MEMORY_URL = '/data/memory.json'
const API_MEMORY_URL = '/api/memory'

/**
 * Load memory from the public data file
 * @returns {Promise<Object>} Memory object with entries array
 */
export async function loadMemory() {
  try {
    const response = await fetch(MEMORY_URL)
    if (!response.ok) return { entries: [], last_updated: null }
    return await response.json()
  } catch (error) {
    console.error('Failed to load memory:', error)
    return { entries: [], last_updated: null }
  }
}

/**
 * Save a new entry to memory via API
 * @param {string} content - The content to save to memory
 * @returns {Promise<boolean>} Success status
 */
export async function saveToMemory(content) {
  try {
    const response = await fetch(API_MEMORY_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ content })
    })
    
    if (!response.ok) {
      throw new Error('Failed to save to memory')
    }
    
    const data = await response.json()
    return data.success || false
  } catch (error) {
    console.error('Failed to save to memory:', error)
    return false
  }
}

/**
 * Get memory as a formatted string for AI context
 * @returns {Promise<string>} Formatted memory string
 */
export async function getMemoryContext() {
  const memory = await loadMemory()
  if (!memory.entries || memory.entries.length === 0) {
    return 'No memory entries yet.'
  }
  
  const formatted = memory.entries.map((entry, index) => 
    `${index + 1}. ${entry.content} (saved: ${new Date(entry.timestamp).toLocaleDateString()})`
  ).join('\n')
  
  return `MEMORY ENTRIES:\n${formatted}`
}

/**
 * Check if a query is a memory command
 * @param {string} query - User query
 * @returns {Object} Object with isMemoryCommand flag and extracted content
 */
export function parseMemoryCommand(query) {
  const memoryPrefixes = [
    'save this to memory:',
    'save to memory:',
    'remember:',
    'remember this:',
    'store in memory:'
  ]
  
  const lowerQuery = query.toLowerCase().trim()
  
  for (const prefix of memoryPrefixes) {
    if (lowerQuery.startsWith(prefix)) {
      const content = query.slice(prefix.length).trim()
      return { isMemoryCommand: true, content }
    }
  }
  
  return { isMemoryCommand: false, content: null }
}

export function useMemory() {
  return {
    loadMemory,
    saveToMemory,
    getMemoryContext,
    parseMemoryCommand
  }
}
