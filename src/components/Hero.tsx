import { ArrowUpRight } from 'lucide-react'
import { profile } from '@/data/content'
import EyeTracker from './EyeTracker'
import ExternalLink from './ExternalLink'
import HeroBackground from './HeroBackground'
import SplitText from './SplitText'

const nameFrom = { opacity: 0, yPercent: 60 }

export default function Hero() {
  const [first, last] = profile.name.split(' ')

  return (
    <section className="hero" aria-label="Introduction">
      <HeroBackground />
      <div className="container hero__content">
        <p className="eyebrow">
          <span className="eyebrow__dot" aria-hidden="true" />
          <span className="only-desktop">{profile.tagline}</span>
          <span className="only-mobile">{profile.taglineShort}</span>
        </p>

        <h1 className="hero__name" aria-label={profile.name}>
          <SplitText
            tag="span"
            text={first}
            textAlign="left"
            trigger="load"
            delay={45}
            duration={1}
            ease="power3.out"
            from={nameFrom}
            to={{ opacity: 1, yPercent: 0 }}
          />{' '}
          <span style={{ whiteSpace: 'nowrap' }}>
            <SplitText
              tag="span"
              text={last}
              textAlign="left"
              trigger="load"
              delay={45}
              duration={1}
              ease="power3.out"
              from={nameFrom}
              to={{ opacity: 1, yPercent: 0, delay: 0.3 }}
            />
            <EyeTracker />
          </span>
        </h1>

        <p className="hero__about">{profile.about}</p>

        <div className="hero__links">
          <ExternalLink className="btn btn--primary" href={profile.resume}>
            Resume <ArrowUpRight aria-hidden="true" />
          </ExternalLink>
          <ExternalLink className="btn" href={profile.github}>
            GitHub <ArrowUpRight aria-hidden="true" />
          </ExternalLink>
          <ExternalLink className="btn" href={profile.linkedin}>
            LinkedIn <ArrowUpRight aria-hidden="true" />
          </ExternalLink>
          <a className="btn" href={`mailto:${profile.email}`}>Email</a>
        </div>
      </div>
    </section>
  )
}
