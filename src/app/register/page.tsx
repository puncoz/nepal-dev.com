"use client"

import AuthCard from "@/components/auth/auth-card"
import Button from "@/components/ui/button"
import Checkbox from "@/components/ui/checkbox"
import Divider from "@/components/ui/divider"
import Input from "@/components/ui/input"
import Select from "@/components/ui/select"
import SocialButton from "@/components/ui/social-button"
import Link from "next/link"
import { FunctionComponent, useState } from "react"

const RegisterPage: FunctionComponent = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    timezone: "Asia/Kathmandu",
    agreeToTerms: false,
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    const checked = (e.target as HTMLInputElement).checked
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))

      // Here you would typically make an API call to register the user
      console.log("Registration attempt:", formData)

      // Simulate successful registration - redirect to dashboard
      window.location.href = "/dashboard"
    } catch (error) {
      console.error("Registration failed:", error)
      // Handle registration error here
    } finally {
      setIsLoading(false)
    }
  }

  const timezoneOptions = [
    { value: "Asia/Kathmandu", label: "Asia/Kathmandu (GMT+5:45)" },
    { value: "Asia/Kolkata", label: "Asia/Kolkata (GMT+5:30)" },
    { value: "UTC", label: "UTC (GMT+0:00)" },
    { value: "America/New_York", label: "America/New_York (GMT-5:00)" },
    { value: "Europe/London", label: "Europe/London (GMT+0:00)" },
    { value: "Asia/Tokyo", label: "Asia/Tokyo (GMT+9:00)" },
  ]

  const getProgressWidth = () => {
    const filledFields = Object.entries(formData).filter(([key, value]) => {
      if (key === "agreeToTerms") return value
      return value !== "" && value !== "Asia/Kathmandu"
    }).length
    return Math.min((filledFields / 4) * 100, 100)
  }

  return (
    <AuthCard
      title="Join Nepal Dev Community! 🚀"
      subtitle="Start your journey with Nepal's developer community"
      gradient="green"
      footer={
        <p className="text-xs text-gray-500">
          Join thousands of developers building Nepal&apos;s tech future
        </p>
      }
    >
      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">Profile Completion</span>
          <span className="text-sm text-gray-500">{Math.round(getProgressWidth())}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${getProgressWidth()}%` }}
          ></div>
        </div>
      </div>

      {/* Registration Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Personal Information Section */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2 mb-4">
            <span className="text-lg">👤</span>
            <h3 className="text-lg font-semibold text-gray-800">Personal Information</h3>
          </div>

          <Input
            id="fullName"
            name="fullName"
            type="text"
            label="Full Name"
            icon="👤"
            value={formData.fullName}
            onChange={handleInputChange}
            placeholder="Enter your full name"
            className="focus:ring-green-500 focus:border-green-500"
            required
          />

          <Input
            id="email"
            name="email"
            type="email"
            label="Email Address"
            icon="📧"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="your.email@example.com"
            className="focus:ring-green-500 focus:border-green-500"
            required
          />
        </div>

        {/* Security Section */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2 mb-4">
            <span className="text-lg">🔒</span>
            <h3 className="text-lg font-semibold text-gray-800">Security</h3>
          </div>

          <Input
            id="password"
            name="password"
            type="password"
            label="Password"
            icon="🔒"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="Create a strong password (min 8 characters)"
            className="focus:ring-green-500 focus:border-green-500"
            showPasswordToggle
            minLength={8}
            required
          />

          {/* Password Strength Indicator */}
          {formData.password && (
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-gray-600">Password Strength</span>
                <span className={`font-medium ${
                  formData.password.length >= 12 ? "text-green-600" :
                    formData.password.length >= 8 ? "text-yellow-600" : "text-red-600"
                }`}>
                  {formData.password.length >= 12 ? "Strong" :
                    formData.password.length >= 8 ? "Medium" : "Weak"}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1">
                <div
                  className={`h-1 rounded-full transition-all duration-300 ${
                    formData.password.length >= 12 ? "bg-green-500 w-full" :
                      formData.password.length >= 8 ? "bg-yellow-500 w-2/3" : "bg-red-500 w-1/3"
                  }`}
                ></div>
              </div>
            </div>
          )}
        </div>

        {/* Preferences Section */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2 mb-4">
            <span className="text-lg">⚙️</span>
            <h3 className="text-lg font-semibold text-gray-800">Preferences</h3>
          </div>

          <Select
            id="timezone"
            name="timezone"
            label="Timezone"
            icon="🌍"
            value={formData.timezone}
            onChange={handleInputChange}
            options={timezoneOptions}
            className="focus:ring-green-500 focus:border-green-500"
            required
          />
        </div>

        {/* Terms Agreement */}
        <Checkbox
          id="agreeToTerms"
          name="agreeToTerms"
          checked={formData.agreeToTerms}
          onChange={handleInputChange}
          className="text-green-600 focus:ring-green-500"
          label={
            <span>
              I agree to the{" "}
              <Link href="/terms" className="text-green-600 hover:text-green-800 font-medium">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="/privacy" className="text-green-600 hover:text-green-800 font-medium">
                Privacy Policy
              </Link>
            </span>
          }
          required
        />

        {/* Create Account Button */}
        <Button
          type="submit"
          variant="secondary"
          size="md"
          disabled={!formData.agreeToTerms}
          loading={isLoading}
          className="w-full shadow-lg"
        >
          {isLoading ? "Creating Account..." : "Create Account 🚀"}
        </Button>

        <Divider/>

        {/* Social Registration Buttons */}
        <div className="space-y-3">
          <SocialButton
            provider="google"
            className="focus:ring-green-500"
          >
            Sign up with Google
          </SocialButton>
          <SocialButton
            provider="github"
            className="focus:ring-green-500"
          >
            Sign up with GitHub
          </SocialButton>
          <SocialButton
            provider="linkedin"
            className="focus:ring-green-500"
          >
            Sign up with LinkedIn
          </SocialButton>
        </div>

        {/* Sign In Link */}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-green-600 hover:text-green-800 font-medium transition-colors duration-200"
            >
              Sign In
            </Link>
          </p>
        </div>
      </form>
    </AuthCard>
  )
}

export default RegisterPage
