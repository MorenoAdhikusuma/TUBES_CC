#!/bin/bash
# Limbus Company Team Builder Setup Script
set -e

# Terminal Colors
RED='\033[0;31m'
GOLD='\033[0;33m'
GREEN='\033[0;32m'
NC='\033[0m' # No Color

echo -e "${RED}=============================================${NC}"
echo -e "${GOLD}   LIMBUS COMPANY TEAM BUILDER SETUP CORE    ${NC}"
echo -e "${RED}=============================================${NC}"

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo -e "${RED}Error: Docker is not installed or running. Please install Docker and retry.${NC}"
    exit 1
fi

# Run local installation for IDE support
echo -e "\n${GOLD}[1/3] Preparing workspace libraries...${NC}"
echo "Installing backend libraries..."
cd backend
npm install --no-audit --no-fund
cd ..

echo "Installing frontend libraries..."
cd frontend
npm install --no-audit --no-fund
cd ..

# Build Docker Containers
echo -e "\n${GOLD}[2/3] Building Orchestration Containers...${NC}"
docker-compose build

# Complete
echo -e "\n${GREEN}[3/3] Complete!${NC}"
echo "---------------------------------------------"
echo "Configuration completed successfully."
echo "To boot the team builder stack, execute:"
echo -e "  ${GOLD}./start.sh${NC}"
echo "---------------------------------------------"
