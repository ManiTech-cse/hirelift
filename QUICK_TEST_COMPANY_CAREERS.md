# ✅ QUICK TEST GUIDE - Company Career Page Integration

## 🚀 How to Test

### 1. Start the Development Server
```powershell
cd c:\projects\hirelift
npm run dev
```

### 2. Open Your Browser
Navigate to: `http://localhost:3000/`

### 3. Test the "Search Live Jobs" Button

#### Landing Page Test:
1. ✅ You should see 25 demo jobs on the landing page (from your daily rotation system)
2. ✅ These are the existing jobs with company logos (Google, Amazon, Microsoft, etc.)

#### Search Live Jobs Test:
1. **Click the "Search Live Jobs" button** (if you added one in the Resume Builder page)
2. **What Should Happen:**
   - Loading spinner appears
   - Console log: `🏢 Fetching GENUINE jobs from company career pages...`
   - System fetches jobs from 5 company APIs in parallel
   - Success toast: `✅ Found X genuine jobs from official career pages!`
   - Job cards update with real jobs from:
     - Amazon Careers
     - Netflix Careers  
     - Spotify Careers
     - Airbnb Careers
     - Uber Careers

#### Search with Query Test:
1. **Type a search query** (e.g., "Software Engineer", "Product Manager", "Designer")
2. **Click "Search Live Jobs"**
3. **What Should Happen:**
   - Console log: `🔍 Searching company career pages for: "Software Engineer"`
   - Filters results based on your query
   - Shows matching jobs only
   - Toast: `✅ Found X matching jobs from career pages!`

---

## 🎯 Expected Results

### Job Cards Should Show:
- ✅ **Company Logo** (Amazon, Netflix, Spotify, Airbnb, Uber)
- ✅ **Job Title** (Real job titles from company APIs)
- ✅ **Location** (Actual job locations)
- ✅ **Work Mode** (Remote, Hybrid, On-site)
- ✅ **Salary** (If provided by company)
- ✅ **Skills** (Real required skills)
- ✅ **Source Badge** ("Amazon Careers", "Netflix Careers", etc.)
- ✅ **Apply Button** (Links to official company career page)

### Click "Apply Now":
- Opens the official company career page in a new tab/iframe
- Example URLs:
  - `https://www.amazon.jobs/en/jobs/...`
  - `https://jobs.lever.co/netflix/...`
  - `https://jobs.lever.co/spotify/...`
  - `https://boards.greenhouse.io/airbnb/jobs/...`
  - `https://boards.greenhouse.io/uber/jobs/...`

---

## 🐛 Troubleshooting

### If No Jobs Show:
1. **Check Console** (F12 → Console tab)
2. **Look for errors:**
   - ❌ CORS errors → API blocked by browser (rare for these APIs)
   - ❌ Network errors → Check internet connection
   - ❌ API rate limits → Wait a few minutes and try again

### If You See "Failed to fetch jobs":
```javascript
// Check console for:
console.error('❌ Company career page fetch error:', error);
```

**Common Fixes:**
- Refresh the page
- Check internet connection
- Try searching with a query (e.g., "Engineer")
- Wait 30 seconds and try again (some APIs have rate limits)

### If APIs are Blocked:
Some company APIs may have CORS restrictions. If that happens:

**Option 1: Use a CORS proxy** (for development)
```typescript
const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
const response = await fetch(proxyUrl + apiUrl);
```

**Option 2: Use your existing fallback**
```typescript
// If company APIs fail, fall back to RemoteOK/Arbeitnow
const careerJobs = await fetchCompanyCareerJobs();
if (careerJobs.length === 0) {
  // Fallback to existing system
  const fallbackJobs = await fetchRealJobs();
  setDailyAIJobs(fallbackJobs);
}
```

---

## 📊 Console Output Examples

### Successful Fetch:
```
🏢 Fetching GENUINE jobs from company career pages...
📦 Fetching from Amazon Jobs API (Official)...
✅ Amazon: 30 jobs fetched
🔧 Fetching from Netflix via Lever API...
✅ Netflix: 20 jobs fetched via Lever
🔧 Fetching from Spotify via Lever API...
✅ Spotify: 20 jobs fetched via Lever
🌱 Fetching from Airbnb via Greenhouse API...
✅ Airbnb: 25 jobs fetched via Greenhouse
🌱 Fetching from Uber via Greenhouse API...
✅ Uber: 25 jobs fetched via Greenhouse
✅ Successfully fetched 120 GENUINE jobs from company career pages!
   📊 Amazon: 30 | Netflix: 20 | Spotify: 20
   📊 Airbnb: 25 | Uber: 25
```

### Search Query:
```
🔍 Searching company career pages for: "Software Engineer"
✅ Found 45 matching jobs from career pages!
```

---

## ✨ Success Indicators

### ✅ Working Correctly If:
1. Job cards show real company names (Amazon, Netflix, Spotify, etc.)
2. Job titles are genuine (not demo data)
3. Locations are real cities/states
4. Apply URLs go to official career pages
5. Source badges show "Amazon Careers", "Netflix Careers", etc.
6. Toast messages show "genuine jobs from official career pages"

### ❌ Not Working If:
1. Still showing demo jobs after clicking "Search Live Jobs"
2. Error messages in console
3. No jobs returned (0 jobs found)
4. Apply URLs are broken or incorrect

---

## 🎯 Quick Verification

### To verify it's using the NEW system:

**Check the toast message:**
- ✅ **NEW:** "Found X genuine jobs from official career pages!"
- ❌ **OLD:** "Found X real jobs from RemoteOK, Arbeitnow..."

**Check the source badge on job cards:**
- ✅ **NEW:** "Amazon Careers", "Netflix Careers", "Spotify Careers"
- ❌ **OLD:** "RemoteOK", "Arbeitnow", "Findwork"

**Check console logs:**
- ✅ **NEW:** `🏢 Fetching GENUINE jobs from company career pages...`
- ❌ **OLD:** `🔍 Fetching REAL jobs from multiple sources...`

---

## 🔧 Manual API Testing (Optional)

### Test APIs directly in browser console:

```javascript
// Test Amazon API
fetch('https://www.amazon.jobs/en/search.json?offset=0&result_limit=10')
  .then(r => r.json())
  .then(d => console.log('Amazon Jobs:', d));

// Test Lever API (Netflix)
fetch('https://api.lever.co/v0/postings/netflix?mode=json&limit=5')
  .then(r => r.json())
  .then(d => console.log('Netflix Jobs:', d));

// Test Greenhouse API (Airbnb)
fetch('https://boards-api.greenhouse.io/v1/boards/airbnb/jobs?content=true')
  .then(r => r.json())
  .then(d => console.log('Airbnb Jobs:', d));
```

---

## 📝 Summary

**Everything is ready!** Just:
1. Start dev server: `npm run dev`
2. Open browser: `http://localhost:3000/`
3. Click "Search Live Jobs"
4. See genuine jobs from Amazon, Netflix, Spotify, Airbnb, Uber! 🎉

**If any issues occur, check the troubleshooting section above.** ✅
