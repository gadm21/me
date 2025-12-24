/**
 * Composable to gather site content for chatbot context
 * Fetches and formats all site data (profile, publications, awards, etc.)
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
 * Gathers all site content and returns a formatted context object
 * @returns {Promise<Object>} Site context for the chatbot
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

  // Format publications summary
  const publicationsSummary = publications?.map(p => ({
    title: p.title,
    authors: p.authors?.join(', '),
    venue: p.venue,
    year: p.year,
    type: p.type,
    topics: p.topics,
    citations: p.citations,
    abstract: p.abstract
  })) || []

  // Format awards summary
  const awardsSummary = awards?.map(a => ({
    title: a.title,
    organization: a.organization,
    year: a.year,
    amount: a.amount,
    description: a.description
  })) || []

  // Format education summary
  const educationSummary = education?.map(e => ({
    degree: e.degree,
    institution: e.institution,
    location: e.location,
    period: `${e.startDate} - ${e.endDate}`,
    thesis: e.thesis,
    advisor: e.advisor
  })) || []

  // Format experience summary
  const experienceSummary = experience?.map(e => ({
    title: e.title,
    company: e.company,
    location: e.location,
    period: `${e.startDate} - ${e.endDate}`,
    description: e.description,
    achievements: e.achievements,
    technologies: e.technologies
  })) || []

  // Format projects summary
  const projectsSummary = projects?.map(p => ({
    title: p.title,
    category: p.category,
    year: p.year,
    description: p.description,
    technologies: p.technologies,
    status: p.status
  })) || []

  return {
    profile: profile ? {
      name: profile.name,
      title: profile.title,
      institution: profile.institution,
      location: profile.location,
      bio: profile.bio,
      stats: profile.stats,
      email: profile.email,
      github: profile.github,
      scholar: profile.scholar,
      linkedin: profile.linkedin
    } : null,
    publications: publicationsSummary,
    awards: awardsSummary,
    education: educationSummary,
    experience: experienceSummary,
    projects: projectsSummary,
    summary: {
      totalPublications: publicationsSummary.length,
      totalCitations: publicationsSummary.reduce((sum, p) => sum + (p.citations || 0), 0),
      totalAwards: awardsSummary.length,
      researchTopics: [...new Set(publicationsSummary.flatMap(p => p.topics || []))]
    }
  }
}

export function useSiteContext() {
  return {
    getSiteContext
  }
}
