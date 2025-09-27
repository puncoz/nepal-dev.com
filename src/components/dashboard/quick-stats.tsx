"use client"

import { ArrowDown, ArrowUp, Award, Target, TrendingUp, User } from "lucide-react"
import Link from "next/link"
import { FunctionComponent } from "react"

interface StatCardProps {
  title: string;
  value: string;
  subtitle: string;
  icon: React.ReactNode;
  color: "blue" | "green" | "purple" | "orange";
  trend?: {
    value: string;
    direction: "up" | "down";
  };
  href?: string;
}

const StatCard: FunctionComponent<StatCardProps> = ({
                                                      title,
                                                      value,
                                                      subtitle,
                                                      icon,
                                                      color,
                                                      trend,
                                                      href,
                                                    }) => {
  const colorClasses = {
    blue: "bg-blue-50 text-blue-600 border-blue-200",
    green: "bg-green-50 text-green-600 border-green-200",
    purple: "bg-purple-50 text-purple-600 border-purple-200",
    orange: "bg-orange-50 text-orange-600 border-orange-200",
  }

  const cardContent = (
    <div
      className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg ${colorClasses[color].bg}`}>
          <div className={colorClasses[color].text}>
            {icon}
          </div>
        </div>
        {trend && (
          <div className={`flex items-center text-sm font-medium ${
            trend.direction === "up" ? "text-green-600" : "text-red-600"
          }`}>
            {trend.direction === "up" ? (
              <ArrowUp className="w-4 h-4 mr-1"/>
            ) : (
              <ArrowDown className="w-4 h-4 mr-1"/>
            )}
            {trend.value}
          </div>
        )}
      </div>

      {/* Content */}
      <div>
        <h3 className="text-2xl font-bold text-gray-900 mb-1">{value}</h3>
        <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
        <p className="text-xs text-gray-500">{subtitle}</p>
      </div>
    </div>
  )

  return href ? (
    <Link href={href}>
      {cardContent}
    </Link>
  ) : (
    cardContent
  )
}

const QuickStats: FunctionComponent = () => {
  const stats = [
    {
      title: "Profile Completion",
      value: "85%",
      subtitle: "Complete your profile to get better matches",
      icon: <User className="w-6 h-6"/>,
      color: "blue" as const,
      trend: { value: "+5%", direction: "up" as const },
      href: "/dashboard",
    },
    {
      title: "Active Goals",
      value: "3",
      subtitle: "Learning objectives in progress",
      icon: <Target className="w-6 h-6"/>,
      color: "green" as const,
      href: "/learning",
    },
    {
      title: "Skills Mastered",
      value: "12",
      subtitle: "Technologies you've learned",
      icon: <Award className="w-6 h-6"/>,
      color: "purple" as const,
      trend: { value: "+2", direction: "up" as const },
      href: "/learning",
    },
    {
      title: "Mentorship Score",
      value: "4.8",
      subtitle: "Based on mentor feedback",
      icon: <TrendingUp className="w-6 h-6"/>,
      color: "orange" as const,
      trend: { value: "+0.2", direction: "up" as const },
      href: "/mentorship",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <StatCard
          key={index}
          title={stat.title}
          value={stat.value}
          subtitle={stat.subtitle}
          icon={stat.icon}
          color={stat.color}
          trend={stat.trend}
          href={stat.href}
        />
      ))}
    </div>
  )
}

export default QuickStats
