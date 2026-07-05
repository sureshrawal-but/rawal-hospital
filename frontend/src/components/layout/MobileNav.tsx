'use client';

import Drawer from '@/components/ui/Drawer';
import { useAppStore } from '@/store/appStore';
import Link from 'next/link';
import { X, Home, Info, Stethoscope, Building2, Briefcase, Phone, Calendar, Blog, ChevronRight } from 'lucide-react';
import { ROUTES } from '@/lib/constants';

export default function MobileNav() {
  const { mobileMenuOpen, setMobileMenuOpen } = useAppStore();

  const navItems = [
    { href: ROUTES.home, label: 'Home', icon: Home },
    { href: ROUTES.about, label: 'About Us', icon: Info },
    { href: ROUTES.departments, label: 'Departments', icon: Building2 },
    { href: ROUTES.doctors, label: 'Doctors', icon: Stethoscope },
    { href: ROUTES.services, label: 'Services', icon: Briefcase },
    { href: ROUTES.contact, label: 'Contact', icon: Phone },
    { href: ROUTES.appointments, label: 'Book Appointment', icon: Calendar },
    { href: ROUTES.blog, label: 'Blog', icon: Blog },
  ];

  return (
    <Drawer
      isOpen={mobileMenuOpen}
      onClose={() => setMobileMenuOpen(false)}
      side="left"
      width="w-72"
    >
      <div className="pt-4">
        <div className="flex items-center justify-between mb-6 px-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary-700 flex items-center justify-center">
              <span className="text-white font-bold font-heading">R</span>
            </div>
            <span className="font-bold text-gray-900 font-heading">Rawal Hospital</span>
          </div>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between px-3 py-3 rounded-xl text-gray-700 hover:bg-primary-50 hover:text-primary transition-colors"
            >
              <div className="flex items-center gap-3">
                <item.icon className="h-5 w-5" />
                <span className="text-sm font-medium">{item.label}</span>
              </div>
              <ChevronRight className="h-4 w-4 text-gray-300" />
            </Link>
          ))}
        </nav>
      </div>
    </Drawer>
  );
}

function Blog(props: any) { return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>}
