import { caseStudyBySlug } from '@/data/content'
import { RouterProvider } from '@/lib/router'
import { useRouter } from '@/lib/router-context'
import CaseStudyPage from '@/pages/CaseStudyPage'
import HomePage from '@/pages/HomePage'
import NotFoundPage from '@/pages/NotFoundPage'

function Routes() {
  const { location } = useRouter()
  if (location.path === '/') return <HomePage />
  const match = location.path.match(/^\/work\/([^/]+)$/)
  if (match && caseStudyBySlug(match[1])) return <CaseStudyPage key={match[1]} slug={match[1]} />
  return <NotFoundPage />
}

export default function App() {
  return (
    <RouterProvider>
      <a className="skip-link" href="#main">Skip to content</a>
      <Routes />
    </RouterProvider>
  )
}
