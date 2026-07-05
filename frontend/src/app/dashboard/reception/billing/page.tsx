'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { DollarSign, Plus, Search, Printer, FileText, Download, CreditCard, Receipt } from 'lucide-react';
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

interface Invoice {
  id: string;
  patientName: string;
  date: string;
  items: { description: string; amount: number }[];
  total: number;
  paid: number;
  due: number;
  paymentMethod: string;
  status: 'paid' | 'partial' | 'unpaid' | 'refunded';
}

const invoices: Invoice[] = [
  { id: 'INV-001', patientName: 'Aarav Sharma', date: '2026-07-05', items: [{ description: 'Consultation Fee', amount: 1500 }, { description: 'ECG', amount: 800 }], total: 2300, paid: 2300, due: 0, paymentMethod: 'Cash', status: 'paid' },
  { id: 'INV-002', patientName: 'Priya Patel', date: '2026-07-05', items: [{ description: 'Consultation Fee', amount: 1200 }, { description: 'Lab Tests', amount: 2500 }], total: 3700, paid: 2000, due: 1700, paymentMethod: 'Card', status: 'partial' },
  { id: 'INV-003', patientName: 'Rahul Verma', date: '2026-07-04', items: [{ description: 'Consultation Fee', amount: 2000 }, { description: 'X-Ray', amount: 1200 }], total: 3200, paid: 0, due: 3200, paymentMethod: '', status: 'unpaid' },
  { id: 'INV-004', patientName: 'Sneha Gupta', date: '2026-07-04', items: [{ description: 'Follow-up', amount: 800 }, { description: 'Medicines', amount: 1500 }], total: 2300, paid: 2300, due: 0, paymentMethod: 'UPI', status: 'paid' },
  { id: 'INV-005', patientName: 'Vikram Singh', date: '2026-07-03', items: [{ description: 'Consultation Fee', amount: 1600 }, { description: 'MRI Scan', amount: 4500 }], total: 6700, paid: 6700, due: 0, paymentMethod: 'Insurance', status: 'refunded' },
];

export default function BillingPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [tab, setTab] = useState('all');
  const [showCreate, setShowCreate] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);

  const filtered = invoices.filter(inv => {
    const m = inv.patientName.toLowerCase().includes(searchQuery.toLowerCase()) || inv.id.toLowerCase().includes(searchQuery.toLowerCase());
    if (tab === 'all') return m;
    return m && inv.status === tab;
  });

  const columns: Column<Invoice>[] = [
    { key: 'id', header: 'Invoice', sortable: true },
    { key: 'patientName', header: 'Patient', sortable: true },
    { key: 'date', header: 'Date' },
    { key: 'total', header: 'Total', render: (inv) => `₹${inv.total.toLocaleString()}` },
    { key: 'paid', header: 'Paid', render: (inv) => `₹${inv.paid.toLocaleString()}` },
    { key: 'due', header: 'Due', render: (inv) => <span className="font-medium text-red-600">₹{inv.due.toLocaleString()}</span> },
    { key: 'status', header: 'Status', render: (inv) => (
      <Badge variant={inv.status === 'paid' ? 'success' : inv.status === 'partial' ? 'warning' : inv.status === 'unpaid' ? 'danger' : 'info'}>{inv.status}</Badge>
    )},
    { key: 'actions', header: '', render: (inv) => (
      <div className="flex gap-1">
        <Button size="sm" variant="ghost" onClick={(e) => { e.stopPropagation(); setSelectedInvoice(inv); }}><Printer className="h-3.5 w-3.5" /></Button>
        <Button size="sm" variant="ghost"><Download className="h-3.5 w-3.5" /></Button>
      </div>
    )},
  ];

  if (error) return <ErrorState title="Failed to load billing data" onRetry={() => setError(false)} />;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Billing</h1>
          <p className="text-gray-500 text-sm mt-1">Create invoices and manage payments</p>
        </div>
        <div className="flex items-center gap-3">
          <SearchInput value={searchQuery} onChange={setSearchQuery} placeholder="Search invoices..." className="w-64" />
          <Button leftIcon={<Plus className="h-4 w-4" />} onClick={() => setShowCreate(true)}>Create Invoice</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard title="Today's Revenue" value="₹1,84,200" icon={<DollarSign className="h-5 w-5" />} variant="primary" />
        <StatCard title="Pending" value="₹47,800" icon={<Receipt className="h-5 w-5" />} variant="warning" />
        <StatCard title="This Month" value="₹42,50,000" icon={<CreditCard className="h-5 w-5" />} variant="success" />
        <StatCard title="Invoices" value="1,847" icon={<FileText className="h-5 w-5" />} variant="info" />
      </div>

      <Tabs tabs={[
        { id: 'all', label: 'All', badge: 1847 },
        { id: 'paid', label: 'Paid', badge: 1423 },
        { id: 'partial', label: 'Partial', badge: 234 },
        { id: 'unpaid', label: 'Unpaid', badge: 145 },
        { id: 'refunded', label: 'Refunded', badge: 45 },
      ]} activeTab={tab} onChange={setTab} variant="pills" />

      <Card>
        <DataTable columns={columns} data={filtered} isLoading={loading}
          emptyTitle="No invoices found" emptyDescription="No invoices match the selected filter." />
      </Card>

      <Modal isOpen={showCreate} onClose={() => setShowCreate(false)} title="Create Invoice" size="lg">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Patient</label>
              <input type="text" className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none" placeholder="Search patient..." />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Invoice Date</label>
              <input type="date" className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Bill Items</label>
            {[1, 2, 3].map((i) => (
              <div key={i} className="grid grid-cols-3 gap-2 mb-2">
                <input type="text" className="col-span-2 rounded-xl border border-gray-200 px-4 py-2 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none" placeholder="Item description" />
                <input type="number" className="rounded-xl border border-gray-200 px-4 py-2 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none" placeholder="Amount" />
              </div>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Payment Method</label>
              <select className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none">
                <option>Cash</option><option>Card</option><option>UPI</option><option>Insurance</option><option>Bank Transfer</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Amount Paid</label>
              <input type="number" className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none" placeholder="0" />
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="ghost" onClick={() => setShowCreate(false)}>Cancel</Button>
            <Button>Generate Invoice</Button>
          </div>
        </div>
      </Modal>

      <Modal isOpen={!!selectedInvoice} onClose={() => setSelectedInvoice(null)} title={`Invoice ${selectedInvoice?.id}`} size="md">
        {selectedInvoice && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-semibold text-lg">{selectedInvoice.patientName}</p>
                <p className="text-sm text-gray-500">{selectedInvoice.date}</p>
              </div>
              <Badge variant={selectedInvoice.status === 'paid' ? 'success' : selectedInvoice.status === 'partial' ? 'warning' : 'danger'} size="lg">{selectedInvoice.status}</Badge>
            </div>
            <div className="border-t border-gray-100 pt-3">
              {selectedInvoice.items.map((item, i) => (
                <div key={i} className="flex justify-between py-1.5 text-sm">
                  <span className="text-gray-700">{item.description}</span>
                  <span className="font-medium">₹{item.amount}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-gray-100 pt-3 space-y-1">
              <div className="flex justify-between text-sm"><span>Total</span><span className="font-semibold">₹{selectedInvoice.total}</span></div>
              <div className="flex justify-between text-sm text-green-600"><span>Paid</span><span>₹{selectedInvoice.paid}</span></div>
              <div className="flex justify-between text-sm text-red-600 font-semibold"><span>Due</span><span>₹{selectedInvoice.due}</span></div>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <Button variant="outline" size="sm" leftIcon={<Printer className="h-4 w-4" />}>Print</Button>
              {selectedInvoice.due > 0 && <Button size="sm">Record Payment</Button>}
            </div>
          </div>
        )}
      </Modal>
    </motion.div>
  );
}
