import { Navbar, Hero, SocialProof, Features, HowItWorks, Testimonials, Pricing, CTASection, Footer } from '../components/landing'

export default function Landing() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100">
      <Navbar />
      <main>
        <Hero />
        <SocialProof />
        <Features />
        <HowItWorks />
        <Testimonials />
        <Pricing />
        <CTASection />
      </main>
      <Footer />
    </div>
  )
}
