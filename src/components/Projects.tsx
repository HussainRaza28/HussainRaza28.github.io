import { projects } from '@/data/content'
import ArrowLink from './ArrowLink'
import Section from './Section'

export default function Projects() {
  return (
    <Section id="projects" title="Projects">
      <ul className="entries">
        {projects.map((project) => (
          <li key={project.name}>
            <article>
              <div className="entry__head">
                <h3 className="entry__title">{project.name}</h3>
                <span className="entry__when">{project.when}</span>
              </div>
              <p className="entry__meta">{project.role} · {project.context}</p>
              <ul className="entry__points">
                {project.points.map((point) => <li key={point}>{point}</li>)}
              </ul>
              <p className="entry__foot">
                <span className="entry__stack">{project.stack.join(' · ')}</span>
                {project.repo && (
                  <ArrowLink href={project.repo} label={`${project.name} on GitHub`}>GitHub</ArrowLink>
                )}
              </p>
            </article>
          </li>
        ))}
      </ul>
    </Section>
  )
}
