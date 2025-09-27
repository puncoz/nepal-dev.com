# Users Module - Technical Specification

## 📋 Overview

The Users Module is the foundational system for Nepal Developers Hub that manages developer profiles, skills, and mentorship capabilities. This module enables developers to dynamically switch between mentor and mentee roles based on their expertise in different technologies, creating a flexible and inclusive mentorship ecosystem.

## 🎯 Core Objectives

1. **Flexible Role Management**: Allow developers to be mentors in some skills and mentees in others
2. **Comprehensive Skill Tracking**: Track skills, proficiency levels, and learning/teaching preferences
3. **Dynamic Capability Assessment**: Automatically determine mentorship eligibility based on skills and experience
4. **Cultural Integration**: Support Nepal-specific developer community needs and preferences
5. **Seamless Onboarding**: Streamlined registration and profile setup process
6. **Privacy & Security**: Robust data protection and user privacy controls

## 👤 User Types & Roles

### Primary User Type: Developer
All users in the system are developers with varying levels of expertise across different technologies. The system supports dynamic role assignment based on skills and preferences.

### Dynamic Role System
```typescript
type UserRole = 'mentor' | 'mentee' | 'both' | 'observer';

interface DynamicRole {
  skillId: string;
  role: 'mentor' | 'mentee' | 'both';
  confidence: number; // 0-100, system-calculated eligibility
  userPreference: 'willing' | 'not_interested' | 'maybe';
  lastUpdated: Date;
}
```

### Role Determination Logic
- **Mentor Eligibility**: Skill proficiency ≥ 3/5 AND experience ≥ 2 years AND willing to mentor
- **Mentee Status**: Skill proficiency ≤ 4/5 AND interested in learning
- **Both**: Can mentor some skills while learning others
- **Observer**: Registered but not actively participating in mentorship

## 📊 Core Data Models

### User Profile Model
```typescript
interface User {
  // Basic Information
  id: string;
  email: string;
  username: string; // Unique, URL-friendly
  displayName: string;
  avatar?: string;
  bio: string;
  
  // Personal Details
  personalInfo: {
    firstName: string;
    lastName: string;
    dateOfBirth?: Date;
    gender?: 'male' | 'female' | 'other' | 'prefer_not_to_say';
    pronouns?: string;
  };
  
  // Location & Timezone
  location: {
    country: string;
    state?: string;
    city: string;
    timezone: string; // IANA timezone identifier
    isRemoteOnly: boolean;
    willingToRelocate: boolean;
  };
  
  // Professional Information
  professional: {
    currentRole?: string;
    company?: string;
    yearsOfExperience: number;
    experienceLevel: 'student' | 'junior' | 'mid' | 'senior' | 'lead' | 'architect';
    industry?: string;
    workingHours?: {
      start: string; // HH:MM format
      end: string;
      timezone: string;
    };
  };
  
  // Skills & Expertise
  skills: UserSkill[];
  
  // Mentorship Configuration
  mentorshipConfig: MentorshipConfiguration;
  
  // Platform Engagement
  engagement: UserEngagement;
  
  // Privacy & Preferences
  privacy: PrivacySettings;
  
  // System Fields
  status: 'active' | 'inactive' | 'suspended' | 'pending_verification';
  emailVerified: boolean;
  profileCompleteness: number; // 0-100%
  lastActiveAt: Date;
  createdAt: Date;
  updatedAt: Date;
}
```

### User Skill Model
```typescript
interface UserSkill {
  id: string;
  skillId: string; // Reference to master skills table
  userId: string;
  
  // Proficiency Information
  proficiencyLevel: 1 | 2 | 3 | 4 | 5; // 1=Beginner, 5=Expert
  yearsOfExperience: number;
  lastUsed: Date;
  
  // Learning/Teaching Preferences
  isLearning: boolean;
  canMentor: boolean;
  mentorConfidence: number; // 0-100, willingness to mentor
  learningPriority: 'high' | 'medium' | 'low';
  
  // Validation & Proof
  isVerified: boolean;
  verificationMethod?: 'self_assessed' | 'peer_reviewed' | 'certified' | 'project_based';
  certifications?: Certification[];
  projects?: ProjectReference[];
  
  // Context
  acquiredAt?: 'work' | 'personal_project' | 'education' | 'bootcamp' | 'self_taught';
  notes?: string;
  
  createdAt: Date;
  updatedAt: Date;
}
```

### Master Skills Model
```typescript
interface Skill {
  id: string;
  name: string;
  slug: string; // URL-friendly identifier
  description: string;
  
  // Categorization
  category: SkillCategory;
  subcategory?: string;
  tags: string[];
  
  // Metadata
  popularity: number; // 0-100, based on community usage
  demandLevel: 'low' | 'medium' | 'high' | 'very_high';
  trendingScore: number; // Recent popularity changes
  
  // Learning Resources
  learningResources?: LearningResource[];
  prerequisites?: string[]; // Other skill IDs
  relatedSkills?: string[]; // Similar or complementary skills
  
  // System Fields
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

type SkillCategory = 
  | 'frontend'
  | 'backend' 
  | 'mobile'
  | 'devops'
  | 'data_science'
  | 'machine_learning'
  | 'design'
  | 'project_management'
  | 'soft_skills'
  | 'languages'
  | 'frameworks'
  | 'tools'
  | 'databases'
  | 'cloud'
  | 'security'
  | 'testing'
  | 'other';
```

### Mentorship Configuration Model
```typescript
interface MentorshipConfiguration {
  // Overall Preferences
  isAvailableAsMentor: boolean;
  isLookingForMentor: boolean;
  
  // Mentor Settings
  mentorSettings?: {
    maxMentees: number;
    preferredMenteeLevel: ('student' | 'junior' | 'mid')[];
    mentoringApproach: 'structured' | 'flexible' | 'project_based' | 'goal_oriented';
    sessionTypes: ('video_call' | 'voice_call' | 'chat' | 'code_review' | 'pair_programming')[];
    availability: AvailabilitySchedule;
    responseTimeCommitment: 'immediate' | 'same_day' | 'within_2_days' | 'within_week';
    specializations: string[]; // Areas of expertise for mentoring
  };
  
  // Mentee Settings
  menteeSettings?: {
    learningGoals: LearningGoal[];
    preferredMentorLevel: ('mid' | 'senior' | 'lead' | 'architect')[];
    learningStyle: 'hands_on' | 'theoretical' | 'project_based' | 'mixed';
    timeCommitment: 'casual' | 'regular' | 'intensive'; // Hours per week
    preferredSessionDuration: 30 | 45 | 60 | 90; // minutes
    communicationPreference: ('video' | 'voice' | 'chat' | 'async')[];
  };
  
  // Communication Preferences
  communication: {
    languages: ('english' | 'nepali' | 'hindi')[];
    preferredTimes: TimeSlot[];
    timezone: string;
    responseExpectation: 'immediate' | 'same_day' | 'within_week';
  };
  
  // Matching Preferences
  matching: {
    genderPreference?: 'no_preference' | 'same_gender' | 'different_gender';
    ageRangePreference?: {
      min?: number;
      max?: number;
    };
    locationPreference: 'no_preference' | 'same_city' | 'same_country' | 'same_timezone';
    experienceGapPreference: 'small' | 'medium' | 'large'; // Acceptable experience difference
  };
}
```

### Learning Goal Model
```typescript
interface LearningGoal {
  id: string;
  userId: string;
  
  // Goal Definition
  title: string;
  description: string;
  skillIds: string[]; // Skills to learn/improve
  targetProficiencyLevel: 1 | 2 | 3 | 4 | 5;
  
  // Timeline
  startDate: Date;
  targetDate?: Date;
  estimatedDuration: number; // weeks
  
  // Goal Type
  type: 'certification' | 'project_completion' | 'skill_improvement' | 'career_transition' | 'interview_prep';
  priority: 'high' | 'medium' | 'low';
  
  // Progress Tracking
  status: 'not_started' | 'in_progress' | 'completed' | 'paused' | 'cancelled';
  progressPercentage: number; // 0-100
  milestones: Milestone[];
  
  // Mentorship Context
  requiresMentor: boolean;
  preferredMentorshipType: 'one_time' | 'short_term' | 'long_term';
  
  createdAt: Date;
  updatedAt: Date;
}
```

### User Engagement Model
```typescript
interface UserEngagement {
  // Activity Metrics
  profileViews: number;
  profileViewsThisMonth: number;
  lastProfileUpdate: Date;
  
  // Mentorship Activity
  mentorshipStats: {
    sessionsAsMentor: number;
    sessionsAsMentee: number;
    averageRatingAsMentor?: number;
    averageRatingAsMentee?: number;
    totalMenteesHelped: number;
    totalMentorsWorkedWith: number;
    successfulMentorships: number; // Completed with positive outcome
  };
  
  // Platform Engagement
  platformActivity: {
    forumPosts: number;
    projectsShared: number;
    communityEventsAttended: number;
    helpfulVotes: number;
    contributionScore: number; // Overall community contribution
  };
  
  // Learning Progress
  learningMetrics: {
    skillsLearned: number;
    certificationsEarned: string[];
    projectsCompleted: number;
    learningStreakDays: number;
    lastLearningActivity: Date;
  };
  
  // Achievements
  badges: Badge[];
  achievements: Achievement[];
  
  // Preferences
  notificationPreferences: NotificationSettings;
}
```

### Privacy Settings Model
```typescript
interface PrivacySettings {
  // Profile Visibility
  profileVisibility: 'public' | 'community_only' | 'mentors_only' | 'private';
  showRealName: boolean;
  showLocation: boolean;
  showCompany: boolean;
  showExperience: boolean;
  
  // Contact Information
  showEmail: boolean;
  allowDirectMessages: boolean;
  allowMentorshipRequests: boolean;
  
  // Activity Visibility
  showSkills: boolean;
  showProjects: boolean;
  showAchievements: boolean;
  showMentorshipHistory: boolean;
  
  // Search & Discovery
  appearInSearch: boolean;
  appearInMentorSuggestions: boolean;
  allowSkillBasedMatching: boolean;
  
  // Data Usage
  allowAnalytics: boolean;
  allowPersonalization: boolean;
  allowMarketingEmails: boolean;
  
  // Communication
  emailNotifications: boolean;
  pushNotifications: boolean;
  weeklyDigest: boolean;
}
```

## 🔐 Authentication & Authorization

### Authentication Methods
```typescript
interface AuthProvider {
  provider: 'email' | 'google' | 'github' | 'linkedin' | 'facebook';
  providerId: string;
  email: string;
  isVerified: boolean;
  connectedAt: Date;
}

interface UserAuth {
  userId: string;
  providers: AuthProvider[];
  passwordHash?: string; // Only for email auth
  twoFactorEnabled: boolean;
  lastLoginAt: Date;
  loginAttempts: number;
  lockedUntil?: Date;
}
```

### Permission System
```typescript
interface Permission {
  id: string;
  name: string;
  description: string;
  resource: string; // e.g., 'profile', 'mentorship', 'admin'
  action: string; // e.g., 'read', 'write', 'delete'
}

interface UserPermissions {
  userId: string;
  permissions: string[]; // Permission IDs
  roles: string[]; // Role names
  customPermissions?: Permission[]; // User-specific permissions
}
```

## 🔌 API Specifications

### User Management Endpoints

#### POST /api/users/register
Register a new user account.

**Request Body:**
```typescript
{
  email: string;
  password?: string; // Optional if using OAuth
  displayName: string;
  firstName: string;
  lastName: string;
  timezone: string;
  authProvider?: 'email' | 'google' | 'github' | 'linkedin';
  agreedToTerms: boolean;
  agreedToPrivacy: boolean;
}
```

**Response:**
```typescript
{
  user: User;
  token: string;
  refreshToken: string;
  onboardingRequired: boolean;
}
```

#### GET /api/users/profile
Get current user's profile.

**Response:**
```typescript
{
  user: User;
  completionStatus: {
    profileCompleteness: number;
    missingFields: string[];
    recommendations: string[];
  };
}
```

#### PUT /api/users/profile
Update user profile.

**Request Body:**
```typescript
{
  displayName?: string;
  bio?: string;
  location?: Partial<Location>;
  professional?: Partial<ProfessionalInfo>;
  privacy?: Partial<PrivacySettings>;
}
```

#### POST /api/users/skills
Add or update user skills.

**Request Body:**
```typescript
{
  skills: {
    skillId: string;
    proficiencyLevel: 1 | 2 | 3 | 4 | 5;
    yearsOfExperience: number;
    isLearning: boolean;
    canMentor: boolean;
    verificationMethod?: string;
  }[];
}
```

#### GET /api/users/skills/suggestions
Get skill suggestions based on user profile and industry trends.

**Query Parameters:**
- `category`: Skill category filter
- `limit`: Number of suggestions (default: 10)

**Response:**
```typescript
{
  suggestions: {
    skill: Skill;
    relevanceScore: number;
    reason: string;
    trending: boolean;
  }[];
}
```

### Mentorship Configuration Endpoints

#### PUT /api/users/mentorship-config
Update mentorship configuration.

**Request Body:**
```typescript
{
  isAvailableAsMentor?: boolean;
  isLookingForMentor?: boolean;
  mentorSettings?: Partial<MentorSettings>;
  menteeSettings?: Partial<MenteeSettings>;
  communication?: Partial<CommunicationPreferences>;
}
```

#### POST /api/users/learning-goals
Create a new learning goal.

**Request Body:**
```typescript
{
  title: string;
  description: string;
  skillIds: string[];
  targetProficiencyLevel: number;
  targetDate?: Date;
  type: string;
  priority: 'high' | 'medium' | 'low';
}
```

### Search & Discovery Endpoints

#### GET /api/users/search
Search for users with filters.

**Query Parameters:**
- `q`: Search query (name, skills, bio)
- `skills[]`: Array of skill names
- `role`: 'mentor' | 'mentee' | 'both'
- `experienceLevel`: Experience level filter
- `location`: Location filter
- `timezone`: Timezone filter
- `availability`: Availability filter
- `page`: Page number
- `limit`: Results per page

**Response:**
```typescript
{
  users: UserSearchResult[];
  totalCount: number;
  filters: {
    skills: { name: string; count: number }[];
    locations: { name: string; count: number }[];
    experienceLevels: { level: string; count: number }[];
  };
}
```

#### GET /api/users/:id/public-profile
Get public profile of a user.

**Response:**
```typescript
{
  user: PublicUserProfile;
  canContact: boolean;
  mutualConnections?: number;
  sharedSkills?: string[];
}
```

## 🎨 User Interface Components

### User Profile Components

#### ProfileCard Component
```typescript
interface ProfileCardProps {
  user: User;
  variant: 'compact' | 'detailed' | 'search-result';
  showActions?: boolean;
  currentUserId?: string;
}
```

**Features:**
- Avatar with online status indicator
- Name, role, and location display
- Top skills with proficiency indicators
- Mentorship availability badges
- Quick action buttons (Message, Request Mentorship)

#### SkillsSection Component
```typescript
interface SkillsSectionProps {
  skills: UserSkill[];
  isEditable: boolean;
  onSkillUpdate?: (skill: UserSkill) => void;
  onSkillAdd?: () => void;
}
```

**Features:**
- Categorized skill display
- Proficiency level visualization (stars/bars)
- Mentor/mentee indicators for each skill
- Skill verification badges
- Add/edit skill functionality

#### MentorshipConfigPanel Component
```typescript
interface MentorshipConfigPanelProps {
  config: MentorshipConfiguration;
  onConfigUpdate: (config: Partial<MentorshipConfiguration>) => void;
  userSkills: UserSkill[];
}
```

**Features:**
- Toggle mentor/mentee availability
- Skill-specific mentorship preferences
- Availability calendar integration
- Communication preferences setup
- Matching criteria configuration

### Onboarding Components

#### SkillAssessmentWizard Component
```typescript
interface SkillAssessmentWizardProps {
  onComplete: (skills: UserSkill[]) => void;
  suggestedSkills?: Skill[];
  allowSkipSteps?: boolean;
}
```

**Features:**
- Multi-step skill selection process
- Proficiency self-assessment
- Experience validation questions
- Mentorship interest indicators
- Progress tracking

#### MentorshipPreferencesSetup Component
```typescript
interface MentorshipPreferencesSetupProps {
  userSkills: UserSkill[];
  onComplete: (preferences: MentorshipConfiguration) => void;
}
```

**Features:**
- Role preference selection (mentor/mentee/both)
- Availability scheduling interface
- Communication method selection
- Goal setting for mentees
- Mentoring capacity for mentors

## 🚀 User Onboarding Flow

### Registration Process
1. **Account Creation**
   - Email/OAuth registration
   - Basic profile information
   - Terms and privacy agreement

2. **Profile Setup**
   - Personal and professional details
   - Location and timezone configuration
   - Profile picture upload

3. **Skill Assessment**
   - Skill discovery and selection
   - Proficiency level assessment
   - Experience validation
   - Learning/teaching interests

4. **Mentorship Configuration**
   - Role preference selection
   - Availability setup
   - Communication preferences
   - Goal setting (for mentees)
   - Mentoring capacity (for mentors)

5. **Privacy & Preferences**
   - Profile visibility settings
   - Notification preferences
   - Matching criteria setup

6. **Welcome & Next Steps**
   - Platform tour
   - First mentor/mentee suggestions
   - Community guidelines
   - Getting started resources

### Profile Completion Incentives
- **Completion Percentage**: Visual progress indicator
- **Feature Unlocks**: Access to advanced features at certain completion levels
- **Matching Quality**: Better matches with more complete profiles
- **Community Recognition**: Badges for profile completeness
- **Personalized Suggestions**: Better recommendations with more data

## 📊 User Analytics & Insights

### Profile Analytics Dashboard
```typescript
interface UserAnalytics {
  profileMetrics: {
    views: number;
    viewsThisMonth: number;
    profileCompleteness: number;
    skillsCount: number;
    mentorshipRequests: number;
  };
  
  mentorshipMetrics: {
    sessionsCompleted: number;
    averageRating: number;
    responseRate: number;
    successfulMentorships: number;
  };
  
  learningProgress: {
    goalsCompleted: number;
    skillsImproved: number;
    certificationsEarned: number;
    learningStreak: number;
  };
  
  communityEngagement: {
    forumParticipation: number;
    projectsShared: number;
    helpfulVotes: number;
    eventsAttended: number;
  };
}
```

### Skill Development Tracking
- **Skill Progress Timeline**: Visual representation of skill development over time
- **Learning Path Recommendations**: Suggested next skills based on current expertise
- **Market Demand Insights**: How user's skills align with job market trends
- **Peer Comparison**: Anonymous comparison with similar developers

## 🔒 Security & Privacy Features

### Data Protection
- **Encryption**: All sensitive data encrypted at rest and in transit
- **Data Minimization**: Only collect necessary information
- **Retention Policies**: Automatic data cleanup after specified periods
- **Export/Delete**: User-initiated data export and account deletion

### Privacy Controls
- **Granular Visibility**: Fine-grained control over profile information visibility
- **Anonymous Browsing**: Option to browse profiles without leaving traces
- **Blocking/Reporting**: Tools to block users and report inappropriate behavior
- **Data Usage Transparency**: Clear information about how data is used

### Security Measures
- **Two-Factor Authentication**: Optional 2FA for enhanced security
- **Session Management**: Secure session handling with automatic timeouts
- **Rate Limiting**: API rate limiting to prevent abuse
- **Audit Logging**: Comprehensive logging of user actions for security monitoring

## 🌐 Localization & Cultural Features

### Nepal-Specific Features
- **Local Time Zones**: Proper handling of Nepal Standard Time (GMT+5:45)
- **Cultural Holidays**: Respect for local holidays in availability scheduling
- **Language Support**: Interface in English, Nepali, and Hindi
- **Local Community**: Integration with Nepal tech community events and groups

### Regional Customization
- **Skill Relevance**: Highlight skills relevant to Nepal's tech market
- **Local Mentors**: Prioritize local mentors for in-person mentorship opportunities
- **Cultural Context**: Consider cultural factors in mentor-mentee matching
- **Local Resources**: Integration with Nepal-specific learning resources and job boards

## 📈 Success Metrics

### User Engagement Metrics
- **Registration Completion Rate**: % of users who complete full onboarding
- **Profile Completeness**: Average profile completion percentage
- **Active User Rate**: % of users active in the last 30 days
- **Feature Adoption**: Usage rates of different platform features

### Mentorship Effectiveness Metrics
- **Mentor-Mentee Match Rate**: % of users successfully matched
- **Session Completion Rate**: % of scheduled sessions that are completed
- **User Satisfaction**: Average ratings and feedback scores
- **Skill Development**: Measurable improvement in user skills over time

### Platform Growth Metrics
- **User Acquisition**: New user registration rates
- **User Retention**: % of users returning after 30, 60, 90 days
- **Community Growth**: Growth in active mentorship relationships
- **Skill Diversity**: Variety of skills represented in the community

## 🔄 Future Enhancements

### Advanced Features
- **AI-Powered Skill Assessment**: Automated skill level detection through code analysis
- **Dynamic Role Adjustment**: Automatic role updates based on skill progression
- **Peer Validation**: Community-driven skill verification system
- **Mentorship Path Planning**: AI-suggested learning and mentoring paths

### Integration Opportunities
- **GitHub Integration**: Automatic skill detection from repositories
- **LinkedIn Sync**: Professional profile synchronization
- **Learning Platform Integration**: Connect with online course providers
- **Job Board Integration**: Match skills with job opportunities

### Community Features
- **Skill-Based Groups**: Communities organized around specific technologies
- **Mentorship Circles**: Group mentoring sessions and peer learning
- **Expert Recognition**: Special recognition for highly skilled community members
- **Knowledge Sharing**: Platform for sharing tutorials, articles, and resources

---

This comprehensive Users Module specification provides the foundation for a flexible, skill-based mentorship system that empowers Nepal's developer community to learn from each other while maintaining strong privacy and security standards.