"use client"

import MentorshipBreadcrumb from "@/components/mentorship/mentorship-breadcrumb"
import Avatar from "@/components/ui/avatar"
import Badge from "@/components/ui/badge"
import Button from "@/components/ui/button"
import Card, { CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Input from "@/components/ui/input"
import Switch from "@/components/ui/switch"
import Tabs, { TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Textarea from "@/components/ui/textarea"
import {
  Award,
  Bell,
  Briefcase,
  Calendar,
  Camera,
  Edit,
  Eye,
  EyeOff,
  Globe,
  MapPin,
  MessageSquare,
  Plus,
  Save,
  Search,
  Settings,
  Shield,
  Star,
  User,
  Users,
  Video,
  X,
} from "lucide-react"
import Link from "next/link"
import { useState } from "react"

interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: "mentor" | "mentee" | "both";
  title: string;
  company: string;
  location: string;
  timezone: string;
  bio: string;
  experience: number;
  rating: number;
  totalSessions: number;
  skills: string[];
  languages: string[];
  availability: {
    monday: boolean;
    tuesday: boolean;
    wednesday: boolean;
    thursday: boolean;
    friday: boolean;
    saturday: boolean;
    sunday: boolean;
  };
  preferences: {
    sessionTypes: string[];
    maxSessionsPerWeek: number;
    sessionDuration: number;
  };
  notifications: {
    email: boolean;
    push: boolean;
    sessionReminders: boolean;
    newMessages: boolean;
    weeklyDigest: boolean;
  };
  privacy: {
    profileVisible: boolean;
    showEmail: boolean;
    showLocation: boolean;
    allowDirectMessages: boolean;
  };
}

const mockProfile: UserProfile = {
  id: "1",
  name: "Rajesh Hamal",
  email: "rajesh.hamal@example.com",
  avatar: "/avatars/rajesh.jpg",
  role: "mentor",
  title: "Senior Full Stack Developer",
  company: "Tech Nepal Pvt. Ltd.",
  location: "Kathmandu, Nepal",
  timezone: "Asia/Kathmandu",
  bio: "Passionate software developer with 8+ years of experience in full-stack development. I love mentoring junior developers and sharing knowledge about modern web technologies, especially React, Node.js, and cloud architecture.",
  experience: 8,
  rating: 4.9,
  totalSessions: 127,
  skills: ["React", "Node.js", "TypeScript", "AWS", "MongoDB", "GraphQL", "Docker"],
  languages: ["English", "Nepali", "Hindi"],
  availability: {
    monday: true,
    tuesday: true,
    wednesday: true,
    thursday: true,
    friday: true,
    saturday: false,
    sunday: false,
  },
  preferences: {
    sessionTypes: ["video", "chat"],
    maxSessionsPerWeek: 5,
    sessionDuration: 60,
  },
  notifications: {
    email: true,
    push: true,
    sessionReminders: true,
    newMessages: true,
    weeklyDigest: false,
  },
  privacy: {
    profileVisible: true,
    showEmail: false,
    showLocation: true,
    allowDirectMessages: true,
  },
}

const ProfilePage = () => {
  const [profile, setProfile] = useState<UserProfile>(mockProfile)
  const [isEditing, setIsEditing] = useState(false)
  const [newSkill, setNewSkill] = useState("")
  const [newLanguage, setNewLanguage] = useState("")


  const addSkill = () => {
    if (newSkill.trim() && !profile.skills.includes(newSkill.trim())) {
      setProfile(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()],
      }))
      setNewSkill("")
    }
  }

  const removeSkill = (skillToRemove: string) => {
    setProfile(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove),
    }))
  }

  const addLanguage = () => {
    if (newLanguage.trim() && !profile.languages.includes(newLanguage.trim())) {
      setProfile(prev => ({
        ...prev,
        languages: [...prev.languages, newLanguage.trim()],
      }))
      setNewLanguage("")
    }
  }

  const removeLanguage = (languageToRemove: string) => {
    setProfile(prev => ({
      ...prev,
      languages: prev.languages.filter(lang => lang !== languageToRemove),
    }))
  }

  const updateAvailability = (day: keyof typeof profile.availability) => {
    setProfile(prev => ({
      ...prev,
      availability: {
        ...prev.availability,
        [day]: !prev.availability[day],
      },
    }))
  }

  const updateNotification = (key: keyof typeof profile.notifications) => {
    setProfile(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [key]: !prev.notifications[key],
      },
    }))
  }

  const updatePrivacy = (key: keyof typeof profile.privacy) => {
    setProfile(prev => ({
      ...prev,
      privacy: {
        ...prev.privacy,
        [key]: !prev.privacy[key],
      },
    }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="container mx-auto px-4 py-8">
        <MentorshipBreadcrumb items={[{ label: "Profile", href: "/mentorship/profile" }]}/>

        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">My Profile</h1>
              <p className="text-gray-600">Manage your mentorship profile and preferences</p>
            </div>
            <div className="flex items-center gap-3">
              <Link href="/mentorship/browse">
                <Button variant="outline" className="flex items-center gap-2">
                  <Search className="h-4 w-4"/>
                  Browse Mentors
                </Button>
              </Link>
              <Link href="/mentorship/sessions">
                <Button variant="outline" className="flex items-center gap-2">
                  <Calendar className="h-4 w-4"/>
                  My Sessions
                </Button>
              </Link>
              <Button variant="outline" className="flex items-center gap-2">
                <Eye className="h-4 w-4"/>
                Preview Profile
              </Button>
              <Button
                variant="outline"
                onClick={() => setIsEditing(!isEditing)}
                className="flex items-center gap-2"
              >
                <Edit className="h-4 w-4"/>
                {isEditing ? "Cancel" : "Edit Profile"}
              </Button>
              {isEditing && (
                <Button
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                  <Save className="h-4 w-4 mr-2"/>
                  Save Changes
                </Button>
              )}
            </div>
          </div>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="availability">Availability</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="privacy">Privacy</TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            {/* Basic Info Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5"/>
                  Basic Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Avatar and Role */}
                <div className="flex items-start space-x-6">
                  <div className="relative">
                    <Avatar
                      src={profile.avatar}
                      alt={profile.name}
                      name={profile.name}
                      className="h-24 w-24"
                      size="xl"
                    />
                    {isEditing && (
                      <Button size="sm" className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full p-0">
                        <Camera className="h-4 w-4"/>
                      </Button>
                    )}
                  </div>
                  <div className="flex-1 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                        {isEditing ? (
                          <Input
                            value={profile.name}
                            onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
                          />
                        ) : (
                          <p className="text-lg font-semibold">{profile.name}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        {isEditing ? (
                          <Input
                            type="email"
                            value={profile.email}
                            onChange={(e) => setProfile(prev => ({ ...prev, email: e.target.value }))}
                          />
                        ) : (
                          <p className="text-gray-600">{profile.email}</p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <Badge className={`${
                        profile.role === "mentor" ? "bg-blue-100 text-blue-800" :
                          profile.role === "mentee" ? "bg-green-100 text-green-800" :
                            "bg-purple-100 text-purple-800"
                      }`}>
                        {profile.role.charAt(0).toUpperCase() + profile.role.slice(1)}
                      </Badge>
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400"/>
                        <span className="font-medium">{profile.rating}</span>
                        <span className="text-gray-500">({profile.totalSessions} sessions)</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Professional Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
                    {isEditing ? (
                      <Input
                        value={profile.title}
                        onChange={(e) => setProfile(prev => ({ ...prev, title: e.target.value }))}
                      />
                    ) : (
                      <p className="flex items-center gap-2">
                        <Briefcase className="h-4 w-4 text-gray-500"/>
                        {profile.title}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                    {isEditing ? (
                      <Input
                        value={profile.company}
                        onChange={(e) => setProfile(prev => ({ ...prev, company: e.target.value }))}
                      />
                    ) : (
                      <p>{profile.company}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                    {isEditing ? (
                      <Input
                        value={profile.location}
                        onChange={(e) => setProfile(prev => ({ ...prev, location: e.target.value }))}
                      />
                    ) : (
                      <p className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-gray-500"/>
                        {profile.location}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Experience</label>
                    {isEditing ? (
                      <Input
                        type="number"
                        value={profile.experience}
                        onChange={(e) => setProfile(prev => ({ ...prev, experience: parseInt(e.target.value) || 0 }))}
                      />
                    ) : (
                      <p className="flex items-center gap-2">
                        <Award className="h-4 w-4 text-gray-500"/>
                        {profile.experience} years
                      </p>
                    )}
                  </div>
                </div>

                {/* Bio */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                  {isEditing ? (
                    <Textarea
                      value={profile.bio}
                      onChange={(e) => setProfile(prev => ({ ...prev, bio: e.target.value }))}
                      rows={4}
                      placeholder="Tell others about yourself, your experience, and what you can offer as a mentor or what you're looking for as a mentee..."
                    />
                  ) : (
                    <p className="text-gray-700 leading-relaxed">{profile.bio}</p>
                  )}
                </div>

                {/* Skills */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Skills</label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {profile.skills.map((skill, index) => (
                      <Badge key={index} variant="default" className="flex items-center gap-1">
                        {skill}
                        {isEditing && (
                          <button
                            onClick={() => removeSkill(skill)}
                            className="ml-1 hover:text-red-600"
                          >
                            <X className="h-3 w-3"/>
                          </button>
                        )}
                      </Badge>
                    ))}
                  </div>
                  {isEditing && (
                    <div className="flex gap-2">
                      <Input
                        placeholder="Add a skill"
                        value={newSkill}
                        onChange={(e) => setNewSkill(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && addSkill()}
                      />
                      <Button onClick={addSkill} size="sm">
                        <Plus className="h-4 w-4"/>
                      </Button>
                    </div>
                  )}
                </div>

                {/* Languages */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Languages</label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {profile.languages.map((language, index) => (
                      <Badge key={index} variant="default" className="flex items-center gap-1">
                        <Globe className="h-3 w-3"/>
                        {language}
                        {isEditing && (
                          <button
                            onClick={() => removeLanguage(language)}
                            className="ml-1 hover:text-red-600"
                          >
                            <X className="h-3 w-3"/>
                          </button>
                        )}
                      </Badge>
                    ))}
                  </div>
                  {isEditing && (
                    <div className="flex gap-2">
                      <Input
                        placeholder="Add a language"
                        value={newLanguage}
                        onChange={(e) => setNewLanguage(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && addLanguage()}
                      />
                      <Button onClick={addLanguage} size="sm">
                        <Plus className="h-4 w-4"/>
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Availability Tab */}
          <TabsContent value="availability" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5"/>
                  Weekly Availability
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(profile.availability).map(([day, available]) => (
                    <div key={day} className="flex items-center justify-between p-3 border rounded-lg">
                      <span className="font-medium capitalize">{day}</span>
                      <Switch
                        checked={available}
                        onCheckedChange={() => updateAvailability(day as keyof typeof profile.availability)}
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5"/>
                  Session Preferences
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Max Sessions/Week</label>
                    <Input
                      type="number"
                      value={profile.preferences.maxSessionsPerWeek}
                      onChange={(e) => setProfile(prev => ({
                        ...prev,
                        preferences: {
                          ...prev.preferences,
                          maxSessionsPerWeek: parseInt(e.target.value) || 0,
                        },
                      }))}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Session Duration (min)</label>
                    <select
                      value={profile.preferences.sessionDuration}
                      onChange={(e) => setProfile(prev => ({
                        ...prev,
                        preferences: {
                          ...prev.preferences,
                          sessionDuration: parseInt(e.target.value),
                        },
                      }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value={30}>30 minutes</option>
                      <option value={45}>45 minutes</option>
                      <option value={60}>60 minutes</option>
                      <option value={90}>90 minutes</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Timezone</label>
                    <Input
                      value={profile.timezone}
                      onChange={(e) => setProfile(prev => ({ ...prev, timezone: e.target.value }))}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Session Types</label>
                  <div className="flex flex-wrap gap-2">
                    {["video", "chat", "in-person"].map((type) => (
                      <div
                        key={type}
                        className="cursor-pointer"
                        onClick={() => {
                          const types = profile.preferences.sessionTypes.includes(type)
                            ? profile.preferences.sessionTypes.filter(t => t !== type)
                            : [...profile.preferences.sessionTypes, type]
                          setProfile(prev => ({
                            ...prev,
                            preferences: { ...prev.preferences, sessionTypes: types },
                          }))
                        }}
                      >
                        <Badge
                          variant={profile.preferences.sessionTypes.includes(type) ? "success" : "default"}
                        >
                          {type === "video" && <Video className="h-3 w-3 mr-1"/>}
                          {type === "chat" && <MessageSquare className="h-3 w-3 mr-1"/>}
                          {type === "in-person" && <Users className="h-3 w-3 mr-1"/>}
                          {type.charAt(0).toUpperCase() + type.slice(1)}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5"/>
                  Notification Preferences
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {Object.entries(profile.notifications).map(([key, enabled]) => (
                  <div key={key} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <span className="font-medium capitalize">
                        {key.replace(/([A-Z])/g, " $1").trim()}
                      </span>
                      <p className="text-sm text-gray-600">
                        {key === "email" && "Receive notifications via email"}
                        {key === "push" && "Receive push notifications in browser"}
                        {key === "sessionReminders" && "Get reminders before scheduled sessions"}
                        {key === "newMessages" && "Notify when you receive new messages"}
                        {key === "weeklyDigest" && "Weekly summary of your mentorship activity"}
                      </p>
                    </div>
                    <Switch
                      checked={enabled}
                      onCheckedChange={() => updateNotification(key as keyof typeof profile.notifications)}
                    />
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Privacy Tab */}
          <TabsContent value="privacy" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5"/>
                  Privacy Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {Object.entries(profile.privacy).map(([key, enabled]) => (
                  <div key={key} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      {enabled ? <Eye className="h-4 w-4 text-green-600"/> :
                        <EyeOff className="h-4 w-4 text-gray-400"/>}
                      <div>
                        <span className="font-medium capitalize">
                          {key.replace(/([A-Z])/g, " $1").trim()}
                        </span>
                        <p className="text-sm text-gray-600">
                          {key === "profileVisible" && "Make your profile visible to other users"}
                          {key === "showEmail" && "Display your email address on your profile"}
                          {key === "showLocation" && "Show your location on your profile"}
                          {key === "allowDirectMessages" && "Allow other users to send you direct messages"}
                        </p>
                      </div>
                    </div>
                    <Switch
                      checked={enabled}
                      onCheckedChange={() => updatePrivacy(key as keyof typeof profile.privacy)}
                    />
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default ProfilePage
