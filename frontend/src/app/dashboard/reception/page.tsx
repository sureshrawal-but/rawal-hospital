'use client';

import Link from 'next/link';
import StatCard from '@/components/ui/StatCard';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import { Calendar, Users, UserPlus, Clock, Activity, ArrowRight } from 'lucide-react';

const todayAppointments = [
  { id: '1', patient: 'John Doe', time: '9:00 AM', doctor: 'Dr. Smith', status: 'checked_in' },
  { id: '2', patient: 'Jane Smith', time: '10:00 AM', doctor: 'Dr. Johnson', status: 'confirmed' },
  { id: '3', patient: 'Robert Wilson', time: '11:30 AM', doctor: 'Dr. Chen', status: 'scheduled' },
  { id: '4', patient: 'Emily Davis', time: '1:00 PM', doctor: 'Dr. Brown', status: 'scheduled' },
  { id: '5', patient: 'Michael Brown', time: '2:30 PM', doctor: 'Dr. Smith', status: 'confirmed' },
];

export default function ReceptionDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 font-heading">Reception Dashboard</h1>
          <p className="text-gray-500">Manage appointments and patient registration.</p>
        </div>
        <Link href="/dashboard/reception/patients">
          <Button leftIcon={<UserPlus className="h-4 w-4" />}>Register Patient</Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Today's Appointments" value="32" icon={<Calendar className="h-6 w-6" />} variant="primary" />
        <StatCard title="Checked In" value="8" icon={<Users className="h-6 w-6" />} variant="success" />
        <StatCard title="Waiting" value="12" icon={<Clock className="h-6 w-6" />} variant="warning" />
        <StatCard title="Walk-ins Today" value="5" icon={<UserPlus className="h-6 w-6" />} variant="default" />
      </div>

      <Card padding="md">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 font-heading">Today's Appointments</h3>
          <Link href="/dashboard/reception/appointments" className="text-sm text-primary hover:underline">View All</Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 text-xs font-semibold text-gray-500 uppercase">
                <th className="text-left py-3 px-2">Patient</th>
                <th className="text-left py-3 px-2">Time</th>
                <th className="text-left py-3 px-2">Doctor</th>
                <th className="text-left py-3 px-2">Status</th>
                <th className="text-right py-3 px-2">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {todayAppointments.map((apt) => (
                <tr key={apt.id} className="hover:bg-gray-50">
                  <td className="py-3 px-2 text-sm font-medium text-gray-900">{apt.patient}</td>
                  <td className="py-3 px-2 text-sm text-gray-500">{apt.time}</td>
                  <td className="py-3 px-2 text-sm text-gray-500">{apt.doctor}</td>
                  <td className="py-3 px-2">
                    <Badge variant={apt.status === 'checked_in' ? 'warning' : apt.status === 'confirmed' ? 'success' : 'primary'} size="sm">{apt.status}</Badge>
                  </td>
                  <td className="py-3 px-2 text-right">
                    <button className="text-xs text-primary hover:underline">Check In</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
