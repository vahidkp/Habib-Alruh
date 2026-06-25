/* eslint-disable @next/next/no-img-element */

const LOGOS = [
  { src: '/press/vogue.svg', alt: 'Vogue', h: 'h-5 md:h-6' },
  { src: '/press/gq.svg', alt: 'GQ', h: 'h-7 md:h-8' },
  { src: '/press/elle.svg', alt: 'ELLE', h: 'h-4 md:h-5' },
  { src: '/press/harpers-bazaar.svg', alt: "Harper's Bazaar", h: 'h-4 md:h-5' },
  { src: '/press/cosmopolitan.svg', alt: 'Cosmopolitan', h: 'h-4 md:h-5' },
  { src: '/press/esquire.svg', alt: 'Esquire', h: 'h-5 md:h-6' },
  { src: '/press/marie-claire.svg', alt: 'Marie Claire', h: 'h-4 md:h-5' },
  { src: '/press/vanity-fair.svg', alt: 'Vanity Fair', h: 'h-5 md:h-6' },
]

export function PressBanner() {
  return (
    <section className="border-y border-black/10 bg-surface py-10">
      <div className="container-site flex flex-col items-center gap-6 md:flex-row md:gap-10">
        <span className="eyebrow shrink-0 text-taupe">As Seen In —</span>
        <div className="no-scrollbar flex w-full items-center gap-10 overflow-x-auto md:justify-between">
          {LOGOS.map((logo) => (
            <img
              key={logo.alt}
              src={logo.src}
              alt={logo.alt}
              loading="lazy"
              className={`${logo.h} w-auto shrink-0 opacity-50 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
