'use client';

import { motion } from 'framer-motion';
import { SERVICES } from '@/lib/constants';
import Badge from '@/components/ui/Badge';
import Breadcrumb from '@/components/ui/Breadcrumb';
import ServiceCard from '@/components/cards/ServiceCard';

export default function ServicesPage() {
  return (
    <div className="pt-20">
      <section className="relative py-16 gradient-hero">
        <div className="max-w-7xl mx-auto px-4">
          <Breadcrumb items={[{ label: 'Services' }]} className="mb-4 text-blue-200 [&_*]:text-blue-200" />
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Badge variant="success" size="lg" className="mb-4 bg-white/20 text-white">Services</Badge>
            <h1 className="text-4xl lg:text-5xl font-bold text-white font-heading mb-4">Our Services</h1>
            <p className="text-lg text-blue-100 max-w-2xl">Comprehensive healthcare services designed to meet all your medical needs.</p>
          </motion.div>
        </div>
      </section>
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {SERVICES.map((service, i) => (
              <motion.div key={service.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
                <ServiceCard {...service} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
