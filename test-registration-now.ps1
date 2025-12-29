# Test Registration API - Standalone Script
# This script tests your registration endpoint
# Run with: .\test-registration-now.ps1

Write-Host "🧪 Testing Registration API" -ForegroundColor Green
Write-Host "===========================" -ForegroundColor Green
Write-Host ""

$baseUrl = "http://localhost:4000"
$endpoint = "$baseUrl/api/auth/register"

# Your registration data
$userData = @{
    name = "manimohan"
    email = "manimohanp@example.com"
    password = "password@123"
} | ConvertTo-Json

Write-Host "Testing endpoint: $endpoint" -ForegroundColor Cyan
Write-Host ""
Write-Host "Request Body:" -ForegroundColor Yellow
Write-Host $userData -ForegroundColor Gray
Write-Host ""
Write-Host "Sending request..." -ForegroundColor Cyan
Write-Host ""

try {
    # Check if server is running first
    try {
        $health = Invoke-RestMethod -Uri "$baseUrl/api/health" -Method Get -TimeoutSec 2
        Write-Host "✅ Server is running" -ForegroundColor Green
    } catch {
        Write-Host "❌ Server is not running on port 4000!" -ForegroundColor Red
        Write-Host ""
        Write-Host "To start the server:" -ForegroundColor Yellow
        Write-Host "1. Fix npm (see FIX_NPM_AND_TEST.md)" -ForegroundColor Gray
        Write-Host "2. cd c:\projects\hirelift\server" -ForegroundColor Gray
        Write-Host "3. npm install" -ForegroundColor Gray
        Write-Host "4. npm run dev" -ForegroundColor Gray
        Write-Host ""
        exit 1
    }
    
    # Send registration request
    $response = Invoke-RestMethod -Uri $endpoint `
        -Method Post `
        -ContentType "application/json" `
        -Body $userData `
        -TimeoutSec 10
    
    Write-Host "✅ Registration Successful!" -ForegroundColor Green
    Write-Host ""
    Write-Host "==========================" -ForegroundColor Cyan
    Write-Host "Response Details:" -ForegroundColor Cyan
    Write-Host "==========================" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "User Information:" -ForegroundColor Yellow
    Write-Host "  ID       : $($response.user.id)" -ForegroundColor White
    Write-Host "  Name     : $($response.user.name)" -ForegroundColor White
    Write-Host "  Email    : $($response.user.email)" -ForegroundColor White
    Write-Host "  Created  : $($response.user.createdAt)" -ForegroundColor White
    Write-Host ""
    Write-Host "Authentication:" -ForegroundColor Yellow
    Write-Host "  Token    : $($response.token.Substring(0, 60))..." -ForegroundColor White
    Write-Host ""
    Write-Host "Profile:" -ForegroundColor Yellow
    Write-Host "  Skills   : $($response.user.profile.skills -join ', ')" -ForegroundColor White
    Write-Host "  Location : $($response.user.profile.jobLocation -join ', ')" -ForegroundColor White
    Write-Host ""
    
    # Save token
    $response.token | Out-File -FilePath "server\auth-token.txt" -NoNewline
    Write-Host "💾 Token saved to: server\auth-token.txt" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "You can now use this token for authenticated requests!" -ForegroundColor Green
    
} catch {
    $statusCode = $_.Exception.Response.StatusCode.value__
    Write-Host "❌ Registration Failed" -ForegroundColor Red
    Write-Host ""
    
    if ($statusCode -eq 400) {
        try {
            $errorBody = $_.ErrorDetails.Message | ConvertFrom-Json
            if ($errorBody.error -like "*already exists*") {
                Write-Host "⚠️  User Already Registered!" -ForegroundColor Yellow
                Write-Host "Email: manimohanp@example.com is already in use" -ForegroundColor Yellow
                Write-Host ""
                Write-Host "Try logging in instead or use a different email" -ForegroundColor Cyan
            } else {
                Write-Host "Error: $($errorBody.error)" -ForegroundColor Red
            }
        } catch {
            Write-Host "Error: Bad Request (400)" -ForegroundColor Red
        }
    } elseif ($statusCode -eq 500) {
        Write-Host "Server Error (500) - Check server logs" -ForegroundColor Red
    } else {
        Write-Host "Status Code: $statusCode" -ForegroundColor Red
        if ($_.ErrorDetails) {
            Write-Host "Error: $($_.ErrorDetails.Message)" -ForegroundColor Red
        } else {
            Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Red
        }
    }
}

Write-Host ""
Write-Host "==========================" -ForegroundColor Green
Write-Host ""
