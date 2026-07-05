'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Building2, Plus, Edit2, Clock, Users, Stethoscope, BedDouble, Ambulance } from 'lucide-react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import DataTable from '@/components/ui/DataTable';
import Modal from '@/components/ui/Modal';
import SearchInput from '@/components/ui/SearchInput';
import StatCard from '@/components/ui/StatCard';
import EmptyState from '@/components/ui/EmptyState';
import ErrorState from '@/components/ui/ErrorState';
import type { Column } from '@/components/ui/DataTable';

interface Department {
  id: string;
  name: string;
  head: string;
  staffCount: number;
  bedCount: number;
  workingHours: string;
  facilities: string[];
  status: 'active' | 'inactive';
}

const departments: Department[] = [
  { id: 'DEP-001', name: 'Cardiology', head: 'Dr. Rajesh Mehta', staffCount: 42, bedCount: 30, workingHours: '24/7', facilities: ['Cath Lab', 'ECG', 'Echo', 'Stress Test'], status: 'active' },
  { id: 'DEP-002', name: 'Pediatrics', head: 'Dr. Sunita Gupta', staffCount: 38, bedCount: 25, workingHours: '24/7', facilities: ['NICU', 'PICU', 'Vaccination'], status: 'active' },
  { id: 'DEP-003', name: 'Orthopedics', head: 'Dr. Anand Sharma', staffCount: 28, bedCount: 20, workingHours: '08:00 - 20:00', facilities: ['OT', 'X-Ray', 'Physiotherapy'], status: 'active' },
  { id: 'DEP-004', name: 'Neurology', head: 'Dr. Neha Patel', staffCount: 22, bedCount: 15, workingHours: '08:00 - 18:00', facilities: ['EEG', 'EMG', 'Neuro OT'], status: 'active' },
  { id: 'DEP-005', name: 'Emergency', head: 'Dr. Vikram Singh', staffCount: 56, bedCount: 40, workingHours: '24/7', facilities: ['Trauma Bay', 'Resuscitation', 'Triage'], status: 'active' },
  { id: 'DEP-006', name: 'Radiology', head: 'Dr. Amit Patel', staffCount: 18, bedCount: 0, workingHours: '24/7', facilities: ['MRI', 'CT Scan', 'X-Ray', 'Ultrasound'], status: 'inactive' },
];

export default function DepartmentsPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingDept, setEditingDept] = useState<Department | null>(null);

  const filtered = departments.filter(d =>
    d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.head.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const columns: Column<Department>[] = [
    { key: 'id', header: 'ID' },
    { key: 'name', header: 'Department', sortable: true, render: (d) => (
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-primary-50 flex items-center justify-center">
          <Building2 className="h-4 w-4 text-primary" />
        </div>
        <span className="font-medium">{d.name}</span>
      </div>
    )},
    { key: 'head', header: 'Head', sortable: true },
    { key: 'staffCount', header: 'Staff', render: (d) => (
      <div className="flex items-center gap-1"><Users className="h-3.5 w-3.5 text-gray-400" />{d.staffCount}</div>
    )},
    { key: 'bedCount', header: 'Beds', render: (d) => (
      <div className="flex items-center gap-1"><BedDouble className="h-3.5 w-3.5 text-gray-400" />{d.bedCount}</div>
    )},
    { key: 'workingHours', header: 'Working Hours', render: (d) => (
      <div className="flex items-center gap-1"><Clock className="h-3.5 w-3.5 text-gray-400" /><span className="text-sm">{d.workingHours}</span></div>
    )},
    { key: 'status', header: 'Status', render: (d) => (
      <Badge variant={d.status === 'active' ? 'success' : 'danger'}>{d.status}</Badge>
    )},
    { key: 'actions', header: '', render: (d) => (
      <Button size="sm" variant="ghost" onClick={(e) => { e.stopPropagation(); setEditingDept(d); setShowModal(true); }}>
        <Edit2 className="h-3.5 w-3.5" />
      </Button>
    )},
  ];

  if (error) return <ErrorState title="Failed to load departments" onRetry={() => setError(false)} />;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Departments</h1>
          <p className="text-gray-500 text-sm mt-1">Manage hospital departments and facilities</p>
        </div>
        <div className="flex items-center gap-3">
          <SearchInput value={searchQuery} onChange={setSearchQuery} placeholder="Search departments..." className="w-64" />
          <Button leftIcon={<Plus className="h-4 w-4" />} onClick={() => { setEditingDept(null); setShowModal(true); }}>Add Department</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard title="Departments" value="24" icon={<Building2 className="h-5 w-5" />} variant="primary" />
        <StatCard title="Total Staff" value="486" icon={<Users className="h-5 w-5" />} variant="success" />
        <StatCard title="Total Beds" value="350" icon={<BedDouble className="h-5 w-5" />} variant="info" />
        <StatCard title="24/7 Depts" value="8" icon={<Clock className="h-5 w-5" />} variant="warning" />
      </div>

      <Card>
        <DataTable columns={columns} data={filtered} isLoading={loading}
          emptyTitle="No departments found" emptyDescription="Add your first department to get started." />
      </Card>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)}
        title={editingDept ? 'Edit Department' : 'Add Department'} size="lg">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Department Name</label>
              <input type="text" className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
                defaultValue={editingDept?.name} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Department Head</label>
              <input type="text" className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
                defaultValue={editingDept?.head} />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Staff Count</label>
              <input type="number" className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
                defaultValue={editingDept?.staffCount} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Bed Count</label>
              <input type="number" className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
                defaultValue={editingDept?.bedCount} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Working Hours</label>
              <input type="text" className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
                defaultValue={editingDept?.workingHours} placeholder="e.g. 24/7 or 09:00-17:00" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Facilities (comma separated)</label>
            <input type="text" className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
              defaultValue={editingDept?.facilities.join(', ')} placeholder="e.g. MRI, CT Scan, X-Ray" />
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="ghost" onClick={() => setShowModal(false)}>Cancel</Button>
            <Button>{editingDept ? 'Update' : 'Add Department'}</Button>
          </div>
        </div>
      </Modal>
    </motion.div>
  );
}
