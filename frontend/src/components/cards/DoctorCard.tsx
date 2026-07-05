'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Star, MapPin, Clock, Award } from 'lucide-react';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';

interface DoctorCardProps {
  id: string;
  name: string;
  specialty: string;
  image?: string;
  rating: number;
  experience: number;
  location?: string;
  availability?: string;
  fee?: number;
  department?: string;
  className?: string;
}

export default function DoctorCard({
  id,
  name,
  specialty,
  image,
  rating,
  experience,
  location,
  availability,
  fee,
  department,
  className,
}: DoctorCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -8 }}
      className={cn(
        'bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden group transition-all duration-300 hover:shadow-xl',
        className
      )}
    >
      <div className="relative h-48 overflow-hidden bg-gradient-to-br from-primary-50 to-blue-50">
        {image ? (
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="w-24 h-24 rounded-full bg-white/80 backdrop-blur flex items-center justify-center">
              <span className="text-3xl font-bold text-primary font-heading">
                {name.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
          </div>
        )}
        <div className="absolute top-3 right-3">
          <Badge variant="primary" size="sm">
            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 mr-1" />
            {rating}
          </Badge>
        </div>
      </div>

      <div className="p-5">
        <h3 className="text-lg font-semibold text-gray-900 font-heading mb-1">{name}</h3>
        <p className="text-sm text-primary font-medium mb-3">{specialty}</p>

        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Award className="h-4 w-4 text-primary" />
            <span>{experience} years experience</span>
          </div>
          {location && (
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <MapPin className="h-4 w-4 text-primary" />
              <span>{location}</span>
            </div>
          )}
          {availability && (
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Clock className="h-4 w-4 text-primary" />
              <span>{availability}</span>
            </div>
          )}
        </div>

        {department && (
          <Badge variant="info" size="sm" className="mb-4">{department}</Badge>
        )}

        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          {fee ? (
            <div>
              <span className="text-lg font-bold text-gray-900">${fee}</span>
              <span className="text-sm text-gray-400 ml-1">/ visit</span>
            </div>
          ) : <div />}
          <Link href={`/doctors/${id}`}>
            <Button size="sm">View Profile</Button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
