import Contact from './components/Contact'
import Education from './components/Education'
import Experience from './components/Experience'
import Footer from './components/Footer'
import Hero from './components/Hero'
import Honors from './components/Honors'
import Nav from './components/Nav'
import Projects from './components/Projects'
import Skills from './components/Skills'

export default function App() {
  return (
    <>
      <Nav />
      <main className="wrap" id="top">
        <Hero />
        <Education />
        <Experience />
        <Honors />
        <Projects />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
