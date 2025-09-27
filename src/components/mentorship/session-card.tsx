"use client"

import Avatar from "@/components/ui/avatar"
import Badge from "@/components/ui/badge"
import Button from "@/components/ui/button"
import Card, { CardContent, CardHeader } from "@/components/ui/card"
import DropdownMenu, {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  AlertCircle,
  Calendar,
  CheckCircle,
  Clock,
  Copy,
  Edit,
  FileText,
  MapPin,
  MessageSquare,
  MoreVertical,
  Phone,
  PlayCircle,
  Star,
  Trash2,
  Users,
  Video,
  XCircle,
} from "lucide-react"
import Link from "next/link"

export interface Session {
  id: string;
  title: string;
  mentorName: string;
  mentorAvatar: string;
  menteeName?: string;
  menteeAvatar?: string;
  date: string;
  time: string;
  duration: number; // in minutes
  type: "video" | "audio" | "chat" | "in-person";
  status: "scheduled" | "ongoing" | "completed" | "cancelled" | "pending";
  location?: string;
  meetingLink?: string;
  description?: string;
  goals?: string[];
  rating?: number;
  feedback?: string;
  price?: number;
  isRecurring?: boolean;
  recurringPattern?: string;
  notes?: string;
}

interface SessionCardProps {
  session: Session;
  userRole?: "mentor" | "mentee";
  onJoin?: (sessionId: string) => void;
  onReschedule?: (sessionId: string) => void;
  onCancel?: (sessionId: string) => void;
  onComplete?: (sessionId: string) => void;
  onRate?: (sessionId: string) => void;
  onEdit?: (sessionId: string) => void;
  onDelete?: (sessionId: string) => void;
  onCopyLink?: (sessionId: string) => void;
}

export const SessionCard = ({
                              session,
                              userRole = "mentee",
                              onJoin,
                              onReschedule,
                              onCancel,
                              onComplete,
                              onRate,
                              onEdit,
                              onDelete,
                              onCopyLink,
                            }: SessionCardProps) => {
  const getSessionTypeIcon = (type: string) => {
    switch (type) {
      case "video":
        return <Video className="h-4 w-4"/>
      case "audio":
        return <Phone className="h-4 w-4"/>
      case "chat":
        return <MessageSquare className="h-4 w-4"/>
      case "in-person":
        return <Users className="h-4 w-4"/>
      default:
        return <Video className="h-4 w-4"/>
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "scheduled":
        return <Calendar className="h-4 w-4 text-blue-500"/>
      case "ongoing":
        return <PlayCircle className="h-4 w-4 text-green-500"/>
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-500"/>
      case "cancelled":
        return <XCircle className="h-4 w-4 text-red-500"/>
      case "pending":
        return <AlertCircle className="h-4 w-4 text-yellow-500"/>
      default:
        return <Calendar className="h-4 w-4 text-gray-500"/>
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "scheduled":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "ongoing":
        return "bg-green-100 text-green-800 border-green-200"
      case "completed":
        return "bg-gray-100 text-gray-800 border-gray-200"
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-200"
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const today = new Date()
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)

    if (date.toDateString() === today.toDateString()) {
      return "Today"
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return "Tomorrow"
    } else {
      return date.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
      })
    }
  }

  const canJoin = session.status === "scheduled" || session.status === "ongoing"
  const canReschedule = session.status === "scheduled" || session.status === "pending"
  const canCancel = session.status === "scheduled" || session.status === "pending"
  const canComplete = session.status === "ongoing" && userRole === "mentor"
  const canRate = session.status === "completed" && !session.rating

  const otherParticipant = userRole === "mentor"
    ? { name: session.menteeName, avatar: session.menteeAvatar }
    : { name: session.mentorName, avatar: session.mentorAvatar }

  return (
    <Card className="hover:shadow-lg transition-all duration-200">
      <Link href={`/mentorship/sessions/${session.id}`} className="block">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-3">
              <Avatar
                src={otherParticipant.avatar}
                alt={otherParticipant.name}
                name={otherParticipant.name}
                size="lg"
                className="h-12 w-12"
              />
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-semibold text-gray-900 truncate hover:text-blue-600 transition-colors">
                  {session.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  with {otherParticipant.name}
                </p>
                <div className="flex items-center space-x-4 mt-2">
                  <div className="flex items-center space-x-1 text-sm text-gray-500">
                    <Calendar className="h-3 w-3"/>
                    <span>{formatDate(session.date)}</span>
                  </div>
                  <div className="flex items-center space-x-1 text-sm text-gray-500">
                    <Clock className="h-3 w-3"/>
                    <span>{session.time} ({session.duration}min)</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2" onClick={(e) => e.preventDefault()}>
              <Badge className={getStatusColor(session.status)} variant="default">
                {getStatusIcon(session.status)}
                <span className="ml-1 capitalize">{session.status}</span>
              </Badge>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <MoreVertical className="h-4 w-4"/>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {canReschedule && (
                    <DropdownMenuItem onClick={() => onReschedule?.(session.id)}>
                      <Edit className="h-4 w-4 mr-2"/>
                      Reschedule
                    </DropdownMenuItem>
                  )}
                  {session.meetingLink && (
                    <DropdownMenuItem onClick={() => onCopyLink?.(session.id)}>
                      <Copy className="h-4 w-4 mr-2"/>
                      Copy Link
                    </DropdownMenuItem>
                  )}
                  {onEdit && (
                    <DropdownMenuItem onClick={() => onEdit(session.id)}>
                      <Edit className="h-4 w-4 mr-2"/>
                      Edit Details
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator/>
                  {canCancel && (
                    <DropdownMenuItem
                      onClick={() => onCancel?.(session.id)}
                      className="text-red-600"
                    >
                      <XCircle className="h-4 w-4 mr-2"/>
                      Cancel Session
                    </DropdownMenuItem>
                  )}
                  {onDelete && (
                    <DropdownMenuItem
                      onClick={() => onDelete(session.id)}
                      className="text-red-600"
                    >
                      <Trash2 className="h-4 w-4 mr-2"/>
                      Delete
                    </DropdownMenuItem>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardHeader>
      </Link>

      <CardContent className="space-y-4">
        {/* Session Type and Location */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Badge variant="default" className="flex items-center gap-1">
              {getSessionTypeIcon(session.type)}
              <span className="capitalize">{session.type}</span>
            </Badge>
            {session.location && (
              <div className="flex items-center space-x-1 text-sm text-gray-600">
                <MapPin className="h-3 w-3"/>
                <span>{session.location}</span>
              </div>
            )}
            {session.isRecurring && (
              <Badge variant="default" className="text-xs">
                Recurring
              </Badge>
            )}
          </div>
          {session.price && (
            <span className="text-sm font-medium text-green-600">
              ${session.price}
            </span>
          )}
        </div>

        {/* Description */}
        {session.description && (
          <p className="text-gray-700 text-sm">{session.description}</p>
        )}

        {/* Goals */}
        {session.goals && session.goals.length > 0 && (
          <div>
            <h4 className="text-sm font-medium text-gray-900 mb-2">Session Goals:</h4>
            <div className="flex flex-wrap gap-1">
              {session.goals.map((goal, index) => (
                <Badge key={index} variant="default" className="text-xs">
                  {goal}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Rating and Feedback (for completed sessions) */}
        {session.status === "completed" && session.rating && (
          <div className="bg-gray-50 p-3 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < session.rating! ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm font-medium">{session.rating}/5</span>
            </div>
            {session.feedback && (
              <p className="text-sm text-gray-700">{session.feedback}</p>
            )}
          </div>
        )}

        {/* Notes */}
        {session.notes && (
          <div className="bg-blue-50 p-3 rounded-lg">
            <div className="flex items-center space-x-2 mb-1">
              <FileText className="h-4 w-4 text-blue-600"/>
              <span className="text-sm font-medium text-blue-900">Notes</span>
            </div>
            <p className="text-sm text-blue-800">{session.notes}</p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex space-x-2 pt-2">
          {canJoin && session.meetingLink && (
            <Button
              className="flex-1 bg-green-600 hover:bg-green-700"
              onClick={() => onJoin?.(session.id)}
            >
              {getSessionTypeIcon(session.type)}
              <span className="ml-2">
                {session.status === "ongoing" ? "Join Now" : "Join Session"}
              </span>
            </Button>
          )}

          {canComplete && (
            <Button
              variant="outline"
              onClick={() => onComplete?.(session.id)}
            >
              <CheckCircle className="h-4 w-4 mr-2"/>
              Mark Complete
            </Button>
          )}

          {canRate && (
            <Button
              variant="outline"
              onClick={() => onRate?.(session.id)}
            >
              <Star className="h-4 w-4 mr-2"/>
              Rate Session
            </Button>
          )}

          {canReschedule && (
            <Button
              variant="outline"
              onClick={() => onReschedule?.(session.id)}
            >
              <Calendar className="h-4 w-4 mr-2"/>
              Reschedule
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export default SessionCard
