#!/bin/bash
# Limbus Company Team Builder Boot Script
set -e

RED='\033[0;31m'
GOLD='\033[0;33m'
GREEN='\033[0;32m'
NC='\033[0m'

echo -e "${RED}=============================================${NC}"
echo -e "${GOLD}   BOOTING LIMBUS SYSTEM CORES (DOCKER)      ${NC}"
echo -e "${RED}=============================================${NC}"

# Start containers in background
echo -e "${GOLD}Spinning up orchestration stack...${NC}"
docker-compose up -d

# Wait for backend to be healthy
echo -e "\n${GOLD}Waiting for database and API server to initialize and seed...${NC}"
max_attempts=15
attempt=1
healthy=false

while [ $attempt -le $max_attempts ]; do
    if curl -s http://localhost:5000/api/health | grep -q '"status":"healthy"'; then
        healthy=true
        break
    fi
    echo -n "."
    sleep 2
    attempt=$((attempt+1))
done

if [ "$healthy" = true ]; then
    echo -e "\n${GREEN}System is online!${NC}"
    echo -e "${GOLD}Launching web browser at http://localhost:3000...${NC}"
    
    # Open URL based on OS
    if command -v xdg-open &> /dev/null; then
        xdg-open "http://localhost:3000"
    elif command -v open &> /dev/null; then
        open "http://localhost:3000"
    elif command -v cmd.exe &> /dev/null; then
        cmd.exe /c start "http://localhost:3000"
    else
        echo "Please open http://localhost:3000 in your browser."
    fi
else
    echo -e "\n${RED}Warning: API Server is taking longer than expected to initialize.${NC}"
    echo "Please check running logs via: docker-compose logs"
    echo -e "You can access the frontend at: ${GOLD}http://localhost:3000${NC}"
fi
