# Firebase Deployment Guide for Rawal Hospital

This guide explains how to deploy Rawal Hospital to Firebase.

## Prerequisites

1. **Firebase Account** - Create a project at [Firebase Console](https://console.firebase.google.com)
2. **Node.js 20+** installed
3. **Firebase CLI** installed: `npm install -g firebase-tools`
4. **PostgreSQL Database** - Use a cloud provider:
   - [Neon](https://neon.tech) (Recommended - free tier available)
   - [Supabase](https://supabase.com)
   - [Google Cloud SQL](https://cloud.google.com/sql)
   - [Railway](https://railway.app)

## Setup Steps

### 1. Create Firebase Project

```bash
# Login to Firebase
firebase login

# Initialize Firebase in the project
cd firebase
firebase init

# Select:
# - Hosting: Configure files for Firebase Hosting
# - Functions: Configure Cloud Functions
# - Storage: Configure security rules
# - Firestore: Configure security rules
```

### 2. Configure Database

Create a PostgreSQL instance on your chosen provider and update the connection string.

### 3. Set Environment Variables

```bash
cp firebase/functions/.env.example firebase/functions/.env
# Edit .env with your actual credentials
```

### 4. Deploy with Script

```bash
# Make the script executable (Linux/Mac)
chmod +x firebase/deploy.sh

# Run deployment
./firebase/deploy.sh
```

### 5. Manual Deployment Steps

```bash
# 1. Build backend
cd backend
npm ci
npx prisma generate
npm run build

# 2. Build frontend
cd ../frontend
npm ci
npm run build

# 3. Build functions
cd ../firebase/functions
npm ci
npx prisma generate --schema=../../backend/prisma/schema.prisma
npm run build

# 4. Deploy to Firebase
cd ..
firebase deploy --only hosting,functions,storage,firestore:rules
```

## Firebase Services Used

| Service | Purpose |
|---------|---------|
| **Cloud Functions** | Host the Express.js API server |
| **Hosting** | Serve the Next.js frontend |
| **Storage** | Store patient documents and reports |
| **Firestore** | Cache and analytics data |
| **Authentication** | Optional - can use alongside JWT |
| **Pub/Sub** | Scheduled tasks (cleanup) |

## Architecture

```
Firebase Hosting ──► Static assets (Next.js export)
                          │
Firebase Functions ──► Express.js API
                          │
                ┌─────────┴─────────┐
           PostgreSQL           Cloudinary
         (Neon/Supabase)       (Image storage)
```

## Production Database Options

### Option 1: Neon (Recommended)
- Serverless PostgreSQL
- Free tier: 500MB storage, 100hrs compute
- Connection pooling built-in
- `DATABASE_URL="postgresql://user:pass@ep-xxx.us-east-2.aws.neon.tech/rawal_hospital"`

### Option 2: Supabase
- PostgreSQL + additional services
- Free tier: 500MB database
- `DATABASE_URL="postgresql://postgres:pass@db.xxx.supabase.co:5432/postgres"`

### Option 3: Google Cloud SQL
- Fully managed PostgreSQL
- 30-day free trial
- Requires VPC access for Cloud Functions

## CI/CD with GitHub Actions

The project includes a GitHub Actions workflow (`.github/workflows/firebase-deploy.yml`).

### Setup GitHub Secrets:

1. `FIREBASE_TOKEN` - Generate with `firebase login:ci`
2. `FIREBASE_SERVICE_ACCOUNT_RAWAL_HOSPITAL` - Service account JSON from Firebase Console
3. `NEXT_PUBLIC_API_URL` - Cloud Functions URL

## Post-Deployment

After deployment:

1. **Run database migrations:**
   ```bash
   cd backend
   npx prisma migrate deploy
   ```

2. **Seed the database:**
   ```bash
   npx prisma db seed
   ```

3. **Create admin user:**
   ```bash
   curl -X POST https://us-central1-<project>.cloudfunctions.net/api/api/v1/auth/register \
     -H "Content-Type: application/json" \
     -d '{"email":"admin@rawalhospital.com","password":"securePassword123!","firstName":"Admin","lastName":"User","role":"ADMIN"}'
   ```

## URLs After Deployment

- **Frontend:** `https://<project>.web.app`
- **API:** `https://us-central1-<project>.cloudfunctions.net/api/api/v1`
- **Health:** `https://us-central1-<project>.cloudfunctions.net/api/api/health`
- **Firebase Console:** `https://console.firebase.google.com/project/<project>`

## Troubleshooting

### CORS Errors
Update the `corsOptions` in `firebase/functions/src/index.ts` with your actual domain.

### Database Connection Issues
- Ensure the PostgreSQL instance allows connections from Firebase Functions IPs
- Use connection pooling (Neon provides this by default)
- Check the `DATABASE_URL` in `firebase/functions/.env`

### Function Timeout
Cloud Functions have a 540s timeout limit. For long operations, consider:
- Breaking into smaller functions
- Using Cloud Tasks for async processing
- Increasing the timeout in `firebase.json`

### Cold Starts
For production, consider:
- Setting `minInstances` in function configuration
- Using a memory-optimized function tier
- Implementing connection pooling
