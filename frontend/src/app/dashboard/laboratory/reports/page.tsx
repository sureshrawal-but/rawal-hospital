'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Search, CheckCircle, XCircle, Clock, Download, Eye, UserRound, FlaskConical } from 'lucide-react';
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

interface LabReport {
  id: string;
  patientName: string;
  doctorName: string;
  testName: string;
  sampleCollected: string;
  resultDate: string;
  status: 'pending' | 'in-progress' | 'verified' | 'cancelled';
  notes?: string;
}

const labReports: LabReport[] = [
  { id: 'LR-001', patientName: 'Aarav Sharma', doctorName: 'Dr. Rajesh Mehta', testName: 'Complete Blood Count', sampleCollected: '2026-07-05', resultDate: '', status: 'pending' },
  { id: 'LR-002', patientName: 'Priya Patel', doctorName: 'Dr. Sunita Gupta', testName: 'Lipid Profile', sampleCollected: '2026-07-05', resultDate: '', status: 'in-progress' },
  { id: 'LR-003', patientName: 'Rahul Verma', doctorName: 'Dr. Anand Sharma', testName: 'Liver Function Test', sampleCollected: '2026-07-04', resultDate: '2026-07-05', status: 'verified' },
  { id: 'LR-004', patientName: 'Sneha Gupta', doctorName: 'Dr. Neha Patel', testName: 'Thyroid Profile', sampleCollected: '2026-07-04', resultDate: '2026-07-04', status: 'verified' },
  { id: 'LR-005', patientName: 'Vikram Singh', doctorName: 'Dr. Rajesh Mehta', testName: 'Blood Glucose', sampleCollected: '2026-07-03', resultDate: '', status: 'cancelled' },
  { id: 'LR-006', patientName: 'Ananya Gupta', doctorName: 'Dr. Vikram Singh', testName: 'Urinalysis', sampleCollected: '2026-07-05', resultDate: '', status: 'pending' },
];

export default function LabReportsPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [tab, setTab] = useState('all');
  const [selectedReport, setSelectedReport] = useState<LabReport | null>(null);

  const filtered = labReports.filter(r => {
    const ms = r.patientName.toLowerCase().includes(searchQuery.toLowerCase()) || r.id.toLowerCase().includes(searchQuery.toLowerCase()) || r.testName.toLowerCase().includes(searchQuery.toLowerCase());
    if (tab === 'all') return ms;
    return ms && r.status === tab;
  });

  const columns: Column<LabReport>[] = [
    { key: 'id', header: 'Report ID', sortable: true },
    { key: 'patientName', header: 'Patient', sortable: true, render: (r) => (
      <div className="flex items-center gap-2">
        <UserRound className="h-4 w-4 text-primary" />
        <span className="font-medium">{r.patientName}</span>
      </div>
    )},
    { key: 'testName', header: 'Test', render: (r) => (
      <div className="flex items-center gap-1"><FlaskConical className="h-3.5 w-3.5 text-gray-400" />{r.testName}</div>
    )},
    { key: 'doctorName', header: 'Doctor' },
    { key: 'sampleCollected', header: 'Sample Date' },
    { key: 'resultDate', header: 'Result Date', render: (r) => r.resultDate || '-' },
    { key: 'status', header: 'Status', render: (r) => (
      <Badge variant={r.status === 'verified' ? 'success' : r.status === 'in-progress' ? 'info' : r.status === 'pending' ? 'warning' : 'danger'}>
        {r.status === 'in-progress' ? 'In Progress' : r.status}
      </Badge>
    )},
    { key: 'actions', header: '', render: (r) => (
      <div className="flex gap-1">
        <Button size="sm" variant="ghost" onClick={(e) => { e.stopPropagation(); setSelectedReport(r); }}>
          <Eye className="h-3.5 w-3.5" />
        </Button>
        {r.status === 'verified' && (
          <Button size="sm" variant="ghost"><Download className="h-3.5 w-3.5" /></Button>
        )}
        {r.status === 'pending' && (
          <Button size="sm" variant="primary">Process</Button>
        )}
      </div>
    )},
  ];

  if (error) return <ErrorState title="Failed to load lab reports" onRetry={() => setError(false)} />;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Lab Reports</h1>
          <p className="text-gray-500 text-sm mt-1">Manage test results and verification workflow</p>
        </div>
        <SearchInput value={searchQuery} onChange={setSearchQuery} placeholder="Search reports..." className="w-64" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard title="Total Today" value="86" icon={<FileText className="h-5 w-5" />} variant="primary" />
        <StatCard title="Pending" value="28" icon={<Clock className="h-5 w-5" />} variant="warning" />
        <StatCard title="In Progress" value="15" icon={<FlaskConical className="h-5 w-5" />} variant="info" />
        <StatCard title="Verified" value="38" icon={<CheckCircle className="h-5 w-5" />} variant="success" />
      </div>

      <Tabs tabs={[
        { id: 'all', label: 'All', badge: 2847 },
        { id: 'pending', label: 'Pending', badge: 423 },
        { id: 'in-progress', label: 'In Progress', badge: 156 },
        { id: 'verified', label: 'Verified', badge: 2134 },
        { id: 'cancelled', label: 'Cancelled', badge: 134 },
      ]} activeTab={tab} onChange={setTab} variant="pills" />

      <Card>
        <DataTable columns={columns} data={filtered} isLoading={loading}
          emptyTitle="No reports found" emptyDescription="No lab reports match the current filter." />
      </Card>

      <Modal isOpen={!!selectedReport} onClose={() => setSelectedReport(null)} title={`Lab Report - ${selectedReport?.id}`} size="lg">
        {selectedReport && (
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-primary-50 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
                  <FileText className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold">{selectedReport.patientName}</p>
                  <p className="text-sm text-gray-500">{selectedReport.testName}</p>
                </div>
              </div>
              <Badge variant={selectedReport.status === 'verified' ? 'success' : selectedReport.status === 'in-progress' ? 'info' : selectedReport.status === 'pending' ? 'warning' : 'danger'} size="lg">
                {selectedReport.status}
              </Badge>
            </div>

            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="p-3 border border-gray-100 rounded-xl">
                <span className="text-gray-500 text-xs">Doctor</span>
                <p className="font-medium">{selectedReport.doctorName}</p>
              </div>
              <div className="p-3 border border-gray-100 rounded-xl">
                <span className="text-gray-500 text-xs">Sample Collected</span>
                <p className="font-medium">{selectedReport.sampleCollected}</p>
              </div>
            </div>

            {selectedReport.status === 'verified' ? (
              <div className="space-y-3">
                <h4 className="font-semibold text-gray-900">Test Results</h4>
                <div className="border border-gray-100 rounded-xl overflow-hidden">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50">
                      <tr><th className="px-4 py-2 text-left text-xs text-gray-500 uppercase">Parameter</th><th className="px-4 py-2 text-left text-xs text-gray-500 uppercase">Result</th><th className="px-4 py-2 text-left text-xs text-gray-500 uppercase">Reference Range</th></tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      <tr><td className="px-4 py-2">Hemoglobin</td><td className="px-4 py-2 font-medium">14.2 g/dL</td><td className="px-4 py-2 text-gray-500">13.0 - 17.0</td></tr>
                      <tr><td className="px-4 py-2">WBC Count</td><td className="px-4 py-2 font-medium">7,500 /μL</td><td className="px-4 py-2 text-gray-500">4,000 - 11,000</td></tr>
                      <tr><td className="px-4 py-2">Platelets</td><td className="px-4 py-2 font-medium">2.5 L /μL</td><td className="px-4 py-2 text-gray-500">1.5 - 4.5</td></tr>
                    </tbody>
                  </table>
                </div>
                <div className="p-3 bg-green-50 rounded-xl flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="text-sm font-medium text-green-700">Verified by Dr. Amit Patel on {selectedReport.resultDate}</span>
                </div>
              </div>
            ) : selectedReport.status === 'pending' ? (
              <div className="p-4 bg-yellow-50 rounded-xl flex items-center gap-3">
                <Clock className="h-6 w-6 text-yellow-600" />
                <div>
                  <p className="font-medium text-yellow-700">Awaiting Processing</p>
                  <p className="text-sm text-yellow-600">Sample received. Test results pending.</p>
                </div>
                <Button size="sm" className="ml-auto">Start Test</Button>
              </div>
            ) : selectedReport.status === 'cancelled' ? (
              <div className="p-4 bg-red-50 rounded-xl flex items-center gap-3">
                <XCircle className="h-6 w-6 text-red-600" />
                <div>
                  <p className="font-medium text-red-700">Report Cancelled</p>
                  <p className="text-sm text-red-600">This test request has been cancelled.</p>
                </div>
              </div>
            ) : (
              <div className="p-4 bg-blue-50 rounded-xl flex items-center gap-3">
                <FlaskConical className="h-6 w-6 text-blue-600" />
                <div>
                  <p className="font-medium text-blue-700">Test In Progress</p>
                  <p className="text-sm text-blue-600">Analysis is underway.</p>
                </div>
              </div>
            )}

            <div className="flex justify-end gap-2 pt-2">
              {selectedReport.status === 'in-progress' && (
                <Button variant="success" leftIcon={<CheckCircle className="h-4 w-4" />}>Verify Report</Button>
              )}
              <Button variant="outline" leftIcon={<Download className="h-4 w-4" />}>Download PDF</Button>
            </div>
          </div>
        )}
      </Modal>
    </motion.div>
  );
}
