import { Hero } from '@/components/marketing/Hero'
import { Marquee } from '@/components/marketing/Marquee'
import { BentoGrid } from '@/components/marketing/BentoGrid'
import { Stats } from '@/components/marketing/Stats'
import { Pricing } from '@/components/marketing/Pricing'
import { CTASection } from '@/components/marketing/CTASection'
import { Footer } from '@/components/marketing/Footer'
import { Navbar } from '@/components/shared/Navbar'

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <Navbar />
      <Hero />
      <Marquee />
      <BentoGrid />
      <Stats />
      <Pricing />
      <CTASection />
      <Footer />
    </div>
  )
}
