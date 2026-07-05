'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import StatCard from '@/components/ui/StatCard';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import Avatar from '@/components/ui/Avatar';
import { Calendar, Users, Clock, Activity, Stethoscope, ArrowRight, CheckCircle, XCircle } from 'lucide-react';
import { formatDate } from '@/lib/utils';

const todaysAppointments = [
  { id: '1', patient: 'John Doe', time: '9:00 AM', type: 'Checkup', status: 'checked_in' },
  { id: '2', patient: 'Jane Smith', time: '10:30 AM', type: 'Consultation', status: 'scheduled' },
  { id: '3', patient: 'Robert Wilson', time: '11:00 AM', type: 'Follow-up', status: 'confirmed' },
  { id: '4', patient: 'Emily Davis', time: '2:00 PM', type: 'Surgery Prep', status: 'scheduled' },
];

const recentPatients = [
  { id: '1', name: 'Michael Brown', condition: 'Hypertension', lastVisit: '2025-01-10' },
  { id: '2', name: 'Sarah Lee', condition: 'Migraine', lastVisit: '2025-01-08' },
  { id: '3', name: 'David Kim', condition: 'Diabetes', lastVisit: '2025-01-05' },
];

export default function DoctorDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 font-heading">Doctor Dashboard</h1>
        <p className="text-gray-500">Manage your appointments and patients.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Today's Appointments" value="8" icon={<Calendar className="h-6 w-6" />} variant="primary" />
        <StatCard title="Total Patients" value="245" icon={<Users className="h-6 w-6" />} variant="success" />
        <StatCard title="Pending" value="3" icon={<Clock className="h-6 w-6" />} variant="warning" />
        <StatCard title="Consultations" value="1,247" icon={<Activity className="h-6 w-6" />} variant="default" />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card padding="md">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 font-heading">Today's Schedule</h3>
            <Link href="/dashboard/doctor/appointments" className="text-sm text-primary hover:underline">View All</Link>
          </div>
          <div className="space-y-3">
            {todaysAppointments.map((apt) => (
              <div key={apt.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                <div className="flex items-center gap-3">
                  <Avatar name={apt.patient} size="sm" />
                  <div>
                    <p className="font-medium text-gray-900 text-sm">{apt.patient}</p>
                    <div className="flex items-center gap-2 text-xs text-gray-400">
                      <span>{apt.time}</span>
                      <span>•</span>
                      <span>{apt.type}</span>
                    </div>
                  </div>
                </div>
                <Badge variant={apt.status === 'checked_in' ? 'warning' : apt.status === 'confirmed' ? 'success' : 'primary'} size="sm">
                  {apt.status}
                </Badge>
              </div>
            ))}
          </div>
        </Card>

        <Card padding="md">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 font-heading">Recent Patients</h3>
            <Link href="/dashboard/doctor/patients" className="text-sm text-primary hover:underline">View All</Link>
          </div>
          <div className="space-y-3">
            {recentPatients.map((patient) => (
              <div key={patient.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                <div className="flex items-center gap-3">
                  <Avatar name={patient.name} size="sm" />
                  <div>
                    <p className="font-medium text-gray-900 text-sm">{patient.name}</p>
                    <p className="text-xs text-gray-500">{patient.condition}</p>
                  </div>
                </div>
                <span className="text-xs text-gray-400">Last: {formatDate(patient.lastVisit)}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card padding="md">
        <h3 className="text-lg font-semibold text-gray-900 font-heading mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <Link href="/dashboard/doctor/appointments" className="flex items-center gap-3 p-3 rounded-xl bg-blue-50 text-blue-600 hover:opacity-80">
            <Calendar className="h-5 w-5" />
            <span className="text-sm font-medium">Appointments</span>
          </Link>
          <Link href="/dashboard/doctor/schedule" className="flex items-center gap-3 p-3 rounded-xl bg-green-50 text-green-600 hover:opacity-80">
            <Clock className="h-5 w-5" />
            <span className="text-sm font-medium">Schedule</span>
          </Link>
          <Link href="/dashboard/doctor/prescriptions" className="flex items-center gap-3 p-3 rounded-xl bg-purple-50 text-purple-600 hover:opacity-80">
            <Activity className="h-5 w-5" />
            <span className="text-sm font-medium">Prescriptions</span>
          </Link>
          <Link href="/dashboard/doctor/patients" className="flex items-center gap-3 p-3 rounded-xl bg-yellow-50 text-yellow-600 hover:opacity-80">
            <Users className="h-5 w-5" />
            <span className="text-sm font-medium">Patients</span>
          </Link>
        </div>
      </Card>
    </div>
  );
}
