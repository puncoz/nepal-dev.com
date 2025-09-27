"use client"

import MentorshipBreadcrumb from "@/components/mentorship/mentorship-breadcrumb"
import Avatar from "@/components/ui/avatar"
import Badge from "@/components/ui/badge"
import Button from "@/components/ui/button"
import Card, { CardContent, CardHeader } from "@/components/ui/card"
import {
  AlertCircle,
  ArrowLeft,
  Calendar,
  CheckCircle,
  Clock,
  Copy,
  Download,
  Edit,
  FileText,
  MessageSquare,
  Phone,
  PlayCircle,
  Star,
  Upload,
  Users,
  Video,
  XCircle,
} from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { useState } from "react"

interface SessionDetails {
  id: string;
  title: string;
  mentor: {
    id: string;
    name: string;
    avatar: string;
    title: string;
    company: string;
    rating: number;
  };
  mentee: {
    id: string;
    name: string;
    avatar: string;
    title: string;
    company: string;
  };
  date: string;
  time: string;
  duration: number;
  status: "upcoming" | "completed" | "cancelled" | "in-progress";
  type: "video" | "phone" | "in-person";
  location?: string;
  meetingLink?: string;
  price: number;
  description: string;
  goals: string[];
  agenda: string[];
  notes?: string;
  rating?: number;
  feedback?: string;
  materials: {
    id: string;
    name: string;
    type: "pdf" | "doc" | "link";
    url: string;
  }[];
  recurrence?: {
    type: "weekly" | "biweekly" | "monthly";
    endDate: string;
  };
}

const mockSessionDetails: SessionDetails = {
  id: "1",
  title: "Career Growth Strategy Session",
  mentor: {
    id: "1",
    name: "Ram Kumar Shrestha",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    title: "Senior Software Engineer",
    company: "Tech Corp",
    rating: 4.9,
  },
  mentee: {
    id: "2",
    name: "John Doe",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    title: "Junior Developer",
    company: "StartupXYZ",
  },
  date: "2024-01-15",
  time: "2:00 PM",
  duration: 60,
  status: "upcoming",
  type: "video",
  meetingLink: "https://meet.google.com/abc-defg-hij",
  price: 50,
  description: "A comprehensive session focused on developing a strategic career growth plan, identifying key skills to develop, and creating actionable steps for advancement.",
  goals: [
    "Define career objectives for the next 2 years",
    "Identify skill gaps and development opportunities",
    "Create a networking strategy",
    "Develop a personal brand",
  ],
  agenda: [
    "Current role assessment (10 min)",
    "Career goals discussion (15 min)",
    "Skills gap analysis (15 min)",
    "Action plan creation (15 min)",
    "Q&A and next steps (5 min)",
  ],
  materials: [
    {
      id: "1",
      name: "Career Development Framework.pdf",
      type: "pdf",
      url: "#",
    },
    {
      id: "2",
      name: "Skills Assessment Template",
      type: "doc",
      url: "#",
    },
    {
      id: "3",
      name: "Industry Salary Report",
      type: "link",
      url: "#",
    },
  ],
  recurrence: {
    type: "monthly",
    endDate: "2024-06-15",
  },
}

const getStatusIcon = (status: string) => {
  switch (status) {
    case "upcoming":
      return <Clock className="h-4 w-4"/>
    case "completed":
      return <CheckCircle className="h-4 w-4"/>
    case "cancelled":
      return <XCircle className="h-4 w-4"/>
    case "in-progress":
      return <PlayCircle className="h-4 w-4"/>
    default:
      return <AlertCircle className="h-4 w-4"/>
  }
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "upcoming":
      return "bg-blue-100 text-blue-800"
    case "completed":
      return "bg-green-100 text-green-800"
    case "cancelled":
      return "bg-red-100 text-red-800"
    case "in-progress":
      return "bg-yellow-100 text-yellow-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

const getTypeIcon = (type: string) => {
  switch (type) {
    case "video":
      return <Video className="h-4 w-4"/>
    case "phone":
      return <Phone className="h-4 w-4"/>
    case "in-person":
      return <Users className="h-4 w-4"/>
    default:
      return <Video className="h-4 w-4"/>
  }
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

export default function SessionDetailsPage() {
  const params = useParams()
  const [activeTab, setActiveTab] = useState("details")
  const [showNotes, setShowNotes] = useState(false)

  // In a real app, you would fetch session details based on params.id
  const session = mockSessionDetails

  const canJoin = session.status === "upcoming" || session.status === "in-progress"
  const canEdit = session.status === "upcoming"
  const canCancel = session.status === "upcoming"
  const canComplete = session.status === "in-progress"
  const canRate = session.status === "completed" && !session.rating

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <MentorshipBreadcrumb
          items={[
            { label: "Mentorship", href: "/mentorship" },
            { label: "Sessions", href: "/mentorship/sessions" },
            { label: session.title, href: `/mentorship/sessions/${session.id}` },
          ]}
        />

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/mentorship/sessions">
                <Button variant="outline" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2"/>
                  Back to Sessions
                </Button>
              </Link>
              <h1 className="text-3xl font-bold text-gray-900">{session.title}</h1>
            </div>

            <div className="flex items-center space-x-3">
              {canJoin && (
                <Button className="bg-green-600 hover:bg-green-700">
                  {getTypeIcon(session.type)}
                  <span className="ml-2">Join Session</span>
                </Button>
              )}
              {canEdit && (
                <Button variant="outline">
                  <Edit className="h-4 w-4 mr-2"/>
                  Edit
                </Button>
              )}
              {canCancel && (
                <Button variant="outline" className="text-red-600 hover:text-red-700">
                  <XCircle className="h-4 w-4 mr-2"/>
                  Cancel
                </Button>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Session Overview */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold">Session Overview</h2>
                  <Badge className={getStatusColor(session.status)} variant="default">
                    {getStatusIcon(session.status)}
                    <span className="ml-1 capitalize">{session.status}</span>
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-gray-500"/>
                    <span className="text-sm text-gray-600">Date:</span>
                    <span className="font-medium">{formatDate(session.date)}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-gray-500"/>
                    <span className="text-sm text-gray-600">Time:</span>
                    <span className="font-medium">{session.time} ({session.duration} min)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    {getTypeIcon(session.type)}
                    <span className="text-sm text-gray-600">Type:</span>
                    <span className="font-medium capitalize">{session.type}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">Price:</span>
                    <span className="font-medium">${session.price}</span>
                  </div>
                </div>

                {session.meetingLink && (
                  <div className="flex items-center space-x-2 p-3 bg-blue-50 rounded-lg">
                    <Video className="h-4 w-4 text-blue-600"/>
                    <span className="text-sm text-gray-600">Meeting Link:</span>
                    <a href={session.meetingLink} className="text-blue-600 hover:underline font-medium">
                      Join Meeting
                    </a>
                    <Button variant="outline" size="sm" className="ml-auto">
                      <Copy className="h-3 w-3"/>
                    </Button>
                  </div>
                )}

                <div>
                  <h3 className="font-medium mb-2">Description</h3>
                  <p className="text-gray-600">{session.description}</p>
                </div>
              </CardContent>
            </Card>

            {/* Tabs */}
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8">
                {[
                  { id: "details", label: "Details" },
                  { id: "agenda", label: "Agenda" },
                  { id: "materials", label: "Materials" },
                  { id: "notes", label: "Notes" },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-2 px-1 border-b-2 font-medium text-sm ${
                      activeTab === tab.id
                        ? "border-blue-500 text-blue-600"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>

            {/* Tab Content */}
            <Card>
              <CardContent className="pt-6">
                {activeTab === "details" && (
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-medium mb-2">Session Goals</h3>
                      <ul className="space-y-2">
                        {session.goals.map((goal, index) => (
                          <li key={index} className="flex items-start space-x-2">
                            <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0"/>
                            <span className="text-gray-600">{goal}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {session.recurrence && (
                      <div>
                        <h3 className="font-medium mb-2">Recurrence</h3>
                        <p className="text-gray-600">
                          This is a {session.recurrence.type} recurring session
                          until {formatDate(session.recurrence.endDate)}
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === "agenda" && (
                  <div>
                    <h3 className="font-medium mb-4">Session Agenda</h3>
                    <div className="space-y-3">
                      {session.agenda.map((item, index) => (
                        <div key={index} className="flex items-start space-x-3">
                          <div
                            className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium">
                            {index + 1}
                          </div>
                          <span className="text-gray-600">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === "materials" && (
                  <div>
                    <h3 className="font-medium mb-4">Session Materials</h3>
                    <div className="space-y-3">
                      {session.materials.map((material) => (
                        <div key={material.id}
                             className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <FileText className="h-5 w-5 text-gray-400"/>
                            <div>
                              <p className="font-medium">{material.name}</p>
                              <p className="text-sm text-gray-500 capitalize">{material.type}</p>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">
                            <Download className="h-4 w-4"/>
                          </Button>
                        </div>
                      ))}
                    </div>

                    <div className="mt-6 p-4 border-2 border-dashed border-gray-300 rounded-lg text-center">
                      <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2"/>
                      <p className="text-gray-600">Upload additional materials</p>
                      <Button variant="outline" size="sm" className="mt-2">
                        Choose Files
                      </Button>
                    </div>
                  </div>
                )}

                {activeTab === "notes" && (
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-medium">Session Notes</h3>
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4 mr-2"/>
                        Edit Notes
                      </Button>
                    </div>

                    {session.notes ? (
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <p className="text-gray-600">{session.notes}</p>
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <FileText className="h-12 w-12 text-gray-300 mx-auto mb-4"/>
                        <p className="text-gray-500">No notes added yet</p>
                        <Button variant="outline" className="mt-2">
                          Add Notes
                        </Button>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Participants */}
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold">Participants</h3>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Mentor */}
                <div className="flex items-center space-x-3">
                  <Avatar
                    src={session.mentor.avatar}
                    alt={session.mentor.name}
                    name={session.mentor.name}
                    size="md"
                  />
                  <div className="flex-1">
                    <Link href={`/mentorship/profile/${session.mentor.id}`}
                          className="font-medium text-gray-900 hover:text-blue-600">
                      {session.mentor.name}
                    </Link>
                    <p className="text-sm text-gray-500">{session.mentor.title}</p>
                    <p className="text-sm text-gray-500">{session.mentor.company}</p>
                    <div className="flex items-center mt-1">
                      <Star className="h-3 w-3 text-yellow-400 fill-current"/>
                      <span className="text-xs text-gray-500 ml-1">{session.mentor.rating}</span>
                      <Badge variant="outline" className="ml-2 text-xs">Mentor</Badge>
                    </div>
                  </div>
                </div>

                {/* Mentee */}
                <div className="flex items-center space-x-3">
                  <Avatar
                    src={session.mentee.avatar}
                    alt={session.mentee.name}
                    name={session.mentee.name}
                    size="md"
                  />
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{session.mentee.name}</p>
                    <p className="text-sm text-gray-500">{session.mentee.title}</p>
                    <p className="text-sm text-gray-500">{session.mentee.company}</p>
                    <Badge variant="outline" className="mt-1 text-xs">Mentee</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold">Quick Actions</h3>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <MessageSquare className="h-4 w-4 mr-2"/>
                  Send Message
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Calendar className="h-4 w-4 mr-2"/>
                  Reschedule
                </Button>
                {canComplete && (
                  <Button variant="outline" className="w-full justify-start">
                    <CheckCircle className="h-4 w-4 mr-2"/>
                    Mark Complete
                  </Button>
                )}
                {canRate && (
                  <Button variant="outline" className="w-full justify-start">
                    <Star className="h-4 w-4 mr-2"/>
                    Rate Session
                  </Button>
                )}
              </CardContent>
            </Card>

            {/* Session Rating (if completed) */}
            {session.status === "completed" && session.rating && (
              <Card>
                <CardHeader>
                  <h3 className="text-lg font-semibold">Session Rating</h3>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-2 mb-3">
                    <div className="flex items-center">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`h-4 w-4 ${
                            star <= session.rating!
                              ? "text-yellow-400 fill-current"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="font-medium">{session.rating}/5</span>
                  </div>
                  {session.feedback && (
                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-2">Feedback:</p>
                      <p className="text-sm text-gray-600">{session.feedback}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
