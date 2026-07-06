'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import RegisterForm from '@/components/forms/RegisterForm';
import { Building2, Check } from 'lucide-react';

export default function RegisterPage() {
  const features = ['Book appointments online', 'Access medical records', 'View lab reports', 'Receive health tips'];

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      <div className="order-2 lg:order-1 flex-1 flex items-center justify-center p-5 sm:p-8 pt-16 sm:pt-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
          <div className="text-center mb-6 sm:mb-8">
            <Link href="/" className="inline-flex items-center gap-2 mb-5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-primary-700 flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg font-heading">R</span>
              </div>
              <span className="text-lg font-bold text-gray-900 font-heading">Rawal Hospital</span>
            </Link>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 font-heading">Create Account</h1>
            <p className="text-sm sm:text-base text-gray-500 mt-1.5">Join us for a better healthcare experience.</p>
          </div>
          <RegisterForm />
        </motion.div>
      </div>

      <div className="order-1 lg:order-2 lg:w-[45%] bg-gradient-to-br from-emerald-600 to-emerald-900 relative overflow-hidden items-center justify-center p-8 hidden lg:flex">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-10 left-10 w-64 h-64 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-emerald-200 rounded-full blur-3xl" />
        </div>
        <div className="relative text-center max-w-sm">
          <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center mx-auto mb-5">
            <Building2 className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-white font-heading mb-3">Join Rawal Hospital</h2>
          <p className="text-emerald-100 text-sm sm:text-base">Create your account to access online appointment booking, medical records, and more.</p>
          <div className="mt-8 space-y-3 text-left max-w-xs mx-auto">
            {features.map((feature, i) => (
              <div key={i} className="flex items-center gap-3 text-white">
                <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                  <Check className="h-3.5 w-3.5" />
                </div>
                <span className="text-sm sm:text-base">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
