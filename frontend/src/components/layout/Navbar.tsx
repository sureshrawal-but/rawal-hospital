'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { HOSPITAL_INFO, ROUTES } from '@/lib/constants';
import { Menu, X, Phone, ChevronDown, LogOut, Calendar, LayoutDashboard, Building2 } from 'lucide-react';
import Button from '@/components/ui/Button';
import { useAuth } from '@/hooks/useAuth';
import Avatar from '@/components/ui/Avatar';

const navLinks = [
  { href: ROUTES.home, label: 'Home' },
  { href: ROUTES.about, label: 'About' },
  { href: ROUTES.departments, label: 'Departments' },
  { href: ROUTES.doctors, label: 'Doctors' },
  { href: ROUTES.services, label: 'Services' },
  { href: ROUTES.contact, label: 'Contact' },
];

const menuVariants = {
  closed: { opacity: 0, x: '100%' },
  open: { opacity: 1, x: 0, transition: { type: 'spring', damping: 25, stiffness: 200 } },
};

const itemVariants = {
  closed: { opacity: 0, x: 20 },
  open: (i: number) => ({ opacity: 1, x: 0, transition: { delay: i * 0.05 } }),
};

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const closeMobile = useCallback(() => setMobileOpen(false), []);

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
          <Link href="/" className="flex items-center gap-2.5 shrink-0">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-primary-700 flex items-center justify-center shadow-lg">
              <Building2 className="h-5 w-5 text-white" />
            </div>
            <div className="hidden xs:block">
              <span className="text-lg font-bold text-gray-900 font-heading">Rawal</span>
              <span className="text-lg font-bold text-primary font-heading">Hospital</span>
            </div>
          </Link>

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

          <div className="hidden lg:flex items-center gap-3">
            <a
              href={`tel:${HOSPITAL_INFO.emergency}`}
              className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-xl text-sm font-medium hover:bg-red-100 transition-colors"
            >
              <Phone className="h-4 w-4 animate-pulse shrink-0" />
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
                  <span className="text-sm font-medium text-gray-700 hidden md:block">{user?.firstName}</span>
                  <ChevronDown className={cn('h-4 w-4 text-gray-400 transition-transform shrink-0', dropdownOpen && 'rotate-180')} />
                </button>
                <AnimatePresence>
                  {dropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 py-2"
                    >
                      <div className="px-4 py-3 border-b border-gray-50">
                        <p className="text-sm font-semibold text-gray-900 truncate">{user?.firstName} {user?.lastName}</p>
                        <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
                      </div>
                      <Link href="/dashboard" className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50" onClick={() => setDropdownOpen(false)}>
                        <LayoutDashboard className="h-4 w-4" /> Dashboard
                      </Link>
                      <Link href="/appointments" className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50" onClick={() => setDropdownOpen(false)}>
                        <Calendar className="h-4 w-4" /> My Appointments
                      </Link>
                      <button onClick={() => { logout(); setDropdownOpen(false); }} className="flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 w-full">
                        <LogOut className="h-4 w-4" /> Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link href={ROUTES.login}><Button variant="ghost" size="sm">Login</Button></Link>
                <Link href={ROUTES.register}><Button size="sm">Register</Button></Link>
              </div>
            )}
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2.5 rounded-xl hover:bg-white/20 transition-colors"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed inset-0 top-16 lg:hidden bg-white z-40 overflow-y-auto"
          >
            <div className="px-4 py-6 space-y-1">
              {navLinks.map((link, i) => (
                <motion.div key={link.href} custom={i} variants={itemVariants} initial="closed" animate="open">
                  <Link
                    href={link.href}
                    onClick={closeMobile}
                    className="block px-4 py-4 text-base font-medium text-gray-700 hover:bg-primary-50 hover:text-primary rounded-xl transition-colors active:bg-primary-100"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <hr className="my-4" />
              {isAuthenticated ? (
                <>
                  <Link href="/dashboard" onClick={closeMobile} className="flex items-center gap-3 px-4 py-4 text-base font-medium text-gray-700 hover:bg-primary-50 rounded-xl">
                    <LayoutDashboard className="h-5 w-5" /> Dashboard
                  </Link>
                  <Link href="/appointments" onClick={closeMobile} className="flex items-center gap-3 px-4 py-4 text-base font-medium text-gray-700 hover:bg-primary-50 rounded-xl">
                    <Calendar className="h-5 w-5" /> My Appointments
                  </Link>
                  <button onClick={() => { logout(); closeMobile(); }} className="flex items-center gap-3 px-4 py-4 text-base font-medium text-red-600 hover:bg-red-50 rounded-xl w-full">
                    <LogOut className="h-5 w-5" /> Logout
                  </button>
                </>
              ) : (
                <div className="flex flex-col gap-3 pt-2 px-2">
                  <Link href={ROUTES.login} onClick={closeMobile}>
                    <Button variant="outline" className="w-full justify-center py-3">Login</Button>
                  </Link>
                  <Link href={ROUTES.register} onClick={closeMobile}>
                    <Button className="w-full justify-center py-3">Register</Button>
                  </Link>
                </div>
              )}
              <div className="mt-6 px-2">
                <a href={`tel:${HOSPITAL_INFO.emergency}`} className="flex items-center justify-center gap-2 px-4 py-4 bg-red-50 text-red-600 rounded-xl text-sm font-medium active:bg-red-100">
                  <Phone className="h-5 w-5" /> Emergency: {HOSPITAL_INFO.emergency}
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
