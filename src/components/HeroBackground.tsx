import { lazy, Suspense, useEffect, useState } from 'react'

const DotGrid = lazy(() => import('./DotGrid'))

const readColors = () => {
  const css = getComputedStyle(document.documentElement)
  return {
    base: css.getPropertyValue('--line').trim() || '#dedad1',
    active: css.getPropertyValue('--accent').trim() || '#c2410c',
  }
}

/* The dot grid behind the hero. Colors come from the tokens and follow
   the light/dark setting; the click shockwave is off to keep it quiet. */
export default function HeroBackground() {
  const [colors, setColors] = useState<{ base: string; active: string } | null>(null)

  useEffect(() => {
    const scheme = window.matchMedia('(prefers-color-scheme: dark)')
    const update = () => setColors(readColors())
    update()
    scheme.addEventListener('change', update)
    return () => scheme.removeEventListener('change', update)
  }, [])

  if (!colors) return null

  return (
    <div className="hero__bg" aria-hidden="true">
      <Suspense fallback={null}>
        <DotGrid
          key={colors.base}
          dotSize={3}
          gap={30}
          baseColor={colors.base}
          activeColor={colors.active}
          proximity={110}
          strength={0.6}
          swell={0.5}
          stretch={0.3}
          glow={0.25}
          clickShock={false}
        />
      </Suspense>
    </div>
  )
}
