'use client';

import { FunctionComponent } from 'react';
import { cn } from '@/lib/utils';
import { User } from 'lucide-react';

interface AvatarProps {
  src?: string;
  alt?: string;
  name?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  fallbackColor?: 'blue' | 'green' | 'purple' | 'orange' | 'red';
}

const Avatar: FunctionComponent<AvatarProps> = ({
  src,
  alt,
  name,
  size = 'md',
  className,
  fallbackColor = 'blue'
}) => {
  const sizeClasses = {
    xs: 'w-6 h-6 text-xs',
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-base',
    lg: 'w-12 h-12 text-lg',
    xl: 'w-16 h-16 text-xl'
  };

  const iconSizes = {
    xs: 'w-3 h-3',
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
    xl: 'w-8 h-8'
  };

  const fallbackColors = {
    blue: 'bg-gradient-to-r from-blue-500 to-blue-600',
    green: 'bg-gradient-to-r from-green-500 to-green-600',
    purple: 'bg-gradient-to-r from-purple-500 to-purple-600',
    orange: 'bg-gradient-to-r from-orange-500 to-orange-600',
    red: 'bg-gradient-to-r from-red-500 to-red-600'
  };

  const getInitials = (name: string): string => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  if (src) {
    return (
      <img
        src={src}
        alt={alt || name || 'Avatar'}
        className={cn(
          'rounded-full object-cover',
          sizeClasses[size],
          className
        )}
      />
    );
  }

  return (
    <div
      className={cn(
        'rounded-full flex items-center justify-center text-white font-medium',
        sizeClasses[size],
        fallbackColors[fallbackColor],
        className
      )}
    >
      {name ? (
        <span>{getInitials(name)}</span>
      ) : (
        <User className={iconSizes[size]} />
      )}
    </div>
  );
};

const AvatarImage: FunctionComponent<{ src?: string; alt?: string; className?: string }> = ({ src, alt, className }) => {
  if (!src) return null;
  return (
    <img
      src={src}
      alt={alt || 'Avatar'}
      className={cn('rounded-full object-cover w-full h-full', className)}
    />
  );
};

const AvatarFallback: FunctionComponent<{ children: React.ReactNode; className?: string }> = ({ children, className }) => {
  return (
    <div className={cn('rounded-full flex items-center justify-center text-white font-medium bg-gradient-to-r from-blue-500 to-blue-600 w-full h-full', className)}>
      {children}
    </div>
  );
};

export default Avatar;
export { AvatarImage, AvatarFallback };