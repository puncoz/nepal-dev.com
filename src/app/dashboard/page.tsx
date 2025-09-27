"use client"

import QuickStats from "@/components/dashboard/quick-stats"
import RecentActivity from "@/components/dashboard/recent-activity"
import RecommendedActions from "@/components/dashboard/recommended-actions"
import TodaysFocus from "@/components/dashboard/todays-focus"
import Layout from "@/components/layout/layout"
import Breadcrumb from "@/components/ui/breadcrumb"
import { FunctionComponent } from "react"

const DashboardPage: FunctionComponent = () => {
  return (
    <Layout isAuthenticated={true} user={{ name: "John Doe", email: "john@example.com" }}>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb
          items={[{ label: "Dashboard" }]}
          className="mb-8"
        />
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, John! 👋
          </h1>
          <p className="text-gray-600">
            Here&apos;s what&apos;s happening with your development journey today.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="mb-8">
          <QuickStats/>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Today's Focus */}
          <div className="lg:col-span-2">
            <TodaysFocus/>
          </div>

          {/* Right Column - Recent Activity */}
          <div>
            <RecentActivity/>
          </div>
        </div>

        {/* Recommended Actions */}
        <div className="mt-8">
          <RecommendedActions/>
        </div>
      </main>
    </Layout>
  )
}

export default DashboardPage
