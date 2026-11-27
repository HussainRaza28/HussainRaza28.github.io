import { education } from '@/data/content'
import Section from './Section'
import TimelineItem from './TimelineItem'

export default function Education({ index }: { index: number }) {
  return (
    <Section id="education" index={index} title="Education">
      <TimelineItem when={education.when} title={education.school} role={education.degree}>
        <p className="tl-text">{education.coursework}</p>
      </TimelineItem>
    </Section>
  )
}
