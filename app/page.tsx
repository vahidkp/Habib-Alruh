import { HeroCarousel } from '@/components/sections/HeroCarousel'
import { BestsellersStrip } from '@/components/sections/BestsellersStrip'
import { PromoBanner } from '@/components/sections/PromoBanner'
import { FootprintBanner } from '@/components/sections/FootprintBanner'
import { SignatureSeries } from '@/components/sections/SignatureSeries'
import { LuxeCollection } from '@/components/sections/LuxeCollection'
import { GiftCTA } from '@/components/sections/GiftCTA'
import { ShopByGender } from '@/components/sections/ShopByGender'
import { MYOPSection } from '@/components/sections/MYOPSection'
import { PressBanner } from '@/components/sections/PressBanner'
import { BrandStory } from '@/components/sections/BrandStory'
import { JournalStrip } from '@/components/sections/JournalStrip'
import { ReviewsBanner } from '@/components/sections/ReviewsBanner'
import { TrustStrip } from '@/components/sections/TrustStrip'

export default function HomePage() {
  return (
    <>
      <HeroCarousel />
      <BestsellersStrip />
      <PromoBanner />
      <FootprintBanner />
      <SignatureSeries />
      <LuxeCollection />
      <GiftCTA />
      <ShopByGender />
      <MYOPSection />
      <PressBanner />
      <BrandStory />
      <JournalStrip />
      <ReviewsBanner />
      <TrustStrip />
    </>
  )
}
