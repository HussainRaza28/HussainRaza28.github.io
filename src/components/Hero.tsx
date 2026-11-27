import { profile } from '@/data/content'
import Orbits from './Orbits'
import SiteHeader from './SiteHeader'

const wide = [960, 1440, 1920, 2880]
const tall = [585, 828, 1170]
const set = (name: string, widths: number[], ext: string) =>
  widths.map((w) => `/images/${name}-${w}.${ext} ${w}w`).join(', ')

export default function Hero() {
  return (
    <header className="hero" id="top">
      <picture className="hero__art">
        <source media="(max-width: 699px)" type="image/avif" srcSet={set('landscape-tall', tall, 'avif')} sizes="100vw" />
        <source media="(max-width: 699px)" type="image/webp" srcSet={set('landscape-tall', tall, 'webp')} sizes="100vw" />
        <source media="(max-width: 699px)" srcSet="/images/landscape-tall-828.jpg" />
        <source type="image/avif" srcSet={set('landscape-wide', wide, 'avif')} sizes="100vw" />
        <source type="image/webp" srcSet={set('landscape-wide', wide, 'webp')} sizes="100vw" />
        <img
          src="/images/landscape-wide-1920.jpg"
          alt="The Blue Ridge Mountains at dusk, with the Rotunda lit in the valley below"
          width={2880}
          height={1440}
          fetchPriority="high"
          decoding="async"
        />
      </picture>

      <SiteHeader home />

      <div className="hero__body container">
        <div className="hero__intro">
          <h1 className="hero__name">
            <span>Hussain</span> <span>Raza</span>
          </h1>
          <p className="hero__tagline">
            {profile.tagline.split(' · ').map((part, i) => (
              <span key={part}>
                {i > 0 && <span className="hero__sep"> · </span>}
                {part}
              </span>
            ))}
          </p>
          <ul className="hero__social">
            <li><a href={profile.github} target="_blank" rel="noopener">GitHub</a></li>
            <li><a href={profile.linkedin} target="_blank" rel="noopener">LinkedIn</a></li>
            <li><a href={`mailto:${profile.email}`}>Email</a></li>
          </ul>
        </div>
        <Orbits />
      </div>
    </header>
  )
}
