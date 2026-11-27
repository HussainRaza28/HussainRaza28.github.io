import { honors, involvement } from '@/data/content'
import Section from './Section'

export default function Honors({ index }: { index: number }) {
  return (
    <Section id="honors" index={index} title="Honors & Involvement">
      <div className="lists">
        <div data-reveal>
          <h3 className="list-label">Honors</h3>
          <ul className="list">
            {honors.map((honor) => (
              <li className="list-row" key={honor.name}>
                <div>
                  <p className="list-name">{honor.name}</p>
                  {honor.detail && <p className="list-detail">{honor.detail}</p>}
                </div>
                {honor.when && <p className="list-when">{honor.when}</p>}
              </li>
            ))}
          </ul>
        </div>
        <div data-reveal>
          <h3 className="list-label">Involvement</h3>
          <ul className="list">
            {involvement.map((group) => (
              <li className="list-row" key={group.org}>
                <div>
                  <p className="list-name">
                    {group.href ? <a href={group.href} target="_blank" rel="noopener">{group.org}</a> : group.org}
                  </p>
                  <p className="list-detail">{group.role}</p>
                </div>
                <p className="list-when">Since {group.since}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  )
}
