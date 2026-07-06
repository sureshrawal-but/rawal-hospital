'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Badge from '@/components/ui/Badge';
import Breadcrumb from '@/components/ui/Breadcrumb';
import SearchInput from '@/components/ui/SearchInput';
import Select from '@/components/ui/Select';
import DoctorCard from '@/components/cards/DoctorCard';
import { DEPARTMENTS } from '@/lib/constants';

const allDoctors = [
  { id: '1', name: 'Dr. John Smith', specialty: 'Cardiologist', rating: 4.9, experience: 18, department: 'Cardiology', location: 'Main Campus', availability: 'Mon-Fri', fee: 150 },
  { id: '2', name: 'Dr. Sarah Johnson', specialty: 'Neurologist', rating: 4.8, experience: 15, department: 'Neurology', location: 'Main Campus', availability: 'Mon-Sat', fee: 180 },
  { id: '3', name: 'Dr. Michael Chen', specialty: 'Orthopedic Surgeon', rating: 4.9, experience: 20, department: 'Orthopedics', location: 'Main Campus', availability: 'Mon-Fri', fee: 200 },
  { id: '4', name: 'Dr. Emily Brown', specialty: 'Pediatrician', rating: 4.7, experience: 12, department: 'Pediatrics', location: 'Downtown', availability: 'Tue-Sat', fee: 120 },
  { id: '5', name: 'Dr. David Wilson', specialty: 'Dermatologist', rating: 4.8, experience: 14, department: 'Dermatology', location: 'Main Campus', availability: 'Mon-Sat', fee: 130 },
  { id: '6', name: 'Dr. Lisa Anderson', specialty: 'Gynecologist', rating: 4.9, experience: 16, department: 'Gynecology', location: 'Main Campus', availability: 'Mon-Fri', fee: 160 },
  { id: '7', name: 'Dr. James Taylor', specialty: 'Ophthalmologist', rating: 4.6, experience: 11, department: 'Ophthalmology', location: 'Downtown', availability: 'Mon-Sat', fee: 110 },
  { id: '8', name: 'Dr. Maria Garcia', specialty: 'Pulmonologist', rating: 4.8, experience: 13, department: 'Pulmonology', location: 'Main Campus', availability: 'Tue-Sat', fee: 140 },
];

export default function DoctorsPage() {
  const [search, setSearch] = useState('');
  const [deptFilter, setDeptFilter] = useState('');

  const filtered = allDoctors.filter((d) => {
    const matchesSearch = d.name.toLowerCase().includes(search.toLowerCase()) || d.specialty.toLowerCase().includes(search.toLowerCase());
    const matchesDept = !deptFilter || d.department === deptFilter;
    return matchesSearch && matchesDept;
  });

  return (
    <div className="pt-20">
      <section className="relative py-16 gradient-hero">
        <div className="max-w-7xl mx-auto px-4">
          <Breadcrumb items={[{ label: 'Doctors' }]} className="mb-4 text-blue-200 [&_*]:text-blue-200" />
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Badge variant="success" size="lg" className="mb-4 bg-white/20 text-white">Our Team</Badge>
            <h1 className="text-4xl lg:text-5xl font-bold text-white font-heading mb-4">Find a Doctor</h1>
            <p className="text-lg text-blue-100 max-w-2xl">Search our team of expert medical professionals by name, specialty, or department.</p>
          </motion.div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <SearchInput value={search} onChange={setSearch} placeholder="Search doctors by name or specialty..." className="flex-1" />
            <div className="w-full sm:w-64">
              <Select
                placeholder="All Departments"
                options={DEPARTMENTS.map((d) => ({ value: d.name, label: d.name }))}
                value={deptFilter}
                onChange={(e) => setDeptFilter(e.target.value)}
              />
            </div>
          </div>
          {filtered.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-500 text-lg">No doctors found matching your criteria.</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filtered.map((doctor, i) => (
                <motion.div key={doctor.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
                  <DoctorCard {...doctor} />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
