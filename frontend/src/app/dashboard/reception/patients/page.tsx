'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { UserRound, Plus, Search, Phone, Calendar, MapPin, Eye } from 'lucide-react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import DataTable from '@/components/ui/DataTable';
import Modal from '@/components/ui/Modal';
import SearchInput from '@/components/ui/SearchInput';
import StatCard from '@/components/ui/StatCard';
import EmptyState from '@/components/ui/EmptyState';
import ErrorState from '@/components/ui/ErrorState';
import { PageLoader } from '@/components/ui/Loader';
import type { Column } from '@/components/ui/DataTable';

interface Patient {
  id: string;
  name: string;
  age: number;
  gender: string;
  contact: string;
  email: string;
  address: string;
  registeredDate: string;
  lastVisit: string;
}

const patients: Patient[] = [
  { id: 'P-001', name: 'Aarav Sharma', age: 45, gender: 'Male', contact: '+91-9876543210', email: 'aarav.s@email.com', address: 'Andheri West, Mumbai', registeredDate: '2024-01-15', lastVisit: '2026-06-28' },
  { id: 'P-002', name: 'Priya Patel', age: 32, gender: 'Female', contact: '+91-9876543211', email: 'priya.p@email.com', address: 'Bandra East, Mumbai', registeredDate: '2024-03-20', lastVisit: '2026-06-27' },
  { id: 'P-003', name: 'Rahul Verma', age: 60, gender: 'Male', contact: '+91-9876543212', email: 'rahul.v@email.com', address: 'Powai, Mumbai', registeredDate: '2023-11-05', lastVisit: '2026-06-25' },
  { id: 'P-004', name: 'Sneha Gupta', age: 28, gender: 'Female', contact: '+91-9876543213', email: 'sneha.g@email.com', address: 'Juhu, Mumbai', registeredDate: '2025-06-10', lastVisit: '2026-06-20' },
  { id: 'P-005', name: 'Vikram Singh', age: 55, gender: 'Male', contact: '+91-9876543214', email: 'vikram.s@email.com', address: 'Malad, Mumbai', registeredDate: '2024-08-22', lastVisit: '2026-06-15' },
];

export default function ReceptionPatientsPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showRegister, setShowRegister] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);

  const filtered = patients.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.contact.includes(searchQuery)
  );

  const columns: Column<Patient>[] = [
    { key: 'id', header: 'ID' },
    { key: 'name', header: 'Name', sortable: true, render: (p) => (
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-primary-50 flex items-center justify-center">
          <UserRound className="h-4 w-4 text-primary" />
        </div>
        <span className="font-medium">{p.name}</span>
      </div>
    )},
    { key: 'age', header: 'Age' },
    { key: 'gender', header: 'Gender' },
    { key: 'contact', header: 'Contact' },
    { key: 'lastVisit', header: 'Last Visit' },
    { key: 'actions', header: '', render: (p) => (
      <div className="flex gap-1">
        <Button size="sm" variant="ghost" onClick={(e) => { e.stopPropagation(); setSelectedPatient(p); }}>
          <Eye className="h-3.5 w-3.5" />
        </Button>
        <Button size="sm" variant="primary">Book Appt</Button>
      </div>
    )},
  ];

  if (error) return <ErrorState title="Failed to load patients" onRetry={() => setError(false)} />;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Patient Registration</h1>
          <p className="text-gray-500 text-sm mt-1">Register new patients and search existing records</p>
        </div>
        <div className="flex items-center gap-3">
          <SearchInput value={searchQuery} onChange={setSearchQuery} placeholder="Search by name, ID or phone..." className="w-72" />
          <Button leftIcon={<Plus className="h-4 w-4" />} onClick={() => setShowRegister(true)}>Register Patient</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard title="Total Registered" value="24,847" icon={<UserRound className="h-5 w-5" />} variant="primary" />
        <StatCard title="Today's Registration" value="18" icon={<Plus className="h-5 w-5" />} variant="success" />
        <StatCard title="New This Month" value="847" icon={<Calendar className="h-5 w-5" />} variant="info" />
        <StatCard title="Returning" value="12,456" icon={<UserRound className="h-5 w-5" />} variant="warning" />
      </div>

      <Card>
        <DataTable columns={columns} data={filtered} isLoading={loading}
          emptyTitle="No patients found" emptyDescription="Search for a patient or register a new one." />
      </Card>

      <Modal isOpen={showRegister} onClose={() => setShowRegister(false)} title="Register New Patient" size="lg">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
              <input type="text" className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none" placeholder="Full name" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth *</label>
              <input type="date" className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none" />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Gender *</label>
              <select className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none">
                <option>Male</option><option>Female</option><option>Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Blood Group</label>
              <select className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none">
                <option>A+</option><option>A-</option><option>B+</option><option>B-</option><option>AB+</option><option>AB-</option><option>O+</option><option>O-</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Contact *</label>
              <input type="text" className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none" placeholder="+91" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input type="email" className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none" placeholder="email@example.com" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Emergency Contact</label>
              <input type="text" className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none" placeholder="+91" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
            <textarea className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none" rows={2} placeholder="Full address" />
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="ghost" onClick={() => setShowRegister(false)}>Cancel</Button>
            <Button>Register Patient</Button>
          </div>
        </div>
      </Modal>

      <Modal isOpen={!!selectedPatient} onClose={() => setSelectedPatient(null)} title="Patient Details" size="md">
        {selectedPatient && (
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-3 bg-primary-50 rounded-xl">
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center">
                <UserRound className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-lg">{selectedPatient.name}</p>
                <p className="text-sm text-gray-500">{selectedPatient.id} | {selectedPatient.age} yrs | {selectedPatient.gender}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 border border-gray-100 rounded-xl"><span className="text-xs text-gray-500">Phone</span><p className="text-sm font-medium">{selectedPatient.contact}</p></div>
              <div className="p-3 border border-gray-100 rounded-xl"><span className="text-xs text-gray-500">Email</span><p className="text-sm font-medium">{selectedPatient.email}</p></div>
              <div className="p-3 border border-gray-100 rounded-xl"><span className="text-xs text-gray-500">Address</span><p className="text-sm font-medium">{selectedPatient.address}</p></div>
              <div className="p-3 border border-gray-100 rounded-xl"><span className="text-xs text-gray-500">Registered</span><p className="text-sm font-medium">{selectedPatient.registeredDate}</p></div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" size="sm">Edit Details</Button>
              <Button size="sm">Book Appointment</Button>
            </div>
          </div>
        )}
      </Modal>
    </motion.div>
  );
}
