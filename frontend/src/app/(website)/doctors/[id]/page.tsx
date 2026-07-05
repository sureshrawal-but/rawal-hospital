'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Breadcrumb from '@/components/ui/Breadcrumb';
import BookAppointmentModal from '@/components/modals/BookAppointmentModal';
import { Star, MapPin, Clock, Award, Phone, Mail, Calendar, CheckCircle, ArrowRight } from 'lucide-react';

const doctorsData: Record<string, any> = {
  '1': { name: 'Dr. John Smith', specialty: 'Cardiologist', rating: 4.9, experience: 18, department: 'Cardiology', location: 'Main Campus', availability: 'Mon-Fri: 9:00 AM - 5:00 PM', fee: 150, phone: '+1 (555) 111-2233', email: 'john.smith@rawalhospital.com', bio: 'Dr. John Smith is a highly experienced cardiologist with over 18 years of clinical practice. He specializes in interventional cardiology and has performed thousands of successful procedures.', education: 'MD, Cardiology - Harvard Medical School\nFellowship - Mayo Clinic', certifications: 'Board Certified in Cardiology\nFACC - Fellow of American College of Cardiology', languages: 'English, Spanish' },
  '2': { name: 'Dr. Sarah Johnson', specialty: 'Neurologist', rating: 4.8, experience: 15, department: 'Neurology', location: 'Main Campus', availability: 'Mon-Sat: 10:00 AM - 6:00 PM', fee: 180, phone: '+1 (555) 222-3344', email: 'sarah.johnson@rawalhospital.com', bio: 'Dr. Sarah Johnson is a renowned neurologist specializing in stroke management and neurodegenerative disorders. She leads our stroke unit and has published numerous research papers.', education: 'MD, Neurology - Johns Hopkins University\nFellowship - Cleveland Clinic', certifications: 'Board Certified in Neurology\nFAAN - Fellow of American Academy of Neurology', languages: 'English, French' },
};

export function generateStaticParams() {
  return Object.keys(doctorsData).map((id) => ({ id }));
}

export default function DoctorDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const doctor = doctorsData[id] || doctorsData['1'];
  const [bookModalOpen, setBookModalOpen] = useState(false);

  return (
    <div className="pt-20">
      <section className="relative py-16 gradient-hero">
        <div className="max-w-7xl mx-auto px-4">
          <Breadcrumb items={[{ label: 'Doctors', href: '/doctors' }, { label: doctor.name }]} className="mb-4 text-blue-200 [&_*]:text-blue-200" />
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Badge variant="success" size="lg" className="mb-4 bg-white/20 text-white">Doctor Profile</Badge>
          </motion.div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <Card padding="lg">
                  <div className="flex flex-col sm:flex-row gap-6">
                    <div className="relative w-40 h-40 rounded-2xl overflow-hidden shrink-0">
                      <Image src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=300" alt={doctor.name} fill className="object-cover" />
                    </div>
                    <div className="flex-1">
                      <h1 className="text-3xl font-bold text-gray-900 font-heading mb-2">{doctor.name}</h1>
                      <p className="text-lg text-primary font-medium mb-3">{doctor.specialty}</p>
                      <div className="flex items-center gap-4 mb-4">
                        <div className="flex items-center gap-1">
                          <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                          <span className="font-semibold">{doctor.rating}</span>
                        </div>
                        <Badge variant="primary" size="sm">{doctor.experience} years experience</Badge>
                        <Badge variant="info" size="sm">{doctor.department}</Badge>
                      </div>
                      <p className="text-gray-600 leading-relaxed">{doctor.bio}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <Card padding="lg">
                  <h2 className="text-xl font-bold text-gray-900 font-heading mb-4">Education</h2>
                  <div className="space-y-2">
                    {doctor.education.split('\n').map((line: string, i: number) => (
                      <div key={i} className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                        <span className="text-gray-700">{line}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <Card padding="lg">
                  <h2 className="text-xl font-bold text-gray-900 font-heading mb-4">Certifications</h2>
                  <div className="space-y-2">
                    {doctor.certifications.split('\n').map((line: string, i: number) => (
                      <div key={i} className="flex items-start gap-3">
                        <Award className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                        <span className="text-gray-700">{line}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              </motion.div>
            </div>

            <div className="space-y-6">
              <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                <Card padding="md">
                  <h3 className="font-semibold text-gray-900 mb-4">Contact & Schedule</h3>
                  <div className="space-y-4 text-sm">
                    <div className="flex items-center gap-3">
                      <MapPin className="h-5 w-5 text-primary shrink-0" />
                      <div>
                        <p className="font-medium text-gray-900">Location</p>
                        <p className="text-gray-500">{doctor.location}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="h-5 w-5 text-primary shrink-0" />
                      <div>
                        <p className="font-medium text-gray-900">Availability</p>
                        <p className="text-gray-500">{doctor.availability}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="h-5 w-5 text-primary shrink-0" />
                      <div>
                        <p className="font-medium text-gray-900">Phone</p>
                        <p className="text-gray-500">{doctor.phone}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail className="h-5 w-5 text-primary shrink-0" />
                      <div>
                        <p className="font-medium text-gray-900">Email</p>
                        <p className="text-gray-500">{doctor.email}</p>
                      </div>
                    </div>
                    <div className="pt-2">
                      <p className="font-medium text-gray-900 mb-1">Languages</p>
                      <p className="text-gray-500">{doctor.languages}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>

              <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
                <Card padding="md" variant="primary" className="!bg-gradient-to-br !from-primary !to-primary-700 !text-white">
                  <h3 className="font-semibold mb-2">Consultation Fee</h3>
                  <p className="text-3xl font-bold mb-4">${doctor.fee}</p>
                  <Button className="bg-white text-primary hover:bg-blue-50 w-full mb-3" onClick={() => setBookModalOpen(true)}>
                    <Calendar className="h-4 w-4 mr-2" /> Book Appointment
                  </Button>
                  <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 w-full">
                    <Phone className="h-4 w-4 mr-2" /> Call for Inquiry
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
