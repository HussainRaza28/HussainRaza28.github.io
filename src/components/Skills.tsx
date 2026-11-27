import { skills } from '@/data/content'
import Section from './Section'

export default function Skills({ index }: { index: number }) {
  return (
    <Section id="skills" index={index} title="Skills">
      <dl className="skills">
        {skills.map(([group, list]) => (
          <div className="skill-group" key={group} data-reveal>
            <dt>{group}</dt>
            <dd>
              {list.split(', ').map((skill) => <span className="chip" key={skill}>{skill}</span>)}
            </dd>
          </div>
        ))}
      </dl>
    </Section>
  )
}
