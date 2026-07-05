'use client';

import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/Loader';

interface SkeletonCardProps {
  className?: string;
  variant?: 'doctor' | 'department' | 'blog' | 'default';
}

export default function SkeletonCard({ className, variant = 'default' }: SkeletonCardProps) {
  if (variant === 'doctor') {
    return (
      <div className={cn('bg-white rounded-2xl border border-gray-100 overflow-hidden', className)}>
        <Skeleton variant="rectangular" className="h-48 w-full !rounded-none" />
        <div className="p-5 space-y-3">
          <Skeleton className="h-5 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
          <div className="space-y-2 pt-2">
            <Skeleton className="h-3 w-2/3" />
            <Skeleton className="h-3 w-3/4" />
          </div>
          <div className="pt-4 border-t border-gray-100">
            <div className="flex items-center justify-between">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-9 w-28 !rounded-xl" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'department') {
    return (
      <div className={cn('bg-white rounded-2xl border border-gray-100 p-6', className)}>
        <Skeleton variant="circular" className="h-14 w-14 mb-4" />
        <Skeleton className="h-5 w-3/4 mb-2" />
        <Skeleton className="h-4 w-full mb-1" />
        <Skeleton className="h-4 w-2/3 mb-4" />
        <Skeleton className="h-4 w-24" />
      </div>
    );
  }

  if (variant === 'blog') {
    return (
      <div className={cn('bg-white rounded-2xl border border-gray-100 overflow-hidden', className)}>
        <Skeleton variant="rectangular" className="h-48 w-full !rounded-none" />
        <div className="p-5 space-y-3">
          <div className="flex gap-4">
            <Skeleton className="h-3 w-24" />
            <Skeleton className="h-3 w-20" />
          </div>
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
          <div className="pt-4 border-t border-gray-100">
            <div className="flex items-center justify-between">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-20" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={cn('bg-white rounded-2xl border border-gray-100 p-5', className)}>
      <Skeleton variant="circular" className="h-12 w-12 mb-4" />
      <Skeleton className="h-5 w-1/2 mb-2" />
      <Skeleton className="h-4 w-full mb-1" />
      <Skeleton className="h-4 w-3/4" />
    </div>
  );
}
