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
  BookOpen,
  Briefcase,
  Calendar,
  CheckCircle,
  Code,
  Globe,
  Play,
  Smartphone,
  Star,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react"
import { useState } from "react"

const demoSections = [
  {
    id: "mentorship",
    title: "AI-Powered Mentorship",
    description: "Connect with experienced developers and get personalized guidance",
    icon: Users,
    color: "bg-blue-500",
    features: [
      "Smart mentor matching based on skills and goals",
      "Integrated video calling and screen sharing",
      "Progress tracking and milestone setting",
      "Community-driven feedback system",
    ],
    demo: {
      title: "Find Your Perfect Mentor",
      description: "Our AI analyzes your profile, skills, and career goals to match you with the most suitable mentors.",
      image: "https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=ai%20mentor%20matching%20interface%20dashboard%20modern&image_size=landscape_16_9",
    },
  },
  {
    id: "jobs",
    title: "Smart Job Board",
    description: "Discover opportunities tailored to your skills and preferences",
    icon: Briefcase,
    color: "bg-green-500",
    features: [
      "AI-powered job recommendations",
      "Skill-based filtering and matching",
      "Direct application tracking",
      "Salary insights and market trends",
    ],
    demo: {
      title: "Personalized Job Recommendations",
      description: "Get job suggestions that match your skills, experience level, and career aspirations.",
      image: "https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=job%20board%20interface%20recommendations%20dashboard&image_size=landscape_16_9",
    },
  },
  {
    id: "learning",
    title: "Interactive Learning Hub",
    description: "Master new technologies with hands-on courses and projects",
    icon: BookOpen,
    color: "bg-purple-500",
    features: [
      "Curated learning paths for different skill levels",
      "Interactive coding challenges",
      "Real-world project assignments",
      "Peer code review and collaboration",
    ],
    demo: {
      title: "Structured Learning Paths",
      description: "Follow carefully designed curricula that take you from beginner to expert in your chosen technology.",
      image: "https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=interactive%20learning%20platform%20coding%20courses&image_size=landscape_16_9",
    },
  },
  {
    id: "projects",
    title: "Collaborative Projects",
    description: "Build real applications while working with other developers",
    icon: Code,
    color: "bg-orange-500",
    features: [
      "Open source project discovery",
      "Team formation and collaboration tools",
      "Version control integration",
      "Project showcase and portfolio building",
    ],
    demo: {
      title: "Build Together",
      description: "Join collaborative projects or start your own. Work with developers across Nepal and beyond.",
      image: "https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=collaborative%20coding%20project%20team%20development&image_size=landscape_16_9",
    },
  },
  {
    id: "events",
    title: "Community Events",
    description: "Attend workshops, meetups, and conferences",
    icon: Calendar,
    color: "bg-red-500",
    features: [
      "Local and virtual event listings",
      "Workshop and conference registration",
      "Networking opportunities",
      "Event hosting and management tools",
    ],
    demo: {
      title: "Stay Connected",
      description: "Discover and attend events that help you grow your network and skills.",
      image: "https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=tech%20meetup%20conference%20networking%20event&image_size=landscape_16_9",
    },
  },
]

const stats = [
  { label: "Active Developers", value: "2,500+", icon: Users },
  { label: "Job Opportunities", value: "150+", icon: Briefcase },
  { label: "Learning Resources", value: "300+", icon: BookOpen },
  { label: "Success Stories", value: "500+", icon: Award },
]

const testimonials = [
  {
    name: "Rajesh Hamal",
    role: "Full Stack Developer",
    company: "Tech Innovate Nepal",
    content: "Nepal Dev helped me transition from a junior to senior developer role. The mentorship program was invaluable.",
    avatar: "https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20nepali%20male%20developer%20testimonial&image_size=square",
    rating: 5,
  },
  {
    name: "Priya Sharma",
    role: "Frontend Developer",
    company: "Digital Solutions Pvt Ltd",
    content: "The learning paths are well-structured and the community is incredibly supportive. Highly recommended!",
    avatar: "https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20nepali%20female%20developer%20testimonial&image_size=square",
    rating: 5,
  },
  {
    name: "Amit Thapa",
    role: "Backend Developer",
    company: "StartUp Hub Nepal",
    content: "Found my dream job through Nepal Dev. The job matching algorithm is spot on!",
    avatar: "https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20nepali%20male%20backend%20developer&image_size=square",
    rating: 5,
  },
]

export default function DemoPage() {
  const [activeSection, setActiveSection] = useState("mentorship")
  const [isPlaying, setIsPlaying] = useState(false)

  const currentSection = demoSections.find(section => section.id === activeSection)

  return (
    <Layout isAuthenticated={false}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb
          items={[{ label: "Demo" }]}
          className="mb-8"
        />
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Experience Nepal Dev
            <span className="text-blue-600"> in Action</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Discover how our platform empowers Nepali developers to grow their careers,
            learn new skills, and build amazing projects together.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" className="flex items-center gap-2">
              <Play className="h-5 w-5"/>
              Watch Demo Video
            </Button>
            <Button size="lg" variant="outline">
              Start Free Trial
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <Card key={index} className="text-center">
                <CardContent className="p-6">
                  <Icon className="h-8 w-8 text-blue-600 mx-auto mb-3"/>
                  <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Interactive Demo */}
        <Card className="mb-16">
          <CardHeader>
            <CardTitle className="text-center text-2xl mb-4">Interactive Platform Demo</CardTitle>
            <p className="text-center text-gray-600">
              Explore our key features and see how they work together to create the ultimate developer experience.
            </p>
          </CardHeader>
          <CardContent>
            <Tabs value={activeSection} onValueChange={setActiveSection} className="w-full">
              <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 mb-8">
                {demoSections.map((section) => {
                  const Icon = section.icon
                  return (
                    <TabsTrigger
                      key={section.id}
                      value={section.id}
                      className="flex items-center gap-2 text-xs md:text-sm"
                    >
                      <Icon className="h-4 w-4"/>
                      <span className="hidden md:inline">{section.title}</span>
                    </TabsTrigger>
                  )
                })}
              </TabsList>

              {demoSections.map((section) => {
                const Icon = section.icon
                return (
                  <TabsContent key={section.id} value={section.id} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-8 items-center">
                      <div>
                        <div className="flex items-center gap-3 mb-4">
                          <div className={`${section.color} p-3 rounded-lg`}>
                            <Icon className="h-6 w-6 text-white"/>
                          </div>
                          <div>
                            <h3 className="text-2xl font-bold text-gray-900">{section.title}</h3>
                            <p className="text-gray-600">{section.description}</p>
                          </div>
                        </div>

                        <div className="space-y-3 mb-6">
                          {section.features.map((feature, index) => (
                            <div key={index} className="flex items-center gap-3">
                              <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0"/>
                              <span className="text-gray-700">{feature}</span>
                            </div>
                          ))}
                        </div>

                        <Button className="flex items-center gap-2">
                          Try {section.title}
                          <ArrowRight className="h-4 w-4"/>
                        </Button>
                      </div>

                      <div className="relative">
                        <img
                          src={section.demo.image}
                          alt={section.demo.title}
                          className="w-full rounded-lg shadow-lg"
                        />
                        <div className="absolute inset-0 bg-black/20 rounded-lg flex items-center justify-center">
                          <Button
                            size="lg"
                            className="bg-white/90 text-gray-900 hover:bg-white"
                            onClick={() => setIsPlaying(!isPlaying)}
                          >
                            <Play className="h-6 w-6 mr-2"/>
                            {isPlaying ? "Pause Demo" : "Play Demo"}
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-6">
                      <h4 className="font-semibold text-gray-900 mb-2">{section.demo.title}</h4>
                      <p className="text-gray-600">{section.demo.description}</p>
                    </div>
                  </TabsContent>
                )
              })}
            </Tabs>
          </CardContent>
        </Card>

        {/* Key Benefits */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Nepal Dev?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Built specifically for the Nepali developer community with features that matter most.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardContent className="p-8">
                <div className="bg-blue-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Zap className="h-8 w-8 text-blue-600"/>
                </div>
                <h3 className="text-xl font-semibold mb-3">AI-Powered Matching</h3>
                <p className="text-gray-600">
                  Our intelligent algorithms connect you with the right mentors, jobs, and learning opportunities.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-8">
                <div className="bg-green-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Globe className="h-8 w-8 text-green-600"/>
                </div>
                <h3 className="text-xl font-semibold mb-3">Local & Global</h3>
                <p className="text-gray-600">
                  Connect with developers in Nepal while accessing global opportunities and resources.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-8">
                <div className="bg-purple-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <TrendingUp className="h-8 w-8 text-purple-600"/>
                </div>
                <h3 className="text-xl font-semibold mb-3">Career Growth</h3>
                <p className="text-gray-600">
                  Track your progress, set goals, and advance your career with personalized guidance.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Testimonials */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What Developers Say</h2>
            <p className="text-xl text-gray-600">
              Join thousands of developers who have transformed their careers with Nepal Dev.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400"/>
                    ))}
                  </div>
                  <p className="text-gray-700 mb-6 italic">"{testimonial.content}"</p>
                  <div className="flex items-center gap-3">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full"
                    />
                    <div>
                      <p className="font-semibold text-gray-900">{testimonial.name}</p>
                      <p className="text-sm text-gray-600">{testimonial.role}</p>
                      <p className="text-sm text-gray-500">{testimonial.company}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Mobile App Preview */}
        <Card className="mb-16 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
          <CardContent className="p-8">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Smartphone className="h-6 w-6"/>
                  <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                    Coming Soon
                  </Badge>
                </div>
                <h3 className="text-2xl font-bold mb-4">Nepal Dev Mobile App</h3>
                <p className="text-lg opacity-90 mb-6">
                  Take your developer journey on the go. Access mentorship, jobs, and learning
                  opportunities from anywhere in Nepal.
                </p>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5"/>
                    <span>Offline learning capabilities</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5"/>
                    <span>Push notifications for opportunities</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5"/>
                    <span>Mobile-optimized coding challenges</span>
                  </div>
                </div>
                <Button variant="secondary" size="lg">
                  Get Notified When Available
                </Button>
              </div>
              <div className="text-center">
                <img
                  src="https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=mobile%20app%20mockup%20developer%20platform%20interface&image_size=portrait_4_3"
                  alt="Nepal Dev Mobile App"
                  className="max-w-xs mx-auto rounded-2xl shadow-2xl"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CTA Section */}
        <Card className="text-center bg-gray-50">
          <CardContent className="p-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Ready to Transform Your Developer Journey?
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Join Nepal's largest developer community and take your career to the next level.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="flex items-center gap-2">
                Start Your Journey
                <ArrowRight className="h-5 w-5"/>
              </Button>
              <Button size="lg" variant="outline">
                Schedule a Demo
              </Button>
            </div>
            <p className="text-sm text-gray-500 mt-4">
              Free to join • No credit card required • Start learning immediately
            </p>
          </CardContent>
        </Card>
      </div>
    </Layout>
  )
}
