import { useEffect, useRef, type MouseEvent } from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { caseStudies, caseStudyBySlug } from '@/data/content'
import { caseStudyPath } from '@/data/routes'
import { Link } from '@/lib/router'
import { useRouter } from '@/lib/router-context'
import ArrowLink from '@/components/ArrowLink'
import CaseArt from '@/components/art/CaseArt'
import Footer from '@/components/Footer'
import SiteHeader from '@/components/SiteHeader'

/** Back to the homepage. When the visitor came from there, step back in
    history so they land exactly where they were. */
function AllWorkLink({ fallback }: { fallback: string }) {
  const { cameFromHome } = useRouter()
  const onClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
    if (cameFromHome()) {
      event.preventDefault()
      window.history.back()
    }
  }
  return (
    <Link className="all-work" href={fallback} onClick={onClick}>
      <ArrowLeft aria-hidden="true" /> All work
    </Link>
  )
}

export default function CaseStudyPage({ slug }: { slug: string }) {
  const study = caseStudyBySlug(slug)!
  const { location } = useRouter()
  const titleRef = useRef<HTMLHeadingElement>(null)
  const index = caseStudies.indexOf(study)
  const next = caseStudies[(index + 1) % caseStudies.length]

  useEffect(() => {
    document.title = `${study.title} · Hussain Raza`
    if (location.via === 'push') titleRef.current?.focus({ preventScroll: true })
  }, [study, location])

  return (
    <div className={`case case--${study.slug}`}>
      <header className="case-hero">
        <SiteHeader />
        <div className="case-hero__body container">
          <div className="case-hero__text">
            <AllWorkLink fallback={study.slug === 'cloudwatch' ? '/#experience' : '/#projects'} />
            <p className="case-hero__kind">{study.kind} · {study.when}</p>
            <h1 className="case-hero__title" ref={titleRef} tabIndex={-1}>{study.title}</h1>
            <p className="case-hero__summary">{study.summary}</p>
            <p className="case-hero__stack">{study.stack.join(' · ')}</p>
            <span className="case-hero__rule" aria-hidden="true" />
          </div>
          <div className="case-hero__art">
            <CaseArt slug={study.slug} />
          </div>
          <div className="case-hero__inside">
            <h2>{study.highlightsLabel}</h2>
            <ul>
              {study.highlights.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </div>
        </div>
      </header>

      <main id="main" className="case-body container">
        <section className="case-section" aria-labelledby="problem">
          <h2 id="problem">The problem</h2>
          <p>{study.problem}</p>
        </section>
        <section className="case-section" aria-labelledby="contribution">
          <h2 id="contribution">What I did</h2>
          <ul className="points">
            {study.contribution.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </section>
        <section className="case-section" aria-labelledby="outcome">
          <h2 id="outcome">Outcome</h2>
          <ul className="outcomes">
            {study.outcome.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </section>
        {study.links.length > 0 && (
          <section className="case-section" aria-labelledby="links">
            <h2 id="links">Links</h2>
            <ul className="case-links">
              {study.links.map((link) => (
                <li key={link.href}><ArrowLink href={link.href}>{link.label}</ArrowLink></li>
              ))}
            </ul>
          </section>
        )}
        <nav className="case-next" aria-label="More work">
          <Link href={caseStudyPath(next.slug)}>
            <span className="case-next__label">Next case study</span>
            <span className="case-next__title">{next.title} <ArrowRight aria-hidden="true" /></span>
          </Link>
        </nav>
      </main>
      <Footer />
    </div>
  )
}
