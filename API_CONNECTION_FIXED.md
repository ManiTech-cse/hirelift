# 🔧 API Connection Fixed!

## ✅ What Was Fixed

### Problem
Your frontend was trying to connect to **port 5000**, but your backend runs on **port 4000**.

### Solution
Updated all configurations to use **port 4000** consistently.

---

## 📝 Changes Made

### 1. Root `.env` File
```diff
- PORT=5000
+ PORT=4000
+ VITE_API_URL=http://localhost:4000/api
```

### 2. Frontend Environment (`.env.development`)
Created new file with:
```env
VITE_API_URL=http://localhost:4000/api
```

### 3. Frontend Services
Updated both service files:
- ✅ `services/authService.ts` - Changed from 5000 to 4000
- ✅ `services/api.ts` - Changed from 5000 to 4000

### 4. Server Configuration
Already correct in `server/.env`:
```env
PORT=4000
```

---

## 🚀 How to Test

### Step 1: Restart Your Frontend (Important!)
```powershell
# Stop the current dev server (Ctrl+C)
# Then restart to pick up new environment variables
npm run dev
```

### Step 2: Start Backend (if not running)
```powershell
cd c:\projects\hirelift\server
npm run dev
```

### Step 3: Test Connection
```powershell
cd c:\projects\hirelift
.\test-api-connection.ps1
```

---

## 🧪 Test Your Registration

### Method 1: Frontend Form
1. Open browser: http://localhost:3000
2. Go to Register page
3. Fill in:
   - Name: manimohan
   - Email: manimohanp@example.com
   - Password: password@123
4. Submit

### Method 2: cURL Command
```bash
curl --location 'http://localhost:4000/api/auth/register' \
--header 'Content-Type: application/json' \
--data-raw '{"name":"manimohan","email":"manimohanp@example.com","password":"password@123"}'
```

### Method 3: PowerShell
```powershell
$body = @{
    name = "manimohan"
    email = "manimohanp@example.com"
    password = "password@123"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:4000/api/auth/register" `
    -Method Post `
    -ContentType "application/json" `
    -Body $body
```

---

## 🔍 Verify Configuration

### Check Frontend is Using Correct Port
In browser console (F12), check:
```javascript
// Should show: http://localhost:4000/api
console.log(import.meta.env.VITE_API_URL)
```

### Check Backend is Running on Port 4000
```powershell
curl http://localhost:4000/api/health
```

Expected response:
```json
{
  "status": "ok",
  "timestamp": "2024-12-26T..."
}
```

---

## 📁 Configuration Summary

### Frontend (Vite)
- `.env` → `VITE_API_URL=http://localhost:4000/api`
- `.env.development` → `VITE_API_URL=http://localhost:4000/api`
- `services/authService.ts` → Default fallback to port 4000
- `services/api.ts` → Default fallback to port 4000

### Backend (Express)
- `server/.env` → `PORT=4000`
- `server/index.js` → Reads from process.env.PORT

### Connection Flow
```
Frontend (port 3000)
    ↓
API Call to http://localhost:4000/api
    ↓
Backend (port 4000)
    ↓
MongoDB (port 27017)
```

---

## ⚠️ Important Notes

### 1. Restart Frontend Required
After changing environment variables, you **MUST restart** the Vite dev server:
```powershell
# Press Ctrl+C to stop
# Then start again
npm run dev
```

### 2. Environment Variable Priority
Vite loads environment variables in this order:
1. `.env.development.local` (not tracked)
2. `.env.development`
3. `.env.local` (not tracked)
4. `.env`

### 3. VITE_ Prefix Required
Only variables starting with `VITE_` are exposed to frontend code.

---

## ✅ Expected Behavior

### Before Fix
```
Frontend → http://localhost:5000/api ❌ (Connection Failed)
Backend  → Running on port 4000
```

### After Fix
```
Frontend → http://localhost:4000/api ✅ (Connected!)
Backend  → Running on port 4000
```

---

## 🐛 Troubleshooting

### Frontend still connecting to port 5000?
1. **Restart Vite dev server** (most common issue)
2. Clear browser cache
3. Hard refresh (Ctrl+Shift+R)
4. Check browser console for API URL

### Backend not responding?
```powershell
# Check if running
curl http://localhost:4000/api/health

# Check if port is in use
netstat -ano | findstr :4000

# Start backend
cd server
npm run dev
```

### CORS errors?
The backend is configured to allow requests from `http://localhost:3000`.
Make sure your frontend is running on port 3000.

---

## 🎉 You're All Set!

The API connection is now configured correctly:
- ✅ Backend on port 4000
- ✅ Frontend connecting to port 4000
- ✅ Environment variables properly set
- ✅ Both services updated

Just restart your frontend and backend, then test! 🚀
