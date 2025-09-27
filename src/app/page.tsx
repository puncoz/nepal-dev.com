"use client"

import Layout from "@/components/layout/layout"
import Button from "@/components/ui/button"
import Card from "@/components/ui/card"
import {
  ArrowRight,
  BookOpen,
  Briefcase,
  Code,
  Heart,
  MapPin,
  Mountain,
  Play,
  Rocket,
  Star,
  TrendingUp,
  Zap,
} from "lucide-react"
import Link from "next/link"
import React, { useEffect, useState } from "react"

interface CommunityStats {
  developers: number;
  mentors: number;
  sessions: number;
  projects: number;
}

interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
  avatar: string;
  rating: number;
}

interface FeaturedProject {
  id: number;
  name: string;
  description: string;
  author: string;
  stars: number;
  tech: string[];
}

const HomePage = () => {
  const [language, setLanguage] = useState<"en" | "ne" | "ja">("en")
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [stats, setStats] = useState<CommunityStats>({
    developers: 1247,
    mentors: 89,
    sessions: 2156,
    projects: 342,
  })

  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Priya Karki",
      role: "Frontend Developer",
      content: "Found my DevOps mentor in 2 days! The AI matching is incredible.",
      avatar: "PK",
      rating: 5,
    },
    {
      id: 2,
      name: "Sujan Maharjan",
      role: "Full Stack Developer",
      content: "Landed my first remote job through connections made here.",
      avatar: "SM",
      rating: 5,
    },
    {
      id: 3,
      name: "Anita Shrestha",
      role: "UI/UX Designer",
      content: "The community support helped me transition into tech successfully.",
      avatar: "AS",
      rating: 5,
    },
  ]

  const featuredProjects: FeaturedProject[] = [
    {
      id: 1,
      name: "Nepal Tourism API",
      description: "RESTful API for Nepal tourism data",
      author: "Ram Kumar",
      stars: 124,
      tech: ["Node.js", "MongoDB", "Express"],
    },
    {
      id: 2,
      name: "Nepali Date Converter",
      description: "Convert between Nepali and English dates",
      author: "Sita Poudel",
      stars: 89,
      tech: ["React", "TypeScript", "Vite"],
    },
    {
      id: 3,
      name: "E-commerce Platform",
      description: "Modern e-commerce solution for local businesses",
      author: "Bikash Thapa",
      stars: 156,
      tech: ["Next.js", "Prisma", "PostgreSQL"],
    },
  ]

  const translations = {
    en: {
      hero: {
        title: "Connect, Learn, Grow with Nepal's Developer Community",
        subtitle: "Join thousands of developers, find mentors, discover opportunities, and build amazing projects together.",
        getStarted: "Get Started",
        watchDemo: "Watch Demo",
        browseMentors: "Browse Mentors",
      },
      stats: {
        developers: "Developers",
        mentors: "Active Mentors",
        sessions: "Sessions Completed",
        projects: "Projects Shared",
      },
      features: {
        title: "Everything You Need to Grow",
        aiMentorship: "AI-Powered Mentorship",
        jobBoard: "Smart Job Board",
        projectHub: "Project Showcase",
        learningHub: "Learning Hub",
        communityMap: "Community Map",
      },
    },
    ne: {
      hero: {
        title: "नेपालको डेभलपर समुदायसँग जोडिनुहोस्, सिक्नुहोस्, बढ्नुहोस्",
        subtitle: "हजारौं डेभलपरहरूसँग जोडिनुहोस्, मेन्टर फेला पार्नुहोस्, अवसरहरू पत्ता लगाउनुहोस्।",
        getStarted: "सुरु गर्नुहोस्",
        watchDemo: "डेमो हेर्नुहोस्",
        browseMentors: "मेन्टरहरू खोज्नुहोस्",
      },
      stats: {
        developers: "डेभलपरहरू",
        mentors: "सक्रिय मेन्टरहरू",
        sessions: "सम्पन्न सत्रहरू",
        projects: "साझा परियोजनाहरू",
      },
      features: {
        title: "बढ्नको लागि आवश्यक सबै कुरा",
        aiMentorship: "AI-संचालित मेन्टरशिप",
        jobBoard: "स्मार्ट जागिर बोर्ड",
        projectHub: "परियोजना प्रदर्शनी",
        learningHub: "सिकाइ केन्द्र",
        communityMap: "समुदायिक नक्सा",
      },
    },
    ja: {
      hero: {
        title: "ネパールの開発者コミュニティと繋がり、学び、成長しよう",
        subtitle: "何千人もの開発者と繋がり、メンターを見つけ、機会を発見し、素晴らしいプロジェクトを一緒に構築しましょう。",
        getStarted: "始める",
        watchDemo: "デモを見る",
        browseMentors: "メンターを探す",
      },
      stats: {
        developers: "開発者",
        mentors: "アクティブメンター",
        sessions: "完了セッション",
        projects: "共有プロジェクト",
      },
      features: {
        title: "成長に必要なすべて",
        aiMentorship: "AI駆動メンターシップ",
        jobBoard: "スマート求人ボード",
        projectHub: "プロジェクトショーケース",
        learningHub: "学習ハブ",
        communityMap: "コミュニティマップ",
      },
    },
  }

  const t = translations[language]

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [testimonials.length])

  // Simulate live stats updates
  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        ...prev,
        developers: prev.developers + Math.floor(Math.random() * 3),
        sessions: prev.sessions + Math.floor(Math.random() * 5),
      }))
    }, 10000)
    return () => clearInterval(interval)
  }, [])

  return (
    <Layout>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-green-600/10"/>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <div className="flex justify-center mb-8">
              <div className="relative">
                <Mountain className="w-20 h-20 text-blue-600 animate-pulse"/>
                <div
                  className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">🇳🇵</span>
                </div>
              </div>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              {t.hero.title}
            </h1>

            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              {t.hero.subtitle}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Link href="/register">
                <Button size="lg" className="w-full sm:w-auto">
                  {t.hero.getStarted}
                  <ArrowRight className="ml-2 w-5 h-5"/>
                </Button>
              </Link>
              <Link href="/demo">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  <Play className="mr-2 w-5 h-5"/>
                  {t.hero.watchDemo}
                </Button>
              </Link>
              <Link href="/mentorship">
                <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                  {t.hero.browseMentors}
                </Button>
              </Link>
            </div>

            {/* Live Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-1">
                  {stats.developers.toLocaleString()}
                </div>
                <div className="text-sm text-gray-600">{t.stats.developers}</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-1">
                  {stats.mentors}
                </div>
                <div className="text-sm text-gray-600">{t.stats.mentors}</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-1">
                  {stats.sessions.toLocaleString()}
                </div>
                <div className="text-sm text-gray-600">{t.stats.sessions}</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600 mb-1">
                  {stats.projects}
                </div>
                <div className="text-sm text-gray-600">{t.stats.projects}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Preview */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t.features.title}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover powerful tools designed to accelerate your development journey
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* AI Mentorship */}
            <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2" hover>
              <div className="text-center p-6">
                <div
                  className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 transition-colors">
                  <Zap className="w-8 h-8 text-blue-600"/>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {t.features.aiMentorship}
                </h3>
                <p className="text-gray-600 mb-4">
                  Get matched with perfect mentors using our AI algorithm based on your goals and experience.
                </p>
                <Link href="/mentorship">
                  <Button variant="outline" size="sm">
                    Learn More
                  </Button>
                </Link>
              </div>
            </Card>

            {/* Job Board */}
            <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2" hover>
              <div className="text-center p-6">
                <div
                  className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-green-200 transition-colors">
                  <Briefcase className="w-8 h-8 text-green-600"/>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {t.features.jobBoard}
                </h3>
                <p className="text-gray-600 mb-4">
                  Discover remote and local opportunities tailored to your skills and career aspirations.
                </p>
                <Link href="/jobs">
                  <Button variant="outline" size="sm">
                    Browse Jobs
                  </Button>
                </Link>
              </div>
            </Card>

            {/* Project Hub */}
            <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2" hover>
              <div className="text-center p-6">
                <div
                  className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-purple-200 transition-colors">
                  <Rocket className="w-8 h-8 text-purple-600"/>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {t.features.projectHub}
                </h3>
                <p className="text-gray-600 mb-4">
                  Showcase your projects, get feedback, and collaborate with other developers.
                </p>
                <Link href="/projects">
                  <Button variant="outline" size="sm">
                    View Projects
                  </Button>
                </Link>
              </div>
            </Card>

            {/* Learning Hub */}
            <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2" hover>
              <div className="text-center p-6">
                <div
                  className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-orange-200 transition-colors">
                  <BookOpen className="w-8 h-8 text-orange-600"/>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {t.features.learningHub}
                </h3>
                <p className="text-gray-600 mb-4">
                  Access curated learning resources and AI-powered explanations for complex topics.
                </p>
                <Link href="/learning">
                  <Button variant="outline" size="sm">
                    Start Learning
                  </Button>
                </Link>
              </div>
            </Card>

            {/* Community Map */}
            <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2" hover>
              <div className="text-center p-6">
                <div
                  className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-red-200 transition-colors">
                  <MapPin className="w-8 h-8 text-red-600"/>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {t.features.communityMap}
                </h3>
                <p className="text-gray-600 mb-4">
                  Connect with developers in your area and join local tech meetups and events.
                </p>
                <Link href="/events">
                  <Button variant="outline" size="sm">
                    Explore Map
                  </Button>
                </Link>
              </div>
            </Card>

            {/* Skill Tracking */}
            <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2" hover>
              <div className="text-center p-6">
                <div
                  className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-indigo-200 transition-colors">
                  <TrendingUp className="w-8 h-8 text-indigo-600"/>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Skill Tracking
                </h3>
                <p className="text-gray-600 mb-4">
                  Track your progress, set goals, and visualize your growth journey over time.
                </p>
                <Link href="/dashboard">
                  <Button variant="outline" size="sm">
                    Track Skills
                  </Button>
                </Link>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-24 bg-gradient-to-r from-blue-50 to-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Success Stories
            </h2>
            <p className="text-xl text-gray-600">
              Real stories from our amazing community members
            </p>
          </div>

          <div className="relative max-w-4xl mx-auto">
            <Card className="p-8 text-center">
              <div className="flex justify-center mb-4">
                {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current"/>
                ))}
              </div>

              <blockquote className="text-2xl text-gray-900 mb-6 font-medium">
                &quot;{testimonials[currentTestimonial].content}&quot;
              </blockquote>

              <div className="flex items-center justify-center space-x-4">
                <div
                  className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                  {testimonials[currentTestimonial].avatar}
                </div>
                <div className="text-left">
                  <div className="font-semibold text-gray-900">
                    {testimonials[currentTestimonial].name}
                  </div>
                  <div className="text-gray-600">
                    {testimonials[currentTestimonial].role}
                  </div>
                </div>
              </div>
            </Card>

            {/* Testimonial indicators */}
            <div className="flex justify-center mt-8 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentTestimonial ? "bg-blue-600" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Community Showcase */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Community Showcase
            </h2>
            <p className="text-xl text-gray-600">
              Discover amazing projects and talented developers in our community
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProjects.map((project) => (
              <Card key={project.id} className="group hover:shadow-xl transition-all duration-300" hover>
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        {project.name}
                      </h3>
                      <p className="text-gray-600 text-sm mb-2">
                        by {project.author}
                      </p>
                    </div>
                    <div className="flex items-center space-x-1 text-yellow-500">
                      <Star className="w-4 h-4 fill-current"/>
                      <span className="text-sm font-medium">{project.stars}</span>
                    </div>
                  </div>

                  <p className="text-gray-600 mb-4">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <Link href="/projects">
                    <Button variant="outline" size="sm" className="w-full">
                      <Code className="w-4 h-4 mr-2"/>
                      View Project
                    </Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/projects">
              <Button size="lg">
                View All Projects
                <ArrowRight className="ml-2 w-5 h-5"/>
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 bg-gradient-to-r from-blue-600 to-green-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Join Nepal&apos;s Largest Developer Community?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Connect with mentors, discover opportunities, and accelerate your career today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 w-full sm:w-auto">
                <Heart className="mr-2 w-5 h-5"/>
                Join the Community
              </Button>
            </Link>
            <Link href="/demo">
              <Button variant="outline" size="lg"
                      className="border-white text-white hover:bg-white hover:text-blue-600 w-full sm:w-auto">
                <Play className="mr-2 w-5 h-5"/>
                Take a Tour
              </Button>
            </Link>
          </div>
        </div>
      </section>

    </Layout>
  )
}

export default HomePage
