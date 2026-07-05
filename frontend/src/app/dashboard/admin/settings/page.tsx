'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Settings, Save, Building2, Phone, Mail, Globe, Clock, MapPin, Ambulance, Shield } from 'lucide-react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import Tabs from '@/components/ui/Tabs';
import ErrorState from '@/components/ui/ErrorState';
import { PageLoader } from '@/components/ui/Loader';

export default function AdminSettingsPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [tab, setTab] = useState('general');
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  if (error) return <ErrorState title="Failed to load settings" onRetry={() => setError(false)} />;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Hospital Settings</h1>
          <p className="text-gray-500 text-sm mt-1">Configure hospital information and preferences</p>
        </div>
        <Button leftIcon={saved ? undefined : <Save className="h-4 w-4" />} onClick={handleSave}
          variant={saved ? 'success' : 'primary'}>
          {saved ? 'Saved!' : 'Save Changes'}
        </Button>
      </div>

      <Tabs tabs={[
        { id: 'general', label: 'General', icon: <Building2 className="h-4 w-4" /> },
        { id: 'contact', label: 'Contact', icon: <Phone className="h-4 w-4" /> },
        { id: 'hours', label: 'Working Hours', icon: <Clock className="h-4 w-4" /> },
        { id: 'emergency', label: 'Emergency', icon: <Ambulance className="h-4 w-4" /> },
      ]} activeTab={tab} onChange={setTab} variant="underline" />

      {tab === 'general' && (
        <Card>
          <div className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Hospital Name</label>
                <input type="text" className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
                  defaultValue="Rawal Hospital" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Registration No.</label>
                <input type="text" className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
                  defaultValue="HSP-REG-2024-0042" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
              <textarea className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none" rows={2}
                defaultValue="123, Healthcare Avenue, Andheri West, Mumbai - 400053" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                <input type="text" className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none" defaultValue="Mumbai" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                <input type="text" className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none" defaultValue="Maharashtra" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Pincode</label>
                <input type="text" className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none" defaultValue="400053" />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
                <input type="text" className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
                  defaultValue="www.rawalhospital.com" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Total Beds</label>
                <input type="number" className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none" defaultValue="350" />
              </div>
            </div>
          </div>
        </Card>
      )}

      {tab === 'contact' && (
        <Card>
          <div className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <input type="text" className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
                  defaultValue="+91-22-6789-0000" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Alternate Phone</label>
                <input type="text" className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
                  defaultValue="+91-22-6789-0001" />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input type="email" className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
                  defaultValue="contact@rawalhospital.com" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Emergency Contact</label>
                <input type="text" className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
                  defaultValue="+91-22-6789-0999" />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Ambulance Contact</label>
                <input type="text" className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
                  defaultValue="+91-22-6789-0888" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Helpline</label>
                <input type="text" className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
                  defaultValue="1800-123-RAWAL" />
              </div>
            </div>
          </div>
        </Card>
      )}

      {tab === 'hours' && (
        <Card>
          <div className="space-y-4">
            {[
              { day: 'Monday - Friday', opd: '08:00 - 20:00', emergency: '24/7', pharmacy: '07:00 - 22:00' },
              { day: 'Saturday', opd: '08:00 - 17:00', emergency: '24/7', pharmacy: '08:00 - 20:00' },
              { day: 'Sunday', opd: 'Closed', emergency: '24/7', pharmacy: '09:00 - 17:00' },
              { day: 'Public Holidays', opd: 'Closed', emergency: '24/7', pharmacy: '09:00 - 17:00' },
            ].map((row) => (
              <div key={row.day} className="grid grid-cols-4 gap-4 p-3 border border-gray-100 rounded-xl items-center">
                <span className="font-medium text-gray-900">{row.day}</span>
                <div>
                  <label className="text-xs text-gray-500">OPD</label>
                  <input type="text" className="w-full rounded-lg border border-gray-200 px-3 py-1.5 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none" defaultValue={row.opd} />
                </div>
                <div>
                  <label className="text-xs text-gray-500">Emergency</label>
                  <input type="text" className="w-full rounded-lg border border-gray-200 px-3 py-1.5 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none" defaultValue={row.emergency} />
                </div>
                <div>
                  <label className="text-xs text-gray-500">Pharmacy</label>
                  <input type="text" className="w-full rounded-lg border border-gray-200 px-3 py-1.5 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none" defaultValue={row.pharmacy} />
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {tab === 'emergency' && (
        <Card>
          <div className="space-y-5">
            <div className="p-4 bg-red-50 rounded-xl flex items-center gap-3">
              <Ambulance className="h-8 w-8 text-red-500" />
              <div>
                <p className="font-semibold text-red-700">Emergency Services</p>
                <p className="text-sm text-red-600">Available 24/7 - Dial 1800-123-RAWAL for emergencies</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Emergency Department Head</label>
                <input type="text" className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
                  defaultValue="Dr. Vikram Singh" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Trauma Team Lead</label>
                <input type="text" className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
                  defaultValue="Dr. Amit Kumar" />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">No. of Ambulances</label>
                <input type="number" className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none" defaultValue="8" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Avg Response Time (min)</label>
                <input type="number" className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none" defaultValue="12" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Emergency Protocols</label>
              <textarea className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none" rows={3}
                defaultValue="Code Blue - Cardiac Arrest, Code Red - Fire, Code Black - Bomb Threat, Code Pink - Infant Abduction" />
            </div>
          </div>
        </Card>
      )}
    </motion.div>
  );
}
