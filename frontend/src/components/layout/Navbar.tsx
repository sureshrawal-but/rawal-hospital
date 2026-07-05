'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { HOSPITAL_INFO, ROUTES } from '@/lib/constants';
import { Menu, X, Phone, ChevronDown, User, LogOut, Calendar, LayoutDashboard } from 'lucide-react';
import Button from '@/components/ui/Button';
import { useAuth } from '@/hooks/useAuth';
import { useAppStore } from '@/store/appStore';
import Avatar from '@/components/ui/Avatar';

const navLinks = [
  { href: ROUTES.home, label: 'Home' },
  { href: ROUTES.about, label: 'About' },
  { href: ROUTES.departments, label: 'Departments' },
  { href: ROUTES.doctors, label: 'Doctors' },
  { href: ROUTES.services, label: 'Services' },
  { href: ROUTES.contact, label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const { setMobileMenuOpen } = useAppStore();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMobileToggle = () => {
    setMobileOpen(!mobileOpen);
    setMobileMenuOpen(!mobileOpen);
  };

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-white/80 backdrop-blur-xl shadow-sm border-b border-gray-100/50'
          : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-primary-700 flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg font-heading">R</span>
            </div>
            <div>
              <span className="text-lg font-bold text-gray-900 font-heading">Rawal</span>
              <span className="text-lg font-bold text-primary font-heading">Hospital</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-primary rounded-lg hover:bg-primary-50/50 transition-all"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href={`tel:${HOSPITAL_INFO.emergency}`}
              className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-xl text-sm font-medium hover:bg-red-100 transition-colors"
            >
              <Phone className="h-4 w-4 animate-pulse" />
              <span className="hidden xl:inline">Emergency: {HOSPITAL_INFO.emergency}</span>
              <span className="xl:hidden">Emergency</span>
            </a>

            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  <Avatar name={`${user?.firstName} ${user?.lastName}`} size="sm" />
                  <span className="text-sm font-medium text-gray-700">
                    {user?.firstName}
                  </span>
                  <ChevronDown className={cn('h-4 w-4 text-gray-400 transition-transform', dropdownOpen && 'rotate-180')} />
                </button>
                <AnimatePresence>
                  {dropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 py-2"
                    >
                      <div className="px-4 py-3 border-b border-gray-50">
                        <p className="text-sm font-semibold text-gray-900">
                          {user?.firstName} {user?.lastName}
                        </p>
                        <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
                      </div>
                      <Link
                        href="/dashboard"
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50"
                        onClick={() => setDropdownOpen(false)}
                      >
                        <LayoutDashboard className="h-4 w-4" />
                        Dashboard
                      </Link>
                      <Link
                        href="/appointments"
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50"
                        onClick={() => setDropdownOpen(false)}
                      >
                        <Calendar className="h-4 w-4" />
                        My Appointments
                      </Link>
                      <button
                        onClick={() => { logout(); setDropdownOpen(false); }}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 w-full"
                      >
                        <LogOut className="h-4 w-4" />
                        Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link href={ROUTES.login}>
                  <Button variant="ghost" size="sm">Login</Button>
                </Link>
                <Link href={ROUTES.register}>
                  <Button size="sm">Register</Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={handleMobileToggle}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Toggle mobile menu"
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile navigation */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white/95 backdrop-blur-xl border-t border-gray-100 overflow-hidden"
          >
            <div className="px-4 py-4 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={handleMobileToggle}
                  className="block px-4 py-3 text-sm font-medium text-gray-700 hover:bg-primary-50 hover:text-primary rounded-xl transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <hr className="my-3" />
              {isAuthenticated ? (
                <>
                  <Link
                    href="/dashboard"
                    onClick={handleMobileToggle}
                    className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 hover:bg-primary-50 rounded-xl"
                  >
                    <LayoutDashboard className="h-4 w-4" />
                    Dashboard
                  </Link>
                  <button
                    onClick={() => { logout(); handleMobileToggle(); }}
                    className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 rounded-xl w-full"
                  >
                    <LogOut className="h-4 w-4" />
                    Logout
                  </button>
                </>
              ) : (
                <div className="flex gap-3 pt-2">
                  <Link href={ROUTES.login} onClick={handleMobileToggle} className="flex-1">
                    <Button variant="outline" className="w-full" size="sm">Login</Button>
                  </Link>
                  <Link href={ROUTES.register} onClick={handleMobileToggle} className="flex-1">
                    <Button className="w-full" size="sm">Register</Button>
                  </Link>
                </div>
              )}
              <a
                href={`tel:${HOSPITAL_INFO.emergency}`}
                className="flex items-center justify-center gap-2 mt-3 px-4 py-3 bg-red-50 text-red-600 rounded-xl text-sm font-medium"
              >
                <Phone className="h-4 w-4" />
                Emergency: {HOSPITAL_INFO.emergency}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
