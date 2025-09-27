"use client"

import Layout from "@/components/layout/layout"
import { Badge } from "@/components/ui/badge"
import Breadcrumb from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Code, ExternalLink, Filter, GitFork, Github, Heart, Search, Star, Users } from "lucide-react"
import { useState } from "react"

interface Project {
  id: string;
  title: string;
  description: string;
  author: string;
  authorAvatar: string;
  tags: string[];
  stars: number;
  forks: number;
  contributors: number;
  language: string;
  lastUpdated: string;
  status: "active" | "completed" | "seeking-contributors";
  githubUrl: string;
  liveUrl?: string;
  featured: boolean;
}

const mockProjects: Project[] = [
  {
    id: "1",
    title: "Nepal Tourism App",
    description: "A comprehensive mobile app showcasing Nepal's tourist destinations with interactive maps, reviews, and booking features.",
    author: "Rajesh Hamal",
    authorAvatar: "https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20nepali%20developer%20avatar%20male&image_size=square",
    tags: ["React Native", "Node.js", "MongoDB", "Tourism"],
    stars: 124,
    forks: 32,
    contributors: 8,
    language: "JavaScript",
    lastUpdated: "2 days ago",
    status: "active",
    githubUrl: "https://github.com/example/nepal-tourism",
    liveUrl: "https://nepal-tourism.vercel.app",
    featured: true,
  },
  {
    id: "2",
    title: "Nepali Calendar Widget",
    description: "A beautiful and customizable Nepali calendar component for web applications with festival dates and events.",
    author: "Sita Sharma",
    authorAvatar: "https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20nepali%20developer%20avatar%20female&image_size=square",
    tags: ["React", "TypeScript", "Calendar", "Widget"],
    stars: 89,
    forks: 23,
    contributors: 5,
    language: "TypeScript",
    lastUpdated: "1 week ago",
    status: "seeking-contributors",
    githubUrl: "https://github.com/example/nepali-calendar",
    liveUrl: "https://nepali-calendar-demo.vercel.app",
    featured: false,
  },
  {
    id: "3",
    title: "E-commerce Platform",
    description: "Modern e-commerce solution built for Nepali businesses with local payment integration and multi-language support.",
    author: "Amit Thapa",
    authorAvatar: "https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20nepali%20developer%20avatar%20male%20glasses&image_size=square",
    tags: ["Next.js", "Stripe", "PostgreSQL", "E-commerce"],
    stars: 156,
    forks: 45,
    contributors: 12,
    language: "JavaScript",
    lastUpdated: "3 days ago",
    status: "completed",
    githubUrl: "https://github.com/example/nepal-ecommerce",
    featured: true,
  },
]

export default function ProjectsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [languageFilter, setLanguageFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredProjects = mockProjects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesLanguage = languageFilter === "all" || project.language.toLowerCase() === languageFilter.toLowerCase()
    const matchesStatus = statusFilter === "all" || project.status === statusFilter

    return matchesSearch && matchesLanguage && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 border-green-300"
      case "completed":
        return "bg-blue-100 text-blue-800 border-blue-300"
      case "seeking-contributors":
        return "bg-yellow-100 text-yellow-800 border-yellow-300"
      default:
        return "bg-gray-100 text-gray-800 border-gray-300"
    }
  }

  return (
    <Layout isAuthenticated={true} user={{ name: "John Doe", email: "john@example.com" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Breadcrumb
            items={[{ label: "Projects" }]}
            className="mb-6"
          />
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Community Projects</h1>
          <p className="text-gray-600">Discover and contribute to amazing projects built by the Nepal Dev community</p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 mb-8">
          <Button className="flex items-center gap-2">
            <Code className="h-4 w-4"/>
            Submit Project
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <Github className="h-4 w-4"/>
            Import from GitHub
          </Button>
        </div>

        {/* Filters */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4"/>
                <Input
                  placeholder="Search projects..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={languageFilter} onValueChange={setLanguageFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Language"/>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Languages</SelectItem>
                  <SelectItem value="javascript">JavaScript</SelectItem>
                  <SelectItem value="typescript">TypeScript</SelectItem>
                  <SelectItem value="python">Python</SelectItem>
                  <SelectItem value="java">Java</SelectItem>
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Status"/>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="seeking-contributors">Seeking Contributors</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" className="flex items-center gap-2">
                <Filter className="h-4 w-4"/>
                More Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Project Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Projects</p>
                  <p className="text-2xl font-bold text-gray-900">{filteredProjects.length}</p>
                </div>
                <Code className="h-8 w-8 text-blue-600"/>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Contributors</p>
                  <p className="text-2xl font-bold text-gray-900">47</p>
                </div>
                <Users className="h-8 w-8 text-green-600"/>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Stars</p>
                  <p className="text-2xl font-bold text-gray-900">369</p>
                </div>
                <Star className="h-8 w-8 text-yellow-600"/>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Projects</p>
                  <p className="text-2xl font-bold text-gray-900">12</p>
                </div>
                <Heart className="h-8 w-8 text-red-600"/>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <Card key={project.id}
                  className={`hover:shadow-lg transition-shadow ${project.featured ? "ring-2 ring-blue-200" : ""}`}>
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <CardTitle className="text-lg">{project.title}</CardTitle>
                  {project.featured && (
                    <Badge className="bg-yellow-100 text-yellow-800 border-yellow-300">
                      Featured
                    </Badge>
                  )}
                </div>
                <Badge className={getStatusColor(project.status)}>
                  {project.status.replace("-", " ").replace(/\b\w/g, l => l.toUpperCase())}
                </Badge>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">{project.description}</p>

                {/* Author */}
                <div className="flex items-center gap-2 mb-4">
                  <img
                    src={project.authorAvatar}
                    alt={project.author}
                    className="w-6 h-6 rounded-full"
                  />
                  <span className="text-sm text-gray-700">{project.author}</span>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {project.tags.slice(0, 3).map((tag, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                  {project.tags.length > 3 && (
                    <Badge variant="secondary" className="text-xs">
                      +{project.tags.length - 3}
                    </Badge>
                  )}
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3"/>
                      {project.stars}
                    </div>
                    <div className="flex items-center gap-1">
                      <GitFork className="h-3 w-3"/>
                      {project.forks}
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-3 w-3"/>
                      {project.contributors}
                    </div>
                  </div>
                  <span>{project.language}</span>
                </div>

                <p className="text-xs text-gray-500 mb-4">Updated {project.lastUpdated}</p>

                {/* Actions */}
                <div className="flex gap-2">
                  <Button size="sm" className="flex-1 flex items-center gap-1">
                    <Github className="h-3 w-3"/>
                    View Code
                  </Button>
                  {project.liveUrl && (
                    <Button size="sm" variant="outline" className="flex items-center gap-1">
                      <ExternalLink className="h-3 w-3"/>
                      Live Demo
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-8">
          <Button variant="outline" size="lg">
            Load More Projects
          </Button>
        </div>
      </div>
    </Layout>
  )
}
