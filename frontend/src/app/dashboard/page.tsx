'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { USER_ROLES } from '@/lib/constants';

export default function DashboardRedirect() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      const routes: Record<string, string> = {
        [USER_ROLES.ADMIN]: '/dashboard/admin',
        [USER_ROLES.DOCTOR]: '/dashboard/doctor',
        [USER_ROLES.PATIENT]: '/dashboard/patient',
        [USER_ROLES.RECEPTION]: '/dashboard/reception',
        [USER_ROLES.PHARMACIST]: '/dashboard/pharmacy',
        [USER_ROLES.LAB_TECHNICIAN]: '/dashboard/laboratory',
      };
      router.push(routes[user.role] || '/dashboard/patient');
    }
  }, [user, router]);

  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="text-center">
        <div className="w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center mx-auto mb-4">
          <div className="h-6 w-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
        <p className="text-gray-500">Redirecting to your dashboard...</p>
      </div>
    </div>
  );
}
