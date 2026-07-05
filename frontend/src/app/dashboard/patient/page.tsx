'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import StatCard from '@/components/ui/StatCard';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import { Calendar, FileText, ClipboardList, FlaskConical, DollarSign, User, ArrowRight, Clock, Activity } from 'lucide-react';
import { formatDate } from '@/lib/utils';

const upcomingAppointments = [
  { id: '1', doctor: 'Dr. John Smith', department: 'Cardiology', date: '2025-01-20', time: '10:30 AM', status: 'confirmed' },
  { id: '2', doctor: 'Dr. Sarah Johnson', department: 'Neurology', date: '2025-01-25', time: '2:00 PM', status: 'scheduled' },
];

const recentPrescriptions = [
  { id: '1', doctor: 'Dr. John Smith', date: '2025-01-10', diagnosis: 'Hypertension' },
  { id: '2', doctor: 'Dr. Michael Chen', date: '2025-01-05', diagnosis: 'Lower back pain' },
];

export default function PatientDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 font-heading">Patient Dashboard</h1>
          <p className="text-gray-500">Welcome back! Here is your health overview.</p>
        </div>
        <Link href="/appointments">
          <Button leftIcon={<Calendar className="h-4 w-4" />}>Book Appointment</Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Upcoming Appointments" value="2" icon={<Calendar className="h-6 w-6" />} variant="primary" />
        <StatCard title="Medical Records" value="12" icon={<FileText className="h-6 w-6" />} variant="success" />
        <StatCard title="Prescriptions" value="5" icon={<ClipboardList className="h-6 w-6" />} variant="warning" />
        <StatCard title="Lab Reports" value="3" icon={<FlaskConical className="h-6 w-6" />} variant="default" />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card padding="md">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 font-heading">Upcoming Appointments</h3>
            <Link href="/dashboard/patient/appointments" className="text-sm text-primary hover:underline">View All</Link>
          </div>
          {upcomingAppointments.length === 0 ? (
            <p className="text-gray-500 text-sm py-8 text-center">No upcoming appointments</p>
          ) : (
            <div className="space-y-3">
              {upcomingAppointments.map((apt) => (
                <div key={apt.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                  <div>
                    <p className="font-medium text-gray-900 text-sm">{apt.doctor}</p>
                    <p className="text-xs text-gray-500">{apt.department}</p>
                    <div className="flex items-center gap-3 mt-1 text-xs text-gray-400">
                      <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {formatDate(apt.date)}</span>
                      <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {apt.time}</span>
                    </div>
                  </div>
                  <Badge variant={apt.status === 'confirmed' ? 'success' : 'primary'} size="sm">{apt.status}</Badge>
                </div>
              ))}
            </div>
          )}
        </Card>

        <Card padding="md">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 font-heading">Recent Prescriptions</h3>
            <Link href="/dashboard/patient/prescriptions" className="text-sm text-primary hover:underline">View All</Link>
          </div>
          {recentPrescriptions.length === 0 ? (
            <p className="text-gray-500 text-sm py-8 text-center">No prescriptions yet</p>
          ) : (
            <div className="space-y-3">
              {recentPrescriptions.map((rx) => (
                <div key={rx.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                  <div>
                    <p className="font-medium text-gray-900 text-sm">{rx.doctor}</p>
                    <p className="text-xs text-gray-500">{rx.diagnosis}</p>
                    <p className="text-xs text-gray-400 mt-1">{formatDate(rx.date)}</p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-gray-300" />
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card padding="md">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 font-heading">Quick Actions</h3>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'Book Appointment', icon: Calendar, href: '/appointments', color: 'text-primary bg-primary-50' },
              { label: 'Medical Records', icon: FileText, href: '/dashboard/patient/medical-records', color: 'text-accent bg-accent-50' },
              { label: 'View Invoices', icon: DollarSign, href: '/dashboard/patient/invoices', color: 'text-yellow-600 bg-yellow-50' },
              { label: 'Update Profile', icon: User, href: '/dashboard/patient/profile', color: 'text-purple-600 bg-purple-50' },
            ].map((action) => (
              <Link key={action.label} href={action.href} className={`flex items-center gap-3 p-3 rounded-xl ${action.color} hover:opacity-80 transition-opacity`}>
                <action.icon className="h-5 w-5" />
                <span className="text-sm font-medium">{action.label}</span>
              </Link>
            ))}
          </div>
        </Card>

        <Card padding="md">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 font-heading">Recent Activity</h3>
          </div>
          <div className="space-y-3">
            {[
              { text: 'Appointment confirmed with Dr. Smith', time: '2 hours ago', icon: Calendar },
              { text: 'Lab report uploaded - Blood Test', time: '1 day ago', icon: FlaskConical },
              { text: 'Prescription refilled', time: '3 days ago', icon: ClipboardList },
            ].map((activity, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center shrink-0">
                  <activity.icon className="h-4 w-4 text-gray-500" />
                </div>
                <div>
                  <p className="text-sm text-gray-700">{activity.text}</p>
                  <p className="text-xs text-gray-400">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
