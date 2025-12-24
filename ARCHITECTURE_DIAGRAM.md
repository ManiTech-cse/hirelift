# 🏗️ HireLift Full-Stack Architecture

## System Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                        USER'S BROWSER                            │
│                     http://localhost:3000                        │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                    REACT FRONTEND (Vite)                         │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  Pages:                                                   │  │
│  │  - PersonalInteraction.tsx (Interview Practice)          │  │
│  │  - SmartJobMatch.tsx (Job Matching)                      │  │
│  │  - SearchJobs.tsx (Job Search)                           │  │
│  │  - SmartResumeBuilder.tsx (Resume Builder)               │  │
│  │  - PersonalizedApplication.tsx (Applications)            │  │
│  │  - About.tsx, Features.tsx, etc.                         │  │
│  └──────────────────────────────────────────────────────────┘  │
│                              │                                   │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  Services:                                                │  │
│  │  - api.ts (API client layer)                             │  │
│  │  - Handles all HTTP requests to backend                  │  │
│  └──────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                              │
                    HTTP/HTTPS Requests
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                   VITE PROXY (Development)                       │
│                  /api/* → localhost:5000                         │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                EXPRESS.JS SERVER (Node.js)                       │
│                    http://localhost:5000                         │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  Middleware:                                              │  │
│  │  - CORS (Cross-Origin Resource Sharing)                  │  │
│  │  - JSON body parser                                       │  │
│  │  - Error handling                                         │  │
│  └──────────────────────────────────────────────────────────┘  │
│                              │                                   │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  Routes (server/routes/api.js):                          │  │
│  │  - GET  /api/health                                       │  │
│  │  - POST /api/match-jobs                                   │  │
│  │  - POST /api/analyze-resume                               │  │
│  │  - POST /api/optimize-linkedin                            │  │
│  │  - POST /api/submit-application                           │  │
│  └──────────────────────────────────────────────────────────┘  │
│                              │                                   │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  Controllers:                                             │  │
│  │  - jobController.js                                       │  │
│  │    ├─ matchJobs()                                         │  │
│  │    └─ analyzeResume()                                     │  │
│  │  - linkedInController.js                                  │  │
│  │    └─ optimizeLinkedIn()                                  │  │
│  │  - applicationController.js                               │  │
│  │    └─ submitApplication()                                 │  │
│  └──────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                              │
                    API Requests
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                   GOOGLE GEMINI AI API                           │
│                  (External Service)                              │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  - Natural Language Processing                           │  │
│  │  - Job Matching Intelligence                             │  │
│  │  - Resume Analysis                                        │  │
│  │  - LinkedIn Optimization                                  │  │
│  │  - Content Generation                                     │  │
│  └──────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

---

## Request Flow Example: Job Matching

```
1. USER ACTION
   │
   └─> User uploads resume on SmartJobMatch.tsx
       │
       ▼
2. FRONTEND (React)
   │
   └─> services/api.ts: matchJobs(resumeText, preferences)
       │
       └─> fetch('http://localhost:3000/api/match-jobs', {
             method: 'POST',
             body: JSON.stringify({ resumeText, preferences })
           })
       │
       ▼
3. VITE PROXY (Dev Only)
   │
   └─> Proxies to http://localhost:5000/api/match-jobs
       │
       ▼
4. EXPRESS SERVER
   │
   └─> server/routes/api.js
       │
       └─> Routes to POST /api/match-jobs
           │
           └─> Calls jobController.matchJobs()
               │
               ▼
5. CONTROLLER
   │
   └─> server/controllers/jobController.js
       │
       └─> Validates request data
           │
           └─> Constructs AI prompt
               │
               ▼
6. GEMINI AI
   │
   └─> Sends prompt to Google Gemini API
       │
       └─> Receives AI-generated job matches
           │
           ▼
7. RESPONSE FLOW (Back to User)
   │
   └─> Controller parses AI response
       │
       └─> Returns JSON: { jobs: [...], total: 5 }
           │
           └─> Express sends HTTP response
               │
               └─> Frontend receives data
                   │
                   └─> React updates UI with job matches
                       │
                       └─> User sees matched jobs!
```

---

## File Structure

```
c:\projects\hirelift\
│
├── 📁 pages/                          # React Pages (Frontend)
│   ├── PersonalInteraction.tsx        # Interview practice
│   ├── SmartJobMatch.tsx              # Job matching
│   ├── SearchJobs.tsx                 # Job search
│   ├── SmartResumeBuilder.tsx         # Resume builder
│   └── ...
│
├── 📁 components/                     # React Components
│   ├── PageHeader.tsx
│   ├── JobCard.tsx
│   ├── NavBar.tsx
│   └── ...
│
├── 📁 services/                       # API Services
│   └── api.ts                         # Frontend-Backend bridge
│
├── 📁 server/                         # Backend Server
│   ├── index.js                       # Main server file
│   ├── 📁 routes/
│   │   └── api.js                     # API route definitions
│   └── 📁 controllers/
│       ├── jobController.js           # Job logic
│       ├── linkedInController.js      # LinkedIn logic
│       └── applicationController.js   # Application logic
│
├── 📄 package.json                    # Dependencies & Scripts
├── 📄 vite.config.ts                  # Vite configuration
├── 📄 .env                            # Environment variables (SECRET!)
├── 📄 .env.example                    # Environment template
│
├── 📄 start.bat                       # Windows quick start
├── 📄 start.ps1                       # PowerShell quick start
│
└── 📁 Documentation/
    ├── SERVER_README.md
    ├── SERVER_SETUP_GUIDE.md
    ├── API_TESTING_GUIDE.md
    ├── SERVER_SETUP_CHECKLIST.md
    └── SERVER_IMPLEMENTATION_COMPLETE.md
```

---

## Technology Stack

### Frontend
```
- React 19.2.3
- TypeScript
- Vite (Build tool)
- Tailwind CSS (Styling)
- Lucide React (Icons)
```

### Backend
```
- Node.js
- Express.js 4.18
- CORS
- dotenv (Environment variables)
```

### AI/ML
```
- Google Gemini AI
- @google/genai SDK
```

### Development Tools
```
- Nodemon (Auto-reload)
- Concurrently (Run multiple processes)
- TypeScript Compiler
```

---

## Environment Variables

```env
# Server Configuration
PORT=5000                              # Backend server port
NODE_ENV=development                   # Environment mode

# Frontend Configuration
CLIENT_URL=http://localhost:3000       # Frontend URL (for CORS)

# AI Configuration
GEMINI_API_KEY=your_api_key_here      # Google Gemini API key

# Optional (Future)
DATABASE_URL=...                       # Database connection
JWT_SECRET=...                         # Authentication secret
```

---

## API Endpoints

| Method | Endpoint | Controller | Purpose |
|--------|----------|------------|---------|
| GET | `/api/health` | - | Health check |
| POST | `/api/match-jobs` | jobController | Match jobs to resume |
| POST | `/api/analyze-resume` | jobController | Analyze resume quality |
| POST | `/api/optimize-linkedin` | linkedInController | Optimize LinkedIn profile |
| POST | `/api/submit-application` | applicationController | Submit job application |

---

## Development vs Production

### Development Mode
```
npm run dev:all

Frontend (Vite Dev Server)    →  Port 3000
Backend (Node + Nodemon)      →  Port 5000
API Proxy: /api/* → :5000
```

### Production Mode
```
npm run build
npm start

Frontend (Static Files)       →  Served by Express from /dist
Backend (Node Production)     →  Port 5000 (or ENV PORT)
No proxy needed
```

---

## Security Features

✅ **Environment Variables**: Sensitive data in .env (not in git)
✅ **CORS Protection**: Only allowed origins can access API
✅ **Input Validation**: All endpoints validate input
✅ **Error Handling**: Errors don't expose internals
✅ **.gitignore**: .env files excluded from version control
✅ **API Key Management**: Keys stored securely in .env

---

## Scalability Considerations

### Current Setup (MVP)
- Single server instance
- In-memory storage
- Direct AI API calls
- Suitable for: Development, small deployments

### Future Enhancements
- Database integration (MongoDB/PostgreSQL)
- Redis caching layer
- Rate limiting
- Authentication/Authorization (JWT)
- Load balancing
- Containerization (Docker)
- Cloud deployment (AWS/Azure/GCP)

---

## Performance Optimizations

### Frontend
- Vite's fast HMR (Hot Module Replacement)
- Code splitting
- Lazy loading
- Asset optimization

### Backend
- Express.js minimal overhead
- Efficient routing
- JSON parsing limits
- Error handling middleware

### AI Integration
- Request batching (future)
- Response caching (future)
- Prompt optimization

---

## Monitoring & Logging

### Current
- Console.log for debugging
- Express error middleware
- Browser DevTools

### Recommended for Production
- Winston/Morgan for logging
- Error tracking (Sentry)
- Performance monitoring (New Relic)
- Uptime monitoring
- Analytics

---

## Deployment Options

### Frontend
- Vercel (Recommended)
- Netlify
- GitHub Pages
- AWS S3 + CloudFront

### Backend
- Render (Recommended)
- Heroku
- Railway
- DigitalOcean
- AWS EC2/ECS

### Full-Stack
- Vercel (Frontend) + Render (Backend)
- Single Docker container
- Kubernetes cluster
- Serverless (AWS Lambda)

---

## Quick Reference

### Start Development
```powershell
npm run dev:all
```

### Test API
```powershell
Invoke-RestMethod -Uri "http://localhost:5000/api/health" -Method Get
```

### Build for Production
```powershell
npm run build
```

### Environment Setup
```powershell
copy .env.example .env
notepad .env  # Add your GEMINI_API_KEY
```

---

**🎉 You now have a complete full-stack application architecture!**
