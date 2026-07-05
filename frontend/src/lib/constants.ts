export const HOSPITAL_INFO = {
  name: 'Rawal Hospital',
  tagline: 'Excellence in Healthcare',
  description: 'Providing compassionate, high-quality healthcare services for over 25 years.',
  phone: '+1 (555) 123-4567',
  emergency: '+1 (555) 999-9111',
  email: 'info@rawalhospital.com',
  address: '123 Healthcare Avenue, Medical City, MC 12345',
  website: 'www.rawalhospital.com',
  founded: 1999,
  beds: 500,
  doctors: 150,
  staff: 1200,
  patientsServed: 50000,
  logo: '/logo.png',
};

export const COLORS = {
  primary: '#1565C0',
  primaryLight: '#e3f2fd',
  secondary: '#0d47a1',
  accent: '#4caf50',
  accentLight: '#e8f5e9',
  white: '#ffffff',
  light: '#f8fafc',
  muted: '#6b7280',
  dark: '#0f172a',
  danger: '#dc2626',
  warning: '#f59e0b',
  info: '#3b82f6',
  success: '#10b981',
};

export const ROUTES = {
  home: '/',
  about: '/about',
  doctors: '/doctors',
  departments: '/departments',
  services: '/services',
  contact: '/contact',
  careers: '/careers',
  blog: '/blog',
  appointments: '/appointments',
  login: '/auth/login',
  register: '/auth/register',
  dashboard: '/dashboard',
  patientDashboard: '/dashboard/patient',
  doctorDashboard: '/dashboard/doctor',
  adminDashboard: '/dashboard/admin',
  receptionDashboard: '/dashboard/reception',
  pharmacyDashboard: '/dashboard/pharmacy',
  laboratoryDashboard: '/dashboard/laboratory',
};

export const USER_ROLES = {
  PATIENT: 'patient',
  DOCTOR: 'doctor',
  ADMIN: 'admin',
  RECEPTION: 'reception',
  PHARMACIST: 'pharmacist',
  LAB_TECHNICIAN: 'lab_technician',
  NURSE: 'nurse',
  ACCOUNTANT: 'accountant',
};

export const APPOINTMENT_STATUS = {
  SCHEDULED: 'scheduled',
  CONFIRMED: 'confirmed',
  CHECKED_IN: 'checked_in',
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
  NO_SHOW: 'no_show',
};

export const DEPARTMENTS = [
  { id: 1, name: 'Cardiology', slug: 'cardiology', icon: 'Heart', description: 'Advanced cardiac care and heart surgery' },
  { id: 2, name: 'Neurology', slug: 'neurology', icon: 'Brain', description: 'Comprehensive neurological care' },
  { id: 3, name: 'Orthopedics', slug: 'orthopedics', icon: 'Bone', description: 'Bone and joint specialist care' },
  { id: 4, name: 'Pediatrics', slug: 'pediatrics', icon: 'Baby', description: 'Child healthcare from birth to adolescence' },
  { id: 5, name: 'Oncology', slug: 'oncology', icon: 'Activity', description: 'Cancer treatment and research' },
  { id: 6, name: 'Gynecology', slug: 'gynecology', icon: 'Venus', description: 'Women\'s health and reproductive care' },
  { id: 7, name: 'Dermatology', slug: 'dermatology', icon: 'Eye', description: 'Skin, hair, and nail care' },
  { id: 8, name: 'Ophthalmology', slug: 'ophthalmology', icon: 'Eye', description: 'Eye care and vision services' },
  { id: 9, name: 'Dentistry', slug: 'dentistry', icon: 'Tooth', description: 'Complete dental care services' },
  { id: 10, name: 'Emergency Medicine', slug: 'emergency-medicine', icon: 'Ambulance', description: '24/7 emergency medical services' },
  { id: 11, name: 'Radiology', slug: 'radiology', icon: 'Scan', description: 'Diagnostic imaging services' },
  { id: 12, name: 'Pulmonology', slug: 'pulmonology', icon: 'Lungs', description: 'Respiratory and lung care' },
];

export const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

export const APPOINTMENT_SLOTS = [
  { time: '09:00', label: '9:00 AM' },
  { time: '09:30', label: '9:30 AM' },
  { time: '10:00', label: '10:00 AM' },
  { time: '10:30', label: '10:30 AM' },
  { time: '11:00', label: '11:00 AM' },
  { time: '11:30', label: '11:30 AM' },
  { time: '12:00', label: '12:00 PM' },
  { time: '12:30', label: '12:30 PM' },
  { time: '14:00', label: '2:00 PM' },
  { time: '14:30', label: '2:30 PM' },
  { time: '15:00', label: '3:00 PM' },
  { time: '15:30', label: '3:30 PM' },
  { time: '16:00', label: '4:00 PM' },
  { time: '16:30', label: '4:30 PM' },
];

export const SERVICES = [
  { id: 1, title: 'Emergency Care', description: '24/7 emergency services with rapid response teams.', icon: 'Ambulance', color: '#dc2626' },
  { id: 2, title: 'Surgery', description: 'Advanced surgical procedures with modern operation theaters.', icon: 'Scissors', color: '#1565C0' },
  { id: 3, title: 'Diagnostics', description: 'State-of-the-art diagnostic imaging and laboratory tests.', icon: 'Scan', color: '#7c3aed' },
  { id: 4, title: 'Pharmacy', description: 'Full-service pharmacy with a wide range of medications.', icon: 'Pill', color: '#4caf50' },
  { id: 5, title: 'Maternity', description: 'Comprehensive maternity and newborn care services.', icon: 'Baby', color: '#e91e63' },
  { id: 6, title: 'Health Checkups', description: 'Preventive health checkup packages for all ages.', icon: 'HeartPulse', color: '#f59e0b' },
  { id: 7, title: 'Vaccination', description: 'Immunization programs for children and adults.', icon: 'Syringe', color: '#06b6d4' },
  { id: 8, title: 'Rehabilitation', description: 'Physical therapy and rehabilitation programs.', icon: 'Activity', color: '#f97316' },
  { id: 9, title: 'Ambulance', description: '24/7 ambulance services with advanced life support.', icon: 'Truck', color: '#ef4444' },
  { id: 10, title: 'Telemedicine', description: 'Virtual consultations from the comfort of your home.', icon: 'Video', color: '#8b5cf6' },
];

export const FACILITIES = [
  { title: 'Modern Operation Theaters', description: 'Fully equipped OT with advanced technology', icon: 'Building2' },
  { title: 'ICU & NICU', description: 'Intensive care units with round-the-clock monitoring', icon: 'Monitor' },
  { title: 'Diagnostic Lab', description: 'Complete pathology and radiology services', icon: 'FlaskConical' },
  { title: 'Pharmacy', description: '24/7 pharmacy with all medications available', icon: 'Pill' },
  { title: 'Ambulance Services', description: 'Emergency transport with life support equipment', icon: 'Ambulance' },
  { title: 'Cafeteria', description: 'Hygienic and nutritious food for patients and visitors', icon: 'UtensilsCrossed' },
  { title: 'Parking', description: 'Ample parking space for patients and visitors', icon: 'Car' },
  { title: 'Wheelchair Access', description: 'Fully accessible facilities for all patients', icon: 'Accessibility' },
];

export const AWARDS = [
  { year: 2024, title: 'Best Hospital of the Year', organization: 'Healthcare Excellence Awards' },
  { year: 2023, title: 'Excellence in Patient Care', organization: 'National Health Commission' },
  { year: 2022, title: 'Top Multi-Specialty Hospital', organization: 'Medical Association' },
  { year: 2021, title: 'Innovation in Healthcare', organization: 'HealthTech Summit' },
  { year: 2020, title: 'COVID-19 Response Excellence', organization: 'WHO Regional Office' },
];

export const CORE_VALUES = [
  { title: 'Compassion', description: 'We treat every patient with empathy and respect.', icon: 'Heart' },
  { title: 'Excellence', description: 'We strive for the highest standards in healthcare.', icon: 'Star' },
  { title: 'Integrity', description: 'We maintain transparency and ethical practices.', icon: 'Shield' },
  { title: 'Innovation', description: 'We embrace cutting-edge medical technology.', icon: 'Lightbulb' },
  { title: 'Teamwork', description: 'We collaborate for comprehensive patient care.', icon: 'Users' },
  { title: 'Safety', description: 'Patient safety is our top priority.', icon: 'ShieldCheck' },
];

export const JOB_OPENINGS = [
  { id: 1, title: 'Senior Cardiologist', department: 'Cardiology', type: 'Full-time', location: 'Main Campus', experience: '8+ years' },
  { id: 2, title: 'Staff Nurse', department: 'Nursing', type: 'Full-time', location: 'Main Campus', experience: '2+ years' },
  { id: 3, title: 'Radiology Technician', department: 'Radiology', type: 'Full-time', location: 'Main Campus', experience: '3+ years' },
  { id: 4, title: 'Pharmacist', department: 'Pharmacy', type: 'Part-time', location: 'Downtown Branch', experience: '3+ years' },
  { id: 5, title: 'Lab Technician', department: 'Laboratory', type: 'Full-time', location: 'Main Campus', experience: '2+ years' },
  { id: 6, title: 'Medical Receptionist', department: 'Administration', type: 'Full-time', location: 'Main Campus', experience: '1+ years' },
  { id: 7, title: 'Physiotherapist', department: 'Rehabilitation', type: 'Contract', location: 'Main Campus', experience: '3+ years' },
  { id: 8, title: 'IT Support Specialist', department: 'IT', type: 'Full-time', location: 'Main Campus', experience: '2+ years' },
];

export const WORKING_HOURS = {
  weekday: '8:00 AM - 8:00 PM',
  weekend: '9:00 AM - 5:00 PM',
  emergency: '24/7',
};

export const BRANCHES = [
  { name: 'Main Campus - Medical City', address: '123 Healthcare Avenue, Medical City, MC 12345', phone: '+1 (555) 123-4567', hours: 'Open 24/7' },
  { name: 'Downtown Clinic', address: '456 Wellness Street, Downtown, DT 67890', phone: '+1 (555) 234-5678', hours: 'Mon-Sat: 8AM-8PM' },
  { name: 'Northside Medical Center', address: '789 Health Boulevard, Northside, NS 13579', phone: '+1 (555) 345-6789', hours: 'Mon-Sat: 8AM-6PM' },
];
