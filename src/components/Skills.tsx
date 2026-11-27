import { Fragment } from 'react'
import { skills } from '@/data/content'
import Section from './Section'

export default function Skills() {
  return (
    <Section id="skills" title="Skills">
      <dl className="skills">
        {skills.map(([group, list]) => (
          <Fragment key={group}>
            <dt>{group}</dt>
            <dd>{list.join(', ')}</dd>
          </Fragment>
        ))}
      </dl>
    </Section>
  )
}
