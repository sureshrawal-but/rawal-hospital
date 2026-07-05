# Rawal Hospital Management System

A comprehensive, production-ready Hospital Management System (HMS) with an integrated public website and full-featured administrative dashboard.

## Tech Stack

### Frontend
- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animation:** Framer Motion
- **State:** Zustand, React Query
- **Forms:** React Hook Form + Zod
- **Charts:** Recharts
- **Icons:** Lucide React
- **HTTP:** Axios

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Language:** TypeScript
- **ORM:** Prisma
- **Database:** PostgreSQL
- **Auth:** JWT + Refresh Tokens
- **Validation:** Zod
- **File Upload:** Multer
- **Email:** Nodemailer
- **PDF:** PDFKit
- **Logging:** Winston

### DevOps
- **Containerization:** Docker + Docker Compose
- **Web Server:** Nginx
- **Cloud:** Cloudinary (media)

## Features

### Website
- Home page with hero, services, departments, doctors, testimonials, news
- About Us with mission, vision, history, leadership
- Department pages with details, doctors, treatments
- Doctor directory with search and filtering
- Online appointment booking
- Services page
- Blog with categories and search
- Contact form
- Careers page
- Fully responsive design

### Patient Portal
- Appointment management
- Medical history
- Prescriptions
- Lab reports
- Invoices and payments
- Profile management
- Notifications

### Doctor Dashboard
- Today's appointments
- Patient management
- Prescriptions
- Medical records
- Schedule management
- Video consultation placeholder

### Reception Dashboard
- Patient registration
- Appointment management
- Walk-in patients
- Queue management
- Billing

### Admin Dashboard
- Hospital statistics and analytics
- Revenue charts and trends
- Department performance
- Doctor and staff management
- Patient management
- Appointment oversight
- Pharmacy and lab management
- System settings
- Audit logs

### Pharmacy Module
- Medicine inventory management
- Sales with billing
- Purchase orders
- Stock alerts
- Expiry tracking

### Laboratory Module
- Test management
- Report upload and verification
- Patient access to results

### Billing Module
- Invoice generation
- Multiple payment modes
- Insurance support
- Discounts and taxes
- Receipts

## Getting Started

### Prerequisites

- Node.js 20+
- PostgreSQL 16+
- Docker (optional)

### Environment Variables

Copy the example env files:

```bash
cp backend/.env.example backend/.env
cp frontend/.env.local.example frontend/.env.local
```

### Installation

```bash
# Install all dependencies
npm run setup

# Or manually:
npm install
cd frontend && npm install
cd ../backend && npm install

# Database setup
cd backend
npx prisma migrate dev --name init
npx prisma db seed
```

### Development

```bash
# Run both frontend and backend
npm run dev

# Or separately:
cd backend && npm run dev    # http://localhost:5000
cd frontend && npm run dev    # http://localhost:3000
```

### Production Build

```bash
npm run build
npm start
```

### Docker Deployment

```bash
# Build and start all services
docker-compose up -d

# Or build specific services
docker-compose up -d postgres backend frontend

# View logs
docker-compose logs -f
```

### Firebase Deployment

```bash
# Prerequisites: Install Firebase CLI
npm install -g firebase-tools

# Deploy to Firebase (see firebase/BUILD.md for details)
chmod +x firebase/deploy.sh
./firebase/deploy.sh

# Or manually:
cd firebase
firebase login
firebase deploy --only hosting,functions,storage,firestore:rules
```

The backend runs as a Firebase Cloud Function and the frontend is served via Firebase Hosting.
Requires a cloud PostgreSQL provider (Neon, Supabase, or Cloud SQL).
Full deployment guide: [firebase/BUILD.md](firebase/BUILD.md)

## API Documentation

The API is available at `http://localhost:5000/api/v1`

### Authentication
- `POST /api/v1/auth/register` - Register new user
- `POST /api/v1/auth/login` - Login
- `POST /api/v1/auth/refresh-token` - Refresh JWT
- `POST /api/v1/auth/logout` - Logout
- `POST /api/v1/auth/forgot-password` - Forgot password
- `POST /api/v1/auth/reset-password` - Reset password
- `GET /api/v1/auth/me` - Get current user

### Patients
- `GET /api/v1/patients` - List patients (paginated)
- `GET /api/v1/patients/:id` - Get patient details
- `POST /api/v1/patients` - Create patient
- `PUT /api/v1/patients/:id` - Update patient
- `DELETE /api/v1/patients/:id` - Delete patient

### Doctors
- `GET /api/v1/doctors` - List doctors
- `GET /api/v1/doctors/:id` - Get doctor details
- `POST /api/v1/doctors` - Create doctor
- `PUT /api/v1/doctors/:id` - Update doctor
- `GET /api/v1/doctors/:id/availability` - Get availability
- `PUT /api/v1/doctors/:id/availability` - Update availability

### Departments
- `GET /api/v1/departments` - List departments
- `GET /api/v1/departments/:slug` - Get department details

### Appointments
- `GET /api/v1/appointments` - List appointments
- `POST /api/v1/appointments` - Create appointment
- `GET /api/v1/appointments/:id` - Get appointment details
- `PUT /api/v1/appointments/:id/status` - Update status
- `GET /api/v1/appointments/slots` - Get available slots

### Invoices
- `GET /api/v1/invoices` - List invoices
- `POST /api/v1/invoices` - Create invoice
- `GET /api/v1/invoices/:id` - Get invoice details

### Pharmacy
- `GET /api/v1/pharmacy/medicines` - List medicines
- `POST /api/v1/pharmacy/medicines` - Add medicine
- `GET /api/v1/pharmacy/medicines/low-stock` - Low stock alerts
- `POST /api/v1/pharmacy/sales` - Create sale
- `GET /api/v1/pharmacy/sales` - List sales

### Laboratory
- `GET /api/v1/laboratory/tests` - List tests
- `POST /api/v1/laboratory/tests` - Create test
- `GET /api/v1/laboratory/reports` - List reports
- `POST /api/v1/laboratory/reports` - Create report
- `PUT /api/v1/laboratory/reports/:id/verify` - Verify report

### Dashboard
- `GET /api/v1/dashboard/admin` - Admin dashboard data
- `GET /api/v1/dashboard/doctor` - Doctor dashboard data
- `GET /api/v1/dashboard/patient` - Patient dashboard data

## Project Structure

```
rawal-hospital/
├── frontend/               # Next.js application
│   ├── public/             # Static assets
│   └── src/
│       ├── app/            # App Router pages
│       │   ├── (website)/  # Public website pages
│       │   ├── auth/       # Auth pages
│       │   └── dashboard/  # Dashboard pages
│       ├── components/     # Reusable components
│       │   ├── ui/         # Base UI components
│       │   ├── layout/     # Layout components
│       │   ├── cards/      # Card components
│       │   ├── charts/     # Chart components
│       │   ├── forms/      # Form components
│       │   ├── modals/     # Modal components
│       │   └── skeleton/   # Loading skeletons
│       ├── hooks/          # Custom hooks
│       ├── lib/            # Utilities and config
│       ├── services/       # API service layer
│       ├── store/          # Zustand stores
│       └── types/          # TypeScript types
├── backend/                # Express.js API
│   ├── prisma/             # Schema and migrations
│   ├── src/
│   │   ├── config/         # Configuration
│   │   ├── controllers/    # Route handlers
│   │   ├── jobs/           # Background jobs
│   │   ├── middleware/     # Express middleware
│   │   ├── routes/         # Route definitions
│   │   ├── utils/          # Utilities
│   │   └── validators/     # Zod schemas
│   └── templates/          # Email templates
├── docs/                   # Documentation
├── docker-compose.yml      # Docker orchestration
└── nginx.conf              # Nginx configuration
```

## Database

PostgreSQL with Prisma ORM. Run migrations:

```bash
cd backend
npx prisma migrate dev
npx prisma db seed
npx prisma studio    # GUI database browser
```

## Default Credentials

After seeding:

| Role        | Email                 | Password    |
|-------------|-----------------------|-------------|
| Admin       | admin@rawalhospital.com | password123 |
| Doctor      | dr.sharma@rawalhospital.com | password123 |
| Patient     | patient@example.com   | password123 |
| Reception   | reception@rawalhospital.com | password123 |
| Pharmacist  | pharmacist@rawalhospital.com | password123 |

## Security

- JWT authentication with refresh tokens
- Role-based access control (RBAC)
- Password hashing with bcrypt (12 rounds)
- Rate limiting on API routes
- Input validation with Zod
- Helmet security headers
- CORS configuration
- Audit logging for sensitive operations
- CSRF protection via tokens

## Performance

- Next.js SSR/SSG for optimal loading
- Image optimization
- API response pagination
- Database indexing
- Compression middleware
- Docker multi-stage builds
- Nginx reverse proxy with caching

## License

Private - Rawal Hospital
