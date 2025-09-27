'use client';

import { useState } from 'react';
import Card, { CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Badge from '@/components/ui/Badge';
import Tabs, { TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Calendar,
  Search,
  Filter,
  Plus,
  CheckCircle,
  XCircle,
  AlertCircle,
  Video,
  MessageSquare,
  Users,
  Clock,
  MapPin,
  Star
} from 'lucide-react';
import MentorshipBreadcrumb from '@/components/mentorship/MentorshipBreadcrumb';
import { SessionCard, type Session } from '@/components/mentorship/SessionCard';
import Link from 'next/link';
import Avatar, { AvatarFallback, AvatarImage } from '@/components/ui/Avatar';



const mockSessions: Session[] = [
  {
    id: '1',
    title: 'React Development Best Practices',
    mentor: {
      name: 'Rajesh Hamal',
      avatar: '/avatars/rajesh.jpg'
    },
    mentee: {
      name: 'Priya Sharma',
      avatar: '/avatars/priya.jpg'
    },
    date: '2024-01-15',
    time: '14:00',
    duration: 60,
    type: 'video',
    status: 'scheduled',
    goals: ['React Hooks', 'State Management', 'Performance'],
    meetingLink: 'https://meet.google.com/abc-def-ghi'
  },
  {
    id: '2',
    title: 'Career Guidance in Tech',
    mentor: {
      name: 'Sita Devi',
      avatar: '/avatars/sita.jpg'
    },
    mentee: {
      name: 'Arjun Thapa',
      avatar: '/avatars/arjun.jpg'
    },
    date: '2024-01-12',
    time: '16:30',
    duration: 45,
    type: 'video',
    status: 'completed',
    goals: ['Career Planning', 'Skill Development'],
    rating: 5,
    feedback: 'Excellent session! Very insightful advice on career progression.'
  },
  {
    id: '3',
    title: 'Startup Funding Strategies',
    mentor: {
      name: 'Krishna Bahadur',
      avatar: '/avatars/krishna.jpg'
    },
    mentee: {
      name: 'Maya Gurung',
      avatar: '/avatars/maya.jpg'
    },
    date: '2024-01-18',
    time: '10:00',
    duration: 90,
    type: 'in-person',
    status: 'pending',
    location: 'Kathmandu Tech Hub',
    goals: ['Funding', 'Business Plan', 'Investor Relations']
  },
  {
    id: '4',
    title: 'UI/UX Design Principles',
    mentor: {
      name: 'Ganga Devi',
      avatar: '/avatars/ganga.jpg'
    },
    mentee: {
      name: 'Bikash Rai',
      avatar: '/avatars/bikash.jpg'
    },
    date: '2024-01-10',
    time: '11:00',
    duration: 60,
    type: 'chat',
    status: 'cancelled',
    goals: ['Design Systems', 'User Research']
  }
];

const SessionsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');



  const filteredSessions = mockSessions.filter(session => {
    const matchesSearch = session.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         session.mentor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         session.mentee.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || session.status === statusFilter;
    const matchesType = typeFilter === 'all' || session.type === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  const upcomingSessions = filteredSessions.filter(s => s.status === 'scheduled' || s.status === 'pending');
  const completedSessions = filteredSessions.filter(s => s.status === 'completed');
  const cancelledSessions = filteredSessions.filter(s => s.status === 'cancelled');



  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="container mx-auto px-4 py-8">
        <MentorshipBreadcrumb items={[{ label: 'Sessions', href: '/mentorship/sessions' }]} />
        
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">My Sessions</h1>
              <p className="text-gray-600">Manage your mentorship sessions and track your progress</p>
            </div>
            <div className="flex items-center gap-3">
              <Link href="/mentorship/browse">
                <Button variant="outline" className="flex items-center gap-2">
                  <Search className="h-4 w-4" />
                  Browse Mentors
                </Button>
              </Link>
              <Link href="/mentorship/profile">
                <Button variant="outline" className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  My Profile
                </Button>
              </Link>
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                <Plus className="h-4 w-4 mr-2" />
                Schedule Session
              </Button>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search sessions, mentors, or mentees..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Status</option>
                <option value="scheduled">Scheduled</option>
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Types</option>
                <option value="video">Video Call</option>
                <option value="chat">Chat</option>
                <option value="in-person">In Person</option>
              </select>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Upcoming</p>
                    <p className="text-2xl font-bold text-blue-600">{upcomingSessions.length}</p>
                  </div>
                  <Calendar className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Completed</p>
                    <p className="text-2xl font-bold text-green-600">{completedSessions.length}</p>
                  </div>
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">This Month</p>
                    <p className="text-2xl font-bold text-purple-600">{mockSessions.length}</p>
                  </div>
                  <Clock className="h-8 w-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Avg Rating</p>
                    <p className="text-2xl font-bold text-yellow-600">4.8</p>
                  </div>
                  <Star className="h-8 w-8 text-yellow-600" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Sessions Tabs */}
        <Tabs defaultValue="all" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">All Sessions ({filteredSessions.length})</TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming ({upcomingSessions.length})</TabsTrigger>
            <TabsTrigger value="completed">Completed ({completedSessions.length})</TabsTrigger>
            <TabsTrigger value="cancelled">Cancelled ({cancelledSessions.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            {filteredSessions.length > 0 ? (
              <div className="grid gap-4">
                {filteredSessions.map((session) => (
                  <SessionCard key={session.id} session={session} />
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="p-8 text-center">
                  <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No sessions found</h3>
                  <p className="text-gray-600 mb-4">Try adjusting your search or filters</p>
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <Plus className="h-4 w-4 mr-2" />
                    Schedule Your First Session
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="upcoming" className="space-y-4">
            {upcomingSessions.map((session) => (
              <SessionCard key={session.id} session={session} />
            ))}
            {upcomingSessions.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No upcoming sessions</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="completed" className="space-y-4">
            {completedSessions.map((session) => (
              <SessionCard key={session.id} session={session} />
            ))}
            {completedSessions.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <CheckCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No completed sessions</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="cancelled" className="space-y-4">
            {cancelledSessions.map((session) => (
              <SessionCard key={session.id} session={session} />
            ))}
            {cancelledSessions.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <XCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No cancelled sessions</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SessionsPage;