'use client';

import { Toaster } from 'react-hot-toast';
import { cn } from '@/lib/utils';

export default function ToastProvider() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 4000,
        style: {
          borderRadius: '12px',
          background: '#fff',
          color: '#1f2937',
          boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
          border: '1px solid #f3f4f6',
          fontSize: '14px',
        },
        success: {
          iconTheme: { primary: '#10b981', secondary: '#fff' },
        },
        error: {
          iconTheme: { primary: '#ef4444', secondary: '#fff' },
        },
      }}
    />
  );
}
