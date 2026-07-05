import DoctorContent from './DoctorContent';

const doctorsData: Record<string, any> = {
  '1': { name: 'Dr. John Smith', specialty: 'Cardiologist', rating: 4.9, experience: 18, department: 'Cardiology', location: 'Main Campus', availability: 'Mon-Fri: 9:00 AM - 5:00 PM', fee: 150, phone: '+1 (555) 111-2233', email: 'john.smith@rawalhospital.com', bio: 'Dr. John Smith is a highly experienced cardiologist with over 18 years of clinical practice. He specializes in interventional cardiology and has performed thousands of successful procedures.', education: 'MD, Cardiology - Harvard Medical School\nFellowship - Mayo Clinic', certifications: 'Board Certified in Cardiology\nFACC - Fellow of American College of Cardiology', languages: 'English, Spanish' },
  '2': { name: 'Dr. Sarah Johnson', specialty: 'Neurologist', rating: 4.8, experience: 15, department: 'Neurology', location: 'Main Campus', availability: 'Mon-Sat: 10:00 AM - 6:00 PM', fee: 180, phone: '+1 (555) 222-3344', email: 'sarah.johnson@rawalhospital.com', bio: 'Dr. Sarah Johnson is a renowned neurologist specializing in stroke management and neurodegenerative disorders. She leads our stroke unit and has published numerous research papers.', education: 'MD, Neurology - Johns Hopkins University\nFellowship - Cleveland Clinic', certifications: 'Board Certified in Neurology\nFAAN - Fellow of American Academy of Neurology', languages: 'English, French' },
};

export function generateStaticParams() {
  return Object.keys(doctorsData).map((id) => ({ id }));
}

export default function Page() {
  return <DoctorContent />;
}
