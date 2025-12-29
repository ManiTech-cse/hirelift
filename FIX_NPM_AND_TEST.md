# 🔧 Fix NPM and Test Registration API

## ⚠️ Current Issue
Your npm installation appears to be corrupted. Let's fix it and test your registration API.

## 🛠️ Fix NPM (Choose One Method)

### Method 1: Reinstall Node.js (Recommended)
1. Download latest Node.js from: https://nodejs.org/
2. Run installer (it will update npm automatically)
3. Restart PowerShell
4. Test: `npm --version`

### Method 2: Repair npm Manually
```powershell
# Download npm
Invoke-WebRequest https://www.npmjs.com/install.sh -OutFile install-npm.ps1

# Or use Node.js to reinstall npm
node -e "console.log(process.execPath)"
# Then reinstall from nodejs.org
```

### Method 3: Use Yarn Instead
```powershell
# Install Yarn globally
npm install -g yarn
# Or download from: https://yarnpkg.com/

# Then in server directory
cd c:\projects\hirelift\server
yarn install
yarn dev
```

---

## 🚀 Quick Test Without Fixing npm

You can test your registration API right now using PowerShell!

### Test Script (Copy and Run in PowerShell)

```powershell
# Navigate to server directory
cd c:\projects\hirelift\server

# Test registration
$body = @{
    name = "manimohan"
    email = "manimohanp@example.com"
    password = "password@123"
} | ConvertTo-Json

try {
    $response = Invoke-RestMethod -Uri "http://localhost:4000/api/auth/register" `
        -Method Post `
        -ContentType "application/json" `
        -Body $body
    
    Write-Host "✅ Registration successful!" -ForegroundColor Green
    Write-Host "User: $($response.user.name)" -ForegroundColor Cyan
    Write-Host "Email: $($response.user.email)" -ForegroundColor Cyan
    Write-Host "Token: $($response.token.Substring(0, 50))..." -ForegroundColor Yellow
    
} catch {
    Write-Host "❌ Error: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host "Make sure server is running on port 4000" -ForegroundColor Yellow
}
```

---

## 📝 Manual Server Start (Without npm)

Since npm is broken, here's how to start manually:

### Step 1: Install Dependencies Manually

Download and extract to `server/node_modules/`:
- express: https://registry.npmjs.org/express/-/express-4.18.2.tgz
- mongoose: https://registry.npmjs.org/mongoose/-/mongoose-8.0.3.tgz
- bcryptjs: https://registry.npmjs.org/bcryptjs/-/bcryptjs-2.4.3.tgz
- jsonwebtoken: https://registry.npmjs.org/jsonwebtoken/-/jsonwebtoken-9.0.2.tgz
- cors: https://registry.npmjs.org/cors/-/cors-2.8.5.tgz
- dotenv: https://registry.npmjs.org/dotenv/-/dotenv-16.3.1.tgz

### Step 2: Start Server
```powershell
cd c:\projects\hirelift\server
node index.js
```

---

## 🧪 Test Your cURL Command (After Server Starts)

### PowerShell Version
```powershell
Invoke-RestMethod -Uri "http://localhost:4000/api/auth/register" `
    -Method Post `
    -ContentType "application/json" `
    -Body '{"name":"manimohan","email":"manimohanp@example.com","password":"password@123"}'
```

### Windows cURL Version
```cmd
curl --location "http://localhost:4000/api/auth/register" ^
--header "Content-Type: application/json" ^
--data-raw "{\"name\":\"manimohan\",\"email\":\"manimohanp@example.com\",\"password\":\"password@123\"}"
```

### Git Bash or WSL Version
```bash
curl --location 'http://localhost:4000/api/auth/register' \
--header 'Content-Type: application/json' \
--data-raw '{"name":"manimohan","email":"manimohanp@example.com","password":"password@123"}'
```

---

## ✅ Expected Response

```json
{
  "success": true,
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "676d8f9e8e8e8e8e8e8e8e8e",
    "name": "manimohan",
    "email": "manimohanp@example.com",
    "profile": {
      "skills": [],
      "experience": "",
      "jobLocation": [],
      "workModes": [],
      "preferredRoles": []
    },
    "createdAt": "2024-12-26T10:30:00.000Z"
  }
}
```

---

## 🎯 Recommended Solution

**Easiest fix:** Reinstall Node.js from https://nodejs.org/

This will automatically fix npm and you'll be able to run:
```powershell
cd c:\projects\hirelift\server
npm install
npm run dev
```

Then test your registration with the provided scripts!

---

## 📞 Quick Help

1. **Fix npm first** - Reinstall Node.js
2. **Install dependencies** - `npm install` in server directory
3. **Start server** - `npm run dev`
4. **Test registration** - Use PowerShell script or cURL command

Your backend code is ready, you just need to fix npm and install dependencies! 🚀
