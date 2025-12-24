# 🔐 Authentication Setup - Quick Guide

## 📦 Step 1: Install Dependencies (2 minutes)

Open PowerShell in your project directory and run:

```powershell
npm install mongoose bcryptjs jsonwebtoken
```

**What this installs:**
- `mongoose` - MongoDB object modeling
- `bcryptjs` - Password hashing
- `jsonwebtoken` - JWT authentication

---

## 🗄️ Step 2: Set Up Database (5 minutes)

### Option A: Local MongoDB (Recommended for Development)

**1. Download MongoDB:**
- Go to: https://www.mongodb.com/try/download/community
- Download Windows version
- Run installer (keep default settings)

**2. Verify Installation:**
```powershell
mongod --version
```

**3. MongoDB starts automatically after installation!**

### Option B: MongoDB Atlas (Cloud - Free)

**1. Create Free Account:**
- Go to: https://www.mongodb.com/cloud/atlas/register
- Sign up (it's free!)

**2. Create Cluster:**
- Click "Build a Database"
- Choose FREE tier (M0)
- Select region closest to you
- Click "Create"

**3. Create Database User:**
- Security → Database Access
- Add New Database User
- Choose password authentication
- Save username and password

**4. Allow Network Access:**
- Security → Network Access
- Add IP Address
- Click "Allow Access from Anywhere" (for development)
- Confirm

**5. Get Connection String:**
- Click "Connect" on your cluster
- Choose "Connect your application"
- Copy the connection string
- Replace `<password>` with your database user password

Example:
```
mongodb+srv://myuser:MyPassword123@cluster0.xxxxx.mongodb.net/hirelift
```

---

## ⚙️ Step 3: Configure Environment (1 minute)

**1. Copy example file:**
```powershell
Copy-Item .env.example .env
```

**2. Edit `.env` file:**
```powershell
notepad .env
```

**3. Add your configuration:**

### For Local MongoDB:
```env
# Database
MONGODB_URI=mongodb://localhost:27017/hirelift

# JWT Secret (change this!)
JWT_SECRET=MyS3cr3tK3yF0rJWT_Ch4ng3Th1s

# Other settings
JWT_EXPIRE=30d
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:3000
GEMINI_API_KEY=your_gemini_key_here
```

### For MongoDB Atlas:
```env
# Database (use your connection string)
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/hirelift

# JWT Secret (generate a strong one!)
JWT_SECRET=MyS3cr3tK3yF0rJWT_Ch4ng3Th1s

# Other settings
JWT_EXPIRE=30d
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:3000
GEMINI_API_KEY=your_gemini_key_here
```

**💡 Pro Tip:** Generate a strong JWT secret:
```powershell
# Generate random string in PowerShell
-join ((48..57) + (65..90) + (97..122) | Get-Random -Count 32 | % {[char]$_})
```

---

## 🚀 Step 4: Start the Application (1 minute)

```powershell
npm run dev:all
```

**You should see:**
```
✅ MongoDB Connected: localhost (or your cluster)
📊 Database: hirelift
🚀 Server running on port 5000
📍 Environment: development
🌐 API available at http://localhost:5000/api
```

---

## ✅ Step 5: Test Authentication (2 minutes)

### Test 1: Register User

Open PowerShell:

```powershell
$body = @{
    name = "Test User"
    email = "test@example.com"
    password = "TestPass123!"
} | ConvertTo-Json

$response = Invoke-RestMethod -Uri "http://localhost:5000/api/auth/register" -Method Post -Body $body -ContentType "application/json"

Write-Host "✅ Registration successful!"
Write-Host "Token: $($response.token)"
Write-Host "User: $($response.user.name)"
```

**Expected Output:**
```
✅ Registration successful!
Token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
User: Test User
```

### Test 2: Login

```powershell
$body = @{
    email = "test@example.com"
    password = "TestPass123!"
} | ConvertTo-Json

$response = Invoke-RestMethod -Uri "http://localhost:5000/api/auth/login" -Method Post -Body $body -ContentType "application/json"

$token = $response.token
Write-Host "✅ Login successful!"
Write-Host "Token: $token"
```

### Test 3: Get User Profile

```powershell
$headers = @{
    Authorization = "Bearer $token"
}

$user = Invoke-RestMethod -Uri "http://localhost:5000/api/auth/me" -Method Get -Headers $headers

Write-Host "✅ Profile retrieved!"
Write-Host "Name: $($user.user.name)"
Write-Host "Email: $($user.user.email)"
```

### Test 4: Test in Browser

1. Open: http://localhost:3000
2. Click "Get Started" or "Login"
3. Click "Create Account"
4. Fill in:
   - Name: Your Name
   - Email: your@email.com
   - Password: YourPass123!
5. Click "Create Account"
6. You should see: "Account created successfully!"

---

## 🎯 Verification Checklist

- [ ] Dependencies installed (`npm install` completed)
- [ ] MongoDB is running (local) or Atlas cluster created
- [ ] `.env` file configured with `MONGODB_URI` and `JWT_SECRET`
- [ ] Server starts without errors
- [ ] Console shows "MongoDB Connected"
- [ ] Can register new user via API
- [ ] Can login via API
- [ ] Can get user profile via API
- [ ] Can register via frontend UI
- [ ] Can login via frontend UI
- [ ] User stays logged in after page refresh

---

## 🐛 Common Issues & Fixes

### Issue 1: "Cannot find module 'mongoose'"
**Fix:**
```powershell
npm install mongoose bcryptjs jsonwebtoken
```

### Issue 2: "Error connecting to MongoDB"
**For Local:**
```powershell
# Check if MongoDB is running
Get-Service -Name MongoDB

# Start it
net start MongoDB
```

**For Atlas:**
- Check connection string is correct
- Check password has no special characters that need encoding
- Check IP whitelist includes your IP

### Issue 3: "MongoDB service not found"
**Fix:** MongoDB might not be running as a service. Start it manually:
```powershell
# Navigate to MongoDB bin folder
cd "C:\Program Files\MongoDB\Server\7.0\bin"

# Start MongoDB
.\mongod.exe
```

### Issue 4: "Invalid JWT secret"
**Fix:** Make sure `JWT_SECRET` in `.env` is at least 32 characters long

### Issue 5: "Port 5000 already in use"
**Fix:** Change port in `.env`:
```env
PORT=5001
```

---

## 📊 View Database Data

### Using MongoDB Compass (GUI)

1. Download: https://www.mongodb.com/try/download/compass
2. Install and open
3. Connect to: `mongodb://localhost:27017` (or your Atlas string)
4. Browse `hirelift` database → `users` collection

### Using Mongo Shell

```powershell
# Connect to MongoDB
mongosh

# Switch to hirelift database
use hirelift

# View all users
db.users.find()

# Count users
db.users.countDocuments()

# Find specific user
db.users.findOne({ email: "test@example.com" })
```

---

## 🎉 Success!

If all tests pass, you now have:
✅ Working MongoDB database
✅ User authentication system
✅ JWT token-based sessions
✅ Secure password hashing
✅ Protected API routes
✅ Frontend integration

---

## 📱 What You Can Do Now

### User Actions:
- ✅ Register new account
- ✅ Login with credentials
- ✅ Stay logged in (auto-login)
- ✅ Update profile
- ✅ Logout

### Developer Actions:
- ✅ Create protected routes
- ✅ Access user data in controllers
- ✅ Store user preferences
- ✅ Track user activity
- ✅ Build user-specific features

---

## 🚀 Next Steps

1. **Try it out:**
   - Register a few test users
   - Update profiles
   - Test logout/login flow

2. **Customize:**
   - Add more profile fields
   - Customize validation rules
   - Add password strength requirements

3. **Enhance:**
   - Add email verification
   - Add password reset
   - Add social login (Google, GitHub)

---

## 📞 Need Help?

### Documentation:
- **Full Setup**: `AUTH_SETUP_COMPLETE.md`
- **API Reference**: `API_TESTING_GUIDE.md`
- **Server Docs**: `SERVER_README.md`

### Quick Commands:
```powershell
# Check MongoDB status
Get-Service MongoDB

# View logs
npm run server:dev

# Test API health
Invoke-RestMethod -Uri "http://localhost:5000/api/health" -Method Get

# Test auth endpoint
Invoke-RestMethod -Uri "http://localhost:5000/api/auth/register" -Method Post -Body '{"name":"Test","email":"test@test.com","password":"Test123!"}' -ContentType "application/json"
```

---

**Total Setup Time: ~10 minutes**

**Ready to build amazing features! 🎉**

---

*Last Updated: December 21, 2025*
