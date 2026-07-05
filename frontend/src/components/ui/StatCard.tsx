'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
    label?: string;
  };
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger';
  className?: string;
  onClick?: () => void;
}

const variantStyles = {
  default: 'bg-white',
  primary: 'bg-gradient-to-br from-primary to-primary-700 text-white',
  success: 'bg-gradient-to-br from-accent to-accent-700 text-white',
  warning: 'bg-gradient-to-br from-yellow-500 to-yellow-600 text-white',
  danger: 'bg-gradient-to-br from-red-500 to-red-600 text-white',
};

export default function StatCard({
  title,
  value,
  icon,
  trend,
  variant = 'default',
  className,
  onClick,
}: StatCardProps) {
  const isGradient = variant !== 'default';

  return (
    <motion.div
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className={cn(
        'rounded-2xl p-6 shadow-sm border transition-all duration-300',
        variantStyles[variant],
        isGradient ? 'border-transparent' : 'border-gray-100',
        onClick && 'cursor-pointer',
        className
      )}
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-4">
        <div className={cn(
          'p-3 rounded-xl',
          isGradient ? 'bg-white/20' : 'bg-primary-50'
        )}>
          <div className={cn(isGradient ? 'text-white' : 'text-primary')}>
            {icon}
          </div>
        </div>
      </div>
      <div>
        <p className={cn(
          'text-sm font-medium mb-1',
          isGradient ? 'text-white/80' : 'text-gray-500'
        )}>
          {title}
        </p>
        <p className={cn(
          'text-2xl font-bold font-heading',
          isGradient ? 'text-white' : 'text-gray-900'
        )}>
          {value}
        </p>
        {trend && (
          <div className="flex items-center gap-1 mt-2">
            {trend.isPositive ? (
              <TrendingUp className={cn('h-4 w-4', isGradient ? 'text-white/80' : 'text-accent')} />
            ) : (
              <TrendingDown className={cn('h-4 w-4', isGradient ? 'text-white/80' : 'text-red-500')} />
            )}
            <span className={cn(
              'text-sm font-medium',
              isGradient ? 'text-white/80' : trend.isPositive ? 'text-accent' : 'text-red-500'
            )}>
              {trend.value}%
            </span>
            {trend.label && (
              <span className={cn('text-xs', isGradient ? 'text-white/60' : 'text-gray-400')}>
                {trend.label}
              </span>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}
