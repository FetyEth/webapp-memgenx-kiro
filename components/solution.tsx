"use client"

import { Button } from '@/components/ui/button'

export default function Solution() {
  const benefits = [
    {
      icon: '🧠',
      title: 'AI-Powered Memory',
      description: 'Automatically captures and organizes every conversation across all your platforms.',
    },
    {
      icon: '⚡',
      title: 'Instant Recall',
      description: 'Find any conversation, decision, or piece of information in seconds with semantic search.',
    },
    {
      icon: '🔗',
      title: 'Universal Integration',
      description: 'Works seamlessly with Slack, Discord, web apps, and more. One memory layer for everything.',
    },
    {
      icon: '🔒',
      title: 'Privacy First',
      description: 'Your data stays yours. End-to-end encryption and local storage options available.',
    },
  ]

  return (
    <section id="solution" className="w-full py-16 sm:py-20 md:py-24 lg:py-28 xl:pt-32 pb-12 sm:pb-16 md:pb-20 bg-gradient-to-b from-purple-800/30 to-purple-900/50">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Main Headline */}
        <div className="text-center mb-12 sm:mb-16 md:mb-20 transition-all duration-300 hover:scale-[1.02]">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 transition-all duration-300 hover:scale-105 hover:drop-shadow-lg cursor-default inline-block">
            The <span className="spooky-text">Solution</span>
          </h2>
          <p className="text-lg sm:text-xl text-purple-200 max-w-3xl mx-auto transition-all duration-300 hover:scale-105 cursor-default block">
            Memory Layer gives you a photographic memory for all your conversations
          </p>
        </div>

        {/* Benefit Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto mb-12 sm:mb-16">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-purple-800/40 to-orange-800/20 border border-purple-500 rounded-lg p-6 hover:scale-105 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/30 cursor-pointer"
            >
              <div className="text-5xl mb-4 transition-transform duration-200 hover:scale-110">{benefit.icon}</div>
              <h3 className="text-2xl font-bold text-purple-200 mb-3">
                {benefit.title}
              </h3>
              <p className="text-purple-300 leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>

        {/* Time Savings CTA */}
        <div className="text-center">
          <div className="inline-block bg-gradient-to-r from-purple-600 to-orange-600 p-8 rounded-2xl shadow-2xl transition-all duration-300 hover:scale-105 hover:shadow-purple-500/50">
            <p className="text-3xl font-bold text-white mb-4">
              ⏱️ Save 5+ hours per week
            </p>
            <p className="text-xl text-purple-100 mb-6">
              That's 260+ hours per year back in your life
            </p>
            <Button
              size="lg"
              className="bg-white text-purple-900 hover:bg-purple-100 font-bold text-lg px-8 py-6 transition-all duration-200 hover:scale-105"
            >
              Start Saving Time Now →
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
