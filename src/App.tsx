import { useEffect } from 'react'
import { startSmoothScroll } from '@/lib/motion'
import Art from './components/Art'
import Contact from './components/Contact'
import Dock from './components/Dock'
import Education from './components/Education'
import Experience from './components/Experience'
import Footer from './components/Footer'
import Hero from './components/Hero'
import Honors from './components/Honors'
import Projects from './components/Projects'
import Skills from './components/Skills'

export default function App() {
  useEffect(() => startSmoothScroll(), [])

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <div id="top" />
      <Art />
      <main id="main" tabIndex={-1}>
        <Hero />
        <Education />
        <Experience />
        <Projects />
        <Honors />
        <Skills />
        <Contact />
      </main>
      <Footer />
      <Dock />
    </>
  )
}
