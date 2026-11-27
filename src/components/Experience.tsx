import { ArrowRight } from 'lucide-react'
import { experience } from '@/data/content'
import { caseStudyPath } from '@/data/routes'
import { Link } from '@/lib/router'
import ArrowLink from './ArrowLink'
import Section from './Section'

export default function Experience() {
  return (
    <Section id="experience" title="Experience">
      {experience.map((job) => (
        <article className="job" key={job.company}>
          <header className="job__head">
            <div>
              <h3 className="job__company">{job.company}</h3>
              <p className="job__role">{job.role} · {job.location}</p>
            </div>
            <p className="job__when">{job.when}</p>
          </header>
          <ul className="points">
            {job.points.map((point) => <li key={point}>{point}</li>)}
          </ul>
          <div className="job__foot">
            {job.caseStudy && (
              <Link className="cta" href={caseStudyPath(job.caseStudy)}>
                Read the case study <ArrowRight aria-hidden="true" />
              </Link>
            )}
            {job.pulls && (
              <p className="job__pulls">
                <span className="muted">Merged pull requests:</span>
                {job.pulls.map((pull) => (
                  <ArrowLink key={pull.href} href={pull.href}>{pull.label}</ArrowLink>
                ))}
              </p>
            )}
          </div>
        </article>
      ))}
    </Section>
  )
}
