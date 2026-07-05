'use client';

import { BarChart as RechartsBar, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface BarChartProps {
  data: { label: string; value: number; value2?: number }[];
  dataKey?: string;
  dataKey2?: string;
  color?: string;
  color2?: string;
  height?: number;
  stacked?: boolean;
}

export default function BarChart({
  data,
  dataKey = 'value',
  dataKey2,
  color = '#1565C0',
  color2 = '#90caf9',
  height = 300,
  stacked = false,
}: BarChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <RechartsBar data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
        <XAxis dataKey="label" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9ca3af' }} />
        <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9ca3af' }} />
        <Tooltip
          contentStyle={{
            borderRadius: '12px',
            border: '1px solid #e5e7eb',
            boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
          }}
        />
        <Bar dataKey={dataKey} fill={color} radius={[6, 6, 0, 0]} barSize={32} stackId={stacked ? 'stack' : undefined} />
        {dataKey2 && (
          <Bar dataKey={dataKey2} fill={color2} radius={[6, 6, 0, 0]} barSize={32} stackId={stacked ? 'stack' : undefined} />
        )}
      </RechartsBar>
    </ResponsiveContainer>
  );
}
