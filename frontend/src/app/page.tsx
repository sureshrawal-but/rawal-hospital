'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { HOSPITAL_INFO, DEPARTMENTS, SERVICES, FACILITIES, AWARDS, CORE_VALUES, ROUTES } from '@/lib/constants';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import Accordion from '@/components/ui/Accordion';
import DoctorCard from '@/components/cards/DoctorCard';
import DepartmentCard from '@/components/cards/DepartmentCard';
import ServiceCard from '@/components/cards/ServiceCard';
import TestimonialCard from '@/components/cards/TestimonialCard';
import BlogCard from '@/components/cards/BlogCard';
import BookAppointmentModal from '@/components/modals/BookAppointmentModal';
import { ArrowRight, Phone, Calendar, Search, Users, Award, Heart, CheckCircle, Ambulance, Activity, Star, Shield, Zap } from 'lucide-react';

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-50px' },
  transition: { duration: 0.5 },
};

const stagger = {
  initial: {},
  whileInView: {},
  viewport: { once: true, margin: '-50px' },
  variants: { initial: { opacity: 0 }, animate: { opacity: 1, transition: { staggerChildren: 0.08 } } },
};

const testimonials = [
  { patientName: 'Sarah Johnson', content: 'The care I received at Rawal Hospital was exceptional. The doctors were attentive and the staff was incredibly supportive throughout my treatment.', rating: 5, department: 'Cardiology', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150' },
  { patientName: 'Michael Chen', content: 'I traveled from abroad for my surgery and Rawal Hospital exceeded my expectations. World-class facilities and compassionate care.', rating: 5, department: 'Orthopedics', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150' },
  { patientName: 'Emily Davis', content: 'The maternity ward was fantastic. The nurses made my delivery experience so comfortable and safe. I am grateful to the entire team.', rating: 5, department: 'Gynecology', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150' },
  { patientName: 'Robert Wilson', content: 'After years of back pain, the team at Rawal helped me regain my quality of life. Professional, skilled, and caring.', rating: 4, department: 'Neurology', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150' },
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

const SectionHeading = ({ label, title, description }: { label: string; title: string; description: string }) => (
  <motion.div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12" {...fadeUp}>
    <Badge variant="primary" size="lg" className="mb-4">{label}</Badge>
    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white font-heading mb-3">{title}</h2>
    <p className="text-sm sm:text-base text-gray-400">{description}</p>
  </motion.div>
);

export default function HomePage() {
  const [bookModalOpen, setBookModalOpen] = useState(false);

  const doctors = useMemo(() => [
    { id: '1', name: 'Dr. John Smith', specialty: 'Cardiologist', rating: 4.9, experience: 18, department: 'Cardiology', location: 'Main Campus', availability: 'Mon-Fri' },
    { id: '2', name: 'Dr. Sarah Johnson', specialty: 'Neurologist', rating: 4.8, experience: 15, department: 'Neurology', location: 'Main Campus', availability: 'Mon-Sat' },
    { id: '3', name: 'Dr. Michael Chen', specialty: 'Orthopedic Surgeon', rating: 4.9, experience: 20, department: 'Orthopedics', location: 'Main Campus', availability: 'Mon-Fri' },
    { id: '4', name: 'Dr. Emily Brown', specialty: 'Pediatrician', rating: 4.7, experience: 12, department: 'Pediatrics', location: 'Downtown', availability: 'Tue-Sat' },
  ], []);

  const stats = useMemo(() => [
    { value: '50,000+', label: 'Patients Served', icon: Users, color: '#3b82f6' },
    { value: '150+', label: 'Expert Doctors', icon: Activity, color: '#f59e0b' },
    { value: '25+', label: 'Years Experience', icon: Award, color: '#8b5cf6' },
    { value: '500+', label: 'Hospital Beds', icon: Heart, color: '#ec4899' },
  ], []);

  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-[85vh] sm:min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900" />
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 right-20 w-96 h-96 bg-primary-500/10 rounded-full blur-[100px]" />
          <div className="absolute bottom-40 left-20 w-72 h-72 bg-amber-500/10 rounded-full blur-[100px]" />
        </div>
        <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 lg:py-40">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <Badge variant="success" size="lg" className="mb-5">
                <Zap className="h-4 w-4 mr-1.5" /> 24/7 Emergency Services Available
              </Badge>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white font-heading leading-tight mb-5">
                Your Health Is Our{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Top Priority</span>
              </h1>
              <p className="text-base sm:text-lg text-gray-300 max-w-xl mb-7 leading-relaxed">
                {HOSPITAL_INFO.description} With over 500+ beds, 150+ specialists, and cutting-edge technology, we are committed to your well-being.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button size="lg" leftIcon={<Search className="h-5 w-5" />} onClick={() => window.location.href = ROUTES.doctors}>
                  Find a Doctor
                </Button>
                <Button size="lg" variant="outline" leftIcon={<Calendar className="h-5 w-5" />} onClick={() => setBookModalOpen(true)}>
                  Book Appointment
                </Button>
              </div>
              <div className="flex items-center gap-6 mt-8 sm:mt-10 text-gray-400">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-dark-600 border-2 border-dark-500 flex items-center justify-center">
                      <span className="text-gray-300 text-[10px] sm:text-xs font-bold">R{i}</span>
                    </div>
                  ))}
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-dark-600 border-2 border-dark-500 flex items-center justify-center">
                    <span className="text-gray-300 text-[10px] sm:text-xs font-bold">+2k</span>
                  </div>
                </div>
                <div>
                  <p className="text-white font-semibold text-sm sm:text-base">Trusted by 50,000+</p>
                  <p className="text-gray-400 text-xs sm:text-sm">Patients and families</p>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="hidden lg:block"
            >
              <div className="relative">
                <div className="w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl shadow-primary-500/10">
                  <Image src="https://images.unsplash.com/photo-1551076805-e1869033e561?w=600" alt="Modern hospital building" fill sizes="(max-width: 1024px) 0px, 50vw" priority className="object-cover" />
                </div>
                <div className="absolute -bottom-5 -left-5 bg-dark-700/90 backdrop-blur-xl border border-gray-700/30 rounded-2xl p-4 sm:p-5 shadow-xl">
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-amber-500/20 flex items-center justify-center">
                      <Ambulance className="h-6 w-6 sm:h-7 sm:w-7 text-amber-400" />
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm text-gray-400">Emergency</p>
                      <p className="text-base sm:text-lg font-bold text-white">{HOSPITAL_INFO.emergency}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Emergency Banner */}
      <div className="bg-gradient-to-r from-amber-600/90 to-amber-700/90 py-3 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-white text-center sm:text-left">
          <div className="flex items-center gap-2">
            <Phone className="h-5 w-5 animate-pulse shrink-0" />
            <span className="font-semibold text-sm sm:text-base">Emergency Hotline:</span>
            <a href={`tel:${HOSPITAL_INFO.emergency}`} className="font-bold text-base sm:text-lg hover:underline">{HOSPITAL_INFO.emergency}</a>
          </div>
          <span className="hidden sm:inline text-white/50">|</span>
          <span className="text-xs sm:text-sm text-white/80">24/7 Ambulance Services Available</span>
        </div>
      </div>

      {/* Stats */}
      <section className="py-12 sm:py-16 bg-dark-800/50 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1551076805-e1869033e561?w=1200)', backgroundSize: 'cover', backgroundPosition: 'center' }} />
        <div className="max-w-7xl mx-auto px-4">
          <motion.div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6" variants={stagger} initial="initial" whileInView="animate">
            {stats.map((stat) => (
              <motion.div key={stat.label} variants={fadeUp} className="bg-dark-700 rounded-2xl p-5 sm:p-6 text-center border border-gray-700/50 shadow-lg hover:shadow-primary-500/5 hover:border-primary-500/20 transition-all">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center mx-auto mb-3" style={{ backgroundColor: stat.color + '20' }}>
                  <stat.icon className="h-5 w-5 sm:h-6 sm:w-6" style={{ color: stat.color }} />
                </div>
                <p className="text-xl sm:text-2xl font-bold text-white font-heading">{stat.value}</p>
                <p className="text-xs sm:text-sm text-gray-400 mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* About */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <motion.div {...fadeUp}>
              <Badge variant="primary" size="lg" className="mb-4">About Us</Badge>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white font-heading mb-5">Providing World-Class Healthcare Since 1999</h2>
              <p className="text-sm sm:text-base text-gray-400 leading-relaxed mb-6">
                Rawal Hospital has been at the forefront of medical excellence for over two decades. We combine advanced medical technology with compassionate care.
              </p>
              <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-8">
                {CORE_VALUES.slice(0, 4).map((value) => (
                  <div key={value.title} className="flex items-start gap-2.5">
                    <CheckCircle className="h-5 w-5 text-primary-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-white text-xs sm:text-sm">{value.title}</p>
                      <p className="text-[11px] sm:text-xs text-gray-400">{value.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Link href={ROUTES.about}>
                <Button variant="primary" size="sm" className="sm:text-sm">Learn More About Us <ArrowRight className="ml-2 h-4 w-4" /></Button>
              </Link>
            </motion.div>
            <motion.div {...fadeUp} className="relative">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl shadow-primary-500/5">
                <Image src="https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=600" alt="Hospital interior" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
              </div>
              <div className="absolute -bottom-3 -left-3 bg-dark-700 border border-gray-700/50 rounded-2xl p-3 sm:p-4 shadow-xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-primary-500/20 flex items-center justify-center">
                    <Award className="h-5 w-5 sm:h-6 sm:w-6 text-primary-400" />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm font-bold text-white">JCI Accredited</p>
                    <p className="text-[10px] sm:text-xs text-gray-400">International Standards</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 sm:py-20 bg-dark-800/30">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeading label="Our Services" title="Comprehensive Medical Services" description="We offer a wide range of medical services to meet all your healthcare needs under one roof." />
          <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6" variants={stagger} initial="initial" whileInView="animate">
            {SERVICES.map((service) => (
              <motion.div key={service.id} variants={fadeUp}><ServiceCard {...service} /></motion.div>
            ))}
          </motion.div>
          <motion.div className="text-center mt-8 sm:mt-10" {...fadeUp}>
            <Link href={ROUTES.services}><Button variant="outline" size="sm sm:text-base">View All Services <ArrowRight className="ml-2 h-4 w-4" /></Button></Link>
          </motion.div>
        </div>
      </section>

      {/* Departments */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeading label="Departments" title="Specialized Medical Departments" description="Our hospital houses multiple specialized departments led by experienced medical professionals." />
          <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6" variants={stagger} initial="initial" whileInView="animate">
            {DEPARTMENTS.slice(0, 8).map((dept) => (
              <motion.div key={dept.id} variants={fadeUp}><DepartmentCard {...dept} /></motion.div>
            ))}
          </motion.div>
          <motion.div className="text-center mt-8 sm:mt-10" {...fadeUp}>
            <Link href={ROUTES.departments}><Button variant="outline" size="sm sm:text-base">View All Departments <ArrowRight className="ml-2 h-4 w-4" /></Button></Link>
          </motion.div>
        </div>
      </section>

      {/* Doctors */}
      <section className="py-16 sm:py-20 bg-dark-800/30">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeading label="Our Doctors" title="Meet Our Expert Specialists" description="Our team of 150+ qualified doctors are dedicated to providing exceptional care." />
          <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6" variants={stagger} initial="initial" whileInView="animate">
            {doctors.map((doctor) => (
              <motion.div key={doctor.id} variants={fadeUp}><DoctorCard {...doctor} /></motion.div>
            ))}
          </motion.div>
          <motion.div className="text-center mt-8 sm:mt-10" {...fadeUp}>
            <Link href={ROUTES.doctors}><Button variant="outline" size="sm sm:text-base">View All Doctors <ArrowRight className="ml-2 h-4 w-4" /></Button></Link>
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeading label="Testimonials" title="What Our Patients Say" description="Hear from our patients about their experience at Rawal Hospital." />
          <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6" variants={stagger} initial="initial" whileInView="animate">
            {testimonials.map((t, i) => (
              <motion.div key={i} variants={fadeUp}><TestimonialCard {...t} /></motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Facilities */}
      <section className="py-16 sm:py-20 bg-dark-800/30">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeading label="Facilities" title="State-of-the-Art Facilities" description="We provide modern facilities to ensure a comfortable and safe experience." />
          <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6" variants={stagger} initial="initial" whileInView="animate">
            {FACILITIES.map((facility, i) => (
              <motion.div key={i} variants={fadeUp} className="bg-dark-700 rounded-2xl p-5 sm:p-6 border border-gray-700/50 shadow-lg hover:shadow-primary-500/5 hover:border-primary-500/20 transition-all">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-primary-500/20 flex items-center justify-center mb-3 sm:mb-4">
                  <Heart className="h-5 w-5 sm:h-6 sm:w-6 text-primary-400" />
                </div>
                <h3 className="font-semibold text-white text-sm sm:text-base mb-1.5">{facility.title}</h3>
                <p className="text-xs sm:text-sm text-gray-400">{facility.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Blog */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeading label="Health Tips" title="Latest Health Articles" description="Stay informed with expert health advice and hospital updates." />
          <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8" variants={stagger} initial="initial" whileInView="animate">
            {blogPosts.map((post) => (
              <motion.div key={post.slug} variants={fadeUp}><BlogCard {...post} /></motion.div>
            ))}
          </motion.div>
          <motion.div className="text-center mt-8 sm:mt-10" {...fadeUp}>
            <Link href={ROUTES.blog}><Button variant="outline" size="sm sm:text-base">View All Articles <ArrowRight className="ml-2 h-4 w-4" /></Button></Link>
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 sm:py-20 bg-dark-800/30">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeading label="FAQ" title="Frequently Asked Questions" description="Find answers to commonly asked questions about our hospital and services." />
          <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-start">
            <motion.div className="lg:col-span-3" {...fadeUp}><Accordion items={faqItems} /></motion.div>
            <motion.div {...fadeUp} className="hidden lg:block lg:col-span-2">
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-xl shadow-primary-500/5">
                <Image src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=600" alt="Medical consultation" fill sizes="(max-width: 1024px) 0px, 33vw" className="object-cover" />
              </div>
              <div className="mt-4 bg-dark-700 border border-gray-700/50 rounded-2xl p-5 text-center">
                <p className="text-sm text-gray-400">Have more questions?</p>
                <Link href={ROUTES.contact}><Button variant="outline" size="sm" className="mt-2">Contact Us</Button></Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeading label="Gallery" title="Our Hospital in Pictures" description="Take a visual tour of our facilities and environment." />
          <motion.div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4" variants={stagger} initial="initial" whileInView="animate">
            {galleryImages.map((img, i) => (
              <motion.div key={i} variants={fadeUp} className="relative aspect-square rounded-xl sm:rounded-2xl overflow-hidden group cursor-pointer border border-gray-700/30">
                <Image src={img} alt={`Gallery ${i + 1}`} fill sizes="(max-width: 768px) 50vw, 33vw" className="object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Awards */}
      <section className="py-12 sm:py-16 bg-dark-800/30">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div className="text-center mb-8 sm:mb-10" {...fadeUp}>
            <Badge variant="primary" size="lg" className="mb-4">Accreditations</Badge>
            <h2 className="text-2xl sm:text-3xl font-bold text-white font-heading mb-2">Awards & Recognition</h2>
          </motion.div>
          <motion.div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4" variants={stagger} initial="initial" whileInView="animate">
            {AWARDS.map((award, i) => (
              <motion.div key={i} variants={fadeUp} className="bg-dark-700 rounded-2xl p-4 sm:p-5 text-center border border-gray-700/50 shadow-lg">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-primary-500/20 flex items-center justify-center mx-auto mb-2">
                  <Award className="h-4 w-4 sm:h-5 sm:w-5 text-primary-400" />
                </div>
                <p className="text-lg sm:text-2xl font-bold text-primary-400 font-heading">{award.year}</p>
                <p className="text-[11px] sm:text-sm font-semibold text-white mt-1">{award.title}</p>
                <p className="text-[10px] sm:text-xs text-gray-400 mt-0.5">{award.organization}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-20 relative overflow-hidden">
        <div className="absolute inset-0">
          <Image src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1200" alt="" fill className="object-cover" sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-br from-dark-900/95 via-dark-900/90 to-dark-900/95" />
        </div>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 left-10 w-64 h-64 bg-primary-500/20 rounded-full blur-[100px]" />
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-amber-500/20 rounded-full blur-[100px]" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <motion.div {...fadeUp}>
            <Badge variant="success" size="lg" className="mb-6">24/7 Appointment Booking</Badge>
            <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-white font-heading mb-5 leading-tight">Ready to Prioritize Your Health?</h2>
            <p className="text-sm sm:text-lg text-gray-300 mb-8 max-w-2xl mx-auto">Schedule an appointment with our expert doctors today. We are here to provide you with the best medical care.</p>
            <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
              <Button size="lg" leftIcon={<Calendar className="h-5 w-5" />} onClick={() => setBookModalOpen(true)}>
                Book Appointment Now
              </Button>
              <Link href={ROUTES.contact}>
                <Button size="lg" variant="outline" leftIcon={<Phone className="h-5 w-5" />}>Contact Us</Button>
              </Link>
            </div>
            <p className="text-gray-400 mt-5 sm:mt-6 text-xs sm:text-sm">Or call us at <a href={`tel:${HOSPITAL_INFO.phone}`} className="font-bold text-primary-400 underline">{HOSPITAL_INFO.phone}</a></p>
          </motion.div>
        </div>
      </section>

      <BookAppointmentModal isOpen={bookModalOpen} onClose={() => setBookModalOpen(false)} />
    </div>
  );
}
