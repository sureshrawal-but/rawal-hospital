'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/useAuth';
import { useAppStore } from '@/store/appStore';
import { USER_ROLES } from '@/lib/constants';
import {
  LayoutDashboard, Calendar, Users, UserCircle, Stethoscope, Pill, FlaskConical,
  FileText, Settings, CreditCard, Activity, LogOut, Building2,
  ClipboardList, DollarSign, ShoppingCart, X
} from 'lucide-react';
import Avatar from '@/components/ui/Avatar';
import { useMemo } from 'react';

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
}

const roleNavMap: Record<string, NavItem[]> = {
  [USER_ROLES.ADMIN]: [
    { label: 'Dashboard', href: '/dashboard/admin', icon: <LayoutDashboard className="h-5 w-5" /> },
    { label: 'Doctors', href: '/dashboard/admin/doctors', icon: <Stethoscope className="h-5 w-5" /> },
    { label: 'Patients', href: '/dashboard/admin/patients', icon: <Users className="h-5 w-5" /> },
    { label: 'Staff', href: '/dashboard/admin/staff', icon: <UserCircle className="h-5 w-5" /> },
    { label: 'Departments', href: '/dashboard/admin/departments', icon: <Building2 className="h-5 w-5" /> },
    { label: 'Appointments', href: '/dashboard/admin/appointments', icon: <Calendar className="h-5 w-5" /> },
    { label: 'Reports', href: '/dashboard/admin/reports', icon: <FileText className="h-5 w-5" /> },
    { label: 'Settings', href: '/dashboard/admin/settings', icon: <Settings className="h-5 w-5" /> },
  ],
  [USER_ROLES.DOCTOR]: [
    { label: 'Dashboard', href: '/dashboard/doctor', icon: <LayoutDashboard className="h-5 w-5" /> },
    { label: 'Appointments', href: '/dashboard/doctor/appointments', icon: <Calendar className="h-5 w-5" /> },
    { label: 'Patients', href: '/dashboard/doctor/patients', icon: <Users className="h-5 w-5" /> },
    { label: 'Schedule', href: '/dashboard/doctor/schedule', icon: <Activity className="h-5 w-5" /> },
    { label: 'Prescriptions', href: '/dashboard/doctor/prescriptions', icon: <ClipboardList className="h-5 w-5" /> },
  ],
  [USER_ROLES.PATIENT]: [
    { label: 'Dashboard', href: '/dashboard/patient', icon: <LayoutDashboard className="h-5 w-5" /> },
    { label: 'Appointments', href: '/dashboard/patient/appointments', icon: <Calendar className="h-5 w-5" /> },
    { label: 'Medical Records', href: '/dashboard/patient/medical-records', icon: <FileText className="h-5 w-5" /> },
    { label: 'Prescriptions', href: '/dashboard/patient/prescriptions', icon: <ClipboardList className="h-5 w-5" /> },
    { label: 'Lab Reports', href: '/dashboard/patient/lab-reports', icon: <FlaskConical className="h-5 w-5" /> },
    { label: 'Invoices', href: '/dashboard/patient/invoices', icon: <DollarSign className="h-5 w-5" /> },
    { label: 'Profile', href: '/dashboard/patient/profile', icon: <UserCircle className="h-5 w-5" /> },
  ],
  [USER_ROLES.RECEPTION]: [
    { label: 'Dashboard', href: '/dashboard/reception', icon: <LayoutDashboard className="h-5 w-5" /> },
    { label: 'Appointments', href: '/dashboard/reception/appointments', icon: <Calendar className="h-5 w-5" /> },
    { label: 'Patients', href: '/dashboard/reception/patients', icon: <Users className="h-5 w-5" /> },
    { label: 'Billing', href: '/dashboard/reception/billing', icon: <CreditCard className="h-5 w-5" /> },
  ],
  [USER_ROLES.PHARMACIST]: [
    { label: 'Dashboard', href: '/dashboard/pharmacy', icon: <LayoutDashboard className="h-5 w-5" /> },
    { label: 'Inventory', href: '/dashboard/pharmacy/inventory', icon: <Pill className="h-5 w-5" /> },
    { label: 'Sales', href: '/dashboard/pharmacy/sales', icon: <DollarSign className="h-5 w-5" /> },
    { label: 'Purchases', href: '/dashboard/pharmacy/purchases', icon: <ShoppingCart className="h-5 w-5" /> },
  ],
  [USER_ROLES.LAB_TECHNICIAN]: [
    { label: 'Dashboard', href: '/dashboard/laboratory', icon: <LayoutDashboard className="h-5 w-5" /> },
    { label: 'Tests', href: '/dashboard/laboratory/tests', icon: <FlaskConical className="h-5 w-5" /> },
    { label: 'Reports', href: '/dashboard/laboratory/reports', icon: <FileText className="h-5 w-5" /> },
  ],
};

export default function Sidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const { sidebarOpen, toggleSidebar, setSidebarOpen } = useAppStore();

  const navItems = useMemo(() => roleNavMap[user?.role || ''] ?? [
    { label: 'Dashboard', href: '/dashboard', icon: <LayoutDashboard className="h-5 w-5" /> },
  ], [user?.role]);

  return (
    <>
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      <aside
        className={cn(
          'fixed top-0 left-0 z-50 h-full bg-dark-800 border-r border-gray-800 shadow-2xl transition-transform duration-300 flex flex-col',
          sidebarOpen ? 'translate-x-0 w-64' : '-translate-x-full lg:translate-x-0 lg:w-20'
        )}
      >
        <div className="flex items-center justify-between px-4 h-16 border-b border-gray-800 shrink-0">
          <Link href="/" className="flex items-center gap-2.5 overflow-hidden">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center shrink-0">
              <Building2 className="h-4 w-4 text-white" />
            </div>
            {sidebarOpen && <span className="text-sm font-bold text-white font-heading whitespace-nowrap">Rawal Hospital</span>}
          </Link>
          <button onClick={toggleSidebar} className="lg:hidden p-1.5 rounded-lg hover:bg-dark-600 shrink-0">
            <X className="h-5 w-5 text-gray-300" />
          </button>
        </div>

        <div className="px-4 py-3 border-b border-gray-800 shrink-0">
          <div className="flex items-center gap-3">
            <Avatar name={`${user?.firstName} ${user?.lastName}`} size="sm" />
            {sidebarOpen && (
              <div className="overflow-hidden min-w-0">
                <p className="text-sm font-medium text-white truncate">{user?.firstName} {user?.lastName}</p>
                <p className="text-xs text-gray-400 capitalize truncate">{user?.role?.replace('_', ' ')}</p>
              </div>
            )}
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto p-3 space-y-0.5 scrollbar-hide">
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
            return (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200',
                  isActive
                    ? 'bg-primary-500/10 text-primary-400 shadow-sm'
                    : 'text-gray-400 hover:bg-dark-600 hover:text-white'
                )}
                title={!sidebarOpen ? item.label : undefined}
              >
                <span className="shrink-0">{item.icon}</span>
                {sidebarOpen && <span className="truncate">{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        <div className="p-3 border-t border-gray-800 shrink-0">
          <button
            onClick={logout}
            className={cn(
              'flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium text-red-400 hover:bg-red-500/10 transition-all',
              !sidebarOpen && 'justify-center'
            )}
            title={!sidebarOpen ? 'Logout' : undefined}
          >
            <LogOut className="h-5 w-5 shrink-0" />
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>
    </>
  );
}
