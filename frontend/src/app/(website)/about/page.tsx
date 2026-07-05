'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { HOSPITAL_INFO, CORE_VALUES, AWARDS } from '@/lib/constants';
import Badge from '@/components/ui/Badge';
import Card from '@/components/ui/Card';
import Timeline from '@/components/ui/Timeline';
import { Heart, Shield, Star, Users, Target, Eye, Award, Quote } from 'lucide-react';

const fadeInUp = { initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.5 } };

const journey = [
  { id: '1', title: 'Foundation', description: 'Rawal Hospital was founded with a vision to provide quality healthcare.', date: '1999', status: 'completed' as const },
  { id: '2', title: 'First Expansion', description: 'Added 100 new beds and established cardiology department.', date: '2005', status: 'completed' as const },
  { id: '3', title: 'JCI Accreditation', description: 'Achieved international healthcare quality standards.', date: '2010', status: 'completed' as const },
  { id: '4', title: 'Research Center', description: 'Established medical research and training center.', date: '2015', status: 'completed' as const },
  { id: '5', title: 'Digital Transformation', description: 'Implemented EHR and telemedicine services.', date: '2020', status: 'completed' as const },
  { id: '6', title: 'Future Vision 2030', description: 'Expanding to become the region\'s leading healthcare provider.', date: '2030', status: 'current' as const },
];

export default function AboutPage() {
  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative py-20 gradient-hero">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.div {...fadeInUp}>
            <Badge variant="success" size="lg" className="mb-4 bg-white/20 text-white">About Us</Badge>
            <h1 className="text-4xl lg:text-5xl font-bold text-white font-heading mb-4">About Rawal Hospital</h1>
            <p className="text-lg text-blue-100 max-w-2xl mx-auto">Dedicated to providing exceptional healthcare with compassion and innovation for over 25 years.</p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div {...fadeInUp}>
              <Card variant="elevated" padding="lg">
                <Target className="h-10 w-10 text-primary mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 font-heading mb-3">Our Mission</h3>
                <p className="text-gray-600 leading-relaxed">To provide compassionate, high-quality healthcare that is accessible to all, while advancing medical knowledge through research and education.</p>
              </Card>
            </motion.div>
            <motion.div {...fadeInUp}>
              <Card variant="elevated" padding="lg">
                <Eye className="h-10 w-10 text-primary mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 font-heading mb-3">Our Vision</h3>
                <p className="text-gray-600 leading-relaxed">To be the region's most trusted healthcare provider, recognized for clinical excellence, patient satisfaction, and innovative medical practices.</p>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: '25+', label: 'Years of Service' },
              { value: '150+', label: 'Expert Doctors' },
              { value: '50,000+', label: 'Patients Treated' },
              { value: '98%', label: 'Patient Satisfaction' },
            ].map((stat, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <p className="text-4xl font-bold text-primary font-heading">{stat.value}</p>
                <p className="text-gray-500 mt-2">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Chairman & CEO Message */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div {...fadeInUp}>
              <div className="relative h-[400px] rounded-2xl overflow-hidden">
                <Image src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=500" alt="Chairman" fill className="object-cover" />
              </div>
            </motion.div>
            <motion.div {...fadeInUp}>
              <Quote className="h-10 w-10 text-primary-200 mb-4" />
              <h2 className="text-3xl font-bold text-gray-900 font-heading mb-4">Message from the Chairman</h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                At Rawal Hospital, we believe that healthcare is a fundamental right. Our journey over the past 25 years has been driven by a singular vision: to make world-class medical care accessible to every individual who walks through our doors. We have invested in cutting-edge technology, brought together a team of exceptional medical professionals, and created an environment where compassion meets clinical excellence.
              </p>
              <div>
                <p className="font-semibold text-gray-900">Mr. Rawal Ahmed</p>
                <p className="text-sm text-gray-500">Chairman, Rawal Hospital</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div className="text-center max-w-2xl mx-auto mb-12" {...fadeInUp}>
            <Badge variant="primary" size="lg" className="mb-4">Values</Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 font-heading mb-4">Our Core Values</h2>
            <p className="text-gray-600">These principles guide everything we do at Rawal Hospital.</p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {CORE_VALUES.map((value, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <Card variant="bordered" padding="md">
                  <div className="w-12 h-12 rounded-xl bg-primary-50 flex items-center justify-center mb-4">
                    <Heart className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{value.title}</h3>
                  <p className="text-sm text-gray-500">{value.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Journey Timeline */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div className="text-center max-w-2xl mx-auto mb-12" {...fadeInUp}>
            <Badge variant="primary" size="lg" className="mb-4">Our Journey</Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 font-heading mb-4">Our Story</h2>
            <p className="text-gray-600">From a small clinic to a multi-specialty hospital.</p>
          </motion.div>
          <Timeline items={journey} />
        </div>
      </section>

      {/* Awards */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div className="text-center max-w-2xl mx-auto mb-12" {...fadeInUp}>
            <Badge variant="primary" size="lg" className="mb-4">Recognition</Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 font-heading mb-4">Awards & Accreditations</h2>
            <p className="text-gray-600">Our commitment to excellence has been recognized nationally and internationally.</p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {AWARDS.map((award, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="bg-white rounded-2xl p-6 text-center border border-gray-100 shadow-sm">
                <Award className="h-8 w-8 text-primary mx-auto mb-2" />
                <p className="text-2xl font-bold text-primary font-heading">{award.year}</p>
                <p className="text-sm font-semibold text-gray-900 mt-1">{award.title}</p>
                <p className="text-xs text-gray-500 mt-1">{award.organization}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
