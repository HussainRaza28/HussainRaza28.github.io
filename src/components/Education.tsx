import { education } from '../data/content'

export default function Education() {
  return (
    <section id="education">
      <h2>Education</h2>
      <div className="item">
        <div className="item-head">
          <h3>{education.school}</h3>
          <span className="when">{education.when}</span>
        </div>
        <p className="role">{education.degree}</p>
        <p>{education.coursework}</p>
      </div>
    </section>
  )
}
