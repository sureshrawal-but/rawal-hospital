'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Star, Quote } from 'lucide-react';
import Avatar from '@/components/ui/Avatar';
import Badge from '@/components/ui/Badge';

interface TestimonialCardProps {
  patientName: string;
  content: string;
  rating: number;
  department?: string;
  image?: string;
  className?: string;
}

export default function TestimonialCard({
  patientName,
  content,
  rating,
  department,
  image,
  className,
}: TestimonialCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={cn(
        'bg-white rounded-2xl border border-gray-100 p-6 shadow-sm relative',
        className
      )}
    >
      <Quote className="absolute top-4 right-4 h-8 w-8 text-primary-50" />
      <div className="flex items-center gap-1 mb-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={cn(
              'h-4 w-4',
              i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200'
            )}
          />
        ))}
      </div>
      <p className="text-gray-600 text-sm leading-relaxed mb-4 italic">
        &ldquo;{content}&rdquo;
      </p>
      <div className="flex items-center gap-3">
        <Avatar src={image} name={patientName} size="sm" />
        <div>
          <p className="text-sm font-semibold text-gray-900">{patientName}</p>
          {department && (
            <Badge variant="primary" size="sm">{department}</Badge>
          )}
        </div>
      </div>
    </motion.div>
  );
}
