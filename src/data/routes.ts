/* Paths that get their own HTML file at build time, so deep links work
   on any static host. Kept apart from content.ts so vite.config can use it. */
export const caseStudySlugs = ['cloudwatch', 'tailor', 'skypane'] as const
export const caseStudyPath = (slug: string) => `/work/${slug}`
