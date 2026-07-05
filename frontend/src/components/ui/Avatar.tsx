'use client';

import Image from 'next/image';
import { cn, getInitials } from '@/lib/utils';

interface AvatarProps {
  src?: string | null;
  name?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  status?: 'online' | 'offline' | 'busy' | 'away';
}

const sizeClasses = {
  sm: 'h-8 w-8 text-xs',
  md: 'h-10 w-10 text-sm',
  lg: 'h-14 w-14 text-base',
  xl: 'h-20 w-20 text-xl',
};

const statusColors = {
  online: 'bg-accent',
  offline: 'bg-gray-400',
  busy: 'bg-red-500',
  away: 'bg-yellow-500',
};

export default function Avatar({ src, name = 'User', size = 'md', className, status }: AvatarProps) {
  return (
    <div className={cn('relative inline-flex shrink-0', className)}>
      {src ? (
        <Image
          src={src}
          alt={name}
          width={size === 'sm' ? 32 : size === 'md' ? 40 : size === 'lg' ? 56 : 80}
          height={size === 'sm' ? 32 : size === 'md' ? 40 : size === 'lg' ? 56 : 80}
          className={cn('rounded-full object-cover', sizeClasses[size])}
        />
      ) : (
        <div
          className={cn(
            'rounded-full bg-primary-100 text-primary font-semibold flex items-center justify-center',
            sizeClasses[size]
          )}
        >
          {getInitials(name)}
        </div>
      )}
      {status && (
        <span
          className={cn(
            'absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white',
            statusColors[status]
          )}
        />
      )}
    </div>
  );
}
