import { useEffect, useId, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import { navLinks, profile } from '@/data/content'
import { useActiveSection } from '@/hooks/useActiveSection'

const ids = navLinks.map((link) => link.href.slice(1))

export default function Nav() {
  const active = useActiveSection(ids)
  const [open, setOpen] = useState(false)
  const sheetId = useId()

  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => { if (event.key === 'Escape') setOpen(false) }
    const onResize = () => { if (window.innerWidth >= 1100) setOpen(false) }
    window.addEventListener('keydown', onKey)
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('resize', onResize)
    }
  }, [open])

  return (
    <header className="nav">
      <div className="container">
        <nav className="nav__bar" aria-label="Main">
          <a className="nav__brand" href="#top" aria-label={`${profile.name}, back to top`}>
            <span className="nav__dot" aria-hidden="true" />
            {profile.name}
          </a>

          <ul className="nav__links">
            {navLinks.map((link) => {
              const current = active === link.href.slice(1)
              return (
                <li key={link.href}>
                  <a className="nav__link" href={link.href} aria-current={current ? 'true' : undefined}>
                    {current && (
                      <motion.span
                        className="nav__pill"
                        layoutId="nav-pill"
                        transition={{ type: 'spring', stiffness: 420, damping: 36 }}
                      />
                    )}
                    {link.label}
                  </a>
                </li>
              )
            })}
          </ul>

          <div className="nav__actions">
            <a className="btn btn--sm nav__resume" href={profile.resume} target="_blank" rel="noopener">
              Resume <ArrowUpRight aria-hidden="true" />
            </a>
            <button
              type="button"
              className="nav__menu-btn"
              aria-expanded={open}
              aria-controls={sheetId}
              aria-label={open ? 'Close menu' : 'Open menu'}
              onClick={() => setOpen((value) => !value)}
            >
              {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
            </button>
          </div>
        </nav>
      </div>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={sheetId}
            className="nav__sheet"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            <ul className="container">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    aria-current={active === link.href.slice(1) ? 'true' : undefined}
                    onClick={() => setOpen(false)}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
