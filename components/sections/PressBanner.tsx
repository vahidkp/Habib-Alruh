/* eslint-disable @next/next/no-img-element */

const LOGOS = [
  { src: '/press/vogue.svg', alt: 'Vogue', h: 'h-6 md:h-7' },
  { src: '/press/gq.svg', alt: 'GQ', h: 'h-8 md:h-9' },
  { src: '/press/elle.svg', alt: 'ELLE', h: 'h-5 md:h-6' },
  { src: '/press/harpers-bazaar.svg', alt: "Harper's Bazaar", h: 'h-5 md:h-6' },
  { src: '/press/cosmopolitan.svg', alt: 'Cosmopolitan', h: 'h-5 md:h-6' },
  { src: '/press/esquire.svg', alt: 'Esquire', h: 'h-6 md:h-7' },
  { src: '/press/marie-claire.svg', alt: 'Marie Claire', h: 'h-5 md:h-6' },
  { src: '/press/vanity-fair.svg', alt: 'Vanity Fair', h: 'h-6 md:h-7' },
]

function Row({ reverse = false, muted = false }: { reverse?: boolean; muted?: boolean }) {
  const track = [...LOGOS, ...LOGOS]
  return (
    <div className="group relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]">
      <div
        className={`flex w-max animate-marquee items-center gap-14 pr-14 [animation-duration:40s] group-hover:[animation-play-state:paused] md:gap-20 md:pr-20 ${
          reverse ? '[animation-direction:reverse]' : ''
        }`}
      >
        {track.map((logo, i) => (
          <img
            key={`${logo.alt}-${i}`}
            src={logo.src}
            alt={i < LOGOS.length ? logo.alt : ''}
            aria-hidden={i >= LOGOS.length}
            loading="lazy"
            className={`${logo.h} w-auto shrink-0 transition-opacity duration-300 ${
              muted ? 'opacity-40 grayscale hover:opacity-100 hover:grayscale-0' : 'opacity-85 hover:opacity-100'
            }`}
          />
        ))}
      </div>
    </div>
  )
}

export function PressBanner() {
  return (
    <section className="overflow-hidden border-y border-black/10 bg-surface py-12">
      <p className="eyebrow mb-8 text-center text-taupe">As Seen On</p>
      <div className="space-y-6">
        <Row />
        <Row reverse />
      </div>
    </section>
  )
}
