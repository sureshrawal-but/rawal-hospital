'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ArrowRight, Heart, Brain, Bone, Baby, Activity, Venus, Eye, Tooth, Ambulance, Scan, Lungs, EyeOff } from 'lucide-react';
import { ComponentType } from 'react';

interface DepartmentCardProps {
  name: string;
  slug: string;
  description: string;
  icon?: string;
  doctorCount?: number;
  className?: string;
}

const iconMap: Record<string, ComponentType<any>> = {
  Heart, Brain, Bone, Baby, Activity, Venus, Eye, Tooth, Ambulance, Scan, Lungs,
};

export default function DepartmentCard({ name, slug, description, icon, doctorCount, className }: DepartmentCardProps) {
  const IconComponent = icon ? iconMap[icon] : Heart;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -6 }}
      className={cn(
        'bg-white rounded-2xl border border-gray-100 p-6 shadow-sm transition-all duration-300 hover:shadow-lg group',
        className
      )}
    >
      <div className="w-14 h-14 rounded-2xl bg-primary-50 flex items-center justify-center mb-4 group-hover:bg-primary transition-colors duration-300">
        {IconComponent && <IconComponent className="h-7 w-7 text-primary group-hover:text-white transition-colors duration-300" />}
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2 font-heading">{name}</h3>
      <p className="text-sm text-gray-500 mb-4 line-clamp-2">{description}</p>
      <div className="flex items-center justify-between">
        {doctorCount !== undefined && (
          <span className="text-xs text-gray-400">{doctorCount} Doctors</span>
        )}
        <Link
          href={`/departments/${slug}`}
          className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:text-primary-700 transition-colors"
        >
          Learn More
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </motion.div>
  );
}
