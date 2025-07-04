import React from 'react';
import { cn } from '../../utils/ui/className';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  variant?: 'default' | 'elevated' | 'outlined';
}

const Card: React.FC<CardProps> = ({
  children,
  className,
  padding = 'md',
  variant = 'default',
}) => {
  const baseClasses =
    'bg-white rounded-xl shadow-soft border border-neutral-200/50 hover:shadow-medium transition-all duration-300';

  const variants = {
    default: '',
    elevated: 'shadow-large hover:shadow-elegant',
    outlined: 'border-2 border-neutral-300',
  };

  const paddings = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  return (
    <div
      className={cn(
        baseClasses,
        variants[variant],
        paddings[padding],
        className
      )}
    >
      {children}
    </div>
  );
};

export default Card;
