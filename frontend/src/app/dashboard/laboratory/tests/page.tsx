'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FlaskConical, Plus, Search, Edit2, Trash2, DollarSign, Clock, Beaker } from 'lucide-react';
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

interface LabTest {
  id: string;
  name: string;
  category: string;
  sampleType: string;
  turnaround: string;
  price: number;
  description: string;
  status: 'active' | 'inactive';
}

const labTests: LabTest[] = [
  { id: 'LT-001', name: 'Complete Blood Count (CBC)', category: 'Hematology', sampleType: 'Blood', turnaround: '2 hrs', price: 500, description: 'Hemoglobin, WBC, Platelets, etc.', status: 'active' },
  { id: 'LT-002', name: 'Lipid Profile', category: 'Biochemistry', sampleType: 'Blood', turnaround: '4 hrs', price: 800, description: 'Cholesterol, HDL, LDL, Triglycerides', status: 'active' },
  { id: 'LT-003', name: 'Liver Function Test', category: 'Biochemistry', sampleType: 'Blood', turnaround: '4 hrs', price: 600, description: 'SGOT, SGPT, ALP, Bilirubin', status: 'active' },
  { id: 'LT-004', name: 'Kidney Function Test', category: 'Biochemistry', sampleType: 'Blood', turnaround: '4 hrs', price: 550, description: 'Creatinine, Urea, Electrolytes', status: 'active' },
  { id: 'LT-005', name: 'Urinalysis', category: 'Microbiology', sampleType: 'Urine', turnaround: '3 hrs', price: 300, description: 'Physical, chemical & microscopic exam', status: 'active' },
  { id: 'LT-006', name: 'Thyroid Profile', category: 'Endocrinology', sampleType: 'Blood', turnaround: '6 hrs', price: 1200, description: 'T3, T4, TSH', status: 'inactive' },
  { id: 'LT-007', name: 'Blood Glucose Fasting', category: 'Biochemistry', sampleType: 'Blood', turnaround: '1 hr', price: 200, description: 'Fasting blood sugar', status: 'active' },
  { id: 'LT-008', name: 'ECG', category: 'Cardiology', sampleType: 'N/A', turnaround: '30 min', price: 800, description: 'Electrocardiogram', status: 'active' },
];

export default function LabTestsPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [tab, setTab] = useState('all');
  const [showAdd, setShowAdd] = useState(false);
  const [editingTest, setEditingTest] = useState<LabTest | null>(null);

  const filtered = labTests.filter(t => {
    const ms = t.name.toLowerCase().includes(searchQuery.toLowerCase()) || t.category.toLowerCase().includes(searchQuery.toLowerCase());
    if (tab === 'all') return ms;
    return ms && t.status === tab;
  });

  const columns: Column<LabTest>[] = [
    { key: 'id', header: 'ID' },
    { key: 'name', header: 'Test Name', sortable: true, render: (t) => (
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-primary-50 flex items-center justify-center">
          <FlaskConical className="h-4 w-4 text-primary" />
        </div>
        <div>
          <span className="font-medium">{t.name}</span>
          <p className="text-xs text-gray-400">{t.description}</p>
        </div>
      </div>
    )},
    { key: 'category', header: 'Category', sortable: true, render: (t) => <Badge variant="primary" size="sm">{t.category}</Badge> },
    { key: 'sampleType', header: 'Sample' },
    { key: 'turnaround', header: 'TAT', render: (t) => (
      <div className="flex items-center gap-1"><Clock className="h-3.5 w-3.5 text-gray-400" />{t.turnaround}</div>
    )},
    { key: 'price', header: 'Price', render: (t) => `₹${t.price}` },
    { key: 'status', header: 'Status', render: (t) => (
      <Badge variant={t.status === 'active' ? 'success' : 'danger'}>{t.status}</Badge>
    )},
    { key: 'actions', header: '', render: (t) => (
      <div className="flex gap-1">
        <Button size="sm" variant="ghost" onClick={(e) => { e.stopPropagation(); setEditingTest(t); setShowAdd(true); }}>
          <Edit2 className="h-3.5 w-3.5" />
        </Button>
        <Button size="sm" variant="ghost" className="text-red-500 hover:text-red-700">
          <Trash2 className="h-3.5 w-3.5" />
        </Button>
      </div>
    )},
  ];

  if (error) return <ErrorState title="Failed to load lab tests" onRetry={() => setError(false)} />;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Lab Test Catalog</h1>
          <p className="text-gray-500 text-sm mt-1">Manage diagnostic tests and their parameters</p>
        </div>
        <div className="flex items-center gap-3">
          <SearchInput value={searchQuery} onChange={setSearchQuery} placeholder="Search tests..." className="w-64" />
          <Button leftIcon={<Plus className="h-4 w-4" />} onClick={() => { setEditingTest(null); setShowAdd(true); }}>Add Test</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard title="Total Tests" value="86" icon={<FlaskConical className="h-5 w-5" />} variant="primary" />
        <StatCard title="Active Tests" value="78" icon={<Beaker className="h-5 w-5" />} variant="success" />
        <StatCard title="Categories" value="12" icon={<FlaskConical className="h-5 w-5" />} variant="info" />
        <StatCard title="Avg TAT" value="3.2 hrs" icon={<Clock className="h-5 w-5" />} variant="warning" />
      </div>

      <Tabs tabs={[
        { id: 'all', label: 'All', badge: 86 },
        { id: 'active', label: 'Active', badge: 78 },
        { id: 'inactive', label: 'Inactive', badge: 8 },
      ]} activeTab={tab} onChange={setTab} variant="pills" />

      <Card>
        <DataTable columns={columns} data={filtered} isLoading={loading}
          emptyTitle="No tests found" emptyDescription="No lab tests match the current filter." />
      </Card>

      <Modal isOpen={showAdd} onClose={() => setShowAdd(false)}
        title={editingTest ? 'Edit Test' : 'Add Lab Test'} size="lg">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Test Name</label>
              <input type="text" className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
                defaultValue={editingTest?.name} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
                defaultValue={editingTest?.category}>
                <option>Hematology</option><option>Biochemistry</option><option>Microbiology</option>
                <option>Endocrinology</option><option>Cardiology</option><option>Pathology</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Sample Type</label>
              <select className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
                defaultValue={editingTest?.sampleType}>
                <option>Blood</option><option>Urine</option><option>Stool</option><option>Swab</option><option>N/A</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Turnaround Time</label>
              <input type="text" className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
                defaultValue={editingTest?.turnaround} placeholder="e.g. 2 hrs" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Price (₹)</label>
              <input type="number" className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
                defaultValue={editingTest?.price} />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none" rows={2}
              defaultValue={editingTest?.description} />
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="ghost" onClick={() => setShowAdd(false)}>Cancel</Button>
            <Button>{editingTest ? 'Update Test' : 'Add Test'}</Button>
          </div>
        </div>
      </Modal>
    </motion.div>
  );
}
