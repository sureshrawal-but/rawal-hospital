'use client';

import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

interface TimelineItem {
  id: string;
  title: string;
  description?: string;
  date?: string;
  icon?: React.ReactNode;
  status?: 'completed' | 'current' | 'upcoming';
}

interface TimelineProps {
  items: TimelineItem[];
  variant?: 'default' | 'alternating';
  className?: string;
}

export default function Timeline({ items, variant = 'default', className }: TimelineProps) {
  return (
    <div className={cn('relative', className)}>
      <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200" />
      <div className="space-y-8">
        {items.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className={cn(
              'relative pl-14',
              variant === 'alternating' && index % 2 === 1 && 'md:pl-0 md:pr-14 md:text-right'
            )}
          >
            <div
              className={cn(
                'absolute left-4 w-4 h-4 rounded-full border-2 bg-white z-10',
                item.status === 'completed' && 'border-accent bg-accent',
                item.status === 'current' && 'border-primary',
                item.status === 'upcoming' && 'border-gray-300',
                !item.status && 'border-primary'
              )}
              style={{ top: '4px' }}
            >
              {item.status === 'completed' && (
                <Check className="h-3 w-3 text-white absolute -top-0.5 -left-0.5" />
              )}
            </div>
            <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-semibold text-gray-900">{item.title}</h3>
                  {item.description && (
                    <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                  )}
                </div>
                {item.date && (
                  <span className="text-xs text-gray-400 whitespace-nowrap">{item.date}</span>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
