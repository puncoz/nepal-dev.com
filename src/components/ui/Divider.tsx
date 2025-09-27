'use client';

import { cn } from '@/lib/utils';

interface DividerProps {
  text?: string;
  className?: string;
}

const Divider = ({ text = 'OR', className }: DividerProps) => {
  return (
    <div className={cn('relative my-6', className)}>
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-gray-300"></div>
      </div>
      <div className="relative flex justify-center text-sm">
        <span className="px-2 bg-white text-gray-500">{text}</span>
      </div>
    </div>
  );
};

export default Divider;