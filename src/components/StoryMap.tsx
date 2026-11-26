import type { Job } from '../data/content'
import ExternalLink from './ExternalLink'

export default function StoryMap({ map }: { map: NonNullable<Job['storyMap']> }) {
  return (
    <div className="storymap-preview">
      <div className="storymap-preview-header">
        <div className="storymap-preview-heading">
          <span className="storymap-preview-label">{map.label}</span>
          <span className="storymap-preview-title">{map.title}</span>
        </div>
        <ExternalLink className="storymap-preview-open" href={map.src}>Open full story ↗</ExternalLink>
      </div>
      <iframe
        className="storymap-frame"
        src={map.src}
        title={map.frameTitle}
        allowFullScreen
        allow="geolocation"
      />
    </div>
  )
}
