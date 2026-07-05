'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { UserRound, Stethoscope, Calendar, Activity, Search } from 'lucide-react';
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

interface Patient {
  id: string;
  name: string;
  age: number;
  gender: string;
  contact: string;
  lastVisit: string;
  condition: string;
  status: 'active' | 'inactive' | 'critical';
}

interface MedicalRecord {
  date: string;
  diagnosis: string;
  prescription: string;
  notes: string;
}

const patients: Patient[] = [
  { id: 'P-001', name: 'Aarav Sharma', age: 45, gender: 'Male', contact: '+91-9876543210', lastVisit: '2026-06-28', condition: 'Hypertension', status: 'active' },
  { id: 'P-002', name: 'Priya Patel', age: 32, gender: 'Female', contact: '+91-9876543211', lastVisit: '2026-06-27', condition: 'Diabetes Type 2', status: 'active' },
  { id: 'P-003', name: 'Rahul Verma', age: 60, gender: 'Male', contact: '+91-9876543212', lastVisit: '2026-06-25', condition: 'Coronary Artery Disease', status: 'critical' },
  { id: 'P-004', name: 'Sneha Gupta', age: 28, gender: 'Female', contact: '+91-9876543213', lastVisit: '2026-06-20', condition: 'Asthma', status: 'active' },
  { id: 'P-005', name: 'Vikram Singh', age: 55, gender: 'Male', contact: '+91-9876543214', lastVisit: '2026-06-15', condition: 'Arthritis', status: 'inactive' },
];

const medicalRecords: MedicalRecord[] = [
  { date: '2026-06-28', diagnosis: 'Stage 1 Hypertension', prescription: 'Amlodipine 5mg daily', notes: 'BP 140/90. Advised low sodium diet.' },
  { date: '2026-05-15', diagnosis: 'Pre-hypertension', prescription: 'Lifestyle modification', notes: 'BP 130/85. Follow up in 3 months.' },
  { date: '2026-03-10', diagnosis: 'Seasonal Allergies', prescription: 'Cetirizine 10mg PRN', notes: 'Advise avoidance of known allergens.' },
];

export default function DoctorPatientsPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [showHistory, setShowHistory] = useState(false);

  const filtered = patients.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const columns: Column<Patient>[] = [
    { key: 'id', header: 'ID', sortable: true },
    { key: 'name', header: 'Name', sortable: true, render: (p) => (
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-primary-50 flex items-center justify-center">
          <UserRound className="h-4 w-4 text-primary" />
        </div>
        <span className="font-medium">{p.name}</span>
      </div>
    )},
    { key: 'age', header: 'Age', sortable: true },
    { key: 'gender', header: 'Gender' },
    { key: 'condition', header: 'Condition', render: (p) => (
      <div className="flex items-center gap-1">
        <Activity className="h-3.5 w-3.5 text-gray-400" />
        {p.condition}
      </div>
    )},
    { key: 'lastVisit', header: 'Last Visit' },
    { key: 'status', header: 'Status', render: (p) => (
      <Badge variant={p.status === 'critical' ? 'danger' : p.status === 'active' ? 'success' : 'default'}>
        {p.status}
      </Badge>
    )},
    { key: 'actions', header: 'Actions', render: (p) => (
      <Button size="sm" variant="ghost" onClick={(e) => { e.stopPropagation(); setSelectedPatient(p); setShowHistory(true); }}>
        View History
      </Button>
    )},
  ];

  if (error) return <ErrorState title="Failed to load patients" onRetry={() => setError(false)} />;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Patients</h1>
          <p className="text-gray-500 text-sm mt-1">Manage and view patient medical records</p>
        </div>
        <SearchInput value={searchQuery} onChange={setSearchQuery} placeholder="Search patients..." className="w-72" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard title="Total Patients" value="1,284" icon={<UserRound className="h-5 w-5" />} variant="primary" />
        <StatCard title="Active Cases" value="847" icon={<Activity className="h-5 w-5" />} variant="success" />
        <StatCard title="Critical" value="23" icon={<Stethoscope className="h-5 w-5" />} variant="danger" />
        <StatCard title="Today's Appointments" value="12" icon={<Calendar className="h-5 w-5" />} variant="warning" />
      </div>

      <Card>
        <DataTable
          columns={columns}
          data={filtered}
          isLoading={loading}
          onRowClick={(p) => { setSelectedPatient(p); setShowHistory(true); }}
          emptyTitle="No patients found"
          emptyDescription="No patients match your search criteria."
        />
      </Card>

      <Modal isOpen={showHistory} onClose={() => setShowHistory(false)} title={`Medical History - ${selectedPatient?.name}`} size="lg">
        {selectedPatient && (
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-3 bg-primary-50 rounded-xl">
              <UserRound className="h-8 w-8 text-primary" />
              <div>
                <p className="font-semibold">{selectedPatient.name}</p>
                <p className="text-sm text-gray-500">{selectedPatient.id} | {selectedPatient.age} yrs | {selectedPatient.condition}</p>
              </div>
              <Badge variant={selectedPatient.status === 'critical' ? 'danger' : selectedPatient.status === 'active' ? 'success' : 'default'} className="ml-auto">
                {selectedPatient.status}
              </Badge>
            </div>
            {medicalRecords.length === 0 ? (
              <EmptyState title="No records" description="No medical history found." />
            ) : (
              medicalRecords.map((record, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                  className="p-4 border border-gray-100 rounded-xl space-y-2">
                  <div className="flex justify-between items-center">
                    <Badge variant="primary">{record.date}</Badge>
                    <span className="text-sm font-medium text-primary">{record.diagnosis}</span>
                  </div>
                  <p className="text-sm"><span className="font-medium text-gray-700">Prescription:</span> {record.prescription}</p>
                  <p className="text-sm text-gray-500"><span className="font-medium">Notes:</span> {record.notes}</p>
                </motion.div>
              ))
            )}
          </div>
        )}
      </Modal>
    </motion.div>
  );
}
