'use client';

import Modal from '@/components/ui/Modal';
import AppointmentForm from '@/components/forms/AppointmentForm';

interface BookAppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BookAppointmentModal({ isOpen, onClose }: BookAppointmentModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Book an Appointment" size="xl">
      <AppointmentForm onSuccess={onClose} />
    </Modal>
  );
}
