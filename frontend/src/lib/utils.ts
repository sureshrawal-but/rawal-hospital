import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { format, formatDistanceToNow, parseISO } from 'date-fns';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string | Date, fmt: string = 'MMM dd, yyyy'): string {
  if (!date) return '';
  const d = typeof date === 'string' ? parseISO(date) : date;
  return format(d, fmt);
}

export function formatDateTime(date: string | Date): string {
  return formatDate(date, 'MMM dd, yyyy h:mm a');
}

export function formatRelativeTime(date: string | Date): string {
  if (!date) return '';
  const d = typeof date === 'string' ? parseISO(date) : date;
  return formatDistanceToNow(d, { addSuffix: true });
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
}

export function formatPhone(phone: string): string {
  if (!phone) return '';
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
  }
  return phone;
}

export function getInitials(name: string): string {
  if (!name) return '?';
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

export function truncateText(text: string, maxLength: number = 100): string {
  if (!text || text.length <= maxLength) return text;
  return text.slice(0, maxLength).trimEnd() + '...';
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function generateId(): string {
  return Math.random().toString(36).substring(2, 11);
}

export function getStatusColor(status: string): string {
  const colors: Record<string, string> = {
    scheduled: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    confirmed: 'bg-green-500/10 text-green-400 border-green-500/20',
    checked_in: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
    in_progress: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
    completed: 'bg-dark-600 text-gray-300 border-gray-700',
    cancelled: 'bg-red-500/10 text-red-400 border-red-500/20',
    no_show: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
    active: 'bg-green-500/10 text-green-400 border-green-500/20',
    inactive: 'bg-dark-600 text-gray-300 border-gray-700',
    paid: 'bg-green-500/10 text-green-400 border-green-500/20',
    unpaid: 'bg-red-500/10 text-red-400 border-red-500/20',
    pending: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
    refunded: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  };
  return colors[status] || 'bg-dark-600 text-gray-300 border-gray-700';
}

export function getRoleColor(role: string): string {
  const colors: Record<string, string> = {
    admin: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
    doctor: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    patient: 'bg-green-500/10 text-green-400 border-green-500/20',
    reception: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
    pharmacist: 'bg-pink-500/10 text-pink-400 border-pink-500/20',
    lab_technician: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
    nurse: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
  };
  return colors[role] || 'bg-dark-600 text-gray-300 border-gray-700';
}

export function getTimeFromDate(date: string): string {
  return formatDate(date, 'h:mm a');
}

export function formatTime(date: string | Date, fmt: string = 'h:mm a'): string {
  if (!date) return '';
  const d = typeof date === 'string' ? parseISO(date) : date;
  return format(d, fmt);
}

export function isToday(date: string): boolean {
  const d = typeof date === 'string' ? parseISO(date) : date;
  const today = new Date();
  return format(d, 'yyyy-MM-dd') === format(today, 'yyyy-MM-dd');
}
