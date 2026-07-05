'use client';

import { motion } from 'framer-motion';
import Badge from '@/components/ui/Badge';
import Breadcrumb from '@/components/ui/Breadcrumb';
import AppointmentForm from '@/components/forms/AppointmentForm';
import { Calendar, Clock, CheckCircle } from 'lucide-react';

export default function AppointmentsPage() {
  return (
    <div className="pt-20">
      <section className="relative py-16 gradient-hero">
        <div className="max-w-7xl mx-auto px-4">
          <Breadcrumb items={[{ label: 'Book Appointment' }]} className="mb-4 text-blue-200 [&_*]:text-blue-200" />
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Badge variant="success" size="lg" className="mb-4 bg-white/20 text-white">Appointment</Badge>
            <h1 className="text-4xl lg:text-5xl font-bold text-white font-heading mb-4">Book an Appointment</h1>
            <p className="text-lg text-blue-100 max-w-2xl">Schedule a consultation with our expert doctors. Easy and convenient online booking.</p>
          </motion.div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <AppointmentForm />
            </div>
            <div className="space-y-6">
              <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-4">Why Book Online?</h3>
                <div className="space-y-4">
                  {[
                    { icon: Calendar, text: 'Choose your preferred date' },
                    { icon: Clock, text: 'Select convenient time slot' },
                    { icon: CheckCircle, text: 'Instant confirmation' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 text-sm text-gray-600">
                      <item.icon className="h-5 w-5 text-primary shrink-0" />
                      <span>{item.text}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
              <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="bg-gradient-to-br from-primary to-primary-700 rounded-2xl p-6 text-white">
                <h3 className="font-semibold mb-2">Need Emergency Help?</h3>
                <p className="text-sm text-blue-100 mb-4">Our emergency department is open 24/7.</p>
                <p className="text-2xl font-bold">+1 (555) 999-9111</p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
