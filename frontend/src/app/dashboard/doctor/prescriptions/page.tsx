'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Pill, Plus, FileText, Printer, Calendar, Search } from 'lucide-react';
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

interface Prescription {
  id: string;
  patientName: string;
  medication: string;
  dosage: string;
  frequency: string;
  prescribedDate: string;
  doctor: string;
  status: 'active' | 'completed' | 'cancelled';
}

const prescriptions: Prescription[] = [
  { id: 'RX-001', patientName: 'Aarav Sharma', medication: 'Amlodipine', dosage: '5mg', frequency: 'Once daily', prescribedDate: '2026-06-28', doctor: 'Dr. Mehta', status: 'active' },
  { id: 'RX-002', patientName: 'Priya Patel', medication: 'Metformin', dosage: '500mg', frequency: 'Twice daily', prescribedDate: '2026-06-27', doctor: 'Dr. Mehta', status: 'active' },
  { id: 'RX-003', patientName: 'Rahul Verma', medication: 'Atorvastatin', dosage: '10mg', frequency: 'Once daily', prescribedDate: '2026-06-25', doctor: 'Dr. Mehta', status: 'active' },
  { id: 'RX-004', patientName: 'Sneha Gupta', medication: 'Salbutamol Inhaler', dosage: '100mcg', frequency: 'As needed', prescribedDate: '2026-06-20', doctor: 'Dr. Mehta', status: 'completed' },
  { id: 'RX-005', patientName: 'Vikram Singh', medication: 'Ibuprofen', dosage: '400mg', frequency: 'Three times daily', prescribedDate: '2026-06-15', doctor: 'Dr. Mehta', status: 'cancelled' },
];

export default function PrescriptionsPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreate, setShowCreate] = useState(false);
  const [tab, setTab] = useState('all');

  const filtered = prescriptions.filter(p => {
    const matchesSearch = p.patientName.toLowerCase().includes(searchQuery.toLowerCase()) || p.id.toLowerCase().includes(searchQuery.toLowerCase());
    if (tab === 'all') return matchesSearch;
    return matchesSearch && p.status === tab;
  });

  const columns: Column<Prescription>[] = [
    { key: 'id', header: 'RX ID', sortable: true },
    { key: 'patientName', header: 'Patient', sortable: true },
    { key: 'medication', header: 'Medication', render: (p) => (
      <div className="flex items-center gap-1"><Pill className="h-3.5 w-3.5 text-primary" />{p.medication}</div>
    )},
    { key: 'dosage', header: 'Dosage' },
    { key: 'frequency', header: 'Frequency' },
    { key: 'prescribedDate', header: 'Date' },
    { key: 'status', header: 'Status', render: (p) => (
      <Badge variant={p.status === 'active' ? 'success' : p.status === 'completed' ? 'info' : 'danger'}>{p.status}</Badge>
    )},
    { key: 'actions', header: '', render: (p) => (
      <Button size="sm" variant="ghost" leftIcon={<Printer className="h-3.5 w-3.5" />}>Print</Button>
    )},
  ];

  if (error) return <ErrorState title="Failed to load prescriptions" onRetry={() => setError(false)} />;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Prescriptions</h1>
          <p className="text-gray-500 text-sm mt-1">Create and manage patient prescriptions</p>
        </div>
        <div className="flex items-center gap-3">
          <SearchInput value={searchQuery} onChange={setSearchQuery} placeholder="Search prescriptions..." className="w-64" />
          <Button leftIcon={<Plus className="h-4 w-4" />} onClick={() => setShowCreate(true)}>New Prescription</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard title="Total Prescriptions" value="1,847" icon={<FileText className="h-5 w-5" />} variant="primary" />
        <StatCard title="Active" value="423" icon={<Pill className="h-5 w-5" />} variant="success" />
        <StatCard title="Completed" value="1,289" icon={<FileText className="h-5 w-5" />} variant="info" />
        <StatCard title="This Month" value="156" icon={<Calendar className="h-5 w-5" />} variant="warning" />
      </div>

      <Tabs tabs={[
        { id: 'all', label: 'All' },
        { id: 'active', label: 'Active', badge: 423 },
        { id: 'completed', label: 'Completed', badge: 1289 },
        { id: 'cancelled', label: 'Cancelled', badge: 135 },
      ]} activeTab={tab} onChange={setTab} variant="pills" />

      <Card>
        <DataTable columns={columns} data={filtered} isLoading={loading}
          emptyTitle="No prescriptions found"
          emptyDescription="No prescriptions match your current filters." />
      </Card>

      <Modal isOpen={showCreate} onClose={() => setShowCreate(false)} title="Create Prescription" size="lg">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Patient Name</label>
            <input type="text" className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none" placeholder="Search patient..." />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Medication</label>
              <input type="text" className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none" placeholder="e.g. Amlodipine" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Dosage</label>
              <input type="text" className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none" placeholder="e.g. 5mg" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Frequency</label>
              <select className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none">
                <option>Once daily</option>
                <option>Twice daily</option>
                <option>Three times daily</option>
                <option>As needed</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
              <input type="text" className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none" placeholder="e.g. 7 days" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Notes / Instructions</label>
            <textarea className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none" rows={3} placeholder="Additional instructions..." />
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="ghost" onClick={() => setShowCreate(false)}>Cancel</Button>
            <Button>Create Prescription</Button>
          </div>
        </div>
      </Modal>
    </motion.div>
  );
}
