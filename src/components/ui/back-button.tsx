"use client"

import Button from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"
import React from "react"

interface BackButtonProps {
  label?: string;
  href?: string;
  className?: string;
  variant?: "primary" | "secondary" | "outline";
}

const BackButton: React.FC<BackButtonProps> = ({
                                                 label = "Back",
                                                 href,
                                                 className = "",
                                                 variant = "outline",
                                               }) => {
  const router = useRouter()

  const handleClick = () => {
    if (href) {
      router.push(href)
    } else {
      router.back()
    }
  }

  return (
    <Button
      variant={variant}
      onClick={handleClick}
      className={`flex items-center space-x-2 ${className}`}
    >
      <ArrowLeft className="w-4 h-4"/>
      <span>{label}</span>
    </Button>
  )
}

export default BackButton
