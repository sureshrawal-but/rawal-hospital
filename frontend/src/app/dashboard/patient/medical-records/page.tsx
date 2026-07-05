'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import SearchInput from '@/components/ui/SearchInput';
import Modal from '@/components/ui/Modal';
import EmptyState from '@/components/ui/EmptyState';
import Accordion from '@/components/ui/Accordion';
import { FileText, Calendar, Stethoscope, Download, Search, Activity, Heart, Eye, AlertTriangle } from 'lucide-react';
import { formatDate } from '@/lib/utils';

const records = [
  { id: '1', date: '2025-01-10', doctor: 'Dr. John Smith', department: 'Cardiology', diagnosis: 'Hypertension - Stage 1', symptoms: 'Frequent headaches, dizziness, fatigue', notes: 'Patient presents with elevated BP readings. Prescribed lifestyle modifications and medication. Follow-up in 2 weeks.', prescriptions: ['Lisinopril 10mg', 'Amlodipine 5mg'], attachments: ['ECG_Report_Jan10.pdf', 'Blood_Test_Results.pdf'] },
  { id: '2', date: '2025-01-05', doctor: 'Dr. Michael Chen', department: 'Orthopedics', diagnosis: 'Lower Back Pain - Muscle Strain', symptoms: 'Sharp pain in lower back, difficulty bending', notes: 'Muscle strain due to improper lifting. Recommended rest, ice therapy, and physical therapy sessions.', prescriptions: ['Ibuprofen 400mg', 'Cyclobenzaprine 5mg'], attachments: ['XRay_Lumbar_Jan05.pdf'] },
  { id: '3', date: '2024-12-20', doctor: 'Dr. Sarah Johnson', department: 'Neurology', diagnosis: 'Migraine - Chronic', symptoms: 'Throbbing headache, sensitivity to light and sound', notes: 'Patient reports recurring migraines for 3 months. Prescribed preventive medication. Recommended keeping headache diary.', prescriptions: ['Sumatriptan 50mg', 'Propranolol 40mg'], attachments: ['MRI_Brain_Dec20.pdf'] },
  { id: '4', date: '2024-12-15', doctor: 'Dr. Emily Davis', department: 'Dermatology', diagnosis: 'Eczema - Moderate', symptoms: 'Red, itchy patches on arms and legs', notes: 'Allergic reaction identified. Prescribed topical corticosteroids and moisturizing regimen.', prescriptions: ['Hydrocortisone Cream 1%', 'Cetirizine 10mg'], attachments: ['Skin_Biopsy_Dec15.pdf'] },
  { id: '5', date: '2024-11-28', doctor: 'Dr. Robert Wilson', department: 'Ophthalmology', diagnosis: 'Myopia - Progressive', symptoms: 'Blurred distance vision, eye strain', notes: 'Annual eye examination. Prescription updated. Recommended new glasses and annual checkups.', prescriptions: [], attachments: ['Eye_Exam_Report_Nov28.pdf'] },
];

export default function MedicalRecords() {
  const [search, setSearch] = useState('');
  const [selectedRecord, setSelectedRecord] = useState<typeof records[0] | null>(null);

  const filtered = records.filter((r) =>
    r.doctor.toLowerCase().includes(search.toLowerCase()) ||
    r.department.toLowerCase().includes(search.toLowerCase()) ||
    r.diagnosis.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 font-heading">Medical Records</h1>
        <p className="text-gray-500">View and manage your complete medical history.</p>
      </div>

      <Card padding="md">
        <div className="mb-4">
          <SearchInput value={search} onChange={setSearch} placeholder="Search by doctor, department, or diagnosis..." className="max-w-md" />
        </div>

        {filtered.length === 0 ? (
          <EmptyState icon={<FileText className="h-8 w-8" />} title="No medical records found" description={search ? 'Try a different search term.' : 'No medical records available yet.'} />
        ) : (
          <div className="space-y-3">
            {filtered.map((record, index) => (
              <motion.div key={record.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }}
                className="p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer"
                onClick={() => setSelectedRecord(record)}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center shrink-0">
                      <Heart className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{record.diagnosis}</p>
                      <p className="text-sm text-gray-500">{record.doctor} &middot; {record.department}</p>
                      <div className="flex items-center gap-3 mt-1 text-xs text-gray-400">
                        <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {formatDate(record.date)}</span>
                        <span className="flex items-center gap-1"><Activity className="h-3 w-3" /> {record.symptoms}</span>
                      </div>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); setSelectedRecord(record); }}>View Details</Button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </Card>

      <Modal isOpen={!!selectedRecord} onClose={() => setSelectedRecord(null)} title="Medical Record Details" size="xl">
        {selectedRecord && (
          <div className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-primary-50 rounded-xl"><span className="text-xs text-gray-500">Diagnosis</span><p className="font-medium text-gray-900 mt-1">{selectedRecord.diagnosis}</p></div>
              <div className="p-3 bg-blue-50 rounded-xl"><span className="text-xs text-gray-500">Doctor</span><p className="font-medium text-gray-900 mt-1">{selectedRecord.doctor}</p></div>
              <div className="p-3 bg-gray-50 rounded-xl"><span className="text-xs text-gray-500">Department</span><p className="font-medium text-gray-900 mt-1">{selectedRecord.department}</p></div>
              <div className="p-3 bg-gray-50 rounded-xl"><span className="text-xs text-gray-500">Date</span><p className="font-medium text-gray-900 mt-1">{formatDate(selectedRecord.date)}</p></div>
            </div>

            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">Symptoms</p>
              <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-xl">{selectedRecord.symptoms}</p>
            </div>

            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">Doctor&apos;s Notes</p>
              <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-xl">{selectedRecord.notes}</p>
            </div>

            {selectedRecord.prescriptions.length > 0 && (
              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">Prescriptions</p>
                <div className="space-y-2">
                  {selectedRecord.prescriptions.map((rx, i) => (
                    <div key={i} className="flex items-center gap-3 p-2 bg-green-50 rounded-lg">
                      <div className="w-2 h-2 rounded-full bg-green-500" />
                      <span className="text-sm text-gray-700">{rx}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {selectedRecord.attachments.length > 0 && (
              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">Attachments</p>
                <div className="space-y-2">
                  {selectedRecord.attachments.map((file, i) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                      <div className="flex items-center gap-3">
                        <Eye className="h-4 w-4 text-primary" />
                        <span className="text-sm text-gray-700">{file}</span>
                      </div>
                      <Button variant="ghost" size="sm" leftIcon={<Download className="h-4 w-4" />}>Download</Button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex justify-end gap-3 pt-2 border-t border-gray-100">
              <Button variant="outline" size="sm" leftIcon={<Download className="h-4 w-4" />}>Download All</Button>
              <Button variant="ghost" size="sm" onClick={() => setSelectedRecord(null)}>Close</Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
