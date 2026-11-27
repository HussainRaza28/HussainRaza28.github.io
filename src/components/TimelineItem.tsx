import type { ReactNode } from 'react'

type TimelineItemProps = {
  when: string
  title: string
  role: string
  children?: ReactNode
}

export default function TimelineItem({ when, title, role, children }: TimelineItemProps) {
  return (
    <article className="tl-item" data-reveal>
      <p className="tl-when">{when}</p>
      <div className="tl-body">
        <h3 className="tl-title">{title}</h3>
        <p className="tl-role">{role}</p>
        {children}
      </div>
    </article>
  )
}
