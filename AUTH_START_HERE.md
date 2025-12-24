# 🚀 START HERE - Authentication Setup

## ⚡ 5-Minute Quick Start

### 1. Install (1 min)
```powershell
npm install mongoose bcryptjs jsonwebtoken
```

### 2. Configure (1 min)
```powershell
Copy-Item .env.example .env
notepad .env
```

Add to `.env`:
```env
MONGODB_URI=mongodb://localhost:27017/hirelift
JWT_SECRET=MySecretKey123ChangeThis
```

### 3. Setup MongoDB (2 min)

**Easy Option - MongoDB Atlas (Cloud):**
1. Go to: https://mongodb.com/cloud/atlas/register
2. Create FREE cluster
3. Get connection string
4. Use it in `.env`

**Or Local MongoDB:**
- Download: https://www.mongodb.com/try/download/community
- Install and it runs automatically!

### 4. Start (1 min)
```powershell
npm run dev:all
```

### 5. Test!
- Open: http://localhost:3000
- Click "Create Account"
- Fill form and register
- Done! ✅

---

## 📚 Documentation

| Document | Use When |
|----------|----------|
| **AUTH_QUICK_SETUP.md** | Setting up step-by-step |
| **AUTH_SETUP_COMPLETE.md** | Need detailed info |
| **AUTH_ARCHITECTURE.md** | Understanding system |
| **AUTH_SUMMARY.md** | Quick reference |

---

## 🎯 What You Get

✅ User registration & login
✅ Secure password hashing
✅ JWT authentication
✅ MongoDB database
✅ Protected API routes
✅ Session persistence
✅ Auto-login support

---

## 🔧 Quick Commands

```powershell
# Install deps
npm install mongoose bcryptjs jsonwebtoken

# Start app
npm run dev:all

# Test registration (PowerShell)
$body = @{name="Test"; email="test@test.com"; password="Test123!"} | ConvertTo-Json
Invoke-RestMethod -Uri "http://localhost:5000/api/auth/register" -Method Post -Body $body -ContentType "application/json"
```

---

## ✅ Success Check

You're done when:
- ✅ Server starts without errors
- ✅ Console shows "MongoDB Connected"
- ✅ Can register new user
- ✅ Can login
- ✅ User stays logged in after refresh

---

## 🆘 Having Issues?

### MongoDB won't connect?
**Use MongoDB Atlas (cloud) instead:**
1. https://mongodb.com/cloud/atlas
2. Create free account
3. Get connection string
4. Add to `.env`

### Dependencies won't install?
```powershell
# Clear cache
npm cache clean --force
# Try again
npm install mongoose bcryptjs jsonwebtoken
```

### Port in use?
Change in `.env`:
```env
PORT=5001
```

---

## 📞 Need Help?

1. Check `AUTH_QUICK_SETUP.md` for detailed steps
2. Check `AUTH_SETUP_COMPLETE.md` for troubleshooting
3. Check server logs in terminal

---

**Total Time: ~5-10 minutes**

**Ready? Start with step 1 above! 🚀**
