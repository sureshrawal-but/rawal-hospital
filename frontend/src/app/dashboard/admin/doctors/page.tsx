'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Stethoscope, Plus, Edit2, Trash2, Search, UserCheck, UserX, Clock, DollarSign } from 'lucide-react';
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

interface Doctor {
  id: string;
  name: string;
  department: string;
  specialization: string;
  contact: string;
  email: string;
  experience: number;
  fee: number;
  status: 'active' | 'inactive' | 'on-leave';
}

const doctors: Doctor[] = [
  { id: 'D-001', name: 'Dr. Rajesh Mehta', department: 'Cardiology', specialization: 'Interventional Cardiology', contact: '+91-9876543201', email: 'rajesh.mehta@rawalhospital.com', experience: 18, fee: 1500, status: 'active' },
  { id: 'D-002', name: 'Dr. Sunita Gupta', department: 'Pediatrics', specialization: 'Neonatology', contact: '+91-9876543202', email: 'sunita.gupta@rawalhospital.com', experience: 14, fee: 1200, status: 'active' },
  { id: 'D-003', name: 'Dr. Anand Sharma', department: 'Orthopedics', specialization: 'Joint Replacement', contact: '+91-9876543203', email: 'anand.sharma@rawalhospital.com', experience: 20, fee: 2000, status: 'active' },
  { id: 'D-004', name: 'Dr. Neha Patel', department: 'Neurology', specialization: 'Stroke Medicine', contact: '+91-9876543204', email: 'neha.patel@rawalhospital.com', experience: 12, fee: 1800, status: 'on-leave' },
  { id: 'D-005', name: 'Dr. Vikram Singh', department: 'Gynecology', specialization: 'High-Risk Pregnancy', contact: '+91-9876543205', email: 'vikram.singh@rawalhospital.com', experience: 16, fee: 1600, status: 'inactive' },
];

export default function AdminDoctorsPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingDoctor, setEditingDoctor] = useState<Doctor | null>(null);

  const filtered = doctors.filter(d =>
    d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const columns: Column<Doctor>[] = [
    { key: 'id', header: 'ID', sortable: true },
    { key: 'name', header: 'Name', sortable: true, render: (d) => (
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-primary-50 flex items-center justify-center">
          <Stethoscope className="h-4 w-4 text-primary" />
        </div>
        <span className="font-medium">{d.name}</span>
      </div>
    )},
    { key: 'department', header: 'Department', sortable: true },
    { key: 'specialization', header: 'Specialization' },
    { key: 'experience', header: 'Experience', render: (d) => `${d.experience} yrs` },
    { key: 'fee', header: 'Fee', render: (d) => `₹${d.fee}` },
    { key: 'status', header: 'Status', render: (d) => (
      <Badge variant={d.status === 'active' ? 'success' : d.status === 'on-leave' ? 'warning' : 'danger'}>{d.status}</Badge>
    )},
    { key: 'actions', header: '', render: (d) => (
      <div className="flex gap-1">
        <Button size="sm" variant="ghost" onClick={(e) => { e.stopPropagation(); setEditingDoctor(d); setShowModal(true); }}>
          <Edit2 className="h-3.5 w-3.5" />
        </Button>
        <Button size="sm" variant="ghost" className="text-red-500 hover:text-red-700">
          <Trash2 className="h-3.5 w-3.5" />
        </Button>
      </div>
    )},
  ];

  if (error) return <ErrorState title="Failed to load doctors" onRetry={() => setError(false)} />;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Doctors</h1>
          <p className="text-gray-500 text-sm mt-1">Manage hospital doctor profiles and credentials</p>
        </div>
        <div className="flex items-center gap-3">
          <SearchInput value={searchQuery} onChange={setSearchQuery} placeholder="Search doctors..." className="w-64" />
          <Button leftIcon={<Plus className="h-4 w-4" />} onClick={() => { setEditingDoctor(null); setShowModal(true); }}>Add Doctor</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard title="Total Doctors" value="128" icon={<Stethoscope className="h-5 w-5" />} variant="primary" />
        <StatCard title="Active" value="112" icon={<UserCheck className="h-5 w-5" />} variant="success" />
        <StatCard title="On Leave" value="9" icon={<UserX className="h-5 w-5" />} variant="warning" />
        <StatCard title="Avg Experience" value="14.2 yrs" icon={<Clock className="h-5 w-5" />} variant="info" />
      </div>

      <Card>
        <DataTable columns={columns} data={filtered} isLoading={loading}
          emptyTitle="No doctors found" emptyDescription="Add your first doctor to get started." />
      </Card>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)}
        title={editingDoctor ? 'Edit Doctor' : 'Add Doctor'} size="lg">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input type="text" className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
                defaultValue={editingDoctor?.name} placeholder="Dr. Full Name" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
              <select className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
                defaultValue={editingDoctor?.department}>
                <option>Cardiology</option><option>Pediatrics</option><option>Orthopedics</option><option>Neurology</option><option>Gynecology</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Specialization</label>
              <input type="text" className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
                defaultValue={editingDoctor?.specialization} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Experience (years)</label>
              <input type="number" className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
                defaultValue={editingDoctor?.experience} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input type="email" className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
                defaultValue={editingDoctor?.email} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Consultation Fee (₹)</label>
              <input type="number" className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
                defaultValue={editingDoctor?.fee} />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
              defaultValue={editingDoctor?.status || 'active'}>
              <option value="active">Active</option><option value="inactive">Inactive</option><option value="on-leave">On Leave</option>
            </select>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="ghost" onClick={() => setShowModal(false)}>Cancel</Button>
            <Button>{editingDoctor ? 'Update Doctor' : 'Add Doctor'}</Button>
          </div>
        </div>
      </Modal>
    </motion.div>
  );
}
