# 🚀 Node.js Server Setup for HireLift

## ✅ What Has Been Created

I've set up a complete Node.js/Express backend server for your HireLift application with the following structure:

### 📁 Server Files Created:

```
server/
├── index.js                          # Main server entry point
├── routes/
│   └── api.js                        # API route definitions
└── controllers/
    ├── jobController.js              # Job matching & resume analysis
    ├── linkedInController.js         # LinkedIn optimization
    └── applicationController.js      # Application submissions

services/
└── api.ts                            # Frontend API service layer

.env.example                          # Environment variables template
SERVER_README.md                      # Detailed server documentation
```

### 🔧 Updated Files:

- ✅ `package.json` - Added server scripts and dependencies
- ✅ `vite.config.ts` - Added API proxy for development
- ✅ `.gitignore` - Added .env files to ignore list

---

## 📋 Setup Instructions

### Step 1: Install Dependencies

Since there seems to be an npm issue, try one of these methods:

**Method A - Using PowerShell:**
```powershell
cd C:\projects\hirelift
npm install express cors dotenv nodemon concurrently
```

**Method B - If npm is not working, reinstall Node.js:**
1. Download latest Node.js from: https://nodejs.org/
2. Install it (this will fix npm)
3. Then run: `npm install`

**Method C - Use yarn instead:**
```powershell
npm install -g yarn
yarn add express cors dotenv nodemon concurrently
```

### Step 2: Configure Environment Variables

1. Copy the example environment file:
   ```powershell
   Copy-Item .env.example .env
   ```

2. Edit `.env` and add your Gemini API key:
   ```env
   PORT=5000
   NODE_ENV=development
   CLIENT_URL=http://localhost:3000
   GEMINI_API_KEY=your_actual_gemini_api_key_here
   ```

   Get your Gemini API key from: https://makersuite.google.com/app/apikey

### Step 3: Run the Application

**Option A - Run Frontend and Backend Together (Recommended):**
```powershell
npm run dev:all
```

**Option B - Run Separately:**

Terminal 1 (Backend):
```powershell
npm run server:dev
```

Terminal 2 (Frontend):
```powershell
npm run dev
```

**Option C - Production Build:**
```powershell
npm run build
npm start
```

---

## 🛣️ API Endpoints Available

Once the server is running, these endpoints will be available:

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Server health check |
| POST | `/api/match-jobs` | Match jobs based on resume |
| POST | `/api/analyze-resume` | Analyze resume and provide feedback |
| POST | `/api/optimize-linkedin` | Optimize LinkedIn profile |
| POST | `/api/submit-application` | Submit job application |

---

## 📝 NPM Scripts Added

| Command | Description |
|---------|-------------|
| `npm run dev` | Start frontend (Vite dev server) |
| `npm run server` | Start backend (production) |
| `npm run server:dev` | Start backend with auto-reload |
| `npm start` | Start backend server |
| `npm run dev:all` | Run both frontend and backend |
| `npm run build` | Build frontend for production |

---

## 🧪 Testing the Server

Once the server is running, test it:

1. **Health Check:**
   - Open: http://localhost:5000/api/health
   - Should return: `{"status":"ok","timestamp":"..."}`

2. **Test API endpoint:**
   ```powershell
   # Using PowerShell
   Invoke-RestMethod -Uri "http://localhost:5000/api/health" -Method Get
   ```

---

## 🔌 Frontend Integration

The frontend can now use the API service:

```typescript
import { matchJobs, analyzeResume, optimizeLinkedIn } from './services/api';

// Example usage:
const jobs = await matchJobs(resumeText, { location: 'Remote' });
const analysis = await analyzeResume(resumeText);
const optimization = await optimizeLinkedIn(profileData, 'Software Engineer');
```

---

## 🎯 Key Features

✅ **Express.js Server** - Fast, minimal web framework
✅ **CORS Enabled** - Secure cross-origin requests
✅ **AI Integration** - Google Gemini API for smart features
✅ **Auto-reload** - Nodemon for development
✅ **Proxy Setup** - Vite proxy for seamless API calls
✅ **Production Ready** - Serves built frontend in production
✅ **Error Handling** - Comprehensive error middleware
✅ **Environment Config** - Secure configuration with .env

---

## 🐛 Troubleshooting

### NPM Not Working?
If you're getting npm errors, try:
1. Reinstall Node.js from https://nodejs.org/
2. Or use `yarn` instead of `npm`

### Port Already in Use?
Change the port in `.env`:
```env
PORT=5001
```

### CORS Errors?
Make sure `CLIENT_URL` in `.env` matches your frontend URL:
```env
CLIENT_URL=http://localhost:3000
```

### Gemini API Errors?
- Verify your API key is correct
- Check you have credits/quota available
- Test at: https://makersuite.google.com/

---

## 📚 Additional Resources

- **Full Server Documentation**: See `SERVER_README.md`
- **API Testing**: Use Postman or Thunder Client extension
- **Environment Setup**: Check `.env.example` for all variables

---

## 🎉 Next Steps

1. ✅ Install dependencies (see Step 1)
2. ✅ Configure .env file (see Step 2)
3. ✅ Run the application (see Step 3)
4. 🚀 Start building amazing features!

---

## 💡 Quick Start Command

Once npm is working, just run:
```powershell
npm install
npm run dev:all
```

Then visit:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000/api

---

**Need help?** Check `SERVER_README.md` for detailed documentation!
