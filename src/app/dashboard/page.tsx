'use client';

import { FunctionComponent } from 'react';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import QuickStats from '@/components/dashboard/QuickStats';
import TodaysFocus from '@/components/dashboard/TodaysFocus';
import RecentActivity from '@/components/dashboard/RecentActivity';
import RecommendedActions from '@/components/dashboard/RecommendedActions';

const DashboardPage: FunctionComponent = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <DashboardHeader />
      
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, Developer! 👋
          </h1>
          <p className="text-gray-600">
            Here&apos;s what&apos;s happening in your Nepal Dev Hub today.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="animate-fade-in">
          <QuickStats />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-slide-up">
          {/* Today's Focus */}
          <div className="lg:col-span-2 transform transition-all duration-300 hover:scale-[1.01]">
            <TodaysFocus />
          </div>

          {/* Recent Activity */}
          <div className="transform transition-all duration-300 hover:scale-[1.01]">
            <RecentActivity />
          </div>
        </div>

        {/* Recommended Actions */}
        <div className="animate-fade-in-delayed">
          <RecommendedActions />
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;