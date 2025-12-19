# EmailJS Template Configuration

## Current Template ID
- **Service ID:** `service_myacclb`
- **Template ID:** `template_aip2x14`
- **Public Key:** `WL3GVivI4aLOJM3FP`

## Required Template Content

Replace your current template content with this:

```
Subject: {{subject}}

From: {{from_name}} <{{from_email}}>
To: {{to_email}}

MIME-Version: 1.0
Content-Type: text/html; charset=UTF-8

{{html_message}}

---TEXT FALLBACK---
{{message}}
```

## Required Variables

Make sure your template has these variables defined:

| Variable | Description | Example |
|----------|-------------|---------|
| `{{subject}}` | Email subject line | ✅ Application Confirmed: Frontend Developer at Google |
| `{{html_message}}` | Rich HTML email content | (HTML with colors & formatting) |
| `{{message}}` | Plain text fallback | (ASCII formatted text) |
| `{{to_email}}` | Recipient email | alex.doe@example.com |
| `{{to_name}}` | Recipient name | Alex Doe |
| `{{job_title}}` | Applied job position | Frontend Developer |
| `{{company}}` | Company name | Google |
| `{{location}}` | Job location | San Francisco, CA |
| `{{match_score}}` | Match percentage | 95 |
| `{{from_name}}` | Sender name | HireLift Team |
| `{{from_email}}` | Sender email | noreply@hirelift.app |

## Step-by-Step Setup

### 1. Login to EmailJS
Go to https://dashboard.emailjs.com/

### 2. Navigate to Templates
- Click **"Email Templates"** in left sidebar
- Find and click **"template_aip2x14"**

### 3. Update Template Content

**Delete existing content and replace with:**

```
Subject: {{subject}}

{{html_message}}
```

That's it! Simple and clean.

### 4. Set Content Type

Look for settings section and set:
- **Content-Type:** `text/html; charset=UTF-8`
- Or **MIME-Version:** `1.0`

### 5. Save Template

Click **"Save"** button

### 6. Test Send

In EmailJS dashboard:
1. Click **"Send Test Email"** or similar
2. Fill in test parameters:
   ```
   subject: ✅ Application Confirmed: Test Job at Test Company
   html_message: <p>This is a test</p>
   message: This is a test
   to_email: your-email@gmail.com
   to_name: Your Name
   job_title: Test Job
   company: Test Company
   match_score: 95
   from_name: HireLift Team
   from_email: noreply@hirelift.app
   ```
3. Send and check email

## Alternative: Multi-Part Email

For better compatibility with all email clients:

```
Content-Type: multipart/alternative; boundary="boundary123"

--boundary123
Content-Type: text/plain; charset="UTF-8"

{{message}}

--boundary123
Content-Type: text/html; charset="UTF-8"

{{html_message}}

--boundary123--
```

## Troubleshooting

### Problem: Email shows raw HTML code

**Solution 1: Update Content-Type**
- Set `Content-Type: text/html; charset=UTF-8`
- Save and test again

**Solution 2: Check variable names**
- Make sure variables use double braces: `{{variable_name}}`
- Check for typos in variable names

**Solution 3: Create new template**
If editing existing template doesn't work:
1. Create completely new template
2. Name it: `application-confirmation-html`
3. Follow setup above
4. Update `EMAILJS_TEMPLATE_ID` in code:
   ```typescript
   const EMAILJS_TEMPLATE_ID = 'template_new_id_here';
   ```

### Problem: Email not received

**Solutions:**
1. Check **spam/junk folder**
2. Check **EmailJS logs** (Dashboard → Logs)
3. Verify email address is correct
4. Try sending test from dashboard first
5. Check that sender email is whitelisted

### Problem: Variables not replacing

**Check:**
- Variable names match exactly (case-sensitive)
- Using double braces: `{{variable}}`
- No typos in variable names
- Variables defined in template settings
- Template saved successfully

## Email Client Rendering

### Gmail
- ✅ Supports HTML emails perfectly
- ✅ Shows colors, gradients, formatting
- ✅ Mobile responsive

### Outlook
- ✅ Supports most HTML
- ⚠️ Some CSS limitations
- ✅ Gradients work with fallbacks

### Apple Mail
- ✅ Full HTML support
- ✅ Shows all styling

### Mobile Email Clients
- ✅ Our template is mobile-responsive
- ✅ Includes media queries
- ✅ Text resizes properly

## Testing Checklist

After updating template, test by:

```
✅ Check EmailJS dashboard → Settings
   - Service configured correctly
   - Email verified
   - API working

✅ Check Template
   - Variables defined
   - Content type set
   - Contains {{html_message}}
   - Saved successfully

✅ Test Email
   - Send test from dashboard
   - Check HTML rendering
   - Check on mobile device
   - Check in spam folder

✅ App Test
   - npm run dev
   - Apply to job in HireLift
   - Check email received
   - Verify beautiful formatting
```

## Support Resources

- **EmailJS Docs:** https://www.emailjs.com/docs/
- **Email Template Guide:** https://www.emailjs.com/docs/service/gmail/
- **HTML Email Best Practices:** https://www.campaignmonitor.com/guides/
- **Email Rendering Tools:** https://www.emailonacid.com/

## Success Indicators

When configured correctly, you'll see:

```
✅ Professional gradient purple header
✅ White content area with rounded corners
✅ Job details in light blue card
✅ Timeline with numbered circles (1-4)
✅ Checkmark bullets for action items
✅ Pro tip section with styled box
✅ Stats grid with 3 boxes
✅ Purple button "View Your Applications"
✅ Professional footer with links
✅ Mobile responsive on small screens
```

---

**Questions?** Check the HTML template source in `generateApplicationConfirmationHTML()` in `services/emailService.ts`
