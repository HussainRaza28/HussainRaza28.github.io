import { profile } from '@/data/content'

export default function Footer() {
  return (
    <footer className="footer column">
      <p>© 2026 {profile.name}</p>
    </footer>
  )
}
