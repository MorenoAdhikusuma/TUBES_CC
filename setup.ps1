# Limbus Company Team Builder Setup Script for Windows PowerShell
Write-Host "=============================================" -ForegroundColor Red
Write-Host "   LIMBUS COMPANY TEAM BUILDER SETUP CORE    " -ForegroundColor Yellow
Write-Host "=============================================" -ForegroundColor Red

# Check if Docker is installed
if (-not (Get-Command docker -ErrorAction SilentlyContinue)) {
    Write-Warning "Docker is not detected in your PATH. Please make sure Docker Desktop is installed and running."
    Exit 1
}

# Run local installation for IDE support
Write-Host "`n[1/3] Preparing workspace libraries..." -ForegroundColor Yellow
if (Get-Command npm -ErrorAction SilentlyContinue) {
    try {
        Write-Host "Installing backend libraries..."
        cd backend
        npm install --no-audit --no-fund
        cd ..

        Write-Host "Installing frontend libraries..."
        cd frontend
        npm install --no-audit --no-fund
        cd ..
    } catch {
        Write-Warning "Local npm install encountered issues. Proceeding anyway since Docker will handle dependencies."
        # Ensure we are back in root directory
        cd $PSScriptRoot
    }
} else {
    Write-Host "Node.js/npm not detected on host system. Skipping local dependency install."
    Write-Host "Proceeding with Docker setup (dependencies are managed automatically inside the containers)."
}

# Normalize line endings of shell scripts for Unix environments (removes CRLF carriage returns)
if (Test-Path setup.sh) {
    (Get-Content -Raw setup.sh) -replace "`r`n", "`n" | Set-Content -NoNewline setup.sh
}
if (Test-Path start.sh) {
    (Get-Content -Raw start.sh) -replace "`r`n", "`n" | Set-Content -NoNewline start.sh
}

# Build Docker Containers
Write-Host "`n[2/3] Building Orchestration Containers..." -ForegroundColor Yellow
docker-compose build

# Seeding note
Write-Host "`n[3/3] Complete!" -ForegroundColor Green
Write-Host "---------------------------------------------"
Write-Host "Configuration completed successfully."
Write-Host "To boot the team builder stack, execute:"
Write-Host "  .\start.ps1" -ForegroundColor Yellow
Write-Host "---------------------------------------------"
