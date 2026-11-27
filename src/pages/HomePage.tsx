import { useEffect } from 'react'
import Contact from '@/components/Contact'
import Education from '@/components/Education'
import Experience from '@/components/Experience'
import Footer from '@/components/Footer'
import Hero from '@/components/Hero'
import Honors from '@/components/Honors'
import Projects from '@/components/Projects'
import Skills from '@/components/Skills'

export default function HomePage() {
  useEffect(() => {
    document.title = 'Hussain Raza'
  }, [])

  return (
    <>
      <Hero />
      <main id="main">
        <Experience />
        <Projects />
        <Honors />
        <Skills />
        <Education />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
