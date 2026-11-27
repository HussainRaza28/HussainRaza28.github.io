import type { ReactNode } from 'react'

type SectionProps = { id: string; title: string; children: ReactNode }

export default function Section({ id, title, children }: SectionProps) {
  return (
    <section id={id} className="section column" aria-labelledby={`${id}-title`}>
      <h2 className="section__title" id={`${id}-title`}>{title}</h2>
      {children}
    </section>
  )
}
