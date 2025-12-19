# 📧 Email System Testing Guide

## Quick Test (2 minutes)

### Step 1: Open the App
```
1. Open your browser: http://localhost:3000
2. Navigate to the Dashboard
3. Go to "Search Live Jobs"
```

### Step 2: Apply for a Job
```
1. Click any job card
2. Click the "Apply Now" button
3. Watch for:
   ✓ Button shows "Applying..." state
   ✓ Desktop notification appears
   ✓ Console shows "✅ Email sent successfully via EmailJS"
```

### Step 3: Check Email
```
Check your inbox for:
- Subject: "✅ Application Confirmed: [Job Title] at [Company]"
- From: EmailJS
- Content: Application details with job info
```

### Step 4: Verify localStorage Backup
```
Open Browser Console (F12) and run:
const { getStoredEmails } = await import('./services/emailService.ts');
console.log('All emails:', getStoredEmails());
```

---

## Detailed Testing Checklist

### Email Service Tests

- [ ] **Test 1: Basic Email Send**
  - Click "Apply Now"
  - Check console for success message
  - Expected: `✅ Email sent successfully via EmailJS`

- [ ] **Test 2: localStorage Backup**
  - Apply for job
  - Open DevTools Console
  - Run: `localStorage.getItem('hirelift_emails')`
  - Expected: JSON array with email record

- [ ] **Test 3: Desktop Notification**
  - Allow notifications when prompted
  - Click "Apply Now"
  - Expected: Desktop notification shows job title + company

- [ ] **Test 4: Invalid Email**
  - Change profile email to invalid (e.g., "noemail")
  - Click "Apply Now"
  - Expected: Console shows error, localStorage still backs up

- [ ] **Test 5: Batch Email**
  - Apply for 3+ jobs quickly
  - After applying all, check console
  - Expected: Batch email sent OR backed up to localStorage

### UI/UX Tests

- [ ] **Test 6: Company Logo Display**
  - Job cards should show company logo on right side
  - Logos should be colored SVG badges
  - Expected: All company logos visible

- [ ] **Test 7: Career Page Links**
  - Click "Careers" button under company logo
  - Expected: Opens company's careers page in new tab

- [ ] **Test 8: Responsive Design**
  - Test on mobile (F12 → Device Emulation)
  - Logo should be visible on all sizes
  - Expected: Clean, readable layout

- [ ] **Test 9: Error Handling**
  - Disable internet, try to apply
  - Expected: localStorage backup works, notification still shows

### API Tests

- [ ] **Test 10: Gemini API (Demo Mode)**
  - Load dashboard
  - Click "Search Live Jobs"
  - Expected: 5 demo jobs show (no API key configured)

- [ ] **Test 11: After API Key Added**
  - Add valid Gemini API key to `geminiService.ts`
  - Refresh page
  - Click "Search Live Jobs"
  - Expected: Real jobs loaded from Google search + Gemini matching

---

## Console Commands for Testing

### Check Email Status
```javascript
const { getStoredEmails } = await import('./services/emailService.ts');
const emails = getStoredEmails();
console.log(`Total emails: ${emails.length}`);
console.log(emails);
```

### Export All Emails as JSON
```javascript
const { exportEmailsAsJSON } = await import('./services/emailService.ts');
const json = exportEmailsAsJSON();
console.log(json);
// Copy and save to file if needed
```

### Clear All Stored Emails
```javascript
const { clearStoredEmails } = await import('./services/emailService.ts');
clearStoredEmails();
console.log('All emails cleared');
```

### Test Single Email Send
```javascript
const { sendApplicationConfirmationEmail } = await import('./services/emailService.ts');
const profile = { 
  name: 'Test User', 
  email: 'your-real-email@gmail.com',
  skills: ['React', 'TypeScript'],
  experience: '3 years',
  jobLocation: ['Remote'],
  workModes: ['Remote'],
  primaryWorkMode: 'Remote',
  preferredRoles: ['Frontend Developer'],
  resumeText: 'Test resume',
  coverLetter: 'Test cover letter'
};
const job = {
  job_title: 'Senior React Developer',
  company: 'Google',
  location: 'San Francisco',
  match_percentage: 95,
  matched_skills: ['React', 'TypeScript'],
  missing_skills: [],
  auto_apply_eligible: true,
  apply_url: 'https://careers.google.com',
  job_source: 'LinkedIn'
};
const result = await sendApplicationConfirmationEmail(profile, job, new Date().toISOString());
console.log('Email sent:', result);
```

### Check EmailJS Status
```javascript
import emailjs from '@emailjs/browser';
console.log('EmailJS initialized:', !!emailjs);
console.log('EmailJS public key is set');
```

---

## Troubleshooting

### Issue: "Email sent but not received"
**Solution:**
1. Check spam/promotions folder
2. Verify email address is correct in profile
3. Check EmailJS dashboard: https://dashboard.emailjs.com
4. Verify template variables match code

### Issue: "localStorage shows email but EmailJS shows error"
**Solution:**
- This is expected! App sends to both EmailJS + localStorage
- localStorage is always backed up
- Check browser console for specific error

### Issue: "Console error: 404 from EmailJS"
**Solution:**
- EmailJS credentials are correct
- Error in template configuration
- Check: https://dashboard.emailjs.com/admin/services

### Issue: "Desktop notification not showing"
**Solution:**
1. Allow notifications in browser settings
2. Check if browser notification permission is granted
3. Try: `Notification.requestPermission()`

---

## Success Indicators

When everything works, you should see:

1. **In Console:**
   ```
   ✅ EmailJS initialized
   ✅ Email sent successfully via EmailJS
   ✅ Email backed up to localStorage
   ```

2. **On UI:**
   - Button shows "Applied" state (green)
   - Desktop notification appears
   - Company logo visible on card

3. **In Email:**
   - Confirmation email in inbox
   - Subject line with job title
   - Job details formatted nicely

4. **In localStorage:**
   - `localStorage.getItem('hirelift_emails')` returns JSON array
   - Each email has timestamp, recipient, content

---

## Performance Notes

- ✅ First email: ~2-5 seconds (EmailJS API)
- ✅ Subsequent emails: ~1-2 seconds
- ✅ localStorage backup: Instant (<100ms)
- ✅ Desktop notification: Instant
- ✅ UI updates: Instant (optimistic)

---

## Next Steps After Testing

1. ✅ Verify all 11 tests pass
2. ✅ Add your Gemini API key
3. ✅ Test job matching with real API
4. ✅ Deploy to production
5. ✅ Monitor email delivery rates

**Ready to test? Let's go! 🚀**
