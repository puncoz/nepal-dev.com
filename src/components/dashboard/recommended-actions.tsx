"use client"

import Button from "@/components/ui/button"
import {
  ArrowRight,
  BookOpen,
  Briefcase,
  Calendar,
  Code,
  Sparkles,
  Target,
  TrendingUp,
  User,
  Users,
} from "lucide-react"
import Link from "next/link"
import { FunctionComponent } from "react"

interface RecommendedAction {
  id: number;
  title: string;
  description: string;
  reason: string;
  icon: React.ReactNode;
  color: "blue" | "green" | "purple" | "orange" | "red";
  priority: "high" | "medium" | "low";
  actionText: string;
  href: string;
  estimatedTime?: string;
}

interface ActionCardProps {
  action: RecommendedAction;
}

const ActionCard: FunctionComponent<ActionCardProps> = ({ action }) => {
  const colorClasses = {
    blue: {
      bg: "bg-blue-50",
      text: "text-blue-600",
      border: "border-blue-200",
      button: "bg-blue-600 hover:bg-blue-700",
    },
    green: {
      bg: "bg-green-50",
      text: "text-green-600",
      border: "border-green-200",
      button: "bg-green-600 hover:bg-green-700",
    },
    purple: {
      bg: "bg-purple-50",
      text: "text-purple-600",
      border: "border-purple-200",
      button: "bg-purple-600 hover:bg-purple-700",
    },
    orange: {
      bg: "bg-orange-50",
      text: "text-orange-600",
      border: "border-orange-200",
      button: "bg-orange-600 hover:bg-orange-700",
    },
    red: {
      bg: "bg-red-50",
      text: "text-red-600",
      border: "border-red-200",
      button: "bg-red-600 hover:bg-red-700",
    },
  }

  const priorityBadges = {
    high: "bg-red-100 text-red-800",
    medium: "bg-yellow-100 text-yellow-800",
    low: "bg-gray-100 text-gray-800",
  }

  return (
    <div className="bg-white rounded-lg p-4 border border-gray-200 hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className={`p-2 rounded-lg ${colorClasses[action.color].bg}`}>
          <div className={colorClasses[action.color].text}>
            {action.icon}
          </div>
        </div>
        <span className={`px-2 py-1 text-xs font-medium rounded-full ${priorityBadges[action.priority]}`}>
          {action.priority}
        </span>
      </div>

      {/* Content */}
      <div className="mb-4">
        <h3 className="font-semibold text-gray-900 mb-2">{action.title}</h3>
        <p className="text-sm text-gray-600 mb-2">{action.description}</p>
        <div className="flex items-center text-xs text-gray-500 mb-2">
          <Sparkles className="w-3 h-3 mr-1"/>
          <span>AI suggests: {action.reason}</span>
        </div>
        {action.estimatedTime && (
          <div className="text-xs text-gray-500">
            ⏱️ Estimated time: {action.estimatedTime}
          </div>
        )}
      </div>

      {/* Action Button */}
      <Link href={action.href}>
        <button
          className={`w-full flex items-center justify-center px-3 py-2 text-sm font-medium text-white rounded-lg transition-colors ${colorClasses[action.color].button}`}
        >
          {action.actionText}
          <ArrowRight className="w-4 h-4 ml-2"/>
        </button>
      </Link>
    </div>
  )
}

const RecommendedActions: FunctionComponent = () => {
  const recommendedActions: RecommendedAction[] = [
    {
      id: 1,
      title: "Complete Your Profile",
      description: "Add your portfolio projects and skills to get better matches",
      reason: "Your profile is 85% complete. Adding projects will increase visibility by 40%",
      icon: <User className="w-5 h-5"/>,
      color: "blue",
      priority: "high",
      actionText: "Update Profile",
      href: "/dashboard",
      estimatedTime: "10 minutes",
    },
    {
      id: 2,
      title: "Start Learning Path",
      description: "Begin the \"Advanced React Patterns\" learning path",
      reason: "Based on your current skills and career goals",
      icon: <BookOpen className="w-5 h-5"/>,
      color: "green",
      priority: "high",
      actionText: "Start Learning",
      href: "/learning",
      estimatedTime: "2 hours",
    },
    {
      id: 3,
      title: "Connect with Mentors",
      description: "Reach out to 3 potential mentors in your field",
      reason: "Users with mentors advance 3x faster in their careers",
      icon: <Users className="w-5 h-5"/>,
      color: "purple",
      priority: "medium",
      actionText: "Find Mentors",
      href: "/mentorship",
      estimatedTime: "15 minutes",
    },
    {
      id: 4,
      title: "Apply to Jobs",
      description: "Apply to 2 frontend developer positions that match your skills",
      reason: "High match score with recent job postings",
      icon: <Briefcase className="w-5 h-5"/>,
      color: "orange",
      priority: "medium",
      actionText: "View Jobs",
      href: "/jobs",
      estimatedTime: "30 minutes",
    },
    {
      id: 5,
      title: "Contribute to Project",
      description: "Join the \"Nepal Tourism App\" open source project",
      reason: "Perfect match for your React and TypeScript skills",
      icon: <Code className="w-5 h-5"/>,
      color: "green",
      priority: "medium",
      actionText: "Join Project",
      href: "/projects",
      estimatedTime: "1 hour",
    },
    {
      id: 6,
      title: "Attend Meetup",
      description: "Register for \"Modern Frontend Architecture\" meetup",
      reason: "Aligns with your learning goals and interests",
      icon: <Calendar className="w-5 h-5"/>,
      color: "blue",
      priority: "low",
      actionText: "Register",
      href: "/events",
      estimatedTime: "2 minutes",
    },
    {
      id: 7,
      title: "Set Weekly Goals",
      description: "Define your learning and career objectives for this week",
      reason: "Goal-oriented users are 60% more likely to achieve success",
      icon: <Target className="w-5 h-5"/>,
      color: "red",
      priority: "low",
      actionText: "Set Goals",
      href: "/learning",
      estimatedTime: "5 minutes",
    },
    {
      id: 8,
      title: "Skill Assessment",
      description: "Take a JavaScript skill assessment to validate your knowledge",
      reason: "Verified skills increase profile views by 25%",
      icon: <TrendingUp className="w-5 h-5"/>,
      color: "purple",
      priority: "low",
      actionText: "Take Test",
      href: "/learning",
      estimatedTime: "20 minutes",
    },
  ]

  // Sort by priority
  const sortedActions = recommendedActions.sort((a, b) => {
    const priorityOrder = { high: 3, medium: 2, low: 1 }
    return priorityOrder[b.priority] - priorityOrder[a.priority]
  })

  return (
    <div>
      <div className="flex items-center mb-6">
        <Sparkles className="w-5 h-5 text-yellow-500 mr-2"/>
        <h2 className="text-xl font-semibold text-gray-900">AI Recommendations</h2>
      </div>

      <div className="space-y-4">
        {sortedActions.map((action) => (
          <ActionCard key={action.id} action={action}/>
        ))}
      </div>

      {/* View All Button */}
      <div className="mt-6">
        <Link href="/dashboard">
          <Button
            variant="outline"
            className="w-full"
          >
            View All Recommendations
            <ArrowRight className="w-4 h-4 ml-2"/>
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default RecommendedActions
