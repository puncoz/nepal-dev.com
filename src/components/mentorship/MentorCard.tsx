'use client';

import Card, { CardContent, CardHeader } from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import Avatar from '@/components/ui/Avatar';
import {
  Star,
  MapPin,
  Clock,
  MessageSquare,
  Calendar,
  Globe,
  Briefcase,
  Award,
  Video,
  Users,
  Heart,
  Share2
} from 'lucide-react';

export interface MentorProfile {
  id: string;
  name: string;
  avatar: string;
  title: string;
  company: string;
  location: string;
  rating: number;
  reviewCount: number;
  experience: number;
  hourlyRate?: number;
  responseTime: string;
  skills: string[];
  languages: string[];
  bio: string;
  availability: string[];
  sessionTypes: string[];
  totalSessions: number;
  isOnline: boolean;
  isFavorite?: boolean;
}

interface MentorCardProps {
  mentor: MentorProfile;
  viewMode?: 'grid' | 'list';
  onConnect?: (mentorId: string) => void;
  onMessage?: (mentorId: string) => void;
  onFavorite?: (mentorId: string) => void;
  onShare?: (mentorId: string) => void;
}

export const MentorCard = ({
  mentor,
  viewMode = 'grid',
  onConnect,
  onMessage,
  onFavorite,
  onShare
}: MentorCardProps) => {
  const getSessionTypeIcon = (type: string) => {
    switch (type) {
      case 'video':
        return <Video className="h-3 w-3" />;
      case 'chat':
        return <MessageSquare className="h-3 w-3" />;
      case 'in-person':
        return <Users className="h-3 w-3" />;
      default:
        return <Video className="h-3 w-3" />;
    }
  };

  const getAvailabilityColor = (availability: string[]) => {
    if (availability.includes('Available now')) {
      return 'bg-green-100 text-green-800 border-green-200';
    }
    if (availability.includes('Available today')) {
      return 'bg-blue-100 text-blue-800 border-blue-200';
    }
    return 'bg-yellow-100 text-yellow-800 border-yellow-200';
  };

  if (viewMode === 'list') {
    return (
      <Card className="hover:shadow-lg transition-all duration-200 border-l-4 border-l-blue-500">
        <CardContent className="p-6">
          <div className="flex items-start space-x-4">
            {/* Avatar and Online Status */}
            <div className="relative">
              <Avatar 
                src={mentor.avatar} 
                alt={mentor.name} 
                name={mentor.name}
                size="xl"
                className="h-16 w-16"
              />
              {mentor.isOnline && (
                <div className="absolute -bottom-1 -right-1 h-4 w-4 bg-green-500 border-2 border-white rounded-full"></div>
              )}
            </div>

            {/* Main Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 truncate">{mentor.name}</h3>
                  <p className="text-gray-600 flex items-center gap-1 mb-1">
                    <Briefcase className="h-4 w-4" />
                    {mentor.title} at {mentor.company}
                  </p>
                  <p className="text-gray-500 flex items-center gap-1 text-sm">
                    <MapPin className="h-3 w-3" />
                    {mentor.location}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onFavorite?.(mentor.id)}
                    className={mentor.isFavorite ? 'text-red-500 hover:text-red-600' : 'text-gray-400 hover:text-red-500'}
                  >
                    <Heart className={`h-4 w-4 ${mentor.isFavorite ? 'fill-current' : ''}`} />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onShare?.(mentor.id)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="flex items-center space-x-4 mb-3">
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{mentor.rating}</span>
                  <span className="text-gray-500 text-sm">({mentor.reviewCount} reviews)</span>
                </div>
                <div className="flex items-center space-x-1 text-sm text-gray-600">
                  <Award className="h-4 w-4" />
                  <span>{mentor.experience} years exp</span>
                </div>
                <div className="flex items-center space-x-1 text-sm text-gray-600">
                  <Clock className="h-4 w-4" />
                  <span>Responds in {mentor.responseTime}</span>
                </div>
                {mentor.hourlyRate && (
                  <div className="text-sm font-medium text-green-600">
                    ${mentor.hourlyRate}/hour
                  </div>
                )}
              </div>

              <p className="text-gray-700 text-sm mb-3 line-clamp-2">{mentor.bio}</p>

              <div className="flex flex-wrap gap-2 mb-3">
                {mentor.skills.slice(0, 4).map((skill, index) => (
                  <Badge key={index} variant="default" className="text-xs">
                    {skill}
                  </Badge>
                ))}
                {mentor.skills.length > 4 && (
                  <Badge variant="default" className="text-xs text-gray-500">
                    +{mentor.skills.length - 4} more
                  </Badge>
                )}
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    {mentor.sessionTypes.map((type, index) => (
                      <Badge key={index} variant="default" className="text-xs flex items-center gap-1">
                        {getSessionTypeIcon(type)}
                        {type}
                      </Badge>
                    ))}
                  </div>
                  <Badge className={getAvailabilityColor(mentor.availability)}>
                    {mentor.availability[0]}
                  </Badge>
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onMessage?.(mentor.id)}
                  >
                    <MessageSquare className="h-4 w-4 mr-1" />
                    Message
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => onConnect?.(mentor.id)}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <Calendar className="h-4 w-4 mr-1" />
                    Connect
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Grid view (default)
  return (
    <Card className="hover:shadow-lg transition-all duration-200 group">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="relative">
            <Avatar 
              src={mentor.avatar} 
              alt={mentor.name} 
              name={mentor.name}
              size="lg"
              className="h-14 w-14"
            />
            {mentor.isOnline && (
              <div className="absolute -bottom-1 -right-1 h-4 w-4 bg-green-500 border-2 border-white rounded-full"></div>
            )}
          </div>
          <div className="flex space-x-1">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onFavorite?.(mentor.id)}
              className={`opacity-0 group-hover:opacity-100 transition-opacity ${
                mentor.isFavorite ? 'text-red-500 hover:text-red-600 opacity-100' : 'text-gray-400 hover:text-red-500'
              }`}
            >
              <Heart className={`h-4 w-4 ${mentor.isFavorite ? 'fill-current' : ''}`} />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onShare?.(mentor.id)}
              className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-gray-600"
            >
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <div className="mt-3">
          <h3 className="text-lg font-semibold text-gray-900 truncate">{mentor.name}</h3>
          <p className="text-gray-600 text-sm truncate">{mentor.title}</p>
          <p className="text-gray-500 text-xs flex items-center gap-1 mt-1">
            <MapPin className="h-3 w-3" />
            {mentor.location}
          </p>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Rating and Stats */}
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="font-medium">{mentor.rating}</span>
            <span className="text-gray-500">({mentor.reviewCount})</span>
          </div>
          <div className="flex items-center space-x-1 text-gray-600">
            <Award className="h-3 w-3" />
            <span>{mentor.experience}y exp</span>
          </div>
        </div>

        {/* Bio */}
        <p className="text-gray-700 text-sm line-clamp-3">{mentor.bio}</p>

        {/* Skills */}
        <div className="flex flex-wrap gap-1">
          {mentor.skills.slice(0, 3).map((skill, index) => (
            <Badge key={index} variant="default" className="text-xs">
              {skill}
            </Badge>
          ))}
          {mentor.skills.length > 3 && (
            <Badge variant="default" className="text-xs text-gray-500">
              +{mentor.skills.length - 3}
            </Badge>
          )}
        </div>

        {/* Languages */}
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Globe className="h-3 w-3" />
          <span>{mentor.languages.join(', ')}</span>
        </div>

        {/* Session Types */}
        <div className="flex space-x-1">
          {mentor.sessionTypes.map((type, index) => (
            <Badge key={index} variant="default" className="text-xs flex items-center gap-1">
              {getSessionTypeIcon(type)}
              {type}
            </Badge>
          ))}
        </div>

        {/* Availability and Price */}
        <div className="flex items-center justify-between">
          <Badge className={getAvailabilityColor(mentor.availability)}>
            {mentor.availability[0]}
          </Badge>
          {mentor.hourlyRate && (
            <span className="text-sm font-medium text-green-600">
              ${mentor.hourlyRate}/hr
            </span>
          )}
        </div>

        {/* Response Time */}
        <div className="flex items-center space-x-1 text-xs text-gray-500">
          <Clock className="h-3 w-3" />
          <span>Responds in {mentor.responseTime}</span>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2 pt-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-1"
            onClick={() => onMessage?.(mentor.id)}
          >
            <MessageSquare className="h-4 w-4 mr-1" />
            Message
          </Button>
          <Button
            size="sm"
            className="flex-1 bg-blue-600 hover:bg-blue-700"
            onClick={() => onConnect?.(mentor.id)}
          >
            <Calendar className="h-4 w-4 mr-1" />
            Connect
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default MentorCard;