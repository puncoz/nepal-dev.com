'use client';

import { FunctionComponent, ReactNode, useState, createContext, useContext } from 'react';
import { cn } from '@/lib/utils';

interface CollapsibleContextType {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const CollapsibleContext = createContext<CollapsibleContextType | undefined>(undefined);

const useCollapsible = () => {
  const context = useContext(CollapsibleContext);
  if (!context) {
    throw new Error('useCollapsible must be used within a Collapsible');
  }
  return context;
};

interface CollapsibleProps {
  children: ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
}

const Collapsible: FunctionComponent<CollapsibleProps> = ({
  children,
  open: controlledOpen,
  onOpenChange,
  className
}) => {
  const [internalOpen, setInternalOpen] = useState(false);
  const open = controlledOpen !== undefined ? controlledOpen : internalOpen;
  
  const setOpen = (newOpen: boolean) => {
    if (controlledOpen === undefined) {
      setInternalOpen(newOpen);
    }
    onOpenChange?.(newOpen);
  };

  return (
    <CollapsibleContext.Provider value={{ open, setOpen }}>
      <div className={cn('', className)}>
        {children}
      </div>
    </CollapsibleContext.Provider>
  );
};

interface CollapsibleTriggerProps {
  children: ReactNode;
  className?: string;
  asChild?: boolean;
}

const CollapsibleTrigger: FunctionComponent<CollapsibleTriggerProps> = ({
  children,
  className,
  asChild = false
}) => {
  const { open, setOpen } = useCollapsible();
  
  const handleClick = () => {
    setOpen(!open);
  };

  if (asChild) {
    return (
      <div onClick={handleClick} className={className}>
        {children}
      </div>
    );
  }

  return (
    <button
      onClick={handleClick}
      className={cn(
        'flex items-center justify-between w-full p-2 text-left',
        'hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500',
        className
      )}
    >
      {children}
    </button>
  );
};

interface CollapsibleContentProps {
  children: ReactNode;
  className?: string;
}

const CollapsibleContent: FunctionComponent<CollapsibleContentProps> = ({
  children,
  className
}) => {
  const { open } = useCollapsible();

  if (!open) return null;

  return (
    <div className={cn('overflow-hidden', className)}>
      {children}
    </div>
  );
};

export { Collapsible, CollapsibleTrigger, CollapsibleContent };