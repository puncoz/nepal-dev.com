import React, { useState, useMemo } from 'react';
import { Bot, RefreshCw, Star, TrendingUp, Code, Briefcase, GraduationCap, Filter, SlidersHorizontal } from 'lucide-react';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import MatchCard from '@/components/mentorship/MatchCard';
import GoalSelector from '@/components/mentorship/GoalSelector';
import SessionRequestModal from '@/components/mentorship/SessionRequestModal';
import MentorshipBreadcrumb from '@/components/mentorship/MentorshipBreadcrumb';

const AIMatches = () => {
  const [selectedGoals, setSelectedGoals] = useState<string[]>(['devops']);
  const [refreshing, setRefreshing] = useState(false);
  const [sessionModalOpen, setSessionModalOpen] = useState(false);
  const [selectedMentor, setSelectedMentor] = useState<any>(null);
  const [filters, setFilters] = useState({
    minMatchScore: 0,
    experienceLevel: 'all',
    availability: 'all',
    timezone: 'all',
    rating: 0
  });
  const [showFilters, setShowFilters] = useState(false);



  const topMatches = [
    {
      id: 1,
      name: 'Ram Kumar Shrestha',
      title: 'Senior DevOps Engineer',
      experience: '8 years exp',
      location: 'Kathmandu',
      timezone: 'GMT+5:45',
      languages: ['English', 'Nepali'],
      matchScore: 96,
      rating: 4.9,
      avatar: '👨‍💻',
      skills: ['Kubernetes', 'AWS', 'Docker', 'CI/CD', 'Terraform'],
      perfectFor: ['Kubernetes', 'AWS', 'CI/CD'],
      matchReasons: [
        'Expert in your target skills (DevOps)',
        'Same timezone for easy scheduling',
        'Mentored 12 developers in similar goals',
        'Highly rated (4.9⭐) with great feedback'
      ],
      availability: 'Weekdays 7-9 PM • Weekends flexible',
      preferences: 'Video calls, hands-on projects',
      menteesHelped: 12,
      successRate: 95,
      responseTime: '< 2 hours'
    },
    {
      id: 2,
      name: 'Priya Sharma',
      title: 'React Specialist & Tech Lead',
      experience: '6 years exp',
      location: 'Pokhara',
      timezone: 'GMT+5:45',
      languages: ['English', 'Nepali', 'Hindi'],
      matchScore: 92,
      rating: 4.8,
      avatar: '👩‍💻',
      skills: ['React', 'TypeScript', 'Next.js', 'GraphQL', 'Node.js'],
      perfectFor: ['React', 'TypeScript', 'Frontend Architecture'],
      matchReasons: [
        'React expert with modern stack knowledge',
        'Experience mentoring junior developers',
        'Strong communication skills',
        'Available in your preferred time slots'
      ],
      availability: 'Evenings & weekends',
      preferences: 'Code reviews, pair programming',
      menteesHelped: 8,
      successRate: 92,
      responseTime: '< 4 hours'
    },
    {
      id: 3,
      name: 'Sujan Maharjan',
      title: 'Full Stack Developer',
      experience: '5 years exp',
      location: 'Lalitpur',
      timezone: 'GMT+5:45',
      languages: ['English', 'Nepali'],
      matchScore: 88,
      rating: 4.7,
      avatar: '👨‍💼',
      skills: ['Node.js', 'React', 'MongoDB', 'AWS', 'Docker'],
      perfectFor: ['Full Stack Development', 'Project Architecture'],
      matchReasons: [
        'Balanced full-stack expertise',
        'Recent project experience in your domain',
        'Good mentor-mentee ratio',
        'Flexible scheduling options'
      ],
      availability: 'Flexible hours',
      preferences: 'Project-based learning, mentoring',
      menteesHelped: 6,
      successRate: 89,
      responseTime: '< 6 hours'
    }
  ];

  const filteredMatches = useMemo(() => {
    return topMatches.filter(match => {
      if (filters.minMatchScore > 0 && match.matchScore < filters.minMatchScore) return false;
      if (filters.experienceLevel !== 'all' && !match.experience.toLowerCase().includes(filters.experienceLevel)) return false;
      if (filters.rating > 0 && match.rating < filters.rating) return false;
      return true;
    });
  }, [topMatches, filters]);

  const handleGoalToggle = (goalId: string) => {
    setSelectedGoals(prev => 
      prev.includes(goalId) 
        ? prev.filter(id => id !== goalId)
        : [...prev, goalId]
    );
  };

  const handleFilterChange = (key: string, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleRequestSession = (matchId: number) => {
    const mentor = topMatches.find(m => m.id === matchId);
    if (mentor) {
      setSelectedMentor(mentor);
      setSessionModalOpen(true);
    }
  };

  const handleSaveForLater = (matchId: number) => {
    // Handle save for later functionality
    console.log('Saved match:', matchId);
  };

  const handleSessionRequest = async (requestData: any) => {
    // Handle session request submission
    console.log('Session request:', requestData);
    // Here you would typically send the request to your API
  };

  const handleRefreshMatches = async () => {
    setRefreshing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setRefreshing(false);
  };

  const getMatchScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600 bg-green-100';
    if (score >= 80) return 'text-blue-600 bg-blue-100';
    if (score >= 70) return 'text-yellow-600 bg-yellow-100';
    return 'text-gray-600 bg-gray-100';
  };

  const getMatchScoreGradient = (score: number) => {
    if (score >= 90) return 'from-green-500 to-emerald-500';
    if (score >= 80) return 'from-blue-500 to-cyan-500';
    if (score >= 70) return 'from-yellow-500 to-orange-500';
    return 'from-gray-500 to-slate-500';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 p-6">
      <MentorshipBreadcrumb items={[{ label: 'AI Matches' }]} />
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-3">
            <div className="p-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full">
              <Bot className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              AI-Powered Matches
            </h1>
            <button 
              onClick={handleRefreshMatches}
              disabled={refreshing}
              className="p-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`w-5 h-5 text-gray-600 ${refreshing ? 'animate-spin' : ''}`} />
            </button>
          </div>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Get intelligent mentor recommendations tailored to your learning goals and preferences.
          </p>
        </div>

        {/* Goal Selection */}
        <Card className="p-6">
          <GoalSelector
            selectedGoals={selectedGoals}
            onGoalToggle={handleGoalToggle}
            maxSelections={5}
            showCustomOption={true}
            onCustomGoal={() => console.log('Custom goal clicked')}
          />
        </Card>

        {/* Top Matches */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center">
              <Star className="w-5 h-5 mr-2 text-yellow-500" />
              Top Mentor Recommendations ({filteredMatches.length})
            </h2>
            <button 
              onClick={handleRefreshMatches}
              disabled={refreshing}
              className="flex items-center space-x-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
              <span>{refreshing ? 'Refreshing...' : 'Refresh Matches'}</span>
            </button>
          </div>

          {filteredMatches.length > 0 ? (
            <div className="space-y-6">
              {filteredMatches.map((match) => (
                <MatchCard
                  key={match.id}
                  match={match}
                  onRequestSession={handleRequestSession}
                  onSaveForLater={handleSaveForLater}
                  showFullDetails={true}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Filter className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No matches found</h3>
              <p className="text-gray-500 mb-4">Try adjusting your filters to see more mentors</p>
              <button
                onClick={() => setFilters({ minMatchScore: 0, experienceLevel: 'all', availability: 'all', timezone: 'all', rating: 0 })}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </Card>

        {/* Load More */}
        <div className="text-center space-y-4">
          <button className="px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium">
            Show More Matches
          </button>
          <button className="px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg hover:from-purple-600 hover:to-blue-600 transition-all duration-200 font-medium">
            Adjust Preferences
          </button>
        </div>

        {/* Filters and AI Insights */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Filters */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                <SlidersHorizontal className="w-5 h-5 mr-2 text-purple-500" />
                Filters
              </h3>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="text-purple-600 hover:text-purple-700 text-sm font-medium"
              >
                {showFilters ? 'Hide' : 'Show'}
              </button>
            </div>
            
            {showFilters && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Min Match Score: {filters.minMatchScore}%
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={filters.minMatchScore}
                    onChange={(e) => handleFilterChange('minMatchScore', parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Experience Level
                  </label>
                  <select
                    value={filters.experienceLevel}
                    onChange={(e) => handleFilterChange('experienceLevel', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="all">All Levels</option>
                    <option value="senior">Senior</option>
                    <option value="lead">Lead</option>
                    <option value="principal">Principal</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Min Rating: {filters.rating}★
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="5"
                    step="0.5"
                    value={filters.rating}
                    onChange={(e) => handleFilterChange('rating', parseFloat(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
                
                <button
                  onClick={() => setFilters({ minMatchScore: 0, experienceLevel: 'all', availability: 'all', timezone: 'all', rating: 0 })}
                  className="w-full px-4 py-2 text-sm text-purple-600 border border-purple-200 rounded-lg hover:bg-purple-50 transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </Card>
          
          {/* AI Insights */}
          <Card className="lg:col-span-2 p-6 bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
            <div className="flex items-start space-x-4">
              <div className="p-3 bg-purple-100 rounded-full">
                <Bot className="w-6 h-6 text-purple-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">🤖 AI Insights</h3>
                <div className="space-y-2 text-sm text-gray-700">
                  <p>• Based on your DevOps focus, I found <strong>{filteredMatches.length} compatible mentors</strong> matching your criteria</p>
                  <p>• <strong>Rajesh Hamal</strong> has the most similar learning path to your goals</p>
                  <p>• Consider scheduling sessions during <strong>Nepal evening hours</strong> for better availability</p>
                  <p>• Your profile shows strong potential for <strong>advanced DevOps practices</strong> - these mentors can help you get there</p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Session Request Modal */}
        {selectedMentor && (
          <SessionRequestModal
            isOpen={sessionModalOpen}
            onClose={() => {
              setSessionModalOpen(false);
              setSelectedMentor(null);
            }}
            mentor={selectedMentor}
            onSubmit={handleSessionRequest}
          />
        )}
      </div>
    </div>
  );
};

export default AIMatches;