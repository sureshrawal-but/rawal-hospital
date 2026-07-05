'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { HOSPITAL_INFO, DEPARTMENTS, SERVICES, FACILITIES, AWARDS, CORE_VALUES, ROUTES } from '@/lib/constants';
import { cn } from '@/lib/utils';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Accordion from '@/components/ui/Accordion';
import DoctorCard from '@/components/cards/DoctorCard';
import DepartmentCard from '@/components/cards/DepartmentCard';
import ServiceCard from '@/components/cards/ServiceCard';
import TestimonialCard from '@/components/cards/TestimonialCard';
import BlogCard from '@/components/cards/BlogCard';
import StatCard from '@/components/ui/StatCard';
import BookAppointmentModal from '@/components/modals/BookAppointmentModal';
import {
  ArrowRight, Phone, Calendar, Search, Stethoscope, Building2, Users,
  Award, Heart, CheckCircle, Star, Quote, Ambulance, Play, ChevronRight,
  Shield, Clock, MapPin, Mail, Activity
} from 'lucide-react';

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

const staggerContainer = {
  initial: {},
  whileInView: {},
  viewport: { once: true },
  variants: {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  },
};

const testimonials = [
  { patientName: 'Sarah Johnson', content: 'The care I received at Rawal Hospital was exceptional. The doctors were attentive and the staff was incredibly supportive throughout my treatment.', rating: 5, department: 'Cardiology' },
  { patientName: 'Michael Chen', content: 'I traveled from abroad for my surgery and Rawal Hospital exceeded my expectations. World-class facilities and compassionate care.', rating: 5, department: 'Orthopedics' },
  { patientName: 'Emily Davis', content: 'The maternity ward was fantastic. The nurses made my delivery experience so comfortable and safe. I am grateful to the entire team.', rating: 5, department: 'Gynecology' },
  { patientName: 'Robert Wilson', content: 'After years of back pain, the team at Rawal helped me regain my quality of life. Professional, skilled, and caring.', rating: 4, department: 'Neurology' },
];

const blogPosts = [
  { title: 'Understanding Heart Health: A Comprehensive Guide', slug: 'heart-health-guide', excerpt: 'Learn about the key factors that contribute to heart health and how to maintain a healthy cardiovascular system.', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600', author: 'Dr. John Smith', category: 'Cardiology', readTime: 5, publishedAt: '2024-12-15' },
  { title: 'The Importance of Regular Health Checkups', slug: 'regular-health-checkups', excerpt: 'Regular health screenings can detect potential health issues early when they are most treatable.', image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=600', author: 'Dr. Sarah Johnson', category: 'General Health', readTime: 4, publishedAt: '2024-12-10' },
  { title: 'Managing Stress for Better Mental Health', slug: 'stress-management', excerpt: 'Discover effective strategies for managing stress and improving your overall mental well-being.', image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600', author: 'Dr. Emily Brown', category: 'Mental Health', readTime: 6, publishedAt: '2024-12-05' },
];

const faqItems = [
  { id: '1', title: 'What are the hospital visiting hours?', content: 'Visiting hours are from 10:00 AM to 8:00 PM on weekdays and 11:00 AM to 6:00 PM on weekends. ICU and emergency visiting hours may vary. Please contact the front desk for specific department guidelines.' },
  { id: '2', title: 'How do I book an appointment?', content: 'You can book an appointment online through our website, call our appointment desk at +1 (555) 123-4567, or visit the hospital in person. Online booking is available 24/7 for your convenience.' },
  { id: '3', title: 'Does the hospital accept insurance?', content: 'Yes, we accept most major insurance plans including Aetna, Blue Cross, Cigna, UnitedHealthcare, and Medicare. Please bring your insurance card to your appointment for verification.' },
  { id: '4', title: 'What emergency services are available?', content: 'Our Emergency Department operates 24/7 with board-certified emergency physicians, trauma surgeons, and specialized nurses. We handle all medical emergencies from minor injuries to life-threatening conditions.' },
  { id: '5', title: 'Can I get a second opinion?', content: 'Absolutely. Our hospital encourages patients to seek second opinions. We have specialists across all departments who can provide comprehensive evaluations and treatment alternatives.' },
  { id: '6', title: 'What amenities are available for patients?', content: 'We offer private and semi-private rooms, WiFi, patient dining services, pharmacy, chapel, parking, wheelchair access, and translation services. Our patient relations team is always available to assist.' },
];

const galleryImages = [
  'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=400',
  'https://images.unsplash.com/photo-1551076805-e1869033e561?w=400',
  'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=400',
  'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=400',
  'https://images.unsplash.com/photo-1587351021759-3772687fe598?w=400',
  'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=400',
];

export default function HomePage() {
  const [bookModalOpen, setBookModalOpen] = useState(false);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 gradient-hero" />
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-300 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-accent/20 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 lg:py-40">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Badge variant="success" size="lg" className="mb-6">
                <Activity className="h-4 w-4 mr-1" />
                24/7 Emergency Services Available
              </Badge>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white font-heading leading-tight mb-6">
                Your Health Is Our{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-blue-100">
                  Top Priority
                </span>
              </h1>
              <p className="text-lg text-blue-100 max-w-xl mb-8 leading-relaxed">
                {HOSPITAL_INFO.description} With over 500+ beds, 150+ specialists, and cutting-edge technology, we are committed to your well-being.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button
                  size="lg"
                  className="bg-white text-primary hover:bg-blue-50 shadow-xl"
                  leftIcon={<Search className="h-5 w-5" />}
                  onClick={() => window.location.href = ROUTES.doctors}
                >
                  Find a Doctor
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/10"
                  leftIcon={<Calendar className="h-5 w-5" />}
                  onClick={() => setBookModalOpen(true)}
                >
                  Book Appointment
                </Button>
              </div>
              <div className="flex items-center gap-8 mt-10 text-blue-200">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-10 h-10 rounded-full bg-white/20 border-2 border-white/30 flex items-center justify-center">
                      <span className="text-white text-xs font-bold">R{i}</span>
                    </div>
                  ))}
                  <div className="w-10 h-10 rounded-full bg-white/30 border-2 border-white/50 flex items-center justify-center">
                    <span className="text-white text-xs font-bold">+2k</span>
                  </div>
                </div>
                <div>
                  <p className="text-white font-semibold">Trusted by 50,000+</p>
                  <p className="text-blue-200 text-sm">Patients and families</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="hidden lg:block"
            >
              <div className="relative">
                <div className="w-full h-[500px] rounded-3xl overflow-hidden shadow-2xl">
                  <Image
                    src="https://images.unsplash.com/photo-1551076805-e1869033e561?w=600"
                    alt="Modern hospital building"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -left-6 bg-white/90 backdrop-blur-xl rounded-2xl p-5 shadow-xl">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-xl bg-accent-50 flex items-center justify-center">
                      <Ambulance className="h-7 w-7 text-accent" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Emergency</p>
                      <p className="text-lg font-bold text-gray-900">{HOSPITAL_INFO.emergency}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Emergency Banner */}
      <div className="bg-red-600 py-3">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-center gap-4 text-white">
          <div className="flex items-center gap-2">
            <Phone className="h-5 w-5 animate-pulse" />
            <span className="font-semibold">Emergency Hotline:</span>
            <a href={`tel:${HOSPITAL_INFO.emergency}`} className="font-bold text-lg hover:underline">
              {HOSPITAL_INFO.emergency}
            </a>
          </div>
          <span className="hidden sm:inline text-white/60">|</span>
          <span className="text-sm text-white/80">24/7 Ambulance Services Available</span>
        </div>
      </div>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div className="grid grid-cols-2 md:grid-cols-4 gap-6" variants={staggerContainer} initial="initial" whileInView="animate">
            {[
              { value: '50,000+', label: 'Patients Served', icon: Users, color: '#1565C0' },
              { value: '150+', label: 'Expert Doctors', icon: Stethoscope, color: '#4caf50' },
              { value: '25+', label: 'Years Experience', icon: Award, color: '#f59e0b' },
              { value: '500+', label: 'Hospital Beds', icon: Building2, color: '#8b5cf6' },
            ].map((stat, i) => (
              <motion.div key={stat.label} variants={fadeInUp} className="bg-white rounded-2xl p-6 text-center border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3" style={{ backgroundColor: stat.color + '15' }}>
                  <stat.icon className="h-6 w-6" style={{ color: stat.color }} />
                </div>
                <p className="text-2xl font-bold text-gray-900 font-heading">{stat.value}</p>
                <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* About Preview */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div {...fadeInUp}>
              <Badge variant="primary" size="lg" className="mb-4">About Us</Badge>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 font-heading mb-6">
                Providing World-Class Healthcare Since 1999
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                Rawal Hospital has been at the forefront of medical excellence for over two decades. 
                We combine advanced medical technology with compassionate care to deliver the best 
                possible outcomes for our patients.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-8">
                {CORE_VALUES.slice(0, 4).map((value) => (
                  <div key={value.title} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">{value.title}</p>
                      <p className="text-xs text-gray-500">{value.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Link href={ROUTES.about}>
                <Button variant="primary">Learn More About Us <ArrowRight className="ml-2 h-4 w-4" /></Button>
              </Link>
            </motion.div>
            <motion.div {...fadeInUp} className="relative">
              <div className="relative h-[400px] rounded-2xl overflow-hidden">
                <Image src="https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=600" alt="Hospital interior" fill className="object-cover" />
              </div>
              <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl p-4 shadow-xl border border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-primary-50 flex items-center justify-center">
                    <Award className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900">JCI Accredited</p>
                    <p className="text-xs text-gray-500">International Standards</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div className="text-center max-w-2xl mx-auto mb-12" {...fadeInUp}>
            <Badge variant="primary" size="lg" className="mb-4">Our Services</Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 font-heading mb-4">
              Comprehensive Medical Services
            </h2>
            <p className="text-gray-600">We offer a wide range of medical services to meet all your healthcare needs under one roof.</p>
          </motion.div>
          <motion.div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6" variants={staggerContainer} initial="initial" whileInView="animate">
            {SERVICES.map((service) => (
              <motion.div key={service.id} variants={fadeInUp}>
                <ServiceCard {...service} />
              </motion.div>
            ))}
          </motion.div>
          <motion.div className="text-center mt-10" {...fadeInUp}>
            <Link href={ROUTES.services}>
              <Button variant="outline" size="lg">View All Services <ArrowRight className="ml-2 h-4 w-4" /></Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Departments Preview */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div className="text-center max-w-2xl mx-auto mb-12" {...fadeInUp}>
            <Badge variant="primary" size="lg" className="mb-4">Departments</Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 font-heading mb-4">
              Specialized Medical Departments
            </h2>
            <p className="text-gray-600">Our hospital houses multiple specialized departments led by experienced medical professionals.</p>
          </motion.div>
          <motion.div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" variants={staggerContainer} initial="initial" whileInView="animate">
            {DEPARTMENTS.slice(0, 8).map((dept) => (
              <motion.div key={dept.id} variants={fadeInUp}>
                <DepartmentCard {...dept} />
              </motion.div>
            ))}
          </motion.div>
          <motion.div className="text-center mt-10" {...fadeInUp}>
            <Link href={ROUTES.departments}>
              <Button variant="outline" size="lg">View All Departments <ArrowRight className="ml-2 h-4 w-4" /></Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Doctors Carousel */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div className="text-center max-w-2xl mx-auto mb-12" {...fadeInUp}>
            <Badge variant="primary" size="lg" className="mb-4">Our Doctors</Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 font-heading mb-4">
              Meet Our Expert Specialists
            </h2>
            <p className="text-gray-600">Our team of 150+ qualified doctors are dedicated to providing exceptional care.</p>
          </motion.div>
          <motion.div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" variants={staggerContainer} initial="initial" whileInView="animate">
            {[
              { id: '1', name: 'Dr. John Smith', specialty: 'Cardiologist', rating: 4.9, experience: 18, department: 'Cardiology', location: 'Main Campus', availability: 'Mon-Fri' },
              { id: '2', name: 'Dr. Sarah Johnson', specialty: 'Neurologist', rating: 4.8, experience: 15, department: 'Neurology', location: 'Main Campus', availability: 'Mon-Sat' },
              { id: '3', name: 'Dr. Michael Chen', specialty: 'Orthopedic Surgeon', rating: 4.9, experience: 20, department: 'Orthopedics', location: 'Main Campus', availability: 'Mon-Fri' },
              { id: '4', name: 'Dr. Emily Brown', specialty: 'Pediatrician', rating: 4.7, experience: 12, department: 'Pediatrics', location: 'Downtown', availability: 'Tue-Sat' },
            ].map((doctor) => (
              <motion.div key={doctor.id} variants={fadeInUp}>
                <DoctorCard {...doctor} />
              </motion.div>
            ))}
          </motion.div>
          <motion.div className="text-center mt-10" {...fadeInUp}>
            <Link href={ROUTES.doctors}>
              <Button variant="outline" size="lg">View All Doctors <ArrowRight className="ml-2 h-4 w-4" /></Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div className="text-center max-w-2xl mx-auto mb-12" {...fadeInUp}>
            <Badge variant="primary" size="lg" className="mb-4">Testimonials</Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 font-heading mb-4">
              What Our Patients Say
            </h2>
            <p className="text-gray-600">Hear from our patients about their experience at Rawal Hospital.</p>
          </motion.div>
          <motion.div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6" variants={staggerContainer} initial="initial" whileInView="animate">
            {testimonials.map((t, i) => (
              <motion.div key={i} variants={fadeInUp}>
                <TestimonialCard {...t} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Facilities */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div className="text-center max-w-2xl mx-auto mb-12" {...fadeInUp}>
            <Badge variant="primary" size="lg" className="mb-4">Facilities</Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 font-heading mb-4">
              State-of-the-Art Facilities
            </h2>
            <p className="text-gray-600">We provide modern facilities to ensure a comfortable and safe experience.</p>
          </motion.div>
          <motion.div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6" variants={staggerContainer} initial="initial" whileInView="animate">
            {FACILITIES.map((facility, i) => (
              <motion.div key={i} variants={fadeInUp} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-primary-50 flex items-center justify-center mb-4">
                  <Heart className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{facility.title}</h3>
                <p className="text-sm text-gray-500">{facility.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Health Tips / Blog */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div className="text-center max-w-2xl mx-auto mb-12" {...fadeInUp}>
            <Badge variant="primary" size="lg" className="mb-4">Health Tips</Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 font-heading mb-4">
              Latest Health Articles
            </h2>
            <p className="text-gray-600">Stay informed with expert health advice and hospital updates.</p>
          </motion.div>
          <motion.div className="grid md:grid-cols-3 gap-8" variants={staggerContainer} initial="initial" whileInView="animate">
            {blogPosts.map((post) => (
              <motion.div key={post.slug} variants={fadeInUp}>
                <BlogCard {...post} />
              </motion.div>
            ))}
          </motion.div>
          <motion.div className="text-center mt-10" {...fadeInUp}>
            <Link href={ROUTES.blog}>
              <Button variant="outline" size="lg">View All Articles <ArrowRight className="ml-2 h-4 w-4" /></Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4">
          <motion.div className="text-center max-w-2xl mx-auto mb-12" {...fadeInUp}>
            <Badge variant="primary" size="lg" className="mb-4">FAQ</Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 font-heading mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-600">Find answers to commonly asked questions about our hospital and services.</p>
          </motion.div>
          <motion.div {...fadeInUp}>
            <Accordion items={faqItems} />
          </motion.div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div className="text-center max-w-2xl mx-auto mb-12" {...fadeInUp}>
            <Badge variant="primary" size="lg" className="mb-4">Gallery</Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 font-heading mb-4">
              Our Hospital in Pictures
            </h2>
            <p className="text-gray-600">Take a visual tour of our facilities and environment.</p>
          </motion.div>
          <motion.div className="grid grid-cols-2 md:grid-cols-3 gap-4" variants={staggerContainer} initial="initial" whileInView="animate">
            {galleryImages.map((img, i) => (
              <motion.div key={i} variants={fadeInUp} className="relative h-48 rounded-2xl overflow-hidden group cursor-pointer">
                <Image src={img} alt={`Gallery ${i + 1}`} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Awards */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div className="text-center mb-10" {...fadeInUp}>
            <Badge variant="primary" size="lg" className="mb-4">Accreditations</Badge>
            <h2 className="text-3xl font-bold text-gray-900 font-heading mb-2">Awards & Recognition</h2>
          </motion.div>
          <motion.div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4" variants={staggerContainer} initial="initial" whileInView="animate">
            {AWARDS.map((award, i) => (
              <motion.div key={i} variants={fadeInUp} className="bg-white rounded-2xl p-5 text-center border border-gray-100 shadow-sm">
                <Award className="h-8 w-8 text-primary mx-auto mb-2" />
                <p className="text-2xl font-bold text-primary font-heading">{award.year}</p>
                <p className="text-sm font-semibold text-gray-900 mt-1">{award.title}</p>
                <p className="text-xs text-gray-500 mt-1">{award.organization}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-64 h-64 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-blue-200 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <motion.div {...fadeInUp}>
            <Badge variant="success" size="lg" className="mb-6 bg-white/20 text-white border-white/30">
              24/7 Appointment Booking
            </Badge>
            <h2 className="text-3xl lg:text-5xl font-bold text-white font-heading mb-6 leading-tight">
              Ready to Prioritize Your Health?
            </h2>
            <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
              Schedule an appointment with our expert doctors today. We are here to provide you with the best medical care.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                size="lg"
                className="bg-white text-primary hover:bg-blue-50 shadow-xl"
                leftIcon={<Calendar className="h-5 w-5" />}
                onClick={() => setBookModalOpen(true)}
              >
                Book Appointment Now
              </Button>
              <Link href={ROUTES.contact}>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/10"
                  leftIcon={<Phone className="h-5 w-5" />}
                >
                  Contact Us
                </Button>
              </Link>
            </div>
            <p className="text-blue-200 mt-6 text-sm">
              Or call us at <a href={`tel:${HOSPITAL_INFO.phone}`} className="font-bold text-white underline">{HOSPITAL_INFO.phone}</a>
            </p>
          </motion.div>
        </div>
      </section>

      <BookAppointmentModal isOpen={bookModalOpen} onClose={() => setBookModalOpen(false)} />
    </div>
  );
}
