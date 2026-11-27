import { useId, useState, type FormEvent } from 'react'
import { Sparkles } from 'lucide-react'
import { tailor } from '@/data/content'
import {
  TAILOR_LIVE,
  TAILOR_MAX_CHARS,
  TAILOR_MIN_CHARS,
  type TailorError,
  type TailorResult,
} from '@/lib/tailor'
import Section from './Section'

type Status = 'idle' | 'loading' | 'done' | 'error'

const numberFormat = new Intl.NumberFormat('en-US')

export default function Tailor({ index }: { index: number }) {
  const [text, setText] = useState('')
  const [status, setStatus] = useState<Status>('idle')
  const [result, setResult] = useState<TailorResult | null>(null)
  const [error, setError] = useState('')
  const fieldId = useId()
  const hintId = useId()
  const counterId = useId()

  const length = text.trim().length
  const tooShort = length < TAILOR_MIN_CHARS
  const canSubmit = TAILOR_LIVE && !tooShort && status !== 'loading'

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!canSubmit) return
    setStatus('loading')
    setError('')
    try {
      const response = await fetch('/api/tailor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ jobDescription: text.trim() }),
      })
      const data = (await response.json()) as TailorResult | TailorError
      if (!response.ok || 'error' in data) {
        throw new Error('error' in data ? data.error : 'Something went wrong. Please try again.')
      }
      setResult(data)
      setStatus('done')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
      setStatus('error')
    }
  }

  return (
    <Section id="tailor" index={index} title="Resume tailor">
      <form className="tailor" onSubmit={onSubmit} data-reveal noValidate>
        <div className="tailor__head">
          <h3 className="tailor__title">{tailor.title}</h3>
          {!TAILOR_LIVE && (
            <span className="badge">
              <Sparkles aria-hidden="true" /> Coming soon
            </span>
          )}
        </div>
        <p className="tailor__intro" id={hintId}>{tailor.intro}</p>

        <div className="tailor__body">
          <div className="field">
            <label className="field__label" htmlFor={fieldId}>Job description</label>
            <textarea
              id={fieldId}
              className="textarea"
              value={text}
              onChange={(event) => setText(event.target.value)}
              placeholder={tailor.placeholder}
              maxLength={TAILOR_MAX_CHARS}
              aria-describedby={`${hintId} ${counterId}`}
              spellCheck
            />
            <div className="field__foot">
              <span className="counter" id={counterId} aria-live="polite">
                {numberFormat.format(text.length)} / {numberFormat.format(TAILOR_MAX_CHARS)} characters
              </span>
              <button
                type="submit"
                className="btn btn--primary"
                disabled={!canSubmit}
                aria-describedby={TAILOR_LIVE ? undefined : 'tailor-status'}
              >
                {status === 'loading' ? 'Tailoring…' : 'Tailor resume'}
              </button>
            </div>
          </div>

          <div className="output" aria-live="polite" aria-busy={status === 'loading'}>
            <p className="output__label">Tailored summary</p>
            {result ? (
              <p className="output__summary">{result.summary}</p>
            ) : (
              <div className="output__lines" aria-hidden="true">
                <span className="skeleton" />
                <span className="skeleton" style={{ width: '92%' }} />
                <span className="skeleton" style={{ width: '64%' }} />
              </div>
            )}
            <p className="output__label">Suggested bullets</p>
            {result ? (
              <ul className="output__bullets output__bullets--text">
                {result.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
              </ul>
            ) : (
              <ul className="output__bullets" aria-hidden="true">
                {[88, 76, 82].map((width) => (
                  <li key={width}><span className="skeleton" style={{ width: `${width}%` }} /></li>
                ))}
              </ul>
            )}
            {status === 'error' && <p className="output__error" role="alert">{error}</p>}
            {!TAILOR_LIVE && <p className="output__note" id="tailor-status">{tailor.comingSoon}</p>}
            {TAILOR_LIVE && !result && tooShort && length > 0 && (
              <p className="output__note">
                Add a bit more of the job description (at least {TAILOR_MIN_CHARS} characters).
              </p>
            )}
          </div>
        </div>
      </form>
    </Section>
  )
}
