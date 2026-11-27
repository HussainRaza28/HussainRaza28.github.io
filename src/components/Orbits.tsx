import type { CSSProperties } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { caseStudyBySlug, featured } from '@/data/content'
import { caseStudyPath } from '@/data/routes'
import { Link } from '@/lib/router'

/*
  Three stationary orbits with a labeled link on each. On wide screens
  the links sit on the orbit lines; on narrow screens the same links
  become a plain list under the intro. The whole label is the link.
*/

const VIEW = { w: 1000, h: 520 }
const TILT = (-11 * Math.PI) / 180

type Orbit = { cx: number; cy: number; rx: number; ry: number }
const ORBITS: Orbit[] = [
  { cx: 585, cy: 262, rx: 405, ry: 165 },
  { cx: 520, cy: 290, rx: 300, ry: 104 },
  { cx: 560, cy: 278, rx: 150, ry: 48 },
]

/** A point on a tilted ellipse, as percentages of the drawing. */
const pointOn = ({ cx, cy, rx, ry }: Orbit, t: number) => {
  const x = rx * Math.cos(t)
  const y = ry * Math.sin(t)
  const px = cx + x * Math.cos(TILT) - y * Math.sin(TILT)
  const py = cy + x * Math.sin(TILT) + y * Math.cos(TILT)
  return { left: `${(px / VIEW.w) * 100}%`, top: `${(py / VIEW.h) * 100}%` }
}

const PLACES: Record<string, { orbit: number; t: number; kind: string }> = {
  cloudwatch: { orbit: 1, t: -2.2, kind: 'Internship case study' },
  tailor: { orbit: 0, t: -1.08, kind: 'Project case study' },
  skypane: { orbit: 1, t: 0.34, kind: 'Project case study' },
}

export default function Orbits() {
  return (
    <nav className="orbits" aria-label="Featured work">
      <svg className="orbits__lines" viewBox={`0 0 ${VIEW.w} ${VIEW.h}`} aria-hidden="true" focusable="false">
        {ORBITS.map((o, i) => (
          <ellipse
            key={i}
            cx={o.cx}
            cy={o.cy}
            rx={o.rx}
            ry={o.ry}
            transform={`rotate(${(TILT * 180) / Math.PI} ${o.cx} ${o.cy})`}
          />
        ))}
      </svg>
      <ul className="orbits__list">
        {featured.map((slug) => {
          const study = caseStudyBySlug(slug)!
          const place = PLACES[slug]
          const at = pointOn(ORBITS[place.orbit], place.t)
          return (
            <li key={slug} className="orbits__item" style={{ '--x': at.left, '--y': at.top } as CSSProperties}>
              <Link className="orbit-link" href={caseStudyPath(slug)}>
                <span className="orbit-link__dot" aria-hidden="true" />
                <span className="orbit-link__text">
                  <span className="orbit-link__label">
                    {study.label}
                    <ArrowUpRight aria-hidden="true" />
                  </span>
                  <span className="orbit-link__kind">{place.kind}</span>
                </span>
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
