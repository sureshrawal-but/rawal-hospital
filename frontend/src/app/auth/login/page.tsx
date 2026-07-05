'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import LoginForm from '@/components/forms/LoginForm';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary to-primary-900 relative overflow-hidden items-center justify-center">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-64 h-64 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-blue-200 rounded-full blur-3xl" />
        </div>
        <div className="relative text-center px-12">
          <div className="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center mx-auto mb-6">
            <span className="text-white text-3xl font-bold font-heading">R</span>
          </div>
          <h2 className="text-3xl font-bold text-white font-heading mb-4">Welcome Back</h2>
          <p className="text-blue-200 text-lg">Access your healthcare dashboard and manage your health journey with us.</p>
          <div className="mt-8 flex justify-center gap-4">
            <div className="bg-white/10 backdrop-blur rounded-xl p-4 text-center">
              <p className="text-2xl font-bold text-white">50K+</p>
              <p className="text-blue-200 text-sm">Patients</p>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-xl p-4 text-center">
              <p className="text-2xl font-bold text-white">150+</p>
              <p className="text-blue-200 text-sm">Doctors</p>
            </div>
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
            <h1 className="text-2xl font-bold text-gray-900 font-heading">Sign In</h1>
            <p className="text-gray-500 mt-2">Welcome back! Please sign in to continue.</p>
          </div>
          <LoginForm />
        </motion.div>
      </div>
    </div>
  );
}
