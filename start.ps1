# Quick start script for PowerShell
# Run with: .\start.ps1

Write-Host "================================" -ForegroundColor Cyan
Write-Host "  HireLift Server Quick Start" -ForegroundColor Cyan
Write-Host "================================" -ForegroundColor Cyan
Write-Host ""

# Check if node_modules exists
if (-not (Test-Path "node_modules")) {
    Write-Host "[1/3] Installing dependencies..." -ForegroundColor Yellow
    npm install
    Write-Host ""
} else {
    Write-Host "[1/3] Dependencies already installed" -ForegroundColor Green
    Write-Host ""
}

# Check if .env exists
if (-not (Test-Path ".env")) {
    Write-Host "[2/3] Creating .env file from template..." -ForegroundColor Yellow
    Copy-Item .env.example .env
    Write-Host ""
    Write-Host "⚠️  IMPORTANT: Please edit .env and add your GEMINI_API_KEY" -ForegroundColor Yellow
    Write-Host "   Get your key from: https://makersuite.google.com/app/apikey" -ForegroundColor Yellow
    Write-Host ""
    Read-Host "Press Enter to continue"
} else {
    Write-Host "[2/3] .env file found" -ForegroundColor Green
    Write-Host ""
}

Write-Host "[3/3] Starting development servers..." -ForegroundColor Yellow
Write-Host ""
Write-Host "🚀 Frontend: http://localhost:3000" -ForegroundColor Cyan
Write-Host "🚀 Backend:  http://localhost:5000/api" -ForegroundColor Cyan
Write-Host ""
Write-Host "Press Ctrl+C to stop the servers" -ForegroundColor Gray
Write-Host ""

# Start both frontend and backend
npm run dev:all
