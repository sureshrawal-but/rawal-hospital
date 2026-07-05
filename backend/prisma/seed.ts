import { PrismaClient, UserRole, Gender, BloodGroup, DayOfWeek, AppointmentStatus, PaymentStatus, InvoiceStatus } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

const hashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(12);
  return bcrypt.hash(password, salt);
};

async function main() {
  console.log('🌱 Starting seed...');

  const hashedPassword = await hashPassword('password123');

  // Clean existing data
  console.log('Cleaning existing data...');
  await prisma.auditLog.deleteMany();
  await prisma.notification.deleteMany();
  await prisma.refreshToken.deleteMany();
  await prisma.payment.deleteMany();
  await prisma.pharmacySaleItem.deleteMany();
  await prisma.pharmacySale.deleteMany();
  await prisma.purchaseOrderItem.deleteMany();
  await prisma.purchaseOrder.deleteMany();
  await prisma.labReport.deleteMany();
  await prisma.medicalRecord.deleteMany();
  await prisma.prescription.deleteMany();
  await prisma.invoiceItem.deleteMany();
  await prisma.invoice.deleteMany();
  await prisma.appointment.deleteMany();
  await prisma.doctorTimeOff.deleteMany();
  await prisma.doctorAvailability.deleteMany();
  await prisma.doctor.deleteMany();
  await prisma.staff.deleteMany();
  await prisma.patient.deleteMany();
  await prisma.user.deleteMany();
  await prisma.bed.deleteMany();
  await prisma.admission.deleteMany();
  await prisma.testimonial.deleteMany();
  await prisma.blogPost.deleteMany();
  await prisma.contactMessage.deleteMany();
  await prisma.medicine.deleteMany();
  await prisma.labTest.deleteMany();
  await prisma.treatment.deleteMany();
  await prisma.departmentFacility.deleteMany();
  await prisma.departmentWorkingHours.deleteMany();
  await prisma.department.deleteMany();
  await prisma.systemSetting.deleteMany();

  // ========== DEPARTMENTS ==========
  console.log('Creating departments...');
  const departments = await Promise.all([
    prisma.department.create({ data: { name: 'Cardiology', slug: 'cardiology', description: 'Heart and cardiovascular system diagnosis and treatment', icon: 'heart', color: '#e74c3c', floorNo: '3', wing: 'A', extensionNo: '101' } }),
    prisma.department.create({ data: { name: 'Orthopedics', slug: 'orthopedics', description: 'Bones, joints, ligaments, tendons, and muscles treatment', icon: 'bone', color: '#3498db', floorNo: '2', wing: 'B', extensionNo: '201' } }),
    prisma.department.create({ data: { name: 'Neurology', slug: 'neurology', description: 'Brain, spinal cord, and nervous system disorders', icon: 'brain', color: '#9b59b6', floorNo: '4', wing: 'A', extensionNo: '401' } }),
    prisma.department.create({ data: { name: 'Pediatrics', slug: 'pediatrics', description: 'Medical care for infants, children, and adolescents', icon: 'child', color: '#2ecc71', floorNo: '1', wing: 'C', extensionNo: '301' } }),
    prisma.department.create({ data: { name: 'ENT', slug: 'ent', description: 'Ear, nose, and throat diagnosis and treatment', icon: 'ear', color: '#f39c12', floorNo: '2', wing: 'A', extensionNo: '202' } }),
    prisma.department.create({ data: { name: 'Gynecology', slug: 'gynecology', description: 'Women reproductive health and childbirth', icon: 'female', color: '#e91e63', floorNo: '3', wing: 'B', extensionNo: '301' } }),
    prisma.department.create({ data: { name: 'Dermatology', slug: 'dermatology', description: 'Skin, hair, and nail disorders treatment', icon: 'skin', color: '#ff7043', floorNo: '1', wing: 'B', extensionNo: '102' } }),
    prisma.department.create({ data: { name: 'Psychiatry', slug: 'psychiatry', description: 'Mental health diagnosis and treatment', icon: 'mental', color: '#5c6bc0', floorNo: '4', wing: 'C', extensionNo: '402' } }),
    prisma.department.create({ data: { name: 'Emergency Medicine', slug: 'emergency', description: 'Emergency medical services and trauma care', icon: 'emergency', color: '#d32f2f', floorNo: 'G', wing: 'A', extensionNo: '100' } }),
    prisma.department.create({ data: { name: 'Dental', slug: 'dental', description: 'Oral health, teeth, and gums treatment', icon: 'tooth', color: '#00acc1', floorNo: '1', wing: 'D', extensionNo: '103' } }),
    prisma.department.create({ data: { name: 'General Medicine', slug: 'general-medicine', description: 'General health checkups and common illnesses', icon: 'stethoscope', color: '#66bb6a', floorNo: 'G', wing: 'B', extensionNo: '101' } }),
    prisma.department.create({ data: { name: 'Radiology', slug: 'radiology', description: 'Medical imaging services including X-ray, MRI, CT scan', icon: 'xray', color: '#26a69a', floorNo: 'G', wing: 'C', extensionNo: '102' } }),
    prisma.department.create({ data: { name: 'Laboratory', slug: 'laboratory', description: 'Clinical pathology and diagnostic testing', icon: 'microscope', color: '#78909c', floorNo: 'G', wing: 'D', extensionNo: '103' } }),
    prisma.department.create({ data: { name: 'ICU', slug: 'icu', description: 'Intensive care unit for critically ill patients', icon: 'icu', color: '#b71c1c', floorNo: '5', wing: 'A', extensionNo: '501' } }),
  ]);

  const [cardiology, orthopedics, neurology, pediatrics, ent, gynecology, dermatology, psychiatry, emergency, dental, generalMedicine, radiology, laboratory, icu] = departments;

  // ========== DEPARTMENT FACILITIES ==========
  console.log('Creating department facilities...');
  await Promise.all([
    prisma.departmentFacility.create({ data: { departmentId: cardiology.id, name: 'ECG/EKG Monitoring', description: '24/7 heart monitoring facilities' } }),
    prisma.departmentFacility.create({ data: { departmentId: cardiology.id, name: 'Echocardiography', description: 'Advanced ultrasound of the heart' } }),
    prisma.departmentFacility.create({ data: { departmentId: cardiology.id, name: 'Treadmill Test (TMT)', description: 'Stress testing facilities' } }),
    prisma.departmentFacility.create({ data: { departmentId: orthopedics.id, name: 'Fracture Clinic', description: 'Specialized fracture management' } }),
    prisma.departmentFacility.create({ data: { departmentId: orthopedics.id, name: 'Joint Replacement', description: 'Total hip and knee replacement' } }),
    prisma.departmentFacility.create({ data: { departmentId: neurology.id, name: 'EEG Lab', description: 'Brain activity testing' } }),
    prisma.departmentFacility.create({ data: { departmentId: neurology.id, name: 'Nerve Conduction Study', description: 'Peripheral nerve testing' } }),
    prisma.departmentFacility.create({ data: { departmentId: pediatrics.id, name: 'Neonatal ICU', description: 'Specialized care for newborns' } }),
    prisma.departmentFacility.create({ data: { departmentId: pediatrics.id, name: 'Child Vaccination', description: 'Complete immunization services' } }),
    prisma.departmentFacility.create({ data: { departmentId: ent.id, name: 'Audiometry', description: 'Hearing assessment services' } }),
    prisma.departmentFacility.create({ data: { departmentId: ent.id, name: 'Endoscopy', description: 'Nasal endoscopy procedures' } }),
    prisma.departmentFacility.create({ data: { departmentId: emergency.id, name: 'Trauma Bay', description: '24/7 emergency trauma care' } }),
    prisma.departmentFacility.create({ data: { departmentId: emergency.id, name: 'Ambulance Service', description: 'Emergency ambulance with life support' } }),
    prisma.departmentFacility.create({ data: { departmentId: radiology.id, name: '1.5T MRI', description: 'High-resolution MRI scanning' } }),
    prisma.departmentFacility.create({ data: { departmentId: radiology.id, name: '64-Slice CT Scan', description: 'Advanced CT imaging' } }),
  ]);

  // ========== DEPARTMENT WORKING HOURS ==========
  console.log('Creating working hours...');
  const days: DayOfWeek[] = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY'];
  for (const dept of departments) {
    for (const day of days) {
      await prisma.departmentWorkingHours.create({
        data: { departmentId: dept.id, day, openTime: '09:00', closeTime: '17:00' },
      });
    }
    await prisma.departmentWorkingHours.create({
      data: { departmentId: dept.id, day: 'SATURDAY', openTime: '09:00', closeTime: '13:00' },
    });
    await prisma.departmentWorkingHours.create({
      data: { departmentId: dept.id, day: 'SUNDAY', openTime: '10:00', closeTime: '14:00', isClosed: true },
    });
  }

  // ========== TREATMENTS ==========
  console.log('Creating treatments...');
  await Promise.all([
    prisma.treatment.create({ data: { departmentId: cardiology.id, name: 'Coronary Angioplasty', description: 'Balloon angioplasty to open blocked arteries', cost: 150000, duration: '1-2 hours' } }),
    prisma.treatment.create({ data: { departmentId: cardiology.id, name: 'Heart Bypass Surgery', description: 'CABG surgery for blocked coronary arteries', cost: 350000, duration: '3-6 hours' } }),
    prisma.treatment.create({ data: { departmentId: cardiology.id, name: 'Echocardiogram', description: 'Ultrasound imaging of the heart', cost: 3500, duration: '30-45 min' } }),
    prisma.treatment.create({ data: { departmentId: orthopedics.id, name: 'Total Knee Replacement', description: 'Complete knee joint replacement surgery', cost: 250000, duration: '2-3 hours' } }),
    prisma.treatment.create({ data: { departmentId: orthopedics.id, name: 'Hip Replacement', description: 'Total hip arthroplasty', cost: 300000, duration: '2-3 hours' } }),
    prisma.treatment.create({ data: { departmentId: orthopedics.id, name: 'Spinal Fusion', description: 'Fusion of two or more vertebrae', cost: 200000, duration: '3-5 hours' } }),
    prisma.treatment.create({ data: { departmentId: neurology.id, name: 'Brain Tumor Surgery', description: 'Surgical removal of brain tumors', cost: 400000, duration: '4-8 hours' } }),
    prisma.treatment.create({ data: { departmentId: neurology.id, name: 'Stroke Management', description: 'Comprehensive stroke treatment and rehabilitation', cost: 100000, duration: 'Varies' } }),
    prisma.treatment.create({ data: { departmentId: generalMedicine.id, name: 'General Health Checkup', description: 'Complete physical examination and lab tests', cost: 2500, duration: '1-2 hours' } }),
    prisma.treatment.create({ data: { departmentId: generalMedicine.id, name: 'Diabetes Management', description: 'Comprehensive diabetes care program', cost: 5000, duration: 'Ongoing' } }),
    prisma.treatment.create({ data: { departmentId: pediatrics.id, name: 'Child Vaccination', description: 'Complete immunization as per schedule', cost: 1000, duration: '30 min' } }),
    prisma.treatment.create({ data: { departmentId: pediatrics.id, name: 'Pediatric ICU Care', description: 'Intensive care for critically ill children', cost: 5000, duration: 'Per day' } }),
    prisma.treatment.create({ data: { departmentId: dental.id, name: 'Root Canal Treatment', description: 'Endodontic treatment for infected teeth', cost: 5000, duration: '1-2 hours' } }),
    prisma.treatment.create({ data: { departmentId: dental.id, name: 'Dental Implant', description: 'Permanent tooth replacement with implant', cost: 25000, duration: '1-2 hours' } }),
  ]);

  // ========== ADMINS & STAFF USERS ==========
  console.log('Creating users...');
  const adminUser = await prisma.user.create({
    data: { email: 'admin@rawalhospital.com', password: hashedPassword, role: 'ADMIN', isVerified: true },
  });
  const superAdminUser = await prisma.user.create({
    data: { email: 'superadmin@rawalhospital.com', password: hashedPassword, role: 'SUPER_ADMIN', isVerified: true },
  });
  const receptionistUser = await prisma.user.create({
    data: { email: 'reception@rawalhospital.com', password: hashedPassword, role: 'RECEPTIONIST', isVerified: true },
  });
  const pharmacistUser = await prisma.user.create({
    data: { email: 'pharmacy@rawalhospital.com', password: hashedPassword, role: 'PHARMACIST', isVerified: true },
  });
  const labTechUser = await prisma.user.create({
    data: { email: 'lab@rawalhospital.com', password: hashedPassword, role: 'LAB_TECHNICIAN', isVerified: true },
  });
  const accountantUser = await prisma.user.create({
    data: { email: 'accounts@rawalhospital.com', password: hashedPassword, role: 'ACCOUNTANT', isVerified: true },
  });
  const nurseUser = await prisma.user.create({
    data: { email: 'nurse@rawalhospital.com', password: hashedPassword, role: 'NURSE', isVerified: true },
  });

  // ========== STAFF ==========
  console.log('Creating staff...');
  await Promise.all([
    prisma.staff.create({ data: { userId: superAdminUser.id, employeeId: 'STF00001', firstName: 'Rahul', lastName: 'Sharma', department: 'Administration', designation: 'Hospital Director', phone: '+91-9876543210', email: 'superadmin@rawalhospital.com', joiningDate: new Date('2018-01-15'), salary: 250000, shift: 'Day' } }),
    prisma.staff.create({ data: { userId: adminUser.id, employeeId: 'STF00002', firstName: 'Priya', lastName: 'Verma', department: 'Administration', designation: 'Administrative Officer', phone: '+91-9876543211', email: 'admin@rawalhospital.com', joiningDate: new Date('2019-03-01'), salary: 120000, shift: 'Day' } }),
    prisma.staff.create({ data: { userId: receptionistUser.id, employeeId: 'STF00003', firstName: 'Neha', lastName: 'Singh', department: 'Reception', designation: 'Senior Receptionist', phone: '+91-9876543212', email: 'reception@rawalhospital.com', joiningDate: new Date('2020-06-15'), salary: 35000, shift: 'Rotating' } }),
    prisma.staff.create({ data: { userId: pharmacistUser.id, employeeId: 'STF00004', firstName: 'Amit', lastName: 'Patel', department: 'Pharmacy', designation: 'Chief Pharmacist', phone: '+91-9876543213', email: 'pharmacy@rawalhospital.com', joiningDate: new Date('2019-08-01'), salary: 55000, shift: 'Day' } }),
    prisma.staff.create({ data: { userId: labTechUser.id, employeeId: 'STF00005', firstName: 'Sneha', lastName: 'Reddy', department: 'Laboratory', designation: 'Senior Lab Technician', phone: '+91-9876543214', email: 'lab@rawalhospital.com', joiningDate: new Date('2020-02-01'), salary: 45000, shift: 'Day' } }),
    prisma.staff.create({ data: { userId: accountantUser.id, employeeId: 'STF00006', firstName: 'Vikram', lastName: 'Joshi', department: 'Finance', designation: 'Chief Accountant', phone: '+91-9876543215', email: 'accounts@rawalhospital.com', joiningDate: new Date('2019-11-01'), salary: 65000, shift: 'Day' } }),
    prisma.staff.create({ data: { userId: nurseUser.id, employeeId: 'STF00007', firstName: 'Anita', lastName: 'Kumari', department: 'Nursing', designation: 'Senior Staff Nurse', phone: '+91-9876543216', email: 'nurse@rawalhospital.com', joiningDate: new Date('2019-05-01'), salary: 40000, shift: 'Rotating' } }),
  ]);

  // ========== DOCTORS ==========
  console.log('Creating doctors...');
  const doctorsData = [
    { firstName: 'Dr. Arvind', lastName: 'Mehta', specialization: 'Cardiologist', qualification: 'MD, DM (Cardiology)', experienceYears: 18, licenseNumber: 'MCI-1987-001', designation: 'Senior Consultant Cardiologist', departmentId: cardiology.id, phone: '+91-9812345601', consultationFee: 1500, bio: 'Over 18 years of experience in interventional cardiology. Trained at AIIMS Delhi.', education: { degree: 'DM Cardiology', college: 'AIIMS Delhi', year: 2005 }, isAvailable: true, maxPatientsPerDay: 25, averageRating: 4.8, totalReviews: 120 },
    { firstName: 'Dr. Sunita', lastName: 'Deshmukh', specialization: 'Cardiologist', qualification: 'MD, DM (Cardiology)', experienceYears: 12, licenseNumber: 'MCI-1992-002', designation: 'Consultant Cardiologist', departmentId: cardiology.id, phone: '+91-9812345602', consultationFee: 1200, bio: 'Specializes in non-invasive cardiology and preventive cardiology.', education: { degree: 'DM Cardiology', college: 'PGIMER Chandigarh', year: 2011 }, isAvailable: true, maxPatientsPerDay: 20, averageRating: 4.6, totalReviews: 85 },
    { firstName: 'Dr. Rajesh', lastName: 'Khanna', specialization: 'Orthopedic Surgeon', qualification: 'MS (Ortho)', experienceYears: 20, licenseNumber: 'MCI-1985-003', designation: 'Senior Consultant Orthopedics', departmentId: orthopedics.id, phone: '+91-9812345603', consultationFee: 1500, bio: 'Expert in joint replacement surgery and arthroscopy procedures.', education: { degree: 'MS Orthopedics', college: 'KEM Hospital Mumbai', year: 2003 }, isAvailable: true, maxPatientsPerDay: 20, averageRating: 4.9, totalReviews: 150 },
    { firstName: 'Dr. Preeti', lastName: 'Nair', specialization: 'Orthopedic Surgeon', qualification: 'MS (Ortho), Fellowship in Spine Surgery', experienceYears: 10, licenseNumber: 'MCI-1995-004', designation: 'Consultant Spine Surgeon', departmentId: orthopedics.id, phone: '+91-9812345604', consultationFee: 1200, bio: 'Specializes in minimally invasive spine surgery.', education: { degree: 'Fellowship Spine Surgery', college: 'SGPGI Lucknow', year: 2013 }, isAvailable: true, maxPatientsPerDay: 15, averageRating: 4.5, totalReviews: 60 },
    { firstName: 'Dr. Vikram', lastName: 'Sethi', specialization: 'Neurologist', qualification: 'MD, DM (Neurology)', experienceYears: 15, licenseNumber: 'MCI-1990-005', designation: 'Senior Consultant Neurologist', departmentId: neurology.id, phone: '+91-9812345605', consultationFee: 1500, bio: 'Specializes in stroke management, epilepsy, and movement disorders.', education: { degree: 'DM Neurology', college: 'NIMHANS Bengaluru', year: 2008 }, isAvailable: true, maxPatientsPerDay: 20, averageRating: 4.7, totalReviews: 95 },
    { firstName: 'Dr. Anjali', lastName: 'Gupta', specialization: 'Pediatrician', qualification: 'MD (Pediatrics)', experienceYears: 14, licenseNumber: 'MCI-1991-006', designation: 'Senior Consultant Pediatrician', departmentId: pediatrics.id, phone: '+91-9812345606', consultationFee: 1000, bio: 'Expert in neonatal care and childhood developmental disorders.', education: { degree: 'MD Pediatrics', college: 'AIIMS Delhi', year: 2009 }, isAvailable: true, maxPatientsPerDay: 30, averageRating: 4.9, totalReviews: 200 },
    { firstName: 'Dr. Sanjay', lastName: 'Mishra', specialization: 'ENT Specialist', qualification: 'MS (ENT)', experienceYears: 16, licenseNumber: 'MCI-1988-007', designation: 'Senior Consultant ENT', departmentId: ent.id, phone: '+91-9812345607', consultationFee: 1000, bio: 'Specializes in otology, rhinology, and head-neck surgeries.', education: { degree: 'MS ENT', college: 'Grant Medical College Mumbai', year: 2007 }, isAvailable: true, maxPatientsPerDay: 25, averageRating: 4.6, totalReviews: 78 },
    { firstName: 'Dr. Lakshmi', lastName: 'Iyer', specialization: 'Gynecologist', qualification: 'MS (OBG)', experienceYears: 18, licenseNumber: 'MCI-1986-008', designation: 'Senior Consultant Gynecologist', departmentId: gynecology.id, phone: '+91-9812345608', consultationFee: 1200, bio: 'Expert in high-risk pregnancy management and laparoscopic surgery.', education: { degree: 'MS OBG', college: 'CMC Vellore', year: 2005 }, isAvailable: true, maxPatientsPerDay: 25, averageRating: 4.8, totalReviews: 180 },
    { firstName: 'Dr. Manoj', lastName: 'Tiwari', specialization: 'Dermatologist', qualification: 'MD (Dermatology)', experienceYears: 11, licenseNumber: 'MCI-1994-009', designation: 'Consultant Dermatologist', departmentId: dermatology.id, phone: '+91-9812345609', consultationFee: 800, bio: 'Specializes in cosmetic dermatology and laser treatments.', education: { degree: 'MD Dermatology', college: 'SMS Medical College Jaipur', year: 2012 }, isAvailable: true, maxPatientsPerDay: 30, averageRating: 4.4, totalReviews: 55 },
    { firstName: 'Dr. Kavita', lastName: 'Sharma', specialization: 'Psychiatrist', qualification: 'MD (Psychiatry)', experienceYears: 13, licenseNumber: 'MCI-1993-010', designation: 'Senior Consultant Psychiatrist', departmentId: psychiatry.id, phone: '+91-9812345610', consultationFee: 1200, bio: 'Expert in anxiety, depression, and stress management therapy.', education: { degree: 'MD Psychiatry', college: 'PGIMER Chandigarh', year: 2010 }, isAvailable: true, maxPatientsPerDay: 15, averageRating: 4.7, totalReviews: 90 },
    { firstName: 'Dr. Rakesh', lastName: 'Yadav', specialization: 'Emergency Physician', qualification: 'MD (Emergency Medicine)', experienceYears: 9, licenseNumber: 'MCI-1996-011', designation: 'Consultant Emergency Medicine', departmentId: emergency.id, phone: '+91-9812345611', consultationFee: 800, bio: 'Trained in trauma life support and emergency critical care.', education: { degree: 'MD Emergency Medicine', college: 'JIPMER Pondicherry', year: 2014 }, isAvailable: true, maxPatientsPerDay: 20, averageRating: 4.3, totalReviews: 40 },
    { firstName: 'Dr. Pooja', lastName: 'Jain', specialization: 'Dentist', qualification: 'BDS, MDS (Prosthodontics)', experienceYears: 8, licenseNumber: 'DCI-2000-012', designation: 'Consultant Dental Surgeon', departmentId: dental.id, phone: '+91-9812345612', consultationFee: 600, bio: 'Specializes in cosmetic dentistry and dental implants.', education: { degree: 'MDS Prosthodontics', college: 'Manipal College of Dental Sciences', year: 2015 }, isAvailable: true, maxPatientsPerDay: 20, averageRating: 4.5, totalReviews: 70 },
    { firstName: 'Dr. Deepak', lastName: 'Verma', specialization: 'General Physician', qualification: 'MD (General Medicine)', experienceYears: 15, licenseNumber: 'MCI-1989-013', designation: 'Senior Consultant Physician', departmentId: generalMedicine.id, phone: '+91-9812345613', consultationFee: 800, bio: 'Expert in internal medicine, diabetes, and hypertension management.', education: { degree: 'MD General Medicine', college: 'BHU Varanasi', year: 2008 }, isAvailable: true, maxPatientsPerDay: 40, averageRating: 4.6, totalReviews: 130 },
    { firstName: 'Dr. Meera', lastName: 'Chatterjee', specialization: 'Radiologist', qualification: 'MD (Radiology)', experienceYears: 12, licenseNumber: 'MCI-1992-014', designation: 'Consultant Radiologist', departmentId: radiology.id, phone: '+91-9812345614', consultationFee: 1000, bio: 'Expert in MRI, CT, and interventional radiology procedures.', education: { degree: 'MD Radiology', college: 'AIIMS Delhi', year: 2011 }, isAvailable: true, maxPatientsPerDay: 25, averageRating: 4.8, totalReviews: 88 },
  ];

  const doctorUsers: { user: any; doctor: any }[] = [];
  for (let i = 0; i < doctorsData.length; i++) {
    const d = doctorsData[i];
    const user = await prisma.user.create({
      data: { email: `doctor${i + 1}@rawalhospital.com`, password: hashedPassword, role: 'DOCTOR', isVerified: true },
    });
    const doctor = await prisma.doctor.create({
      data: { userId: user.id, employeeId: `DOC${String(i + 1).padStart(5, '0')}`, ...d },
    });
    doctorUsers.push({ user, doctor });
  }

  // ========== DOCTOR AVAILABILITY ==========
  console.log('Creating doctor availability...');
  for (const { doctor } of doctorUsers) {
    for (const day of days) {
      await prisma.doctorAvailability.create({
        data: { doctorId: doctor.id, day, startTime: '09:00', endTime: '13:00', slotDuration: 30, isActive: true },
      });
    }
    await prisma.doctorAvailability.create({
      data: { doctorId: doctor.id, day: 'SATURDAY', startTime: '09:00', endTime: '12:00', slotDuration: 30, isActive: true },
    });
    await prisma.doctorAvailability.create({
      data: { doctorId: doctor.id, day: 'SUNDAY', startTime: '10:00', endTime: '12:00', slotDuration: 30, isActive: false },
    });
  }

  // ========== PATIENTS ==========
  console.log('Creating patients...');
  const patientsData = [
    { firstName: 'Amit', lastName: 'Singh', phone: '+91-9876500001', gender: 'MALE' as Gender, bloodGroup: 'O_POSITIVE' as BloodGroup, city: 'Mumbai', state: 'Maharashtra', email: 'amit.singh@example.com' },
    { firstName: 'Priya', lastName: 'Patel', phone: '+91-9876500002', gender: 'FEMALE' as Gender, bloodGroup: 'A_POSITIVE' as BloodGroup, city: 'Ahmedabad', state: 'Gujarat', email: 'priya.patel@example.com' },
    { firstName: 'Rahul', lastName: 'Kumar', phone: '+91-9876500003', gender: 'MALE' as Gender, bloodGroup: 'B_POSITIVE' as BloodGroup, city: 'Delhi', state: 'Delhi', email: 'rahul.kumar@example.com' },
    { firstName: 'Sneha', lastName: 'Reddy', phone: '+91-9876500004', gender: 'FEMALE' as Gender, bloodGroup: 'AB_POSITIVE' as BloodGroup, city: 'Hyderabad', state: 'Telangana', email: 'sneha.reddy@example.com' },
    { firstName: 'Vikram', lastName: 'Joshi', phone: '+91-9876500005', gender: 'MALE' as Gender, bloodGroup: 'O_NEGATIVE' as BloodGroup, city: 'Pune', state: 'Maharashtra', email: 'vikram.joshi@example.com' },
    { firstName: 'Ananya', lastName: 'Gupta', phone: '+91-9876500006', gender: 'FEMALE' as Gender, bloodGroup: 'A_NEGATIVE' as BloodGroup, city: 'Lucknow', state: 'Uttar Pradesh', email: 'ananya.gupta@example.com' },
    { firstName: 'Ravi', lastName: 'Sharma', phone: '+91-9876500007', gender: 'MALE' as Gender, bloodGroup: 'B_NEGATIVE' as BloodGroup, city: 'Jaipur', state: 'Rajasthan', email: 'ravi.sharma@example.com' },
    { firstName: 'Neha', lastName: 'Verma', phone: '+91-9876500008', gender: 'FEMALE' as Gender, bloodGroup: 'O_POSITIVE' as BloodGroup, city: 'Chandigarh', state: 'Punjab', email: 'neha.verma@example.com' },
    { firstName: 'Arjun', lastName: 'Nair', phone: '+91-9876500009', gender: 'MALE' as Gender, bloodGroup: 'AB_NEGATIVE' as BloodGroup, city: 'Kochi', state: 'Kerala', email: 'arjun.nair@example.com' },
    { firstName: 'Divya', lastName: 'Iyer', phone: '+91-9876500010', gender: 'FEMALE' as Gender, bloodGroup: 'O_POSITIVE' as BloodGroup, city: 'Chennai', state: 'Tamil Nadu', email: 'divya.iyer@example.com' },
    { firstName: 'Suresh', lastName: 'Patil', phone: '+91-9876500011', gender: 'MALE' as Gender, bloodGroup: 'B_POSITIVE' as BloodGroup, city: 'Nagpur', state: 'Maharashtra', email: 'suresh.patil@example.com' },
    { firstName: 'Kavita', lastName: 'Deshmukh', phone: '+91-9876500012', gender: 'FEMALE' as Gender, bloodGroup: 'A_POSITIVE' as BloodGroup, city: 'Indore', state: 'Madhya Pradesh', email: 'kavita.deshmukh@example.com' },
    { firstName: 'Manoj', lastName: 'Tiwari', phone: '+91-9876500013', gender: 'MALE' as Gender, bloodGroup: 'O_POSITIVE' as BloodGroup, city: 'Patna', state: 'Bihar', email: 'manoj.tiwari@example.com' },
    { firstName: 'Pooja', lastName: 'Jain', phone: '+91-9876500014', gender: 'FEMALE' as Gender, bloodGroup: 'AB_POSITIVE' as BloodGroup, city: 'Bhopal', state: 'Madhya Pradesh', email: 'pooja.jain@example.com' },
    { firstName: 'Sunil', lastName: 'Yadav', phone: '+91-9876500015', gender: 'MALE' as Gender, bloodGroup: 'B_NEGATIVE' as BloodGroup, city: 'Varanasi', state: 'Uttar Pradesh', email: 'sunil.yadav@example.com' },
    { firstName: 'Deepa', lastName: 'Menon', phone: '+91-9876500016', gender: 'FEMALE' as Gender, bloodGroup: 'A_POSITIVE' as BloodGroup, city: 'Bengaluru', state: 'Karnataka', email: 'deepa.menon@example.com' },
  ];

  const patientRecords: any[] = [];
  for (let i = 0; i < patientsData.length; i++) {
    const p = patientsData[i];
    const user = await prisma.user.create({
      data: { email: p.email, password: hashedPassword, role: 'PATIENT', isVerified: true },
    });
    const patient = await prisma.patient.create({
      data: {
        userId: user.id,
        registrationNo: `RAW${String(i + 1).padStart(6, '0')}`,
        firstName: p.firstName,
        lastName: p.lastName,
        phone: p.phone,
        email: p.email,
        gender: p.gender,
        bloodGroup: p.bloodGroup,
        city: p.city,
        state: p.state,
        country: 'India',
        dateOfBirth: new Date(1970 + Math.floor(Math.random() * 40), Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1),
        address: `${Math.floor(Math.random() * 999) + 1}, ${['MG Road', 'Main Street', 'Park Avenue', 'Lake View', 'Gandhi Nagar'][Math.floor(Math.random() * 5)]}`,
        pincode: String(100000 + Math.floor(Math.random() * 900000)),
        occupation: ['Software Engineer', 'Teacher', 'Business Owner', 'Doctor', 'Lawyer', 'Accountant', 'Housewife', 'Retired'][Math.floor(Math.random() * 8)],
        emergencyContactName: `${p.firstName === 'Amit' ? 'Suresh Singh' : 'Family Member'}`,
        emergencyContactPhone: `+91-98765${String(10000 + i).padStart(5, '0')}`,
      },
    });
    patientRecords.push(patient);
  }

  // ========== APPOINTMENTS ==========
  console.log('Creating appointments...');
  const statuses: AppointmentStatus[] = ['SCHEDULED', 'CONFIRMED', 'CHECKED_IN', 'COMPLETED', 'CANCELLED', 'NO_SHOW'];
  for (let i = 0; i < 30; i++) {
    const patient = patientRecords[i % patientRecords.length];
    const { doctor } = doctorUsers[i % doctorUsers.length];
    const appointmentDate = new Date();
    appointmentDate.setDate(appointmentDate.getDate() - 15 + i);
    const startHour = 9 + Math.floor(Math.random() * 7);
    const startTime = `${String(startHour).padStart(2, '0')}:00`;
    const endTime = `${String(startHour + 1).padStart(2, '0')}:00`;
    const status = i < 20 ? 'COMPLETED' : statuses[Math.floor(Math.random() * statuses.length)];

    await prisma.appointment.create({
      data: {
        appointmentNo: `APT${String(i + 1).padStart(6, '0')}`,
        patientId: patient.id,
        doctorId: doctor.id,
        departmentId: doctor.departmentId,
        date: appointmentDate,
        startTime,
        endTime,
        status,
        type: Math.random() > 0.8 ? 'FOLLOW_UP' : 'OPD',
        reason: ['Chest pain', 'Fever and cough', 'Joint pain', 'Headache', 'Skin rash', 'Routine checkup', 'Eye infection', 'Back pain'][Math.floor(Math.random() * 8)],
        symptoms: ['Fever, cough, cold', 'Pain and swelling', 'Dizziness', 'Fatigue', 'Nausea'][Math.floor(Math.random() * 5)],
        consultationFee: doctor.consultationFee,
        createdBy: receptionistUser.id,
      },
    });
  }

  // ========== MEDICINES ==========
  console.log('Creating medicines...');
  const medicinesData = [
    { name: 'Paracetamol 500mg', genericName: 'Paracetamol', category: 'Analgesics', brand: 'Crocin', manufacturer: 'GSK', dosageForm: 'Tablet', strength: '500mg', unit: 'strip', pricePerUnit: 25, stockQuantity: 500, minStockLevel: 50, maxStockLevel: 1000, requiresPrescription: false, batchNo: 'BAT-2024-001', rackNo: 'A-01' },
    { name: 'Amoxicillin 250mg', genericName: 'Amoxicillin', category: 'Antibiotics', brand: 'Novamox', manufacturer: 'Cipla', dosageForm: 'Capsule', strength: '250mg', unit: 'strip', pricePerUnit: 85, stockQuantity: 300, minStockLevel: 30, maxStockLevel: 500, requiresPrescription: true, batchNo: 'BAT-2024-002', rackNo: 'A-02' },
    { name: 'Azithromycin 500mg', genericName: 'Azithromycin', category: 'Antibiotics', brand: 'Azithral', manufacturer: 'Alembic', dosageForm: 'Tablet', strength: '500mg', unit: 'strip', pricePerUnit: 150, stockQuantity: 200, minStockLevel: 20, maxStockLevel: 400, requiresPrescription: true, batchNo: 'BAT-2024-003', rackNo: 'A-03' },
    { name: 'Omeprazole 20mg', genericName: 'Omeprazole', category: 'GI Tract', brand: 'Omez', manufacturer: 'Dr. Reddy\'s', dosageForm: 'Capsule', strength: '20mg', unit: 'strip', pricePerUnit: 65, stockQuantity: 400, minStockLevel: 40, maxStockLevel: 600, requiresPrescription: false, batchNo: 'BAT-2024-004', rackNo: 'B-01' },
    { name: 'Metformin 500mg', genericName: 'Metformin', category: 'Diabetes', brand: 'Glycomet', manufacturer: 'USV', dosageForm: 'Tablet', strength: '500mg', unit: 'strip', pricePerUnit: 55, stockQuantity: 350, minStockLevel: 35, maxStockLevel: 500, requiresPrescription: true, batchNo: 'BAT-2024-005', rackNo: 'B-02' },
    { name: 'Amlodipine 5mg', genericName: 'Amlodipine', category: 'Cardiovascular', brand: 'Amlokind', manufacturer: 'Mankind', dosageForm: 'Tablet', strength: '5mg', unit: 'strip', pricePerUnit: 45, stockQuantity: 300, minStockLevel: 30, maxStockLevel: 500, requiresPrescription: true, batchNo: 'BAT-2024-006', rackNo: 'B-03' },
    { name: 'Losartan 50mg', genericName: 'Losartan', category: 'Cardiovascular', brand: 'Losar', manufacturer: 'Torrent', dosageForm: 'Tablet', strength: '50mg', unit: 'strip', pricePerUnit: 75, stockQuantity: 250, minStockLevel: 25, maxStockLevel: 400, requiresPrescription: true, batchNo: 'BAT-2024-007', rackNo: 'B-04' },
    { name: 'Atorvastatin 10mg', genericName: 'Atorvastatin', category: 'Cardiovascular', brand: 'Atorva', manufacturer: 'Zydus', dosageForm: 'Tablet', strength: '10mg', unit: 'strip', pricePerUnit: 95, stockQuantity: 280, minStockLevel: 28, maxStockLevel: 500, requiresPrescription: true, batchNo: 'BAT-2024-008', rackNo: 'B-05' },
    { name: 'Cetirizine 10mg', genericName: 'Cetirizine', category: 'Antihistamines', brand: 'Cetzine', manufacturer: 'GSK', dosageForm: 'Tablet', strength: '10mg', unit: 'strip', pricePerUnit: 35, stockQuantity: 600, minStockLevel: 60, maxStockLevel: 800, requiresPrescription: false, batchNo: 'BAT-2024-009', rackNo: 'C-01' },
    { name: 'Salbutamol Inhaler', genericName: 'Salbutamol', category: 'Respiratory', brand: 'Asthalin', manufacturer: 'Cipla', dosageForm: 'Inhaler', strength: '100mcg', unit: 'puff', pricePerUnit: 195, stockQuantity: 100, minStockLevel: 10, maxStockLevel: 200, requiresPrescription: true, batchNo: 'BAT-2024-010', rackNo: 'C-02' },
    { name: 'Dolo 650mg', genericName: 'Paracetamol', category: 'Analgesics', brand: 'Dolo', manufacturer: 'Micro Labs', dosageForm: 'Tablet', strength: '650mg', unit: 'strip', pricePerUnit: 35, stockQuantity: 450, minStockLevel: 45, maxStockLevel: 700, requiresPrescription: false, batchNo: 'BAT-2024-011', rackNo: 'A-01' },
    { name: 'Pantoprazole 40mg', genericName: 'Pantoprazole', category: 'GI Tract', brand: 'Pantocid', manufacturer: 'Sun Pharma', dosageForm: 'Tablet', strength: '40mg', unit: 'strip', pricePerUnit: 85, stockQuantity: 320, minStockLevel: 32, maxStockLevel: 500, requiresPrescription: false, batchNo: 'BAT-2024-012', rackNo: 'B-01' },
    { name: 'Thyroxine 50mcg', genericName: 'Levothyroxine', category: 'Thyroid', brand: 'Thyronorm', manufacturer: 'Abbott', dosageForm: 'Tablet', strength: '50mcg', unit: 'strip', pricePerUnit: 55, stockQuantity: 200, minStockLevel: 20, maxStockLevel: 400, requiresPrescription: true, batchNo: 'BAT-2024-013', rackNo: 'B-06' },
    { name: 'Montelukast 10mg', genericName: 'Montelukast', category: 'Respiratory', brand: 'Montair', manufacturer: 'Cipla', dosageForm: 'Tablet', strength: '10mg', unit: 'strip', pricePerUnit: 110, stockQuantity: 180, minStockLevel: 18, maxStockLevel: 300, requiresPrescription: true, batchNo: 'BAT-2024-014', rackNo: 'C-03' },
    { name: 'Diclofenac Gel', genericName: 'Diclofenac', category: 'Topical Analgesics', brand: 'Volini', manufacturer: 'Ranbaxy', dosageForm: 'Gel', strength: '1%', unit: 'tube', pricePerUnit: 95, stockQuantity: 150, minStockLevel: 15, maxStockLevel: 250, requiresPrescription: false, batchNo: 'BAT-2024-015', rackNo: 'D-01' },
    { name: 'Insulin Regular 40IU', genericName: 'Insulin', category: 'Diabetes', brand: 'Actrapid', manufacturer: 'Novo Nordisk', dosageForm: 'Injection', strength: '40IU/ml', unit: 'vial', pricePerUnit: 450, stockQuantity: 80, minStockLevel: 10, maxStockLevel: 150, requiresPrescription: true, batchNo: 'BAT-2024-016', rackNo: 'B-07' },
    { name: 'Ciprofloxacin 500mg', genericName: 'Ciprofloxacin', category: 'Antibiotics', brand: 'Cifran', manufacturer: 'Ranbaxy', dosageForm: 'Tablet', strength: '500mg', unit: 'strip', pricePerUnit: 120, stockQuantity: 250, minStockLevel: 25, maxStockLevel: 400, requiresPrescription: true, batchNo: 'BAT-2024-017', rackNo: 'A-04' },
    { name: 'Vitamin B Complex', genericName: 'Multivitamin B', category: 'Vitamins', brand: 'Becosules', manufacturer: 'Pfizer', dosageForm: 'Capsule', strength: '10mcg', unit: 'strip', pricePerUnit: 65, stockQuantity: 500, minStockLevel: 50, maxStockLevel: 600, requiresPrescription: false, batchNo: 'BAT-2024-018', rackNo: 'E-01' },
    { name: 'Iron Folic Acid', genericName: 'Iron + Folic Acid', category: 'Vitamins', brand: 'Fefol', manufacturer: 'GSK', dosageForm: 'Capsule', strength: '50mg', unit: 'strip', pricePerUnit: 75, stockQuantity: 400, minStockLevel: 40, maxStockLevel: 500, requiresPrescription: false, batchNo: 'BAT-2024-019', rackNo: 'E-02' },
    { name: 'Doxycycline 100mg', genericName: 'Doxycycline', category: 'Antibiotics', brand: 'Doxinate', manufacturer: 'Mankind', dosageForm: 'Tablet', strength: '100mg', unit: 'strip', pricePerUnit: 95, stockQuantity: 200, minStockLevel: 20, maxStockLevel: 350, requiresPrescription: true, batchNo: 'BAT-2024-020', rackNo: 'A-05' },
    { name: 'Furosemide 40mg', genericName: 'Furosemide', category: 'Diuretics', brand: 'Lasix', manufacturer: 'Sanofi', dosageForm: 'Tablet', strength: '40mg', unit: 'strip', pricePerUnit: 55, stockQuantity: 180, minStockLevel: 18, maxStockLevel: 300, requiresPrescription: true, batchNo: 'BAT-2024-021', rackNo: 'B-08' },
    { name: 'Digoxin 0.25mg', genericName: 'Digoxin', category: 'Cardiovascular', brand: 'Lanoxin', manufacturer: 'GSK', dosageForm: 'Tablet', strength: '0.25mg', unit: 'strip', pricePerUnit: 40, stockQuantity: 120, minStockLevel: 12, maxStockLevel: 200, requiresPrescription: true, batchNo: 'BAT-2024-022', rackNo: 'B-09' },
    { name: 'Warfarin 5mg', genericName: 'Warfarin', category: 'Anticoagulants', brand: 'Uniwarfin', manufacturer: 'Unichem', dosageForm: 'Tablet', strength: '5mg', unit: 'strip', pricePerUnit: 65, stockQuantity: 100, minStockLevel: 10, maxStockLevel: 200, requiresPrescription: true, batchNo: 'BAT-2024-023', rackNo: 'B-10' },
    { name: 'Prednisolone 10mg', genericName: 'Prednisolone', category: 'Steroids', brand: 'Omnacortil', manufacturer: 'Macleods', dosageForm: 'Tablet', strength: '10mg', unit: 'strip', pricePerUnit: 50, stockQuantity: 150, minStockLevel: 15, maxStockLevel: 300, requiresPrescription: true, batchNo: 'BAT-2024-024', rackNo: 'C-04' },
    { name: 'Calcium + Vitamin D3', genericName: 'Calcium Carbonate + Vitamin D3', category: 'Vitamins', brand: 'Calcirol', manufacturer: 'Himalaya', dosageForm: 'Tablet', strength: '500mg+400IU', unit: 'strip', pricePerUnit: 120, stockQuantity: 350, minStockLevel: 35, maxStockLevel: 500, requiresPrescription: false, batchNo: 'BAT-2024-025', rackNo: 'E-03' },
    { name: 'Multivitamin Tablets', genericName: 'Multivitamin', category: 'Vitamins', brand: 'Supradyn', manufacturer: 'Bayer', dosageForm: 'Tablet', strength: 'Multivitamin', unit: 'strip', pricePerUnit: 95, stockQuantity: 400, minStockLevel: 40, maxStockLevel: 600, requiresPrescription: false, batchNo: 'BAT-2024-026', rackNo: 'E-04' },
    { name: 'Ranitidine 150mg', genericName: 'Ranitidine', category: 'GI Tract', brand: 'Rantac', manufacturer: 'Torrent', dosageForm: 'Tablet', strength: '150mg', unit: 'strip', pricePerUnit: 45, stockQuantity: 350, minStockLevel: 35, maxStockLevel: 500, requiresPrescription: false, batchNo: 'BAT-2024-027', rackNo: 'B-11' },
    { name: 'Albendazole 400mg', genericName: 'Albendazole', category: 'Anthelmintics', brand: 'Zentel', manufacturer: 'GSK', dosageForm: 'Tablet', strength: '400mg', unit: 'strip', pricePerUnit: 30, stockQuantity: 200, minStockLevel: 20, maxStockLevel: 300, requiresPrescription: false, batchNo: 'BAT-2024-028', rackNo: 'A-06' },
    { name: 'Ofloxacin Eye Drops', genericName: 'Ofloxacin', category: 'Eye Care', brand: 'Oflox', manufacturer: 'Cipla', dosageForm: 'Drops', strength: '0.3%', unit: 'bottle', pricePerUnit: 65, stockQuantity: 120, minStockLevel: 12, maxStockLevel: 200, requiresPrescription: false, batchNo: 'BAT-2024-029', rackNo: 'D-02' },
    { name: 'Clotrimazole Cream', genericName: 'Clotrimazole', category: 'Antifungals', brand: 'Candid', manufacturer: 'Glenmark', dosageForm: 'Cream', strength: '1%', unit: 'tube', pricePerUnit: 55, stockQuantity: 160, minStockLevel: 16, maxStockLevel: 250, requiresPrescription: false, batchNo: 'BAT-2024-030', rackNo: 'D-03' },
    { name: 'Enalapril 5mg', genericName: 'Enalapril', category: 'Cardiovascular', brand: 'Envas', manufacturer: 'Cipla', dosageForm: 'Tablet', strength: '5mg', unit: 'strip', pricePerUnit: 50, stockQuantity: 220, minStockLevel: 22, maxStockLevel: 400, requiresPrescription: true, batchNo: 'BAT-2024-031', rackNo: 'B-12' },
  ];

  for (const med of medicinesData) {
    const expiryDate = new Date();
    expiryDate.setFullYear(expiryDate.getFullYear() + 1 + Math.floor(Math.random() * 2));
    await prisma.medicine.create({ data: { ...med, expiryDate } });
  }

  // ========== LAB TESTS ==========
  console.log('Creating lab tests...');
  const labTestsData = [
    { name: 'Complete Blood Count (CBC)', slug: 'complete-blood-count', category: 'Hematology', description: 'Measures red/white blood cells, platelets, hemoglobin', sampleType: 'Blood', turnaroundTime: '24 hours', cost: 500 },
    { name: 'Blood Sugar (Fasting)', slug: 'blood-sugar-fasting', category: 'Biochemistry', description: 'Measures blood glucose levels after fasting', sampleType: 'Blood', turnaroundTime: '6 hours', cost: 150 },
    { name: 'Lipid Profile', slug: 'lipid-profile', category: 'Biochemistry', description: 'Measures cholesterol, HDL, LDL, triglycerides', sampleType: 'Blood', turnaroundTime: '24 hours', cost: 600 },
    { name: 'Liver Function Test (LFT)', slug: 'liver-function-test', category: 'Biochemistry', description: 'Evaluates liver enzymes and function', sampleType: 'Blood', turnaroundTime: '24 hours', cost: 700 },
    { name: 'Kidney Function Test (KFT)', slug: 'kidney-function-test', category: 'Biochemistry', description: 'Measures creatinine, BUN, uric acid', sampleType: 'Blood', turnaroundTime: '24 hours', cost: 650 },
    { name: 'Thyroid Profile (T3,T4,TSH)', slug: 'thyroid-profile', category: 'Endocrinology', description: 'Evaluates thyroid gland function', sampleType: 'Blood', turnaroundTime: '24 hours', cost: 800 },
    { name: 'Urine Routine Analysis', slug: 'urine-routine-analysis', category: 'Clinical Pathology', description: 'Complete urinalysis for infection and disease markers', sampleType: 'Urine', turnaroundTime: '12 hours', cost: 200 },
    { name: 'Dengue NS1 Antigen', slug: 'dengue-ns1-antigen', category: 'Microbiology', description: 'Detects dengue virus antigen in blood', sampleType: 'Blood', turnaroundTime: '24 hours', cost: 1200 },
    { name: 'Malaria Antigen Test', slug: 'malaria-antigen-test', category: 'Microbiology', description: 'Rapid test for malaria parasite detection', sampleType: 'Blood', turnaroundTime: '6 hours', cost: 500 },
    { name: 'ECG (Electrocardiogram)', slug: 'ecg', category: 'Cardiology', description: 'Records electrical activity of the heart', sampleType: 'Non-invasive', turnaroundTime: '2 hours', cost: 350 },
    { name: 'X-Ray Chest PA View', slug: 'xray-chest-pa-view', category: 'Radiology', description: 'Chest X-ray for lung and heart evaluation', sampleType: 'Non-invasive', turnaroundTime: '6 hours', cost: 400 },
    { name: 'MRI Brain', slug: 'mri-brain', category: 'Radiology', description: 'Detailed brain imaging for neurological evaluation', sampleType: 'Non-invasive', turnaroundTime: '48 hours', cost: 4500 },
    { name: 'CT Scan Abdomen', slug: 'ct-scan-abdomen', category: 'Radiology', description: 'Cross-sectional imaging of abdominal organs', sampleType: 'Non-invasive', turnaroundTime: '48 hours', cost: 3500 },
    { name: 'HbA1c', slug: 'hba1c', category: 'Biochemistry', description: 'Average blood sugar over 3 months', sampleType: 'Blood', turnaroundTime: '24 hours', cost: 700 },
    { name: 'Vitamin D Test', slug: 'vitamin-d-test', category: 'Biochemistry', description: 'Measures vitamin D levels in blood', sampleType: 'Blood', turnaroundTime: '48 hours', cost: 1500 },
    { name: 'Vitamin B12 Test', slug: 'vitamin-b12-test', category: 'Biochemistry', description: 'Measures vitamin B12 levels', sampleType: 'Blood', turnaroundTime: '48 hours', cost: 1200 },
  ];

  for (const test of labTestsData) {
    await prisma.labTest.create({ data: test });
  }

  // ========== INVOICES ==========
  console.log('Creating invoices...');
  const invoiceStatuses: InvoiceStatus[] = ['PAID', 'SENT', 'DRAFT', 'PAID', 'PAID', 'OVERDUE', 'PAID', 'SENT'];
  for (let i = 0; i < 20; i++) {
    const patient = patientRecords[i % patientRecords.length];
    const status = invoiceStatuses[i % invoiceStatuses.length];
    const subtotal = [1500, 2500, 5000, 3500, 8000, 12000, 2000, 4500][i % 8];
    const discount = Math.random() > 0.7 ? 10 : 0;
    const tax = 5;
    const discountAmt = discount > 0 ? subtotal * (discount / 100) : 0;
    const taxAmt = (subtotal - discountAmt) * (tax / 100);
    const total = subtotal - discountAmt + taxAmt;
    const paidAmt = status === 'PAID' ? total : status === 'SENT' ? 0 : total * 0.5;

    await prisma.invoice.create({
      data: {
        invoiceNo: `INV${String(i + 1).padStart(6, '0')}`,
        patientId: patient.id,
        invoiceDate: new Date(Date.now() - (20 - i) * 24 * 60 * 60 * 1000),
        dueDate: new Date(Date.now() + (30 - i) * 24 * 60 * 60 * 1000),
        subtotal,
        discount,
        discountType: 'PERCENTAGE',
        tax,
        total: Math.round(total * 100) / 100,
        paidAmount: paidAmt,
        status: status as any,
        createdBy: receptionistUser.id,
        items: {
          create: [
            { description: 'Consultation Fee', quantity: 1, unitPrice: subtotal * 0.6, totalPrice: subtotal * 0.6, type: 'CONSULTATION' },
            { description: 'Lab Tests', quantity: 1, unitPrice: subtotal * 0.3, totalPrice: subtotal * 0.3, type: 'LAB_TEST' },
            { description: 'Medicines', quantity: 1, unitPrice: subtotal * 0.1, totalPrice: subtotal * 0.1, type: 'MEDICINE' },
          ],
        },
      },
    });
  }

  // ========== PAYMENTS ==========
  console.log('Creating payments...');
  const invoiceRecords = await prisma.invoice.findMany({ where: { status: { in: ['PAID', 'PARTIALLY_PAID'] } } });
  for (let i = 0; i < invoiceRecords.length; i++) {
    const inv = invoiceRecords[i];
    await prisma.payment.create({
      data: {
        paymentNo: `PAY${String(i + 1).padStart(6, '0')}`,
        invoiceId: inv.id,
        patientId: inv.patientId,
        amount: inv.paidAmount,
        paymentMode: ['CASH', 'CARD', 'UPI', 'NET_BANKING'][Math.floor(Math.random() * 4)],
        status: 'PAID',
        receivedBy: accountantUser.id,
      },
    });
  }

  // ========== BEDS ==========
  console.log('Creating beds...');
  const wards = ['General Ward', 'ICU', 'CCU', 'NICU', 'Private Room', 'Semi-Private'];
  const bedTypes = ['GENERAL', 'ICU', 'ICU', 'ICU', 'PRIVATE', 'SEMI_PRIVATE'];
  const charges = [1000, 5000, 6000, 7000, 3000, 2000];

  for (let w = 0; w < wards.length; w++) {
    const numBeds = w < 3 ? 10 : 5;
    for (let b = 1; b <= numBeds; b++) {
      const isOccupied = b <= Math.floor(numBeds * 0.6);
      await prisma.bed.create({
        data: {
          bedNo: `${String(wards[w].charAt(0))}${String(b).padStart(2, '0')}`,
          ward: wards[w],
          roomNo: `${w + 1}${String(b).padStart(2, '0')}`,
          type: bedTypes[w],
          isOccupied,
          charge: charges[w],
          isActive: true,
        },
      });
    }
  }

  // ========== ADMISSIONS ==========
  console.log('Creating admissions...');
  for (let i = 0; i < 8; i++) {
    const patient = patientRecords[i];
    const { doctor } = doctorUsers[i % doctorUsers.length];
    const admittedDaysAgo = Math.floor(Math.random() * 14) + 1;
    const isDischarged = i < 4;
    await prisma.admission.create({
      data: {
        admissionNo: `ADM${String(i + 1).padStart(6, '0')}`,
        patientId: patient.id,
        doctorId: doctor.id,
        roomNo: `${i + 1}0${i + 1}`,
        bedNo: `${wards[i % wards.length].charAt(0)}${String(i + 1).padStart(2, '0')}`,
        ward: wards[i % wards.length],
        admissionDate: new Date(Date.now() - admittedDaysAgo * 24 * 60 * 60 * 1000),
        diagnosis: ['Pneumonia', 'Fractured Femur', 'Stroke', 'Appendicitis', 'Severe Anemia', 'Heart Failure', 'Kidney Infection', 'Diabetes Management'][i],
        treatment: ['IV antibiotics and oxygen therapy', 'Surgical fixation with plate', 'Thrombolysis and rehabilitation', 'Emergency appendectomy', 'Blood transfusion and iron therapy', 'Diuretics and ACE inhibitors', 'IV antibiotics and hydration', 'Insulin therapy and diet planning'][i],
        notes: 'Patient responding well to treatment. Regular monitoring required.',
        status: isDischarged ? 'DISCHARGED' : 'ADMITTED',
        dischargeDate: isDischarged ? new Date(Date.now() - (admittedDaysAgo - 5) * 24 * 60 * 60 * 1000) : undefined,
        createdBy: doctor.userId,
      },
    });
  }

  // ========== BLOG POSTS ==========
  console.log('Creating blog posts...');
  const blogPosts = [
    { title: 'Understanding Heart Disease: Prevention and Care', slug: 'understanding-heart-disease', excerpt: 'Learn about heart disease symptoms, risk factors, and prevention strategies for a healthy heart.', content: '# Understanding Heart Disease\n\nHeart disease remains one of the leading causes of death worldwide. At Rawal Hospital, we believe in preventive cardiology...\n\n## Key Risk Factors\n- High blood pressure\n- High cholesterol\n- Smoking\n- Diabetes\n- Obesity\n\n## Prevention Tips\n1. Regular exercise\n2. Balanced diet\n3. Regular health checkups\n4. Stress management', category: 'Cardiology', tags: ['heart', 'cardiology', 'prevention', 'health'], isPublished: true, publishedAt: new Date('2024-01-15') },
    { title: 'Managing Diabetes in Daily Life', slug: 'managing-diabetes', excerpt: 'Practical tips for managing diabetes through diet, exercise, and medication adherence.', content: '# Diabetes Management\n\nLiving with diabetes requires careful management and lifestyle adjustments...\n\n## Diet Recommendations\n- Low glycemic index foods\n- Regular meal timing\n- Portion control\n\n## Exercise Guidelines\n- 30 minutes daily activity\n- Mix of cardio and strength training\n- Blood sugar monitoring before/after exercise', category: 'General Medicine', tags: ['diabetes', 'health', 'nutrition'], isPublished: true, publishedAt: new Date('2024-02-01') },
    { title: 'When to See an Orthopedic Doctor', slug: 'when-to-see-orthopedic', excerpt: 'Common signs that indicate you need to consult an orthopedic specialist for bone and joint issues.', content: '# Orthopedic Care\n\nMany people live with joint and bone pain unnecessarily...\n\n## Signs You Need an Orthopedic Consultation\n- Persistent joint pain\n- Swelling and stiffness\n- Difficulty moving\n- Injury from sports or accident\n- Chronic back pain', category: 'Orthopedics', tags: ['orthopedics', 'bone', 'joints', 'pain'], isPublished: true, publishedAt: new Date('2024-02-20') },
    { title: 'Child Vaccination Schedule: What Parents Must Know', slug: 'child-vaccination-schedule', excerpt: 'Complete guide to essential childhood vaccinations and immunization schedule in India.', content: '# Childhood Vaccinations\n\nVaccinations are crucial for protecting children from preventable diseases...\n\n## Essential Vaccines\n- BCG (at birth)\n- Hepatitis B (0, 6, 8 weeks)\n- DPT (6, 10, 14 weeks)\n- Polio (0, 6, 10, 14 weeks)\n- MMR (9 months, 15 months)\n- Typhoid (12 months)', category: 'Pediatrics', tags: ['vaccination', 'children', 'pediatrics', 'immunization'], isPublished: true, publishedAt: new Date('2024-03-05') },
    { title: 'Mental Health Awareness: Breaking the Stigma', slug: 'mental-health-awareness', excerpt: 'Understanding mental health issues and the importance of seeking professional help without shame.', content: '# Mental Health Matters\n\nMental health is as important as physical health...\n\n## Common Mental Health Issues\n- Anxiety disorders\n- Depression\n- Bipolar disorder\n- OCD\n- PTSD\n\n## When to Seek Help\nIf you experience persistent sadness, anxiety, sleep changes, or loss of interest in activities...', category: 'Psychiatry', tags: ['mental health', 'psychiatry', 'wellness', 'anxiety'], isPublished: true, publishedAt: new Date('2024-03-15') },
    { title: 'Understanding the Importance of Regular Health Checkups', slug: 'regular-health-checkups', excerpt: 'Why annual health checkups are essential for early detection and prevention of diseases.', content: '# Health Checkups Save Lives\n\nRegular health checkups can detect problems early when treatment is most effective...\n\n## Recommended Checkups\n- Annual physical examination\n- Blood pressure screening\n- Cholesterol levels\n- Blood sugar test\n- Cancer screenings\n- Eye and dental checkups', category: 'General Medicine', tags: ['checkup', 'prevention', 'health screening'], isPublished: true, publishedAt: new Date('2024-04-01') },
  ];

  for (const post of blogPosts) {
    await prisma.blogPost.create({
      data: {
        ...post,
        author: `Dr. ${doctorUsers[Math.floor(Math.random() * doctorUsers.length)].doctor.firstName} ${doctorUsers[0].doctor.lastName}`,
      },
    });
  }

  // ========== TESTIMONIALS ==========
  console.log('Creating testimonials...');
  const testimonials = [
    { patientName: 'Amit Singh', content: 'Excellent care and treatment at Rawal Hospital. The doctors are highly professional and caring.', rating: 5, designation: 'Software Engineer' },
    { patientName: 'Priya Patel', content: 'I had a wonderful experience during my treatment. The staff was very supportive throughout my stay.', rating: 5, designation: 'Teacher' },
    { patientName: 'Rahul Kumar', content: 'Best hospital in the city. From reception to discharge, everything was well managed.', rating: 4, designation: 'Business Owner' },
    { patientName: 'Sneha Reddy', content: 'The cardiology department saved my father\'s life. Forever grateful to Dr. Mehta and his team.', rating: 5, designation: 'Doctor' },
    { patientName: 'Ananya Gupta', content: 'Very clean hospital with modern facilities. The nursing staff is very attentive and kind.', rating: 4, designation: 'Lawyer' },
    { patientName: 'Deepa Menon', content: 'Affordable and high-quality healthcare. Highly recommend for all family health needs.', rating: 5, designation: 'Accountant' },
  ];

  for (const t of testimonials) {
    await prisma.testimonial.create({ data: t });
  }

  // ========== CONTACT MESSAGES ==========
  console.log('Creating contact messages...');
  const contactMessages = [
    { name: 'Rajesh Patel', email: 'rajesh@example.com', phone: '+91-9876510001', subject: 'Appointment Inquiry', message: 'I would like to book an appointment with a cardiologist for my mother. Could you please suggest available slots?' },
    { name: 'Meena Sharma', email: 'meena@example.com', phone: '+91-9876510002', subject: 'Insurance Query', message: 'Does your hospital accept cashless insurance from Star Health? I would like to know the list of approved insurance providers.' },
    { name: 'Vijay Kumar', email: 'vijay@example.com', phone: '+91-9876510003', subject: 'Feedback', message: 'I visited the dental department last week and was very impressed with the level of care provided. Dr. Jain was excellent!' },
  ];

  for (const msg of contactMessages) {
    await prisma.contactMessage.create({ data: msg });
  }

  // ========== SYSTEM SETTINGS ==========
  console.log('Creating system settings...');
  const settings = [
    { key: 'hospital_name', value: 'Rawal Hospital', group: 'GENERAL' },
    { key: 'hospital_address', value: '123, MG Road, Near Railway Station, Mumbai - 400001, Maharashtra', group: 'GENERAL' },
    { key: 'hospital_phone', value: '+91-22-23456789', group: 'GENERAL' },
    { key: 'hospital_email', value: 'info@rawalhospital.com', group: 'GENERAL' },
    { key: 'hospital_emergency', value: '+91-22-23456780', group: 'GENERAL' },
    { key: 'consultation_fee_general', value: '800', group: 'FEES' },
    { key: 'consultation_fee_specialist', value: '1500', group: 'FEES' },
    { key: 'tax_percentage', value: '5', group: 'FINANCE' },
    { key: 'currency', value: 'INR', group: 'FINANCE' },
    { key: 'appointment_slot_duration', value: '30', group: 'APPOINTMENT' },
    { key: 'max_appointments_per_day', value: '20', group: 'APPOINTMENT' },
    { key: 'opd_start_time', value: '09:00', group: 'APPOINTMENT' },
    { key: 'opd_end_time', value: '17:00', group: 'APPOINTMENT' },
    { key: 'low_stock_threshold', value: '10', group: 'PHARMACY' },
    { key: 'working_days', value: 'Monday to Saturday', group: 'GENERAL' },
  ];

  for (const setting of settings) {
    await prisma.systemSetting.create({ data: setting });
  }

  console.log('✅ Seed completed successfully!');
  console.log('📧 Admin login: admin@rawalhospital.com / password123');
  console.log('📧 Super Admin: superadmin@rawalhospital.com / password123');
  console.log('📧 Patient: amit.singh@example.com / password123');
  console.log('📧 Doctor: doctor1@rawalhospital.com / password123');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
