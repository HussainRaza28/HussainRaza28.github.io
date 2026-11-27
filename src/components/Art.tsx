import { useEffect, useRef } from 'react'

/*
  An ink-wash painting of the Blue Ridge, the mountains on the horizon
  from Charlottesville. Two versions of the same landscape are painted
  once, offscreen: one in ink, one in color. Moving the pointer over it
  brushes the color version in through a soft mask, which then fades
  back to ink over a few seconds.

  The landscape is generated from a fixed seed, so it is the same
  painting on every visit. The loop only runs while there is color to
  fade or a pointer to follow, and stops when the canvas is offscreen.
  Under prefers-reduced-motion the color stays where it was painted.
*/

type Palette = {
  sky: [string, string]
  orb: string
  orbGlow: number
  ridges: string[]
  mist: string
  grain: number
  stars?: boolean
}

const PALETTES: Record<'light' | 'dark', { ink: Palette; color: Palette }> = {
  light: {
    ink: {
      sky: ['#ffffff', '#efeeea'],
      orb: '#e6e5e1',
      orbGlow: 0,
      ridges: ['#dcdbd7', '#c9c8c4', '#b1b0ac', '#918f8b', '#686763', '#3d3c39'],
      mist: '#f4f3f0',
      grain: 0.03,
    },
    color: {
      sky: ['#c7d6e8', '#f6d9bd'],
      orb: '#f5b27c',
      orbGlow: 0.55,
      ridges: ['#b9c6da', '#9cb0cc', '#7f98ba', '#617ea3', '#41597a', '#263a52'],
      mist: '#eef0f3',
      grain: 0.03,
    },
  },
  dark: {
    ink: {
      sky: ['#000000', '#161616'],
      orb: '#3a3a3a',
      orbGlow: 0,
      ridges: ['#3c3c3c', '#323232', '#282828', '#1f1f1f', '#161616', '#0d0d0d'],
      mist: '#202020',
      grain: 0.04,
    },
    color: {
      sky: ['#070d1c', '#2b3a66'],
      orb: '#efe7cf',
      orbGlow: 0.35,
      ridges: ['#3d4d74', '#314064', '#263352', '#1c2740', '#131c2f', '#0b111e'],
      mist: '#3a4870',
      grain: 0.04,
      stars: true,
    },
  },
}

const SEED = 20280501
const CELL = 8 // mask resolution, in CSS pixels per cell
const HALF_LIFE_MS = 2600

function mulberry32(seed: number) {
  let a = seed
  return () => {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const hex = (h: string) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16))
const mix = (a: string, b: string, t: number) => {
  const x = hex(a)
  const y = hex(b)
  return `rgb(${x.map((v, i) => Math.round(v + (y[i] - v) * t)).join(' ')})`
}

/** One ridge line: a few long, rounded swells plus a little texture. */
function ridgeLine(rand: () => number, w: number, base: number, amp: number) {
  const waves = Array.from({ length: 4 }, (_, k) => ({
    f: (0.6 + rand() * 0.8) * (k + 1) * (Math.PI * 2) / w,
    p: rand() * Math.PI * 2,
    a: amp / (k + 1.2),
  }))
  const pts: number[] = []
  for (let x = -8; x <= w + 8; x += 4) {
    let y = base
    for (const wv of waves) y -= wv.a * (0.5 + 0.5 * Math.sin(wv.f * x + wv.p))
    y += (rand() - 0.5) * amp * 0.04
    pts.push(x, y)
  }
  return pts
}

function paint(ctx: CanvasRenderingContext2D, w: number, h: number, pal: Palette) {
  const rand = mulberry32(SEED)

  // Sky
  const sky = ctx.createLinearGradient(0, 0, 0, h * 0.75)
  sky.addColorStop(0, pal.sky[0])
  sky.addColorStop(1, pal.sky[1])
  ctx.fillStyle = sky
  ctx.fillRect(0, 0, w, h)

  // Stars, dark color version only
  const starRand = mulberry32(SEED + 7)
  if (pal.stars) {
    for (let i = 0; i < 90; i++) {
      ctx.globalAlpha = 0.25 + starRand() * 0.6
      ctx.fillStyle = '#ffffff'
      const r = starRand() < 0.9 ? 0.6 : 1.1
      ctx.beginPath()
      ctx.arc(starRand() * w, starRand() * h * 0.45, r, 0, Math.PI * 2)
      ctx.fill()
    }
    ctx.globalAlpha = 1
  }

  // Sun or moon, low over the ridges
  const ox = w * 0.7
  const oy = h * 0.34
  const or = Math.max(14, h * 0.065)
  if (pal.orbGlow > 0) {
    const glow = ctx.createRadialGradient(ox, oy, or * 0.6, ox, oy, or * 6)
    glow.addColorStop(0, pal.orb)
    glow.addColorStop(1, 'transparent')
    ctx.globalAlpha = pal.orbGlow
    ctx.fillStyle = glow
    ctx.fillRect(0, 0, w, h)
    ctx.globalAlpha = 1
  }
  ctx.fillStyle = pal.orb
  ctx.beginPath()
  ctx.arc(ox, oy, or, 0, Math.PI * 2)
  ctx.fill()

  // Ridges, far to near. Each fills down with a gradient that fades
  // into mist, the haze the Blue Ridge is named for.
  const n = pal.ridges.length
  for (let i = 0; i < n; i++) {
    const base = h * (0.52 + i * 0.07)
    const amp = h * (0.13 - i * 0.01)
    const pts = ridgeLine(rand, w, base, amp)
    const top = Math.min(...pts.filter((_, k) => k % 2 === 1))
    const body = ctx.createLinearGradient(0, top, 0, Math.min(h, base + h * 0.22))
    body.addColorStop(0, pal.ridges[i])
    body.addColorStop(1, mix(pal.ridges[i], pal.mist, 0.55 - i * 0.07))

    // Wet edge: a few loose passes at low opacity, then the body.
    for (let pass = 0; pass < 4; pass++) {
      ctx.globalAlpha = 0.18
      ctx.fillStyle = pal.ridges[i]
      ctx.beginPath()
      ctx.moveTo(pts[0], h)
      for (let k = 0; k < pts.length; k += 2) ctx.lineTo(pts[k], pts[k + 1] + (rand() - 0.5) * 3 - pass * 0.6)
      ctx.lineTo(pts[pts.length - 2], h)
      ctx.closePath()
      ctx.fill()
    }
    ctx.globalAlpha = 1
    ctx.fillStyle = body
    ctx.beginPath()
    ctx.moveTo(pts[0], h)
    for (let k = 0; k < pts.length; k += 2) ctx.lineTo(pts[k], pts[k + 1] + 1.5)
    ctx.lineTo(pts[pts.length - 2], h)
    ctx.closePath()
    ctx.fill()

    // Trees along the two nearest ridgelines
    if (i >= n - 2) {
      ctx.fillStyle = mix(pal.ridges[i], '#000000', 0.12)
      for (let k = 0; k < pts.length; k += 2) {
        if (rand() > 0.55) continue
        const x = pts[k] + (rand() - 0.5) * 4
        const y = pts[k + 1] + 2
        if (rand() < 0.45) {
          const th = 5 + rand() * (i === n - 1 ? 13 : 8)
          const tw = th * (0.35 + rand() * 0.15)
          ctx.beginPath()
          ctx.moveTo(x, y - th)
          ctx.lineTo(x + tw, y)
          ctx.lineTo(x - tw, y)
          ctx.closePath()
          ctx.fill()
        } else {
          const r = 2.5 + rand() * (i === n - 1 ? 4.5 : 3)
          ctx.beginPath()
          ctx.arc(x, y - r * 0.6, r, 0, Math.PI * 2)
          ctx.fill()
        }
      }
    }
  }

  // Paper grain
  const grain = document.createElement('canvas')
  grain.width = grain.height = 96
  const g = grain.getContext('2d')!
  const img = g.createImageData(96, 96)
  const grainRand = mulberry32(SEED + 3)
  for (let p = 0; p < img.data.length; p += 4) {
    const v = grainRand() < 0.5 ? 0 : 255
    img.data[p] = img.data[p + 1] = img.data[p + 2] = v
    img.data[p + 3] = Math.round(grainRand() * 255 * pal.grain)
  }
  g.putImageData(img, 0, 0)
  ctx.fillStyle = ctx.createPattern(grain, 'repeat')!
  ctx.fillRect(0, 0, w, h)
}

export default function Art() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    const dark = window.matchMedia('(prefers-color-scheme: dark)')

    let w = 0
    let h = 0
    let dpr = 1
    let ink: HTMLCanvasElement | null = null
    let color: HTMLCanvasElement | null = null
    const layer = document.createElement('canvas')
    const layerCtx = layer.getContext('2d')!

    // Mask: a coarse grid of 0..1 values, upscaled smoothly when drawn
    let cols = 0
    let rows = 0
    let mask = new Float32Array(0)
    const maskCanvas = document.createElement('canvas')
    const maskCtx = maskCanvas.getContext('2d')!
    let maskImage: ImageData | null = null

    const pointer = { x: 0, y: 0, inside: false, lastX: 0, lastY: 0, hasLast: false }
    let raf = 0
    let last = 0
    let visible = true
    let energy = 0

    const build = () => {
      const rect = canvas.getBoundingClientRect()
      w = Math.max(1, Math.round(rect.width))
      h = Math.max(1, Math.round(rect.height))
      dpr = Math.min(2, window.devicePixelRatio || 1)
      canvas.width = layer.width = Math.round(w * dpr)
      canvas.height = layer.height = Math.round(h * dpr)
      const pal = PALETTES[dark.matches ? 'dark' : 'light']
      const make = (p: Palette) => {
        const c = document.createElement('canvas')
        c.width = canvas.width
        c.height = canvas.height
        const cx = c.getContext('2d')!
        cx.scale(dpr, dpr)
        paint(cx, w, h, p)
        return c
      }
      ink = make(pal.ink)
      color = make(pal.color)
      cols = Math.ceil(w / CELL) + 1
      rows = Math.ceil(h / CELL) + 1
      mask = new Float32Array(cols * rows)
      maskCanvas.width = cols
      maskCanvas.height = rows
      maskImage = maskCtx.createImageData(cols, rows)
      energy = 0
      draw()
    }

    const brushRadius = () => Math.max(46, Math.min(110, w * 0.075))

    const dab = (x: number, y: number, strength: number) => {
      const r = brushRadius() / CELL
      const cx = x / CELL
      const cy = y / CELL
      const x0 = Math.max(0, Math.floor(cx - r))
      const x1 = Math.min(cols - 1, Math.ceil(cx + r))
      const y0 = Math.max(0, Math.floor(cy - r))
      const y1 = Math.min(rows - 1, Math.ceil(cy + r))
      for (let j = y0; j <= y1; j++) {
        for (let i = x0; i <= x1; i++) {
          const d = Math.hypot(i - cx, j - cy) / r
          if (d >= 1) continue
          const k = j * cols + i
          const add = strength * (1 - d * d) ** 2
          mask[k] = Math.min(1, mask[k] + add * (1 - mask[k]))
        }
      }
      energy = 1
    }

    const stroke = (x: number, y: number) => {
      if (pointer.hasLast) {
        const dist = Math.hypot(x - pointer.lastX, y - pointer.lastY)
        const step = brushRadius() / 4
        const n = Math.min(40, Math.ceil(dist / step))
        for (let s = 1; s <= n; s++) {
          const t = s / n
          dab(pointer.lastX + (x - pointer.lastX) * t, pointer.lastY + (y - pointer.lastY) * t, 0.22)
        }
      } else {
        dab(x, y, 0.3)
      }
      pointer.lastX = x
      pointer.lastY = y
      pointer.hasLast = true
    }

    const draw = () => {
      if (!ink || !color || !maskImage) return
      const data = maskImage.data
      for (let k = 0; k < mask.length; k++) {
        data[k * 4 + 3] = Math.round(mask[k] * 255)
      }
      maskCtx.putImageData(maskImage, 0, 0)

      ctx.setTransform(1, 0, 0, 1, 0, 0)
      ctx.globalCompositeOperation = 'source-over'
      ctx.drawImage(ink, 0, 0)

      layerCtx.globalCompositeOperation = 'source-over'
      layerCtx.clearRect(0, 0, layer.width, layer.height)
      layerCtx.drawImage(color, 0, 0)
      layerCtx.globalCompositeOperation = 'destination-in'
      layerCtx.imageSmoothingEnabled = true
      layerCtx.imageSmoothingQuality = 'high'
      layerCtx.drawImage(maskCanvas, 0, 0, cols * CELL * dpr, rows * CELL * dpr)
      ctx.drawImage(layer, 0, 0)

      if (pointer.inside) {
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
        ctx.strokeStyle = dark.matches ? 'rgba(255,255,255,0.55)' : 'rgba(0,0,0,0.45)'
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.arc(pointer.x, pointer.y, brushRadius() * 0.42, 0, Math.PI * 2)
        ctx.stroke()
        ctx.fillStyle = ctx.strokeStyle
        ctx.beginPath()
        ctx.arc(pointer.x, pointer.y, 1.5, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    const tick = (now: number) => {
      raf = 0
      const dt = last ? Math.min(100, now - last) : 16
      last = now
      if (!reduced.matches && energy > 0) {
        const keep = Math.pow(0.5, dt / HALF_LIFE_MS)
        let max = 0
        for (let k = 0; k < mask.length; k++) {
          const v = mask[k] * keep
          mask[k] = v < 0.004 ? 0 : v
          if (mask[k] > max) max = mask[k]
        }
        energy = max
      }
      draw()
      if (visible && (pointer.inside || (energy > 0 && !reduced.matches))) {
        raf = requestAnimationFrame(tick)
      } else {
        last = 0
      }
    }

    const wake = () => {
      if (!raf && visible) raf = requestAnimationFrame(tick)
    }

    const locate = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect()
      pointer.x = e.clientX - rect.left
      pointer.y = e.clientY - rect.top
    }

    const onMove = (e: PointerEvent) => {
      locate(e)
      pointer.inside = e.pointerType === 'mouse' || e.pointerType === 'pen'
      stroke(pointer.x, pointer.y)
      wake()
    }
    const onDown = (e: PointerEvent) => {
      locate(e)
      pointer.hasLast = false
      stroke(pointer.x, pointer.y)
      wake()
    }
    const onLeave = () => {
      pointer.inside = false
      pointer.hasLast = false
      wake()
    }

    let resizeTimer = 0
    const resize = new ResizeObserver(() => {
      window.clearTimeout(resizeTimer)
      resizeTimer = window.setTimeout(build, 120)
    })
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      if (visible) wake()
    })

    build()
    canvas.addEventListener('pointermove', onMove)
    canvas.addEventListener('pointerdown', onDown)
    canvas.addEventListener('pointerleave', onLeave)
    canvas.addEventListener('pointercancel', onLeave)
    dark.addEventListener('change', build)
    resize.observe(canvas)
    observer.observe(canvas)

    return () => {
      cancelAnimationFrame(raf)
      window.clearTimeout(resizeTimer)
      canvas.removeEventListener('pointermove', onMove)
      canvas.removeEventListener('pointerdown', onDown)
      canvas.removeEventListener('pointerleave', onLeave)
      canvas.removeEventListener('pointercancel', onLeave)
      dark.removeEventListener('change', build)
      resize.disconnect()
      observer.disconnect()
    }
  }, [])

  return (
    <figure className="art">
      <canvas
        ref={canvasRef}
        className="art__canvas"
        role="img"
        aria-label="Ink painting of the Blue Ridge Mountains. Moving the pointer across it brings out the color."
      />
      <figcaption className="art__caption">
        The Blue Ridge, outside Charlottesville. Move across it to bring back the color.
      </figcaption>
    </figure>
  )
}
