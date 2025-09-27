import { cn } from "@/lib/utils"
import React from "react"

interface SocialButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  provider: "google" | "github" | "linkedin" | "facebook" | "twitter";
  children: React.ReactNode;
}

const providerIcons = {
  google: "🔍",
  github: "🐙",
  linkedin: "💼",
  facebook: "📘",
  twitter: "🐦",
}

const providerColors = {
  google: "hover:bg-red-50 border-red-200 text-red-700",
  github: "hover:bg-gray-50 border-gray-200 text-gray-700",
  linkedin: "hover:bg-blue-50 border-blue-200 text-blue-700",
  facebook: "hover:bg-blue-50 border-blue-200 text-blue-700",
  twitter: "hover:bg-blue-50 border-blue-200 text-blue-700",
}

const SocialButton = React.forwardRef<HTMLButtonElement, SocialButtonProps>(
  ({ provider, children, className, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2",
          providerColors[provider],
          className,
        )}
        {...props}
      >
        <span className="text-lg">{providerIcons[provider]}</span>
        {children}
      </button>
    )
  },
)

SocialButton.displayName = "SocialButton"

export { SocialButton }
export default SocialButton
