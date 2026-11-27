import type { ReactNode } from 'react'

type SectionProps = { id: string; title: string; intro?: string; children: ReactNode }

export default function Section({ id, title, intro, children }: SectionProps) {
  return (
    <section id={id} className="section container" aria-labelledby={`${id}-title`}>
      <div className="section__head">
        <h2 className="section__title" id={`${id}-title`}>{title}</h2>
        {intro && <p className="section__intro">{intro}</p>}
      </div>
      <div className="section__body">{children}</div>
    </section>
  )
}
