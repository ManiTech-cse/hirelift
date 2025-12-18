# Quick Start Guide - HireLift

## 🚀 5-Minute Setup

### Step 1: Install Dependencies
```bash
cd c:\projects\hirelift
npm install
```

### Step 2: Set API Key
Create or edit `.env.local`:
```env
GEMINI_API_KEY=your-google-gemini-api-key
```

Get your free API key: https://ai.google.dev

### Step 3: Start Dev Server
```bash
npm run dev
```

Open: **http://localhost:3000/**

---

## 🎮 Demo Account
- **Email**: demo@hirelift.ai
- **Password**: password

Or create a new account during signup.

---

## 🎯 Key Features to Try

### 1. **View Landing Page**
- See animated bubbles floating around
- Click "Create" to register
- Or "Log in" with demo account

### 2. **Build Your Profile**
- Enter your name and experience
- Add skills (comma-separated): `React, TypeScript, Node.js`
- Select work modes: Remote, Hybrid, or Onsite
- Add target cities

### 3. **Upload Resume** (Optional)
- Click the upload area
- Select PDF, DOC, DOCX, or TXT file
- Auto-extracts text (for TXT files)

### 4. **Add Application Details**
- LinkedIn URL (optional)
- Portfolio/GitHub (optional)
- Availability & salary expectations

### 5. **Find Jobs**
- Click "Search Live Jobs"
- AI finds matching positions
- See match percentage and reasoning

### 6. **Filter Results**
- Adjust match percentage slider
- Filter by job type
- Toggle remote only
- Set salary range

### 7. **Auto-Apply**
- Click "Apply Now" on any job
- Watch the AI simulation (6 steps)
- Official career page opens
- Apply directly on company site

---

## 📝 Manual Testing

### Test 1: Responsive Mobile View
```bash
# In Chrome DevTools:
# Press F12 → Toggle device toolbar (Ctrl+Shift+M)
# Test on iPhone 12 (390x844)
```

### Test 2: Job Matching
Profile:
- Skills: React, TypeScript, Tailwind, Node.js
- Experience: 3 years
- Role: Frontend Developer

Expected matches: 15+ jobs at 50%+

### Test 3: File Upload
- Try uploading: PDF, DOC, DOCX, TXT
- File size: < 10MB
- Expected: Shows filename and size

### Test 4: Auto-Apply
- Click "Apply Now"
- Watch 6-step simulation
- Should open careers.google.com (or company site)

---

## 🎨 Customization

### Change Company Careers URLs
Edit `constants.ts`:
```typescript
{
  id: "job-001",
  company: "Your Company",
  job_source: "https://your-company.com/careers",
  // ...
}
```

### Modify Animations
Edit `index.css`:
```css
@keyframes float-slow {
  /* Change timing, movement, rotation */
}
```

### Adjust Tailwind Colors
Edit component classes:
```tsx
// Change from blue to purple
className="bg-blue-600 hover:bg-blue-700"
// To:
className="bg-purple-600 hover:bg-purple-700"
```

---

## 🔧 Troubleshooting

### Port 3000 Already In Use
```bash
# Kill process on port 3000
# Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Then restart:
npm run dev
```

### Module Not Found Errors
```bash
# Clear and reinstall
rm -r node_modules package-lock.json
npm install
npm run dev
```

### Gemini API Not Working
```bash
# Check .env.local has API key
# Check API key is valid
# Check rate limits not exceeded
# App falls back to local jobs automatically
```

### File Upload Not Working
```bash
# Check file size < 10MB
# Check file type is .pdf, .doc, .docx, or .txt
# Check browser console (F12) for errors
```

---

## 📊 Project Structure Quick Reference

| File | Purpose |
|------|---------|
| `App.tsx` | Main app with all routes |
| `index.css` | Animations & global styles |
| `types.ts` | TypeScript interfaces |
| `constants.ts` | Job data |
| `components/` | Reusable UI components |
| `services/` | API & business logic |

---

## 🚀 Deployment

### Quick Vercel Deploy
```bash
npm run build
# Commit to GitHub
# Connect repo to Vercel
# Done! Auto-deploys on push
```

---

## 💡 Pro Tips

1. **Resume Content Matters**
   - More specific skills = Better matches
   - Include: years of experience, technologies, achievements

2. **Profile Completeness**
   - Fill ALL fields for better matching
   - Update regularly for fresh matches

3. **Auto-Apply Benefits**
   - Pre-filled data saves time
   - Still need to complete company form

4. **Filtering Tips**
   - Start with 50% match
   - Lower to see more options
   - Use job type filters to narrow down

5. **API Key Safety**
   - Never commit `.env.local` to git
   - Use `.gitignore` (included)
   - Create key with API restrictions

---

## 📞 Support

### Check Logs
```bash
# Dev server logs show Vite errors
# Browser console (F12) shows client errors
# Network tab shows API calls
```

### Common Questions

**Q: Can I use without Gemini API?**  
A: Yes! App has fallback to local job database.

**Q: How is my data stored?**  
A: Only in browser memory (not persisted).

**Q: Can I export matched jobs?**  
A: Currently visible in dashboard. Future: CSV export.

**Q: How many jobs are available?**  
A: ~50+ verified jobs in local database.

---

## 🎓 Next Steps

1. ✅ App is running
2. ✅ Create test account
3. ✅ Build profile
4. ✅ Search jobs
5. → Explore filtering
6. → Try auto-apply
7. → Download n8n workflow
8. → Get Workday script

---

**Version**: 1.0.0  
**Last Updated**: December 18, 2025  
**Status**: ✅ Ready to Use
