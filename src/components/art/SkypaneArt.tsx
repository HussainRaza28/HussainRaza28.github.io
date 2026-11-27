/* A frosted weather window floating in a storm. */
export default function SkypaneArt({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`sky-art${compact ? ' sky-art--compact' : ''}`} role="img" aria-label="Illustration: a frosted Skypane weather window with a cloud and falling rain">
      <svg className="sky-art__storm" viewBox="0 0 600 450" aria-hidden="true" focusable="false">
        <defs>
          <radialGradient id="sky-puff" cx="50%" cy="40%" r="60%">
            <stop offset="0" stopColor="#d9d3ff" />
            <stop offset="1" stopColor="#6f63b8" stopOpacity="0.2" />
          </radialGradient>
          <filter id="sky-soft" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="6" />
          </filter>
        </defs>
        <g filter="url(#sky-soft)" opacity="0.85">
          <ellipse cx="78" cy="250" rx="70" ry="30" fill="url(#sky-puff)" />
          <ellipse cx="112" cy="236" rx="46" ry="32" fill="url(#sky-puff)" />
          <ellipse cx="492" cy="118" rx="70" ry="30" fill="url(#sky-puff)" />
          <ellipse cx="524" cy="102" rx="42" ry="32" fill="url(#sky-puff)" />
        </g>
        <g className="sky-art__rain" stroke="#b9b2ff" strokeWidth="1.6" strokeLinecap="round" opacity="0.55">
          {[[60, 280], [88, 300], [112, 276], [138, 296], [466, 150], [494, 170], [518, 148], [540, 172], [486, 210], [70, 340]].map(([x, y], i) => (
            <line key={i} x1={x} y1={y} x2={x - 6} y2={y + 22} />
          ))}
        </g>
      </svg>
      <div className="sky-art__window">
        <div className="sky-art__chrome" aria-hidden="true"><i /><i /><i /></div>
        <svg className="sky-art__cloud" viewBox="0 0 320 200" aria-hidden="true" focusable="false">
          <defs>
            <radialGradient id="sky-cloud" cx="45%" cy="30%" r="75%">
              <stop offset="0" stopColor="#ffffff" />
              <stop offset="0.55" stopColor="#e4e0ff" />
              <stop offset="1" stopColor="#8f86d6" />
            </radialGradient>
          </defs>
          <g fill="url(#sky-cloud)">
            <circle cx="120" cy="92" r="44" />
            <circle cx="178" cy="72" r="58" />
            <circle cx="232" cy="100" r="38" />
            <rect x="80" y="92" width="190" height="46" rx="23" />
          </g>
          <g className="sky-art__drops" stroke="#d6d0ff" strokeWidth="2.2" strokeLinecap="round" opacity="0.8">
            {[110, 140, 170, 200, 230, 125, 185, 215].map((x, i) => (
              <line key={i} x1={x} y1={150 + (i % 3) * 8} x2={x - 5} y2={168 + (i % 3) * 8} />
            ))}
          </g>
        </svg>
        <div className="sky-art__readout" aria-hidden="true">
          <span className="sky-art__lines"><i /><i /><i /></span>
          <span className="sky-art__temp">72°</span>
        </div>
      </div>
      <div className="sky-art__floor" aria-hidden="true" />
    </div>
  )
}
