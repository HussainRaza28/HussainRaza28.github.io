import { profile } from '@/data/content'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <p>© 2026 {profile.name}</p>
        <ul className="footer__links">
          <li><a href={profile.github} target="_blank" rel="noopener">GitHub</a></li>
          <li><a href={profile.linkedin} target="_blank" rel="noopener">LinkedIn</a></li>
          <li><a href={profile.resume} target="_blank" rel="noopener">Resume</a></li>
          <li><a href="#top">Back to top</a></li>
        </ul>
      </div>
    </footer>
  )
}
