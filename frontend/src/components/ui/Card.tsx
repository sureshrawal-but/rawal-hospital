'use client';

import { forwardRef, HTMLAttributes } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'glass' | 'bordered' | 'elevated';
  hover?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

const variantStyles = {
  default: 'bg-dark-700 border border-gray-700/50 shadow-lg',
  glass: 'bg-dark-700/70 backdrop-blur-xl border border-gray-700/30 shadow-lg',
  bordered: 'bg-dark-700 border-2 border-primary-500/20',
  elevated: 'bg-dark-600 shadow-xl border border-gray-700/30',
};

const paddingStyles = {
  none: '',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
};

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'default', hover = true, padding = 'md', children, ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        whileHover={hover ? { y: -4, transition: { duration: 0.2 } } : undefined}
        className={cn(
          'rounded-2xl transition-all duration-300',
          variantStyles[variant],
          paddingStyles[padding],
          hover && 'cursor-default',
          className
        )}
        {...(props as any)}
      >
        {children}
      </motion.div>
    );
  }
);

Card.displayName = 'Card';
export default Card;
