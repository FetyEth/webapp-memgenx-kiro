"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Download, Save, Search, Sparkles } from "lucide-react"

const steps = [
  {
    icon: Download,
    number: "01",
    title: "Install Extension",
    description: "Download Memory Layer from Chrome Web Store. One-click installation, no setup required."
  },
  {
    icon: Sparkles,
    number: "02",
    title: "Button Appears",
    description: "The purple Memory Layer button automatically appears in your communication tools."
  },
  {
    icon: Save,
    number: "03",
    title: "Save Memories",
    description: "Click the Memory Layer button to save important information. Your data is securely stored."
  },
  {
    icon: Search,
    number: "04",
    title: "Auto-Retrieve",
    description: "Memories are automatically retrieved in future conversations when relevant, saving you time."
  }
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="w-full py-16 sm:py-20 md:py-24 lg:py-28 xl:py-32 bg-gradient-to-b from-purple-900/50 to-purple-800/30">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16 md:mb-20 transition-all duration-300 hover:scale-[1.02]">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 transition-all duration-300 hover:scale-105 hover:drop-shadow-lg cursor-default inline-block">
            How It <span className="spooky-text">Works</span>
          </h2>
          <p className="text-lg sm:text-xl text-purple-200 max-w-3xl mx-auto transition-all duration-300 hover:scale-105 cursor-default block">
            Get started in minutes. No complex setup required.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 relative">
          {steps.map((step, index) => (
            <Card
              key={index}
              className="relative z-10 border-purple-600/50 bg-purple-800/30 h-full transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/20 hover:scale-[1.05] hover:-translate-y-1 hover:border-purple-500 cursor-pointer"
            >
              <CardHeader>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 rounded-lg bg-purple-600/20 flex items-center justify-center transition-all duration-200 hover:bg-purple-600/30 hover:scale-110 hover:rotate-3">
                    <step.icon className="w-7 h-7 text-purple-400 transition-transform duration-200" />
                  </div>
                  <span className="text-4xl font-bold text-purple-500/50">{step.number}</span>
                </div>
                <CardTitle className="text-xl sm:text-2xl text-purple-200">{step.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base sm:text-lg text-purple-300 transition-all duration-200 hover:scale-105 cursor-default">
                  {step.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Setup Time Highlight */}
        <div className="mt-16 text-center">
          <div className="inline-block bg-purple-800/50 border-2 border-purple-500 rounded-xl p-6 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-purple-500/30">
            <p className="text-2xl font-bold text-purple-200 mb-2">
              ⏱️ Setup Time: <span className="text-orange-400">Less than 5 minutes</span>
            </p>
            <p className="text-purple-300">
              Start capturing your conversations immediately
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
