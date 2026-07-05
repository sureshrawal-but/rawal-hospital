'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, isSameMonth, isSameDay, isToday, parseISO } from 'date-fns';

interface CalendarProps {
  selectedDate?: Date;
  onDateSelect?: (date: Date) => void;
  markedDates?: string[];
  className?: string;
}

export default function Calendar({ selectedDate, onDateSelect, markedDates = [], className }: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const days = useMemo(() => {
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(currentDate);
    const calStart = startOfWeek(monthStart);
    const calEnd = endOfWeek(monthEnd);
    return eachDayOfInterval({ start: calStart, end: calEnd });
  }, [currentDate]);

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const prevMonth = () => setCurrentDate((prev) => subMonths(prev, 1));
  const nextMonth = () => setCurrentDate((prev) => addMonths(prev, 1));

  const hasAppointments = (date: Date) =>
    markedDates.some((d) => isSameDay(parseISO(d), date));

  return (
    <div className={cn('bg-white rounded-2xl border border-gray-100 p-4', className)}>
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={prevMonth}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          aria-label="Previous month"
        >
          <ChevronLeft className="h-5 w-5 text-gray-600" />
        </button>
        <h3 className="text-base font-semibold text-gray-900 font-heading">
          {format(currentDate, 'MMMM yyyy')}
        </h3>
        <button
          onClick={nextMonth}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          aria-label="Next month"
        >
          <ChevronRight className="h-5 w-5 text-gray-600" />
        </button>
      </div>

      <div className="grid grid-cols-7 mb-2">
        {dayNames.map((day) => (
          <div key={day} className="text-center text-xs font-semibold text-gray-400 py-2">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {days.map((day, idx) => {
          const isSelected = selectedDate && isSameDay(day, selectedDate);
          const isCurrentMonth = isSameMonth(day, currentDate);
          const isTodayDate = isToday(day);
          const hasAppt = hasAppointments(day);

          return (
            <motion.button
              key={idx}
              whileTap={{ scale: 0.9 }}
              onClick={() => isCurrentMonth && onDateSelect?.(day)}
              disabled={!isCurrentMonth}
              className={cn(
                'relative h-9 w-full rounded-lg text-sm font-medium transition-all',
                !isCurrentMonth && 'text-gray-300 cursor-not-allowed',
                isCurrentMonth && !isSelected && 'text-gray-700 hover:bg-gray-100',
                isSelected && 'bg-primary text-white shadow-md',
                isTodayDate && !isSelected && 'border border-primary text-primary',
              )}
            >
              {format(day, 'd')}
              {hasAppt && (
                <span className={cn(
                  'absolute bottom-1 left-1/2 -translate-x-1/2 h-1 w-1 rounded-full',
                  isSelected ? 'bg-white' : 'bg-accent'
                )} />
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
