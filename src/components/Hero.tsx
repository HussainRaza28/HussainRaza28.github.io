import { profile } from '../data/content'
import ExternalLink from './ExternalLink'
import EyeTracker from './EyeTracker'

export default function Hero() {
  return (
    <header className="hero">
      <h1>{profile.name}</h1>
      <p className="sub">{profile.tagline}</p>
      <p className="about">{profile.about}</p>
      <div className="links">
        <ExternalLink className="btn primary" href={profile.resume}>Resume</ExternalLink>
        <ExternalLink className="btn" href={profile.github}>GitHub</ExternalLink>
        <ExternalLink className="btn" href={profile.linkedin}>LinkedIn</ExternalLink>
        <a className="btn" href={`mailto:${profile.email}`}>Email</a>
        <EyeTracker />
      </div>
    </header>
  )
}
