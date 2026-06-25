import type { Metadata } from 'next'
import { Playfair_Display, Inter, Cormorant_Garamond, Bebas_Neue } from 'next/font/google'
import './globals.css'
import { AnnouncementBar } from '@/components/shared/AnnouncementBar'
import { Navbar } from '@/components/shared/Navbar'
import { Footer } from '@/components/shared/Footer'
import { CartDrawer } from '@/components/shared/CartDrawer'
import { WhatsAppCta } from '@/components/shared/WhatsAppCta'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
})
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})
const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-accent',
  display: 'swap',
})
// Temporary stand-in for Round 8 (all-caps geometric display). Slotted just
// behind 'Round 8' in the font stack, so the real font takes over the moment
// /public/fonts/round-8.woff2 is added.
const roundAlt = Bebas_Neue({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-round-alt',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://habibalruh.ae'),
  title: {
    default: 'Habib Alruh — Luxury Fragrances for Him & Her | UAE',
    template: '%s — Habib Alruh',
  },
  description:
    'Discover handcrafted luxury perfumes by Habib Alruh. Shop our signature, fresh, floral, and woody collections. Free delivery across the UAE on orders over AED 200.',
  keywords: ['luxury perfume UAE', 'fragrance Dubai', 'attar', 'oud', 'perfume Abu Dhabi', 'Habib Alruh'],
  openGraph: {
    title: 'Habib Alruh — Luxury Fragrances | UAE',
    description: 'Handcrafted luxury perfumes, composed in small batches. Delivered across the UAE.',
    type: 'website',
    locale: 'en_AE',
  },
}

const orgJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Habib Alruh',
  url: 'https://habibalruh.ae',
  description: 'Handcrafted luxury fragrances for him and her, based in the UAE.',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Dubai',
    addressCountry: 'AE',
  },
  areaServed: 'AE',
  sameAs: ['https://instagram.com', 'https://facebook.com'],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable} ${cormorant.variable} ${roundAlt.variable}`}>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded focus:bg-gold focus:px-4 focus:py-2 focus:text-ink"
        >
          Skip to content
        </a>
        <AnnouncementBar />
        <Navbar />
        <CartDrawer />
        <main id="main">{children}</main>
        <Footer />
        <WhatsAppCta />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
      </body>
    </html>
  )
}
