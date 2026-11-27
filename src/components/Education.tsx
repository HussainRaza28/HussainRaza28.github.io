import { education } from '@/data/content'
import Section from './Section'

export default function Education() {
  return (
    <Section id="education" title="Education">
      <article className="job">
        <header className="job__head">
          <div>
            <h3 className="job__company">{education.school}</h3>
            <p className="job__role">{education.degree} · GPA {education.gpa} · {education.location}</p>
          </div>
          <p className="job__when">{education.when}</p>
        </header>
        <p className="coursework"><span className="muted">Coursework: </span>{education.coursework.join(', ')}</p>
      </article>
    </Section>
  )
}
