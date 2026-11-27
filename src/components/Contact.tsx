import { contact, profile } from '@/data/content'
import ArrowLink from './ArrowLink'
import Section from './Section'

export default function Contact() {
  return (
    <Section id="contact" title="Contact">
      <p>{contact.lead}</p>
      <ul className="contact__list">
        <li><a href={`mailto:${profile.email}`}>{profile.email}</a></li>
        <li><a href={profile.phone.href}>{profile.phone.label}</a></li>
        <li><ArrowLink href={profile.linkedin}>LinkedIn</ArrowLink></li>
        <li><ArrowLink href={profile.github}>GitHub</ArrowLink></li>
      </ul>
    </Section>
  )
}
