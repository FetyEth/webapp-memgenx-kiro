/**
 * Hero Component
 * Built with Kiro for Kiroween 2025 🎃
 */

'use client'

import { Button } from '@/components/ui/button'

export function Hero() {
  return (
    <section className="pt-32 pb-20 px-4 relative overflow-hidden">
      {/* Decorative Icons */}
      <div className="absolute left-10 top-40 text-blue-500 text-5xl opacity-50 animate-pulse">
        🧠
      </div>
      <div className="absolute right-10 top-40 text-blue-500 text-5xl opacity-50 animate-pulse">
        ⚡
      </div>

      <div className="container mx-auto text-center max-w-5xl">
        {/* Main Headline */}
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight text-white">
          Unified Memory for all your{' '}
          <span className="text-blue-500">LLMs, Agents & AI apps</span>
        </h1>

        {/* Subheading */}
        <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-3xl mx-auto leading-relaxed">
          Seamlessly sync conversations across ChatGPT, Claude, Gemini, and more. One memory, infinite possibilities. Build smarter AI experiences that remember context across all your tools.
        </p>

        {/* CTA Button */}
        <div className="flex justify-center">
          <Button 
            size="lg" 
            className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-8 py-6 rounded-full font-medium shadow-lg shadow-blue-600/50 transition-all hover:shadow-xl hover:shadow-blue-600/60 hover:scale-105"
          >
            Store Your Memory Now →
          </Button>
        </div>
      </div>
    </section>
  )
}
