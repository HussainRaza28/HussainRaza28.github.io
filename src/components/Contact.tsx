import { profile } from '../data/content'
import ExternalLink from './ExternalLink'

export default function Contact() {
  return (
    <section id="contact" className="contact">
      <h2>Contact</h2>
      <p>Feel free to reach out.</p>
      <div className="links">
        <a className="btn primary" href={`mailto:${profile.email}`}>{profile.email}</a>
        <a className="btn" href={profile.phone.href}>{profile.phone.label}</a>
        <ExternalLink className="btn" href={profile.linkedin}>LinkedIn</ExternalLink>
        <ExternalLink className="btn" href={profile.github}>GitHub</ExternalLink>
      </div>
    </section>
  )
}
