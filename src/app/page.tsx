import { Hero } from '@/components/marketing/Hero'
import { LogoScroll } from '@/components/marketing/LogoScroll'
import { ProblemSolution } from '@/components/marketing/ProblemSolution'
import { Features } from '@/components/marketing/Features'
import { Timeline } from '@/components/marketing/Timeline'
import { Pricing } from '@/components/marketing/Pricing'
import { FAQ } from '@/components/marketing/FAQ'
import { CTASection } from '@/components/marketing/CTASection'
import { Footer } from '@/components/marketing/Footer'
import { Navbar } from '@/components/shared/Navbar'

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <LogoScroll />
      <ProblemSolution />
      <Features />
      <Timeline />
      <Pricing />
      <FAQ />
      <CTASection />
      <Footer />
    </div>
  )
}
