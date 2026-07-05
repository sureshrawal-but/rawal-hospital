'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { UserRound, Search, Filter, Eye, Phone, Mail, MapPin, Calendar } from 'lucide-react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import DataTable from '@/components/ui/DataTable';
import Modal from '@/components/ui/Modal';
import SearchInput from '@/components/ui/SearchInput';
import StatCard from '@/components/ui/StatCard';
import Tabs from '@/components/ui/Tabs';
import EmptyState from '@/components/ui/EmptyState';
import ErrorState from '@/components/ui/ErrorState';
import { PageLoader } from '@/components/ui/Loader';
import type { Column } from '@/components/ui/DataTable';

interface Patient {
  id: string;
  name: string;
  age: number;
  gender: string;
  bloodGroup: string;
  contact: string;
  email: string;
  address: string;
  registeredDate: string;
  lastVisit: string;
  status: 'active' | 'inactive';
}

const patients: Patient[] = [
  { id: 'P-001', name: 'Aarav Sharma', age: 45, gender: 'Male', bloodGroup: 'B+', contact: '+91-9876543210', email: 'aarav.s@email.com', address: 'Andheri West, Mumbai', registeredDate: '2024-01-15', lastVisit: '2026-06-28', status: 'active' },
  { id: 'P-002', name: 'Priya Patel', age: 32, gender: 'Female', bloodGroup: 'O+', contact: '+91-9876543211', email: 'priya.p@email.com', address: 'Bandra East, Mumbai', registeredDate: '2024-03-20', lastVisit: '2026-06-27', status: 'active' },
  { id: 'P-003', name: 'Rahul Verma', age: 60, gender: 'Male', bloodGroup: 'A+', contact: '+91-9876543212', email: 'rahul.v@email.com', address: 'Powai, Mumbai', registeredDate: '2023-11-05', lastVisit: '2026-06-25', status: 'active' },
  { id: 'P-004', name: 'Sneha Gupta', age: 28, gender: 'Female', bloodGroup: 'AB+', contact: '+91-9876543213', email: 'sneha.g@email.com', address: 'Juhu, Mumbai', registeredDate: '2025-06-10', lastVisit: '2026-06-20', status: 'active' },
  { id: 'P-005', name: 'Vikram Singh', age: 55, gender: 'Male', bloodGroup: 'B-', contact: '+91-9876543214', email: 'vikram.s@email.com', address: 'Malad, Mumbai', registeredDate: '2024-08-22', lastVisit: '2026-06-15', status: 'inactive' },
];

export default function AdminPatientsPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);

  const filtered = patients.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.contact.includes(searchQuery)
  );

  const columns: Column<Patient>[] = [
    { key: 'id', header: 'ID', sortable: true },
    { key: 'name', header: 'Name', sortable: true, render: (p) => (
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-primary-50 flex items-center justify-center">
          <UserRound className="h-4 w-4 text-primary" />
        </div>
        <span className="font-medium">{p.name}</span>
      </div>
    )},
    { key: 'age', header: 'Age', sortable: true },
    { key: 'gender', header: 'Gender' },
    { key: 'bloodGroup', header: 'Blood Group' },
    { key: 'contact', header: 'Contact' },
    { key: 'lastVisit', header: 'Last Visit' },
    { key: 'status', header: 'Status', render: (p) => (
      <Badge variant={p.status === 'active' ? 'success' : 'default'}>{p.status}</Badge>
    )},
    { key: 'actions', header: '', render: (p) => (
      <Button size="sm" variant="ghost" onClick={(e) => { e.stopPropagation(); setSelectedPatient(p); }}>
        <Eye className="h-3.5 w-3.5" />
      </Button>
    )},
  ];

  if (error) return <ErrorState title="Failed to load patients" onRetry={() => setError(false)} />;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Patients</h1>
          <p className="text-gray-500 text-sm mt-1">View and manage all registered patients</p>
        </div>
        <div className="flex items-center gap-3">
          <SearchInput value={searchQuery} onChange={setSearchQuery} placeholder="Search patients..." className="w-64" />
          <Button variant="outline" size="sm" leftIcon={<Filter className="h-4 w-4" />}>Filter</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard title="Total Patients" value="24,847" icon={<UserRound className="h-5 w-5" />} variant="primary" />
        <StatCard title="Active" value="18,234" icon={<UserRound className="h-5 w-5" />} variant="success" />
        <StatCard title="New This Month" value="847" icon={<UserRound className="h-5 w-5" />} variant="info" />
        <StatCard title="OPD Today" value="342" icon={<Calendar className="h-5 w-5" />} variant="warning" />
      </div>

      <Card>
        <DataTable columns={columns} data={filtered} isLoading={loading}
          emptyTitle="No patients found" emptyDescription="No patients match your search criteria." />
      </Card>

      <Modal isOpen={!!selectedPatient} onClose={() => setSelectedPatient(null)} title="Patient Details" size="md">
        {selectedPatient && (
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-3 bg-primary-50 rounded-xl">
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center">
                <UserRound className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-lg">{selectedPatient.name}</p>
                <p className="text-sm text-gray-500">{selectedPatient.id}</p>
              </div>
              <Badge variant={selectedPatient.status === 'active' ? 'success' : 'default'} className="ml-auto">{selectedPatient.status}</Badge>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: <Calendar className="h-4 w-4" />, label: 'Age', value: `${selectedPatient.age} yrs` },
                { icon: <UserRound className="h-4 w-4" />, label: 'Gender', value: selectedPatient.gender },
                { icon: <Badge variant="info" size="sm">{selectedPatient.bloodGroup}</Badge>, label: 'Blood Group', value: '' },
                { icon: <Phone className="h-4 w-4" />, label: 'Contact', value: selectedPatient.contact },
                { icon: <Mail className="h-4 w-4" />, label: 'Email', value: selectedPatient.email },
                { icon: <MapPin className="h-4 w-4" />, label: 'Address', value: selectedPatient.address },
              ].map((item, i) => (
                <div key={i} className="p-3 border border-gray-100 rounded-xl">
                  <div className="flex items-center gap-2 text-gray-500 text-xs mb-1">{item.icon}<span>{item.label}</span></div>
                  <p className="text-sm font-medium text-gray-900">{item.value}</p>
                </div>
              ))}
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <Button variant="outline" size="sm">View Medical History</Button>
              <Button size="sm">Book Appointment</Button>
            </div>
          </div>
        )}
      </Modal>
    </motion.div>
  );
}
