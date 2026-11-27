import { FileText, Mail, Phone } from 'lucide-react'
import { contact, profile } from '@/data/content'
import { GlassDock, type DockItem } from './bencho/dock/GlassDock'
import { GithubIcon, LinkedinIcon } from './BrandIcons'
import Section from './Section'

const dockItems: DockItem[] = [
  { key: 'email', label: 'Email', href: `mailto:${profile.email}`, Icon: Mail },
  { key: 'phone', label: profile.phone.label, href: profile.phone.href, Icon: Phone },
  { key: 'linkedin', label: 'LinkedIn', href: profile.linkedin, Icon: LinkedinIcon, external: true },
  { key: 'github', label: 'GitHub', href: profile.github, Icon: GithubIcon, external: true },
  { key: 'resume', label: 'Resume', href: profile.resume, Icon: FileText, external: true },
]

export default function Contact({ index }: { index: number }) {
  return (
    <Section id="contact" index={index} title="Contact">
      <p className="contact__lead" data-reveal>{contact.lead}</p>
      <a className="contact__email" href={`mailto:${profile.email}`} data-reveal>{profile.email}</a>
      <div data-reveal>
        <GlassDock items={dockItems} label="Contact links" />
      </div>
    </Section>
  )
}
