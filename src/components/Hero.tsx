import { profile } from '@/data/content'
import ArrowLink from './ArrowLink'
import EyeTracker from './EyeTracker'

export default function Hero() {
  return (
    <header className="intro column">
      <h1 className="intro__name">
        {profile.name}
        <EyeTracker />
      </h1>
      <p className="intro__tagline">{profile.tagline}</p>
      <p className="intro__about">{profile.about}</p>
      <ul className="intro__links">
        <li><ArrowLink href={profile.resume}>Resume</ArrowLink></li>
        <li><ArrowLink href={profile.github}>GitHub</ArrowLink></li>
        <li><ArrowLink href={profile.linkedin}>LinkedIn</ArrowLink></li>
        <li><a href={`mailto:${profile.email}`}>Email</a></li>
      </ul>
    </header>
  )
}
