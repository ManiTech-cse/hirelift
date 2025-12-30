# API Connection Test Script
# Run this to verify frontend can connect to backend

Write-Host "🔌 Testing API Connection" -ForegroundColor Green
Write-Host "=========================" -ForegroundColor Green
Write-Host ""

$backendUrl = "http://localhost:4000"
$apiUrl = "$backendUrl/api"

# Test 1: Check if backend is running
Write-Host "1️⃣  Testing backend server..." -ForegroundColor Cyan
try {
    $health = Invoke-RestMethod -Uri "$apiUrl/health" -Method Get -TimeoutSec 3
    Write-Host "✅ Backend is running on port 4000" -ForegroundColor Green
    Write-Host "   Status: $($health.status)" -ForegroundColor Gray
    Write-Host "   Timestamp: $($health.timestamp)" -ForegroundColor Gray
} catch {
    Write-Host "❌ Backend is NOT running on port 4000!" -ForegroundColor Red
    Write-Host ""
    Write-Host "To start the backend:" -ForegroundColor Yellow
    Write-Host "1. cd c:\projects\hirelift\server" -ForegroundColor Gray
    Write-Host "2. npm install (if not done)" -ForegroundColor Gray
    Write-Host "3. npm run dev" -ForegroundColor Gray
    Write-Host ""
    exit 1
}

Write-Host ""

# Test 2: Test registration endpoint
Write-Host "2️⃣  Testing registration endpoint..." -ForegroundColor Cyan
$testEmail = "test-$(Get-Random)@example.com"
$userData = @{
    name = "Test User"
    email = $testEmail
    password = "password123"
} | ConvertTo-Json

try {
    $response = Invoke-RestMethod -Uri "$apiUrl/auth/register" `
        -Method Post `
        -ContentType "application/json" `
        -Body $userData `
        -TimeoutSec 5
    
    Write-Host "✅ Registration endpoint working!" -ForegroundColor Green
    Write-Host "   User created: $($response.user.email)" -ForegroundColor Gray
    Write-Host "   Token received: Yes" -ForegroundColor Gray
} catch {
    $statusCode = $_.Exception.Response.StatusCode.value__
    if ($statusCode -eq 400) {
        Write-Host "⚠️  Registration endpoint responding (400 - validation)" -ForegroundColor Yellow
    } else {
        Write-Host "❌ Registration endpoint error" -ForegroundColor Red
        Write-Host "   Error: $($_.Exception.Message)" -ForegroundColor Red
    }
}

Write-Host ""

# Test 3: Test your specific registration
Write-Host "3️⃣  Testing your registration data..." -ForegroundColor Cyan
$yourData = @{
    name = "manimohan"
    email = "manimohanp@example.com"
    password = "password@123"
} | ConvertTo-Json

try {
    $response = Invoke-RestMethod -Uri "$apiUrl/auth/register" `
        -Method Post `
        -ContentType "application/json" `
        -Body $yourData `
        -TimeoutSec 5
    
    Write-Host "✅ Your registration successful!" -ForegroundColor Green
    Write-Host "   User: $($response.user.name)" -ForegroundColor Gray
    Write-Host "   Email: $($response.user.email)" -ForegroundColor Gray
    Write-Host "   Token: $($response.token.Substring(0, 50))..." -ForegroundColor Gray
    
    # Save token
    $response.token | Out-File -FilePath "auth-token.txt" -NoNewline
    Write-Host ""
    Write-Host "💾 Token saved to auth-token.txt" -ForegroundColor Cyan
    
} catch {
    $statusCode = $_.Exception.Response.StatusCode.value__
    if ($statusCode -eq 400) {
        Write-Host "⚠️  User already exists (this is okay!)" -ForegroundColor Yellow
        Write-Host "   Try logging in instead" -ForegroundColor Gray
    } else {
        Write-Host "❌ Registration failed" -ForegroundColor Red
        if ($_.ErrorDetails) {
            $error = $_.ErrorDetails.Message | ConvertFrom-Json
            Write-Host "   Error: $($error.error)" -ForegroundColor Red
        }
    }
}

Write-Host ""
Write-Host "=========================" -ForegroundColor Green
Write-Host "✅ Connection Test Complete" -ForegroundColor Green
Write-Host ""
Write-Host "Summary:" -ForegroundColor Cyan
Write-Host "- Backend URL: http://localhost:4000" -ForegroundColor White
Write-Host "- API Endpoint: http://localhost:4000/api" -ForegroundColor White
Write-Host "- Frontend should connect to port 4000" -ForegroundColor White
Write-Host ""
