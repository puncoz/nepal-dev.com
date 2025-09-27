'use client';

import { FunctionComponent } from 'react';
import { ChevronRight, Home } from 'lucide-react';
import Link from 'next/link';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface MentorshipBreadcrumbProps {
  items: BreadcrumbItem[];
}

const MentorshipBreadcrumb: FunctionComponent<MentorshipBreadcrumbProps> = ({ items }) => {
  return (
    <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
      <Link href="/dashboard" className="flex items-center hover:text-blue-600 transition-colors">
        <Home className="w-4 h-4" />
      </Link>
      
      <ChevronRight className="w-4 h-4 text-gray-400" />
      
      <Link href="/mentorship" className="hover:text-blue-600 transition-colors">
        Mentorship
      </Link>
      
      {items.map((item, index) => (
        <div key={index} className="flex items-center space-x-2">
          <ChevronRight className="w-4 h-4 text-gray-400" />
          {item.href ? (
            <Link href={item.href} className="hover:text-blue-600 transition-colors">
              {item.label}
            </Link>
          ) : (
            <span className="text-gray-900 font-medium">{item.label}</span>
          )}
        </div>
      ))}
    </nav>
  );
};

export default MentorshipBreadcrumb;