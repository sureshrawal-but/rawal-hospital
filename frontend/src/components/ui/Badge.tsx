'use client';

import { cn } from '@/lib/utils';

interface BadgeProps {
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'purple' | 'pink';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  className?: string;
  dot?: boolean;
}

const variants = {
  default: 'bg-dark-600 text-gray-300 border border-gray-700',
  primary: 'bg-primary-500/10 text-primary-400 border border-primary-500/20',
  success: 'bg-amber-500/10 text-amber-400 border border-amber-500/20',
  warning: 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20',
  danger: 'bg-red-500/10 text-red-400 border border-red-500/20',
  info: 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20',
  purple: 'bg-purple-500/10 text-purple-400 border border-purple-500/20',
  pink: 'bg-pink-500/10 text-pink-400 border border-pink-500/20',
};

const sizes = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-2.5 py-1 text-xs',
  lg: 'px-3 py-1.5 text-sm',
};

export default function Badge({ variant = 'default', size = 'md', children, className, dot }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-lg font-medium',
        variants[variant],
        sizes[size],
        className
      )}
    >
      {dot && <span className="h-1.5 w-1.5 rounded-full bg-current" />}
      {children}
    </span>
  );
}
