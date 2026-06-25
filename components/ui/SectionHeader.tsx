import { cn } from '@/lib/utils'

/** Mixed-colour eyebrow headline used across the homepage (e.g. DISCOVER / OUR BESTSELLERS) */
export function SectionHeader({
  lead,
  trail,
  align = 'left',
  light = false,
  className,
}: {
  lead: string
  trail: string
  align?: 'left' | 'center'
  light?: boolean
  className?: string
}) {
  return (
    <h2
      className={cn(
        'font-display text-3xl leading-tight md:text-[42px]',
        align === 'center' ? 'text-center' : 'text-left',
        className,
      )}
    >
      <span className="text-gold">{lead} </span>
      <span className={light ? 'text-white' : 'text-ink'}>{trail}</span>
    </h2>
  )
}
