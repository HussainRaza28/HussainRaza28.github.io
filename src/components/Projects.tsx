import { ArrowUpRight } from 'lucide-react'
import { projects } from '@/data/content'
import { Tilt } from './bencho/tilt/Tilt'
import ExternalLink from './ExternalLink'
import Section from './Section'

export default function Projects({ index }: { index: number }) {
  return (
    <Section id="projects" index={index} title="Projects">
      <ul className="projects" role="list" style={{ listStyle: 'none', margin: 0, padding: 0 }}>
        {projects.map((project) => (
          <li key={project.name} data-reveal>
            <Tilt className="project" tilt={4} corner={22} shade={16}>
              <div className="project__head">
                <h3 className="project__name">{project.name}</h3>
                <span className="project__when">{project.when}</span>
              </div>
              <p className="project__desc">{project.description}</p>
              <ul className="tags" aria-label="Built with">
                {project.tags.map((tag) => <li className="tag" key={tag}>{tag}</li>)}
              </ul>
              {project.repo && (
                <ExternalLink className="link-arrow" href={project.repo}>
                  View on GitHub <ArrowUpRight aria-hidden="true" />
                  <span className="visually-hidden"> ({project.name})</span>
                </ExternalLink>
              )}
            </Tilt>
          </li>
        ))}
      </ul>
    </Section>
  )
}
