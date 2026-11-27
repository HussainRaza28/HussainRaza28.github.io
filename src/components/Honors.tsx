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
          <div className="storymap">
            <iframe className="storymap__frame" src={map.src} title={map.frameTitle} allowFullScreen allow="geolocation" />
            <p className="storymap__open">
              <ArrowLink href={map.src}>Open the full story</ArrowLink>
            </p>
          </div>
        )}
      </div>
    </>
  )
}

export default function Honors() {
  return (
    <Section id="honors" title="Honors & Involvement">
      <div className="lists">
        <div>
          <h3 className="list-label">Honors</h3>
          <ul className="list">
            {honors.map((honor) => (
              <li className="list__row" key={honor.name}>
                <p className="list__name">{honor.name}</p>
                <p className="list__detail">{honor.detail}</p>
                {honor.storyMap && <Research map={honor.storyMap} />}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="list-label">Involvement</h3>
          <ul className="list">
            {involvement.map((group) => (
              <li className="list__row" key={group.org}>
                <p className="list__name">
                  {group.href ? <a href={group.href} target="_blank" rel="noopener">{group.org}</a> : group.org}
                  <span className="list__role">{group.role}</span>
                </p>
                <p className="list__detail">{group.detail}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  )
}
