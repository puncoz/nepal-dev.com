"use client"

import Layout from "@/components/layout/layout"
import { Badge } from "@/components/ui/badge"
import Breadcrumb from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Award, BookOpen, Clock, Filter, Play, Search, Star, TrendingUp, Users } from "lucide-react"
import { useState } from "react"

interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  instructorAvatar: string;
  category: string;
  level: "beginner" | "intermediate" | "advanced";
  duration: string;
  lessons: number;
  students: number;
  rating: number;
  price: string;
  thumbnail: string;
  tags: string[];
  progress?: number;
  featured: boolean;
}

const mockCourses: Course[] = [
  {
    id: "1",
    title: "Complete React Development Bootcamp",
    description: "Master React from basics to advanced concepts including hooks, context, and modern patterns.",
    instructor: "Pradeep Karki",
    instructorAvatar: "https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20nepali%20instructor%20avatar%20male&image_size=square",
    category: "Frontend",
    level: "intermediate",
    duration: "12 hours",
    lessons: 45,
    students: 1234,
    rating: 4.8,
    price: "Free",
    thumbnail: "https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=react%20development%20course%20thumbnail%20modern%20design&image_size=landscape_16_9",
    tags: ["React", "JavaScript", "Frontend", "Hooks"],
    progress: 65,
    featured: true,
  },
  {
    id: "2",
    title: "Node.js Backend Mastery",
    description: "Build scalable backend applications with Node.js, Express, and MongoDB.",
    instructor: "Sushma Adhikari",
    instructorAvatar: "https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20nepali%20instructor%20avatar%20female&image_size=square",
    category: "Backend",
    level: "intermediate",
    duration: "15 hours",
    lessons: 52,
    students: 987,
    rating: 4.7,
    price: "NPR 2,500",
    thumbnail: "https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=nodejs%20backend%20development%20course%20thumbnail&image_size=landscape_16_9",
    tags: ["Node.js", "Express", "MongoDB", "API"],
    featured: false,
  },
  {
    id: "3",
    title: "UI/UX Design Fundamentals",
    description: "Learn design principles, user research, and create beautiful interfaces.",
    instructor: "Ravi Shrestha",
    instructorAvatar: "https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20nepali%20designer%20avatar%20male&image_size=square",
    category: "Design",
    level: "beginner",
    duration: "8 hours",
    lessons: 28,
    students: 756,
    rating: 4.9,
    price: "NPR 1,800",
    thumbnail: "https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=ui%20ux%20design%20course%20thumbnail%20colorful&image_size=landscape_16_9",
    tags: ["UI/UX", "Figma", "Design", "Prototyping"],
    progress: 25,
    featured: true,
  },
]

const learningPaths = [
  {
    id: "1",
    title: "Full Stack Developer",
    description: "Complete path from frontend to backend development",
    courses: 8,
    duration: "6 months",
    level: "intermediate",
    students: 2341,
  },
  {
    id: "2",
    title: "Frontend Specialist",
    description: "Master modern frontend technologies and frameworks",
    courses: 5,
    duration: "3 months",
    level: "beginner",
    students: 1876,
  },
  {
    id: "3",
    title: "DevOps Engineer",
    description: "Learn deployment, CI/CD, and cloud technologies",
    courses: 6,
    duration: "4 months",
    level: "advanced",
    students: 892,
  },
]

export default function LearningPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [levelFilter, setLevelFilter] = useState("all")
  const [activeTab, setActiveTab] = useState("courses")

  const filteredCourses = mockCourses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesCategory = categoryFilter === "all" || course.category.toLowerCase() === categoryFilter.toLowerCase()
    const matchesLevel = levelFilter === "all" || course.level === levelFilter

    return matchesSearch && matchesCategory && matchesLevel
  })

  const getLevelColor = (level: string) => {
    switch (level) {
      case "beginner":
        return "bg-green-100 text-green-800 border-green-300"
      case "intermediate":
        return "bg-yellow-100 text-yellow-800 border-yellow-300"
      case "advanced":
        return "bg-red-100 text-red-800 border-red-300"
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
            items={[{ label: "Learning" }]}
            className="mb-6"
          />
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Learning Hub</h1>
          <p className="text-gray-600">Advance your skills with courses designed by Nepal's tech community</p>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 mb-8 bg-gray-100 p-1 rounded-lg w-fit">
          <button
            onClick={() => setActiveTab("courses")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === "courses"
                ? "bg-white text-blue-600 shadow-sm"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Courses
          </button>
          <button
            onClick={() => setActiveTab("paths")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === "paths"
                ? "bg-white text-blue-600 shadow-sm"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Learning Paths
          </button>
          <button
            onClick={() => setActiveTab("progress")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === "progress"
                ? "bg-white text-blue-600 shadow-sm"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            My Progress
          </button>
        </div>

        {activeTab === "courses" && (
          <>
            {/* Filters */}
            <Card className="mb-8">
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4"/>
                    <Input
                      placeholder="Search courses..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="Category"/>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="frontend">Frontend</SelectItem>
                      <SelectItem value="backend">Backend</SelectItem>
                      <SelectItem value="design">Design</SelectItem>
                      <SelectItem value="devops">DevOps</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={levelFilter} onValueChange={setLevelFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="Level"/>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Levels</SelectItem>
                      <SelectItem value="beginner">Beginner</SelectItem>
                      <SelectItem value="intermediate">Intermediate</SelectItem>
                      <SelectItem value="advanced">Advanced</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Filter className="h-4 w-4"/>
                    More Filters
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Course Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Courses</p>
                      <p className="text-2xl font-bold text-gray-900">{filteredCourses.length}</p>
                    </div>
                    <BookOpen className="h-8 w-8 text-blue-600"/>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Students</p>
                      <p className="text-2xl font-bold text-gray-900">4.2K</p>
                    </div>
                    <Users className="h-8 w-8 text-green-600"/>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Avg Rating</p>
                      <p className="text-2xl font-bold text-gray-900">4.8</p>
                    </div>
                    <Star className="h-8 w-8 text-yellow-600"/>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Completion Rate</p>
                      <p className="text-2xl font-bold text-gray-900">87%</p>
                    </div>
                    <Award className="h-8 w-8 text-purple-600"/>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Course Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map((course) => (
                <Card key={course.id}
                      className={`hover:shadow-lg transition-shadow ${course.featured ? "ring-2 ring-blue-200" : ""}`}>
                  <div className="relative">
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    {course.featured && (
                      <Badge className="absolute top-2 right-2 bg-yellow-100 text-yellow-800 border-yellow-300">
                        Featured
                      </Badge>
                    )}
                    <div
                      className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 transition-all duration-200 flex items-center justify-center rounded-t-lg">
                      <Play className="h-12 w-12 text-white opacity-0 hover:opacity-100 transition-opacity"/>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">{course.title}</h3>
                      <Badge className={getLevelColor(course.level)}>
                        {course.level}
                      </Badge>
                    </div>

                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{course.description}</p>

                    {/* Instructor */}
                    <div className="flex items-center gap-2 mb-4">
                      <img
                        src={course.instructorAvatar}
                        alt={course.instructor}
                        className="w-6 h-6 rounded-full"
                      />
                      <span className="text-sm text-gray-700">{course.instructor}</span>
                    </div>

                    {/* Progress (if enrolled) */}
                    {course.progress !== undefined && (
                      <div className="mb-4">
                        <div className="flex justify-between text-sm text-gray-600 mb-1">
                          <span>Progress</span>
                          <span>{course.progress}%</span>
                        </div>
                        <Progress value={course.progress} className="h-2"/>
                      </div>
                    )}

                    {/* Course Info */}
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3"/>
                          {course.duration}
                        </div>
                        <div className="flex items-center gap-1">
                          <BookOpen className="h-3 w-3"/>
                          {course.lessons} lessons
                        </div>
                      </div>
                    </div>

                    {/* Rating and Students */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-current"/>
                        <span className="text-sm font-medium">{course.rating}</span>
                        <span className="text-sm text-gray-500">({course.students})</span>
                      </div>
                      <span className="text-lg font-bold text-blue-600">{course.price}</span>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 mb-4">
                      {course.tags.slice(0, 3).map((tag, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    {/* Action Button */}
                    <Button className="w-full">
                      {course.progress !== undefined ? "Continue Learning" : "Enroll Now"}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        )}

        {activeTab === "paths" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {learningPaths.map((path) => (
              <Card key={path.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-blue-600"/>
                    {path.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{path.description}</p>
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Courses:</span>
                      <span className="font-medium">{path.courses}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Duration:</span>
                      <span className="font-medium">{path.duration}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Level:</span>
                      <Badge className={getLevelColor(path.level)} variant="secondary">
                        {path.level}
                      </Badge>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Students:</span>
                      <span className="font-medium">{path.students.toLocaleString()}</span>
                    </div>
                  </div>
                  <Button className="w-full">Start Learning Path</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {activeTab === "progress" && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>My Learning Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockCourses.filter(course => course.progress !== undefined).map((course) => (
                    <div key={course.id} className="flex items-center gap-4 p-4 border rounded-lg">
                      <img
                        src={course.thumbnail}
                        alt={course.title}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium">{course.title}</h4>
                        <p className="text-sm text-gray-600">{course.instructor}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <Progress value={course.progress} className="flex-1 h-2"/>
                          <span className="text-sm font-medium">{course.progress}%</span>
                        </div>
                      </div>
                      <Button size="sm">Continue</Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </Layout>
  )
}
