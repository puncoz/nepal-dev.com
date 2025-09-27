'use client';

import { FunctionComponent } from 'react';
import { 
  MessageCircle, 
  Heart, 
  UserPlus, 
  Briefcase, 
  Code, 
  Award, 
  Calendar,
  ExternalLink
} from 'lucide-react';

interface ActivityItem {
  id: number;
  type: 'message' | 'like' | 'connection' | 'job' | 'project' | 'achievement' | 'event';
  title: string;
  description: string;
  time: string;
  user?: {
    name: string;
    avatar?: string;
  };
  actionable?: boolean;
  href?: string;
}

interface ActivityItemProps {
  activity: ActivityItem;
}

const ActivityItemComponent: FunctionComponent<ActivityItemProps> = ({ activity }) => {
  const getIcon = () => {
    const iconClass = "w-5 h-5";
    switch (activity.type) {
      case 'message':
        return <MessageCircle className={`${iconClass} text-blue-600`} />;
      case 'like':
        return <Heart className={`${iconClass} text-red-500`} />;
      case 'connection':
        return <UserPlus className={`${iconClass} text-green-600`} />;
      case 'job':
        return <Briefcase className={`${iconClass} text-purple-600`} />;
      case 'project':
        return <Code className={`${iconClass} text-orange-600`} />;
      case 'achievement':
        return <Award className={`${iconClass} text-yellow-600`} />;
      case 'event':
        return <Calendar className={`${iconClass} text-indigo-600`} />;
      default:
        return <MessageCircle className={`${iconClass} text-gray-600`} />;
    }
  };

  const getBgColor = () => {
    switch (activity.type) {
      case 'message':
        return 'bg-blue-50';
      case 'like':
        return 'bg-red-50';
      case 'connection':
        return 'bg-green-50';
      case 'job':
        return 'bg-purple-50';
      case 'project':
        return 'bg-orange-50';
      case 'achievement':
        return 'bg-yellow-50';
      case 'event':
        return 'bg-indigo-50';
      default:
        return 'bg-gray-50';
    }
  };

  const content = (
    <div className={`flex items-start space-x-3 p-4 rounded-lg hover:bg-gray-50 transition-colors ${
      activity.actionable ? 'cursor-pointer' : ''
    }`}>
      {/* Icon */}
      <div className={`p-2 rounded-full ${getBgColor()}`}>
        {getIcon()}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h4 className="text-sm font-medium text-gray-900 mb-1">
              {activity.title}
            </h4>
            <p className="text-sm text-gray-600 mb-2">
              {activity.description}
            </p>
            {activity.user && (
              <div className="flex items-center space-x-2 mb-2">
                <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center">
                  <span className="text-xs text-white font-medium">
                    {activity.user.name.charAt(0)}
                  </span>
                </div>
                <span className="text-xs text-gray-500">{activity.user.name}</span>
              </div>
            )}
          </div>
          {activity.actionable && (
            <ExternalLink className="w-4 h-4 text-gray-400 flex-shrink-0" />
          )}
        </div>
        <p className="text-xs text-gray-500">{activity.time}</p>
      </div>
    </div>
  );

  if (activity.actionable && activity.href) {
    return (
      <a href={activity.href} className="block">
        {content}
      </a>
    );
  }

  return content;
};

const RecentActivity: FunctionComponent = () => {
  const activities: ActivityItem[] = [
    {
      id: 1,
      type: 'message',
      title: 'New message from mentor',
      description: 'Sarah Chen sent you feedback on your React project',
      time: '5 minutes ago',
      user: { name: 'Sarah Chen' },
      actionable: true,
      href: '/messages/sarah-chen'
    },
    {
      id: 2,
      type: 'like',
      title: 'Project liked',
      description: 'Your "E-commerce Dashboard" project received 3 new likes',
      time: '1 hour ago',
      actionable: true,
      href: '/projects/ecommerce-dashboard'
    },
    {
      id: 3,
      type: 'connection',
      title: 'New connection request',
      description: 'Raj Patel wants to connect with you',
      time: '2 hours ago',
      user: { name: 'Raj Patel' },
      actionable: true,
      href: '/connections/requests'
    },
    {
      id: 4,
      type: 'job',
      title: 'Job application update',
      description: 'TechCorp Nepal viewed your application for Senior Frontend Developer',
      time: '3 hours ago',
      actionable: true,
      href: '/jobs/applications'
    },
    {
      id: 5,
      type: 'achievement',
      title: 'Skill milestone reached',
      description: 'Congratulations! You\'ve completed 10 React challenges',
      time: '1 day ago',
      actionable: true,
      href: '/profile/achievements'
    },
    {
      id: 6,
      type: 'event',
      title: 'Upcoming event reminder',
      description: 'Nepal Dev Meetup: "Modern Frontend Architecture" starts in 2 days',
      time: '1 day ago',
      actionable: true,
      href: '/events/nepal-dev-meetup-frontend'
    },
    {
      id: 7,
      type: 'project',
      title: 'Project collaboration invite',
      description: 'Maya Gurung invited you to collaborate on "Nepal Tourism App"',
      time: '2 days ago',
      user: { name: 'Maya Gurung' },
      actionable: true,
      href: '/projects/nepal-tourism-app/invite'
    },
    {
      id: 8,
      type: 'message',
      title: 'Community discussion',
      description: 'New replies in "Best practices for React state management"',
      time: '2 days ago',
      actionable: true,
      href: '/community/discussions/react-state-management'
    }
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Recent Activity</h2>
        <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
          View All
        </button>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="divide-y divide-gray-100">
          {activities.map((activity) => (
            <ActivityItemComponent key={activity.id} activity={activity} />
          ))}
        </div>
        
        {/* Load More */}
        <div className="p-4 text-center border-t border-gray-100">
          <button className="text-sm text-gray-600 hover:text-gray-800 font-medium">
            Load more activities
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecentActivity;