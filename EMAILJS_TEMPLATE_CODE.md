# EmailJS Template - Copy & Paste Ready

## Your Template ID
- **Template ID:** `template_aip2x14`
- **Service ID:** `service_myacclb`

## What to Do

1. Go to: https://dashboard.emailjs.com/
2. Click: "Email Templates"
3. Click: "template_aip2x14"
4. **DELETE** everything in the template
5. **PASTE** the content below
6. Click **SAVE**

---

## Template Content (Copy This)

```
{{subject}}

{{html_message}}
```

That's it! This simple template will:
- Use the subject from parameters
- Render the HTML message properly
- Automatically handle `{{message}}` as fallback

---

## SETTINGS to Check

After pasting the template content, look for these settings:

### Setting 1: Content-Type or MIME-Type
- **Name:** "Content-Type" or "MIME-Type" or "Email Type"
- **Should be:** `text/html; charset=UTF-8`
- If you can't find it, leave blank (many templates auto-detect)

### Setting 2: Email Format
- Look for option to set format to "HTML"
- Or "MIME Type" = "text/html"
- This tells EmailJS to render the HTML

### Setting 3: Variables
Make sure these variables are listed as available:
- `{{subject}}`
- `{{html_message}}`
- `{{message}}`
- `{{to_email}}`
- `{{to_name}}`
- `{{job_title}}`
- `{{company}}`
- `{{location}}`
- `{{match_score}}`
- `{{from_name}}`
- `{{from_email}}`

---

## Alternative: Detailed Template

If the simple version doesn't work, use this more detailed version:

```
Subject: {{subject}}
From: {{from_name}} <{{from_email}}>
To: {{to_email}}

{{html_message}}

---Text Version Fallback---
{{message}}
```

---

## Alternative: Multi-Part Email

For maximum compatibility, use this:

```
MIME-Version: 1.0
Content-Type: multipart/alternative; boundary="__BOUNDARY__"

--__BOUNDARY__
Content-Type: text/plain; charset=UTF-8

{{message}}

--__BOUNDARY__
Content-Type: text/html; charset=UTF-8

{{html_message}}

--__BOUNDARY__--
```

---

## Testing After Setup

### Test in EmailJS Dashboard:

1. Click your template name
2. Look for "Test Send" or "Send Test Email" button
3. Fill in test parameters:

```
subject: ✅ Application Confirmed: Frontend Developer at Test Company
html_message: <p>This is a test HTML email</p>
message: This is a test plain text email
to_email: your-email@gmail.com
to_name: Your Name
job_title: Test Frontend Developer
company: Test Company
location: San Francisco, CA
match_score: 95
from_name: HireLift Team
from_email: noreply@hirelift.app
```

4. Click Send
5. Check your email inbox
6. Should see formatted email (not raw HTML)

---

## Troubleshooting

### Email Shows Raw HTML Code Still?

**Solution 1:** Change MIME Type
- Find the MIME type setting in template
- Change to `text/html`
- Save
- Test again

**Solution 2:** Check Variable Name
- Make sure you're using: `{{html_message}}`
- Not: `{{message}}`
- Not: `{{html}}`
- Exact match is important!

**Solution 3:** Create New Template
If editing the old one doesn't work:
1. Click "Create New Template"
2. Name it: "application-confirmation"
3. Paste this content:
   ```
   {{subject}}
   
   {{html_message}}
   ```
4. Save
5. Copy the new template ID
6. Update in `emailService.ts`:
   ```typescript
   const EMAILJS_TEMPLATE_ID = 'template_your_new_id';
   ```
7. Restart: `npm run dev`

**Solution 4:** Different Email Provider
- Some email providers don't support HTML well
- Test with Gmail first (always works)
- If using corporate email, it might block HTML

---

## Quick Checklist

```
✅ Go to EmailJS dashboard (https://dashboard.emailjs.com/)
✅ Find template "template_aip2x14"
✅ Clear existing content
✅ Paste: {{subject}}
          {{html_message}}
✅ Set Content-Type to: text/html; charset=UTF-8
✅ Click SAVE
✅ Test with "Send Test Email"
✅ Check email inbox
✅ Should see beautiful formatted email
✅ Restart dev server: npm run dev
✅ Test in HireLift app
✅ Apply to job
✅ Check email - should be perfect!
```

---

## What Each Parameter Does

| Parameter | Example | Used For |
|-----------|---------|----------|
| `{{subject}}` | ✅ Application Confirmed: Frontend Developer at Google | Email subject line |
| `{{html_message}}` | `<html>...</html>` | Beautiful formatted email body |
| `{{message}}` | Plain text version... | Fallback if HTML fails |
| `{{to_email}}` | alex.doe@example.com | Recipient email address |
| `{{to_name}}` | Alex Doe | Recipient name in greeting |
| `{{job_title}}` | Frontend Developer | Job position title |
| `{{company}}` | Google | Company name |
| `{{location}}` | San Francisco, CA | Job location |
| `{{match_score}}` | 95 | Match percentage |
| `{{from_name}}` | HireLift Team | Sender name |
| `{{from_email}}` | noreply@hirelift.app | Sender email |

---

## How the HTML is Generated

In `services/emailService.ts`, the function `generateApplicationConfirmationHTML()` creates:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <style>
    body {
      font-family: 'Segoe UI', sans-serif;
      line-height: 1.6;
      color: #333;
    }
    /* ... CSS styling ... */
  </style>
</head>
<body>
  <div class="email-container">
    <!-- Professional header with gradient -->
    <div class="header">
      <h1>🎉 Application Submitted!</h1>
      <!-- ... rest of email ... -->
    </div>
  </div>
</body>
</html>
```

This is what gets passed as `{{html_message}}` to your template.

---

## Expected Result

After everything is set up correctly, you'll get emails that look like:

```
┌─────────────────────────────────────────────────┐
│                                                 │
│              🎉 Application Submitted!          │
│          Your application has been sent         │
│                                                 │
│                 ✓ Confirmed                     │
│                                                 │
└─────────────────────────────────────────────────┘

Hi Alex,

We're excited to confirm that your application 
for Frontend Developer at Google has been 
successfully submitted! 🚀

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Job Details Card with:
  📍 Location: San Francisco, CA
  🎯 Match Score: 95%
  ⏰ Applied: December 19, 2025
  🕐 Time: 10:56 AM
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📋 What Happens Next?
  1️⃣ Application In Review
  2️⃣ Initial Screening (1-5 days)
  3️⃣ Interview Stage (if selected)
  4️⃣ Final Decision

✅ Action Items for You
  ✓ Keep an eye on your inbox
  ✓ Check spam folder
  ✓ Update your profile
  ✓ Continue applying

💡 Pro Tips...
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

**NOT** raw HTML code!

---

## Support

If you get stuck:

1. Check EMAILJS_TEMPLATE_CONFIG.md
2. Check troubleshooting section above
3. Try creating a new template
4. Check EmailJS logs for errors
5. Test with Gmail if possible

---

## Files Reference

- **This file:** EMAILJS_TEMPLATE_CODE.md
- **Setup guide:** EMAILJS_TEMPLATE_CONFIG.md
- **Troubleshooting:** EMAILJS_SETUP_FIX.md
- **Before/After:** EMAIL_BEFORE_AFTER.md
- **Code file:** c:\projects\hirelift\services\emailService.ts

---

**Ready? Go update your template!** 🚀

Go to: https://dashboard.emailjs.com/ → Email Templates → template_aip2x14
