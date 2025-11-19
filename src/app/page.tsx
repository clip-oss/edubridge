import { Hero } from '@/components/marketing/Hero';
import { Features } from '@/components/marketing/Features';
import { Stats } from '@/components/marketing/Stats';
import { HowItWorks } from '@/components/marketing/HowItWorks';
import { Pricing } from '@/components/marketing/Pricing';
import { Testimonials } from '@/components/marketing/Testimonials';
import { SchoolLogos } from '@/components/marketing/SchoolLogos';
import { FAQ } from '@/components/marketing/FAQ';
import { CTASection } from '@/components/marketing/CTASection';
import { Navbar } from '@/components/shared/Navbar';
import { Footer } from '@/components/marketing/Footer';

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <SchoolLogos />
        <Features />
        <Stats />
        <HowItWorks />
        <Pricing />
        <Testimonials />
        <FAQ />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
