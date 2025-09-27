"use client"

import { cn } from "@/lib/utils"
import { ReactNode } from "react"

interface AuthCardProps {
  children: ReactNode;
  title: string;
  subtitle: string;
  footer?: ReactNode;
  className?: string;
  gradient?: "blue" | "green";
}

const AuthCard = ({ children, title, subtitle, footer, className, gradient = "blue" }: AuthCardProps) => {
  const gradients = {
    blue: "bg-gradient-to-br from-blue-50 to-indigo-100",
    green: "bg-gradient-to-br from-green-50 to-blue-100",
  }

  return (
    <div className={cn("min-h-screen flex items-center justify-center p-4", gradients[gradient])}>
      <div className="w-full max-w-md">
        {/* Auth Card */}
        <div className={cn("bg-white rounded-2xl shadow-xl p-8 border border-gray-100", className)}>
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <span className="text-3xl">🏔️</span>
              <h1 className="text-2xl font-bold text-gray-900 ml-2">Nepal Dev Hub</h1>
            </div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">{title}</h2>
            <p className="text-gray-600 text-sm">{subtitle}</p>
          </div>

          {/* Content */}
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div className="text-center mt-6">
            {footer}
          </div>
        )}
      </div>
    </div>
  )
}

export default AuthCard
