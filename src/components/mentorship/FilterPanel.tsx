'use client';

import { useState } from 'react';
import Card, { CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Label from '@/components/ui/Label';
import Checkbox from '@/components/ui/Checkbox';
import Badge from '@/components/ui/Badge';
import Slider from '@/components/ui/Slider';
import Select from '@/components/ui/Select';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/Collapsible';
import {
  Search,
  X,
  ChevronDown,
  ChevronUp,
  Star,
  DollarSign,
  Globe,
  Award,
  Users,
  RefreshCw,
  MapPin
} from 'lucide-react';

export interface FilterOptions {
  search: string;
  skills: string[];
  experience: [number, number];
  location: string;
  rating: number;
  priceRange: [number, number];
  languages: string[];
  availability: string[];
  sessionTypes: string[];
  responseTime: string;
  mentorType: string; // 'all' | 'mentor' | 'mentee'
  isOnline: boolean | null;
  hasReviews: boolean;
}

interface FilterPanelProps {
  filters: FilterOptions;
  onFiltersChange: (filters: FilterOptions) => void;
  onReset: () => void;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
}

const skillOptions = [
  'JavaScript', 'TypeScript', 'React', 'Node.js', 'Python', 'Java',
  'Go', 'Rust', 'PHP', 'Ruby', 'Swift', 'Kotlin', 'Flutter', 'Vue.js',
  'Angular', 'Next.js', 'Express.js', 'Django', 'Spring Boot', 'Laravel',
  'DevOps', 'AWS', 'Docker', 'Kubernetes', 'CI/CD', 'MongoDB', 'PostgreSQL',
  'MySQL', 'Redis', 'GraphQL', 'REST API', 'Microservices', 'System Design',
  'Machine Learning', 'Data Science', 'AI', 'Blockchain', 'Web3', 'Mobile Development',
  'UI/UX Design', 'Product Management', 'Agile', 'Scrum', 'Leadership', 'Career Growth'
];

const languageOptions = [
  'English', 'Nepali', 'Hindi', 'Chinese', 'Spanish', 'French', 'German',
  'Japanese', 'Korean', 'Portuguese', 'Russian', 'Arabic', 'Italian'
];



const sessionTypeOptions = [
  { value: 'video', label: 'Video Call', icon: Users },
  { value: 'audio', label: 'Audio Call', icon: Users },
  { value: 'chat', label: 'Text Chat', icon: Users },
  { value: 'in-person', label: 'In Person', icon: Users }
];

const responseTimeOptions = [
  'Within 1 hour', 'Within 4 hours', 'Within 24 hours',
  'Within 3 days', 'Within a week', 'Any'
];

export const FilterPanel = ({
  filters,
  onFiltersChange,
  onReset,
  isCollapsed = false,
  onToggleCollapse
}: FilterPanelProps) => {
  const [openSections, setOpenSections] = useState({
    skills: true,
    experience: false,
    location: false,
    rating: false,
    price: false,
    languages: false,
    availability: false,
    sessionTypes: false,
    other: false
  });

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const updateFilter = <K extends keyof FilterOptions>(key: K, value: FilterOptions[K]) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const toggleSkill = (skill: string) => {
    const newSkills = filters.skills.includes(skill)
      ? filters.skills.filter(s => s !== skill)
      : [...filters.skills, skill];
    updateFilter('skills', newSkills);
  };

  const toggleLanguage = (language: string) => {
    const newLanguages = filters.languages.includes(language)
      ? filters.languages.filter(l => l !== language)
      : [...filters.languages, language];
    updateFilter('languages', newLanguages);
  };



  const toggleSessionType = (sessionType: string) => {
    const newSessionTypes = filters.sessionTypes.includes(sessionType)
      ? filters.sessionTypes.filter(s => s !== sessionType)
      : [...filters.sessionTypes, sessionType];
    updateFilter('sessionTypes', newSessionTypes);
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters.search) count++;
    if (filters.skills.length > 0) count++;
    if (filters.experience[0] > 0 || filters.experience[1] < 20) count++;
    if (filters.location) count++;
    if (filters.rating > 0) count++;
    if (filters.priceRange[0] > 0 || filters.priceRange[1] < 200) count++;
    if (filters.languages.length > 0) count++;
    if (filters.availability.length > 0) count++;
    if (filters.sessionTypes.length > 0) count++;
    if (filters.responseTime !== 'Any') count++;
    if (filters.mentorType !== 'all') count++;
    if (filters.isOnline !== null) count++;
    if (filters.hasReviews) count++;
    return count;
  };

  if (isCollapsed) {
    return (
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                onClick={onToggleCollapse}
                className="flex items-center space-x-2"
              >
                <Search className="h-4 w-4" />
                <span>Filters</span>
                {getActiveFiltersCount() > 0 && (
                  <Badge variant="info" className="ml-2">
                    {getActiveFiltersCount()}
                  </Badge>
                )}
                <ChevronDown className="h-4 w-4" />
              </Button>
              
              {/* Quick filters */}
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search mentors..."
                    value={filters.search}
                    onChange={(e) => updateFilter('search', e.target.value)}
                    className="pl-10 w-64"
                  />
                </div>
                
                <Select 
                  value={filters.mentorType} 
                  onChange={(e) => updateFilter('mentorType', e.target.value)}
                  options={[
                    { value: 'all', label: 'All' },
                    { value: 'mentor', label: 'Mentors' },
                    { value: 'mentee', label: 'Mentees' }
                  ]}
                  className="w-32"
                />
              </div>
            </div>
            
            {getActiveFiltersCount() > 0 && (
              <Button variant="outline" size="sm" onClick={onReset}>
                <RefreshCw className="h-4 w-4 mr-2" />
                Reset
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mb-6">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <Search className="h-5 w-5" />
            <span>Filters</span>
            {getActiveFiltersCount() > 0 && (
              <Badge variant="info">
                {getActiveFiltersCount()}
              </Badge>
            )}
          </CardTitle>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={onReset}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Reset
            </Button>
            {onToggleCollapse && (
              <Button variant="outline" size="sm" onClick={onToggleCollapse}>
                <ChevronUp className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Search */}
        <div className="space-y-2">
          <Label>Search</Label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search by name, skills, or company..."
              value={filters.search}
              onChange={(e) => updateFilter('search', e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Mentor Type */}
        <div className="space-y-2">
          <Label>Looking for</Label>
          <Select 
            value={filters.mentorType} 
            onChange={(e) => updateFilter('mentorType', e.target.value)}
            options={[
              { value: 'all', label: 'All Users' },
              { value: 'mentor', label: 'Mentors Only' },
              { value: 'mentee', label: 'Mentees Only' }
            ]}
          />
        </div>

        {/* Skills */}
        <Collapsible open={openSections.skills} onOpenChange={() => toggleSection('skills')}>
          <CollapsibleTrigger className="flex items-center justify-between w-full">
            <Label className="cursor-pointer">Skills & Technologies</Label>
            {openSections.skills ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-3 mt-3">
            <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto">
              {skillOptions.map((skill) => (
                <div key={skill} onClick={() => toggleSkill(skill)}>
                  <Badge
                    variant={filters.skills.includes(skill) ? "success" : "default"}
                    className="cursor-pointer hover:bg-blue-100"
                  >
                    {skill}
                    {filters.skills.includes(skill) && (
                      <X className="h-3 w-3 ml-1" />
                    )}
                  </Badge>
                </div>
              ))}
            </div>
          </CollapsibleContent>
        </Collapsible>

        {/* Experience */}
        <Collapsible open={openSections.experience} onOpenChange={() => toggleSection('experience')}>
          <CollapsibleTrigger className="flex items-center justify-between w-full">
            <Label className="cursor-pointer flex items-center space-x-2">
              <Award className="h-4 w-4" />
              <span>Experience Level</span>
            </Label>
            {openSections.experience ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-3 mt-3">
            <div className="px-3">
              <Slider
                value={filters.experience}
                onValueChange={(value) => updateFilter('experience', value as [number, number])}
                max={20}
                min={0}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-gray-500 mt-2">
                <span>{filters.experience[0]} years</span>
                <span>{filters.experience[1]}+ years</span>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>

        {/* Location */}
        <Collapsible open={openSections.location} onOpenChange={() => toggleSection('location')}>
          <CollapsibleTrigger className="flex items-center justify-between w-full">
            <Label className="cursor-pointer flex items-center space-x-2">
              <MapPin className="h-4 w-4" />
              <span>Location</span>
            </Label>
            {openSections.location ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-3 mt-3">
            <Input
              placeholder="Enter city, country, or 'Remote'"
              value={filters.location}
              onChange={(e) => updateFilter('location', e.target.value)}
            />
          </CollapsibleContent>
        </Collapsible>

        {/* Rating */}
        <Collapsible open={openSections.rating} onOpenChange={() => toggleSection('rating')}>
          <CollapsibleTrigger className="flex items-center justify-between w-full">
            <Label className="cursor-pointer flex items-center space-x-2">
              <Star className="h-4 w-4" />
              <span>Minimum Rating</span>
            </Label>
            {openSections.rating ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-3 mt-3">
            <div className="flex items-center space-x-2">
              {[1, 2, 3, 4, 5].map((rating) => (
                <Button
                  key={rating}
                  variant={filters.rating >= rating ? "primary" : "outline"}
                  size="sm"
                  onClick={() => updateFilter('rating', rating)}
                  className="flex items-center space-x-1"
                >
                  <Star className={`h-3 w-3 ${filters.rating >= rating ? 'fill-current' : ''}`} />
                  <span>{rating}+</span>
                </Button>
              ))}
            </div>
          </CollapsibleContent>
        </Collapsible>

        {/* Price Range */}
        <Collapsible open={openSections.price} onOpenChange={() => toggleSection('price')}>
          <CollapsibleTrigger className="flex items-center justify-between w-full">
            <Label className="cursor-pointer flex items-center space-x-2">
              <DollarSign className="h-4 w-4" />
              <span>Hourly Rate</span>
            </Label>
            {openSections.price ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-3 mt-3">
            <div className="px-3">
              <Slider
                value={filters.priceRange}
                onValueChange={(value) => updateFilter('priceRange', value as [number, number])}
                max={200}
                min={0}
                step={5}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-gray-500 mt-2">
                <span>${filters.priceRange[0]}/hr</span>
                <span>${filters.priceRange[1]}+/hr</span>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>

        {/* Languages */}
        <Collapsible open={openSections.languages} onOpenChange={() => toggleSection('languages')}>
          <CollapsibleTrigger className="flex items-center justify-between w-full">
            <Label className="cursor-pointer flex items-center space-x-2">
              <Globe className="h-4 w-4" />
              <span>Languages</span>
            </Label>
            {openSections.languages ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-3 mt-3">
            <div className="flex flex-wrap gap-2">
              {languageOptions.map((language) => (
                <div key={language} onClick={() => toggleLanguage(language)}>
                  <Badge
                    variant={filters.languages.includes(language) ? "success" : "default"}
                    className="cursor-pointer hover:bg-blue-100"
                  >
                    {language}
                    {filters.languages.includes(language) && (
                      <X className="h-3 w-3 ml-1" />
                    )}
                  </Badge>
                </div>
              ))}
            </div>
          </CollapsibleContent>
        </Collapsible>

        {/* Session Types */}
        <Collapsible open={openSections.sessionTypes} onOpenChange={() => toggleSection('sessionTypes')}>
          <CollapsibleTrigger className="flex items-center justify-between w-full">
            <Label className="cursor-pointer">Session Types</Label>
            {openSections.sessionTypes ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-3 mt-3">
            <div className="space-y-2">
              {sessionTypeOptions.map((option) => (
                <div key={option.value} className="flex items-center space-x-2">
                  <Checkbox
                    id={option.value}
                    checked={filters.sessionTypes.includes(option.value)}
                    onChange={() => toggleSessionType(option.value)}
                  />
                  <Label htmlFor={option.value} className="flex items-center space-x-2 cursor-pointer">
                    <option.icon className="h-4 w-4" />
                    <span>{option.label}</span>
                  </Label>
                </div>
              ))}
            </div>
          </CollapsibleContent>
        </Collapsible>

        {/* Other Filters */}
        <Collapsible open={openSections.other} onOpenChange={() => toggleSection('other')}>
          <CollapsibleTrigger className="flex items-center justify-between w-full">
            <Label className="cursor-pointer">Other Filters</Label>
            {openSections.other ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-4 mt-3">
            {/* Response Time */}
            <div className="space-y-2">
              <Label>Response Time</Label>
              <Select 
                value={filters.responseTime} 
                onChange={(e) => updateFilter('responseTime', e.target.value)}
                options={responseTimeOptions.map(option => ({ value: option, label: option }))}
              />
            </div>

            {/* Online Status */}
            <div className="flex items-center space-x-2">
              <Checkbox
                id="online-only"
                checked={filters.isOnline === true}
                onChange={(e) => updateFilter('isOnline', e.target.checked ? true : null)}
              />
              <Label htmlFor="online-only" className="cursor-pointer">
                Show only online users
              </Label>
            </div>

            {/* Has Reviews */}
            <div className="flex items-center space-x-2">
              <Checkbox
                id="has-reviews"
                checked={filters.hasReviews}
                onChange={(e) => updateFilter('hasReviews', e.target.checked)}
              />
              <Label htmlFor="has-reviews" className="cursor-pointer">
                Has reviews only
              </Label>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
    </Card>
  );
};

export default FilterPanel;