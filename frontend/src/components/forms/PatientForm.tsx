'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { patientProfileSchema, PatientProfileFormData } from '@/lib/validations';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import TextArea from '@/components/ui/TextArea';
import Button from '@/components/ui/Button';
import { User, Mail, Phone, Calendar, AlertTriangle, Heart, Phone as PhoneIcon } from 'lucide-react';
import { BLOOD_GROUPS } from '@/lib/constants';
import toast from 'react-hot-toast';

interface PatientFormProps {
  initialData?: Partial<PatientProfileFormData>;
  onSuccess?: () => void;
}

export default function PatientForm({ initialData, onSuccess }: PatientFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<PatientProfileFormData>({
    resolver: zodResolver(patientProfileSchema),
    defaultValues: initialData,
  });

  const onSubmit = async (data: PatientProfileFormData) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    toast.success('Patient profile updated successfully!');
    onSuccess?.();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 font-heading flex items-center gap-2">
          <User className="h-5 w-5 text-primary" />
          Personal Information
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input label="First Name" placeholder="John" error={errors.firstName?.message} {...register('firstName')} />
          <Input label="Last Name" placeholder="Doe" error={errors.lastName?.message} {...register('lastName')} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input label="Email" type="email" placeholder="john@example.com" icon={<Mail className="h-4 w-4" />} error={errors.email?.message} {...register('email')} />
          <Input label="Phone" type="tel" placeholder="+1 (555) 123-4567" icon={<Phone className="h-4 w-4" />} error={errors.phone?.message} {...register('phone')} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Input label="Date of Birth" type="date" icon={<Calendar className="h-4 w-4" />} {...register('dateOfBirth')} />
          <Select label="Gender" placeholder="Select" options={[{ value: 'male', label: 'Male' }, { value: 'female', label: 'Female' }, { value: 'other', label: 'Other' }]} {...register('gender')} />
          <Select label="Blood Group" placeholder="Select" options={BLOOD_GROUPS.map((bg) => ({ value: bg, label: bg }))} {...register('bloodGroup')} />
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 font-heading flex items-center gap-2">
          <Heart className="h-5 w-5 text-primary" />
          Emergency Contact
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input label="Emergency Contact Name" placeholder="Contact person" icon={<PhoneIcon className="h-4 w-4" />} {...register('emergencyContact')} />
          <Input label="Emergency Phone" type="tel" placeholder="Emergency number" icon={<Phone className="h-4 w-4" />} {...register('emergencyPhone')} />
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 font-heading flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-primary" />
          Medical Information
        </h3>
        <TextArea label="Allergies" placeholder="List any allergies..." rows={3} {...register('allergies')} />
        <TextArea label="Medical Conditions" placeholder="List any existing medical conditions..." rows={3} {...register('medicalConditions')} />
        <Input label="Address" placeholder="Full address" {...register('address')} />
      </div>

      <div className="flex justify-end">
        <Button type="submit" isLoading={isSubmitting} size="lg">
          Save Profile
        </Button>
      </div>
    </form>
  );
}
