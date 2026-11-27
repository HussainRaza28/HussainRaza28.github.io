/*
 * POST /api/tailor
 * Body: { "jobDescription": string }
 * Returns: { "summary": string, "bullets": string[], "placeholder": true }
 *
 * The generation step is stubbed and returns stand-in text until a
 * provider is chosen. When it is wired up, read the key from an
 * environment variable inside this function only; it must never be
 * exposed to client code.
 */

/* Keep these in step with src/lib/tailor.ts, which the form reads. */
const TAILOR_MIN_CHARS = 100
const TAILOR_MAX_CHARS = 6000

type TailorResult = { summary: string; bullets: string[]; placeholder?: boolean }
type TailorError = { error: string }

/* Request bodies larger than this are rejected before parsing. */
const MAX_BODY_BYTES = 32 * 1024

/* Basic per-IP rate limit: RATE_LIMIT requests per RATE_WINDOW_MS.
   Kept in memory, so it is per function instance and resets on a
   cold start. Good enough to stop casual abuse; swap for a shared
   store before relying on it. */
const RATE_LIMIT = 5
const RATE_WINDOW_MS = 60_000
const hits = new Map<string, number[]>()

function rateLimit(ip: string, now = Date.now()): { ok: true } | { ok: false; retryAfter: number } {
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS)
  if (recent.length >= RATE_LIMIT) {
    hits.set(ip, recent)
    return { ok: false, retryAfter: Math.ceil((RATE_WINDOW_MS - (now - recent[0])) / 1000) }
  }
  recent.push(now)
  hits.set(ip, recent)
  if (hits.size > 5000) {
    for (const [key, times] of hits) if (times.every((t) => now - t >= RATE_WINDOW_MS)) hits.delete(key)
  }
  return { ok: true }
}

function json(body: TailorResult | TailorError, status = 200, headers: Record<string, string> = {}) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store', ...headers },
  })
}

function clientIp(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for')
  return forwarded?.split(',')[0]?.trim() || request.headers.get('x-real-ip') || 'unknown'
}

/* Stand-in for the real generation step. */
async function generate(jobDescription: string): Promise<TailorResult> {
  void jobDescription
  return {
    summary: 'Placeholder summary. Tailored output will appear here once the backend is connected.',
    bullets: [
      'Placeholder bullet one.',
      'Placeholder bullet two.',
      'Placeholder bullet three.',
    ],
    placeholder: true,
  }
}

export async function POST(request: Request): Promise<Response> {
  const limited = rateLimit(clientIp(request))
  if (!limited.ok) {
    return json({ error: 'Too many requests. Please wait a minute and try again.' }, 429, {
      'Retry-After': String(limited.retryAfter),
    })
  }

  if (!request.headers.get('content-type')?.includes('application/json')) {
    return json({ error: 'Send the job description as JSON.' }, 415)
  }

  const declared = Number(request.headers.get('content-length') ?? 0)
  if (declared > MAX_BODY_BYTES) return json({ error: 'The request is too large.' }, 413)

  const raw = await request.text()
  if (new TextEncoder().encode(raw).length > MAX_BODY_BYTES) {
    return json({ error: 'The request is too large.' }, 413)
  }

  let jobDescription: unknown
  try {
    jobDescription = (JSON.parse(raw) as { jobDescription?: unknown }).jobDescription
  } catch {
    return json({ error: 'The request body is not valid JSON.' }, 400)
  }

  if (typeof jobDescription !== 'string') {
    return json({ error: 'jobDescription must be a string.' }, 400)
  }
  const text = jobDescription.trim()
  if (text.length < TAILOR_MIN_CHARS) {
    return json({ error: `The job description needs at least ${TAILOR_MIN_CHARS} characters.` }, 400)
  }
  if (text.length > TAILOR_MAX_CHARS) {
    return json({ error: `The job description can be at most ${TAILOR_MAX_CHARS} characters.` }, 400)
  }

  return json(await generate(text))
}

export function GET(): Response {
  return json({ error: 'Use POST.' }, 405, { Allow: 'POST' })
}
