import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, ScrollTrigger } from '@/lib/motion'

/**
 * Fades and lifts every `[data-reveal]` element inside the returned ref
 * as it scrolls into view, a few at a time. Skipped entirely under
 * prefers-reduced-motion, so the content is simply there.
 */
export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const items = gsap.utils.toArray<HTMLElement>('[data-reveal]', ref.current)
        if (!items.length) return
        gsap.set(items, { autoAlpha: 0, y: 24 })
        ScrollTrigger.batch(items, {
          start: 'top 88%',
          once: true,
          onEnter: (batch) =>
            gsap.to(batch, {
              autoAlpha: 1,
              y: 0,
              duration: 0.7,
              ease: 'power3.out',
              stagger: 0.08,
              overwrite: true,
            }),
        })
      })
      return () => mm.revert()
    },
    { scope: ref },
  )

  return ref
}
