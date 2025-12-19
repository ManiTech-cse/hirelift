# 🚀 Quick Start Guide - New Features Testing

## What's New in HireLift v2.1.0?

✅ **Company Logos** on job cards with direct links to careers pages
✅ **Fixed Email Delivery** - Confirmation emails now actually send
✅ **50+ Companies** in database including Google, Microsoft, TCS, Wipro, etc.

---

## 5-Minute Setup & Test

### Step 1: Start the Application (30 seconds)

```bash
cd c:\projects\hirelift
npm install  # If not already installed
npm run dev  # Start development server
```

Open browser: `http://localhost:5173`

---

### Step 2: Create/Update Your Profile (1 minute)

1. Enter your details in the Profile section
2. **Important**: Use a valid email address (you'll receive test emails)
3. Add some skills like: React, TypeScript, Python
4. Click "Save Profile"

---

### Step 3: Search for Jobs (1 minute)

1. Click **"Search Live Jobs"** button
2. Enter search criteria:
   - Title: "Developer" or "Engineer"
   - Location: "Remote" or any city
   - Skills: (optional)
3. Click **"Search"** or **"Search Live Jobs"**

---

### Step 4: Test Company Logos (1 minute)

When job cards appear:

1. **Look for company logos** in top-right corner of each card
2. **Examples to look for**:
   - Google (G logo)
   - Microsoft (M logo)
   - Amazon (A logo)
   - TCS, Wipro, Cognizant, etc.

3. **If logo doesn't load**:
   - Check browser console (F12 → Console tab)
   - Company may not be in database yet

---

### Step 5: Test Careers Links (1 minute)

For each job card:

1. **Look for "Careers" button** below company logo
2. **Click the Careers link**
3. **Expected**: Opens company's official careers page in new tab
4. Examples:
   - Google → https://careers.google.com/
   - Microsoft → https://careers.microsoft.com/
   - TCS → https://www.tcs.com/careers

---

### Step 6: Test Email Delivery (2 minutes)

1. Find a job card you like
2. Click **"Apply Now"** button
3. **Immediate feedback**:
   - Desktop notification appears ✅
   - Console shows: "✅ Email sent successfully via EmailJS"
4. **Check your inbox**:
   - Look for email with subject starting with "✅ Application Confirmed:"
   - From: HireLift Team
   - Should arrive within 1-2 seconds

5. **If email not in inbox**:
   - Check **Spam/Junk folder**
   - Open browser console (F12)
   - Look for error messages

---

## Verification Checklist

Print this out and check off as you test:

```
☐ Company logos appear on job cards
☐ At least 3 different company logos visible
☐ Careers link clickable and works
☐ Clicking careers link opens correct URL
☐ Desktop notification appears on apply
☐ Email received in inbox within 2 seconds
☐ Email subject line is correct
☐ No errors in browser console (F12)
☐ Mobile responsive (test on phone/tablet)
☐ Applied to at least 2 jobs successfully
```

---

## Browser Console Debug Commands

Open console: **F12 or Right-Click → Inspect → Console Tab**

### Check EmailJS Initialization
```javascript
console.log('EmailJS Status: Check messages above')
// Look for: ✅ EmailJS initialized successfully
```

### View Stored Emails
```javascript
JSON.parse(localStorage.getItem('hirelift_emails') || '[]')
```

### Check Company Database
```javascript
// Try to find a company
const companies = Object.keys(JSON.parse(localStorage.getItem('hirelift_companies') || '{}'))
console.log('Companies available:', companies.length)
```

### Clear All Emails (for re-testing)
```javascript
localStorage.removeItem('hirelift_emails')
localStorage.removeItem('hirelift_batch_emails')
localStorage.removeItem('hirelift_welcome_emails')
console.log('✅ All stored emails cleared')
```

---

## Troubleshooting

### Problem: Logos not showing on job cards

**Check 1**: Is the company in the database?
- Known companies: Google, Microsoft, Apple, Amazon, Meta, TCS, Wipro, Cognizant, Accenture, etc.
- Unknown companies: Might not have logo URL

**Fix**: Add to `services/companyDatabase.ts`:
```typescript
'CompanyName': {
  name: 'CompanyName',
  logo: 'https://company.com/logo.png',
  careersUrl: 'https://company.com/careers',
  category: 'startup'
}
```

---

### Problem: Email not arriving

**Check 1**: Is your email correct in profile?
```javascript
// In console:
JSON.parse(localStorage.getItem('hirelift_profile') || '{}').email
```

**Check 2**: Is EmailJS initialized?
```javascript
// Look for this message in console:
// ✅ EmailJS initialized successfully
```

**Check 3**: Check storage backup
```javascript
// Email should be stored locally even if send fails:
JSON.parse(localStorage.getItem('hirelift_emails') || '[]')
```

**Fix**: Verify EmailJS credentials in `services/emailService.ts`:
```typescript
const EMAILJS_SERVICE_ID = 'service_9o12nss';
const EMAILJS_TEMPLATE_ID = '__ejs-test-mail-service__';
const EMAILJS_PUBLIC_KEY = 'u8JU-tyBlwhXi_2Jo';
```

---

### Problem: Careers link opens wrong page

**Fix**: Update company careers URL in `services/companyDatabase.ts`

Find the company and update:
```typescript
'CompanyName': {
  // ... other fields ...
  careersUrl: 'https://correct-careers-url.com/jobs'
}
```

---

### Problem: Console shows errors

**Common Error**: "Module not found: @emailjs/browser"
**Fix**: Install npm package
```bash
npm install @emailjs/browser
```

**Common Error**: "Cannot read property 'send' of undefined"
**Fix**: Make sure EmailJS is initialized
- Check `services/emailService.ts` has init() call
- Verify public key is correct

---

## Manual Testing Scenarios

### Scenario 1: Single Job Application
```
1. Open app → Search jobs → Find Google Frontend Developer role
2. Click "Apply Now"
3. Expected: 
   - Desktop notification
   - Email in inbox with job details
   - Status in console shows success
```

### Scenario 2: Multiple Jobs
```
1. Find 3-5 interesting job cards
2. Click "Apply Now" on each (one at a time)
3. Expected:
   - Each sends individual confirmation email
   - All visible in inbox
   - Auto-apply progress shows status
```

### Scenario 3: Different Companies
```
1. Apply for jobs from different companies (Google, TCS, Stripe, etc.)
2. Each card should show company logo
3. Clicking careers link should open correct URL
4. Emails should have correct company name
```

---

## Performance Notes

- ✅ Logo loading doesn't block card rendering
- ✅ Email sending happens in background
- ✅ UI stays responsive during operations
- ✅ All operations logged for monitoring
- ✅ Fallback UI if anything fails

---

## Success Criteria

You'll know everything is working when:

1. ✅ Every job card displays company logo or placeholder
2. ✅ "Careers" link appears below logo
3. ✅ Clicking careers link opens new tab with company site
4. ✅ Desktop notification appears on "Apply Now"
5. ✅ Email arrives in inbox within 1-2 seconds
6. ✅ Email contains correct job and company details
7. ✅ No error messages in browser console
8. ✅ Everything works on mobile too

---

## Feature Comparison

| Feature | Before | After | Status |
|---------|--------|-------|--------|
| Company Logo | ❌ No | ✅ Yes | ✨ NEW |
| Careers Link | ❌ No | ✅ Yes | ✨ NEW |
| Email Delivery | ❌ Broken | ✅ Fixed | ✅ WORKING |
| Companies Supported | ~5 | 50+ | 📈 EXPANDED |
| Error Messages | Generic | Detailed | 🔧 IMPROVED |

---

## Next Steps After Testing

1. **If everything works**:
   - 🎉 Great! Features are ready for production
   - Create final pull request
   - Deploy to production

2. **If issues found**:
   - 📝 Note the exact error
   - Check browser console for details
   - Reference troubleshooting section above
   - Open console errors in editor for fixes

3. **If logos missing for specific companies**:
   - Add company to `services/companyDatabase.ts`
   - Submit company with logo URL and careers page
   - Rebuild and test

4. **If emails still not arriving**:
   - Verify all 3 EmailJS credentials
   - Check email is valid and not blocked
   - Verify EmailJS account is active
   - Check template variables match

---

## Support References

📖 **Documentation**:
- `UPDATES_GUIDE.md` - Detailed feature guide
- `BEFORE_AFTER_COMPARISON.md` - Visual changes
- `IMPLEMENTATION_SUMMARY.md` - Technical details

🔧 **File Locations**:
- Company Database: `services/companyDatabase.ts`
- Email Service: `services/emailService.ts`
- Job Cards: `components/JobCard.tsx`

---

## Quick Links

- GitHub Repository: [Your GitHub URL]
- Email Test: Apply to any job and check inbox
- Logo Test: Search jobs and look for company logos
- Console Debug: Press F12 and check console tab

---

**Status**: ✅ Ready to Test
**Last Updated**: December 19, 2025
**Test Duration**: ~5 minutes
**Expected Outcome**: All features working ✨

🎉 **Enjoy the improved HireLift experience!**
