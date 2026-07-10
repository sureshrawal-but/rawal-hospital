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
          ? 'bg-dark-800/80 backdrop-blur-xl shadow-lg border-b border-gray-800/50'
          : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Link href="/" className="flex items-center gap-2.5 shrink-0">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center shadow-lg shadow-primary-500/20">
              <Building2 className="h-5 w-5 text-white" />
            </div>
            <div className="hidden xs:block">
              <span className="text-lg font-bold text-white font-heading">Rawal</span>
              <span className="text-lg font-bold text-primary-400 font-heading">Hospital</span>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white rounded-lg hover:bg-dark-600 transition-all"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <a
              href={`tel:${HOSPITAL_INFO.emergency}`}
              className="flex items-center gap-2 px-4 py-2 bg-red-500/10 text-red-400 rounded-xl text-sm font-medium hover:bg-red-500/20 transition-colors"
            >
              <Phone className="h-4 w-4 animate-pulse shrink-0" />
              <span className="hidden xl:inline">Emergency: {HOSPITAL_INFO.emergency}</span>
              <span className="xl:hidden">Emergency</span>
            </a>
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-dark-600 transition-colors"
                >
                  <Avatar name={`${user?.firstName} ${user?.lastName}`} size="sm" />
                  <span className="text-sm font-medium text-gray-300 hidden md:block">{user?.firstName}</span>
                  <ChevronDown className={cn('h-4 w-4 text-gray-500 transition-transform shrink-0', dropdownOpen && 'rotate-180')} />
                </button>
                <AnimatePresence>
                  {dropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute right-0 mt-2 w-56 bg-dark-700 rounded-2xl shadow-xl border border-gray-700 py-2"
                    >
                      <div className="px-4 py-3 border-b border-gray-700">
                        <p className="text-sm font-semibold text-white truncate">{user?.firstName} {user?.lastName}</p>
                        <p className="text-xs text-gray-400 capitalize">{user?.role}</p>
                      </div>
                      <Link href="/dashboard" className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-300 hover:bg-dark-600" onClick={() => setDropdownOpen(false)}>
                        <LayoutDashboard className="h-4 w-4" /> Dashboard
                      </Link>
                      <Link href="/appointments" className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-300 hover:bg-dark-600" onClick={() => setDropdownOpen(false)}>
                        <Calendar className="h-4 w-4" /> My Appointments
                      </Link>
                      <button onClick={() => { logout(); setDropdownOpen(false); }} className="flex items-center gap-3 px-4 py-2.5 text-sm text-red-400 hover:bg-red-500/10 w-full">
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
            className="lg:hidden p-2.5 rounded-xl hover:bg-white/5 transition-colors"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileOpen ? <X className="h-6 w-6 text-white" /> : <Menu className="h-6 w-6 text-white" />}
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
            className="fixed inset-0 top-16 lg:hidden bg-dark-900 z-40 overflow-y-auto"
          >
            <div className="px-4 py-6 space-y-1">
              {navLinks.map((link, i) => (
                <motion.div key={link.href} custom={i} variants={itemVariants} initial="closed" animate="open">
                  <Link
                    href={link.href}
                    onClick={closeMobile}
                    className="block px-4 py-4 text-base font-medium text-gray-300 hover:bg-primary-500/10 hover:text-white rounded-xl transition-colors active:bg-primary-500/20"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <hr className="my-4 border-gray-700" />
              {isAuthenticated ? (
                <>
                  <Link href="/dashboard" onClick={closeMobile} className="flex items-center gap-3 px-4 py-4 text-base font-medium text-gray-300 hover:bg-primary-500/10 rounded-xl">
                    <LayoutDashboard className="h-5 w-5" /> Dashboard
                  </Link>
                  <Link href="/appointments" onClick={closeMobile} className="flex items-center gap-3 px-4 py-4 text-base font-medium text-gray-300 hover:bg-primary-500/10 rounded-xl">
                    <Calendar className="h-5 w-5" /> My Appointments
                  </Link>
                  <button onClick={() => { logout(); closeMobile(); }} className="flex items-center gap-3 px-4 py-4 text-base font-medium text-red-400 hover:bg-red-500/10 rounded-xl w-full">
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
                <a href={`tel:${HOSPITAL_INFO.emergency}`} className="flex items-center justify-center gap-2 px-4 py-4 bg-red-500/10 text-red-400 rounded-xl text-sm font-medium active:bg-red-500/20">
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
