'use client';

import { useState } from 'react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import {
  List,
  SlidersHorizontal,
  Users,
  Search,
  Grid,
  Calendar,
  User,
  Plus
} from 'lucide-react';
import MentorshipBreadcrumb from '@/components/mentorship/MentorshipBreadcrumb';
import { MentorCard, type MentorProfile } from '@/components/mentorship/MentorCard';
import { FilterPanel, type FilterOptions } from '@/components/mentorship/FilterPanel';
import Link from 'next/link';

// MentorProfile interface is now imported from MentorCard component

const BrowsePage = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [activeTab, setActiveTab] = useState<'all' | 'mentors' | 'mentees'>('all');
  const [showFilters, setShowFilters] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<FilterOptions>({
    search: '',
    skills: [],
    experience: [0, 20],
    location: '',
    rating: 0,
    priceRange: [0, 200],
    languages: [],
    availability: [],
    sessionTypes: [],
    responseTime: 'Any',
    mentorType: 'all',
    isOnline: null,
    hasReviews: false
  });

  // Mock data for mentors and mentees
  const mockProfiles: MentorProfile[] = [
    {
      id: '1',
      name: 'Rajesh Hamal',
      title: 'Senior Full Stack Developer',
      company: 'Tech Nepal Pvt Ltd',
      experience: 8,
      location: 'Kathmandu, Nepal',
      rating: 4.9,
      reviewCount: 127,
      avatar: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=Professional%20Nepali%20software%20developer%20headshot%2C%20friendly%20smile%2C%20modern%20office%20background&image_size=square',
      skills: ['React', 'Node.js', 'TypeScript', 'AWS', 'MongoDB'],
      languages: ['English', 'Nepali', 'Hindi'],
      availability: ['Available now'],
      hourlyRate: 45,
      responseTime: '< 2 hours',
      sessionTypes: ['video', 'chat'],
      totalSessions: 127,
      bio: 'Passionate full-stack developer with 8+ years of experience building scalable web applications. I love mentoring junior developers and sharing knowledge about modern web technologies.',
      isOnline: true,
      isFavorite: false
    },
    {
      id: '2',
      name: 'Sita Gurung',
      title: 'UX/UI Designer',
      company: 'Design Studio Nepal',
      experience: 5,
      location: 'Pokhara, Nepal',
      rating: 4.8,
      reviewCount: 89,
      avatar: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=Professional%20Nepali%20female%20UX%20designer%2C%20creative%20workspace%20background%2C%20friendly%20expression&image_size=square',
      skills: ['Figma', 'Adobe XD', 'Sketch', 'Prototyping', 'User Research'],
      languages: ['English', 'Nepali'],
      availability: ['Flexible'],
      hourlyRate: 50,
      responseTime: '< 4 hours',
      sessionTypes: ['video', 'chat', 'screen-share'],
      totalSessions: 89,
      bio: 'Creative UX/UI designer focused on creating beautiful and functional digital experiences.',
      isOnline: false,
      isFavorite: true
    },
    {
      id: '3',
      name: 'Arjun Thapa',
      title: 'Data Science Student',
      company: 'Tribhuvan University',
      experience: 2,
      location: 'Lalitpur, Nepal',
      rating: 4.5,
      reviewCount: 23,
      avatar: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=Young%20Nepali%20computer%20science%20student%2C%20university%20campus%20background%2C%20eager%20expression&image_size=square',
      skills: ['Python', 'Machine Learning', 'Data Analysis', 'SQL'],
      languages: ['English', 'Nepali'],
      availability: ['Seeking mentor'],
      responseTime: '< 6 hours',
      sessionTypes: ['video', 'chat'],
      totalSessions: 23,
      bio: 'Computer science student passionate about data science and machine learning, seeking guidance from experienced professionals.',
      isOnline: true,
      isFavorite: false
    },
    {
      id: '4',
      name: 'Maya Tamang',
      title: 'Mobile App Developer',
      company: 'Mobile Solutions Nepal',
      experience: 4,
      location: 'Bhaktapur, Nepal',
      rating: 4.6,
      reviewCount: 67,
      avatar: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=Professional%20Nepali%20female%20mobile%20developer%2C%20modern%20tech%20office%2C%20confident%20smile&image_size=square',
      skills: ['Flutter', 'React Native', 'iOS', 'Android', 'Firebase'],
      languages: ['English', 'Nepali'],
      availability: ['Weekends'],
      hourlyRate: 38,
      responseTime: '< 8 hours',
      sessionTypes: ['video', 'chat'],
      totalSessions: 67,
      bio: 'Mobile app developer specializing in cross-platform solutions and beautiful user interfaces.',
      isOnline: false,
      isFavorite: false
    },
    {
      id: '5',
      name: 'Bikash Adhikari',
      title: 'Computer Science Student',
      company: 'Tribhuvan University',
      experience: 0,
      location: 'Chitwan',
      languages: ['English', 'Nepali'],
      rating: 0,
      reviewCount: 0,
      avatar: '👨‍🎓',
      skills: ['Python', 'Java', 'Data Structures'],
      availability: ['Weekends'],
      sessionTypes: ['chat', 'video'],
      responseTime: '< 24 hours',
      totalSessions: 0,
      isOnline: true,
      bio: 'CS student looking for guidance in software development and career planning.'
    }
  ];

  // Filter profiles based on filters
  const filteredProfiles = mockProfiles.filter(profile => {
    const matchesSearch = !filters.search || 
      profile.name.toLowerCase().includes(filters.search.toLowerCase()) ||
      profile.title.toLowerCase().includes(filters.search.toLowerCase()) ||
      profile.skills.some(skill => skill.toLowerCase().includes(filters.search.toLowerCase()));
    
    const matchesSkills = filters.skills.length === 0 || 
      filters.skills.some(skill => profile.skills.includes(skill));
    
    const matchesExperience = profile.experience >= filters.experience[0] && 
      profile.experience <= filters.experience[1];
    
    const matchesLocation = !filters.location || 
      profile.location.toLowerCase().includes(filters.location.toLowerCase());
    
    const matchesRating = profile.rating >= filters.rating;
    
    const matchesLanguages = filters.languages.length === 0 || 
      filters.languages.some(lang => profile.languages.includes(lang));
    
    return matchesSearch && matchesSkills && matchesExperience && 
           matchesLocation && matchesRating && matchesLanguages;
  });

  const clearFilters = () => {
    setFilters({
      search: '',
      skills: [],
      experience: [0, 20],
      location: '',
      rating: 0,
      priceRange: [0, 200],
      languages: [],
      availability: [],
      sessionTypes: [],
      responseTime: 'Any',
      mentorType: 'all',
      isOnline: null,
      hasReviews: false
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 p-6">
      <MentorshipBreadcrumb items={[{ label: 'Browse' }]} />
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Browse Mentors & Mentees</h1>
            <p className="text-gray-600 mt-2">Find the perfect mentor or mentee to accelerate your growth</p>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/mentorship/sessions">
              <Button variant="outline" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                My Sessions
              </Button>
            </Link>
            <Link href="/mentorship/profile">
              <Button variant="outline" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                My Profile
              </Button>
            </Link>
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              <Plus className="h-4 w-4 mr-2" />
              Become a Mentor
            </Button>
          </div>
        </div>

        {/* Search and Controls */}
        <Card className="p-6">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by name, skills, or title..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            {/* Controls */}
            <div className="flex items-center space-x-4">
              {/* Tabs */}
              <div className="flex bg-gray-100 rounded-lg p-1">
                {[{ key: 'all', label: 'All' }, { key: 'mentors', label: 'Mentors' }, { key: 'mentees', label: 'Mentees' }].map(tab => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key as 'all' | 'mentors' | 'mentees')}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                      activeTab === tab.key
                        ? 'bg-white text-green-600 shadow-sm'
                        : 'text-gray-600 hover:text-gray-800'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* View Mode */}
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === 'grid' ? 'bg-white text-green-600 shadow-sm' : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === 'list' ? 'bg-white text-green-600 shadow-sm' : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>

              {/* Filters Toggle */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center space-x-2 px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
              >
                <SlidersHorizontal className="w-4 h-4" />
                <span>Filters</span>
                {(filters.skills.length > 0 || filters.experience[1] < 20 || filters.location || filters.rating > 0 || filters.languages.length > 0) && (
                  <Badge className="bg-green-600 text-white text-xs px-2 py-1 rounded-full">
                    {filters.skills.length + (filters.experience[1] < 20 ? 1 : 0) + (filters.location ? 1 : 0) + (filters.rating > 0 ? 1 : 0) + filters.languages.length}
                  </Badge>
                )}
              </button>
            </div>
          </div>

          {/* Results Count */}
          <div className="mt-4 text-sm text-gray-600">
            Showing {filteredProfiles.length} of {mockProfiles.length} {activeTab === 'all' ? 'profiles' : activeTab}
          </div>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filters Sidebar */}
          {showFilters && (
            <FilterPanel
              filters={filters}
              onFiltersChange={setFilters}
              onReset={clearFilters}
            />
          )}

          {/* Profiles Grid/List */}
          <div className={showFilters ? 'lg:col-span-3' : 'lg:col-span-4'}>
            {filteredProfiles.length > 0 ? (
              <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6' : 'space-y-4'}>
                {filteredProfiles.map(profile => (
                  <MentorCard
                    key={profile.id}
                    mentor={profile}
                    viewMode={viewMode}
                  />
                ))}
              </div>
            ) : (
              <Card className="p-12 text-center">
                <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No profiles found</h3>
                <p className="text-gray-500 mb-4">Try adjusting your search terms or filters</p>
                <button
                  onClick={() => {
                    setSearchTerm('');
                    clearFilters();
                  }}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  Clear Search & Filters
                </button>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrowsePage;