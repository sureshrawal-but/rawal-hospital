'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import SearchInput from '@/components/ui/SearchInput';
import Tabs from '@/components/ui/Tabs';
import Modal from '@/components/ui/Modal';
import EmptyState from '@/components/ui/EmptyState';
import { Calendar, Clock, Stethoscope, Plus, Video, MapPin, X, CheckCircle, AlertCircle } from 'lucide-react';
import { formatDate, formatCurrency } from '@/lib/utils';

const appointmentsData = [
  { id: '1', doctor: 'Dr. John Smith', department: 'Cardiology', date: '2025-01-20', time: '10:30 AM', type: 'Checkup', status: 'confirmed', fee: 150 },
  { id: '2', doctor: 'Dr. Sarah Johnson', department: 'Neurology', date: '2025-01-25', time: '2:00 PM', type: 'Consultation', status: 'scheduled', fee: 200 },
  { id: '3', doctor: 'Dr. Michael Chen', department: 'Orthopedics', date: '2025-01-10', time: '9:00 AM', type: 'Follow-up', status: 'completed', fee: 100 },
  { id: '4', doctor: 'Dr. Emily Davis', department: 'Dermatology', date: '2025-01-05', time: '11:00 AM', type: 'Consultation', status: 'cancelled', fee: 180 },
  { id: '5', doctor: 'Dr. Robert Wilson', department: 'Ophthalmology', date: '2025-02-01', time: '3:30 PM', type: 'Surgery Prep', status: 'scheduled', fee: 250 },
  { id: '6', doctor: 'Dr. Lisa Anderson', department: 'Gynecology', date: '2025-01-15', time: '1:00 PM', type: 'Checkup', status: 'completed', fee: 120 },
];

const statusVariants: Record<string, 'success' | 'warning' | 'danger' | 'info' | 'primary' | 'default'> = {
  scheduled: 'primary',
  confirmed: 'success',
  completed: 'default',
  cancelled: 'danger',
  in_progress: 'warning',
  checked_in: 'warning',
};

export default function PatientAppointments() {
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [showBookModal, setShowBookModal] = useState(false);
  const [selectedApt, setSelectedApt] = useState<typeof appointmentsData[0] | null>(null);

  const tabs = [
    { id: 'all', label: 'All Appointments' },
    { id: 'upcoming', label: 'Upcoming' },
    { id: 'completed', label: 'Completed' },
    { id: 'cancelled', label: 'Cancelled' },
  ];

  const filtered = appointmentsData.filter((apt) => {
    const matchesSearch = apt.doctor.toLowerCase().includes(search.toLowerCase()) || apt.department.toLowerCase().includes(search.toLowerCase());
    const matchesTab = activeTab === 'all' || apt.status === activeTab || (activeTab === 'upcoming' && (apt.status === 'scheduled' || apt.status === 'confirmed')) || (activeTab === 'completed' && apt.status === 'completed') || (activeTab === 'cancelled' && apt.status === 'cancelled');
    return matchesSearch && matchesTab;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 font-heading">My Appointments</h1>
          <p className="text-gray-500">Manage and track your medical appointments.</p>
        </div>
        <Button onClick={() => setShowBookModal(true)} leftIcon={<Plus className="h-4 w-4" />}>Book New Appointment</Button>
      </div>

      <Card padding="md">
        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          <SearchInput value={search} onChange={setSearch} placeholder="Search by doctor or department..." className="flex-1" />
        </div>
        <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} variant="pills" className="mb-4" />

        {filtered.length === 0 ? (
          <EmptyState icon={<Calendar className="h-8 w-8" />} title="No appointments found" description={search ? 'Try a different search term.' : 'You have no appointments in this category.'} action={<Button size="sm" onClick={() => setShowBookModal(true)} leftIcon={<Plus className="h-4 w-4" />}>Book Appointment</Button>} />
        ) : (
          <div className="space-y-3">
            {filtered.map((apt) => (
              <motion.div key={apt.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-gray-50 rounded-xl gap-3 hover:bg-gray-100 transition-colors cursor-pointer" onClick={() => setSelectedApt(apt)}>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center shrink-0">
                    <Stethoscope className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{apt.doctor}</p>
                    <p className="text-sm text-gray-500">{apt.department}</p>
                    <div className="flex flex-wrap items-center gap-3 mt-1 text-xs text-gray-400">
                      <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {formatDate(apt.date)}</span>
                      <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {apt.time}</span>
                      <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {apt.type}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant={statusVariants[apt.status] || 'default'} size="sm">{apt.status}</Badge>
                  <span className="text-sm font-medium text-gray-700">{formatCurrency(apt.fee)}</span>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </Card>

      <Modal isOpen={!!selectedApt} onClose={() => setSelectedApt(null)} title="Appointment Details" size="md">
        {selectedApt && (
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-4 bg-primary-50 rounded-xl">
              <Stethoscope className="h-8 w-8 text-primary" />
              <div>
                <p className="font-semibold text-gray-900">{selectedApt.doctor}</p>
                <p className="text-sm text-gray-500">{selectedApt.department}</p>
              </div>
              <Badge variant={statusVariants[selectedApt.status] || 'default'} size="sm" className="ml-auto">{selectedApt.status}</Badge>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="p-3 bg-gray-50 rounded-xl"><span className="text-gray-500">Date</span><p className="font-medium text-gray-900">{formatDate(selectedApt.date)}</p></div>
              <div className="p-3 bg-gray-50 rounded-xl"><span className="text-gray-500">Time</span><p className="font-medium text-gray-900">{selectedApt.time}</p></div>
              <div className="p-3 bg-gray-50 rounded-xl"><span className="text-gray-500">Type</span><p className="font-medium text-gray-900">{selectedApt.type}</p></div>
              <div className="p-3 bg-gray-50 rounded-xl"><span className="text-gray-500">Fee</span><p className="font-medium text-gray-900">{formatCurrency(selectedApt.fee)}</p></div>
            </div>
            {selectedApt.status === 'scheduled' && (
              <div className="flex gap-3 pt-2">
                <Button variant="primary" size="sm" leftIcon={<CheckCircle className="h-4 w-4" />}>Confirm Appointment</Button>
                <Button variant="outline" size="sm" leftIcon={<X className="h-4 w-4" />}>Cancel</Button>
              </div>
            )}
            {selectedApt.status === 'completed' && (
              <Link href={`/dashboard/patient/medical-records`}>
                <Button variant="outline" size="sm" leftIcon={<AlertCircle className="h-4 w-4" />}>View Medical Record</Button>
              </Link>
            )}
          </div>
        )}
      </Modal>

      <Modal isOpen={showBookModal} onClose={() => setShowBookModal(false)} title="Book New Appointment" size="lg">
        <div className="space-y-4">
          {['Select Department', 'Select Doctor', 'Choose Date', 'Choose Time', 'Reason for Visit'].map((step, i) => (
            <div key={i} className="p-4 bg-gray-50 rounded-xl">
              <p className="text-sm font-medium text-gray-700 mb-2">{step}</p>
              <div className="h-10 rounded-lg border border-gray-200 bg-white flex items-center px-3 text-sm text-gray-400">
                {i === 4 ? 'Brief description of your symptoms...' : `Select ${step.toLowerCase().replace('select ', '')}`}
              </div>
            </div>
          ))}
          <div className="flex justify-end gap-3 pt-2">
            <Button variant="ghost" onClick={() => setShowBookModal(false)}>Cancel</Button>
            <Button>Book Appointment</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
