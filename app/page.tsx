/**
 * Memory Layer Landing Page
 * Built with Kiro for Kiroween 2025 🎃
 */

import { Navbar } from '@/components/navbar'
import { Hero } from '@/components/hero'
import Problem from '@/components/problem'
import Solution from '@/components/solution'
import { Features } from '@/components/features'
import HowItWorks from '@/components/how-it-works'
import { Pricing } from '@/components/pricing'
import { CTA } from '@/components/cta'

export default function Home() {
  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-gradient-to-b from-purple-900 via-purple-800 to-orange-900">
      <Navbar />
      <main>
        <Hero />
        <Problem />
        <Solution />
        <Features />
        <HowItWorks />
        <Pricing />
        <CTA />
      </main>
      <footer className="border-t border-purple-700/50 py-8 bg-purple-900/50">
        <div className="container mx-auto px-4 text-center text-purple-300">
          <p className="mb-2">© 2025 Memory Layer. Built with Kiro AI IDE for Kiroween 2025 🎃</p>
          <p className="text-sm text-purple-400">
            Open Source • MIT Licensed • Never Lose Context Again
          </p>
        </div>
      </footer>
    </div>
  )
}
