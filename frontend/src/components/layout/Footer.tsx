'use client';

import Link from 'next/link';
import { HOSPITAL_INFO, ROUTES } from '@/lib/constants';
import { Phone, Mail, MapPin, Clock, ArrowRight, Building2 } from 'lucide-react';
import { useState } from 'react';
import Button from '@/components/ui/Button';
import toast from 'react-hot-toast';

const quickLinks = [
  { href: ROUTES.about, label: 'About Us' },
  { href: ROUTES.doctors, label: 'Find a Doctor' },
  { href: ROUTES.appointments, label: 'Book Appointment' },
  { href: ROUTES.contact, label: 'Contact Us' },
  { href: ROUTES.careers, label: 'Careers' },
  { href: ROUTES.blog, label: 'Health Blog' },
];

export default function Footer() {
  const [email, setEmail] = useState('');

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast.success('Subscribed to newsletter!');
      setEmail('');
    }
  };

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
          <div className="sm:col-span-2 lg:col-span-4">
            <Link href="/" className="inline-flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-primary-700 flex items-center justify-center shadow-lg">
                <Building2 className="h-5 w-5 text-white" />
              </div>
              <div>
                <span className="text-lg font-bold text-white font-heading">Rawal</span>
                <span className="text-lg font-bold text-primary font-heading">Hospital</span>
              </div>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-5 max-w-sm">
              {HOSPITAL_INFO.description}
            </p>
            <div className="space-y-2.5">
              {[
                { icon: MapPin, text: HOSPITAL_INFO.address },
                { icon: Phone, text: HOSPITAL_INFO.phone, extra: <span className="text-red-400 font-medium">Emergency: {HOSPITAL_INFO.emergency}</span> },
                { icon: Mail, text: HOSPITAL_INFO.email },
                { icon: Clock, text: 'Mon-Sat: 8:00 AM - 8:00 PM' },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <item.icon className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                  <div className="flex flex-col text-sm text-gray-400">
                    <span>{item.text}</span>
                    {item.extra}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2">
            <h3 className="text-white font-semibold text-xs uppercase tracking-widest mb-4">Quick Links</h3>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-gray-400 hover:text-primary transition-colors flex items-center gap-2">
                    <ArrowRight className="h-3 w-3 shrink-0" /> {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h3 className="text-white font-semibold text-xs uppercase tracking-widest mb-4">Services</h3>
            <ul className="space-y-2.5">
              {['Emergency Care', 'Outpatient Services', 'Inpatient Services', 'Diagnostic Services', 'Surgery', 'Pharmacy'].map((s) => (
                <li key={s}>
                  <Link href={ROUTES.services} className="text-sm text-gray-400 hover:text-primary transition-colors flex items-center gap-2">
                    <ArrowRight className="h-3 w-3 shrink-0" /> {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="sm:col-span-2 lg:col-span-4">
            <h3 className="text-white font-semibold text-xs uppercase tracking-widest mb-4">Newsletter</h3>
            <p className="text-sm text-gray-400 mb-4">Subscribe to get health tips and updates.</p>
            <form onSubmit={handleNewsletter} className="flex gap-2">
              <input
                type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email" required
                className="flex-1 min-w-0 px-3 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-primary transition-colors"
              />
              <Button type="submit" size="sm" className="shrink-0"><ArrowRight className="h-4 w-4" /></Button>
            </form>
            <div className="mt-6">
              <h4 className="text-white text-sm font-medium mb-3">Follow Us</h4>
              <div className="flex gap-2.5">
                {['Facebook', 'Twitter', 'Instagram', 'Youtube', 'LinkedIn'].map((s) => (
                  <a key={s} href="#" aria-label={s} className="w-9 h-9 rounded-lg bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white transition-all text-xs font-medium">
                    {s[0]}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
            <p className="text-sm text-gray-500">&copy; {new Date().getFullYear()} {HOSPITAL_INFO.name}. All rights reserved.</p>
            <div className="flex items-center gap-4">
              {['Privacy Policy', 'Terms of Service', 'Accessibility'].map((l) => (
                <Link key={l} href="#" className="text-sm text-gray-500 hover:text-primary transition-colors">{l}</Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
