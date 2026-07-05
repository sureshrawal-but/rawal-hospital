'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, Search, Filter, CheckCircle, XCircle, UserRound, Stethoscope } from 'lucide-react';
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
import type { Column } from '@/components/ui/DataTable';

interface Appointment {
  id: string;
  patientName: string;
  doctorName: string;
  department: string;
  date: string;
  time: string;
  type: string;
  status: 'scheduled' | 'completed' | 'cancelled' | 'no-show';
}

const appointments: Appointment[] = [
  { id: 'APT-001', patientName: 'Aarav Sharma', doctorName: 'Dr. Rajesh Mehta', department: 'Cardiology', date: '2026-07-05', time: '09:00', type: 'Check-up', status: 'scheduled' },
  { id: 'APT-002', patientName: 'Priya Patel', doctorName: 'Dr. Sunita Gupta', department: 'Pediatrics', date: '2026-07-05', time: '10:30', type: 'Follow-up', status: 'scheduled' },
  { id: 'APT-003', patientName: 'Rahul Verma', doctorName: 'Dr. Anand Sharma', department: 'Orthopedics', date: '2026-07-04', time: '11:00', type: 'Consultation', status: 'completed' },
  { id: 'APT-004', patientName: 'Sneha Gupta', doctorName: 'Dr. Neha Patel', department: 'Neurology', date: '2026-07-04', time: '14:00', type: 'Follow-up', status: 'completed' },
  { id: 'APT-005', patientName: 'Vikram Singh', doctorName: 'Dr. Rajesh Mehta', department: 'Cardiology', date: '2026-07-03', time: '15:30', type: 'Emergency', status: 'cancelled' },
  { id: 'APT-006', patientName: 'Ananya Gupta', doctorName: 'Dr. Vikram Singh', department: 'Gynecology', date: '2026-07-03', time: '09:30', type: 'Check-up', status: 'no-show' },
];

export default function AdminAppointmentsPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [tab, setTab] = useState('all');
  const [selectedAppt, setSelectedAppt] = useState<Appointment | null>(null);

  const filtered = appointments.filter(a => {
    const matchesSearch = a.patientName.toLowerCase().includes(searchQuery.toLowerCase()) || a.id.toLowerCase().includes(searchQuery.toLowerCase());
    if (tab === 'all') return matchesSearch;
    return matchesSearch && a.status === tab;
  });

  const columns: Column<Appointment>[] = [
    { key: 'id', header: 'ID', sortable: true },
    { key: 'patientName', header: 'Patient', sortable: true, render: (a) => (
      <div className="flex items-center gap-2">
        <UserRound className="h-4 w-4 text-primary" />
        <span className="font-medium">{a.patientName}</span>
      </div>
    )},
    { key: 'doctorName', header: 'Doctor' },
    { key: 'department', header: 'Department' },
    { key: 'date', header: 'Date', sortable: true },
    { key: 'time', header: 'Time' },
    { key: 'type', header: 'Type', render: (a) => <Badge variant="primary" size="sm">{a.type}</Badge> },
    { key: 'status', header: 'Status', render: (a) => (
      <Badge variant={a.status === 'scheduled' ? 'info' : a.status === 'completed' ? 'success' : a.status === 'cancelled' ? 'danger' : 'warning'}>{a.status}</Badge>
    )},
    { key: 'actions', header: '', render: (a) => (
      <Button size="sm" variant="ghost" onClick={(e) => { e.stopPropagation(); setSelectedAppt(a); }}>Manage</Button>
    )},
  ];

  if (error) return <ErrorState title="Failed to load appointments" onRetry={() => setError(false)} />;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Appointments</h1>
          <p className="text-gray-500 text-sm mt-1">View and manage all hospital appointments</p>
        </div>
        <div className="flex items-center gap-3">
          <SearchInput value={searchQuery} onChange={setSearchQuery} placeholder="Search appointments..." className="w-64" />
          <Button variant="outline" size="sm" leftIcon={<Filter className="h-4 w-4" />}>Filter</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <StatCard title="Total" value="2,847" icon={<Calendar className="h-5 w-5" />} variant="primary" />
        <StatCard title="Scheduled" value="1,234" icon={<Clock className="h-5 w-5" />} variant="info" />
        <StatCard title="Completed" value="1,423" icon={<CheckCircle className="h-5 w-5" />} variant="success" />
        <StatCard title="Cancelled" value="145" icon={<XCircle className="h-5 w-5" />} variant="danger" />
        <StatCard title="No-Show" value="45" icon={<UserRound className="h-5 w-5" />} variant="warning" />
      </div>

      <Tabs tabs={[
        { id: 'all', label: 'All', badge: 2847 },
        { id: 'scheduled', label: 'Scheduled', badge: 1234 },
        { id: 'completed', label: 'Completed', badge: 1423 },
        { id: 'cancelled', label: 'Cancelled', badge: 145 },
        { id: 'no-show', label: 'No-Show', badge: 45 },
      ]} activeTab={tab} onChange={setTab} variant="pills" />

      <Card>
        <DataTable columns={columns} data={filtered} isLoading={loading}
          emptyTitle="No appointments found" emptyDescription="No appointments match your current filters." />
      </Card>

      <Modal isOpen={!!selectedAppt} onClose={() => setSelectedAppt(null)} title="Manage Appointment" size="md">
        {selectedAppt && (
          <div className="space-y-4">
            <div className="p-4 bg-primary-50 rounded-xl space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-lg">{selectedAppt.patientName}</span>
                <Badge variant={selectedAppt.status === 'scheduled' ? 'info' : selectedAppt.status === 'completed' ? 'success' : 'danger'}>{selectedAppt.status}</Badge>
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="flex items-center gap-2"><UserRound className="h-4 w-4 text-primary" />{selectedAppt.doctorName}</div>
                <div className="flex items-center gap-2"><Stethoscope className="h-4 w-4 text-primary" />{selectedAppt.department}</div>
                <div className="flex items-center gap-2"><Calendar className="h-4 w-4 text-primary" />{selectedAppt.date}</div>
                <div className="flex items-center gap-2"><Clock className="h-4 w-4 text-primary" />{selectedAppt.time}</div>
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <Button variant="success" size="sm" leftIcon={<CheckCircle className="h-4 w-4" />}>Mark Completed</Button>
              <Button variant="danger" size="sm" leftIcon={<XCircle className="h-4 w-4" />}>Cancel</Button>
            </div>
          </div>
        )}
      </Modal>
    </motion.div>
  );
}
