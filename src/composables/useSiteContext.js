/**
 * Composable to gather site content for chatbot context
 * Fetches and formats all site data as a text summary for the AI
 */

const BASE_URL = '/data'

async function fetchJSON(path) {
  try {
    const response = await fetch(`${BASE_URL}${path}`)
    if (!response.ok) return null
    return await response.json()
  } catch (error) {
    console.error(`Failed to fetch ${path}:`, error)
    return null
  }
}

/**
 * Gathers all site content and returns a formatted text summary
 * @returns {Promise<Object>} Site context object with website_summary string
 */
export async function getSiteContext() {
  const [profile, publications, awards, education, experience, projects] = await Promise.all([
    fetchJSON('/cv/profile.json'),
    fetchJSON('/publications.json'),
    fetchJSON('/cv/awards.json'),
    fetchJSON('/cv/education.json'),
    fetchJSON('/cv/experience.json'),
    fetchJSON('/projects.json')
  ])

  // Build text summary
  let summary = []

  // Profile section
  if (profile) {
    summary.push(`ABOUT: ${profile.name} is a ${profile.title} at ${profile.institution}, located in ${profile.location}. ${profile.bio?.short || ''}`)
    if (profile.stats) {
      summary.push(`STATS: ${profile.stats.publications} publications, ${profile.stats.citations} total citations, h-index of ${profile.stats.hIndex}, ${profile.stats.yearsExperience} years of experience.`)
    }
    summary.push(`CONTACT: Email: ${profile.email}, GitHub: ${profile.github}, Google Scholar: ${profile.scholar}, LinkedIn: ${profile.linkedin}`)
  }

  // Education section
  if (education?.length) {
    const eduList = education.map(e => `${e.degree} from ${e.institution} (${e.startDate}-${e.endDate})${e.thesis ? `, thesis: "${e.thesis}"` : ''}`).join('; ')
    summary.push(`EDUCATION: ${eduList}`)
  }

  // Publications section
  if (publications?.length) {
    const totalCitations = publications.reduce((sum, p) => sum + (p.citations || 0), 0)
    const pubList = publications.map(p => `"${p.title}" (${p.year}, ${p.venue}, ${p.citations || 0} citations)`).join('; ')
    summary.push(`PUBLICATIONS (${publications.length} total, ${totalCitations} citations): ${pubList}`)
  }

  // Awards section
  if (awards?.length) {
    const awardList = awards.map(a => `${a.title} from ${a.organization} (${a.year})${a.amount ? ` - ${a.amount}` : ''}`).join('; ')
    summary.push(`AWARDS & CERTIFICATIONS (${awards.length}): ${awardList}`)
  }

  // Experience section
  if (experience?.length) {
    const expList = experience.map(e => `${e.title} at ${e.company} (${e.startDate}-${e.endDate}): ${e.description}`).join('; ')
    summary.push(`EXPERIENCE: ${expList}`)
  }

  // Projects section
  if (projects?.length) {
    const projList = projects.map(p => `${p.title} (${p.year}): ${p.description}`).join('; ')
    summary.push(`PROJECTS (${projects.length}): ${projList}`)
  }

  // Research topics
  if (publications?.length) {
    const topics = [...new Set(publications.flatMap(p => p.topics || []))]
    if (topics.length) {
      summary.push(`RESEARCH TOPICS: ${topics.join(', ')}`)
    }
  }

  return {
    website_summary: summary.join('\n\n')
  }
}

export function useSiteContext() {
  return {
    getSiteContext
  }
}
