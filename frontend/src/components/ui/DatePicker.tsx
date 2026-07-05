'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Calendar as CalendarIcon } from 'lucide-react';
import Calendar from './Calendar';
import { format } from 'date-fns';

interface DatePickerProps {
  value?: Date;
  onChange?: (date: Date) => void;
  label?: string;
  error?: string;
  placeholder?: string;
  className?: string;
  minDate?: Date;
}

export default function DatePicker({
  value,
  onChange,
  label,
  error,
  placeholder = 'Select date',
  className,
  minDate,
}: DatePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(value);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (date: Date) => {
    if (minDate && date < minDate) return;
    setSelectedDate(date);
    onChange?.(date);
    setIsOpen(false);
  };

  return (
    <div className={cn('w-full relative', className)} ref={ref}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>
      )}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'w-full flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm transition-all',
          'hover:border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none',
          error && 'border-red-400',
          !selectedDate && 'text-gray-400'
        )}
      >
        <CalendarIcon className="h-4 w-4 text-gray-400" />
        <span className="flex-1 text-left">
          {selectedDate ? format(selectedDate, 'MMM dd, yyyy') : placeholder}
        </span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute z-50 mt-2 left-0 shadow-xl"
          >
            <Calendar
              selectedDate={selectedDate}
              onDateSelect={handleSelect}
            />
          </motion.div>
        )}
      </AnimatePresence>
      {error && <p className="mt-1.5 text-red-500 text-xs">{error}</p>}
    </div>
  );
}
