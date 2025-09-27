"use client"

import Layout from "@/components/layout/layout"
import { Badge } from "@/components/ui/badge"
import Breadcrumb from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Briefcase, Code, Globe, Heart, MessageCircle, Target, Users, Zap } from "lucide-react"

const stats = [
  { label: "Active Developers", value: "2,500+", icon: Users },
  { label: "Mentorship Sessions", value: "1,200+", icon: MessageCircle },
  { label: "Projects Completed", value: "350+", icon: Code },
  { label: "Job Placements", value: "180+", icon: Briefcase },
]

const values = [
  {
    icon: Heart,
    title: "Community First",
    description: "We believe in the power of community-driven learning and growth. Every feature is designed to bring developers together.",
  },
  {
    icon: Target,
    title: "Goal-Oriented",
    description: "We help developers set clear goals and provide the resources and mentorship needed to achieve them.",
  },
  {
    icon: Globe,
    title: "Inclusive & Diverse",
    description: "We welcome developers from all backgrounds, experience levels, and specializations to create a rich learning environment.",
  },
  {
    icon: Zap,
    title: "Innovation Driven",
    description: "We constantly evolve our platform to incorporate the latest technologies and best practices in software development.",
  },
]

const team = [
  {
    name: "Rajesh Hamal",
    role: "Founder & CEO",
    bio: "Full-stack developer with 10+ years of experience. Passionate about building developer communities.",
    avatar: "https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20nepali%20male%20developer%20ceo%20portrait&image_size=square",
    skills: ["React", "Node.js", "Leadership"],
  },
  {
    name: "Priya Sharma",
    role: "Head of Community",
    bio: "Community builder and developer advocate. Loves connecting people and fostering collaboration.",
    avatar: "https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20nepali%20female%20community%20manager%20portrait&image_size=square",
    skills: ["Community Building", "Event Management", "Python"],
  },
  {
    name: "Amit Thapa",
    role: "Lead Developer",
    bio: "Senior software engineer specializing in scalable web applications and mentoring junior developers.",
    avatar: "https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20nepali%20male%20senior%20developer%20portrait&image_size=square",
    skills: ["JavaScript", "DevOps", "Mentoring"],
  },
  {
    name: "Sita Rai",
    role: "UX Designer",
    bio: "User experience designer focused on creating intuitive and accessible interfaces for developers.",
    avatar: "https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20nepali%20female%20ux%20designer%20portrait&image_size=square",
    skills: ["UI/UX Design", "Figma", "User Research"],
  },
]

const milestones = [
  {
    year: "2022",
    title: "Platform Launch",
    description: "Nepal Dev was founded with a vision to connect Nepali developers worldwide.",
  },
  {
    year: "2023",
    title: "Community Growth",
    description: "Reached 1,000+ active members and launched the mentorship program.",
  },
  {
    year: "2024",
    title: "Expansion",
    description: "Introduced job board, project showcase, and learning resources.",
  },
]

export default function AboutPage() {
  return (
    <Layout isAuthenticated={true} user={{ name: "John Doe", email: "john@example.com" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb
          items={[{ label: "About" }]}
          className="mb-8"
        />
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Empowering Nepal&apos;s
            <span className="text-blue-600"> Developer Community</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Nepal Dev is a platform dedicated to connecting, mentoring, and empowering developers
            across Nepal and the global Nepali diaspora. We believe in the power of community-driven
            learning and collaborative growth.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" className="flex items-center gap-2">
              <Users className="h-5 w-5"/>
              Join Community
            </Button>
            <Button variant="outline" size="lg">
              Learn More
            </Button>
          </div>
        </div>

        {/* Stats Section */}
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

        {/* Mission Section */}
        <div className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-lg text-gray-600 mb-6">
                To create a thriving ecosystem where Nepali developers can learn, grow, and succeed
                together. We provide mentorship, resources, and opportunities that bridge the gap
                between aspiration and achievement.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                Whether you&apos;re a beginner taking your first steps in programming or an experienced
                developer looking to give back to the community, Nepal Dev is your platform for
                growth and connection.
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge className="bg-blue-100 text-blue-800 border-blue-300">Community Driven</Badge>
                <Badge className="bg-green-100 text-green-800 border-green-300">Open Source</Badge>
                <Badge className="bg-purple-100 text-purple-800 border-purple-300">Inclusive</Badge>
                <Badge className="bg-orange-100 text-orange-800 border-orange-300">Innovation</Badge>
              </div>
            </div>
            <div>
              <img
                src="https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=nepali%20developers%20community%20collaboration%20modern%20office&image_size=landscape_4_3"
                alt="Nepal Dev Community"
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon
              return (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="bg-blue-100 p-3 rounded-lg">
                        <Icon className="h-6 w-6 text-blue-600"/>
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">{value.title}</h3>
                        <p className="text-gray-600">{value.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                  />
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-blue-600 font-medium mb-3">{member.role}</p>
                  <p className="text-sm text-gray-600 mb-4">{member.bio}</p>
                  <div className="flex flex-wrap justify-center gap-1">
                    {member.skills.map((skill, skillIndex) => (
                      <Badge key={skillIndex} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Timeline Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Our Journey</h2>
          <div className="max-w-3xl mx-auto">
            {milestones.map((milestone, index) => (
              <div key={index} className="flex gap-6 mb-8 last:mb-0">
                <div className="flex flex-col items-center">
                  <div
                    className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-sm">
                    {milestone.year}
                  </div>
                  {index < milestones.length - 1 && (
                    <div className="w-0.5 bg-gray-300 h-16 mt-4"></div>
                  )}
                </div>
                <div className="flex-1 pb-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{milestone.title}</h3>
                  <p className="text-gray-600">{milestone.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 md:p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Join Our Community?</h2>
          <p className="text-xl mb-8 opacity-90">
            Connect with fellow developers, find mentors, and accelerate your career growth.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" variant="secondary">
              Get Started Today
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
              Contact Us
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  )
}
