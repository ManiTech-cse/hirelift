# EmailJS HTML Email Template Fix

## Problem
Emails are being sent as raw HTML code instead of being rendered properly.

## Solution
Your EmailJS template needs to be configured to handle HTML content correctly.

### Step 1: Update Your EmailJS Template

1. Go to **[EmailJS Dashboard](https://dashboard.emailjs.com/)**
2. Navigate to **Email Templates** → **template_aip2x14**
3. Replace the template content with the following:

```
Subject: {{subject}}

From: {{from_name}} <{{from_email}}>
To: {{to_email}}

---HTML STARTS---
{{html_message}}
---HTML ENDS---

---TEXT VERSION---
{{message}}
---TEXT ENDS---
```

### Step 2: Configure HTML Support

1. In the same template editor:
   - Look for **"MIME Type"** or **"Content Type"** setting
   - Set it to **`text/html; charset=UTF-8`**
   - Or add **`MIME: multipart/alternative`** to support both HTML and text

### Step 3: Update Template Variables

Make sure your template has these variables:
- `{{html_message}}` - For HTML version
- `{{message}}` - For plain text fallback
- `{{subject}}` - Email subject
- `{{to_email}}` - Recipient email
- `{{to_name}}` - Recipient name
- `{{job_title}}` - Job title
- `{{company}}` - Company name
- `{{match_score}}` - Match percentage
- `{{from_name}}` - From name (HireLift Team)
- `{{from_email}}` - From email (noreply@hirelift.app)

### Step 4: Verify Settings

In EmailJS dashboard, go to **Account** → **Email Configuration** and ensure:
- ✅ HTML emails are enabled
- ✅ SMTP provider is correctly configured
- ✅ Email headers support `Content-Type: text/html`

### Step 5: Test the Email

Run the application and apply to a job. The email should now render as:
```
🎉 APPLICATION SUBMITTED!
[Professional formatted email with colors, timeline, etc.]
```

Instead of:
```
<!DOCTYPE html>
<html lang="en">
<head>
...
(raw HTML code)
```

## Alternative: Create a New Template

If the above doesn't work, create a new template:

1. Click **"Create New Template"**
2. Name: `application-confirmation-html`
3. Set **SMTP:** to your email provider
4. Set **Content Type:** to `text/html`
5. Use the template variables listed in Step 3
6. Update `EMAILJS_TEMPLATE_ID` in `emailService.ts`:

```typescript
const EMAILJS_TEMPLATE_ID = 'template_xxxxx'; // Your new template ID
```

## Troubleshooting

### Email still shows as raw HTML?
- Check if your email provider (Gmail, Outlook, etc.) is blocking HTML
- Try sending a test from EmailJS dashboard directly
- Verify MIME type in template settings

### Variables not replacing?
- Make sure variable names match exactly: `{{variable_name}}`
- Check for typos in template setup
- Test with EmailJS test feature first

### Email not received?
- Check spam/junk folder
- Verify email address is correct
- Check EmailJS logs for errors
- Ensure domain is whitelisted (if using custom domain)

## Code Status

✅ **Services Updated:**
- `emailService.ts` - Now sends both HTML and text versions
- HTML content properly formatted
- Text fallback included

✅ **Ready to Test:**
```bash
npm run dev
# Apply to a job and check email inbox
```

## Next Steps

1. Update EmailJS template as described above
2. Restart development server: `npm run dev`
3. Test by applying to a job
4. Email should now render beautifully!

---

**Need Help?**
- EmailJS Docs: https://www.emailjs.com/docs/
- Email Template Guide: https://www.emailjs.com/docs/service/gmail/
- HTML Email Best Practices: https://www.campaignmonitor.com/guides/
