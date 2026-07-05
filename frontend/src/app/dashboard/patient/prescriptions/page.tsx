'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import SearchInput from '@/components/ui/SearchInput';
import Modal from '@/components/ui/Modal';
import EmptyState from '@/components/ui/EmptyState';
import Tabs from '@/components/ui/Tabs';
import { ClipboardList, Calendar, Stethoscope, Download, Printer, Clock, AlertTriangle, Pill } from 'lucide-react';
import { formatDate } from '@/lib/utils';

const prescriptions = [
  { id: '1', date: '2025-01-10', doctor: 'Dr. John Smith', department: 'Cardiology', diagnosis: 'Hypertension', followUp: '2025-02-10', medicines: [{ name: 'Lisinopril', dosage: '10mg', frequency: 'Once daily', duration: '30 days', notes: 'Take after breakfast' }, { name: 'Amlodipine', dosage: '5mg', frequency: 'Once daily', duration: '30 days', notes: 'Take in the evening' }] },
  { id: '2', date: '2025-01-05', doctor: 'Dr. Michael Chen', department: 'Orthopedics', diagnosis: 'Lower Back Pain', followUp: '2025-02-05', medicines: [{ name: 'Ibuprofen', dosage: '400mg', frequency: '3 times daily', duration: '7 days', notes: 'Take with food' }, { name: 'Cyclobenzaprine', dosage: '5mg', frequency: 'At bedtime', duration: '5 days', notes: 'May cause drowsiness' }] },
  { id: '3', date: '2024-12-20', doctor: 'Dr. Sarah Johnson', department: 'Neurology', diagnosis: 'Chronic Migraine', followUp: '2025-01-20', medicines: [{ name: 'Sumatriptan', dosage: '50mg', frequency: 'As needed', duration: '10 doses', notes: 'Take at onset of migraine' }, { name: 'Propranolol', dosage: '40mg', frequency: 'Twice daily', duration: '90 days', notes: 'Preventive medication' }] },
  { id: '4', date: '2024-12-15', doctor: 'Dr. Emily Davis', department: 'Dermatology', diagnosis: 'Eczema', followUp: '2025-01-15', medicines: [{ name: 'Hydrocortisone Cream', dosage: '1%', frequency: 'Apply twice daily', duration: '14 days', notes: 'Apply thin layer to affected areas' }, { name: 'Cetirizine', dosage: '10mg', frequency: 'Once daily', duration: '14 days', notes: 'Take in the morning' }] },
  { id: '5', date: '2024-11-15', doctor: 'Dr. Lisa Anderson', department: 'Gynecology', diagnosis: 'Annual Checkup', followUp: '2025-11-15', medicines: [{ name: 'Multivitamin', dosage: '1 tablet', frequency: 'Once daily', duration: '90 days', notes: 'Take with breakfast' }] },
];

export default function Prescriptions() {
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [selectedRx, setSelectedRx] = useState<typeof prescriptions[0] | null>(null);

  const tabs = [
    { id: 'all', label: 'All' },
    { id: 'active', label: 'Active' },
    { id: 'expired', label: 'Expired' },
  ];

  const filtered = prescriptions.filter((rx) => {
    const matchesSearch = rx.doctor.toLowerCase().includes(search.toLowerCase()) || rx.diagnosis.toLowerCase().includes(search.toLowerCase());
    return matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 font-heading">My Prescriptions</h1>
        <p className="text-gray-500">View and manage your prescribed medications.</p>
      </div>

      <Card padding="md">
        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          <SearchInput value={search} onChange={setSearch} placeholder="Search by doctor or diagnosis..." className="flex-1 max-w-md" />
        </div>
        <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} variant="pills" className="mb-4" />

        {filtered.length === 0 ? (
          <EmptyState icon={<ClipboardList className="h-8 w-8" />} title="No prescriptions found" description="No prescriptions are available at the moment." />
        ) : (
          <div className="space-y-3">
            {filtered.map((rx, index) => (
              <motion.div key={rx.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }}
                className="p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer"
                onClick={() => setSelectedRx(rx)}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center shrink-0">
                      <Pill className="h-6 w-6 text-purple-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{rx.diagnosis}</p>
                      <p className="text-sm text-gray-500">{rx.doctor} &middot; {rx.department}</p>
                      <div className="flex items-center gap-3 mt-1 text-xs text-gray-400">
                        <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {formatDate(rx.date)}</span>
                        <span className="flex items-center gap-1"><ClipboardList className="h-3 w-3" /> {rx.medicines.length} medicines</span>
                        {rx.followUp && <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> Follow-up: {formatDate(rx.followUp)}</span>}
                      </div>
                    </div>
                  </div>
                  <Badge variant="primary" size="sm">Active</Badge>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </Card>

      <Modal isOpen={!!selectedRx} onClose={() => setSelectedRx(null)} title="Prescription Details" size="xl">
        {selectedRx && (
          <div className="space-y-5">
            <div className="flex items-center justify-between p-4 bg-primary-50 rounded-xl">
              <div className="flex items-center gap-3">
                <ClipboardList className="h-8 w-8 text-primary" />
                <div>
                  <p className="font-semibold text-gray-900">{selectedRx.diagnosis}</p>
                  <p className="text-sm text-gray-500">{selectedRx.doctor}</p>
                </div>
              </div>
              <Badge variant="primary">Prescribed on {formatDate(selectedRx.date)}</Badge>
            </div>

            <div>
              <p className="text-sm font-medium text-gray-700 mb-3">Prescribed Medicines ({selectedRx.medicines.length})</p>
              <div className="space-y-3">
                {selectedRx.medicines.map((med, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
                    className="p-4 border border-gray-100 rounded-xl"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-semibold text-gray-900">{med.name}</p>
                        <p className="text-sm text-gray-500">{med.dosage}</p>
                      </div>
                      <Badge variant="success">{med.duration}</Badge>
                    </div>
                    <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                      <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {med.frequency}</span>
                    </div>
                    {med.notes && <p className="text-xs text-yellow-600 mt-2 flex items-center gap-1"><AlertTriangle className="h-3 w-3" /> {med.notes}</p>}
                  </motion.div>
                ))}
              </div>
            </div>

            {selectedRx.followUp && (
              <div className="p-4 bg-yellow-50 rounded-xl flex items-center gap-3">
                <Calendar className="h-5 w-5 text-yellow-600" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Follow-up Appointment</p>
                  <p className="text-xs text-gray-500">Scheduled for {formatDate(selectedRx.followUp)}</p>
                </div>
              </div>
            )}

            <div className="flex justify-end gap-3 pt-2 border-t border-gray-100">
              <Button variant="outline" size="sm" leftIcon={<Download className="h-4 w-4" />}>Download PDF</Button>
              <Button variant="secondary" size="sm" leftIcon={<Printer className="h-4 w-4" />}>Print</Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
