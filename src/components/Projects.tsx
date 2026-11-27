import { ArrowRight } from 'lucide-react'
import { projects } from '@/data/content'
import { caseStudyPath } from '@/data/routes'
import { Link } from '@/lib/router'
import ArrowLink from './ArrowLink'
import Section from './Section'
import CaseArt from './art/CaseArt'

export default function Projects() {
  return (
    <Section id="projects" title="Projects">
      <ul className="projects">
        {projects.map((project) => (
          <li key={project.name} className={project.caseStudy ? 'project project--featured' : 'project'}>
            {project.caseStudy && (
              <div className={`project__art project__art--${project.caseStudy}`} aria-hidden="true">
                <CaseArt slug={project.caseStudy} compact />
              </div>
            )}
            <div className="project__body">
              <div className="project__head">
                <h3 className="project__name">{project.name}</h3>
                <span className="project__when">{project.when}</span>
              </div>
              <p className="project__meta">{project.role} · {project.context}</p>
              <ul className="points points--small">
                {project.points.map((point) => <li key={point}>{point}</li>)}
              </ul>
              <p className="project__stack">{project.stack.join(' · ')}</p>
              <div className="project__links">
                {project.caseStudy && (
                  <Link className="cta" href={caseStudyPath(project.caseStudy)}>
                    Case study <ArrowRight aria-hidden="true" />
                    <span className="visually-hidden">: {project.name}</span>
                  </Link>
                )}
                {project.repo && (
                  <ArrowLink href={project.repo} label={`${project.name} on GitHub`}>GitHub</ArrowLink>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </Section>
  )
}
