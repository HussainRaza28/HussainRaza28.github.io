import type { ReactNode } from 'react'
import { useReveal } from '@/hooks/useReveal'

type SectionProps = {
  id: string
  index: number
  title: string
  className?: string
  children: ReactNode
}

export default function Section({ id, index, title, className, children }: SectionProps) {
  const ref = useReveal<HTMLElement>()
  const headingId = `${id}-title`

  return (
    <section id={id} className={['section', className].filter(Boolean).join(' ')} aria-labelledby={headingId} ref={ref}>
      <div className="container">
        <div className="section__inner">
          <div data-reveal>
            <p className="section__num" aria-hidden="true">{String(index).padStart(2, '0')}</p>
            <h2 className="section__title" id={headingId}>{title}</h2>
          </div>
          <div className="section__content">{children}</div>
        </div>
      </div>
    </section>
  )
}
