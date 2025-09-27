import Badge from "@/components/ui/badge"
import Card from "@/components/ui/card"
import { Bookmark, Calendar, Clock, Eye, MapPin, MessageSquare, Star, TrendingUp } from "lucide-react"
import Link from "next/link"
import React from "react"

interface MatchCardProps {
  match: {
    id: number;
    name: string;
    title: string;
    experience: string;
    location: string;
    timezone: string;
    languages: string[];
    matchScore: number;
    rating: number;
    avatar: string;
    skills: string[];
    perfectFor: string[];
    matchReasons: string[];
    availability: string;
    preferences: string;
    menteesHelped: number;
    successRate: number;
    responseTime: string;
  };
  onRequestSession?: (matchId: number) => void;
  onSaveForLater?: (matchId: number) => void;
  showFullDetails?: boolean;
}

const MatchCard: React.FC<MatchCardProps> = ({
                                               match,
                                               onRequestSession,
                                               onSaveForLater,
                                               showFullDetails = true,
                                             }) => {
  const getMatchScoreColor = (score: number) => {
    if (score >= 90) return "text-green-600 bg-green-100"
    if (score >= 80) return "text-blue-600 bg-blue-100"
    if (score >= 70) return "text-yellow-600 bg-yellow-100"
    return "text-gray-600 bg-gray-100"
  }

  const handleRequestSession = () => {
    if (onRequestSession) {
      onRequestSession(match.id)
    }
  }

  const handleSaveForLater = () => {
    if (onSaveForLater) {
      onSaveForLater(match.id)
    }
  }

  return (
    <Card className="p-6 hover:shadow-xl transition-all duration-300 border-l-4 border-l-purple-500">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-4">
            <div className="text-4xl">{match.avatar}</div>
            <div>
              <h3 className="text-xl font-bold text-gray-800">{match.name}</h3>
              <p className="text-gray-600">{match.title} • {match.experience}</p>
              <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                <span className="flex items-center">
                  <MapPin className="w-4 h-4 mr-1"/>
                  {match.location}
                </span>
                <span className="flex items-center">
                  <Clock className="w-4 h-4 mr-1"/>
                  {match.timezone}
                </span>
                <span className="flex items-center">
                  <MessageSquare className="w-4 h-4 mr-1"/>
                  {match.languages.join(", ")}
                </span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div
              className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${getMatchScoreColor(match.matchScore)}`}>
              <Star className="w-4 h-4 mr-1"/>
              {match.matchScore}% Match
            </div>
            <div className="flex items-center mt-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i}
                      className={`w-4 h-4 ${i < Math.floor(match.rating) ? "text-yellow-400 fill-current" : "text-gray-300"}`}/>
              ))}
              <span className="ml-1 text-sm text-gray-600">({match.rating})</span>
            </div>
          </div>
        </div>

        {/* Perfect For */}
        <div>
          <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
            <TrendingUp className="w-4 h-4 mr-2 text-green-500"/>
            Perfect for: {match.perfectFor.join(", ")}
          </h4>
        </div>

        {showFullDetails && (
          <>
            {/* Match Score Visualization */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-800 mb-3">📊 Match Reasons:</h4>
              <div className="space-y-2">
                {match.matchReasons.map((reason, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-gray-700">✅ {reason}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Skills */}
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">🛠️ Skills:</h4>
              <div className="flex flex-wrap gap-2">
                {match.skills.map((skill, index) => (
                  <Badge key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Availability & Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <p className="text-sm">
                  <span className="font-medium text-gray-700">📅 Available:</span> {match.availability}
                </p>
                <p className="text-sm">
                  <span className="font-medium text-gray-700">💬 Prefers:</span> {match.preferences}
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-sm">
                  <span className="font-medium text-gray-700">👥 Mentees Helped:</span> {match.menteesHelped}
                </p>
                <p className="text-sm">
                  <span className="font-medium text-gray-700">⚡ Response Time:</span> {match.responseTime}
                </p>
              </div>
            </div>
          </>
        )}

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-200">
          <button
            onClick={handleRequestSession}
            className="flex-1 min-w-[140px] bg-gradient-to-r from-purple-500 to-blue-500 text-white px-4 py-2 rounded-lg font-medium hover:from-purple-600 hover:to-blue-600 transition-all duration-200 flex items-center justify-center space-x-2"
          >
            <Calendar className="w-4 h-4"/>
            <span>Request Session</span>
          </button>
          <button
            onClick={handleSaveForLater}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2"
          >
            <Bookmark className="w-4 h-4"/>
            <span>Save for Later</span>
          </button>
          <Link href={`/profile/${match.id}`}>
            <button
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2">
              <Eye className="w-4 h-4"/>
              <span>View Profile</span>
            </button>
          </Link>
        </div>
      </div>
    </Card>
  )
}

export default MatchCard
