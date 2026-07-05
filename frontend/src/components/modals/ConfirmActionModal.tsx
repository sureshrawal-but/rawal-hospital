'use client';

import { motion } from 'framer-motion';
import Modal from '@/components/ui/Modal';
import Button from '@/components/ui/Button';
import { AlertTriangle } from 'lucide-react';

interface ConfirmActionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: 'danger' | 'warning' | 'info';
  isLoading?: boolean;
}

export default function ConfirmActionModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  variant = 'danger',
  isLoading,
}: ConfirmActionModalProps) {
  const variantStyles = {
    danger: { bg: 'bg-red-50', icon: 'text-red-600', button: 'danger' as const },
    warning: { bg: 'bg-yellow-50', icon: 'text-yellow-600', button: 'warning' as const },
    info: { bg: 'bg-blue-50', icon: 'text-blue-600', button: 'primary' as const },
  };

  const style = variantStyles[variant];

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="sm">
      <div className="text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className={cn('w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4', style.bg)}
        >
          <AlertTriangle className={cn('h-7 w-7', style.icon)} />
        </motion.div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-sm text-gray-500 mb-6">{message}</p>
        <div className="flex gap-3 justify-center">
          <Button variant="outline" onClick={onClose} disabled={isLoading}>
            {cancelText}
          </Button>
          <Button variant={style.button} onClick={onConfirm} isLoading={isLoading}>
            {confirmText}
          </Button>
        </div>
      </div>
    </Modal>
  );
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}
