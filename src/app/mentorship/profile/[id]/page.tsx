"use client"

import Layout from "@/components/layout/layout"
import MentorshipBreadcrumb from "@/components/mentorship/mentorship-breadcrumb"
import Avatar from "@/components/ui/avatar"
import Badge from "@/components/ui/badge"
import Button from "@/components/ui/button"
import Card from "@/components/ui/card"
import {
  Award,
  BookOpen,
  Briefcase,
  Calendar,
  CheckCircle,
  Globe,
  Heart,
  MapPin,
  MessageSquare,
  Share2,
  Star,
  Target,
  TrendingUp,
  Users,
  Video,
} from "lucide-react"
import { useParams } from "next/navigation"
import { useState } from "react"

const MentorProfilePage = () => {
  const params = useParams()
  const mentorId = params.id as string
  const [activeTab, setActiveTab] = useState<"overview" | "reviews" | "availability">("overview")
  const [isFavorite, setIsFavorite] = useState(false)

  // Mock mentor data - in real app, fetch based on mentorId
  const mentor = {
    id: mentorId,
    name: "Rajesh Hamal",
    title: "Senior Full Stack Developer",
    company: "Tech Nepal Pvt Ltd",
    experience: 8,
    location: "Kathmandu, Nepal",
    rating: 4.9,
    reviewCount: 127,
    avatar: "https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=Professional%20Nepali%20software%20developer%20headshot%2C%20friendly%20smile%2C%20modern%20office%20background&image_size=square",
    skills: ["React", "Node.js", "TypeScript", "AWS", "MongoDB", "GraphQL", "Docker", "Kubernetes"],
    languages: ["English", "Nepali", "Hindi"],
    availability: ["Available now"],
    hourlyRate: 45,
    responseTime: "< 2 hours",
    sessionTypes: ["video", "chat", "screen-share"],
    totalSessions: 127,
    bio: "Passionate full-stack developer with 8+ years of experience building scalable web applications. I love mentoring junior developers and sharing knowledge about modern web technologies. I have helped over 100+ developers advance their careers through personalized mentorship and hands-on project guidance.",
    isOnline: true,
    completedMentorships: 89,
    successRate: 96,
    specializations: ["Web Development", "System Design", "Career Guidance", "Technical Interviews"],
    education: "Masters in Computer Science, Tribhuvan University",
    certifications: ["AWS Certified Solutions Architect", "Google Cloud Professional"],
    achievements: [
      "Top 1% Mentor on Platform",
      "500+ Hours of Mentoring",
      "95% Success Rate",
      "Expert in Full Stack Development",
    ],
  }

  const reviews = [
    {
      id: 1,
      reviewer: "Sita Sharma",
      avatar: "👩‍💻",
      rating: 5,
      date: "2 weeks ago",
      comment: "Rajesh is an exceptional mentor! His guidance helped me land my first developer job. He provided clear explanations and practical advice that made complex concepts easy to understand.",
    },
    {
      id: 2,
      reviewer: "Arjun Thapa",
      avatar: "👨‍🎓",
      rating: 5,
      date: "1 month ago",
      comment: "Amazing mentor with deep technical knowledge. The mock interviews and code reviews were incredibly valuable for my career growth.",
    },
    {
      id: 3,
      reviewer: "Maya Gurung",
      avatar: "👩‍🎨",
      rating: 4,
      date: "2 months ago",
      comment: "Great experience! Rajesh helped me transition from design to full-stack development. His patient teaching style made the learning process enjoyable.",
    },
  ]

  const availableSlots = [
    { date: "Today", time: "2:00 PM - 3:00 PM", available: true },
    { date: "Today", time: "4:00 PM - 5:00 PM", available: true },
    { date: "Tomorrow", time: "10:00 AM - 11:00 AM", available: true },
    { date: "Tomorrow", time: "2:00 PM - 3:00 PM", available: false },
    { date: "Dec 28", time: "9:00 AM - 10:00 AM", available: true },
    { date: "Dec 28", time: "3:00 PM - 4:00 PM", available: true },
  ]

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 p-6">
        <MentorshipBreadcrumb items={[
          { label: "Browse", href: "/mentorship/browse" },
          { label: mentor.name },
        ]}/>

        <div className="max-w-6xl mx-auto space-y-8">
          {/* Header Section */}
          <Card className="p-8">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Profile Info */}
              <div className="flex-1">
                <div className="flex items-start gap-6">
                  <div className="relative">
                    <Avatar
                      src={mentor.avatar}
                      alt={mentor.name}
                      name={mentor.name}
                      size="2xl"
                      className="h-24 w-24"
                    />
                    {mentor.isOnline && (
                      <div
                        className="absolute -bottom-1 -right-1 h-6 w-6 bg-green-500 border-4 border-white rounded-full"></div>
                    )}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">{mentor.name}</h1>
                        <p className="text-xl text-gray-600 flex items-center gap-2 mb-2">
                          <Briefcase className="h-5 w-5"/>
                          {mentor.title} at {mentor.company}
                        </p>
                        <p className="text-gray-500 flex items-center gap-2">
                          <MapPin className="h-4 w-4"/>
                          {mentor.location}
                        </p>
                      </div>

                      <div className="flex items-center gap-3">
                        <Button
                          variant="outline"
                          onClick={() => setIsFavorite(!isFavorite)}
                          className={isFavorite ? "text-red-500 hover:text-red-600" : "text-gray-400 hover:text-red-500"}
                        >
                          <Heart className={`h-5 w-5 ${isFavorite ? "fill-current" : ""}`}/>
                        </Button>
                        <Button variant="outline">
                          <Share2 className="h-5 w-5"/>
                        </Button>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="flex flex-wrap gap-6 mb-4">
                      <div className="flex items-center gap-2">
                        <Star className="h-5 w-5 fill-yellow-400 text-yellow-400"/>
                        <span className="font-semibold text-lg">{mentor.rating}</span>
                        <span className="text-gray-500">({mentor.reviewCount} reviews)</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Award className="h-5 w-5"/>
                        <span>{mentor.experience} years experience</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Users className="h-5 w-5"/>
                        <span>{mentor.completedMentorships} mentorships completed</span>
                      </div>
                      <div className="flex items-center gap-2 text-green-600">
                        <TrendingUp className="h-5 w-5"/>
                        <span>{mentor.successRate}% success rate</span>
                      </div>
                    </div>

                    {/* Bio */}
                    <p className="text-gray-700 leading-relaxed">{mentor.bio}</p>
                  </div>
                </div>
              </div>

              {/* Action Panel */}
              <div className="lg:w-80">
                <Card className="p-6 bg-gradient-to-br from-blue-50 to-green-50">
                  <div className="text-center mb-6">
                    <div className="text-3xl font-bold text-green-600 mb-1">
                      ${mentor.hourlyRate}/hour
                    </div>
                    <p className="text-sm text-gray-600">Responds in {mentor.responseTime}</p>
                  </div>

                  <div className="space-y-3">
                    <Button className="w-full bg-blue-600 hover:bg-blue-700" size="lg">
                      <Calendar className="h-5 w-5 mr-2"/>
                      Book Session
                    </Button>
                    <Button variant="outline" className="w-full" size="lg">
                      <MessageSquare className="h-5 w-5 mr-2"/>
                      Send Message
                    </Button>
                  </div>

                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <h4 className="font-semibold mb-3">Session Types</h4>
                    <div className="flex flex-wrap gap-2">
                      {mentor.sessionTypes.map((type, index) => (
                        <Badge key={index} variant="default" className="flex items-center gap-1">
                          {type === "video" && <Video className="h-3 w-3"/>}
                          {type === "chat" && <MessageSquare className="h-3 w-3"/>}
                          {type === "screen-share" && <Users className="h-3 w-3"/>}
                          {type}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4">
                    <h4 className="font-semibold mb-3">Languages</h4>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Globe className="h-4 w-4"/>
                      <span>{mentor.languages.join(", ")}</span>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </Card>

          {/* Navigation Tabs */}
          <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
            {[
              { key: "overview", label: "Overview" },
              { key: "reviews", label: `Reviews (${mentor.reviewCount})` },
              { key: "availability", label: "Availability" },
            ].map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as any)}
                className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === tab.key
                    ? "bg-white text-blue-600 shadow-sm"
                    : "text-gray-600 hover:text-gray-800"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          {activeTab === "overview" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Skills & Expertise */}
              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Target className="h-5 w-5 text-blue-500"/>
                  Skills & Expertise
                </h3>
                <div className="flex flex-wrap gap-2 mb-6">
                  {mentor.skills.map((skill, index) => (
                    <Badge key={index} variant="default">{skill}</Badge>
                  ))}
                </div>

                <h4 className="font-semibold mb-3">Specializations</h4>
                <div className="space-y-2">
                  {mentor.specializations.map((spec, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500"/>
                      <span>{spec}</span>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Education & Achievements */}
              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-green-500"/>
                  Education & Achievements
                </h3>

                <div className="mb-6">
                  <h4 className="font-semibold mb-2">Education</h4>
                  <p className="text-gray-600">{mentor.education}</p>
                </div>

                <div className="mb-6">
                  <h4 className="font-semibold mb-3">Certifications</h4>
                  <div className="space-y-2">
                    {mentor.certifications.map((cert, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Award className="h-4 w-4 text-yellow-500"/>
                        <span>{cert}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">Achievements</h4>
                  <div className="space-y-2">
                    {mentor.achievements.map((achievement, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Star className="h-4 w-4 text-purple-500"/>
                        <span>{achievement}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </div>
          )}

          {activeTab === "reviews" && (
            <div className="space-y-6">
              {reviews.map(review => (
                <Card key={review.id} className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="text-3xl">{review.avatar}</div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold">{review.reviewer}</h4>
                        <span className="text-sm text-gray-500">{review.date}</span>
                      </div>
                      <div className="flex items-center gap-1 mb-3">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400"/>
                        ))}
                      </div>
                      <p className="text-gray-700">{review.comment}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}

          {activeTab === "availability" && (
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-6">Available Time Slots</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {availableSlots.map((slot, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-lg border-2 transition-colors ${
                      slot.available
                        ? "border-green-200 bg-green-50 hover:bg-green-100 cursor-pointer"
                        : "border-gray-200 bg-gray-50 opacity-50 cursor-not-allowed"
                    }`}
                  >
                    <div className="font-semibold text-gray-900">{slot.date}</div>
                    <div className="text-gray-600">{slot.time}</div>
                    <div className={`text-sm mt-2 ${
                      slot.available ? "text-green-600" : "text-gray-500"
                    }`}>
                      {slot.available ? "Available" : "Booked"}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </div>
      </div>
    </Layout>
  )
}

export default MentorProfilePage
