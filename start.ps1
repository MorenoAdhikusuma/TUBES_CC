# Limbus Company Team Builder Boot Script for Windows PowerShell
Write-Host "=============================================" -ForegroundColor Red
Write-Host "   BOOTING LIMBUS SYSTEM CORES (DOCKER)      " -ForegroundColor Yellow
Write-Host "=============================================" -ForegroundColor Red

# Start containers in background
Write-Host "Spinning up orchestration stack..." -ForegroundColor Yellow
docker-compose up -d

# Wait for backend to be healthy
Write-Host "`nWaiting for database and API server to initialize and seed..." -ForegroundColor Yellow
$maxAttempts = 15
$attempt = 1
$healthy = $false

while ($attempt -le $maxAttempts) {
    try {
        $response = Invoke-RestMethod -Uri "http://localhost:5000/api/health" -Method Get -TimeoutSec 2 -ErrorAction SilentlyContinue
        if ($response.status -eq "healthy") {
            $healthy = $true
            break
        }
    } catch {}
    Write-Host "." -NoNewline
    Start-Sleep -Seconds 2
    $attempt++
}

if ($healthy) {
    Write-Host "`nSystem is online!" -ForegroundColor Green
    Write-Host "`nLaunching web browser at http://localhost:3000..." -ForegroundColor Yellow
    Start-Process "http://localhost:3000"
} else {
    Write-Warning "`nAPI Server is taking longer than expected to initialize."
    Write-Warning "Please check running logs via: docker-compose logs"
    Write-Host "You can access the frontend at: http://localhost:3000" -ForegroundColor Yellow
}
