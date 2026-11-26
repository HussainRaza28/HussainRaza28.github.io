import { useEffect, useRef } from 'react'

const RADIUS = 50
const GAP = 0.19
const EYE_WIDTH = 9
const EYE_HEIGHT = 15
const BLINK_MS = 160
const DAMPING = 0.34 - 0.22 * 0.3
const STIFFNESS = 0.06

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value))

/* A ball in the hero that turns to follow the pointer anywhere on the page.
   The eyes are points on the ball's surface, not stickers on top:
   the far eye narrows as the ball turns away from the pointer. */
export default function EyeTracker() {
  const rootRef = useRef<HTMLDivElement>(null)
  const eyeRefs = useRef<(SVGGElement | null)[]>([])
  const rectRefs = useRef<(SVGRectElement | null)[]>([])

  useEffect(() => {
    const root = rootRef.current
    if (!root) return

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    let reducedMotion = motionQuery.matches
    const turn = { x: 0, y: 0, vx: 0, vy: 0, tx: 0, ty: 0 }
    let animationFrame = 0
    let lastFrame = 0
    let blinkStart = 0
    let nextBlink = performance.now() + 2200
    let visible = true

    const drawEyes = (now: number) => {
      if (now > nextBlink) {
        blinkStart = now
        nextBlink = now + 2600 + Math.random() * 3200
      }

      const blinkProgress = (now - blinkStart) / BLINK_MS
      const lid = blinkProgress >= 0 && blinkProgress < 1
        ? 1 - 0.9 * Math.sin(blinkProgress * Math.PI)
        : 1
      const yaw = Math.asin(clamp(turn.x, -0.92, 0.92))
      const pitch = -Math.asin(clamp(turn.y, -0.92, 0.92))
      const cosYaw = Math.cos(yaw)
      const sinYaw = Math.sin(yaw)
      const cosPitch = Math.cos(pitch)
      const sinPitch = Math.sin(pitch)
      const tilt = 64 * turn.x * turn.y

      ;[-GAP, GAP].forEach((x0, index) => {
        const eye = eyeRefs.current[index]
        const rect = rectRefs.current[index]
        if (!eye || !rect) return

        const z0 = Math.sqrt(1 - x0 * x0)
        const x1 = x0 * cosYaw + z0 * sinYaw
        const z1 = -x0 * sinYaw + z0 * cosYaw
        const y2 = -z1 * sinPitch
        const z2 = z1 * cosPitch
        const near = clamp(z2, 0, 1)
        const scale = 0.45 + 0.55 * near
        const width = EYE_WIDTH * scale * (0.7 + 0.3 * near)
        const height = Math.max(0.6, EYE_HEIGHT * scale * lid)

        rect.setAttribute('x', (-width / 2).toFixed(2))
        rect.setAttribute('y', (-height / 2).toFixed(2))
        rect.setAttribute('width', width.toFixed(2))
        rect.setAttribute('height', height.toFixed(2))
        rect.setAttribute('rx', Math.min(4.5, width / 2, height / 2).toFixed(2))
        eye.setAttribute(
          'transform',
          `translate(${(50 + x1 * RADIUS).toFixed(2)} ${(50 + y2 * RADIUS).toFixed(2)}) rotate(${tilt.toFixed(2)})`,
        )
        eye.style.opacity = z2 < 0.05 ? '0' : '1'
      })
    }

    const animate = (now: number) => {
      if (!visible || document.hidden) {
        animationFrame = 0
        lastFrame = 0
        return
      }

      const delta = lastFrame ? Math.min(2.5, (now - lastFrame) / 16.67) : 1
      lastFrame = now
      if (reducedMotion) {
        turn.x = turn.tx
        turn.y = turn.ty
      } else {
        turn.vx += ((turn.tx - turn.x) * STIFFNESS - turn.vx * DAMPING) * delta
        turn.vy += ((turn.ty - turn.y) * STIFFNESS - turn.vy * DAMPING) * delta
        turn.x += turn.vx * delta
        turn.y += turn.vy * delta
      }

      drawEyes(now)
      animationFrame = requestAnimationFrame(animate)
    }

    const resumeAnimation = () => {
      if (!animationFrame && visible && !document.hidden) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    /* Aim against the whole viewport so the eyes follow the pointer
       anywhere on the page, then spring back when it leaves. */
    const onPointerMove = (event: PointerEvent) => {
      const bounds = root.getBoundingClientRect()
      const dx = event.clientX - (bounds.left + bounds.width / 2)
      const dy = event.clientY - (bounds.top + bounds.height / 2)
      const distance = Math.hypot(dx, dy) || 1
      const reach = Math.max(60, Math.min(window.innerWidth, window.innerHeight) * 0.28)
      const amount = Math.min(0.85, Math.tanh(distance / reach) * 0.9)
      turn.tx = (dx / distance) * amount
      turn.ty = (dy / distance) * amount
    }

    const onPointerLeave = () => {
      turn.tx = 0
      turn.ty = 0
    }

    const onMotionChange = (event: MediaQueryListEvent) => {
      reducedMotion = event.matches
      turn.vx = 0
      turn.vy = 0
    }

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      resumeAnimation()
    })

    window.addEventListener('pointermove', onPointerMove, { passive: true })
    document.documentElement.addEventListener('pointerleave', onPointerLeave)
    document.addEventListener('visibilitychange', resumeAnimation)
    motionQuery.addEventListener('change', onMotionChange)
    observer.observe(root)
    animationFrame = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(animationFrame)
      observer.disconnect()
      window.removeEventListener('pointermove', onPointerMove)
      document.documentElement.removeEventListener('pointerleave', onPointerLeave)
      document.removeEventListener('visibilitychange', resumeAnimation)
      motionQuery.removeEventListener('change', onMotionChange)
    }
  }, [])

  return (
    <div className="hero-eye-tracker" aria-hidden="true" ref={rootRef}>
      <svg className="hero-eye-ball" viewBox="0 0 100 100">
        <path
          className="hero-eye-body"
          d="M30 6 H70 A24 24 0 0 1 94 30 V70 A24 24 0 0 1 70 94 H30 A24 24 0 0 1 6 70 V30 A24 24 0 0 1 30 6 Z"
        />
        <g className="hero-eye-pair">
          {[0, 1].map((index) => (
            <g key={index} ref={(el) => { eyeRefs.current[index] = el }}>
              <rect
                ref={(el) => { rectRefs.current[index] = el }}
                className="hero-eye"
                x="-4.5"
                y="-7.5"
                width="9"
                height="15"
                rx="4.5"
              />
            </g>
          ))}
        </g>
      </svg>
    </div>
  )
}
