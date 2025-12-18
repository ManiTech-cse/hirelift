# HireLift - Developer Setup & Architecture

## 🏗️ Project Architecture

### Directory Structure
```
hirelift/
├── App.tsx                 # Main app component with all routes
├── index.tsx              # React entry point
├── index.css              # Global styles & animations
├── vite.config.ts         # Vite configuration
├── tsconfig.json          # TypeScript config
├── types.ts               # Global type definitions
├── constants.ts           # Job data & config constants
│
├── components/            # Reusable UI components
│   ├── Button.tsx         # Button component
│   ├── Input.tsx          # Input & TextArea
│   ├── FileUpload.tsx     # Resume file uploader
│   ├── JobCard.tsx        # Individual job card
│   └── JobFilterPanel.tsx # Job filtering UI
│
├── services/              # Business logic & API calls
│   ├── geminiService.ts   # Google Gemini AI integration
│   ├── workflowGenerator.ts # n8n workflow export
│   ├── workdayFiller.ts   # Workday console script generator
│   └── companyCache.ts    # Company data caching
│
├── api/                   # Backend API routes
│   └── match-jobs.ts      # Job matching endpoint
│
└── public/                # Static assets
    └── favicon.ico
```

---

## 🎯 Component Overview

### App.tsx (Main Component)
**Handles:**
- Application state management (LANDING, LOGIN, PROFILE, APPLICATION_FORM, DASHBOARD)
- Authentication flow
- Profile management
- Job matching and filtering
- Auto-apply logic
- Toast notifications

**Key States:**
```typescript
- appState: ExtendedAppState
- profile: UserProfile
- matchedJobs: MatchedJob[]
- jobFilters: JobFilters
- applyingJobs: Set<string>
- appliedJobs: Set<string>
- activeBotJob: string | null
- botStep: string
- resumeFile: File | null
```

### components/JobFilterPanel.tsx
**Features:**
- Match percentage slider
- Job type multi-select
- Remote only toggle
- Visa sponsorship checkbox
- Salary range inputs
- Filter reset functionality

### components/FileUpload.tsx
**Features:**
- Drag & drop support (file input)
- File type validation
- File size validation (configurable)
- Text extraction from .txt files
- Visual feedback with icons

### services/geminiService.ts
**Functions:**
- `matchJobsWithProfile()` - AI-powered job matching
- `generateCoverLetter()` - AI cover letter generation
- `fetchCompanyDetails()` - Company info lookup

---

## 📊 Data Flow

### User Registration & Job Search
```
1. User lands on LANDING page
2. Clicks "Create" → Auth Modal opens
3. Enters email, password (with suggestion)
4. Submits → Profile Setup page
5. Fills profile (skills, experience, preferences)
6. Optional: Uploads resume file
7. Submits → Application Form page
8. Adds cover letter, LinkedIn, etc.
9. Submits → Dashboard with matched jobs
10. Filters jobs, clicks auto-apply
11. Bot simulation runs, career page opens
12. User completes application on official site
```

### Job Matching Algorithm
```
1. User submits application form
2. Profile data sent to Gemini API
3. Gemini matches with job database
4. Returns: matched_jobs array with percentages
5. Fallback: Local matching if API fails
6. Results filtered by user's filter settings
7. Displayed in dashboard
```

---

## 🔐 Security & Best Practices

### Data Handling
- ✅ No sensitive data stored in localStorage
- ✅ API keys stored in .env.local (git-ignored)
- ✅ Type-safe data structures
- ✅ Input validation on file uploads
- ✅ URL encoding for data in links

### Authentication
- Demo mode with pre-filled credentials
- Email/password validation
- Strong password generator
- Profile-based session management

---

## 🚀 Running the Application

### Prerequisites
```bash
Node.js v20.13.0+
npm v10+
```

### Installation
```bash
# Clone or extract project
cd c:\projects\hirelift

# Install dependencies
npm install

# Set up environment
# Create/edit .env.local with:
GEMINI_API_KEY=your-key-here
```

### Development Server
```bash
npm run dev
# Output: http://localhost:3000/
```

### Production Build
```bash
npm run build
# Output: dist/

npm run preview
# Preview build locally
```

---

## 🧪 Testing Checklist

### Responsive Design
- [ ] Mobile (375px): Landing, Profile, Dashboard
- [ ] Tablet (768px): All features
- [ ] Desktop (1024px+): Full layout with sidebar
- [ ] Large screen (1920px): Optimized spacing

### User Flows
- [ ] New user registration → Profile → Job matches
- [ ] Existing user login → Dashboard
- [ ] File upload (PDF, DOC, TXT)
- [ ] Resume text extraction
- [ ] Job filtering with multiple filters
- [ ] Auto-apply simulation → Career page opens
- [ ] Cover letter generation
- [ ] n8n workflow download
- [ ] Workday script download

### Error Handling
- [ ] Invalid file upload
- [ ] API failure (Gemini)
- [ ] Network timeout
- [ ] Empty job results
- [ ] Invalid form input

---

## 📈 Performance Optimization

### Current Optimizations
- Vite for fast bundling
- React.lazy() for code splitting
- CSS animations (GPU-accelerated)
- Memoized components (where needed)
- Efficient state updates

### Potential Improvements
- [ ] Image optimization with Next.js Image
- [ ] API response caching
- [ ] IndexedDB for job cache
- [ ] Service Worker for PWA
- [ ] Dynamic import of heavy libraries

---

## 🔗 API Integrations

### Google Gemini API
**Endpoint**: REST API via @google/genai  
**Used For**:
- Job matching based on resume
- Cover letter generation
- Company detail fetching

**Error Handling**:
- Fallback to local job database
- Retry logic with exponential backoff
- User-friendly error messages

### Career Pages (No API)
**Integration Method**: Direct URL linking  
**Data Passed**: URL query parameters
- `?candidate_name=...`
- `?candidate_email=...`

---

## 📝 Code Style & Conventions

### TypeScript
- Strict mode enabled
- No `any` types
- Interface-based data structures
- Proper error typing

### React
- Functional components only
- Hooks for state management
- Prop typing with interfaces
- Memoization for performance

### Tailwind CSS
- Mobile-first approach
- Responsive breakpoints (sm:, md:, lg:)
- Component-scoped utilities
- Custom animations in index.css

---

## 🐛 Common Issues & Fixes

### Issue: Vite dev server won't start
```bash
# Clear node_modules and reinstall
rm -r node_modules package-lock.json
npm install
npm run dev
```

### Issue: Gemini API not working
```bash
# Check .env.local file
# Verify API key is valid
# Check rate limits
# Use fallback mode (auto-enabled)
```

### Issue: Resume file won't upload
```bash
# Check file size (default: 10MB)
# Verify file type (.pdf, .doc, .docx, .txt)
# Check browser console for errors
```

---

## 🚢 Deployment Guide

### Vercel (Recommended)
```bash
# Push to GitHub
git push origin main

# Vercel auto-deploys on push
# Set GEMINI_API_KEY in Vercel environment variables
```

### Netlify
```bash
netlify deploy --prod
# Set environment variables in Netlify UI
```

### Docker
```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "preview"]
```

---

## 📚 Additional Resources

- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Tailwind CSS](https://tailwindcss.com)
- [Vite Documentation](https://vitejs.dev)
- [Google Gemini API](https://ai.google.dev)

---

**Version**: 1.0.0  
**Last Updated**: December 18, 2025  
**Maintainer**: HireLift Team
