import { Fragment } from 'react'
import { skills } from '../data/content'

export default function Skills() {
  return (
    <section id="skills">
      <h2>Skills</h2>
      <dl className="skills">
        {skills.map(([group, list]) => (
          <Fragment key={group}>
            <dt>{group}</dt>
            <dd>{list}</dd>
          </Fragment>
        ))}
      </dl>
    </section>
  )
}
