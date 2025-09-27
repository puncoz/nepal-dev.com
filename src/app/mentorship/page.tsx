import React from 'react';
import { Users, Calendar, Star, TrendingUp, Clock, MessageSquare, UserCheck, AlertCircle } from 'lucide-react';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import ProgressTracker from '@/components/mentorship/ProgressTracker';
import MentorshipBreadcrumb from '@/components/mentorship/MentorshipBreadcrumb';
import Link from 'next/link';

const MentorshipHub = () => {
  const quickActions = [
    {
      icon: <Users className="w-6 h-6" />,
      title: 'Browse Mentors',
      description: 'Find and connect with mentors',
      href: '/mentorship/browse',
      color: 'bg-blue-500 hover:bg-blue-600'
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: 'AI Matches',
      description: 'Get personalized recommendations',
      href: '/mentorship/matches',
      color: 'bg-purple-500 hover:bg-purple-600'
    },
    {
      icon: <Calendar className="w-6 h-6" />,
      title: 'My Sessions',
      description: 'Manage your sessions',
      href: '/mentorship/sessions',
      color: 'bg-orange-500 hover:bg-orange-600'
    },
    {
      icon: <UserCheck className="w-6 h-6" />,
      title: 'My Profile',
      description: 'Manage your profile & settings',
      href: '/mentorship/profile',
      color: 'bg-green-500 hover:bg-green-600'
    }
  ];

  const overviewStats = [
    {
      label: 'As Mentor',
      value: '3 active mentees',
      rating: '4.9⭐ rating',
      icon: <Users className="w-5 h-5 text-blue-500" />
    },
    {
      label: 'As Mentee',
      value: '2 active mentors',
      rating: '8 sessions completed',
      icon: <UserCheck className="w-5 h-5 text-green-500" />
    }
  ];

  const pendingActions = [
    {
      id: 1,
      type: 'session_request',
      title: '2 session requests awaiting response',
      description: 'New mentorship requests from junior developers',
      priority: 'high',
      time: '2 hours ago'
    },
    {
      id: 2,
      type: 'feedback',
      title: 'Feedback needed for last session with Ram K.',
      description: 'Complete session feedback to help improve matching',
      priority: 'medium',
      time: '1 day ago'
    },
    {
      id: 3,
      type: 'follow_up',
      title: 'Schedule follow-up with mentee Sarah',
      description: 'Continue React Hooks learning path discussion',
      priority: 'medium',
      time: '3 days ago'
    }
  ];

  const recentActivity = [
    {
      id: 1,
      type: 'session_completed',
      title: 'Completed React session with Priya',
      description: 'Advanced React Hooks and State Management',
      rating: 5,
      time: '2 hours ago',
      avatar: '👩‍💻'
    },
    {
      id: 2,
      type: 'new_request',
      title: 'New mentorship request from junior developer',
      description: 'Looking for guidance in Node.js and Express',
      time: '5 hours ago',
      avatar: '👨‍💻'
    },
    {
      id: 3,
      type: 'achievement',
      title: 'Your mentee completed their first project!',
      description: 'Sarah successfully deployed her React portfolio',
      time: '1 day ago',
      avatar: '🎉'
    },
    {
      id: 4,
      type: 'milestone',
      title: 'Reached 50 mentorship hours milestone',
      description: 'Congratulations on your mentoring dedication!',
      time: '2 days ago',
      avatar: '🏆'
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'session_completed': return <Star className="w-4 h-4 text-yellow-500" />;
      case 'new_request': return <MessageSquare className="w-4 h-4 text-blue-500" />;
      case 'achievement': return <TrendingUp className="w-4 h-4 text-green-500" />;
      case 'milestone': return <TrendingUp className="w-4 h-4 text-purple-500" />;
      default: return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 p-6">
      <MentorshipBreadcrumb items={[]} />
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-3">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-green-500 rounded-full">
              <Users className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              Mentorship Hub
            </h1>
          </div>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Connect, learn, and grow with Nepal's developer community through meaningful mentorship relationships.
          </p>
        </div>

        {/* Quick Actions */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
            <TrendingUp className="w-5 h-5 mr-2 text-blue-500" />
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action, index) => (
              <Link key={index} href={action.href}>
                <div className={`${action.color} text-white p-4 rounded-lg transition-all duration-200 hover:scale-105 hover:shadow-lg cursor-pointer group`}>
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-white/20 rounded-lg group-hover:bg-white/30 transition-colors">
                      {action.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold">{action.title}</h3>
                      <p className="text-sm opacity-90">{action.description}</p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </Card>

        {/* Overview Stats */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
            <Star className="w-5 h-5 mr-2 text-yellow-500" />
            Your Mentorship Overview
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {overviewStats.map((stat, index) => (
              <div key={index} className="bg-gradient-to-r from-gray-50 to-gray-100 p-4 rounded-lg border border-gray-200">
                <div className="flex items-center space-x-3">
                  {stat.icon}
                  <div>
                    <p className="text-sm text-gray-600">{stat.label}</p>
                    <p className="text-lg font-semibold text-gray-800">{stat.value}</p>
                    <p className="text-sm text-gray-500">{stat.rating}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Pending Actions */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <AlertCircle className="w-5 h-5 mr-2 text-red-500" />
              Pending Actions
            </h2>
            <div className="space-y-4">
              {pendingActions.map((action) => (
                <div key={action.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="font-medium text-gray-800">{action.title}</h3>
                        <Badge className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(action.priority)}`}>
                          {action.priority}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{action.description}</p>
                      <p className="text-xs text-gray-500">{action.time}</p>
                    </div>
                    <button className="ml-4 px-3 py-1 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600 transition-colors">
                      Action
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Progress Tracker */}
          <Card className="p-6">
            <ProgressTracker />
          </Card>

          {/* Recent Activity */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <Clock className="w-5 h-5 mr-2 text-green-500" />
              Recent Activity
            </h2>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="text-2xl">{activity.avatar}</div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      {getActivityIcon(activity.type)}
                      <h3 className="font-medium text-gray-800 text-sm">{activity.title}</h3>
                      {activity.rating && (
                        <div className="flex items-center">
                          {[...Array(activity.rating)].map((_, i) => (
                            <Star key={i} className="w-3 h-3 text-yellow-400 fill-current" />
                          ))}
                        </div>
                      )}
                    </div>
                    <p className="text-xs text-gray-600 mb-1">{activity.description}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Call to Action */}
        <Card className="p-8 bg-gradient-to-r from-blue-500 to-green-500 text-white text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Make an Impact?</h2>
          <p className="text-lg mb-6 opacity-90">
            Join thousands of developers in Nepal's most active mentorship community
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/mentorship/matches">
              <button className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors">
                Find Your Perfect Match
              </button>
            </Link>
            <Link href="/mentorship/browse">
              <button className="px-6 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-blue-600 transition-colors">
                Browse All Mentors
              </button>
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default MentorshipHub;