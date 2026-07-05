'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Plus, Clock, Search, UserRound, Stethoscope } from 'lucide-react';
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

interface Appointment {
  id: string;
  patientName: string;
  contact: string;
  doctorName: string;
  department: string;
  date: string;
  time: string;
  type: string;
  status: 'scheduled' | 'checked-in' | 'completed' | 'cancelled';
}

const appointments: Appointment[] = [
  { id: 'APT-001', patientName: 'Aarav Sharma', contact: '+91-9876543210', doctorName: 'Dr. Rajesh Mehta', department: 'Cardiology', date: '2026-07-05', time: '09:00', type: 'Check-up', status: 'scheduled' },
  { id: 'APT-002', patientName: 'Priya Patel', contact: '+91-9876543211', doctorName: 'Dr. Sunita Gupta', department: 'Pediatrics', date: '2026-07-05', time: '10:30', type: 'Follow-up', status: 'checked-in' },
  { id: 'APT-003', patientName: 'Rahul Verma', contact: '+91-9876543212', doctorName: 'Dr. Anand Sharma', department: 'Orthopedics', date: '2026-07-05', time: '11:00', type: 'Consultation', status: 'scheduled' },
  { id: 'APT-004', patientName: 'Sneha Gupta', contact: '+91-9876543213', doctorName: 'Dr. Neha Patel', department: 'Neurology', date: '2026-07-04', time: '14:00', type: 'Follow-up', status: 'completed' },
  { id: 'APT-005', patientName: 'Vikram Singh', contact: '+91-9876543214', doctorName: 'Dr. Rajesh Mehta', department: 'Cardiology', date: '2026-07-04', time: '15:30', type: 'Emergency', status: 'cancelled' },
];

export default function ReceptionAppointmentsPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [tab, setTab] = useState('today');
  const [showWalkIn, setShowWalkIn] = useState(false);

  const filtered = appointments.filter(a => {
    const matchesSearch = a.patientName.toLowerCase().includes(searchQuery.toLowerCase()) || a.id.toLowerCase().includes(searchQuery.toLowerCase());
    if (tab === 'all') return matchesSearch;
    if (tab === 'today') return matchesSearch && a.date === '2026-07-05';
    return matchesSearch && a.status === tab;
  });

  const columns: Column<Appointment>[] = [
    { key: 'id', header: 'ID' },
    { key: 'patientName', header: 'Patient', sortable: true, render: (a) => (
      <div className="flex items-center gap-2">
        <UserRound className="h-4 w-4 text-primary" />
        <span className="font-medium">{a.patientName}</span>
      </div>
    )},
    { key: 'contact', header: 'Contact' },
    { key: 'doctorName', header: 'Doctor' },
    { key: 'time', header: 'Time' },
    { key: 'type', header: 'Type', render: (a) => <Badge variant="primary" size="sm">{a.type}</Badge> },
    { key: 'status', header: 'Status', render: (a) => (
      <Badge variant={a.status === 'scheduled' ? 'info' : a.status === 'checked-in' ? 'warning' : a.status === 'completed' ? 'success' : 'danger'}>{a.status}</Badge>
    )},
    { key: 'actions', header: '', render: (a) => (
      <div className="flex gap-1">
        {a.status === 'scheduled' && <Button size="sm" variant="success">Check In</Button>}
        <Button size="sm" variant="ghost">Reschedule</Button>
      </div>
    )},
  ];

  if (error) return <ErrorState title="Failed to load appointments" onRetry={() => setError(false)} />;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Appointments</h1>
          <p className="text-gray-500 text-sm mt-1">Manage appointments and walk-in registrations</p>
        </div>
        <div className="flex items-center gap-3">
          <SearchInput value={searchQuery} onChange={setSearchQuery} placeholder="Search..." className="w-56" />
          <Button leftIcon={<Plus className="h-4 w-4" />} onClick={() => setShowWalkIn(true)}>Walk-In</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard title="Today's Appointments" value="42" icon={<Calendar className="h-5 w-5" />} variant="primary" />
        <StatCard title="Checked In" value="18" icon={<UserRound className="h-5 w-5" />} variant="warning" />
        <StatCard title="Completed" value="156" icon={<Stethoscope className="h-5 w-5" />} variant="success" />
        <StatCard title="Walk-Ins Today" value="8" icon={<Plus className="h-5 w-5" />} variant="info" />
      </div>

      <Tabs tabs={[
        { id: 'today', label: "Today's", badge: 42 },
        { id: 'all', label: 'All', badge: 2847 },
        { id: 'scheduled', label: 'Scheduled', badge: 1234 },
        { id: 'checked-in', label: 'Checked In', badge: 89 },
        { id: 'completed', label: 'Completed', badge: 1423 },
      ]} activeTab={tab} onChange={setTab} variant="pills" />

      <Card>
        <DataTable columns={columns} data={filtered} isLoading={loading}
          emptyTitle="No appointments" emptyDescription="No appointments found for the selected filter." />
      </Card>

      <Modal isOpen={showWalkIn} onClose={() => setShowWalkIn(false)} title="Walk-In Registration" size="lg">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Patient Name</label>
              <input type="text" className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none" placeholder="Full name" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Contact Number</label>
              <input type="text" className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none" placeholder="+91-" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
              <select className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none">
                <option>Cardiology</option><option>Pediatrics</option><option>Orthopedics</option><option>Neurology</option><option>General Medicine</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Doctor</label>
              <select className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none">
                <option>Dr. Rajesh Mehta</option><option>Dr. Sunita Gupta</option><option>Dr. Anand Sharma</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Visit Type</label>
              <select className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none">
                <option>Check-up</option><option>Consultation</option><option>Follow-up</option><option>Emergency</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
              <select className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none">
                <option>OPD</option><option>IPD</option><option>Emergency</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="ghost" onClick={() => setShowWalkIn(false)}>Cancel</Button>
            <Button>Register Walk-In</Button>
          </div>
        </div>
      </Modal>
    </motion.div>
  );
}
