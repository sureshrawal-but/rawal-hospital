'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { JOB_OPENINGS } from '@/lib/constants';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import TextArea from '@/components/ui/TextArea';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { Briefcase, MapPin, Clock, DollarSign, Send, Upload, CheckCircle, ArrowRight } from 'lucide-react';
import toast from 'react-hot-toast';

export default function CareersPage() {
  const [applying, setApplying] = useState(false);
  const [selectedJob, setSelectedJob] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', coverLetter: '' });

  const handleApply = (jobId: number) => {
    setSelectedJob(jobId.toString());
    setApplying(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Application submitted successfully! We will contact you soon.');
    setApplying(false);
    setSelectedJob(null);
    setFormData({ name: '', email: '', phone: '', coverLetter: '' });
  };

  return (
    <div className="pt-20">
      <section className="relative py-16 gradient-hero">
        <div className="max-w-7xl mx-auto px-4">
          <Breadcrumb items={[{ label: 'Careers' }]} className="mb-4 text-blue-200 [&_*]:text-blue-200" />
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Badge variant="success" size="lg" className="mb-4 bg-white/20 text-white">Join Our Team</Badge>
            <h1 className="text-4xl lg:text-5xl font-bold text-white font-heading mb-4">Careers at Rawal Hospital</h1>
            <p className="text-lg text-blue-100 max-w-2xl">Join a team of dedicated healthcare professionals committed to excellence.</p>
          </motion.div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div className="text-center max-w-2xl mx-auto mb-12" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl font-bold text-gray-900 font-heading mb-4">Current Openings</h2>
            <p className="text-gray-600">Explore career opportunities and join our growing team.</p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-6 mb-12">
            {JOB_OPENINGS.map((job, i) => (
              <motion.div key={job.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
                <Card padding="md" hover={false}>
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
                      <p className="text-sm text-primary font-medium">{job.department}</p>
                    </div>
                    <Badge variant="primary" size="sm">{job.type}</Badge>
                  </div>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-4">
                    <span className="flex items-center gap-1"><MapPin className="h-4 w-4" /> {job.location}</span>
                    <span className="flex items-center gap-1"><Clock className="h-4 w-4" /> {job.experience}</span>
                  </div>
                  <Button size="sm" onClick={() => handleApply(job.id)}>Apply Now <ArrowRight className="ml-1 h-4 w-4" /></Button>
                </Card>
              </motion.div>
            ))}
          </div>

          {applying && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <Card padding="lg" className="max-w-2xl mx-auto">
                <h3 className="text-xl font-bold text-gray-900 font-heading mb-2">Apply for {JOB_OPENINGS.find(j => j.id.toString() === selectedJob)?.title}</h3>
                <p className="text-sm text-gray-500 mb-6">Fill out the form below to submit your application.</p>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <Input label="Full Name" placeholder="Your full name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Input label="Email" type="email" placeholder="your@email.com" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
                    <Input label="Phone" type="tel" placeholder="+1 (555) 000-0000" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} required />
                  </div>
                  <TextArea label="Cover Letter" placeholder="Tell us why you are a good fit for this position..." rows={5} value={formData.coverLetter} onChange={(e) => setFormData({ ...formData, coverLetter: e.target.value })} required />
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Resume / CV</label>
                    <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center hover:border-primary transition-colors cursor-pointer">
                      <Upload className="h-8 w-8 text-gray-300 mx-auto mb-2" />
                      <p className="text-sm text-gray-500">Click to upload or drag and drop</p>
                      <p className="text-xs text-gray-400 mt-1">PDF, DOC, DOCX (Max 10MB)</p>
                    </div>
                  </div>
                  <div className="flex gap-3 pt-2">
                    <Button type="submit" leftIcon={<Send className="h-4 w-4" />}>Submit Application</Button>
                    <Button type="button" variant="outline" onClick={() => { setApplying(false); setSelectedJob(null); }}>Cancel</Button>
                  </div>
                </form>
              </Card>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}
