'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import TextArea from '@/components/ui/TextArea';
import Select from '@/components/ui/Select';
import Badge from '@/components/ui/Badge';
import Avatar from '@/components/ui/Avatar';
import Tabs from '@/components/ui/Tabs';
import Modal from '@/components/ui/Modal';
import { User, Phone, Mail, MapPin, Calendar, Heart, AlertTriangle, Shield, Save, Camera, Plus, X } from 'lucide-react';
import { BLOOD_GROUPS } from '@/lib/constants';

const initialProfile = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@email.com',
  phone: '(555) 123-4567',
  dateOfBirth: '1985-06-15',
  gender: 'male',
  bloodGroup: 'A+',
  address: '123 Main Street, Apt 4B, New York, NY 10001',
  emergencyContact: 'Jane Doe',
  emergencyPhone: '(555) 987-6543',
  emergencyRelation: 'Spouse',
  allergies: 'Penicillin, Peanuts',
  medicalConditions: 'Hypertension (Diagnosed 2020), Asthma (Childhood)',
  insuranceProvider: 'Blue Cross Blue Shield',
  insuranceNumber: 'BCBS-98765432',
};

export default function PatientProfile() {
  const [profile, setProfile] = useState(initialProfile);
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('personal');
  const [showAllergyModal, setShowAllergyModal] = useState(false);
  const [saved, setSaved] = useState(false);

  const tabs = [
    { id: 'personal', label: 'Personal Info' },
    { id: 'medical', label: 'Medical History' },
    { id: 'insurance', label: 'Insurance' },
  ];

  const handleSave = () => {
    setSaved(true);
    setIsEditing(false);
    setTimeout(() => setSaved(false), 3000);
  };

  const updateField = (field: string, value: string) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 font-heading">My Profile</h1>
          <p className="text-gray-500">Manage your personal and medical information.</p>
        </div>
        <div className="flex gap-3">
          {saved && <Badge variant="success" size="md"><Save className="h-3 w-3" /> Saved</Badge>}
          {!isEditing ? (
            <Button onClick={() => setIsEditing(true)} leftIcon={<User className="h-4 w-4" />}>Edit Profile</Button>
          ) : (
            <>
              <Button variant="ghost" onClick={() => setIsEditing(false)}>Cancel</Button>
              <Button onClick={handleSave} leftIcon={<Save className="h-4 w-4" />}>Save Changes</Button>
            </>
          )}
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <Card padding="md" className="lg:col-span-1">
          <div className="flex flex-col items-center text-center">
            <Avatar name={`${profile.firstName} ${profile.lastName}`} size="xl" className="mb-4" />
            {isEditing && (
              <Button variant="outline" size="sm" leftIcon={<Camera className="h-4 w-4" />} className="mb-4">Change Photo</Button>
            )}
            <h2 className="text-xl font-bold text-gray-900 font-heading">{profile.firstName} {profile.lastName}</h2>
            <p className="text-sm text-gray-500">Patient</p>
            <div className="flex items-center gap-2 mt-2">
              <Badge variant="primary" size="sm">{profile.bloodGroup}</Badge>
              <Badge variant="success" size="sm">Active</Badge>
            </div>
            <div className="w-full mt-6 space-y-3 text-sm">
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl"><Mail className="h-4 w-4 text-gray-400" /><span className="text-gray-600">{profile.email}</span></div>
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl"><Phone className="h-4 w-4 text-gray-400" /><span className="text-gray-600">{profile.phone}</span></div>
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl"><MapPin className="h-4 w-4 text-gray-400" /><span className="text-gray-600">{profile.address}</span></div>
            </div>
          </div>
        </Card>

        <Card padding="md" className="lg:col-span-2">
          <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} variant="pills" className="mb-6" />

          {activeTab === 'personal' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <Input label="First Name" value={profile.firstName} onChange={(e) => updateField('firstName', e.target.value)} disabled={!isEditing} icon={<User className="h-4 w-4" />} />
                <Input label="Last Name" value={profile.lastName} onChange={(e) => updateField('lastName', e.target.value)} disabled={!isEditing} icon={<User className="h-4 w-4" />} />
                <Input label="Email" type="email" value={profile.email} onChange={(e) => updateField('email', e.target.value)} disabled={!isEditing} icon={<Mail className="h-4 w-4" />} />
                <Input label="Phone" value={profile.phone} onChange={(e) => updateField('phone', e.target.value)} disabled={!isEditing} icon={<Phone className="h-4 w-4" />} />
                <Input label="Date of Birth" type="date" value={profile.dateOfBirth} onChange={(e) => updateField('dateOfBirth', e.target.value)} disabled={!isEditing} icon={<Calendar className="h-4 w-4" />} />
                <Select label="Gender" value={profile.gender} onChange={(e) => updateField('gender', e.target.value)} disabled={!isEditing} options={[{ value: 'male', label: 'Male' }, { value: 'female', label: 'Female' }, { value: 'other', label: 'Other' }]} />
                <Select label="Blood Group" value={profile.bloodGroup} onChange={(e) => updateField('bloodGroup', e.target.value)} disabled={!isEditing} options={BLOOD_GROUPS.map((bg) => ({ value: bg, label: bg }))} />
              </div>
              <TextArea label="Address" value={profile.address} onChange={(e) => updateField('address', e.target.value)} disabled={!isEditing} />
              <div className="grid md:grid-cols-2 gap-4">
                <Input label="Emergency Contact Name" value={profile.emergencyContact} onChange={(e) => updateField('emergencyContact', e.target.value)} disabled={!isEditing} icon={<User className="h-4 w-4" />} />
                <Input label="Emergency Phone" value={profile.emergencyPhone} onChange={(e) => updateField('emergencyPhone', e.target.value)} disabled={!isEditing} icon={<Phone className="h-4 w-4" />} />
              </div>
            </motion.div>
          )}

          {activeTab === 'medical' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
              <div className="p-4 bg-yellow-50 rounded-xl flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
                <div>
                  <p className="font-medium text-yellow-800">Allergies</p>
                  <p className="text-sm text-yellow-700">{profile.allergies}</p>
                </div>
                {isEditing && <Button variant="ghost" size="sm" className="ml-auto" onClick={() => setShowAllergyModal(true)}><Plus className="h-4 w-4" /></Button>}
              </div>
              <div className="p-4 bg-blue-50 rounded-xl flex items-start gap-3">
                <Heart className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <p className="font-medium text-blue-800">Medical Conditions</p>
                  <p className="text-sm text-blue-700">{profile.medicalConditions}</p>
                </div>
              </div>
              <TextArea label="Allergies" value={profile.allergies} onChange={(e) => updateField('allergies', e.target.value)} disabled={!isEditing} />
              <TextArea label="Medical Conditions" value={profile.medicalConditions} onChange={(e) => updateField('medicalConditions', e.target.value)} disabled={!isEditing} />
            </motion.div>
          )}

          {activeTab === 'insurance' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
              <div className="p-4 bg-green-50 rounded-xl flex items-start gap-3">
                <Shield className="h-5 w-5 text-green-600 mt-0.5" />
                <div>
                  <p className="font-medium text-green-800">Insurance Information</p>
                  <p className="text-sm text-green-700">Your insurance details are kept private and secure.</p>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <Input label="Insurance Provider" value={profile.insuranceProvider} onChange={(e) => updateField('insuranceProvider', e.target.value)} disabled={!isEditing} icon={<Shield className="h-4 w-4" />} />
                <Input label="Insurance Number" value={profile.insuranceNumber} onChange={(e) => updateField('insuranceNumber', e.target.value)} disabled={!isEditing} />
              </div>
            </motion.div>
          )}
        </Card>
      </div>

      <Modal isOpen={showAllergyModal} onClose={() => setShowAllergyModal(false)} title="Add Allergy">
        <div className="space-y-4">
          <Input label="Allergy Name" placeholder="e.g., Penicillin" />
          <Select label="Severity" options={[{ value: 'mild', label: 'Mild' }, { value: 'moderate', label: 'Moderate' }, { value: 'severe', label: 'Severe' }]} />
          <div className="flex justify-end gap-3">
            <Button variant="ghost" onClick={() => setShowAllergyModal(false)}>Cancel</Button>
            <Button onClick={() => setShowAllergyModal(false)}>Add</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
