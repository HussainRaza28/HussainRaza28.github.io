import { navLinks, profile } from '../data/content'

export default function Nav() {
  return (
    <nav>
      <div className="wrap">
        <a className="name" href="#top">{profile.name}</a>
        <ul>
          {navLinks.map((link) => (
            <li key={link.href} className={link.hideSmall ? 'hide-sm' : undefined}>
              <a href={link.href}>{link.label}</a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}
