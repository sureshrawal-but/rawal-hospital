'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/useAuth';
import { useAppStore } from '@/store/appStore';
import { USER_ROLES } from '@/lib/constants';
import {
  LayoutDashboard, Calendar, Users, UserCircle, Stethoscope, Pill, FlaskConical,
  FileText, Settings, CreditCard, Activity, ChevronDown, LogOut, Menu,
  Building2, Syringe, HeartPulse, ClipboardList, DollarSign, Shield,
  X, ChevronLeft, ShoppingCart
} from 'lucide-react';
import Avatar from '@/components/ui/Avatar';
import { useState } from 'react';

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  children?: NavItem[];
}

export default function Sidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const { sidebarOpen, toggleSidebar, setSidebarOpen } = useAppStore();
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const toggleExpanded = (label: string) => {
    setExpandedItems((prev) =>
      prev.includes(label) ? prev.filter((i) => i !== label) : [...prev, label]
    );
  };

  const getNavItems = (): NavItem[] => {
    const items: NavItem[] = [];

    switch (user?.role) {
      case USER_ROLES.ADMIN:
        items.push(
          { label: 'Dashboard', href: '/dashboard/admin', icon: <LayoutDashboard className="h-5 w-5" /> },
          { label: 'Doctors', href: '/dashboard/admin/doctors', icon: <Stethoscope className="h-5 w-5" /> },
          { label: 'Patients', href: '/dashboard/admin/patients', icon: <Users className="h-5 w-5" /> },
          { label: 'Staff', href: '/dashboard/admin/staff', icon: <UserCircle className="h-5 w-5" /> },
          { label: 'Departments', href: '/dashboard/admin/departments', icon: <Building2 className="h-5 w-5" /> },
          { label: 'Appointments', href: '/dashboard/admin/appointments', icon: <Calendar className="h-5 w-5" /> },
          { label: 'Reports', href: '/dashboard/admin/reports', icon: <FileText className="h-5 w-5" /> },
          { label: 'Settings', href: '/dashboard/admin/settings', icon: <Settings className="h-5 w-5" /> },
        );
        break;
      case USER_ROLES.DOCTOR:
        items.push(
          { label: 'Dashboard', href: '/dashboard/doctor', icon: <LayoutDashboard className="h-5 w-5" /> },
          { label: 'Appointments', href: '/dashboard/doctor/appointments', icon: <Calendar className="h-5 w-5" /> },
          { label: 'Patients', href: '/dashboard/doctor/patients', icon: <Users className="h-5 w-5" /> },
          { label: 'Schedule', href: '/dashboard/doctor/schedule', icon: <Activity className="h-5 w-5" /> },
          { label: 'Prescriptions', href: '/dashboard/doctor/prescriptions', icon: <ClipboardList className="h-5 w-5" /> },
        );
        break;
      case USER_ROLES.PATIENT:
        items.push(
          { label: 'Dashboard', href: '/dashboard/patient', icon: <LayoutDashboard className="h-5 w-5" /> },
          { label: 'Appointments', href: '/dashboard/patient/appointments', icon: <Calendar className="h-5 w-5" /> },
          { label: 'Medical Records', href: '/dashboard/patient/medical-records', icon: <FileText className="h-5 w-5" /> },
          { label: 'Prescriptions', href: '/dashboard/patient/prescriptions', icon: <ClipboardList className="h-5 w-5" /> },
          { label: 'Lab Reports', href: '/dashboard/patient/lab-reports', icon: <FlaskConical className="h-5 w-5" /> },
          { label: 'Invoices', href: '/dashboard/patient/invoices', icon: <DollarSign className="h-5 w-5" /> },
          { label: 'Profile', href: '/dashboard/patient/profile', icon: <UserCircle className="h-5 w-5" /> },
        );
        break;
      case USER_ROLES.RECEPTION:
        items.push(
          { label: 'Dashboard', href: '/dashboard/reception', icon: <LayoutDashboard className="h-5 w-5" /> },
          { label: 'Appointments', href: '/dashboard/reception/appointments', icon: <Calendar className="h-5 w-5" /> },
          { label: 'Patients', href: '/dashboard/reception/patients', icon: <Users className="h-5 w-5" /> },
          { label: 'Billing', href: '/dashboard/reception/billing', icon: <CreditCard className="h-5 w-5" /> },
        );
        break;
      case USER_ROLES.PHARMACIST:
        items.push(
          { label: 'Dashboard', href: '/dashboard/pharmacy', icon: <LayoutDashboard className="h-5 w-5" /> },
          { label: 'Inventory', href: '/dashboard/pharmacy/inventory', icon: <Pill className="h-5 w-5" /> },
          { label: 'Sales', href: '/dashboard/pharmacy/sales', icon: <DollarSign className="h-5 w-5" /> },
          { label: 'Purchases', href: '/dashboard/pharmacy/purchases', icon: <ShoppingCart className="h-5 w-5" /> },
        );
        break;
      case USER_ROLES.LAB_TECHNICIAN:
        items.push(
          { label: 'Dashboard', href: '/dashboard/laboratory', icon: <LayoutDashboard className="h-5 w-5" /> },
          { label: 'Tests', href: '/dashboard/laboratory/tests', icon: <FlaskConical className="h-5 w-5" /> },
          { label: 'Reports', href: '/dashboard/laboratory/reports', icon: <FileText className="h-5 w-5" /> },
        );
        break;
      default:
        items.push(
          { label: 'Dashboard', href: '/dashboard', icon: <LayoutDashboard className="h-5 w-5" /> },
        );
    }

    return items;
  };

  const navItems = getNavItems();

  return (
    <>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={cn(
          'fixed top-0 left-0 z-50 h-full bg-white border-r border-gray-100 shadow-lg transition-all duration-300',
          'lg:translate-x-0',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full',
          sidebarOpen ? 'w-64' : 'w-20'
        )}
      >
        {/* Sidebar header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary-700 flex items-center justify-center">
              <span className="text-white font-bold font-heading">R</span>
            </div>
            <AnimatePresence>
              {sidebarOpen && (
                <motion.span
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: 'auto' }}
                  exit={{ opacity: 0, width: 0 }}
                  className="text-sm font-bold text-gray-900 font-heading overflow-hidden whitespace-nowrap"
                >
                  Rawal Hospital
                </motion.span>
              )}
            </AnimatePresence>
          </Link>
          <button
            onClick={toggleSidebar}
            className="lg:hidden p-1.5 rounded-lg hover:bg-gray-100"
            aria-label="Close sidebar"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* User info */}
        <div className="p-4 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <Avatar name={`${user?.firstName} ${user?.lastName}`} size="sm" />
            <AnimatePresence>
              {sidebarOpen && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="overflow-hidden"
                >
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {user?.firstName} {user?.lastName}
                  </p>
                  <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-3 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const isExpanded = expandedItems.includes(item.label);

            return (
              <div key={item.label}>
                <Link
                  href={item.href}
                  onClick={() => sidebarOpen && item.children && toggleExpanded(item.label)}
                  className={cn(
                    'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200',
                    isActive
                      ? 'bg-primary-50 text-primary'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  )}
                >
                  <span className="shrink-0">{item.icon}</span>
                  <AnimatePresence>
                    {sidebarOpen && (
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex-1 truncate"
                      >
                        {item.label}
                      </motion.span>
                    )}
                  </AnimatePresence>
                  {sidebarOpen && item.children && (
                    <ChevronDown className={cn('h-4 w-4 transition-transform', isExpanded && 'rotate-180')} />
                  )}
                </Link>
              </div>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="p-3 border-t border-gray-100">
          <button
            onClick={logout}
            className={cn(
              'flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 transition-all',
              !sidebarOpen && 'justify-center'
            )}
          >
            <LogOut className="h-5 w-5 shrink-0" />
            <AnimatePresence>
              {sidebarOpen && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  Logout
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </aside>
    </>
  );
}


