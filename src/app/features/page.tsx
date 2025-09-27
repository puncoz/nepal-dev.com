"use client"

import Layout from "@/components/layout/layout"
import { Badge } from "@/components/ui/badge"
import Breadcrumb from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ArrowRight,
  Award,
  BarChart3,
  Bell,
  BookOpen,
  Brain,
  Briefcase,
  Calendar,
  CheckCircle,
  Cloud,
  Code,
  Database,
  FileText,
  Globe,
  Lightbulb,
  Lock,
  MessageSquare,
  Rocket,
  Search,
  Settings,
  Share2,
  Shield,
  Smartphone,
  Target,
  TrendingUp,
  Users,
  Video,
  Zap,
} from "lucide-react"
import { useState } from "react"

const featureCategories = [
  {
    id: "mentorship",
    title: "Mentorship & Guidance",
    description: "Connect with experienced developers and accelerate your growth",
    icon: Users,
    color: "bg-blue-500",
    features: [
      {
        title: "AI-Powered Mentor Matching",
        description: "Our intelligent algorithm analyzes your skills, goals, and learning style to connect you with the perfect mentor.",
        icon: Brain,
        benefits: ["Personalized matching", "Skill-based pairing", "Goal alignment", "Learning style compatibility"],
      },
      {
        title: "Integrated Video Sessions",
        description: "Built-in video calling with screen sharing, code collaboration, and session recording.",
        icon: Video,
        benefits: ["HD video quality", "Screen sharing", "Code collaboration", "Session recordings"],
      },
      {
        title: "Progress Tracking",
        description: "Track your learning journey with detailed analytics and milestone achievements.",
        icon: BarChart3,
        benefits: ["Learning analytics", "Milestone tracking", "Progress reports", "Goal setting"],
      },
      {
        title: "Community Feedback",
        description: "Get feedback from the community on your projects, code, and career decisions.",
        icon: MessageSquare,
        benefits: ["Peer reviews", "Code feedback", "Career advice", "Community support"],
      },
    ],
  },
  {
    id: "jobs",
    title: "Career Opportunities",
    description: "Discover and apply to jobs that match your skills and aspirations",
    icon: Briefcase,
    color: "bg-green-500",
    features: [
      {
        title: "Smart Job Recommendations",
        description: "AI-powered job matching based on your skills, experience, and career preferences.",
        icon: Target,
        benefits: ["Skill matching", "Experience level filtering", "Location preferences", "Salary expectations"],
      },
      {
        title: "Application Tracking",
        description: "Keep track of all your job applications in one place with status updates.",
        icon: FileText,
        benefits: ["Application status", "Interview scheduling", "Follow-up reminders", "Response tracking"],
      },
      {
        title: "Salary Insights",
        description: "Access real-time salary data and market trends for different roles and companies.",
        icon: TrendingUp,
        benefits: ["Market rates", "Salary trends", "Company comparisons", "Negotiation tips"],
      },
      {
        title: "Company Profiles",
        description: "Detailed information about companies including culture, benefits, and employee reviews.",
        icon: Globe,
        benefits: ["Company culture", "Employee reviews", "Benefits overview", "Growth opportunities"],
      },
    ],
  },
  {
    id: "learning",
    title: "Learning & Development",
    description: "Master new technologies with structured courses and hands-on projects",
    icon: BookOpen,
    color: "bg-purple-500",
    features: [
      {
        title: "Curated Learning Paths",
        description: "Follow structured curricula designed by industry experts for different skill levels.",
        icon: Rocket,
        benefits: ["Expert-designed content", "Progressive difficulty", "Skill assessments", "Certification"],
      },
      {
        title: "Interactive Coding Challenges",
        description: "Practice with real-world coding problems and get instant feedback.",
        icon: Code,
        benefits: ["Real-world problems", "Instant feedback", "Multiple languages", "Difficulty levels"],
      },
      {
        title: "Project-Based Learning",
        description: "Build real applications while learning new technologies and concepts.",
        icon: Lightbulb,
        benefits: ["Hands-on projects", "Portfolio building", "Real applications", "Industry relevance"],
      },
      {
        title: "Peer Code Review",
        description: "Get your code reviewed by peers and learn from others' solutions.",
        icon: Search,
        benefits: ["Code quality improvement", "Best practices", "Learning from peers", "Collaborative learning"],
      },
    ],
  },
  {
    id: "projects",
    title: "Collaborative Projects",
    description: "Work on real projects with other developers and build your portfolio",
    icon: Code,
    color: "bg-orange-500",
    features: [
      {
        title: "Open Source Discovery",
        description: "Find and contribute to open source projects that match your interests and skill level.",
        icon: Globe,
        benefits: ["Project discovery", "Skill matching", "Contribution tracking", "Impact measurement"],
      },
      {
        title: "Team Formation",
        description: "Form teams with complementary skills for hackathons and long-term projects.",
        icon: Users,
        benefits: ["Skill complementarity", "Team matching", "Role assignment", "Collaboration tools"],
      },
      {
        title: "Version Control Integration",
        description: "Seamless integration with Git and popular version control platforms.",
        icon: Database,
        benefits: ["Git integration", "Branch management", "Merge requests", "Code history"],
      },
      {
        title: "Project Showcase",
        description: "Showcase your projects to potential employers and the developer community.",
        icon: Award,
        benefits: ["Portfolio building", "Project visibility", "Employer discovery", "Community recognition"],
      },
    ],
  },
  {
    id: "community",
    title: "Community & Events",
    description: "Connect with fellow developers through events and community activities",
    icon: Calendar,
    color: "bg-red-500",
    features: [
      {
        title: "Event Discovery",
        description: "Find local and virtual tech events, workshops, and conferences.",
        icon: Search,
        benefits: ["Local events", "Virtual attendance", "Workshop registration", "Conference access"],
      },
      {
        title: "Networking Tools",
        description: "Connect with attendees before, during, and after events.",
        icon: Share2,
        benefits: ["Attendee matching", "Contact exchange", "Follow-up tools", "Relationship building"],
      },
      {
        title: "Event Hosting",
        description: "Organize and host your own events with built-in management tools.",
        icon: Settings,
        benefits: ["Event creation", "Registration management", "Attendee communication", "Analytics"],
      },
      {
        title: "Community Forums",
        description: "Participate in discussions, ask questions, and share knowledge.",
        icon: MessageSquare,
        benefits: ["Discussion forums", "Q&A sections", "Knowledge sharing", "Expert answers"],
      },
    ],
  },
  {
    id: "platform",
    title: "Platform Features",
    description: "Advanced features that make your developer experience seamless",
    icon: Zap,
    color: "bg-indigo-500",
    features: [
      {
        title: "Real-time Notifications",
        description: "Stay updated with instant notifications for opportunities, messages, and updates.",
        icon: Bell,
        benefits: ["Instant alerts", "Customizable preferences", "Mobile notifications", "Email digests"],
      },
      {
        title: "Advanced Search",
        description: "Powerful search capabilities across jobs, mentors, projects, and learning content.",
        icon: Search,
        benefits: ["Multi-category search", "Advanced filters", "Saved searches", "Search suggestions"],
      },
      {
        title: "Data Security",
        description: "Enterprise-grade security to protect your personal and professional information.",
        icon: Shield,
        benefits: ["Data encryption", "Privacy controls", "Secure authentication", "GDPR compliance"],
      },
      {
        title: "Mobile Experience",
        description: "Full-featured mobile app for learning and networking on the go.",
        icon: Smartphone,
        benefits: ["Native mobile app", "Offline capabilities", "Push notifications", "Touch-optimized UI"],
      },
    ],
  },
]

const pricingPlans = [
  {
    name: "Free",
    price: "Rs 0",
    period: "forever",
    description: "Perfect for getting started",
    features: [
      "Basic mentorship matching",
      "Access to job board",
      "Community forums",
      "Basic learning resources",
      "Project discovery",
    ],
    limitations: [
      "Limited mentor sessions (2/month)",
      "Basic job recommendations",
      "Community support only",
    ],
    cta: "Get Started Free",
    popular: false,
  },
  {
    name: "Pro",
    price: "Rs 999",
    period: "per month",
    description: "For serious developers",
    features: [
      "Unlimited mentor sessions",
      "AI-powered job matching",
      "Premium learning content",
      "Priority project access",
      "Advanced analytics",
      "Video session recording",
      "Resume optimization",
      "Interview preparation",
    ],
    limitations: [],
    cta: "Start Pro Trial",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "pricing",
    description: "For teams and organizations",
    features: [
      "Everything in Pro",
      "Team management",
      "Custom learning paths",
      "Dedicated support",
      "API access",
      "White-label options",
      "Advanced reporting",
      "SSO integration",
    ],
    limitations: [],
    cta: "Contact Sales",
    popular: false,
  },
]

const integrations = [
  { name: "GitHub", logo: "🐙", description: "Sync your repositories and contributions" },
  { name: "LinkedIn", logo: "💼", description: "Import your professional profile" },
  { name: "Stack Overflow", logo: "📚", description: "Showcase your Q&A contributions" },
  { name: "Discord", logo: "🎮", description: "Connect with community channels" },
  { name: "Slack", logo: "💬", description: "Team communication integration" },
  { name: "Zoom", logo: "📹", description: "Video conferencing for mentorship" },
  { name: "Google Calendar", logo: "📅", description: "Schedule and manage events" },
  { name: "Notion", logo: "📝", description: "Sync your learning notes" },
]

export default function FeaturesPage() {
  const [activeCategory, setActiveCategory] = useState("mentorship")
  const [selectedPlan, setSelectedPlan] = useState("pro")

  return (
    <Layout isAuthenticated={false}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb
          items={[{ label: "Features" }]}
          className="mb-8"
        />
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Powerful Features for
            <span className="text-blue-600"> Developer Growth</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Everything you need to accelerate your developer career, learn new skills,
            and connect with the thriving Nepali tech community.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg">
              Explore All Features
            </Button>
            <Button size="lg" variant="outline">
              View Pricing
            </Button>
          </div>
        </div>

        {/* Feature Categories */}
        <div className="mb-16">
          <Tabs value={activeCategory} onValueChange={setActiveCategory} className="w-full">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 lg:grid-cols-6 mb-8">
              {featureCategories.map((category) => {
                const Icon = category.icon
                return (
                  <TabsTrigger
                    key={category.id}
                    value={category.id}
                    className="flex items-center gap-2 text-xs md:text-sm p-3"
                  >
                    <Icon className="h-4 w-4"/>
                    <span className="hidden md:inline">{category.title.split(" ")[0]}</span>
                  </TabsTrigger>
                )
              })}
            </TabsList>

            {featureCategories.map((category) => {
              const CategoryIcon = category.icon
              return (
                <TabsContent key={category.id} value={category.id} className="space-y-8">
                  {/* Category Header */}
                  <div className="text-center mb-12">
                    <div
                      className={`${category.color} p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center`}>
                      <CategoryIcon className="h-8 w-8 text-white"/>
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">{category.title}</h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">{category.description}</p>
                  </div>

                  {/* Features Grid */}
                  <div className="grid md:grid-cols-2 gap-8">
                    {category.features.map((feature, index) => {
                      const FeatureIcon = feature.icon
                      return (
                        <Card key={index} className="hover:shadow-lg transition-shadow">
                          <CardHeader>
                            <div className="flex items-center gap-3 mb-3">
                              <div className="bg-gray-100 p-2 rounded-lg">
                                <FeatureIcon className="h-6 w-6 text-gray-700"/>
                              </div>
                              <CardTitle className="text-xl">{feature.title}</CardTitle>
                            </div>
                            <p className="text-gray-600">{feature.description}</p>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-2">
                              {feature.benefits.map((benefit, benefitIndex) => (
                                <div key={benefitIndex} className="flex items-center gap-2">
                                  <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0"/>
                                  <span className="text-sm text-gray-700">{benefit}</span>
                                </div>
                              ))}
                            </div>
                            <Button className="w-full mt-4" variant="outline">
                              Learn More
                            </Button>
                          </CardContent>
                        </Card>
                      )
                    })}
                  </div>
                </TabsContent>
              )
            })}
          </Tabs>
        </div>

        {/* Integrations */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Seamless Integrations</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Connect with your favorite tools and platforms to streamline your workflow.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {integrations.map((integration, index) => (
              <Card key={index} className="text-center hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="text-4xl mb-3">{integration.logo}</div>
                  <h3 className="font-semibold mb-2">{integration.name}</h3>
                  <p className="text-sm text-gray-600">{integration.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Pricing */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Choose Your Plan</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Start free and upgrade as you grow. All plans include our core features.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <Card key={index} className={`relative ${plan.popular ? "border-blue-500 shadow-lg" : ""}`}>
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-500">
                    Most Popular
                  </Badge>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <div className="text-3xl font-bold text-gray-900 mb-2">
                    {plan.price}
                    <span className="text-lg font-normal text-gray-600">/{plan.period}</span>
                  </div>
                  <p className="text-gray-600">{plan.description}</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0"/>
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {plan.limitations.length > 0 && (
                    <div className="border-t pt-4">
                      <p className="text-sm font-medium text-gray-700 mb-2">Limitations:</p>
                      <div className="space-y-2">
                        {plan.limitations.map((limitation, limitIndex) => (
                          <div key={limitIndex} className="flex items-center gap-2">
                            <div className="h-4 w-4 rounded-full bg-gray-300 flex-shrink-0"/>
                            <span className="text-sm text-gray-600">{limitation}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <Button
                    className={`w-full ${plan.popular ? "bg-blue-600 hover:bg-blue-700" : ""}`}
                    variant={plan.popular ? "default" : "outline"}
                  >
                    {plan.cta}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Security & Trust */}
        <Card className="mb-16 bg-gray-50">
          <CardContent className="p-12">
            <div className="text-center mb-8">
              <Shield className="h-12 w-12 text-green-600 mx-auto mb-4"/>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Security & Privacy First</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Your data is protected with enterprise-grade security measures and privacy controls.
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <Lock className="h-8 w-8 text-blue-600 mx-auto mb-3"/>
                <h3 className="font-semibold mb-2">Data Encryption</h3>
                <p className="text-sm text-gray-600">End-to-end encryption for all sensitive data</p>
              </div>
              <div className="text-center">
                <Shield className="h-8 w-8 text-green-600 mx-auto mb-3"/>
                <h3 className="font-semibold mb-2">Privacy Controls</h3>
                <p className="text-sm text-gray-600">Granular privacy settings and data control</p>
              </div>
              <div className="text-center">
                <Cloud className="h-8 w-8 text-purple-600 mx-auto mb-3"/>
                <h3 className="font-semibold mb-2">Secure Infrastructure</h3>
                <p className="text-sm text-gray-600">Hosted on secure, compliant cloud platforms</p>
              </div>
              <div className="text-center">
                <CheckCircle className="h-8 w-8 text-orange-600 mx-auto mb-3"/>
                <h3 className="font-semibold mb-2">GDPR Compliant</h3>
                <p className="text-sm text-gray-600">Full compliance with data protection regulations</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CTA Section */}
        <Card className="text-center bg-gradient-to-r from-blue-500 to-purple-600 text-white">
          <CardContent className="p-12">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Supercharge Your Developer Journey?
            </h2>
            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              Join thousands of developers who are already using Nepal Dev to advance their careers.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" variant="secondary" className="flex items-center gap-2">
                Start Free Trial
                <ArrowRight className="h-5 w-5"/>
              </Button>
              <Button size="lg" variant="outline"
                      className="border-white text-white hover:bg-white hover:text-blue-600">
                Schedule Demo
              </Button>
            </div>
            <p className="text-sm opacity-75 mt-4">
              No credit card required • 14-day free trial • Cancel anytime
            </p>
          </CardContent>
        </Card>
      </div>
    </Layout>
  )
}
