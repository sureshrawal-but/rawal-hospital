'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Users, Calendar, DollarSign, Activity, Bed, AlertTriangle,
  ArrowRight, Download, RefreshCw, PlusCircle, FileText, UserPlus, Settings
} from 'lucide-react';
import StatCard from '@/components/ui/StatCard';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import BarChart from '@/components/charts/BarChart';
import PieChart from '@/components/charts/PieChart';

const stats = [
  { title: 'Total Patients', value: '12,847', icon: <Users className="w-6 h-6" />, trend: { value: 12, isPositive: true } },
  { title: "Today's Appointments", value: '48', icon: <Calendar className="w-6 h-6" />, trend: { value: 8, isPositive: true } },
  { title: 'Monthly Revenue', value: '₹48,92,000', icon: <DollarSign className="w-6 h-6" />, trend: { value: 15, isPositive: true } },
  { title: 'Active Doctors', value: '86', icon: <Activity className="w-6 h-6" />, trend: { value: 2, isPositive: true } },
  { title: 'Available Beds', value: '142', icon: <Bed className="w-6 h-6" />, trend: { value: 5, isPositive: false } },
  { title: 'Bed Occupancy', value: '68%', icon: <Bed className="w-6 h-6" />, trend: { value: 3, isPositive: true } },
];

const monthlyRevenue = [
  { label: 'Jan', value: 3200000, value2: 2400000 },
  { label: 'Feb', value: 3800000, value2: 2600000 },
  { label: 'Mar', value: 4200000, value2: 2800000 },
  { label: 'Apr', value: 4500000, value2: 3000000 },
  { label: 'May', value: 4700000, value2: 3100000 },
  { label: 'Jun', value: 4892000, value2: 3200000 },
];

const appointmentData = [
  { department: 'Cardiology', completed: 42, pending: 8 },
  { department: 'Orthopedics', completed: 38, pending: 6 },
  { department: 'Neurology', completed: 28, pending: 4 },
  { department: 'Pediatrics', completed: 35, pending: 5 },
  { department: 'General Medicine', completed: 55, pending: 12 },
];

const recentAppointments = [
  { id: 'APT-001', patient: 'Rajesh Kumar', doctor: 'Dr. Sharma', time: '09:00 AM', status: 'COMPLETED' },
  { id: 'APT-002', patient: 'Priya Singh', doctor: 'Dr. Verma', time: '09:30 AM', status: 'IN_PROGRESS' },
  { id: 'APT-003', patient: 'Amit Patel', doctor: 'Dr. Gupta', time: '10:00 AM', status: 'SCHEDULED' },
  { id: 'APT-004', patient: 'Sunita Devi', doctor: 'Dr. Mehta', time: '10:30 AM', status: 'WAITING' },
  { id: 'APT-005', patient: 'Vikram Joshi', doctor: 'Dr. Kapoor', time: '11:00 AM', status: 'CANCELLED' },
];

const occupancyData = [
  { name: 'General Ward', occupied: 45, available: 15 },
  { name: 'ICU', occupied: 18, available: 2 },
  { name: 'Private', occupied: 30, available: 10 },
  { name: 'Emergency', occupied: 12, available: 8 },
];

const stockAlerts = [
  { medicine: 'Amoxicillin 500mg', stock: 5, minLevel: 20 },
  { medicine: 'Paracetamol 650mg', stock: 8, minLevel: 50 },
  { medicine: 'Insulin Glargine', stock: 3, minLevel: 15 },
];

const statusVariant: Record<string, 'success' | 'warning' | 'danger' | 'info'> = {
  COMPLETED: 'success',
  IN_PROGRESS: 'warning',
  SCHEDULED: 'info',
  WAITING: 'warning',
  CANCELLED: 'danger',
};

export default function AdminDashboard() {
  const [period, setPeriod] = useState('monthly');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 font-heading">Admin Dashboard</h1>
          <p className="text-gray-500 mt-1">Hospital overview and analytics</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm"><RefreshCw className="w-4 h-4 mr-2" />Refresh</Button>
          <Button variant="primary" size="sm"><Download className="w-4 h-4 mr-2" />Export Report</Button>
        </div>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {stats.map((stat, i) => (
          <StatCard key={i} title={stat.title} value={stat.value} icon={stat.icon} trend={stat.trend} />
        ))}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="lg:col-span-2">
          <Card variant="glass" padding="lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 font-heading">Revenue Overview</h3>
              <div className="flex gap-2">
                {['weekly', 'monthly', 'yearly'].map(p => (
                  <button key={p} onClick={() => setPeriod(p)} className={`px-3 py-1 rounded-full text-sm capitalize ${period === p ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>{p}</button>
                ))}
              </div>
            </div>
            <BarChart data={monthlyRevenue} dataKey="value" dataKey2="value2" color="#1565C0" color2="#E53935" />
            <div className="flex justify-center gap-6 mt-3">
              <div className="flex items-center gap-2 text-sm"><span className="w-3 h-3 rounded-full bg-[#1565C0]" /> Revenue</div>
              <div className="flex items-center gap-2 text-sm"><span className="w-3 h-3 rounded-full bg-[#E53935]" /> Expenses</div>
            </div>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card variant="glass" padding="lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 font-heading">Department Performance</h3>
            <PieChart data={appointmentData.map(d => ({ name: d.department, value: d.completed }))} />
          </Card>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="lg:col-span-2">
          <Card variant="glass" padding="lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 font-heading">Recent Appointments</h3>
              <Button variant="ghost" size="sm">View All <ArrowRight className="w-4 h-4 ml-1" /></Button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-2 font-medium text-gray-500">ID</th>
                    <th className="text-left py-3 px-2 font-medium text-gray-500">Patient</th>
                    <th className="text-left py-3 px-2 font-medium text-gray-500">Doctor</th>
                    <th className="text-left py-3 px-2 font-medium text-gray-500">Time</th>
                    <th className="text-left py-3 px-2 font-medium text-gray-500">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentAppointments.map((apt) => (
                    <tr key={apt.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-2 font-medium text-gray-900">{apt.id}</td>
                      <td className="py-3 px-2 text-gray-700">{apt.patient}</td>
                      <td className="py-3 px-2 text-gray-700">{apt.doctor}</td>
                      <td className="py-3 px-2 text-gray-700">{apt.time}</td>
                      <td className="py-3 px-2"><Badge variant={statusVariant[apt.status]}>{apt.status}</Badge></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <Card variant="glass" padding="lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 font-heading">Bed Occupancy</h3>
            <div className="space-y-4">
              {occupancyData.map((ward) => (
                <div key={ward.name}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-700 font-medium">{ward.name}</span>
                    <span className="text-gray-500">{ward.occupied}/{ward.occupied + ward.available}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-primary rounded-full h-2 transition-all duration-500" style={{ width: `${(ward.occupied / (ward.occupied + ward.available)) * 100}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
          <Card variant="glass" padding="lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 font-heading">Stock Alerts</h3>
              <Badge variant="danger">{stockAlerts.length} Low Stock</Badge>
            </div>
            <div className="space-y-3">
              {stockAlerts.map((item) => (
                <div key={item.medicine} className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <AlertTriangle className="w-5 h-5 text-red-500" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">{item.medicine}</p>
                      <p className="text-xs text-gray-500">Min stock: {item.minLevel}</p>
                    </div>
                  </div>
                  <span className="text-sm font-semibold text-red-600">{item.stock} units</span>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
          <Card variant="glass" padding="lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 font-heading">Quick Actions</h3>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'Add Doctor', icon: UserPlus, color: 'bg-blue-50 text-blue-600' },
                { label: 'New Patient', icon: PlusCircle, color: 'bg-green-50 text-green-600' },
                { label: 'Create Invoice', icon: FileText, color: 'bg-purple-50 text-purple-600' },
                { label: 'View Reports', icon: Activity, color: 'bg-orange-50 text-orange-600' },
                { label: 'Manage Staff', icon: Users, color: 'bg-cyan-50 text-cyan-600' },
                { label: 'System Settings', icon: Settings, color: 'bg-red-50 text-red-600' },
              ].map((action) => {
                const Icon = action.icon;
                return (
                  <button key={action.label} className={`flex items-center gap-3 p-4 rounded-xl ${action.color} hover:shadow-md transition-all`}>
                    <Icon className="w-5 h-5" />
                    <span className="text-sm font-medium">{action.label}</span>
                  </button>
                );
              })}
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
