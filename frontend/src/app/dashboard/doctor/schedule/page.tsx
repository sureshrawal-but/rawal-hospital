'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, Plus, Check, X, ChevronLeft, ChevronRight } from 'lucide-react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import Modal from '@/components/ui/Modal';
import EmptyState from '@/components/ui/EmptyState';
import ErrorState from '@/components/ui/ErrorState';
import { PageLoader } from '@/components/ui/Loader';

const WEEKDAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const TIME_SLOTS = ['09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '14:00', '14:30', '15:00', '15:30', '16:00'];

interface Slot {
  id: string;
  day: string;
  time: string;
  available: boolean;
  patientName?: string;
  type?: string;
}

const generateSchedule = (): Slot[] => {
  const slots: Slot[] = [];
  WEEKDAYS.forEach(day => {
    TIME_SLOTS.forEach(time => {
      const isAvailable = Math.random() > 0.4;
      slots.push({
        id: `${day}-${time}`,
        day,
        time,
        available: isAvailable,
        patientName: isAvailable ? undefined : ['Aarav Sharma', 'Priya Patel', 'Rahul Verma', 'Sneha Gupta'][Math.floor(Math.random() * 4)],
        type: isAvailable ? undefined : ['Check-up', 'Follow-up', 'Consultation'][Math.floor(Math.random() * 3)],
      });
    });
  });
  return slots;
};

export default function DoctorSchedulePage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [schedule, setSchedule] = useState<Slot[]>(generateSchedule);
  const [selectedDay, setSelectedDay] = useState('Monday');
  const [showAvailability, setShowAvailability] = useState(false);

  const daySlots = schedule.filter(s => s.day === selectedDay);

  const toggleSlot = (slotId: string) => {
    setSchedule(prev => prev.map(s => s.id === slotId && !s.patientName ? { ...s, available: !s.available } : s));
  };

  if (error) return <ErrorState title="Failed to load schedule" onRetry={() => setError(false)} />;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Weekly Schedule</h1>
          <p className="text-gray-500 text-sm mt-1">Manage your availability and appointments</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="success" dot>Available</Badge>
          <Badge variant="danger" dot>Booked</Badge>
          <Button variant="primary" size="sm" leftIcon={<Plus className="h-4 w-4" />} onClick={() => setShowAvailability(true)}>
            Set Availability
          </Button>
        </div>
      </div>

      <Card>
        <div className="flex gap-1 overflow-x-auto pb-2">
          {WEEKDAYS.map(day => {
            const available = schedule.filter(s => s.day === day && s.available).length;
            const total = schedule.filter(s => s.day === day).length;
            return (
              <button key={day} onClick={() => setSelectedDay(day)}
                className={`flex-1 min-w-[100px] p-3 rounded-xl text-center transition-all ${
                  selectedDay === day ? 'bg-primary text-white shadow-lg' : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
                }`}>
                <p className="text-xs font-medium">{day.slice(0, 3)}</p>
                <p className="text-lg font-bold">{available}/{total}</p>
                <p className="text-xs opacity-80">slots</p>
              </button>
            );
          })}
        </div>
      </Card>

      <Card>
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Calendar className="h-5 w-5 text-primary" />
          {selectedDay} - Time Slots
        </h3>
        {daySlots.length === 0 ? (
          <EmptyState title="No slots" description="No time slots configured for this day." />
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {daySlots.map((slot) => (
              <motion.div key={slot.id} whileHover={{ scale: 1.02 }}
                className={`p-3 rounded-xl border-2 text-center cursor-pointer transition-all ${
                  !slot.available
                    ? 'border-red-200 bg-red-50 cursor-not-allowed'
                    : slot.available
                    ? 'border-green-200 bg-green-50 hover:border-green-400'
                    : 'border-gray-200 bg-white hover:border-primary'
                }`}
                onClick={() => toggleSlot(slot.id)}>
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Clock className="h-3.5 w-3.5 text-gray-400" />
                  <span className="text-sm font-semibold">{slot.time}</span>
                </div>
                {slot.patientName ? (
                  <div>
                    <p className="text-xs font-medium text-red-600 truncate">{slot.patientName}</p>
                    <Badge variant="danger" size="sm">Booked</Badge>
                  </div>
                ) : slot.available ? (
                  <Badge variant="success" size="sm">Available</Badge>
                ) : (
                  <Badge variant="default" size="sm">Unavailable</Badge>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </Card>

      <Modal isOpen={showAvailability} onClose={() => setShowAvailability(false)} title="Set Weekly Availability" size="lg">
        <div className="space-y-4">
          {WEEKDAYS.map(day => {
            const slots = schedule.filter(s => s.day === day && !s.patientName);
            const availableCount = slots.filter(s => s.available).length;
            return (
              <div key={day} className="p-3 border border-gray-100 rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-gray-900">{day}</span>
                  <span className="text-sm text-gray-500">{availableCount}/{slots.length} available</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {slots.map(slot => (
                    <button key={slot.id} onClick={() => toggleSlot(slot.id)}
                      className={`px-2 py-1 text-xs rounded-lg border transition-all ${
                        slot.available ? 'bg-green-50 border-green-200 text-green-700' : 'bg-gray-50 border-gray-200 text-gray-400'
                      }`}>
                      {slot.time} {slot.available ? <Check className="h-3 w-3 inline" /> : <X className="h-3 w-3 inline" />}
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="ghost" onClick={() => setShowAvailability(false)}>Cancel</Button>
            <Button onClick={() => setShowAvailability(false)}>Save Schedule</Button>
          </div>
        </div>
      </Modal>
    </motion.div>
  );
}
