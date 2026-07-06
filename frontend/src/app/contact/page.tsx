'use client';

import { motion } from 'framer-motion';
import { HOSPITAL_INFO, BRANCHES, WORKING_HOURS } from '@/lib/constants';
import Badge from '@/components/ui/Badge';
import Card from '@/components/ui/Card';
import Breadcrumb from '@/components/ui/Breadcrumb';
import ContactForm from '@/components/forms/ContactForm';
import { Phone, Mail, MapPin, Clock, Building2 } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="pt-20">
      <section className="relative py-16 gradient-hero">
        <div className="max-w-7xl mx-auto px-4">
          <Breadcrumb items={[{ label: 'Contact' }]} className="mb-4 text-blue-200 [&_*]:text-blue-200" />
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Badge variant="success" size="lg" className="mb-4 bg-white/20 text-white">Get in Touch</Badge>
            <h1 className="text-4xl lg:text-5xl font-bold text-white font-heading mb-4">Contact Us</h1>
            <p className="text-lg text-blue-100 max-w-2xl">We are here to help you. Reach out to us through any of the channels below.</p>
          </motion.div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <h2 className="text-3xl font-bold text-gray-900 font-heading mb-6">Send Us a Message</h2>
                <ContactForm />
              </motion.div>
            </div>
            <div className="space-y-6">
              <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                <Card padding="md">
                  <h3 className="font-semibold text-gray-900 mb-4">Contact Details</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium text-gray-900">Address</p>
                        <p className="text-sm text-gray-500">{HOSPITAL_INFO.address}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Phone className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium text-gray-900">Phone</p>
                        <p className="text-sm text-gray-500">{HOSPITAL_INFO.phone}</p>
                        <p className="text-sm text-red-500 font-medium">Emergency: {HOSPITAL_INFO.emergency}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Mail className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium text-gray-900">Email</p>
                        <p className="text-sm text-gray-500">{HOSPITAL_INFO.email}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Clock className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium text-gray-900">Working Hours</p>
                        <p className="text-sm text-gray-500">Weekdays: {WORKING_HOURS.weekday}</p>
                        <p className="text-sm text-gray-500">Weekends: {WORKING_HOURS.weekend}</p>
                        <p className="text-sm text-red-500 font-medium">Emergency: {WORKING_HOURS.emergency}</p>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>

              <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
                <Card padding="md">
                  <h3 className="font-semibold text-gray-900 mb-4">Our Branches</h3>
                  <div className="space-y-4">
                    {BRANCHES.map((branch, i) => (
                      <div key={i} className="flex items-start gap-3 pb-4 last:pb-0 last:border-0 border-b border-gray-100">
                        <Building2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                        <div>
                          <p className="font-medium text-gray-900">{branch.name}</p>
                          <p className="text-sm text-gray-500">{branch.address}</p>
                          <p className="text-sm text-gray-500">{branch.phone}</p>
                          <p className="text-xs text-gray-400">{branch.hours}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </motion.div>

              <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
                <div className="h-64 rounded-2xl bg-gray-200 overflow-hidden">
                  <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400">
                    <div className="text-center">
                      <MapPin className="h-8 w-8 mx-auto mb-2" />
                      <p className="text-sm">Map Placeholder</p>
                      <p className="text-xs">{HOSPITAL_INFO.address}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
