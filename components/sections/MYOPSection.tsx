import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { EditorialImage } from '@/components/ui/EditorialImage'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { Reveal } from '@/components/ui/Reveal'

export function MYOPSection() {
  return (
    <section className="section-pad border-t border-black/[0.08] bg-ivory">
      <div className="container-site">
        <Reveal className="mb-10 text-center">
          <p className="eyebrow mb-2 text-gold">Awaken</p>
          <SectionHeader lead="Your" trail="Olfactory Senses" align="center" />
          <p className="mx-auto mt-3 max-w-lg text-taupe">
            Step into our studio and compose a fragrance that is entirely, only yours.
          </p>
        </Reveal>

        <Reveal>
          <div className="relative aspect-[16/9] overflow-hidden rounded-card md:aspect-[21/9]">
            <EditorialImage seed="myop-studio" rounded={false} className="h-full w-full" label="The Studio" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent" />
            <div className="absolute bottom-0 p-8 text-white md:p-12">
              <h3 className="font-display text-3xl md:text-4xl">Make Your Own Perfume</h3>
              <Link href="/products?collection=studio" className="mt-4 inline-block">
                <Button variant="gold" size="md">Visit Our Studio</Button>
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
