'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Pill, Package, Search, Plus, Edit2, AlertTriangle, RefreshCw, PackageOpen } from 'lucide-react';
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

interface Medicine {
  id: string;
  name: string;
  category: string;
  manufacturer: string;
  batchNo: string;
  expiryDate: string;
  stock: number;
  reorderLevel: number;
  unitPrice: number;
  sellingPrice: number;
  status: 'in-stock' | 'low-stock' | 'out-of-stock' | 'expired';
}

const inventory: Medicine[] = [
  { id: 'MED-001', name: 'Amlodipine 5mg', category: 'Cardiology', manufacturer: 'Sun Pharma', batchNo: 'B-2026-001', expiryDate: '2027-12', stock: 2500, reorderLevel: 500, unitPrice: 2.5, sellingPrice: 5, status: 'in-stock' },
  { id: 'MED-002', name: 'Metformin 500mg', category: 'Endocrinology', manufacturer: 'Cipla', batchNo: 'B-2026-002', expiryDate: '2028-06', stock: 45, reorderLevel: 200, unitPrice: 3.0, sellingPrice: 6, status: 'low-stock' },
  { id: 'MED-003', name: 'Atorvastatin 10mg', category: 'Cardiology', manufacturer: 'Dr. Reddy\'s', batchNo: 'B-2026-003', expiryDate: '2027-09', stock: 0, reorderLevel: 300, unitPrice: 4.0, sellingPrice: 8, status: 'out-of-stock' },
  { id: 'MED-004', name: 'Paracetamol 500mg', category: 'General', manufacturer: 'GSK', batchNo: 'B-2026-004', expiryDate: '2026-08', stock: 5000, reorderLevel: 1000, unitPrice: 0.5, sellingPrice: 1, status: 'in-stock' },
  { id: 'MED-005', name: 'Amoxicillin 250mg', category: 'Antibiotics', manufacturer: 'Alkem', batchNo: 'B-2026-005', expiryDate: '2026-06', stock: 120, reorderLevel: 400, unitPrice: 8.0, sellingPrice: 15, status: 'expired' },
  { id: 'MED-006', name: 'Insulin Glargine', category: 'Endocrinology', manufacturer: 'Sanofi', batchNo: 'B-2026-006', expiryDate: '2027-03', stock: 80, reorderLevel: 100, unitPrice: 250, sellingPrice: 400, status: 'low-stock' },
];

export default function InventoryPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [tab, setTab] = useState('all');
  const [showAdd, setShowAdd] = useState(false);

  const filtered = inventory.filter(m => {
    const ms = m.name.toLowerCase().includes(searchQuery.toLowerCase()) || m.id.toLowerCase().includes(searchQuery.toLowerCase());
    if (tab === 'all') return ms;
    if (tab === 'low-stock') return ms && m.status === 'low-stock';
    if (tab === 'out-of-stock') return ms && m.status === 'out-of-stock';
    if (tab === 'expired') return ms && m.status === 'expired';
    return ms && m.status === 'in-stock';
  });

  const columns: Column<Medicine>[] = [
    { key: 'id', header: 'ID' },
    { key: 'name', header: 'Medicine', sortable: true, render: (m) => (
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-primary-50 flex items-center justify-center">
          <Pill className="h-4 w-4 text-primary" />
        </div>
        <span className="font-medium">{m.name}</span>
      </div>
    )},
    { key: 'category', header: 'Category' },
    { key: 'manufacturer', header: 'Manufacturer' },
    { key: 'batchNo', header: 'Batch' },
    { key: 'expiryDate', header: 'Expiry' },
    { key: 'stock', header: 'Stock', sortable: true, render: (m) => (
      <span className={`font-semibold ${m.stock === 0 ? 'text-red-600' : m.stock < m.reorderLevel ? 'text-yellow-600' : 'text-green-600'}`}>
        {m.stock}
      </span>
    )},
    { key: 'status', header: 'Status', render: (m) => (
      <Badge variant={m.status === 'in-stock' ? 'success' : m.status === 'low-stock' ? 'warning' : m.status === 'out-of-stock' ? 'danger' : 'info'}>{m.status}</Badge>
    )},
    { key: 'actions', header: '', render: (m) => (
      <Button size="sm" variant="ghost" onClick={(e) => { e.stopPropagation(); }}><Edit2 className="h-3.5 w-3.5" /></Button>
    )},
  ];

  if (error) return <ErrorState title="Failed to load inventory" onRetry={() => setError(false)} />;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Medicine Inventory</h1>
          <p className="text-gray-500 text-sm mt-1">Track stock levels and manage medicines</p>
        </div>
        <div className="flex items-center gap-3">
          <SearchInput value={searchQuery} onChange={setSearchQuery} placeholder="Search medicine..." className="w-64" />
          <Button leftIcon={<Plus className="h-4 w-4" />} onClick={() => setShowAdd(true)}>Add Medicine</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard title="Total Items" value="2,456" icon={<Package className="h-5 w-5" />} variant="primary" />
        <StatCard title="Low Stock" value="38" icon={<AlertTriangle className="h-5 w-5" />} variant="warning" />
        <StatCard title="Out of Stock" value="12" icon={<PackageOpen className="h-5 w-5" />} variant="danger" />
        <StatCard title="Expiring Soon" value="8" icon={<RefreshCw className="h-5 w-5" />} variant="info" />
      </div>

      <Tabs tabs={[
        { id: 'all', label: 'All', badge: 2456 },
        { id: 'in-stock', label: 'In Stock', badge: 2345 },
        { id: 'low-stock', label: 'Low Stock', badge: 38 },
        { id: 'out-of-stock', label: 'Out of Stock', badge: 12 },
        { id: 'expired', label: 'Expired', badge: 61 },
      ]} activeTab={tab} onChange={setTab} variant="pills" />

      <Card>
        <DataTable columns={columns} data={filtered} isLoading={loading}
          emptyTitle="No medicines found" emptyDescription="No inventory items match the current filter." />
      </Card>

      <Modal isOpen={showAdd} onClose={() => setShowAdd(false)} title="Add Medicine" size="lg">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Medicine Name</label>
              <input type="text" className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none" placeholder="e.g. Amlodipine 5mg" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none">
                <option>Cardiology</option><option>Endocrinology</option><option>Antibiotics</option><option>General</option><option>Neurology</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Manufacturer</label>
              <input type="text" className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none" placeholder="Company name" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Batch Number</label>
              <input type="text" className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none" placeholder="B-2026-XXX" />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Stock Quantity</label>
              <input type="number" className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none" placeholder="0" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Reorder Level</label>
              <input type="number" className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none" placeholder="0" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
              <input type="month" className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Unit Price (₹)</label>
              <input type="number" step="0.01" className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none" placeholder="0.00" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Selling Price (₹)</label>
              <input type="number" step="0.01" className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none" placeholder="0.00" />
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="ghost" onClick={() => setShowAdd(false)}>Cancel</Button>
            <Button>Add to Inventory</Button>
          </div>
        </div>
      </Modal>
    </motion.div>
  );
}
