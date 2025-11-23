"use client"

export default function Problem() {
  const problems = [
    {
      icon: '😵',
      title: 'Context Switching Chaos',
      description: 'Jumping between Slack, Discord, and meetings makes you lose track of important conversations and decisions.',
    },
    {
      icon: '🔍',
      title: 'Information Black Holes',
      description: 'Critical information disappears into chat history, never to be found again when you need it most.',
    },
    {
      icon: '⏰',
      title: 'Time Wasted Searching',
      description: 'Spending hours scrolling through chat history trying to find that one important message or decision.',
    },
    {
      icon: '🤯',
      title: 'Cognitive Overload',
      description: 'Trying to remember everything from multiple conversations across different platforms is exhausting.',
    },
  ]

  return (
    <section id="problems" className="w-full pt-16 sm:pt-20 md:pt-24 lg:pt-28 xl:pt-32 pb-3 sm:pb-4 md:pb-5 bg-gradient-to-b from-gray-900 to-black">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Main Headline */}
        <div className="text-center mb-12 sm:mb-16 md:mb-20 transition-all duration-300 hover:scale-[1.02]">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 transition-all duration-300 hover:scale-105 hover:drop-shadow-lg cursor-default inline-block text-white">
            The <span className="text-blue-500">Problem</span> with Modern Communication
          </h2>
          <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto transition-all duration-300 hover:scale-105 cursor-default block">
            Developers lose valuable context every day. Sound familiar?
          </p>
        </div>

        {/* Problem Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto mb-12 sm:mb-16">
          {problems.map((problem, index) => (
            <div
              key={index}
              className="bg-gray-800/50 border border-gray-700 rounded-lg p-6 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/20 transition-all duration-300 cursor-pointer hover:border-blue-500/50"
            >
              <div className="text-5xl mb-4 transition-transform duration-200 hover:scale-110">{problem.icon}</div>
              <h3 className="text-2xl font-bold text-white mb-3">
                {problem.title}
              </h3>
              <p className="text-gray-400 leading-relaxed">
                {problem.description}
              </p>
            </div>
          ))}
        </div>

        {/* Time Waste Statistic */}
        <div className="mt-12 text-center">
          <div className="inline-block bg-blue-600/20 border-2 border-blue-500 rounded-xl p-6 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/30">
            <p className="text-2xl text-blue-400 font-semibold">
              💸 The average developer wastes <span className="text-3xl text-blue-300">5+ hours per week</span> searching for lost context
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
