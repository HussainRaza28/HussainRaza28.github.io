import { navLinks, profile } from '@/data/content'
import { Link } from '@/lib/router'

/** Monogram and the three ways in: Experience, Projects, Résumé. */
export default function SiteHeader({ home = false }: { home?: boolean }) {
  return (
    <div className="site-header container">
      <Link className="monogram" href={home ? '/#top' : '/'} aria-label={`${profile.name}, home`}>
        <span aria-hidden="true">HR</span>
      </Link>
      <nav aria-label="Main">
        <ul className="site-nav">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link href={link.href}>{link.label}</Link>
            </li>
          ))}
          <li>
            <a href={profile.resume} target="_blank" rel="noopener">Résumé</a>
          </li>
        </ul>
      </nav>
    </div>
  )
}
