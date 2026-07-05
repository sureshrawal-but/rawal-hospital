'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { HOSPITAL_INFO, ROUTES, DEPARTMENTS, WORKING_HOURS } from '@/lib/constants';
import { Phone, Mail, MapPin, Clock, Facebook, Twitter, Instagram, Youtube, Linkedin, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import Button from '@/components/ui/Button';
import toast from 'react-hot-toast';

const services = [
  { href: ROUTES.services, label: 'Emergency Care' },
  { href: ROUTES.services, label: 'Outpatient Services' },
  { href: ROUTES.services, label: 'Inpatient Services' },
  { href: ROUTES.services, label: 'Diagnostic Services' },
  { href: ROUTES.services, label: 'Surgery' },
  { href: ROUTES.services, label: 'Pharmacy' },
];

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
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Hospital info */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary-700 flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xl font-heading">R</span>
              </div>
              <div>
                <span className="text-xl font-bold text-white font-heading">Rawal</span>
                <span className="text-xl font-bold text-primary font-heading">Hospital</span>
              </div>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6 max-w-md">
              {HOSPITAL_INFO.description}. We are committed to providing exceptional healthcare services with compassion and advanced medical technology.
            </p>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <span className="text-sm text-gray-400">{HOSPITAL_INFO.address}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-primary shrink-0" />
                <div className="flex flex-col">
                  <span className="text-sm text-gray-400">{HOSPITAL_INFO.phone}</span>
                  <span className="text-sm text-red-400 font-medium">Emergency: {HOSPITAL_INFO.emergency}</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary shrink-0" />
                <span className="text-sm text-gray-400">{HOSPITAL_INFO.email}</span>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-primary shrink-0" />
                <span className="text-sm text-gray-400">Mon-Sat: {WORKING_HOURS.weekday}</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-primary transition-colors flex items-center gap-2"
                  >
                    <ArrowRight className="h-3 w-3" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              Our Services
            </h3>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.label}>
                  <Link
                    href={service.href}
                    className="text-sm text-gray-400 hover:text-primary transition-colors flex items-center gap-2"
                  >
                    <ArrowRight className="h-3 w-3" />
                    {service.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              Newsletter
            </h3>
            <p className="text-sm text-gray-400 mb-4">
              Subscribe to get health tips and updates.
            </p>
            <form onSubmit={handleNewsletter} className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                required
                className="flex-1 px-3 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-primary"
              />
              <Button type="submit" size="sm">
                <ArrowRight className="h-4 w-4" />
              </Button>
            </form>
            <div className="mt-6">
              <h4 className="text-white text-sm font-medium mb-3">Follow Us</h4>
              <div className="flex gap-3">
                {[
                  { icon: Facebook, href: '#', label: 'Facebook' },
                  { icon: Twitter, href: '#', label: 'Twitter' },
                  { icon: Instagram, href: '#', label: 'Instagram' },
                  { icon: Youtube, href: '#', label: 'Youtube' },
                  { icon: Linkedin, href: '#', label: 'LinkedIn' },
                ].map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="w-9 h-9 rounded-lg bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white transition-all"
                  >
                    <social.icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-500">
              &copy; {new Date().getFullYear()} {HOSPITAL_INFO.name}. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link href="#" className="text-sm text-gray-500 hover:text-primary transition-colors">
                Privacy Policy
              </Link>
              <Link href="#" className="text-sm text-gray-500 hover:text-primary transition-colors">
                Terms of Service
              </Link>
              <Link href="#" className="text-sm text-gray-500 hover:text-primary transition-colors">
                Accessibility
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
