/**
 * Dashboard Page with Analytics
 * Built with Kiro for Kiroween 2025 🎃
 */

'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { MemoryPieChart } from '@/components/charts/memory-pie-chart'
import { PlatformPieChart } from '@/components/charts/platform-pie-chart'
import { UsagePieChart } from '@/components/charts/usage-pie-chart'

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-orange-900 p-8">
      <div className="container mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Dashboard 🎃</h1>
          <p className="text-purple-200">Your memory analytics and insights</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-purple-800/30 border-purple-600">
            <CardHeader>
              <CardTitle className="text-white">Total Memories</CardTitle>
              <CardDescription className="text-purple-200">All time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-white">1,234</div>
            </CardContent>
          </Card>

          <Card className="bg-purple-800/30 border-purple-600">
            <CardHeader>
              <CardTitle className="text-white">This Week</CardTitle>
              <CardDescription className="text-purple-200">Last 7 days</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-white">156</div>
            </CardContent>
          </Card>

          <Card className="bg-purple-800/30 border-purple-600">
            <CardHeader>
              <CardTitle className="text-white">Today</CardTitle>
              <CardDescription className="text-purple-200">Last 24 hours</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-white">23</div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Memory Distribution Pie Chart */}
          <Card className="bg-purple-800/30 border-purple-600">
            <CardHeader>
              <CardTitle className="text-white">Memory Distribution</CardTitle>
              <CardDescription className="text-purple-200">
                By conversation type
              </CardDescription>
            </CardHeader>
            <CardContent>
              <MemoryPieChart />
            </CardContent>
          </Card>

          {/* Platform Usage Pie Chart */}
          <Card className="bg-purple-800/30 border-purple-600">
            <CardHeader>
              <CardTitle className="text-white">Platform Usage</CardTitle>
              <CardDescription className="text-purple-200">
                Memories by AI platform
              </CardDescription>
            </CardHeader>
            <CardContent>
              <PlatformPieChart />
            </CardContent>
          </Card>
        </div>

        {/* Usage Quota Pie Chart */}
        <div className="grid grid-cols-1 gap-6">
          <Card className="bg-purple-800/30 border-purple-600">
            <CardHeader>
              <CardTitle className="text-white">Daily Usage Quota</CardTitle>
              <CardDescription className="text-purple-200">
                Free tier: 100 memories per day
              </CardDescription>
            </CardHeader>
            <CardContent>
              <UsagePieChart />
            </CardContent>
          </Card>
        </div>

        {/* Recent Memories */}
        <div className="mt-8">
          <Card className="bg-purple-800/30 border-purple-600">
            <CardHeader>
              <CardTitle className="text-white">Recent Memories</CardTitle>
              <CardDescription className="text-purple-200">
                Your latest conversations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="p-4 bg-purple-700/30 rounded-lg border border-purple-600">
                    <div className="flex items-start justify-between mb-2">
                      <span className="text-white font-semibold">Memory #{i}</span>
                      <span className="text-purple-300 text-sm">2 hours ago</span>
                    </div>
                    <p className="text-purple-200 text-sm">
                      Sample memory content from your AI conversations...
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
