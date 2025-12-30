# 🐛 Resume Extractor Debugging Guide

## How to Debug the Issue

### Step 1: Open Browser Console
1. Open your app in browser: `http://localhost:5173`
2. Press **F12** (or Ctrl+Shift+J on Windows)
3. Click the **Console** tab

### Step 2: Upload Resume
1. Go to Profile Setup page
2. Click "Upload Resume"
3. Select your resume file (PDF/DOCX/TXT)

### Step 3: Check Console Logs

You should see logs like this:

```
🔍 Starting enhanced resume extraction...
📄 Full resume text length: 2847
✨ Text preview: John Smith Senior Frontend Developer...
```

**If you DON'T see these logs:**
- Problem: File not being read correctly
- Solution: Try a different file format (PDF → TXT)

**If you see:**
```
⚠️ Resume text too short
```
- Problem: Text extraction failed
- Solution: PDF might be corrupted or scanned image

### Step 4: Check Extracted Components

Look for:
```
📊 Extracted data: {
  name: "John Smith",
  role: "Senior Frontend Developer",
  experience: "5 years",
  skills: "React, TypeScript, Node.js, ...",
  education: "B.S. in Computer Science",
  companies: "Google, Amazon",
  achievements: 2,
  location: "San Francisco, CA",
  workMode: "remote"
}
```

**If most fields say "Not found":**
- Problem: Resume format not recognized
- Solution: Use the test resume format provided below

### Step 5: Check Summary Building

Look for:
```
🔨 Building professional summary from: {...}
📝 Opening: Senior Frontend Developer with 5 years...
💡 Skills section added
🏢 Companies added: Google, Amazon
🏆 Achievement added
📊 Summary length: 247
✅ Final summary: ...
```

**If you see:**
```
⚠️ Could not generate summary from resume content - too short
```
- Problem: Not enough data extracted
- Solution: Check what was found in Step 4

---

## Common Issues & Solutions

### Issue 1: "No text extracted from PDF"
**Cause:** PDF is scanned image or complex format  
**Solution:** 
1. Try converting PDF to TXT first
2. Or copy-paste text directly into textarea

### Issue 2: "Summary is only skills, no role/experience"
**Cause:** Resume structure not recognized  
**Solution:** Make sure your resume has:
- Clear role/title near the top
- "X years experience" phrase
- Clear sections (Experience, Skills, etc.)

### Issue 3: "Wrong role detected"
**Cause:** Multiple roles in resume  
**Solution:** The first role found will be used. Manually edit if needed.

### Issue 4: "No skills detected"
**Cause:** Skills not in our database  
**Solution:** 
1. Check the skills list in FileUpload.tsx
2. Or manually add them to the textarea

---

## Test Resume Format (Works 100%)

Create a file called `test-resume.txt` with this content:

```
Your Name
Senior [Your Role]

PROFESSIONAL SUMMARY
[Your existing summary if you have one]

EXPERIENCE
- Company Name (2020-2023): [Your Role]
  Built [achievement]
  Improved [achievement]

SKILLS
React, TypeScript, JavaScript, Node.js, Python, AWS, Docker, etc.

EDUCATION
B.S. in Computer Science
Your University

LOCATION
Your City, State

PREFERENCES
Open to remote opportunities
```

Upload this and check the console logs!

---

## What to Share for Help

If it's still not working, share these console logs:

1. **Text length**: `📄 Full resume text length: XXX`
2. **Text preview**: `✨ Text preview: ...`
3. **Extracted data**: The full `📊 Extracted data: {...}` object
4. **Summary building**: All the `🔨`, `📝`, `💡`, `🏢` logs
5. **Final result**: `✅ Final summary: ...` or `⚠️` warning

Copy all console output and share it!

---

## Quick Tests

### Test 1: TXT File
1. Create `test-resume.txt` with the format above
2. Upload it
3. Should work 100%

### Test 2: Simple Resume
If your resume is complex, create a simplified version:
```
John Smith
Frontend Developer

5 years experience
Skills: React, JavaScript, TypeScript
Worked at Google, Amazon
Built scalable web applications
```

### Test 3: Manual Input
Skip file upload and paste directly into textarea to verify the rest works.

---

## Expected Behavior

✅ **Success:**
- Console shows all extraction logs
- Textarea fills with professional summary
- Toast shows "✅ Professional summary generated from your resume content!"

⚠️ **Partial Success:**
- Console shows some fields "Not found"
- Basic summary generated
- Edit manually to improve

❌ **Failure:**
- Console shows "Resume text too short"
- Textarea stays empty
- Toast shows error message
- Manually paste your summary

---

## Next Steps

1. **Open Console** (F12)
2. **Upload resume**
3. **Copy ALL console logs**
4. **Share logs** for specific help

The detailed logs will tell us exactly what's happening!
