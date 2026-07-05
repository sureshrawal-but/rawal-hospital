'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import RegisterForm from '@/components/forms/RegisterForm';

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-accent to-accent-800 relative overflow-hidden items-center justify-center">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-64 h-64 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-green-200 rounded-full blur-3xl" />
        </div>
        <div className="relative text-center px-12">
          <div className="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center mx-auto mb-6">
            <span className="text-white text-3xl font-bold font-heading">R</span>
          </div>
          <h2 className="text-3xl font-bold text-white font-heading mb-4">Join Rawal Hospital</h2>
          <p className="text-green-100 text-lg">Create your account to access online appointment booking, medical records, and more.</p>
          <div className="mt-8 space-y-4 text-left">
            {['Book appointments online', 'Access medical records', 'View lab reports', 'Receive health tips'].map((feature, i) => (
              <div key={i} className="flex items-center gap-3 text-white">
                <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                </div>
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <div className="text-center mb-8">
            <Link href="/" className="inline-flex items-center gap-2 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary-700 flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xl font-heading">R</span>
              </div>
              <span className="text-xl font-bold text-gray-900 font-heading">Rawal Hospital</span>
            </Link>
            <h1 className="text-2xl font-bold text-gray-900 font-heading">Create Account</h1>
            <p className="text-gray-500 mt-2">Join us for better healthcare experience.</p>
          </div>
          <RegisterForm />
        </motion.div>
      </div>
    </div>
  );
}
