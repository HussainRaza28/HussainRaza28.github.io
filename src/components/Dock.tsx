import { Award, Briefcase, FileText, FolderOpen, House, Mail } from 'lucide-react'
import { profile } from '@/data/content'
import { GlassDock, type DockItem } from './bencho/dock/GlassDock'
import { GithubIcon, LinkedinIcon } from './BrandIcons'

const items: DockItem[] = [
  { key: 'top', label: 'Top', href: '#top', Icon: House },
  { key: 'experience', label: 'Experience', href: '#experience', Icon: Briefcase },
  { key: 'projects', label: 'Projects', href: '#projects', Icon: FolderOpen },
  { key: 'honors', label: 'Honors', href: '#honors', Icon: Award, optional: true },
  { key: 'github', label: 'GitHub', href: profile.github, Icon: GithubIcon, external: true, separatorBefore: true },
  { key: 'linkedin', label: 'LinkedIn', href: profile.linkedin, Icon: LinkedinIcon, external: true },
  { key: 'email', label: 'Email', href: `mailto:${profile.email}`, Icon: Mail },
  { key: 'resume', label: 'Resume', href: profile.resume, Icon: FileText, external: true },
]

/** The floating bar at the bottom of the screen: sections, then links. */
export default function Dock() {
  return (
    <div className="dock-wrap">
      <GlassDock items={items} label="Site" magnify={1.28} lift={6} />
    </div>
  )
}
