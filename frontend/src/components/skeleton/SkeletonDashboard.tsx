'use client';

import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/Loader';

interface SkeletonDashboardProps {
  className?: string;
}

export default function SkeletonDashboard({ className }: SkeletonDashboardProps) {
  return (
    <div className={cn('space-y-6', className)}>
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="bg-white rounded-2xl border border-gray-100 p-6">
            <div className="flex items-start justify-between mb-4">
              <Skeleton variant="circular" className="h-12 w-12" />
            </div>
            <Skeleton className="h-4 w-24 mb-2" />
            <Skeleton className="h-8 w-32 mb-2" />
            <Skeleton className="h-4 w-20" />
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <Skeleton className="h-5 w-40 mb-4" />
          <Skeleton variant="rectangular" className="h-64 w-full" />
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <Skeleton className="h-5 w-40 mb-4" />
          <Skeleton variant="rectangular" className="h-64 w-full" />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100">
          <Skeleton className="h-9 w-64 !rounded-lg" />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/50">
                {Array.from({ length: 5 }).map((_, i) => (
                  <th key={i} className="px-4 py-3">
                    <Skeleton className="h-4 w-24" />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 4 }).map((_, rowIdx) => (
                <tr key={rowIdx} className="border-b border-gray-50">
                  {Array.from({ length: 5 }).map((_, colIdx) => (
                    <td key={colIdx} className="px-4 py-3">
                      <Skeleton className={cn('h-4', colIdx === 0 ? 'w-32' : 'w-20')} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
