'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { HOSPITAL_INFO, SERVICES, CORE_VALUES, ROUTES } from '@/lib/constants';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import BookAppointmentModal from '@/components/modals/BookAppointmentModal';
import { ArrowRight, Phone, Calendar, Search, Users, Award, Heart, Shield, Star, Activity } from 'lucide-react';

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-50px' },
  transition: { duration: 0.5 },
};

const testimonials = [
  { name: 'Sarah Johnson', text: 'The care I received was exceptional. The doctors were attentive and the staff was incredibly supportive throughout my treatment.', role: 'Cardiology Patient', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150' },
  { name: 'Michael Chen', text: 'I traveled from abroad for my surgery and Rawal Hospital exceeded my expectations. World-class facilities and compassionate care.', role: 'Orthopedics Patient', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150' },
];

const stats = [
  { value: '50,000+', label: 'Patients Served', icon: Users },
  { value: '150+', label: 'Expert Doctors', icon: Activity },
  { value: '25+', label: 'Years Experience', icon: Award },
  { value: '500+', label: 'Hospital Beds', icon: Heart },
];

export default function HomePage() {
  const [bookModalOpen, setBookModalOpen] = useState(false);

  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900" />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 right-20 w-96 h-96 bg-primary-500/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-40 left-20 w-72 h-72 bg-amber-500/10 rounded-full blur-[120px]" />
        </div>
        <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 lg:py-40">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <Badge variant="success" size="lg" className="mb-5">
                <Activity className="h-4 w-4 mr-1.5" /> 24/7 Emergency Services
              </Badge>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white font-heading leading-tight mb-5">
                Your Health,{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Our Priority</span>
              </h1>
              <p className="text-base sm:text-lg text-gray-300 max-w-xl mb-8 leading-relaxed">
                Providing compassionate, high-quality healthcare for over 25 years. {HOSPITAL_INFO.beds}+ beds, {HOSPITAL_INFO.doctors}+ specialists, cutting-edge technology.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button size="lg" leftIcon={<Search className="h-5 w-5" />} onClick={() => window.location.href = ROUTES.doctors}>
                  Find a Doctor
                </Button>
                <Button size="lg" variant="outline" leftIcon={<Calendar className="h-5 w-5" />} onClick={() => setBookModalOpen(true)}>
                  Book Appointment
                </Button>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="hidden lg:block"
            >
              <div className="relative">
                <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl shadow-primary-500/10">
                  <Image src="https://images.unsplash.com/photo-1551076805-e1869033e561?w=600" alt="Rawal Hospital" fill sizes="50vw" priority className="object-cover" />
                </div>
                <div className="absolute -bottom-4 -left-4 bg-dark-700/90 backdrop-blur border border-gray-700/30 rounded-xl p-4 shadow-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center">
                      <Phone className="h-6 w-6 text-amber-400" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Emergency</p>
                      <p className="text-sm font-bold text-white">{HOSPITAL_INFO.emergency}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-dark-800/40">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="text-center">
                <stat.icon className="h-6 w-6 text-primary-400 mx-auto mb-3" />
                <p className="text-3xl font-bold text-white font-heading">{stat.value}</p>
                <p className="text-sm text-gray-400 mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div className="text-center max-w-2xl mx-auto mb-14" {...fadeUp}>
            <Badge variant="primary" size="lg" className="mb-4">Our Services</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-white font-heading mb-3">Comprehensive Medical Care</h2>
            <p className="text-gray-400">A full range of healthcare services delivered with compassion and cutting-edge technology.</p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {SERVICES.slice(0, 6).map((service, i) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="group bg-dark-700 border border-gray-700/50 rounded-xl p-6 hover:border-primary-500/30 hover:shadow-lg hover:shadow-primary-500/5 transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-lg bg-primary-500/10 flex items-center justify-center mb-4 group-hover:bg-primary-500/20 transition-colors">
                  <div className="h-5 w-5 rounded-full" style={{ backgroundColor: service.color }} />
                </div>
                <h3 className="text-white font-semibold mb-2">{service.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{service.description}</p>
              </motion.div>
            ))}
          </div>
          <motion.div className="text-center mt-10" {...fadeUp}>
            <Link href={ROUTES.services}><Button variant="outline">View All Services <ArrowRight className="ml-2 h-4 w-4" /></Button></Link>
          </motion.div>
        </div>
      </section>

      {/* Why Us */}
      <section className="py-24 bg-dark-800/30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div {...fadeUp}>
              <Badge variant="primary" size="lg" className="mb-4">Why Rawal Hospital</Badge>
              <h2 className="text-3xl sm:text-4xl font-bold text-white font-heading mb-5">Excellence in Healthcare Since 1999</h2>
              <p className="text-gray-400 mb-8 leading-relaxed">For over two decades, we have combined advanced medical technology with compassionate care to serve our community.</p>
              <div className="space-y-4">
                {CORE_VALUES.slice(0, 4).map((v) => (
                  <div key={v.title} className="flex items-start gap-3">
                    <Shield className="h-5 w-5 text-primary-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-white font-medium">{v.title}</p>
                      <p className="text-sm text-gray-400">{v.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div {...fadeUp} className="relative">
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-xl">
                <Image src="https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=600" alt="Hospital interior" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
              </div>
              <div className="absolute -bottom-4 -right-4 bg-dark-700 border border-gray-700/50 rounded-xl p-4 shadow-xl">
                <div className="flex items-center gap-3">
                  <Star className="h-5 w-5 text-amber-400" />
                  <div>
                    <p className="text-sm font-bold text-white">JCI Accredited</p>
                    <p className="text-xs text-gray-400">International Standards</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div className="text-center max-w-2xl mx-auto mb-14" {...fadeUp}>
            <Badge variant="primary" size="lg" className="mb-4">Testimonials</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-white font-heading mb-3">What Our Patients Say</h2>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-dark-700 border border-gray-700/50 rounded-xl p-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden">
                    <Image src={t.image} alt={t.name} fill sizes="40px" className="object-cover" />
                  </div>
                  <div>
                    <p className="text-white font-medium text-sm">{t.name}</p>
                    <p className="text-xs text-gray-400">{t.role}</p>
                  </div>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed italic">&ldquo;{t.text}&rdquo;</p>
                <div className="flex gap-1 mt-3">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0">
          <Image src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1200" alt="" fill className="object-cover" sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-r from-dark-900/95 via-dark-900/90 to-dark-900/95" />
        </div>
        <div className="relative max-w-3xl mx-auto px-4 text-center">
          <motion.div {...fadeUp}>
            <Badge variant="success" size="lg" className="mb-5">Book Online 24/7</Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white font-heading mb-4 leading-tight">Ready to Prioritize Your Health?</h2>
            <p className="text-gray-300 mb-8 max-w-xl mx-auto">Schedule an appointment with our expert doctors. We are here to provide you with the best medical care.</p>
            <div className="flex flex-wrap justify-center gap-3">
              <Button size="lg" leftIcon={<Calendar className="h-5 w-5" />} onClick={() => setBookModalOpen(true)}>
                Book Appointment
              </Button>
              <Link href={ROUTES.contact}>
                <Button size="lg" variant="outline" leftIcon={<Phone className="h-5 w-5" />}>Contact Us</Button>
              </Link>
            </div>
            <p className="text-gray-500 mt-5 text-sm">Or call <a href={`tel:${HOSPITAL_INFO.phone}`} className="text-primary-400 font-medium hover:underline">{HOSPITAL_INFO.phone}</a></p>
          </motion.div>
        </div>
      </section>

      <BookAppointmentModal isOpen={bookModalOpen} onClose={() => setBookModalOpen(false)} />
    </div>
  );
}
