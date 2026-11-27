import { contact, profile } from '@/data/content'
import ArrowLink from './ArrowLink'
import EyeTracker from './EyeTracker'

export default function Contact() {
  return (
    <section id="contact" className="contact container" aria-labelledby="contact-title">
      <h2 className="contact__title" id="contact-title">
        {contact.lead}
        <EyeTracker />
      </h2>
      <ul className="contact__links">
        <li><a href={`mailto:${profile.email}`}>{profile.email}</a></li>
        <li><a href={profile.phone.href}>{profile.phone.label}</a></li>
        <li><ArrowLink href={profile.linkedin}>LinkedIn</ArrowLink></li>
        <li><ArrowLink href={profile.github}>GitHub</ArrowLink></li>
        <li><ArrowLink href={profile.resume}>Résumé</ArrowLink></li>
      </ul>
    </section>
  )
}
