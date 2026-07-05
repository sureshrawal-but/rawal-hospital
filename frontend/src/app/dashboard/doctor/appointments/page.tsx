'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import SearchInput from '@/components/ui/SearchInput';
import Tabs from '@/components/ui/Tabs';
import Modal from '@/components/ui/Modal';
import EmptyState from '@/components/ui/EmptyState';
import DataTable from '@/components/ui/DataTable';
import Avatar from '@/components/ui/Avatar';
import { Calendar, Clock, User, Video, Phone, CheckCircle, XCircle, Play, Stethoscope, AlertCircle, FileText } from 'lucide-react';
import { formatDate, formatTime } from '@/lib/utils';
import type { Column } from '@/components/ui/DataTable';

const appointments = [
  { id: '1', patient: 'John Doe', age: 45, gender: 'Male', time: '9:00 AM', type: 'Checkup', reason: 'Annual physical examination', status: 'checked_in', phone: '(555) 111-2222', lastVisit: '2024-10-15' },
  { id: '2', patient: 'Jane Smith', age: 32, gender: 'Female', time: '10:30 AM', type: 'Consultation', reason: 'Persistent headaches for 2 weeks', status: 'confirmed', phone: '(555) 222-3333', lastVisit: '2025-01-05' },
  { id: '3', patient: 'Robert Wilson', age: 58, gender: 'Male', time: '11:00 AM', type: 'Follow-up', reason: 'Blood pressure review', status: 'scheduled', phone: '(555) 333-4444', lastVisit: '2024-12-20' },
  { id: '4', patient: 'Emily Davis', age: 28, gender: 'Female', time: '1:00 PM', type: 'Consultation', reason: 'Skin rash on arms', status: 'scheduled', phone: '(555) 444-5555', lastVisit: '2024-11-10' },
  { id: '5', patient: 'Michael Brown', age: 65, gender: 'Male', time: '2:30 PM', type: 'Surgery Prep', reason: 'Pre-surgery evaluation', status: 'confirmed', phone: '(555) 555-6666', lastVisit: '2025-01-08' },
  { id: '6', patient: 'Sarah Lee', age: 35, gender: 'Female', time: '3:00 PM', type: 'Checkup', reason: 'Diabetes management review', status: 'scheduled', phone: '(555) 666-7777', lastVisit: '2025-01-02' },
  { id: '7', patient: 'David Kim', age: 42, gender: 'Male', time: '4:00 PM', type: 'Consultation', reason: 'Joint pain in knees', status: 'scheduled', phone: '(555) 777-8888', lastVisit: '2024-12-05' },
  { id: '8', patient: 'Lisa Anderson', age: 50, gender: 'Female', time: '9:30 AM', type: 'Follow-up', reason: 'Medication adjustment', status: 'completed', phone: '(555) 888-9999', lastVisit: '2025-01-10' },
];

const statusVariants: Record<string, 'success' | 'warning' | 'danger' | 'info' | 'primary' | 'default'> = {
  scheduled: 'primary',
  confirmed: 'success',
  checked_in: 'warning',
  in_progress: 'info',
  completed: 'default',
  cancelled: 'danger',
  no_show: 'danger',
};

export default function DoctorAppointments() {
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [selectedApt, setSelectedApt] = useState<typeof appointments[0] | null>(null);
  const [showCancelModal, setShowCancelModal] = useState(false);

  const tabs = [
    { id: 'all', label: 'All', badge: appointments.length },
    { id: 'checked_in', label: 'Checked In', badge: appointments.filter(a => a.status === 'checked_in').length },
    { id: 'confirmed', label: 'Confirmed', badge: appointments.filter(a => a.status === 'confirmed').length },
    { id: 'scheduled', label: 'Scheduled', badge: appointments.filter(a => a.status === 'scheduled').length },
    { id: 'completed', label: 'Completed', badge: appointments.filter(a => a.status === 'completed').length },
  ];

  const filtered = appointments.filter((apt) => {
    const matchesSearch = apt.patient.toLowerCase().includes(search.toLowerCase()) || apt.reason.toLowerCase().includes(search.toLowerCase());
    const matchesTab = activeTab === 'all' || apt.status === activeTab;
    return matchesSearch && matchesTab;
  });

  const columns: Column<typeof appointments[0]>[] = [
    { key: 'patient', header: 'Patient', render: (apt) => (
      <div className="flex items-center gap-3">
        <Avatar name={apt.patient} size="sm" />
        <div><p className="font-medium text-gray-900">{apt.patient}</p><p className="text-xs text-gray-500">{apt.age} yrs, {apt.gender}</p></div>
      </div>
    )},
    { key: 'time', header: 'Time' },
    { key: 'type', header: 'Type' },
    { key: 'reason', header: 'Reason', render: (apt) => <span className="text-gray-600 text-sm">{apt.reason}</span> },
    { key: 'status', header: 'Status', render: (apt) => <Badge variant={statusVariants[apt.status]} size="sm">{apt.status.replace('_', ' ')}</Badge> },
    { key: 'actions', header: '', align: 'right', render: (apt) => (
      <div className="flex items-center justify-end gap-2">
        {apt.status === 'checked_in' && <Button variant="primary" size="sm" leftIcon={<Play className="h-4 w-4" />} onClick={(e) => { e.stopPropagation(); }}>Start</Button>}
        {apt.status === 'confirmed' && <Button variant="success" size="sm" leftIcon={<CheckCircle className="h-4 w-4" />} onClick={(e) => { e.stopPropagation(); }}>Check In</Button>}
        {(apt.status === 'scheduled' || apt.status === 'confirmed') && (
          <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); setSelectedApt(apt); setShowCancelModal(true); }}><XCircle className="h-4 w-4 text-red-500" /></Button>
        )}
        <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); setSelectedApt(apt); }}><FileText className="h-4 w-4" /></Button>
      </div>
    )},
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 font-heading">My Appointments</h1>
        <p className="text-gray-500">Manage your today&apos;s and upcoming appointments.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card padding="sm"><p className="text-sm text-gray-500">Today</p><p className="text-xl font-bold text-primary font-heading">{appointments.filter(a => a.status !== 'completed' && a.status !== 'cancelled').length}</p></Card>
        <Card padding="sm"><p className="text-sm text-gray-500">Checked In</p><p className="text-xl font-bold text-yellow-600 font-heading">{appointments.filter(a => a.status === 'checked_in').length}</p></Card>
        <Card padding="sm"><p className="text-sm text-gray-500">Completed</p><p className="text-xl font-bold text-green-600 font-heading">{appointments.filter(a => a.status === 'completed').length}</p></Card>
        <Card padding="sm"><p className="text-sm text-gray-500">Total Patients</p><p className="text-xl font-bold text-gray-900 font-heading">1,247</p></Card>
      </div>

      <Card padding="md">
        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          <SearchInput value={search} onChange={setSearch} placeholder="Search patients..." className="flex-1 max-w-md" />
          <div className="flex gap-2 ml-auto">
            <Button variant="outline" size="sm" leftIcon={<Calendar className="h-4 w-4" />}>Today</Button>
            <Button variant="outline" size="sm" leftIcon={<Clock className="h-4 w-4" />}>This Week</Button>
          </div>
        </div>
        <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} variant="pills" className="mb-4" />
        <DataTable columns={columns} data={filtered} onRowClick={(apt) => setSelectedApt(apt)} emptyTitle="No appointments found" emptyDescription="No appointments match your criteria." />
      </Card>

      <Modal isOpen={!!selectedApt && !showCancelModal} onClose={() => setSelectedApt(null)} title="Appointment Details" size="lg">
        {selectedApt && (
          <div className="space-y-5">
            <div className="flex items-center gap-4 p-4 bg-primary-50 rounded-xl">
              <Avatar name={selectedApt.patient} size="lg" />
              <div className="flex-1"><p className="text-lg font-bold text-gray-900">{selectedApt.patient}</p><p className="text-sm text-gray-500">{selectedApt.age} years, {selectedApt.gender}</p></div>
              <Badge variant={statusVariants[selectedApt.status]} size="md">{selectedApt.status.replace('_', ' ')}</Badge>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="p-3 bg-gray-50 rounded-xl"><span className="text-gray-500">Time</span><p className="font-medium">{selectedApt.time}</p></div>
              <div className="p-3 bg-gray-50 rounded-xl"><span className="text-gray-500">Type</span><p className="font-medium">{selectedApt.type}</p></div>
              <div className="p-3 bg-gray-50 rounded-xl"><span className="text-gray-500">Phone</span><p className="font-medium">{selectedApt.phone}</p></div>
              <div className="p-3 bg-gray-50 rounded-xl"><span className="text-gray-500">Last Visit</span><p className="font-medium">{formatDate(selectedApt.lastVisit)}</p></div>
            </div>
            <div><p className="text-sm font-medium text-gray-700 mb-1">Reason</p><p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-xl">{selectedApt.reason}</p></div>
            <div className="flex gap-3 pt-2">
              {selectedApt.status === 'checked_in' && <Button leftIcon={<Play className="h-4 w-4" />}>Start Consultation</Button>}
              {selectedApt.status === 'confirmed' && <Button variant="success" leftIcon={<CheckCircle className="h-4 w-4" />}>Check In Patient</Button>}
              {selectedApt.status === 'scheduled' && (
                <>
                  <Button variant="success" leftIcon={<CheckCircle className="h-4 w-4" />}>Confirm</Button>
                  <Button variant="outline" leftIcon={<Phone className="h-4 w-4" />}>Call Patient</Button>
                  <Button variant="ghost" className="text-red-500" onClick={() => setShowCancelModal(true)} leftIcon={<XCircle className="h-4 w-4" />}>Cancel</Button>
                </>
              )}
            </div>
          </div>
        )}
      </Modal>

      <Modal isOpen={showCancelModal} onClose={() => { setShowCancelModal(false); setSelectedApt(null); }} title="Cancel Appointment" size="sm">
        <div className="space-y-4">
          <p className="text-sm text-gray-600">Are you sure you want to cancel the appointment with <strong>{selectedApt?.patient}</strong>?</p>
          <div className="p-3 bg-gray-50 rounded-xl">
            <p className="text-xs text-gray-500 mb-1">Reason for cancellation</p>
            <select className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm">
              <option>Patient requested</option>
              <option>Doctor unavailable</option>
              <option>Emergency</option>
              <option>Schedule conflict</option>
              <option>Other</option>
            </select>
          </div>
          <div className="flex justify-end gap-3">
            <Button variant="ghost" onClick={() => { setShowCancelModal(false); setSelectedApt(null); }}>Keep Appointment</Button>
            <Button variant="danger" onClick={() => { setShowCancelModal(false); setSelectedApt(null); }} leftIcon={<XCircle className="h-4 w-4" />}>Cancel Appointment</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
