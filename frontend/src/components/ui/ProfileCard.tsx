'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Star, MapPin, Clock, Phone } from 'lucide-react';
import Avatar from './Avatar';
import Badge from './Badge';
import Button from './Button';

interface ProfileCardProps {
  name: string;
  role: string;
  avatar?: string | null;
  specialty?: string;
  rating?: number;
  location?: string;
  availability?: string;
  phone?: string;
  experience?: number;
  department?: string;
  onBookAppointment?: () => void;
  onViewProfile?: () => void;
  className?: string;
  variant?: 'doctor' | 'patient' | 'staff';
}

export default function ProfileCard({
  name,
  role,
  avatar,
  specialty,
  rating,
  location,
  availability,
  phone,
  experience,
  department,
  onBookAppointment,
  onViewProfile,
  className,
  variant = 'doctor',
}: ProfileCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={cn(
        'bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden transition-all duration-300 hover:shadow-lg',
        className
      )}
    >
      <div className="bg-gradient-to-r from-primary to-primary-700 h-20 relative">
        <div className="absolute -bottom-10 left-6">
          <Avatar src={avatar} name={name} size="xl" className="border-4 border-white shadow-lg" />
        </div>
      </div>
      <div className="pt-12 p-6">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 font-heading">{name}</h3>
            <p className="text-sm text-gray-500">{role}</p>
          </div>
          {rating !== undefined && (
            <div className="flex items-center gap-1 bg-yellow-50 px-2.5 py-1 rounded-lg">
              <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
              <span className="text-sm font-semibold text-yellow-700">{rating}</span>
            </div>
          )}
        </div>

        <div className="space-y-2 mb-4">
          {specialty && (
            <Badge variant="primary" size="sm">{specialty}</Badge>
          )}
          {department && (
            <Badge variant="info" size="sm">{department}</Badge>
          )}
          {experience !== undefined && (
            <Badge variant="purple" size="sm">{experience} years exp.</Badge>
          )}
        </div>

        <div className="space-y-2 text-sm text-gray-600">
          {location && (
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-gray-400" />
              <span>{location}</span>
            </div>
          )}
          {availability && (
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-gray-400" />
              <span>{availability}</span>
            </div>
          )}
          {phone && (
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-gray-400" />
              <span>{phone}</span>
            </div>
          )}
        </div>

        <div className="flex gap-2 mt-5">
          {onBookAppointment && (
            <Button size="sm" onClick={onBookAppointment} className="flex-1">
              Book Appointment
            </Button>
          )}
          {onViewProfile && (
            <Button size="sm" variant="outline" onClick={onViewProfile} className="flex-1">
              View Profile
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
