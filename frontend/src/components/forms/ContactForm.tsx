'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactSchema, ContactFormData } from '@/lib/validations';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import TextArea from '@/components/ui/TextArea';
import Button from '@/components/ui/Button';
import { Send, Mail, User, Phone } from 'lucide-react';
import toast from 'react-hot-toast';
import { DEPARTMENTS } from '@/lib/constants';

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    toast.success('Message sent successfully! We will get back to you soon.');
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Your Name"
          placeholder="John Doe"
          icon={<User className="h-4 w-4" />}
          error={errors.name?.message}
          {...register('name')}
        />
        <Input
          label="Email Address"
          placeholder="john@example.com"
          icon={<Mail className="h-4 w-4" />}
          error={errors.email?.message}
          {...register('email')}
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Phone Number"
          placeholder="+1 (555) 123-4567"
          icon={<Phone className="h-4 w-4" />}
          error={errors.phone?.message}
          {...register('phone')}
        />
        <Select
          label="Department"
          placeholder="Select department (optional)"
          options={DEPARTMENTS.map((d) => ({ value: d.name, label: d.name }))}
          {...register('department')}
        />
      </div>
      <Input
        label="Subject"
        placeholder="How can we help you?"
        error={errors.subject?.message}
        {...register('subject')}
      />
      <TextArea
        label="Message"
        placeholder="Tell us more about your query..."
        rows={5}
        error={errors.message?.message}
        {...register('message')}
      />
      <Button type="submit" isLoading={isSubmitting} leftIcon={<Send className="h-4 w-4" />} size="lg">
        Send Message
      </Button>
    </form>
  );
}
