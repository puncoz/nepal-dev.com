'use client';

import React from 'react';
import { CheckCircle, Clock, Target, TrendingUp, Award, Star, BookOpen } from 'lucide-react';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';

interface Goal {
  id: string;
  title: string;
  progress: number;
  target: number;
  deadline: string;
  status: 'in_progress' | 'completed' | 'pending';
}

interface Session {
  id: string;
  mentorName: string;
  topic: string;
  date: string;
  duration: number;
  status: 'completed' | 'scheduled' | 'cancelled';
  rating?: number;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  earnedDate: string;
  icon: string;
}

interface ProgressTrackerProps {
  goals?: Goal[];
  sessions?: Session[];
  achievements?: Achievement[];
}

const defaultGoals: Goal[] = [
  {
    id: '1',
    title: 'Master React Hooks',
    progress: 75,
    target: 100,
    deadline: '2024-02-15',
    status: 'in_progress'
  },
  {
    id: '2', 
    title: 'Learn TypeScript',
    progress: 45,
    target: 100,
    deadline: '2024-03-01',
    status: 'in_progress'
  },
  {
    id: '3',
    title: 'Build Full-Stack Project',
    progress: 20,
    target: 100,
    deadline: '2024-04-01',
    status: 'in_progress'
  }
];

const defaultSessions: Session[] = [
  {
    id: '1',
    mentorName: 'Sarah Chen',
    topic: 'React Best Practices',
    date: '2024-01-20',
    duration: 60,
    status: 'completed',
    rating: 5
  },
  {
    id: '2',
    mentorName: 'Raj Patel',
    topic: 'TypeScript Fundamentals',
    date: '2024-01-25',
    duration: 90,
    status: 'completed',
    rating: 4
  }
];

const defaultAchievements: Achievement[] = [
  {
    id: '1',
    title: 'First Session Complete',
    description: 'Completed your first mentorship session',
    earnedDate: '2024-01-20',
    icon: '🎯'
  },
  {
    id: '2',
    title: 'Goal Setter',
    description: 'Set your first learning goal',
    earnedDate: '2024-01-15',
    icon: '🏆'
  },
  {
    id: '3',
    title: 'Consistent Learner',
    description: 'Completed 5 mentorship sessions',
    earnedDate: '2024-01-25',
    icon: '📚'
  }
];

const ProgressTracker: React.FC<ProgressTrackerProps> = ({
  goals = defaultGoals,
  sessions = defaultSessions,
  achievements = defaultAchievements
}) => {
  const completedSessions = (sessions || []).filter(s => s.status === 'completed').length;
  const totalHours = (sessions || []).reduce((acc, s) => acc + (s.duration || 0), 0);
  const ratedSessions = (sessions || []).filter(s => s.rating);
  const averageRating = ratedSessions.length > 0 
    ? ratedSessions.reduce((acc, s) => acc + (s.rating || 0), 0) / ratedSessions.length
    : 0;

  const getStatusIcon = (status: Goal['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'in_progress':
        return <Clock className="w-5 h-5 text-blue-500" />;
      case 'pending':
        return <Target className="w-5 h-5 text-gray-400" />;
    }
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'from-green-500 to-emerald-500';
    if (progress >= 60) return 'from-blue-500 to-cyan-500';
    if (progress >= 40) return 'from-yellow-500 to-orange-500';
    return 'from-red-500 to-pink-500';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const calculateDaysRemaining = (deadline: string) => {
    const today = new Date();
    const target = new Date(deadline);
    const diffTime = target.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center">
          <TrendingUp className="w-6 h-6 mr-2 text-purple-500" />
          Progress Tracker
        </h2>
        <Badge className="bg-purple-100 text-purple-800">
          {(goals || []).length} Active Goal{(goals || []).length !== 1 ? 's' : ''}
        </Badge>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Sessions</p>
              <p className="text-2xl font-bold text-blue-600">{completedSessions}</p>
            </div>
            <BookOpen className="w-8 h-8 text-blue-500" />
          </div>
        </Card>
        
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Hours</p>
              <p className="text-2xl font-bold text-green-600">{Math.round(totalHours / 60)}</p>
            </div>
            <Clock className="w-8 h-8 text-green-500" />
          </div>
        </Card>
        
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Avg Rating</p>
              <p className="text-2xl font-bold text-yellow-600">{averageRating.toFixed(1)}</p>
            </div>
            <Star className="w-8 h-8 text-yellow-500" />
          </div>
        </Card>
        
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Achievements</p>
              <p className="text-2xl font-bold text-purple-600">{(achievements || []).length}</p>
            </div>
            <Award className="w-8 h-8 text-purple-500" />
          </div>
        </Card>
      </div>

      {/* Learning Goals */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <Target className="w-5 h-5 mr-2 text-blue-500" />
          Learning Goals
        </h3>
        
        <div className="space-y-4">
          {(goals || []).map((goal) => {
            const daysRemaining = calculateDaysRemaining(goal.deadline);
            const progressPercentage = (goal.progress / goal.target) * 100;
            
            return (
              <div key={goal.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      {getStatusIcon(goal.status)}
                      <h4 className="font-medium text-gray-800">{goal.title}</h4>
                    </div>
                    <p className="text-sm text-gray-600">
                      Due: {formatDate(goal.deadline)} 
                      {daysRemaining > 0 ? (
                        <span className="text-blue-600">({daysRemaining} days left)</span>
                      ) : (
                        <span className="text-red-600">(Overdue)</span>
                      )}
                    </p>
                  </div>
                  <Badge 
                    className={`${
                      goal.status === 'completed' ? 'bg-green-100 text-green-800' :
                      goal.status === 'in_progress' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {Math.round(progressPercentage)}%
                  </Badge>
                </div>
                
                {/* Progress Bar */}
                <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                  <div 
                    className={`h-2 rounded-full bg-gradient-to-r ${getProgressColor(progressPercentage)}`}
                    style={{ width: `${Math.min(progressPercentage, 100)}%` }}
                  />
                </div>
                
                <div className="flex justify-between text-xs text-gray-500">
                  <span>{goal.progress} / {goal.target} completed</span>
                  <span>{Math.round(progressPercentage)}%</span>
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Recent Achievements */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <Award className="w-5 h-5 mr-2 text-purple-500" />
          Recent Achievements
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {(achievements || []).map((achievement) => (
            <div key={achievement.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
              <span className="text-2xl">{achievement.icon}</span>
              <div className="flex-1">
                <h4 className="font-medium text-gray-800 text-sm">{achievement.title}</h4>
                <p className="text-xs text-gray-600 mb-1">{achievement.description}</p>
                <p className="text-xs text-gray-500">{formatDate(achievement.earnedDate)}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3">
        <Button className="bg-blue-600 hover:bg-blue-700 text-white">
          Set New Goal
        </Button>
        <Button variant="outline">
          View All Sessions
        </Button>
        <Button variant="outline">
          Download Progress Report
        </Button>
      </div>
    </div>
  );
};

export default ProgressTracker;