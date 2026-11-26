import { honors, involvement } from '../data/content'

export default function Honors() {
  return (
    <section id="honors">
      <h2>Honors &amp; Involvement</h2>
      <div className="item">
        <h3>Honors</h3>
        <ul className="points">
          {honors.map((honor) => (
            <li key={honor.name}>
              {honor.name}
              {honor.detail && ` (${honor.detail})`}
              {honor.when && `, ${honor.when}`}
            </li>
          ))}
        </ul>
      </div>
      <div className="item">
        <h3>Involvement</h3>
        <ul className="points">
          {involvement.map((group) => (
            <li key={group.org}>{group.org} · {group.role} since {group.since}</li>
          ))}
        </ul>
      </div>
    </section>
  )
}
