export interface User {
  id: string;
  email: string;
  role: UserRole;
  isActive: boolean;
  isVerified: boolean;
  lastLogin?: string;
  createdAt: string;
  updatedAt: string;
  patient?: Patient;
  doctor?: Doctor;
  staff?: Staff;
}

export type UserRole = 'SUPER_ADMIN' | 'ADMIN' | 'DOCTOR' | 'NURSE' | 'RECEPTIONIST' | 'PHARMACIST' | 'LAB_TECHNICIAN' | 'ACCOUNTANT' | 'PATIENT';

export interface Patient {
  id: string;
  userId: string;
  user?: User;
  registrationNo: string;
  firstName: string;
  lastName: string;
  dateOfBirth?: string;
  gender?: string;
  bloodGroup?: string;
  phone: string;
  alternatePhone?: string;
  email?: string;
  address?: string;
  city?: string;
  state?: string;
  pincode?: string;
  country: string;
  occupation?: string;
  emergencyContactName?: string;
  emergencyContactPhone?: string;
  profileImage?: string;
  allergies?: string;
  chronicDiseases?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Doctor {
  id: string;
  userId: string;
  user?: User;
  employeeId: string;
  firstName: string;
  lastName: string;
  specialization: string;
  qualification: string;
  experienceYears: number;
  licenseNumber: string;
  designation: string;
  departmentId: string;
  department?: Department;
  phone: string;
  email?: string;
  consultationFee: number;
  profileImage?: string;
  bio?: string;
  isAvailable: boolean;
  maxPatientsPerDay: number;
  averageRating: number;
  totalReviews: number;
  availability?: DoctorAvailability[];
  createdAt: string;
  updatedAt: string;
}

export interface DoctorAvailability {
  id: string;
  doctorId: string;
  day: string;
  startTime: string;
  endTime: string;
  slotDuration: number;
  isActive: boolean;
}

export interface Department {
  id: string;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  image?: string;
  color?: string;
  floorNo?: string;
  wing?: string;
  extensionNo?: string;
  isActive: boolean;
  doctors?: Doctor[];
  treatments?: Treatment[];
  facilities?: DepartmentFacility[];
  workingHours?: DepartmentWorkingHours[];
  createdAt: string;
  updatedAt: string;
}

export interface Treatment {
  id: string;
  departmentId: string;
  name: string;
  description?: string;
  cost?: number;
  duration?: string;
  isActive: boolean;
}

export interface DepartmentFacility {
  id: string;
  departmentId: string;
  name: string;
  description?: string;
  icon?: string;
}

export interface DepartmentWorkingHours {
  id: string;
  departmentId: string;
  day: string;
  openTime: string;
  closeTime: string;
  isClosed: boolean;
}

export interface Appointment {
  id: string;
  appointmentNo: string;
  patientId: string;
  patient?: Patient;
  doctorId: string;
  doctor?: Doctor;
  departmentId: string;
  department?: Department;
  date: string;
  startTime: string;
  endTime: string;
  status: AppointmentStatus;
  type: string;
  reason?: string;
  symptoms?: string;
  notes?: string;
  isEmergency: boolean;
  isWalkIn: boolean;
  queueNumber?: number;
  consultationFee: number;
  createdBy: string;
  cancelledBy?: string;
  cancelReason?: string;
  createdAt: string;
  updatedAt: string;
}

export type AppointmentStatus = 'SCHEDULED' | 'CONFIRMED' | 'CHECKED_IN' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED' | 'NO_SHOW';

export interface MedicalRecord {
  id: string;
  appointmentId: string;
  patientId: string;
  doctorId: string;
  diagnosis?: string;
  symptoms?: string;
  treatment?: string;
  notes?: string;
  prescriptions?: any;
  labOrders?: any;
  followUpDate?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Invoice {
  id: string;
  invoiceNo: string;
  patientId: string;
  patient?: Patient;
  appointmentId?: string;
  invoiceDate: string;
  dueDate?: string;
  items: InvoiceItem[];
  subtotal: number;
  discount: number;
  discountType: string;
  tax: number;
  total: number;
  paidAmount: number;
  status: InvoiceStatus;
  notes?: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  payment?: Payment;
}

export interface InvoiceItem {
  id: string;
  invoiceId: string;
  description: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  type: string;
}

export type InvoiceStatus = 'DRAFT' | 'SENT' | 'PAID' | 'OVERDUE' | 'CANCELLED' | 'REFUNDED';

export interface Payment {
  id: string;
  paymentNo: string;
  invoiceId: string;
  patientId: string;
  amount: number;
  paymentMode: string;
  transactionId?: string;
  status: PaymentStatus;
  notes?: string;
  receivedBy: string;
  receivedAt: string;
  createdAt: string;
}

export type PaymentStatus = 'PENDING' | 'PAID' | 'PARTIALLY_PAID' | 'REFUNDED' | 'CANCELLED';

export interface Medicine {
  id: string;
  name: string;
  genericName?: string;
  category?: string;
  brand?: string;
  manufacturer?: string;
  dosageForm?: string;
  strength?: string;
  unit: string;
  pricePerUnit: number;
  stockQuantity: number;
  minStockLevel: number;
  maxStockLevel: number;
  expiryDate?: string;
  batchNo?: string;
  rackNo?: string;
  requiresPrescription: boolean;
  description?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface PharmacySale {
  id: string;
  invoiceNo: string;
  patientId?: string;
  prescriptionId?: string;
  items: PharmacySaleItem[];
  totalAmount: number;
  discount: number;
  tax: number;
  grandTotal: number;
  paymentStatus: PaymentStatus;
  paymentMode?: string;
  soldBy: string;
  createdAt: string;
}

export interface PharmacySaleItem {
  id: string;
  saleId: string;
  medicineId: string;
  medicine?: Medicine;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface LabTest {
  id: string;
  name: string;
  slug: string;
  category?: string;
  description?: string;
  preparation?: string;
  sampleType?: string;
  turnaroundTime?: string;
  cost: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface LabReport {
  id: string;
  reportNo: string;
  patientId: string;
  patient?: Patient;
  testId: string;
  test?: LabTest;
  appointmentId?: string;
  doctorId?: string;
  sampleCollectedAt?: string;
  sampleType?: string;
  resultDate?: string;
  results?: any;
  fileUrl?: string;
  status: LabReportStatus;
  notes?: string;
  verifiedBy?: string;
  verifiedAt?: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export type LabReportStatus = 'PENDING' | 'SAMPLE_COLLECTED' | 'IN_PROGRESS' | 'COMPLETED' | 'VERIFIED' | 'CANCELLED';

export interface Prescription {
  id: string;
  prescriptionNo: string;
  patientId: string;
  patient?: Patient;
  doctorId: string;
  doctor?: Doctor;
  diagnosis?: string;
  medicines: PrescriptionMedicine[];
  labTests?: any;
  notes?: string;
  followUpDate?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface PrescriptionMedicine {
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
  quantity?: number;
  notes?: string;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: string;
  link?: string;
  isRead: boolean;
  createdAt: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  category?: string;
  tags?: string[];
  imageUrl?: string;
  author: string;
  isPublished: boolean;
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Testimonial {
  id: string;
  patientName: string;
  content: string;
  rating: number;
  imageUrl?: string;
  designation?: string;
  isApproved: boolean;
  createdAt: string;
}

export interface Staff {
  id: string;
  userId: string;
  user?: User;
  employeeId: string;
  firstName: string;
  lastName: string;
  department?: string;
  designation: string;
  phone: string;
  email?: string;
  joiningDate?: string;
  salary?: number;
  shift?: string;
  profileImage?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface DashboardStats {
  totalPatients: number;
  totalDoctors: number;
  totalAppointments: number;
  totalRevenue: number;
  totalStaff: number;
  activeBeds: number;
  totalBeds: number;
  bedOccupancy: number;
  todayAppointments: number;
  pendingAppointments: number;
  completedAppointments: number;
  cancelledAppointments: number;
  pendingLabReports: number;
  lowStockMedicines: number;
  monthlyRevenue: number;
  yearlyRevenue: number;
}

export interface ChartDataPoint {
  label: string;
  value: number;
  value2?: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
}

export interface AuthResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}

export interface Slot {
  time: string;
  isAvailable: boolean;
}

export interface Bed {
  id: string;
  bedNo: string;
  ward: string;
  roomNo: string;
  type: string;
  isOccupied: boolean;
  charge: number;
  isActive: boolean;
}

export interface Admission {
  id: string;
  admissionNo: string;
  patientId: string;
  patient?: Patient;
  doctorId: string;
  doctor?: Doctor;
  roomNo?: string;
  bedNo?: string;
  ward?: string;
  admissionDate: string;
  dischargeDate?: string;
  diagnosis?: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}
