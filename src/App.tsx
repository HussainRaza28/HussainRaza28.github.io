import { useEffect } from 'react'
import { MotionConfig } from 'framer-motion'
import { startSmoothScroll } from '@/lib/motion'
import Contact from './components/Contact'
import Education from './components/Education'
import Experience from './components/Experience'
import Footer from './components/Footer'
import Hero from './components/Hero'
import Honors from './components/Honors'
import Nav from './components/Nav'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Tailor from './components/Tailor'

export default function App() {
  useEffect(() => startSmoothScroll(), [])

  return (
    <MotionConfig reducedMotion="user">
      <a className="skip-link" href="#main">Skip to content</a>
      <div id="top" />
      <Nav />
      <main id="main" tabIndex={-1}>
        <Hero />
        <Education index={1} />
        <Experience index={2} />
        <Honors index={3} />
        <Projects index={4} />
        <Skills index={5} />
        <Tailor index={6} />
        <Contact index={7} />
      </main>
      <Footer />
    </MotionConfig>
  )
}
