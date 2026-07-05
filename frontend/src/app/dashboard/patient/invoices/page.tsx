'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import SearchInput from '@/components/ui/SearchInput';
import Modal from '@/components/ui/Modal';
import DataTable from '@/components/ui/DataTable';
import EmptyState from '@/components/ui/EmptyState';
import Tabs from '@/components/ui/Tabs';
import { DollarSign, Calendar, Download, CreditCard, CheckCircle, XCircle, AlertCircle, Eye, Printer } from 'lucide-react';
import { formatDate, formatCurrency } from '@/lib/utils';
import type { Column } from '@/components/ui/DataTable';

const invoices = [
  { id: 'INV-2025-001', date: '2025-01-10', dueDate: '2025-02-10', description: 'Cardiology Consultation - Dr. John Smith', items: [{ description: 'Consultation Fee', qty: 1, rate: 150 }, { description: 'ECG Test', qty: 1, rate: 75 }, { description: 'Medication - Lisinopril', qty: 1, rate: 25 }], subtotal: 250, tax: 25, total: 275, status: 'paid', paidAt: '2025-01-10', paymentMethod: 'Credit Card' },
  { id: 'INV-2025-002', date: '2025-01-05', dueDate: '2025-02-05', description: 'Orthopedics Consultation - Dr. Michael Chen', items: [{ description: 'Consultation Fee', qty: 1, rate: 200 }, { description: 'X-Ray Lumbar Spine', qty: 1, rate: 150 }, { description: 'Medication - Ibuprofen', qty: 1, rate: 15 }], subtotal: 365, tax: 36.5, total: 401.50, status: 'unpaid', paidAt: undefined, paymentMethod: '' },
  { id: 'INV-2025-003', date: '2024-12-20', dueDate: '2025-01-20', description: 'Neurology Consultation - Dr. Sarah Johnson', items: [{ description: 'Consultation Fee', qty: 1, rate: 250 }, { description: 'MRI Brain', qty: 1, rate: 500 }, { description: 'Medication - Sumatriptan', qty: 1, rate: 30 }], subtotal: 780, tax: 78, total: 858, status: 'paid', paidAt: '2024-12-22', paymentMethod: 'Debit Card' },
  { id: 'INV-2025-004', date: '2024-12-15', dueDate: '2025-01-15', description: 'Dermatology Consultation - Dr. Emily Davis', items: [{ description: 'Consultation Fee', qty: 1, rate: 180 }, { description: 'Skin Biopsy', qty: 1, rate: 200 }, { description: 'Medication - Hydrocortisone', qty: 1, rate: 20 }], subtotal: 400, tax: 40, total: 440, status: 'pending', paidAt: undefined, paymentMethod: '' },
  { id: 'INV-2025-005', date: '2025-01-15', dueDate: '2025-02-15', description: 'Annual Lab Package', items: [{ description: 'Complete Blood Count', qty: 1, rate: 50 }, { description: 'Lipid Profile', qty: 1, rate: 80 }, { description: 'Blood Glucose', qty: 1, rate: 30 }, { description: 'Vitamin D Test', qty: 1, rate: 100 }], subtotal: 260, tax: 26, total: 286, status: 'unpaid', paidAt: undefined, paymentMethod: '' },
];

const statusVariants: Record<string, 'success' | 'danger' | 'warning' | 'info' | 'default'> = {
  paid: 'success',
  unpaid: 'danger',
  pending: 'warning',
  refunded: 'info',
  cancelled: 'default',
};

export default function Invoices() {
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [selectedInvoice, setSelectedInvoice] = useState<typeof invoices[0] | null>(null);
  const [showPayModal, setShowPayModal] = useState(false);

  const tabs = [
    { id: 'all', label: 'All' },
    { id: 'paid', label: 'Paid' },
    { id: 'unpaid', label: 'Unpaid' },
    { id: 'pending', label: 'Pending' },
  ];

  const filtered = invoices.filter((inv) => {
    const matchesSearch = inv.id.toLowerCase().includes(search.toLowerCase()) || inv.description.toLowerCase().includes(search.toLowerCase());
    const matchesTab = activeTab === 'all' || inv.status === activeTab;
    return matchesSearch && matchesTab;
  });

  const columns: Column<typeof invoices[0]>[] = [
    { key: 'id', header: 'Invoice', render: (inv) => <span className="font-medium text-primary">{inv.id}</span> },
    { key: 'date', header: 'Date', render: (inv) => <span>{formatDate(inv.date)}</span> },
    { key: 'description', header: 'Description', render: (inv) => <span className="text-gray-600">{inv.description}</span> },
    { key: 'total', header: 'Amount', align: 'right', render: (inv) => <span className="font-semibold">{formatCurrency(inv.total)}</span> },
    { key: 'status', header: 'Status', render: (inv) => <Badge variant={statusVariants[inv.status]} size="sm">{inv.status}</Badge> },
    { key: 'actions', header: '', align: 'right', render: (inv) => (
      <div className="flex items-center justify-end gap-2">
        <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); setSelectedInvoice(inv); }}><Eye className="h-4 w-4" /></Button>
        {inv.status === 'unpaid' || inv.status === 'pending' ? (
          <Button variant="primary" size="sm" onClick={(e) => { e.stopPropagation(); setSelectedInvoice(inv); setTimeout(() => setShowPayModal(true), 300); }}>Pay Now</Button>
        ) : null}
      </div>
    )},
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 font-heading">Invoices & Billing</h1>
        <p className="text-gray-500">View and manage your invoices and payments.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card padding="sm">
          <p className="text-sm text-gray-500">Total Paid</p>
          <p className="text-2xl font-bold text-green-600 font-heading">{formatCurrency(invoices.filter(i => i.status === 'paid').reduce((s, i) => s + i.total, 0))}</p>
        </Card>
        <Card padding="sm">
          <p className="text-sm text-gray-500">Total Unpaid</p>
          <p className="text-2xl font-bold text-red-600 font-heading">{formatCurrency(invoices.filter(i => i.status === 'unpaid' || i.status === 'pending').reduce((s, i) => s + i.total, 0))}</p>
        </Card>
        <Card padding="sm">
          <p className="text-sm text-gray-500">Total Invoices</p>
          <p className="text-2xl font-bold text-gray-900 font-heading">{invoices.length}</p>
        </Card>
      </div>

      <SearchInput value={search} onChange={setSearch} placeholder="Search invoices..." className="max-w-md" />
      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} variant="pills" className="mb-4" />

      <DataTable columns={columns} data={filtered} onRowClick={(inv) => setSelectedInvoice(inv)} emptyTitle="No invoices found" emptyDescription="No invoices match your current filters." />

      <Modal isOpen={!!selectedInvoice} onClose={() => setSelectedInvoice(null)} title={`Invoice ${selectedInvoice?.id}`} size="xl">
        {selectedInvoice && (
          <div className="space-y-5">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div>
                <p className="text-lg font-bold text-gray-900">{selectedInvoice.id}</p>
                <p className="text-sm text-gray-500">{selectedInvoice.description}</p>
              </div>
              <Badge variant={statusVariants[selectedInvoice.status]} size="md">{selectedInvoice.status}</Badge>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="p-3 bg-gray-50 rounded-xl"><span className="text-gray-500">Invoice Date</span><p className="font-medium">{formatDate(selectedInvoice.date)}</p></div>
              <div className="p-3 bg-gray-50 rounded-xl"><span className="text-gray-500">Due Date</span><p className="font-medium">{formatDate(selectedInvoice.dueDate)}</p></div>
              {selectedInvoice.paidAt && <div className="p-3 bg-gray-50 rounded-xl"><span className="text-gray-500">Paid On</span><p className="font-medium">{formatDate(selectedInvoice.paidAt)}</p></div>}
              {selectedInvoice.paymentMethod && <div className="p-3 bg-gray-50 rounded-xl"><span className="text-gray-500">Payment Method</span><p className="font-medium">{selectedInvoice.paymentMethod}</p></div>}
            </div>

            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">Invoice Items</p>
              <div className="border border-gray-100 rounded-xl overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="text-left px-4 py-2 font-medium text-gray-600">Description</th>
                      <th className="text-center px-4 py-2 font-medium text-gray-600">Qty</th>
                      <th className="text-right px-4 py-2 font-medium text-gray-600">Rate</th>
                      <th className="text-right px-4 py-2 font-medium text-gray-600">Total</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {selectedInvoice.items.map((item, i) => (
                      <tr key={i}>
                        <td className="px-4 py-2">{item.description}</td>
                        <td className="px-4 py-2 text-center">{item.qty}</td>
                        <td className="px-4 py-2 text-right">{formatCurrency(item.rate)}</td>
                        <td className="px-4 py-2 text-right">{formatCurrency(item.rate * item.qty)}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot className="bg-gray-50">
                    <tr><td colSpan={3} className="px-4 py-2 text-right text-gray-500">Subtotal</td><td className="px-4 py-2 text-right">{formatCurrency(selectedInvoice.subtotal)}</td></tr>
                    <tr><td colSpan={3} className="px-4 py-2 text-right text-gray-500">Tax (10%)</td><td className="px-4 py-2 text-right">{formatCurrency(selectedInvoice.tax)}</td></tr>
                    <tr><td colSpan={3} className="px-4 py-2 text-right font-bold">Total</td><td className="px-4 py-2 text-right font-bold text-lg">{formatCurrency(selectedInvoice.total)}</td></tr>
                  </tfoot>
                </table>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2 border-t border-gray-100">
              <Button variant="outline" size="sm" leftIcon={<Download className="h-4 w-4" />}>Download PDF</Button>
              <Button variant="outline" size="sm" leftIcon={<Printer className="h-4 w-4" />}>Print</Button>
              {(selectedInvoice.status === 'unpaid' || selectedInvoice.status === 'pending') && (
                <Button variant="primary" size="sm" leftIcon={<CreditCard className="h-4 w-4" />} onClick={() => setShowPayModal(true)}>Pay Now</Button>
              )}
            </div>
          </div>
        )}
      </Modal>

      <Modal isOpen={showPayModal} onClose={() => setShowPayModal(false)} title="Make Payment" size="md">
        <div className="space-y-4">
          <div className="p-4 bg-gray-50 rounded-xl text-center">
            <p className="text-sm text-gray-500">Amount to Pay</p>
            <p className="text-3xl font-bold text-gray-900 font-heading">{selectedInvoice ? formatCurrency(selectedInvoice.total) : '$0'}</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-xl">
            <p className="text-sm font-medium text-gray-700 mb-3">Payment Method</p>
            <div className="space-y-2">
              {['Credit Card', 'Debit Card', 'Bank Transfer', 'Cash'].map((method) => (
                <label key={method} className="flex items-center gap-3 p-3 rounded-xl bg-white border border-gray-200 cursor-pointer hover:border-primary transition-colors">
                  <input type="radio" name="payment" className="text-primary focus:ring-primary" />
                  <span className="text-sm">{method}</span>
                </label>
              ))}
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <Button variant="ghost" onClick={() => setShowPayModal(false)}>Cancel</Button>
            <Button leftIcon={<CreditCard className="h-4 w-4" />}>Pay {selectedInvoice ? formatCurrency(selectedInvoice.total) : ''}</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
