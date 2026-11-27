import CloudWatchArt from './CloudWatchArt'
import SkypaneArt from './SkypaneArt'
import TailorArt from './TailorArt'

const ART = { cloudwatch: CloudWatchArt, tailor: TailorArt, skypane: SkypaneArt }

/** The distinctive visual for each case study. `compact` drops the labels for small previews. */
export default function CaseArt({ slug, compact = false }: { slug: string; compact?: boolean }) {
  const Art = ART[slug as keyof typeof ART]
  return Art ? <Art compact={compact} /> : null
}
