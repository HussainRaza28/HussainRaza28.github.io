/* Two résumé pages: one bullet rewritten, one kept, one blocked. */
export default function TailorArt({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`tailor-art${compact ? ' tailor-art--compact' : ''}`} role="img" aria-label="Illustration: résumé pages with one bullet rewritten for a job posting, one kept as written, and one blocked for adding a skill that was not in the original">
      <div className="tailor-art__sheet tailor-art__sheet--back" aria-hidden="true">
        <i className="w-40 h" /><i className="w-90" /><i className="w-80" /><i className="w-85" /><i className="w-60" /><i className="w-90" /><i className="w-70" />
      </div>
      <div className="tailor-art__sheet tailor-art__sheet--front" aria-hidden="true">
        <i className="w-45 h name" />
        <i className="w-70 sub" />
        <i className="w-25 head" />
        <div className="tailor-art__row is-rewritten"><b /><i className="w-85" /></div>
        <div className="tailor-art__row is-kept"><b /><i className="w-75" /></div>
        <div className="tailor-art__row is-blocked"><b /><i className="w-80" /></div>
        <i className="w-25 head" />
        <div className="tailor-art__row"><b /><i className="w-70" /></div>
        <div className="tailor-art__row"><b /><i className="w-60" /></div>
      </div>
      {!compact && (
        <div className="tailor-art__notes" aria-hidden="true">
          <span className="note note--rewritten">Rewritten for the posting</span>
          <span className="note note--kept">Kept as written</span>
          <span className="note note--blocked">Blocked: skill not in original</span>
          <span className="tailor-art__chip">One-page PDF</span>
        </div>
      )}
    </div>
  )
}
