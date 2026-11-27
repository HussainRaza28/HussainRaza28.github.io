/* A health-event trace: a monitor fails, the event fires, the probe restarts it. */
const LANES = ['CloudWatch agent', 'GPU monitor', 'Trainium monitor']

const beat = (y: number, from: number, to: number) => {
  let d = `M${from} ${y}`
  for (let x = from; x < to; x += 40) d += ` L${x + 14} ${y} L${x + 18} ${y - 9} L${x + 22} ${y + 6} L${x + 26} ${y} L${Math.min(to, x + 40)} ${y}`
  return d
}

export default function CloudWatchArt({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`cw-art${compact ? ' cw-art--compact' : ''}`} role="img" aria-label="Illustration: a health trace where a GPU monitor fails, a health event fires right away, and the liveness probe restarts it about 50 seconds later">
      <div className="cw-art__panel" aria-hidden="true">
        <div className="cw-art__bar"><i /><i /><i /><span>Health events</span></div>
        <svg viewBox="0 0 560 270" focusable="false">
          {LANES.map((lane, i) => {
            const y = 60 + i * 70
            return (
              <g key={lane}>
                {!compact && <text className="cw-art__lane" x="16" y={y - 22}>{lane}</text>}
                <line className="cw-art__track" x1="16" x2="544" y1={y} y2={y} />
                {i === 1 ? (
                  <>
                    <path className="cw-art__ok" d={beat(y, 16, 236)} />
                    <path className="cw-art__bad" d={`M236 ${y} L246 ${y + 18} L330 ${y + 18} L340 ${y}`} />
                    <path className="cw-art__ok" d={beat(y, 340, 544)} />
                  </>
                ) : (
                  <path className="cw-art__ok" d={beat(y, 16, 544)} />
                )}
              </g>
            )
          })}
          <line className="cw-art__pin cw-art__pin--event" x1="244" x2="244" y1="34" y2="238" />
          <line className="cw-art__pin cw-art__pin--restart" x1="338" x2="338" y1="34" y2="238" />
          <circle className="cw-art__dot cw-art__dot--event" cx="244" cy="148" r="6" />
          <circle className="cw-art__dot cw-art__dot--restart" cx="338" cy="130" r="6" />
          {!compact && (
            <>
              <g className="cw-art__axis">
                {['0s', '30s', '60s', '90s', '120s'].map((t, i) => (
                  <text key={t} x={16 + i * 128} y="262">{t}</text>
                ))}
              </g>
            </>
          )}
        </svg>
        {!compact && (
          <div className="cw-art__events">
            <span className="tag tag--event">Health event · Unhealthy</span>
            <span className="tag tag--restart">Probe restart · ~50 s</span>
          </div>
        )}
      </div>
    </div>
  )
}
