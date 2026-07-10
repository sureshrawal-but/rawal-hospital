'use client';

import { forwardRef, ButtonHTMLAttributes } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const variants = {
  primary: 'bg-primary-500 text-white hover:bg-primary-600 shadow-lg shadow-primary-500/20 hover:shadow-primary-500/30',
  secondary: 'bg-dark-600 text-gray-200 hover:bg-dark-700 shadow-md border border-gray-700',
  outline: 'border-2 border-primary-500/50 text-primary-400 hover:bg-primary-500/10 hover:border-primary-400',
  ghost: 'text-gray-300 hover:text-white hover:bg-dark-600',
  danger: 'bg-red-600 text-white hover:bg-red-700 shadow-md',
  success: 'bg-amber-500 text-white hover:bg-amber-600 shadow-md shadow-amber-500/20',
};

const sizes = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-7 py-3 text-base',
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading, leftIcon, rightIcon, children, disabled, ...props }, ref) => {
    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: disabled ? 1 : 1.02 }}
        whileTap={{ scale: disabled ? 1 : 0.98 }}
        className={cn(
          'inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:ring-offset-2 focus:ring-offset-dark disabled:opacity-50 disabled:cursor-not-allowed',
          variants[variant],
          sizes[size],
          className
        )}
        disabled={disabled || isLoading}
        {...(props as any)}
      >
        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : leftIcon ? (
          leftIcon
        ) : null}
        {children}
        {!isLoading && rightIcon}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';
export default Button;
