'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Plus, Edit2, Trash2, Search, Building, BadgePercent, Shield } from 'lucide-react';
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

interface StaffMember {
  id: string;
  name: string;
  role: string;
  department: string;
  contact: string;
  email: string;
  joinDate: string;
  shift: 'Morning' | 'Evening' | 'Night' | 'Rotational';
  status: 'active' | 'inactive';
}

const staff: StaffMember[] = [
  { id: 'S-001', name: 'Anita Desai', role: 'Head Nurse', department: 'Cardiology', contact: '+91-9876543301', email: 'anita.d@rawalhospital.com', joinDate: '2022-03-15', shift: 'Morning', status: 'active' },
  { id: 'S-002', name: 'Rajesh Kumar', role: 'Lab Technician', department: 'Pathology', contact: '+91-9876543302', email: 'rajesh.k@rawalhospital.com', joinDate: '2023-06-01', shift: 'Rotational', status: 'active' },
  { id: 'S-003', name: 'Meera Nair', role: 'Pharmacist', department: 'Pharmacy', contact: '+91-9876543303', email: 'meera.n@rawalhospital.com', joinDate: '2021-11-20', shift: 'Evening', status: 'active' },
  { id: 'S-004', name: 'Suresh Reddy', role: 'Receptionist', department: 'Front Office', contact: '+91-9876543304', email: 'suresh.r@rawalhospital.com', joinDate: '2024-01-10', shift: 'Morning', status: 'active' },
  { id: 'S-005', name: 'Priya Kaur', role: 'Accountant', department: 'Finance', contact: '+91-9876543305', email: 'priya.k@rawalhospital.com', joinDate: '2023-09-05', shift: 'Morning', status: 'inactive' },
  { id: 'S-006', name: 'Vijay Yadav', role: 'Security Guard', department: 'Security', contact: '+91-9876543306', email: 'vijay.y@rawalhospital.com', joinDate: '2024-05-15', shift: 'Night', status: 'active' },
];

export default function AdminStaffPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingStaff, setEditingStaff] = useState<StaffMember | null>(null);

  const filtered = staff.filter(s =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const columns: Column<StaffMember>[] = [
    { key: 'id', header: 'ID', sortable: true },
    { key: 'name', header: 'Name', sortable: true, render: (s) => (
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-primary-50 flex items-center justify-center">
          <Users className="h-4 w-4 text-primary" />
        </div>
        <span className="font-medium">{s.name}</span>
      </div>
    )},
    { key: 'role', header: 'Role', sortable: true },
    { key: 'department', header: 'Department', sortable: true },
    { key: 'shift', header: 'Shift', render: (s) => (
      <Badge variant={s.shift === 'Morning' ? 'success' : s.shift === 'Evening' ? 'warning' : s.shift === 'Night' ? 'info' : 'default'}>{s.shift}</Badge>
    )},
    { key: 'contact', header: 'Contact' },
    { key: 'status', header: 'Status', render: (s) => (
      <Badge variant={s.status === 'active' ? 'success' : 'danger'}>{s.status}</Badge>
    )},
    { key: 'actions', header: '', render: (s) => (
      <div className="flex gap-1">
        <Button size="sm" variant="ghost" onClick={(e) => { e.stopPropagation(); setEditingStaff(s); setShowModal(true); }}>
          <Edit2 className="h-3.5 w-3.5" />
        </Button>
        <Button size="sm" variant="ghost" className="text-red-500 hover:text-red-700">
          <Trash2 className="h-3.5 w-3.5" />
        </Button>
      </div>
    )},
  ];

  if (error) return <ErrorState title="Failed to load staff" onRetry={() => setError(false)} />;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Staff Management</h1>
          <p className="text-gray-500 text-sm mt-1">Manage hospital staff, roles, and departments</p>
        </div>
        <div className="flex items-center gap-3">
          <SearchInput value={searchQuery} onChange={setSearchQuery} placeholder="Search staff..." className="w-64" />
          <Button leftIcon={<Plus className="h-4 w-4" />} onClick={() => { setEditingStaff(null); setShowModal(true); }}>Add Staff</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard title="Total Staff" value="486" icon={<Users className="h-5 w-5" />} variant="primary" />
        <StatCard title="Nursing" value="186" icon={<Shield className="h-5 w-5" />} variant="success" />
        <StatCard title="Technical" value="124" icon={<Building className="h-5 w-5" />} variant="info" />
        <StatCard title="Admin" value="176" icon={<BadgePercent className="h-5 w-5" />} variant="warning" />
      </div>

      <Card>
        <DataTable columns={columns} data={filtered} isLoading={loading}
          emptyTitle="No staff found" emptyDescription="Add staff members to get started." />
      </Card>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)}
        title={editingStaff ? 'Edit Staff Member' : 'Add Staff Member'} size="lg">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input type="text" className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
                defaultValue={editingStaff?.name} placeholder="Full name" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
              <select className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
                defaultValue={editingStaff?.role}>
                <option>Head Nurse</option><option>Staff Nurse</option><option>Lab Technician</option>
                <option>Pharmacist</option><option>Receptionist</option><option>Accountant</option><option>Security</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
              <select className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
                defaultValue={editingStaff?.department}>
                <option>Cardiology</option><option>Pathology</option><option>Pharmacy</option>
                <option>Front Office</option><option>Finance</option><option>Security</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Shift</label>
              <select className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
                defaultValue={editingStaff?.shift}>
                <option>Morning</option><option>Evening</option><option>Night</option><option>Rotational</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input type="email" className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
                defaultValue={editingStaff?.email} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Contact</label>
              <input type="text" className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
                defaultValue={editingStaff?.contact} />
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="ghost" onClick={() => setShowModal(false)}>Cancel</Button>
            <Button>{editingStaff ? 'Update' : 'Add Staff'}</Button>
          </div>
        </div>
      </Modal>
    </motion.div>
  );
}
