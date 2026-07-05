'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { registerSchema, RegisterFormData } from '@/lib/validations';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Button from '@/components/ui/Button';
import { User, Mail, Phone, Lock, Calendar } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { BLOOD_GROUPS } from '@/lib/constants';

export default function RegisterForm() {
  const { register: registerUser } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    const { confirmPassword, ...userData } = data;
    await registerUser(userData);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="First Name"
          placeholder="John"
          icon={<User className="h-4 w-4" />}
          error={errors.firstName?.message}
          {...register('firstName')}
        />
        <Input
          label="Last Name"
          placeholder="Doe"
          icon={<User className="h-4 w-4" />}
          error={errors.lastName?.message}
          {...register('lastName')}
        />
      </div>
      <Input
        label="Email Address"
        type="email"
        placeholder="john@example.com"
        icon={<Mail className="h-4 w-4" />}
        error={errors.email?.message}
        {...register('email')}
      />
      <Input
        label="Phone Number"
        type="tel"
        placeholder="+1 (555) 123-4567"
        icon={<Phone className="h-4 w-4" />}
        error={errors.phone?.message}
        {...register('phone')}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Password"
          isPassword
          placeholder="Min. 8 characters"
          icon={<Lock className="h-4 w-4" />}
          error={errors.password?.message}
          {...register('password')}
        />
        <Input
          label="Confirm Password"
          isPassword
          placeholder="Repeat password"
          icon={<Lock className="h-4 w-4" />}
          error={errors.confirmPassword?.message}
          {...register('confirmPassword')}
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Select
          label="Gender"
          placeholder="Select gender"
          options={[
            { value: 'male', label: 'Male' },
            { value: 'female', label: 'Female' },
            { value: 'other', label: 'Other' },
          ]}
          {...register('gender')}
        />
        <Input
          label="Date of Birth"
          type="date"
          icon={<Calendar className="h-4 w-4" />}
          {...register('dateOfBirth')}
        />
      </div>
      <Button type="submit" isLoading={isSubmitting} className="w-full" size="lg">
        Create Account
      </Button>
      <p className="text-center text-sm text-gray-500 mt-4">
        Already have an account?{' '}
        <Link href="/auth/login" className="text-primary font-semibold hover:text-primary-700">
          Sign in
        </Link>
      </p>
    </form>
  );
}
