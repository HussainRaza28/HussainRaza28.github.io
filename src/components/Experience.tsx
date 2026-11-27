import { ArrowUpRight } from 'lucide-react'
import { experience } from '@/data/content'
import ExternalLink from './ExternalLink'
import Section from './Section'
import StoryMap from './StoryMap'
import TimelineItem from './TimelineItem'

export default function Experience({ index }: { index: number }) {
  return (
    <Section id="experience" index={index} title="Experience">
      {experience.map((job) => (
        <TimelineItem key={job.company} when={job.when} title={job.company} role={job.role}>
          <ul className="points">
            {job.points.map((point) => <li key={point}>{point}</li>)}
          </ul>
          {job.pulls && (
            <div className="pulls">
              <span className="pulls__label">Pull requests</span>
              {job.pulls.map((pull) => (
                <ExternalLink key={pull.href} className="link-arrow" href={pull.href}>
                  {pull.label} <ArrowUpRight aria-hidden="true" />
                </ExternalLink>
              ))}
            </div>
          )}
          {job.storyMap && <StoryMap map={job.storyMap} />}
        </TimelineItem>
      ))}
    </Section>
  )
}
