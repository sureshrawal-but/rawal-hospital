'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, Users, Calendar, DollarSign, Activity, Download, Filter } from 'lucide-react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import StatCard from '@/components/ui/StatCard';
import Tabs from '@/components/ui/Tabs';
import EmptyState from '@/components/ui/EmptyState';
import ErrorState from '@/components/ui/ErrorState';
import { PageLoader } from '@/components/ui/Loader';

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const revenueData = [45, 52, 48, 61, 58, 72, 65, 78, 82, 91, 88, 95];
const patientData = [320, 380, 410, 390, 450, 520, 480, 560, 610, 590, 640, 680];
const surgeryData = [28, 32, 30, 35, 38, 42, 40, 45, 48, 52, 50, 55];

export default function AdminReportsPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [period, setPeriod] = useState('yearly');

  if (error) return <ErrorState title="Failed to load reports" onRetry={() => setError(false)} />;

  const ChartBar = ({ data, color = 'bg-primary', height = 120 }: { data: number[]; color?: string; height?: number }) => {
    const max = Math.max(...data);
    return (
      <div className="flex items-end gap-1.5 h-32">
        {data.map((v, i) => (
          <div key={i} className="flex-1 flex flex-col items-center gap-1">
            <span className="text-[10px] text-gray-400 font-medium">{v}</span>
            <motion.div
              initial={{ height: 0 }} animate={{ height: `${(v / max) * 100}%` }}
              transition={{ delay: i * 0.05, duration: 0.5 }}
              className={`w-full rounded-t-lg ${color} opacity-80 hover:opacity-100 transition-opacity cursor-pointer`}
              style={{ height: `${(v / max) * 100}%`, maxHeight: height }}
            />
          </div>
        ))}
      </div>
    );
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Analytics & Reports</h1>
          <p className="text-gray-500 text-sm mt-1">Hospital performance metrics and insights</p>
        </div>
        <div className="flex items-center gap-3">
          <Tabs tabs={[
            { id: 'weekly', label: 'Weekly' },
            { id: 'monthly', label: 'Monthly' },
            { id: 'yearly', label: 'Yearly' },
          ]} activeTab={period} onChange={setPeriod} variant="pills" />
          <Button variant="outline" size="sm" leftIcon={<Download className="h-4 w-4" />}>Export</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard title="Total Revenue" value="₹8.4 Cr" icon={<DollarSign className="h-5 w-5" />} variant="primary" trend={{ value: 12.5, isPositive: true, label: 'vs last year' }} />
        <StatCard title="Total Patients" value="24,847" icon={<Users className="h-5 w-5" />} variant="success" trend={{ value: 8.3, isPositive: true, label: 'vs last year' }} />
        <StatCard title="OPD Visits" value="18,432" icon={<Activity className="h-5 w-5" />} variant="info" trend={{ value: 5.1, isPositive: true, label: 'vs last year' }} />
        <StatCard title="Surgeries" value="1,847" icon={<TrendingUp className="h-5 w-5" />} variant="warning" trend={{ value: 2.4, isPositive: false, label: 'vs last year' }} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Monthly Revenue (₹ in Lakhs)</h3>
            <Badge variant="success" dot>+12.5%</Badge>
          </div>
          <ChartBar data={revenueData} color="bg-primary" />
          <div className="flex justify-between mt-2 text-xs text-gray-400">
            {months.map(m => <span key={m}>{m}</span>)}
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Patient Footfall</h3>
            <Badge variant="success" dot>+8.3%</Badge>
          </div>
          <ChartBar data={patientData} color="bg-green-500" />
          <div className="flex justify-between mt-2 text-xs text-gray-400">
            {months.map(m => <span key={m}>{m}</span>)}
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Surgeries Performed</h3>
          <ChartBar data={surgeryData} color="bg-yellow-500" height={80} />
          <div className="flex justify-between mt-2 text-xs text-gray-400">
            {months.map(m => <span key={m}>{m}</span>)}
          </div>
        </Card>

        <Card>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Department Performance</h3>
          <div className="space-y-3">
            {[
              { dept: 'Cardiology', revenue: 38, color: 'bg-primary' },
              { dept: 'Orthopedics', revenue: 28, color: 'bg-green-500' },
              { dept: 'Neurology', revenue: 22, color: 'bg-yellow-500' },
              { dept: 'Pediatrics', revenue: 12, color: 'bg-purple-500' },
            ].map((d) => (
              <div key={d.dept}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-700">{d.dept}</span>
                  <span className="font-medium">{d.revenue}%</span>
                </div>
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: `${d.revenue}%` }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className={`h-full rounded-full ${d.color}`} />
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Stats</h3>
          <div className="space-y-4">
            {[
              { label: 'Bed Occupancy', value: '78%', color: 'text-primary', bar: '78' },
              { label: 'Staff Attendance', value: '94%', color: 'text-green-600', bar: '94' },
              { label: 'Avg Wait Time', value: '12 min', color: 'text-yellow-600', bar: '30' },
              { label: 'Patient Satisfaction', value: '4.6/5', color: 'text-primary', bar: '92' },
            ].map((s) => (
              <div key={s.label}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">{s.label}</span>
                  <span className={`font-semibold ${s.color}`}>{s.value}</span>
                </div>
                <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: `${s.bar}%` }}
                    transition={{ duration: 0.8 }}
                    className="h-full rounded-full bg-primary" />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </motion.div>
  );
}
