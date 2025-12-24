# 🚀 Server Setup Checklist

Use this checklist to get your HireLift server up and running!

---

## ✅ Pre-Setup Checklist

- [ ] Node.js is installed (check with `node --version`)
- [ ] npm is working (check with `npm --version`)
- [ ] You have a Gemini API key (or can get one from https://makersuite.google.com/app/apikey)
- [ ] VS Code is installed (optional but recommended)

---

## 📦 Step 1: Install Dependencies

- [ ] Open PowerShell in `c:\projects\hirelift`
- [ ] Run: `npm install express cors dotenv nodemon concurrently --save`
- [ ] Verify installation: Check that `node_modules` folder exists
- [ ] Check `package.json` has the new dependencies

**If npm is broken:**
- [ ] Download and reinstall Node.js from https://nodejs.org/
- [ ] Restart your computer
- [ ] Try again

---

## 🔧 Step 2: Configure Environment

- [ ] Create `.env` file from template:
  ```powershell
  Copy-Item .env.example .env
  ```
- [ ] Open `.env` in a text editor
- [ ] Add your Gemini API key:
  ```env
  GEMINI_API_KEY=your_actual_key_here
  ```
- [ ] Save the file
- [ ] Verify the file exists and is not empty

**Get Gemini API Key:**
1. [ ] Go to https://makersuite.google.com/app/apikey
2. [ ] Sign in with Google account
3. [ ] Click "Create API Key"
4. [ ] Copy the key
5. [ ] Paste it in `.env`

---

## 🚀 Step 3: Start the Server

Choose one method:

### Method A: Quick Start Script (Easiest)
- [ ] Double-click `start.bat`
- [ ] Or run in PowerShell: `.\start.ps1`

### Method B: npm Command
- [ ] Run: `npm run dev:all`

### Method C: Separate Terminals
Terminal 1:
- [ ] Run: `npm run server:dev`

Terminal 2:
- [ ] Run: `npm run dev`

---

## ✅ Step 4: Verify Everything Works

### Check Frontend
- [ ] Open browser to http://localhost:3000
- [ ] Page loads without errors
- [ ] Navigation works
- [ ] No console errors

### Check Backend
- [ ] Open browser to http://localhost:5000/api/health
- [ ] Should see: `{"status":"ok","timestamp":"..."}`
- [ ] No error messages

### Test API (Optional)
- [ ] Open PowerShell
- [ ] Run:
  ```powershell
  Invoke-RestMethod -Uri "http://localhost:5000/api/health" -Method Get
  ```
- [ ] Should return JSON with status "ok"

---

## 🧪 Step 5: Test Features (Optional)

### Test Job Matching
- [ ] In PowerShell, run:
  ```powershell
  $body = @{ resumeText = "Software Engineer with 5 years experience" } | ConvertTo-Json
  Invoke-RestMethod -Uri "http://localhost:5000/api/match-jobs" -Method Post -Body $body -ContentType "application/json"
  ```
- [ ] Should return array of jobs

### Test Resume Analysis
- [ ] Use the API testing guide: `API_TESTING_GUIDE.md`
- [ ] Try different endpoints
- [ ] Verify responses are correct

---

## 📚 Step 6: Read Documentation

- [ ] Skim through `SERVER_README.md`
- [ ] Check `SERVER_SETUP_GUIDE.md` for detailed info
- [ ] Bookmark `API_TESTING_GUIDE.md` for reference
- [ ] Review `SERVER_IMPLEMENTATION_COMPLETE.md` for overview

---

## 🎨 Step 7: VS Code Setup (Optional)

- [ ] Install recommended extensions:
  - Thunder Client (for API testing)
  - ESLint
  - Prettier
  - Error Lens
- [ ] Press Ctrl+Shift+P → "Install Recommended Extensions"

---

## 🔧 Troubleshooting Checklist

### Server Won't Start
- [ ] Check if port 5000 is in use
- [ ] Try different port in `.env`: `PORT=5001`
- [ ] Check for syntax errors in server files
- [ ] Look at terminal output for error messages

### npm Install Fails
- [ ] Reinstall Node.js
- [ ] Clear npm cache: `npm cache clean --force`
- [ ] Delete `node_modules` and `package-lock.json`
- [ ] Try again: `npm install`

### API Returns Errors
- [ ] Check `.env` file exists
- [ ] Verify `GEMINI_API_KEY` is set correctly
- [ ] Check server console for detailed errors
- [ ] Try test mode without AI features

### Frontend Can't Connect to Backend
- [ ] Verify backend is running on port 5000
- [ ] Check `vite.config.ts` has proxy configured
- [ ] Restart both servers
- [ ] Clear browser cache

### CORS Errors
- [ ] Check `CLIENT_URL` in `.env` is `http://localhost:3000`
- [ ] Verify CORS is enabled in `server/index.js`
- [ ] Try accessing from the correct origin

---

## 🎯 Success Criteria

You're all set when:
- ✅ Frontend loads at http://localhost:3000
- ✅ Backend responds at http://localhost:5000/api/health
- ✅ No errors in browser console
- ✅ No errors in server terminal
- ✅ API endpoints return data (test with Thunder Client or PowerShell)

---

## 🎉 What's Next?

After completing this checklist:

1. **Start Developing**
   - Add new features
   - Customize the UI
   - Integrate more APIs

2. **Test Thoroughly**
   - Use API_TESTING_GUIDE.md
   - Test all endpoints
   - Try edge cases

3. **Deploy to Production**
   - Build: `npm run build`
   - Deploy to Vercel, Render, or your preferred host
   - Set environment variables on host

4. **Monitor & Improve**
   - Check logs
   - Add analytics
   - Gather user feedback

---

## 📞 Need Help?

If you're stuck:

1. **Check Documentation**
   - `SERVER_README.md` - Server details
   - `SERVER_SETUP_GUIDE.md` - Setup help
   - `API_TESTING_GUIDE.md` - Testing examples

2. **Check Server Logs**
   - Look in terminal where server is running
   - Error messages are detailed

3. **Check Browser Console**
   - Press F12 in browser
   - Look for errors in Console tab

4. **Common Issues**
   - npm not working → Reinstall Node.js
   - Port in use → Change PORT in .env
   - API errors → Check GEMINI_API_KEY
   - CORS → Check CLIENT_URL matches

---

## ✨ Quick Commands Reference

```powershell
# Install dependencies
npm install

# Run everything together
npm run dev:all

# Run only frontend
npm run dev

# Run only backend (dev mode)
npm run server:dev

# Run only backend (production)
npm start

# Build for production
npm run build

# Test API health
Invoke-RestMethod -Uri "http://localhost:5000/api/health" -Method Get
```

---

**Ready? Start with Step 1! 🚀**

Print this checklist and mark items off as you complete them!
