import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

gsap.registerPlugin(ScrollTrigger)

export const REDUCED_MOTION = '(prefers-reduced-motion: reduce)'

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia(REDUCED_MOTION).matches

/**
 * Smooth scrolling with Lenis, driven by GSAP's ticker so Lenis and
 * ScrollTrigger share one animation loop. Lag smoothing is off so a
 * dropped frame never makes the scroll position jump.
 * Does nothing when the visitor prefers reduced motion.
 */
export function startSmoothScroll(): () => void {
  if (prefersReducedMotion()) return () => {}

  const lenis = new Lenis({
    /* anchor jumps respect each section's scroll-margin-top,
       which already clears the sticky nav */
    anchors: true,
    autoRaf: false,
  })
  lenis.on('scroll', ScrollTrigger.update)

  const tick = (time: number) => lenis.raf(time * 1000)
  gsap.ticker.add(tick)
  gsap.ticker.lagSmoothing(0)

  return () => {
    gsap.ticker.remove(tick)
    lenis.destroy()
  }
}

export { gsap, ScrollTrigger }
