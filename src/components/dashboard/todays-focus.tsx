"use client"

import Button from "@/components/ui/button"
import { ArrowRight, BookOpen, Briefcase, Clock, Users } from "lucide-react"
import Link from "next/link"
import { FunctionComponent } from "react"

interface FocusCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: "blue" | "green" | "purple";
  items: Array<{
    id: number;
    title: string;
    subtitle: string;
    meta?: string;
    badge?: string;
  }>;
  actionText: string;
  actionHref: string;
}

const FocusCard: FunctionComponent<FocusCardProps> = ({
                                                        title,
                                                        description,
                                                        icon,
                                                        color,
                                                        items,
                                                        actionText,
                                                        actionHref,
                                                      }) => {
  const colorClasses = {
    blue: {
      bg: "bg-blue-50",
      text: "text-blue-600",
      border: "border-blue-200",
      badge: "bg-blue-100 text-blue-800",
    },
    green: {
      bg: "bg-green-50",
      text: "text-green-600",
      border: "border-green-200",
      badge: "bg-green-100 text-green-800",
    },
    purple: {
      bg: "bg-purple-50",
      text: "text-purple-600",
      border: "border-purple-200",
      badge: "bg-purple-100 text-purple-800",
    },
  }

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
      {/* Header */}
      <div className="flex items-center mb-4">
        <div className={`p-2 rounded-lg ${colorClasses[color].bg} ${colorClasses[color].text}`}>
          {icon}
        </div>
        <div className="ml-3">
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          <p className="text-sm text-gray-600">{description}</p>
        </div>
      </div>

      {/* Items */}
      <div className="space-y-3 mb-6">
        {items.map((item) => (
          <div key={item.id}
               className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
            <div className="flex-1">
              <h4 className="font-medium text-gray-900 mb-1">{item.title}</h4>
              <p className="text-sm text-gray-600">{item.subtitle}</p>
              {item.meta && (
                <div className="flex items-center mt-2 text-xs text-gray-500">
                  <Clock className="w-3 h-3 mr-1"/>
                  {item.meta}
                </div>
              )}
            </div>
            {item.badge && (
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${colorClasses[color].badge}`}>
                {item.badge}
              </span>
            )}
          </div>
        ))}
      </div>

      {/* Action Button */}
      <Link href={actionHref}>
        <Button
          variant="outline"
          className="w-full flex items-center justify-center"
        >
          {actionText}
          <ArrowRight className="w-4 h-4 ml-2"/>
        </Button>
      </Link>
    </div>
  )
}

const TodaysFocus: FunctionComponent = () => {
  const focusData = [
    {
      title: "New Matches",
      description: "Fresh mentorship opportunities",
      icon: <Users className="w-5 h-5"/>,
      color: "blue" as const,
      items: [
        {
          id: 1,
          title: "Sarah Chen",
          subtitle: "Senior React Developer at Tech Corp",
          meta: "Available for mentoring",
          badge: "95% Match",
        },
        {
          id: 2,
          title: "Raj Patel",
          subtitle: "Full Stack Engineer with 8+ years exp",
          meta: "Specializes in Node.js & AWS",
          badge: "88% Match",
        },
        {
          id: 3,
          title: "Maya Gurung",
          subtitle: "DevOps Engineer at StartupXYZ",
          meta: "Expert in Kubernetes & Docker",
          badge: "82% Match",
        },
      ],
      actionText: "View All Matches",
      actionHref: "/mentorship",
    },
    {
      title: "Daily Lessons",
      description: "Continue your learning journey",
      icon: <BookOpen className="w-5 h-5"/>,
      color: "green" as const,
      items: [
        {
          id: 1,
          title: "Advanced React Hooks",
          subtitle: "Learn useCallback and useMemo optimization",
          meta: "15 min remaining",
          badge: "In Progress",
        },
        {
          id: 2,
          title: "TypeScript Generics",
          subtitle: "Master generic types and constraints",
          meta: "New lesson available",
          badge: "New",
        },
        {
          id: 3,
          title: "System Design Basics",
          subtitle: "Scalability and performance patterns",
          meta: "Recommended for you",
          badge: "Popular",
        },
      ],
      actionText: "Continue Learning",
      actionHref: "/learning",
    },
    {
      title: "Job Alerts",
      description: "Opportunities matching your skills",
      icon: <Briefcase className="w-5 h-5"/>,
      color: "purple" as const,
      items: [
        {
          id: 1,
          title: "Senior Frontend Developer",
          subtitle: "TechCorp Nepal - Remote/Hybrid",
          meta: "Posted 2 hours ago",
          badge: "Hot",
        },
        {
          id: 2,
          title: "React Native Developer",
          subtitle: "Innovation Labs - Kathmandu",
          meta: "Salary: NPR 80K-120K",
          badge: "New",
        },
        {
          id: 3,
          title: "Full Stack Engineer",
          subtitle: "Digital Solutions - Pokhara",
          meta: "Experience: 3-5 years",
          badge: "Featured",
        },
      ],
      actionText: "Browse All Jobs",
      actionHref: "/jobs",
    },
  ]

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Today&apos;s Focus</h2>
        <p className="text-sm text-gray-600">Stay on track with your goals</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {focusData.map((focus, index) => (
          <FocusCard
            key={index}
            title={focus.title}
            description={focus.description}
            icon={focus.icon}
            color={focus.color}
            items={focus.items}
            actionText={focus.actionText}
            actionHref={focus.actionHref}
          />
        ))}
      </div>
    </div>
  )
}

export default TodaysFocus
