import Image from 'next/image'
import { cn } from '@/lib/utils'
import { IMAGES } from '@/lib/images'

/**
 * Renders a real photo from /public/images when one exists for `seed`
 * (see lib/images.ts manifest); otherwise falls back to a deterministic
 * moody gradient so unphotographed products/sections still read well.
 */
const palettes = [
  ['#2a1518', '#7a2d24', '#c9a84c'], // moody red / gold
  ['#1a1206', '#3d2c12', '#e8853a'], // amber desert
  ['#0e0e0e', '#26303a', '#8c7b6b'], // cool noir
  ['#13110c', '#4a3b1e', '#c9a84c'], // warm woody
  ['#221a12', '#5c4a32', '#e8c98a'], // sand
  ['#0a0a0a', '#2b2b2b', '#6b6b6b'], // greyscale
]

function hash(seed: string) {
  let h = 0
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) | 0
  return Math.abs(h)
}

export function EditorialImage({
  seed = 'habib',
  label,
  className,
  rounded = true,
  priority = false,
  sizes = '(max-width: 768px) 100vw, 50vw',
  imgClassName,
  children,
}: {
  seed?: string
  label?: string
  className?: string
  rounded?: boolean
  priority?: boolean
  sizes?: string
  imgClassName?: string
  children?: React.ReactNode
}) {
  if (IMAGES.has(seed)) {
    return (
      <div
        className={cn(
          'relative isolate overflow-hidden bg-ink',
          rounded && 'rounded-card',
          className,
        )}
      >
        <Image
          src={`/images/${seed}.jpg`}
          alt={label ?? ''}
          fill
          sizes={sizes}
          priority={priority}
          className={cn('object-cover', imgClassName)}
        />
        {children}
      </div>
    )
  }

  const [a, b, c] = palettes[hash(seed) % palettes.length]
  return (
    <div
      className={cn(
        'relative isolate flex items-center justify-center overflow-hidden',
        rounded && 'rounded-card',
        className,
      )}
      style={{
        background: `radial-gradient(130% 90% at 25% 15%, ${c}55, transparent 55%), linear-gradient(150deg, ${a}, ${b})`,
      }}
    >
      {label && (
        <span className="pointer-events-none select-none font-accent text-sm italic tracking-wide text-white/35">
          {label}
        </span>
      )}
      {children}
    </div>
  )
}
