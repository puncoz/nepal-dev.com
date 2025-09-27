"use client"

import Layout from "@/components/layout/layout"
import { Badge } from "@/components/ui/badge"
import Breadcrumb from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Clock, Code, Coffee, Filter, MapPin, Plus, Search, Users, Video } from "lucide-react"
import { useState } from "react"

interface Event {
  id: string;
  title: string;
  description: string;
  organizer: string;
  organizerAvatar: string;
  date: string;
  time: string;
  location: string;
  type: "online" | "offline" | "hybrid";
  category: string;
  attendees: number;
  maxAttendees: number;
  price: string;
  image: string;
  tags: string[];
  status: "upcoming" | "ongoing" | "completed";
  featured: boolean;
}

const mockEvents: Event[] = [
  {
    id: "1",
    title: "React Nepal Meetup #15",
    description: "Join us for an exciting evening of React discussions, networking, and learning from industry experts.",
    organizer: "React Nepal Community",
    organizerAvatar: "https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=react%20community%20logo%20avatar&image_size=square",
    date: "2024-02-15",
    time: "18:00",
    location: "Kathmandu, Nepal",
    type: "offline",
    category: "Meetup",
    attendees: 45,
    maxAttendees: 80,
    price: "Free",
    image: "https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=react%20meetup%20event%20banner%20kathmandu&image_size=landscape_16_9",
    tags: ["React", "JavaScript", "Networking", "Frontend"],
    status: "upcoming",
    featured: true,
  },
  {
    id: "2",
    title: "Full Stack Development Workshop",
    description: "Hands-on workshop covering modern full-stack development with React, Node.js, and MongoDB.",
    organizer: "Nepal Dev Community",
    organizerAvatar: "https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=nepal%20dev%20community%20logo&image_size=square",
    date: "2024-02-20",
    time: "10:00",
    location: "Online",
    type: "online",
    category: "Workshop",
    attendees: 120,
    maxAttendees: 200,
    price: "NPR 500",
    image: "https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=full%20stack%20development%20workshop%20banner&image_size=landscape_16_9",
    tags: ["Full Stack", "React", "Node.js", "MongoDB"],
    status: "upcoming",
    featured: false,
  },
  {
    id: "3",
    title: "UI/UX Design Thinking Session",
    description: "Interactive session on design thinking methodology and creating user-centered designs.",
    organizer: "Design Nepal",
    organizerAvatar: "https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=design%20nepal%20community%20logo&image_size=square",
    date: "2024-02-25",
    time: "14:00",
    location: "Pokhara, Nepal",
    type: "hybrid",
    category: "Workshop",
    attendees: 32,
    maxAttendees: 50,
    price: "NPR 300",
    image: "https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=ui%20ux%20design%20thinking%20workshop%20banner&image_size=landscape_16_9",
    tags: ["UI/UX", "Design Thinking", "Figma", "Prototyping"],
    status: "upcoming",
    featured: true,
  },
]

const upcomingEvents = [
  {
    id: "4",
    title: "DevOps Nepal Conference 2024",
    date: "2024-03-10",
    attendees: 250,
  },
  {
    id: "5",
    title: "AI/ML Bootcamp",
    date: "2024-03-15",
    attendees: 180,
  },
  {
    id: "6",
    title: "Startup Pitch Night",
    date: "2024-03-20",
    attendees: 120,
  },
]

export default function EventsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [activeTab, setActiveTab] = useState("all")

  const filteredEvents = mockEvents.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesType = typeFilter === "all" || event.type === typeFilter
    const matchesCategory = categoryFilter === "all" || event.category.toLowerCase() === categoryFilter.toLowerCase()
    const matchesTab = activeTab === "all" || event.status === activeTab

    return matchesSearch && matchesType && matchesCategory && matchesTab
  })

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "online":
        return <Video className="h-4 w-4"/>
      case "offline":
        return <Coffee className="h-4 w-4"/>
      case "hybrid":
        return <Code className="h-4 w-4"/>
      default:
        return <Calendar className="h-4 w-4"/>
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "online":
        return "bg-blue-100 text-blue-800 border-blue-300"
      case "offline":
        return "bg-green-100 text-green-800 border-green-300"
      case "hybrid":
        return "bg-purple-100 text-purple-800 border-purple-300"
      default:
        return "bg-gray-100 text-gray-800 border-gray-300"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "upcoming":
        return "bg-blue-100 text-blue-800 border-blue-300"
      case "ongoing":
        return "bg-green-100 text-green-800 border-green-300"
      case "completed":
        return "bg-gray-100 text-gray-800 border-gray-300"
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
            items={[{ label: "Events" }]}
            className="mb-6"
          />
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Events</h1>
          <p className="text-gray-600">Connect with Nepal's tech community through events and meetups</p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 mb-8">
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4"/>
            Create Event
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <Calendar className="h-4 w-4"/>
            My Events
          </Button>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 mb-8 bg-gray-100 p-1 rounded-lg w-fit">
          <button
            onClick={() => setActiveTab("all")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === "all"
                ? "bg-white text-blue-600 shadow-sm"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            All Events
          </button>
          <button
            onClick={() => setActiveTab("upcoming")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === "upcoming"
                ? "bg-white text-blue-600 shadow-sm"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Upcoming
          </button>
          <button
            onClick={() => setActiveTab("ongoing")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === "ongoing"
                ? "bg-white text-blue-600 shadow-sm"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Live Now
          </button>
          <button
            onClick={() => setActiveTab("completed")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === "completed"
                ? "bg-white text-blue-600 shadow-sm"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Past Events
          </button>
        </div>

        {/* Filters */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4"/>
                <Input
                  placeholder="Search events..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Event Type"/>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="online">Online</SelectItem>
                  <SelectItem value="offline">Offline</SelectItem>
                  <SelectItem value="hybrid">Hybrid</SelectItem>
                </SelectContent>
              </Select>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Category"/>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="meetup">Meetup</SelectItem>
                  <SelectItem value="workshop">Workshop</SelectItem>
                  <SelectItem value="conference">Conference</SelectItem>
                  <SelectItem value="hackathon">Hackathon</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" className="flex items-center gap-2">
                <Filter className="h-4 w-4"/>
                More Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Events List */}
          <div className="lg:col-span-2">
            <div className="space-y-6">
              {filteredEvents.map((event) => (
                <Card key={event.id}
                      className={`hover:shadow-lg transition-shadow ${event.featured ? "ring-2 ring-blue-200" : ""}`}>
                  <div className="md:flex">
                    <div className="md:w-1/3">
                      <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-48 md:h-full object-cover rounded-t-lg md:rounded-l-lg md:rounded-t-none"
                      />
                    </div>
                    <div className="md:w-2/3 p-6">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-xl font-semibold text-gray-900">{event.title}</h3>
                            {event.featured && (
                              <Badge className="bg-yellow-100 text-yellow-800 border-yellow-300">
                                Featured
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-2 mb-2">
                            <Badge className={getTypeColor(event.type)}>
                              <div className="flex items-center gap-1">
                                {getTypeIcon(event.type)}
                                {event.type}
                              </div>
                            </Badge>
                            <Badge className={getStatusColor(event.status)}>
                              {event.status}
                            </Badge>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-blue-600">{event.price}</p>
                        </div>
                      </div>

                      <p className="text-gray-600 mb-4 line-clamp-2">{event.description}</p>

                      {/* Event Details */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4"/>
                          <span>{new Date(event.date).toLocaleDateString("en-US", {
                            weekday: "short",
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4"/>
                          <span>{event.time}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4"/>
                          <span>{event.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4"/>
                          <span>{event.attendees}/{event.maxAttendees} attendees</span>
                        </div>
                      </div>

                      {/* Organizer */}
                      <div className="flex items-center gap-2 mb-4">
                        <img
                          src={event.organizerAvatar}
                          alt={event.organizer}
                          className="w-6 h-6 rounded-full"
                        />
                        <span className="text-sm text-gray-700">by {event.organizer}</span>
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1 mb-4">
                        {event.tags.slice(0, 4).map((tag, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2">
                        <Button className="flex-1">
                          {event.status === "upcoming" ? "Register" : event.status === "ongoing" ? "Join Now" : "View Details"}
                        </Button>
                        <Button variant="outline">
                          Share
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Event Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">This Month</span>
                  <span className="font-semibold">12 Events</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Attendees</span>
                  <span className="font-semibold">1,247</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Active Communities</span>
                  <span className="font-semibold">8</span>
                </div>
              </CardContent>
            </Card>

            {/* Upcoming Events */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Coming Soon</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {upcomingEvents.map((event) => (
                  <div key={event.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-sm">{event.title}</p>
                      <p className="text-xs text-gray-600">{new Date(event.date).toLocaleDateString()}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-600">{event.attendees} going</p>
                    </div>
                  </div>
                ))}
                <Button variant="outline" size="sm" className="w-full">
                  View All
                </Button>
              </CardContent>
            </Card>

            {/* Create Event CTA */}
            <Card className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
              <CardContent className="p-6 text-center">
                <h3 className="font-semibold mb-2">Host Your Event</h3>
                <p className="text-sm mb-4 opacity-90">Share your knowledge with the community</p>
                <Button variant="secondary" size="sm" className="w-full">
                  Create Event
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  )
}
