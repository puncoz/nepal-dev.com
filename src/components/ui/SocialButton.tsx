'use client';

import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface SocialButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  provider: 'google' | 'github' | 'linkedin';
  icon?: string;
}

const SocialButton = forwardRef<HTMLButtonElement, SocialButtonProps>(
  ({ className, provider, icon, children, ...props }, ref) => {
    const providerConfig = {
      google: {
        icon: icon || '🔗',
        text: children || 'Continue with Google'
      },
      github: {
        icon: icon || '🐙',
        text: children || 'Continue with GitHub'
      },
      linkedin: {
        icon: icon || '💼',
        text: children || 'Continue with LinkedIn'
      }
    };

    const config = providerConfig[provider];

    return (
      <button
        type="button"
        className={cn(
          "w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200",
          className
        )}
        ref={ref}
        {...props}
      >
        <span className="mr-2">{config.icon}</span>
        {config.text}
      </button>
    );
  }
);

SocialButton.displayName = 'SocialButton';

export default SocialButton;