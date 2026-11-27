import { ArrowUpRight } from 'lucide-react'
import type { Job } from '@/data/content'
import ExternalLink from './ExternalLink'

export default function StoryMap({ map }: { map: NonNullable<Job['storyMap']> }) {
  return (
    <div className="storymap">
      <div className="storymap__head">
        <div>
          <span className="storymap__label">{map.label}</span>
          <span className="storymap__title">{map.title}</span>
        </div>
        <ExternalLink className="link-arrow" href={map.src}>
          Open full story <ArrowUpRight aria-hidden="true" />
          <span className="visually-hidden"> (opens in a new tab)</span>
        </ExternalLink>
      </div>
      <iframe
        className="storymap__frame"
        src={map.src}
        title={map.frameTitle}
        loading="lazy"
        allowFullScreen
        allow="geolocation"
      />
    </div>
  )
}
