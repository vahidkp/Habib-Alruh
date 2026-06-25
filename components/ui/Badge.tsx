import { cn } from '@/lib/utils'

type Tone = 'new' | 'bestseller' | 'limited' | 'sale' | 'store'

const tones: Record<Tone, string> = {
  new: 'bg-gold text-ink',
  bestseller: 'bg-ink text-white',
  limited: 'bg-amber text-ink',
  sale: 'bg-[#b4453a] text-white',
  store: 'bg-white text-ink',
}

const labels: Record<Tone, string> = {
  new: 'New Arrival',
  bestseller: 'Bestseller',
  limited: 'Limited',
  sale: 'Sale',
  store: 'Store',
}

export function Badge({ tone, children }: { tone: Tone; children?: React.ReactNode }) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-button px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em]',
        tones[tone],
      )}
    >
      {children ?? labels[tone]}
    </span>
  )
}
