'use client';

import { motion } from 'framer-motion';
import { DEPARTMENTS } from '@/lib/constants';
import Badge from '@/components/ui/Badge';
import DepartmentCard from '@/components/cards/DepartmentCard';
import Breadcrumb from '@/components/ui/Breadcrumb';

export default function DepartmentsPage() {
  return (
    <div className="pt-20">
      <section className="relative py-16 gradient-hero">
        <div className="max-w-7xl mx-auto px-4">
          <Breadcrumb items={[{ label: 'Departments' }]} className="mb-4 text-blue-200 [&_*]:text-blue-200 [&_*]:hover:text-white" />
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Badge variant="success" size="lg" className="mb-4 bg-white/20 text-white">Departments</Badge>
            <h1 className="text-4xl lg:text-5xl font-bold text-white font-heading mb-4">Our Departments</h1>
            <p className="text-lg text-blue-100 max-w-2xl">Explore our specialized medical departments staffed by expert healthcare professionals.</p>
          </motion.div>
        </div>
      </section>
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {DEPARTMENTS.map((dept, i) => (
              <motion.div key={dept.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
                <DepartmentCard {...dept} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
