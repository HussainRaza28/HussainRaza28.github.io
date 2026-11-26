import { Fragment } from 'react'
import { experience } from '../data/content'
import ExternalLink from './ExternalLink'
import StoryMap from './StoryMap'

export default function Experience() {
  return (
    <section id="experience">
      <h2>Experience</h2>
      {experience.map((job) => (
        <div className="item" key={job.company}>
          <div className="item-head">
            <h3>{job.company}</h3>
            <span className="when">{job.when}</span>
          </div>
          <p className="role">{job.role}</p>
          <ul className="points">
            {job.points.map((point) => <li key={point}>{point}</li>)}
          </ul>
          {job.pulls && (
            <p className="role pulls">
              Pull requests:{' '}
              {job.pulls.map((pull, i) => (
                <Fragment key={pull.href}>
                  {i > 0 && ' · '}
                  <ExternalLink href={pull.href}>{pull.label}</ExternalLink>
                </Fragment>
              ))}
            </p>
          )}
          {job.storyMap && <StoryMap map={job.storyMap} />}
        </div>
      ))}
    </section>
  )
}
