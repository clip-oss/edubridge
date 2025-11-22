import { Hero } from '@/components/marketing/Hero'
import { Features } from '@/components/marketing/Features'
import { Pricing } from '@/components/marketing/Pricing'
import { CTASection } from '@/components/marketing/CTASection'
import { Footer } from '@/components/marketing/Footer'
import { Navbar } from '@/components/shared/Navbar'

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Features />
      <Pricing />
      <CTASection />
      <Footer />
    </div>
  )
}
