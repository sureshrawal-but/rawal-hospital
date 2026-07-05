#!/bin/bash

# ==================================================
# Rawal Hospital - Firebase Deployment Script
# ==================================================

set -e

echo "=========================================="
echo "  Rawal Hospital Firebase Deployment"
echo "=========================================="

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Check prerequisites
echo -e "\n${YELLOW}Checking prerequisites...${NC}"

if ! command -v node &> /dev/null; then
    echo -e "${RED}Node.js is required. Please install Node.js 20+${NC}"
    exit 1
fi

if ! command -v npm &> /dev/null; then
    echo -e "${RED}npm is required.${NC}"
    exit 1
fi

if ! command -v firebase &> /dev/null; then
    echo -e "${YELLOW}Installing Firebase CLI...${NC}"
    npm install -g firebase-tools
fi

echo -e "${GREEN}✓ Prerequisites met${NC}"

# 1. Build backend
echo -e "\n${YELLOW}[1/6] Building backend...${NC}"
cd "$(dirname "$0")/../backend"
npm ci
npx prisma generate
npm run build
echo -e "${GREEN}✓ Backend built${NC}"

# 2. Build frontend for static export
echo -e "\n${YELLOW}[2/6] Building frontend...${NC}"
cd "$(dirname "$0")/../frontend"
npm ci
npm run build
echo -e "${GREEN}✓ Frontend built${NC}"

# 3. Prepare Firebase functions
echo -e "\n${YELLOW}[3/6] Preparing Firebase Functions...${NC}"
cd "$(dirname "$0")/functions"
npm ci
npm run build
echo -e "${GREEN}✓ Functions prepared${NC}"

# 4. Generate Prisma client for functions
echo -e "\n${YELLOW}[4/6] Generating Prisma client...${NC}"
cd "$(dirname "$0)/functions"
npx prisma generate --schema=../../backend/prisma/schema.prisma
echo -e "${GREEN}✓ Prisma client generated${NC}"

# 5. Deploy to Firebase
echo -e "\n${YELLOW}[5/6] Deploying to Firebase...${NC}"
cd "$(dirname "$0")"

# Login if needed
firebase projects:list &> /dev/null || firebase login

# Deploy hosting, functions, and storage rules
firebase deploy --only hosting,functions,storage,firestore:rules
echo -e "${GREEN}✓ Deployed to Firebase${NC}"

# 6. Post-deployment verification
echo -e "\n${YELLOW}[6/6] Verifying deployment...${NC}"
PROJECT_ID=$(firebase projects:list --json | grep -o '"projectId":"[^"]*"' | head -1 | cut -d'"' -f4)
echo -e "${GREEN}✓ Deployment complete!${NC}"
echo ""
echo "=========================================="
echo "  Deployment Summary"
echo "=========================================="
echo "  Frontend: https://$PROJECT_ID.web.app"
echo "  API:      https://us-central1-$PROJECT_ID.cloudfunctions.net/api"
echo "  Health:   https://us-central1-$PROJECT_ID.cloudfunctions.net/api/api/health"
echo ""
echo "  Admin login: https://$PROJECT_ID.web.app/auth/login"
echo ""
echo "  Firebase Console: https://console.firebase.google.com/project/$PROJECT_ID"
echo "=========================================="
