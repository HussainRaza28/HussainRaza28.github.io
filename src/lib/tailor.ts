/* Shared by the tailor form and api/tailor.ts so both enforce the same limits. */

/** Flip to true once api/tailor.ts calls a real backend. */
export const TAILOR_LIVE = false

export const TAILOR_MIN_CHARS = 100
export const TAILOR_MAX_CHARS = 6000

export type TailorResult = {
  summary: string
  bullets: string[]
  /** True while the endpoint returns stand-in output. */
  placeholder?: boolean
}

export type TailorError = { error: string }
