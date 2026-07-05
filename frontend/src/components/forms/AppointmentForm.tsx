'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { appointmentSchema, AppointmentFormData } from '@/lib/validations';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import TextArea from '@/components/ui/TextArea';
import Button from '@/components/ui/Button';
import Stepper from '@/components/ui/Stepper';
import { Calendar, Clock, User, FileText, CheckCircle } from 'lucide-react';
import DatePicker from '@/components/ui/DatePicker';
import { APPOINTMENT_SLOTS, DEPARTMENTS } from '@/lib/constants';
import toast from 'react-hot-toast';

const steps = [
  { id: 'department', label: 'Department', description: 'Select department' },
  { id: 'doctor', label: 'Doctor', description: 'Choose doctor' },
  { id: 'datetime', label: 'Date & Time', description: 'Pick schedule' },
  { id: 'details', label: 'Details', description: 'Add details' },
  { id: 'confirm', label: 'Confirm', description: 'Review & book' },
];

const mockDoctors = [
  { id: '1', name: 'Dr. John Smith', department: '1' },
  { id: '2', name: 'Dr. Sarah Johnson', department: '1' },
  { id: '3', name: 'Dr. Michael Chen', department: '2' },
  { id: '4', name: 'Dr. Emily Brown', department: '2' },
  { id: '5', name: 'Dr. David Wilson', department: '3' },
];

interface AppointmentFormProps {
  onSuccess?: () => void;
}

export default function AppointmentForm({ onSuccess }: AppointmentFormProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<AppointmentFormData>({
    resolver: zodResolver(appointmentSchema),
    defaultValues: { isNewPatient: false },
  });

  const selectedDepartment = watch('departmentId');
  const filteredDoctors = selectedDepartment
    ? mockDoctors.filter((d) => d.department === selectedDepartment)
    : [];

  const onSubmit = async (data: AppointmentFormData) => {
    await new Promise((resolve) => setTimeout(resolve, 1500));
    toast.success('Appointment booked successfully!');
    onSuccess?.();
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) setCurrentStep((prev) => prev + 1);
  };

  const prevStep = () => {
    if (currentStep > 0) setCurrentStep((prev) => prev - 1);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Stepper steps={steps} currentStep={currentStep} variant="horizontal" className="mb-8" />

      <motion.div
        key={currentStep}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {currentStep === 0 && (
            <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 font-heading flex items-center gap-2">
                <User className="h-5 w-5 text-primary" />
                Select Department
              </h3>
              <Select
                label="Department"
                placeholder="Choose a department"
                options={DEPARTMENTS.map((d) => ({ value: d.id.toString(), label: d.name }))}
                error={errors.departmentId?.message}
                {...register('departmentId')}
              />
              <div className="flex justify-end pt-4">
                <Button type="button" onClick={nextStep} disabled={!selectedDepartment}>
                  Next Step
                </Button>
              </div>
            </div>
          )}

          {currentStep === 1 && (
            <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 font-heading flex items-center gap-2">
                <User className="h-5 w-5 text-primary" />
                Select Doctor
              </h3>
              <Select
                label="Doctor"
                placeholder="Choose a doctor"
                options={filteredDoctors.map((d) => ({ value: d.id, label: d.name }))}
                error={errors.doctorId?.message}
                {...register('doctorId')}
              />
              <div className="flex justify-between pt-4">
                <Button type="button" variant="outline" onClick={prevStep}>
                  Previous
                </Button>
                <Button type="button" onClick={nextStep} disabled={!watch('doctorId')}>
                  Next Step
                </Button>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 font-heading flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                Select Date & Time
              </h3>
              <DatePicker
                label="Appointment Date"
                value={selectedDate}
                onChange={(date) => {
                  setSelectedDate(date);
                  setValue('date', date.toISOString());
                }}
                error={errors.date?.message}
                minDate={new Date()}
              />
              <Select
                label="Time Slot"
                placeholder="Choose a time"
                options={APPOINTMENT_SLOTS.map((s) => ({ value: s.time, label: s.label }))}
                error={errors.time?.message}
                {...register('time')}
              />
              <div className="flex justify-between pt-4">
                <Button type="button" variant="outline" onClick={prevStep}>
                  Previous
                </Button>
                <Button type="button" onClick={nextStep} disabled={!watch('date') || !watch('time')}>
                  Next Step
                </Button>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 font-heading flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                Visit Details
              </h3>
              <TextArea
                label="Reason for Visit"
                placeholder="Please describe your symptoms or reason for the appointment..."
                rows={4}
                error={errors.reason?.message}
                {...register('reason')}
              />
              <TextArea
                label="Additional Notes (Optional)"
                placeholder="Any additional information..."
                rows={3}
                {...register('notes')}
              />
              <div className="flex justify-between pt-4">
                <Button type="button" variant="outline" onClick={prevStep}>
                  Previous
                </Button>
                <Button type="button" onClick={nextStep} disabled={!watch('reason')}>
                  Next Step
                </Button>
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 font-heading flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-accent" />
                Confirm Appointment
              </h3>
              <div className="bg-gray-50 rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Department</span>
                  <span className="font-medium text-gray-900">
                    {DEPARTMENTS.find((d) => d.id.toString() === watch('departmentId'))?.name}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Doctor</span>
                  <span className="font-medium text-gray-900">
                    {filteredDoctors.find((d) => d.id === watch('doctorId'))?.name}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Date</span>
                  <span className="font-medium text-gray-900">
                    {selectedDate?.toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Time</span>
                  <span className="font-medium text-gray-900">
                    {APPOINTMENT_SLOTS.find((s) => s.time === watch('time'))?.label}
                  </span>
                </div>
              </div>
              <div className="flex justify-between pt-4">
                <Button type="button" variant="outline" onClick={prevStep}>
                  Previous
                </Button>
                <Button type="submit" isLoading={isSubmitting} leftIcon={<CheckCircle className="h-4 w-4" />}>
                  Book Appointment
                </Button>
              </div>
            </div>
          )}
        </form>
      </motion.div>
    </div>
  );
}
