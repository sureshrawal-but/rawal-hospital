'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Package, Plus, Search, Truck, Building2, Calendar, DollarSign, ClipboardList } from 'lucide-react';
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

interface PurchaseOrder {
  id: string;
  supplier: string;
  items: number;
  totalAmount: number;
  orderDate: string;
  expectedDelivery: string;
  status: 'pending' | 'approved' | 'delivered' | 'cancelled';
}

interface Supplier {
  id: string;
  name: string;
  contact: string;
  email: string;
  address: string;
  rating: number;
}

const purchases: PurchaseOrder[] = [
  { id: 'PO-001', supplier: 'Sun Pharma Distributors', items: 12, totalAmount: 45000, orderDate: '2026-07-01', expectedDelivery: '2026-07-10', status: 'pending' },
  { id: 'PO-002', supplier: 'Cipla Healthcare', items: 8, totalAmount: 32000, orderDate: '2026-06-28', expectedDelivery: '2026-07-08', status: 'approved' },
  { id: 'PO-003', supplier: 'Dr. Reddy\'s Labs', items: 15, totalAmount: 78000, orderDate: '2026-06-25', expectedDelivery: '2026-07-05', status: 'delivered' },
  { id: 'PO-004', supplier: 'Alkem Laboratories', items: 6, totalAmount: 18500, orderDate: '2026-06-20', expectedDelivery: '2026-06-30', status: 'delivered' },
  { id: 'PO-005', supplier: 'GSK Pharmaceuticals', items: 10, totalAmount: 56000, orderDate: '2026-06-15', expectedDelivery: '2026-06-25', status: 'cancelled' },
];

const suppliers: Supplier[] = [
  { id: 'SUP-001', name: 'Sun Pharma Distributors', contact: '+91-22-4567-8901', email: 'orders@sunpharma.com', address: 'Mumbai, Maharashtra', rating: 4.5 },
  { id: 'SUP-002', name: 'Cipla Healthcare', contact: '+91-22-4567-8902', email: 'supply@cipla.com', address: 'Mumbai, Maharashtra', rating: 4.2 },
  { id: 'SUP-003', name: 'Dr. Reddy\'s Laboratories', contact: '+91-40-4567-8903', email: 'orders@drreddys.com', address: 'Hyderabad, Telangana', rating: 4.8 },
  { id: 'SUP-004', name: 'Alkem Laboratories', contact: '+91-22-4567-8904', email: 'supply@alkem.com', address: 'Mumbai, Maharashtra', rating: 4.0 },
];

export default function PurchasesPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [tab, setTab] = useState('orders');
  const [showOrder, setShowOrder] = useState(false);

  const filteredPO = purchases.filter(po =>
    po.supplier.toLowerCase().includes(searchQuery.toLowerCase()) || po.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const orderColumns: Column<PurchaseOrder>[] = [
    { key: 'id', header: 'PO #', sortable: true },
    { key: 'supplier', header: 'Supplier', sortable: true },
    { key: 'items', header: 'Items' },
    { key: 'totalAmount', header: 'Total', render: (po) => `₹${po.totalAmount.toLocaleString()}` },
    { key: 'orderDate', header: 'Order Date' },
    { key: 'expectedDelivery', header: 'Expected Delivery' },
    { key: 'status', header: 'Status', render: (po) => (
      <Badge variant={po.status === 'delivered' ? 'success' : po.status === 'approved' ? 'info' : po.status === 'pending' ? 'warning' : 'danger'}>{po.status}</Badge>
    )},
  ];

  if (error) return <ErrorState title="Failed to load purchases" onRetry={() => setError(false)} />;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Purchases & Suppliers</h1>
          <p className="text-gray-500 text-sm mt-1">Manage purchase orders and supplier relationships</p>
        </div>
        <div className="flex items-center gap-3">
          <SearchInput value={searchQuery} onChange={setSearchQuery} placeholder="Search..." className="w-64" />
          <Button leftIcon={<Plus className="h-4 w-4" />} onClick={() => setShowOrder(true)}>New Order</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard title="Pending Orders" value="8" icon={<ClipboardList className="h-5 w-5" />} variant="warning" />
        <StatCard title="Approved" value="12" icon={<Package className="h-5 w-5" />} variant="info" />
        <StatCard title="Delivered This Month" value="24" icon={<Truck className="h-5 w-5" />} variant="success" />
        <StatCard title="Active Suppliers" value="18" icon={<Building2 className="h-5 w-5" />} variant="primary" />
      </div>

      <Tabs tabs={[
        { id: 'orders', label: 'Purchase Orders', icon: <ClipboardList className="h-4 w-4" /> },
        { id: 'suppliers', label: 'Suppliers', icon: <Building2 className="h-4 w-4" /> },
      ]} activeTab={tab} onChange={setTab} variant="pills" />

      {tab === 'orders' ? (
        <Card>
          <DataTable columns={orderColumns} data={filteredPO} isLoading={loading}
            emptyTitle="No purchase orders" emptyDescription="Create a new purchase order to get started." />
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {suppliers.map((s) => (
            <Card key={s.id}>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-primary-50 flex items-center justify-center shrink-0">
                  <Building2 className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-gray-900">{s.name}</h3>
                    <Badge variant="primary">{s.rating} ★</Badge>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">{s.contact}</p>
                  <p className="text-sm text-gray-500">{s.email}</p>
                  <p className="text-sm text-gray-400 mt-1">{s.address}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      <Modal isOpen={showOrder} onClose={() => setShowOrder(false)} title="Create Purchase Order" size="lg">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Supplier</label>
              <select className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none">
                <option>Sun Pharma Distributors</option><option>Cipla Healthcare</option>
                <option>Dr. Reddy's Labs</option><option>Alkem Laboratories</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Order Date</label>
              <input type="date" className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Order Items</label>
            {[1, 2, 3].map((i) => (
              <div key={i} className="grid grid-cols-3 gap-2 mb-2">
                <select className="rounded-xl border border-gray-200 px-4 py-2 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none">
                  <option>Select medicine...</option><option>Amlodipine 5mg</option><option>Metformin 500mg</option><option>Paracetamol 500mg</option>
                </select>
                <input type="number" className="rounded-xl border border-gray-200 px-4 py-2 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none" placeholder="Qty" />
                <input type="number" className="rounded-xl border border-gray-200 px-4 py-2 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none" placeholder="Unit price" />
              </div>
            ))}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Expected Delivery</label>
            <input type="date" className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none" />
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="ghost" onClick={() => setShowOrder(false)}>Cancel</Button>
            <Button>Create Order</Button>
          </div>
        </div>
      </Modal>
    </motion.div>
  );
}
