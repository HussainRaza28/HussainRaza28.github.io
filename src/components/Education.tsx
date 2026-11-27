import { education } from '@/data/content'
import Section from './Section'

export default function Education() {
  return (
    <Section id="education" title="Education">
      <article>
        <div className="entry__head">
          <h3 className="entry__title">{education.school}</h3>
          <span className="entry__when">{education.when}</span>
        </div>
        <p className="entry__meta">{education.degree} · GPA {education.gpa} · {education.location}</p>
        <p className="entry__text">
          <span className="secondary">Coursework: </span>
          {education.coursework.join(', ')}
        </p>
      </article>
    </Section>
  )
}
