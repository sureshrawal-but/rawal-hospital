'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { DEPARTMENTS } from '@/lib/constants';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Breadcrumb from '@/components/ui/Breadcrumb';
import BookAppointmentModal from '@/components/modals/BookAppointmentModal';
import { Calendar, Clock, Users, Stethoscope, MapPin, ArrowRight, CheckCircle } from 'lucide-react';

const treatments = ['General Consultation', 'Advanced Diagnostics', 'Surgical Procedures', 'Preventive Care', 'Rehabilitation', 'Follow-up Care'];

export default function DepartmentDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const dept = DEPARTMENTS.find((d) => d.slug === slug);
  const [bookModalOpen, setBookModalOpen] = useState(false);

  if (!dept) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Department not found</h1>
          <p className="text-gray-500 mt-2">The department you are looking for does not exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20">
      <section className="relative py-16 gradient-hero">
        <div className="max-w-7xl mx-auto px-4">
          <Breadcrumb items={[{ label: 'Departments', href: '/departments' }, { label: dept.name }]} className="mb-4 text-blue-200 [&_*]:text-blue-200" />
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Badge variant="success" size="lg" className="mb-4 bg-white/20 text-white">Department</Badge>
            <h1 className="text-4xl lg:text-5xl font-bold text-white font-heading mb-4">{dept.name}</h1>
            <p className="text-lg text-blue-100 max-w-2xl">{dept.description}</p>
          </motion.div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <Card padding="lg">
                  <h2 className="text-2xl font-bold text-gray-900 font-heading mb-4">Overview</h2>
                  <p className="text-gray-600 leading-relaxed">
                    Our {dept.name} department is staffed by a team of highly qualified specialists and supported by
                    state-of-the-art medical technology. We provide comprehensive care for a wide range of conditions
                    using the latest treatment protocols and evidence-based medicine.
                  </p>
                </Card>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <Card padding="lg">
                  <h2 className="text-2xl font-bold text-gray-900 font-heading mb-4">Treatments & Services</h2>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {treatments.map((treatment, i) => (
                      <div key={i} className="flex items-center gap-3 text-gray-700">
                        <CheckCircle className="h-5 w-5 text-accent shrink-0" />
                        <span>{treatment}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <Card padding="lg">
                  <h2 className="text-2xl font-bold text-gray-900 font-heading mb-4">Facilities</h2>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {['Modern Consultation Rooms', 'Advanced Diagnostic Equipment', 'Dedicated Treatment Areas', 'Patient Recovery Suites', 'Emergency Response System', 'Telemedicine Services'].map((fac, i) => (
                      <div key={i} className="flex items-center gap-3 text-gray-700">
                        <CheckCircle className="h-5 w-5 text-accent shrink-0" />
                        <span>{fac}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              </motion.div>
            </div>

            <div className="space-y-6">
              <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                <Card padding="md">
                  <h3 className="font-semibold text-gray-900 mb-4">Department Info</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center gap-3">
                      <Clock className="h-5 w-5 text-primary shrink-0" />
                      <div>
                        <p className="font-medium text-gray-900">Working Hours</p>
                        <p className="text-gray-500">Mon-Sat: 8:00 AM - 8:00 PM</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Users className="h-5 w-5 text-primary shrink-0" />
                      <div>
                        <p className="font-medium text-gray-900">Doctors</p>
                        <p className="text-gray-500">15+ Specialists</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <MapPin className="h-5 w-5 text-primary shrink-0" />
                      <div>
                        <p className="font-medium text-gray-900">Location</p>
                        <p className="text-gray-500">Main Campus, 2nd Floor</p>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>

              <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
                <Card padding="md" variant="primary" className="!bg-gradient-to-br !from-primary !to-primary-700 !text-white">
                  <h3 className="font-semibold mb-2">Book an Appointment</h3>
                  <p className="text-sm text-blue-100 mb-4">Schedule a consultation with our specialists.</p>
                  <Button className="bg-white text-primary hover:bg-blue-50 w-full" onClick={() => setBookModalOpen(true)}>
                    <Calendar className="h-4 w-4 mr-2" /> Book Now
                  </Button>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <BookAppointmentModal isOpen={bookModalOpen} onClose={() => setBookModalOpen(false)} />
    </div>
  );
}
