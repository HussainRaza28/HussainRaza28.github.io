import type { ReactNode } from 'react'
import { ArrowUpRight } from 'lucide-react'

/** A link that opens in a new tab, marked with a small arrow. */
export default function ArrowLink({ href, children, label }: { href: string; children: ReactNode; label?: string }) {
  return (
    <a className="arrow-link" href={href} target="_blank" rel="noopener" aria-label={label}>
      {children}
      <ArrowUpRight aria-hidden="true" />
    </a>
  )
}
