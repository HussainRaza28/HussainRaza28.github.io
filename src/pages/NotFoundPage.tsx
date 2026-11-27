import { useEffect } from 'react'
import { Link } from '@/lib/router'
import SiteHeader from '@/components/SiteHeader'

export default function NotFoundPage() {
  useEffect(() => {
    document.title = 'Page not found · Hussain Raza'
  }, [])
  return (
    <div className="case">
      <header className="case-hero case-hero--plain">
        <SiteHeader />
        <main id="main" className="case-hero__body container">
          <div className="case-hero__text">
            <h1 className="case-hero__title">Lost in the fog</h1>
            <p className="case-hero__summary">There's no page here. The homepage has everything.</p>
            <p><Link className="cta cta--night" href="/">Go to the homepage</Link></p>
          </div>
        </main>
      </header>
    </div>
  )
}
