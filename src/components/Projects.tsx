import { projects } from '../data/content'
import ExternalLink from './ExternalLink'

export default function Projects() {
  return (
    <section id="projects">
      <h2>Projects</h2>
      {projects.map((project) => (
        <div className="card" key={project.name}>
          <div className="item-head">
            <h3>{project.name}</h3>
            <span className="when">{project.when}</span>
          </div>
          <p>{project.description}</p>
          <ul className="tags">
            {project.tags.map((tag) => <li key={tag}>{tag}</li>)}
          </ul>
          {project.repo && (
            <ExternalLink className="more" href={project.repo}>View on GitHub →</ExternalLink>
          )}
        </div>
      ))}
    </section>
  )
}
