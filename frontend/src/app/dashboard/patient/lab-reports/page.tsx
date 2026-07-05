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
import { FlaskConical, Calendar, Stethoscope, Download, FileText, AlertCircle, CheckCircle, Clock } from 'lucide-react';
import { formatDate } from '@/lib/utils';

const labReports = [
  { id: '1', testName: 'Complete Blood Count (CBC)', category: 'Hematology', date: '2025-01-10', orderedBy: 'Dr. John Smith', status: 'completed', result: 'All parameters within normal ranges. Hemoglobin: 14.5 g/dL, WBC: 7,200/uL, Platelets: 250,000/uL.', normalRange: 'Hb: 13.5-17.5 g/dL, WBC: 4,500-11,000/uL', notes: 'No abnormalities detected.' },
  { id: '2', testName: 'Lipid Profile', category: 'Biochemistry', date: '2025-01-10', orderedBy: 'Dr. John Smith', status: 'completed', result: 'Total Cholesterol: 195 mg/dL, LDL: 120 mg/dL, HDL: 45 mg/dL, Triglycerides: 150 mg/dL.', normalRange: 'TC: <200 mg/dL, LDL: <130 mg/dL, HDL: >40 mg/dL', notes: 'Borderline LDL. Dietary changes recommended.' },
  { id: '3', testName: 'Blood Glucose (Fasting)', category: 'Biochemistry', date: '2025-01-05', orderedBy: 'Dr. Michael Chen', status: 'completed', result: 'Fasting Blood Glucose: 92 mg/dL', normalRange: '70-100 mg/dL', notes: 'Normal.' },
  { id: '4', testName: 'Thyroid Function (TSH)', category: 'Endocrinology', date: '2024-12-20', orderedBy: 'Dr. Sarah Johnson', status: 'completed', result: 'TSH: 2.5 mIU/L', normalRange: '0.5-5.0 mIU/L', notes: 'Normal thyroid function.' },
  { id: '5', testName: 'Urinalysis', category: 'Pathology', date: '2025-01-10', orderedBy: 'Dr. John Smith', status: 'in_progress', result: 'Processing...', normalRange: 'N/A', notes: 'Results pending.' },
  { id: '6', testName: 'Vitamin D Test', category: 'Biochemistry', date: '2025-01-15', orderedBy: 'Dr. Lisa Anderson', status: 'pending', result: 'Sample collected. Awaiting analysis.', normalRange: '30-100 ng/mL', notes: '' },
];

const statusVariants: Record<string, 'success' | 'warning' | 'danger' | 'info' | 'primary'> = {
  completed: 'success',
  in_progress: 'warning',
  pending: 'info',
  cancelled: 'danger',
};

export default function LabReports() {
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [selectedReport, setSelectedReport] = useState<typeof labReports[0] | null>(null);

  const tabs = [
    { id: 'all', label: 'All Reports' },
    { id: 'completed', label: 'Completed' },
    { id: 'in_progress', label: 'In Progress' },
    { id: 'pending', label: 'Pending' },
  ];

  const filtered = labReports.filter((r) => {
    const matchesSearch = r.testName.toLowerCase().includes(search.toLowerCase()) || r.category.toLowerCase().includes(search.toLowerCase());
    const matchesTab = activeTab === 'all' || r.status === activeTab;
    return matchesSearch && matchesTab;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 font-heading">Lab Reports</h1>
        <p className="text-gray-500">View your laboratory test results and reports.</p>
      </div>

      <Card padding="md">
        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          <SearchInput value={search} onChange={setSearch} placeholder="Search by test name or category..." className="flex-1 max-w-md" />
        </div>
        <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} variant="pills" className="mb-4" />

        {filtered.length === 0 ? (
          <EmptyState icon={<FlaskConical className="h-8 w-8" />} title="No lab reports found" description={search ? 'Try a different search term.' : 'No lab reports available yet.'} />
        ) : (
          <div className="space-y-3">
            {filtered.map((report, index) => (
              <motion.div key={report.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }}
                className="p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer"
                onClick={() => setSelectedReport(report)}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-indigo-100 flex items-center justify-center shrink-0">
                      <FlaskConical className="h-6 w-6 text-indigo-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{report.testName}</p>
                      <p className="text-sm text-gray-500">{report.category} &middot; Ordered by {report.orderedBy}</p>
                      <div className="flex items-center gap-3 mt-1 text-xs text-gray-400">
                        <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {formatDate(report.date)}</span>
                      </div>
                    </div>
                  </div>
                  <Badge variant={statusVariants[report.status]} size="sm">{report.status.replace('_', ' ')}</Badge>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </Card>

      <Modal isOpen={!!selectedReport} onClose={() => setSelectedReport(null)} title="Lab Report Details" size="xl">
        {selectedReport && (
          <div className="space-y-5">
            <div className="flex items-center justify-between p-4 bg-indigo-50 rounded-xl">
              <div className="flex items-center gap-3">
                <FlaskConical className="h-8 w-8 text-indigo-600" />
                <div>
                  <p className="font-semibold text-gray-900">{selectedReport.testName}</p>
                  <p className="text-sm text-gray-500">{selectedReport.category}</p>
                </div>
              </div>
              <Badge variant={statusVariants[selectedReport.status]} size="sm">{selectedReport.status.replace('_', ' ')}</Badge>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="p-3 bg-gray-50 rounded-xl"><span className="text-gray-500">Ordered By</span><p className="font-medium text-gray-900">{selectedReport.orderedBy}</p></div>
              <div className="p-3 bg-gray-50 rounded-xl"><span className="text-gray-500">Date</span><p className="font-medium text-gray-900">{formatDate(selectedReport.date)}</p></div>
            </div>

            {selectedReport.status === 'completed' && (
              <>
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">Result</p>
                  <p className="text-sm text-gray-600 bg-green-50 p-3 rounded-xl">{selectedReport.result}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">Normal Range</p>
                  <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-xl">{selectedReport.normalRange}</p>
                </div>
              </>
            )}

            {selectedReport.status === 'in_progress' && (
              <div className="p-4 bg-yellow-50 rounded-xl flex items-center gap-3">
                <Clock className="h-5 w-5 text-yellow-600" />
                <p className="text-sm text-yellow-700">Your test is currently being processed. Results will be available soon.</p>
              </div>
            )}

            {selectedReport.status === 'pending' && (
              <div className="p-4 bg-blue-50 rounded-xl flex items-center gap-3">
                <AlertCircle className="h-5 w-5 text-blue-600" />
                <p className="text-sm text-blue-700">Sample has been collected. Awaiting laboratory analysis.</p>
              </div>
            )}

            {selectedReport.notes && (
              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">Notes</p>
                <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-xl">{selectedReport.notes}</p>
              </div>
            )}

            <div className="flex justify-end gap-3 pt-2 border-t border-gray-100">
              <Button variant="outline" size="sm" leftIcon={<Download className="h-4 w-4" />}>Download Report</Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
