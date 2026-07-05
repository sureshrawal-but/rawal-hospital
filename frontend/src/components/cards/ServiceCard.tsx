'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';
import { HeartPulse, Ambulance, Scissors, Scan, Pill, Baby, Syringe, Activity, Truck, Video, FlaskConical, Monitor, UtensilsCrossed, Car, Accessibility } from 'lucide-react';
import { ComponentType } from 'react';

interface ServiceCardProps {
  title: string;
  description: string;
  icon: string;
  color?: string;
  className?: string;
}

const iconMap: Record<string, ComponentType<any>> = {
  HeartPulse, Ambulance, Scissors, Scan, Pill, Baby, Syringe, Activity, Truck, Video,
  FlaskConical, Monitor, UtensilsCrossed, Car, Accessibility,
};

export default function ServiceCard({ title, description, icon, color = '#1565C0', className }: ServiceCardProps) {
  const IconComponent = iconMap[icon] || HeartPulse;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -6 }}
      className={cn(
        'bg-white rounded-2xl border border-gray-100 p-6 shadow-sm transition-all duration-300 hover:shadow-lg group cursor-default',
        className
      )}
    >
      <div
        className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4 transition-colors duration-300"
        style={{ backgroundColor: `${color}15` }}
      >
        <IconComponent className="h-7 w-7 transition-colors duration-300" style={{ color }} />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2 font-heading">{title}</h3>
      <p className="text-sm text-gray-500 leading-relaxed">{description}</p>
    </motion.div>
  );
}
