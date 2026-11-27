import { useId, useState } from 'react'
import { ChevronRight } from 'lucide-react'
import { honors, involvement, type StoryMap } from '@/data/content'
import ArrowLink from './ArrowLink'
import Section from './Section'

function Research({ map }: { map: StoryMap }) {
  const [open, setOpen] = useState(false)
  const panelId = useId()

  return (
    <>
      <button
        type="button"
        className="disclosure"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
      >
        <ChevronRight aria-hidden="true" />
        {open ? 'Hide' : 'Show'} research project
      </button>
      <div id={panelId} hidden={!open}>
        {open && (
          <>
            <div className="storymap">
              <iframe className="storymap__frame" src={map.src} title={map.frameTitle} allowFullScreen allow="geolocation" />
            </div>
            <span className="storymap__open">
              <ArrowLink href={map.src}>{map.title}, full story</ArrowLink>
            </span>
          </>
        )}
      </div>
    </>
  )
}

export default function Honors() {
  return (
    <Section id="honors" title="Honors & Involvement">
      <h3 className="group-label">Honors</h3>
      <ul className="group">
        {honors.map((honor) => (
          <li className="group__row" key={honor.name}>
            <p className="group__name">{honor.name}</p>
            <p className="group__detail">{honor.detail}</p>
            {honor.storyMap && <Research map={honor.storyMap} />}
          </li>
        ))}
      </ul>

      <h3 className="group-label">Involvement</h3>
      <ul className="group">
        {involvement.map((group) => (
          <li className="group__row" key={group.org}>
            <div className="group__head">
              <p className="group__name">
                {group.href ? <a href={group.href} target="_blank" rel="noopener">{group.org}</a> : group.org}
              </p>
              <span className="group__aside">{group.role}</span>
            </div>
            <p className="group__detail">{group.detail}</p>
          </li>
        ))}
      </ul>
    </Section>
  )
}
