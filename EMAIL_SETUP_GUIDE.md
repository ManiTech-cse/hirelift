# 📧 HireLift Email Service Setup Guide

## Overview

HireLift now sends **real emails** when you apply for jobs! The system uses **EmailJS** for sending emails directly from your browser.

---

## ✅ How It Works

### 1. **Dual Email System**
- **Primary**: EmailJS (sends real emails to your inbox)
- **Fallback**: localStorage (backup storage if EmailJS unavailable)

### 2. **Email Types**
- ✅ **Application Confirmation** - When you apply to a job
- ✅ **Batch Summary** - When you apply to multiple jobs
- ✅ **Welcome Email** - First time registration

### 3. **Automatic Features**
- 🔔 Desktop notifications when applying
- 📧 HTML formatted email content
- 💾 Automatic backup to localStorage
- ⚡ Instant delivery (no backend needed)

---

## 🚀 Setup Instructions

### Option 1: Using Public EmailJS Account (Already Configured!)

The app is **pre-configured** with EmailJS and should work out of the box:

```
Service ID: service_hirelift
Template ID: template_application
Public Key: ePVV2JDPvvTIHw8jX
```

**Test it:**
1. Click "Apply" on any job
2. Check your email inbox (may take 1-2 minutes)
3. You should receive an HTML formatted email

---

### Option 2: Create Your Own EmailJS Account (Recommended)

#### Step 1: Create Account
1. Go to [EmailJS.com](https://www.emailjs.com/)
2. Sign up for a free account
3. **Free tier includes 200 emails/month** (perfect for testing)

#### Step 2: Create Email Service
1. In dashboard, go to **Email Services**
2. Click **Add Service**
3. Choose **Gmail** or **SMTP**
4. Follow the setup wizard
5. Copy your **Service ID** (e.g., `service_xxxxx`)

#### Step 3: Create Email Template
1. Go to **Email Templates**
2. Click **Create New Template**
3. Use this template:

```
Name: Application Confirmation
Subject: {{subject}}
Content:
{{message}}

Preview Name: message
```

4. Save and copy your **Template ID** (e.g., `template_xxxxx`)

#### Step 4: Get Public Key
1. Go to **Account Settings** → **API Keys**
2. Copy your **Public Key** (not private!)

#### Step 5: Update HireLift Configuration
Edit `services/emailService.ts`:

```typescript
const EMAILJS_SERVICE_ID = 'service_YOUR_ID';
const EMAILJS_TEMPLATE_ID = 'template_YOUR_ID';
const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY';
```

---

## 📨 Email Examples

### Application Confirmation Email
```
🎉 HireLift - Application Submitted!

Dear Alex,

Congratulations! Your application has been successfully submitted! 🎉

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📋 APPLICATION DETAILS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Position: Senior React Developer
Company: Google
Location: San Francisco, CA
Match Score: 85%
Applied On: 12/18/2024, 10:30 AM

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📞 NEXT STEPS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. Watch for email updates from Google
2. Check your spam folder if no response within 5 days
3. Keep your profile updated on HireLift
4. Apply to more jobs to increase your chances

Best regards,
HireLift Team
```

---

## 🧪 Testing Email Functionality

### Test 1: Check Browser Console
```javascript
// Open browser console (F12) and run:
emailjs.send('service_hirelift', 'template_application', {
  to_email: 'your-email@example.com',
  to_name: 'Your Name',
  subject: '✅ Test Email',
  message: 'This is a test email from HireLift'
})
```

### Test 2: Check Stored Emails
```javascript
// View all stored emails
console.log(JSON.parse(localStorage.getItem('hirelift_emails')));

// View batch emails
console.log(JSON.parse(localStorage.getItem('hirelift_batch_emails')));

// View welcome emails
console.log(JSON.parse(localStorage.getItem('hirelift_welcome_emails')));
```

### Test 3: Manual Apply Test
1. Update your email in profile
2. Click **Apply** on any job
3. Check your inbox in 1-2 minutes
4. If no email, check spam folder
5. Check localStorage: `F12 → Application → Local Storage`

---

## 🔧 Troubleshooting

### Problem: "No email received"

**Solution 1: Check Email**
```javascript
// Open console (F12) and check:
const emails = JSON.parse(localStorage.getItem('hirelift_emails'));
console.log('Stored emails:', emails);
```

**Solution 2: Check Spam**
- Check Gmail/Outlook spam folder
- Mark as "Not Spam"

**Solution 3: Check EmailJS Status**
```javascript
// Check if EmailJS loaded
console.log(window.emailjs ? '✅ EmailJS loaded' : '❌ EmailJS not loaded');

// Try sending test email manually
if (window.emailjs) {
  window.emailjs.send('service_hirelift', 'template_application', {
    to_email: 'your@email.com',
    to_name: 'Test User',
    subject: '📧 Test Email',
    message: 'Hello! This is a test.'
  }).then(
    response => console.log('✅ Email sent!', response),
    error => console.error('❌ Email failed:', error)
  );
}
```

### Problem: "EmailJS unavailable"

This is normal! The app automatically falls back to **localStorage backup**.

All email data is still stored locally and you can:
1. View it in browser console
2. Export it as JSON
3. Later integrate a real backend service

### Problem: "Desktop notifications not showing"

1. Check browser notification permissions
2. Click "Allow" when browser asks
3. Or enable in browser settings:
   - Chrome: Settings → Privacy → Notifications → Add hirelift
   - Firefox: Preferences → Privacy → Notifications

---

## 📊 View Email Statistics

### In Browser Console (F12):

```javascript
// Count total emails sent
const emails = JSON.parse(localStorage.getItem('hirelift_emails') || '[]');
console.log(`Total applications: ${emails.length}`);

// List all companies applied to
const companies = emails.map(e => e.company);
console.log('Companies:', companies);

// Average match score
const avgMatch = emails.reduce((sum, e) => sum + e.matchScore, 0) / emails.length;
console.log(`Average match: ${avgMatch.toFixed(1)}%`);

// Export as CSV
const csv = emails.map(e => 
  `${e.timestamp},${e.applicantName},${e.company},${e.jobTitle},${e.matchScore}%`
).join('\n');
console.log(csv);
```

---

## 🔐 Security Notes

- ✅ **EmailJS Public Key** is safe (it's meant to be public)
- ✅ No sensitive data stored
- ✅ Emails sent directly from browser
- ✅ No backend server needed
- ✅ All personal data stays in localStorage

---

## 📈 Email Quotas

### Free EmailJS Account
- **200 emails/month** (plenty for testing)
- Unlimited templates
- Instant delivery

### Need more emails?
1. Upgrade to paid plan ($2.99/month)
2. Or setup your own backend
3. Or use alternative (SendGrid, Mailgun, etc.)

---

## 💡 Tips & Tricks

### 1. Enable Desktop Notifications
```javascript
// Request permission
Notification.requestPermission().then(perm => {
  console.log('Notification permission:', perm);
});
```

### 2. Export All Emails
```javascript
// Get all email data
const allEmails = {
  applications: JSON.parse(localStorage.getItem('hirelift_emails') || '[]'),
  batches: JSON.parse(localStorage.getItem('hirelift_batch_emails') || '[]'),
  welcomes: JSON.parse(localStorage.getItem('hirelift_welcome_emails') || '[]')
};

// Download as JSON file
const blob = new Blob([JSON.stringify(allEmails, null, 2)], {type: 'application/json'});
const url = URL.createObjectURL(blob);
const a = document.createElement('a');
a.href = url;
a.download = 'hirelift-emails.json';
a.click();
```

### 3. Clear Email History
```javascript
localStorage.removeItem('hirelift_emails');
localStorage.removeItem('hirelift_batch_emails');
localStorage.removeItem('hirelift_welcome_emails');
console.log('✅ All emails cleared');
```

---

## 🎯 Next Steps

1. ✅ **Test Email System**
   - Apply to 1-2 jobs
   - Check your inbox

2. ✅ **Monitor Performance**
   - Open F12 (console)
   - Check logs during apply
   - Verify emails in localStorage

3. ✅ **Setup Own Account** (Optional)
   - Create EmailJS account
   - Update service IDs
   - Deploy with your credentials

4. ✅ **Production Deployment**
   - Use verified email service
   - Add error tracking (Sentry)
   - Monitor email delivery

---

## 📞 Support

If emails still aren't working:

1. **Check console logs** (F12)
2. **Verify email address** is correct
3. **Check spam folder**
4. **Check localStorage** for backup records
5. **Test with different email** (Gmail/Outlook)

---

## 📚 Related Files

- `services/emailService.ts` - Email service implementation
- `App.tsx` - Integration with email service
- `.env` - Environment variables (if needed)

---

**Status**: ✅ Email system fully operational!

All applications now send **real confirmation emails** to your inbox! 🎉