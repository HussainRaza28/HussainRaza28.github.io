import { experience } from '@/data/content'
import ArrowLink from './ArrowLink'
import Section from './Section'

export default function Experience() {
  return (
    <Section id="experience" title="Experience">
      <ul className="entries">
        {experience.map((job) => (
          <li key={job.company}>
            <article>
              <div className="entry__head">
                <h3 className="entry__title">{job.company}</h3>
                <span className="entry__when">{job.when}</span>
              </div>
              <p className="entry__meta">{job.role} · {job.location}</p>
              <ul className="entry__points">
                {job.points.map((point) => <li key={point}>{point}</li>)}
              </ul>
              {job.pulls && (
                <p className="entry__foot">
                  <span className="secondary">Merged pull requests:</span>
                  {job.pulls.map((pull) => (
                    <ArrowLink key={pull.href} href={pull.href}>{pull.label}</ArrowLink>
                  ))}
                </p>
              )}
            </article>
          </li>
        ))}
      </ul>
    </Section>
  )
}
