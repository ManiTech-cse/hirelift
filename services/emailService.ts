// Email service for sending application confirmations using EmailJS
import emailjs from '@emailjs/browser';
import { MatchedJob } from '../types';
import { UserProfile } from '../types';

// EmailJS Service ID and Template IDs (free tier - 200 emails/month)
const EMAILJS_SERVICE_ID = 'service_myacclb';
const EMAILJS_TEMPLATE_ID = 'template_aip2x14';
const EMAILJS_PUBLIC_KEY = 'WL3GVivI4aLOJM3FP';

// Initialize EmailJS on module load
emailjs.init(EMAILJS_PUBLIC_KEY);
console.log('✅ EmailJS initialized');

/**
 * Generate plain text version of application confirmation for email fallback
 */
const generateApplicationConfirmationText = (
  userName: string,
  job: MatchedJob,
  applicationTime: string
): string => {
  const date = new Date(applicationTime);
  const formattedDate = date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
  const formattedTime = date.toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: true 
  });

  return `
🎉 APPLICATION SUBMITTED!

Hi ${userName},

We're excited to confirm that your application for ${job.job_title} at ${job.company} has been successfully submitted! 🚀

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

JOB DETAILS:
Position: ${job.job_title}
Company: ${job.company}
Location: ${job.location}
Match Score: ${job.match_percentage}%
Applied On: ${formattedDate} at ${formattedTime}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

WHAT HAPPENS NEXT?

1. Application In Review
   Your application is now being reviewed by ${job.company}'s team

2. Initial Screening (1-5 days)
   Recruiters will review your qualifications and experience

3. Interview Stage (if selected)
   You'll be contacted for phone, video, or in-person interviews

4. Final Decision
   Receive offer or feedback from the hiring team

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

ACTION ITEMS FOR YOU:

✓ Keep an eye on your inbox - Watch for emails from ${job.company}
✓ Check spam folder - If no response within 5 days, check your spam/promotions
✓ Update your profile - Keep your HireLift profile fresh and current
✓ Continue applying - Don't stop! Apply to similar positions to increase chances

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

PRO TIP: While waiting for a response, strengthen your candidacy by:
• Following ${job.company} on LinkedIn
• Researching the company culture and values
• Preparing answers to common interview questions
• Practicing your elevator pitch

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

This application has been tracked in your HireLift dashboard. You can view all your applications and track their status anytime.

Questions? Contact us at support@hirelift.app

Best regards,
HireLift Team
Your AI-Powered Job Application Assistant

© 2025 HireLift. All rights reserved.
This is an automated email. Please do not reply directly to this message.
  `.trim();
};

/**
 * Generate professional HTML email template for application confirmation
 */
const generateApplicationConfirmationHTML = (
  userName: string,
  job: MatchedJob,
  applicationTime: string
): string => {
  const date = new Date(applicationTime);
  const formattedDate = date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
  const formattedTime = date.toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: true 
  });

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Application Confirmation</title>
      <style>
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          line-height: 1.6;
          color: #333;
          margin: 0;
          padding: 0;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }
        .email-container {
          max-width: 600px;
          margin: 20px auto;
          background: #fff;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 10px 40px rgba(0,0,0,0.1);
        }
        .header {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          padding: 40px 20px;
          text-align: center;
          color: white;
        }
        .header h1 {
          margin: 0;
          font-size: 32px;
          font-weight: 700;
          text-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .header .subtitle {
          margin: 10px 0 0 0;
          font-size: 16px;
          opacity: 0.95;
          font-weight: 300;
        }
        .success-badge {
          display: inline-block;
          background: #fff;
          color: #667eea;
          padding: 8px 16px;
          border-radius: 25px;
          font-size: 14px;
          font-weight: 600;
          margin-top: 15px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
        .content {
          padding: 40px 30px;
        }
        .greeting {
          font-size: 18px;
          margin-bottom: 30px;
          color: #2c3e50;
        }
        .job-card {
          background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
          border-left: 5px solid #667eea;
          padding: 20px;
          margin: 30px 0;
          border-radius: 8px;
          position: relative;
        }
        .job-title {
          font-size: 22px;
          font-weight: 700;
          color: #2c3e50;
          margin: 0 0 8px 0;
        }
        .company-info {
          font-size: 16px;
          color: #667eea;
          margin: 0;
          font-weight: 600;
        }
        .job-details {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 15px;
          margin-top: 15px;
          padding-top: 15px;
          border-top: 1px solid rgba(102, 126, 234, 0.2);
        }
        .detail-item {
          font-size: 14px;
        }
        .detail-label {
          color: #667eea;
          font-weight: 600;
          display: block;
          margin-bottom: 4px;
        }
        .detail-value {
          color: #555;
          font-size: 15px;
        }
        .match-score {
          display: inline-block;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 8px 16px;
          border-radius: 20px;
          font-weight: 700;
          font-size: 16px;
        }
        .section {
          margin: 30px 0;
        }
        .section-title {
          font-size: 18px;
          font-weight: 700;
          color: #2c3e50;
          margin: 0 0 15px 0;
          padding-bottom: 10px;
          border-bottom: 2px solid #667eea;
          display: inline-block;
        }
        .step-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .step-list li {
          padding: 12px 0;
          padding-left: 35px;
          position: relative;
          color: #555;
          font-size: 15px;
        }
        .step-list li:before {
          content: '';
          position: absolute;
          left: 0;
          top: 15px;
          width: 20px;
          height: 20px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 50%;
          font-size: 12px;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
        }
        .step-list li:nth-child(1):before { content: '1'; }
        .step-list li:nth-child(2):before { content: '2'; }
        .step-list li:nth-child(3):before { content: '3'; }
        .step-list li:nth-child(4):before { content: '4'; }
        .cta-button {
          display: inline-block;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 14px 30px;
          border-radius: 6px;
          text-decoration: none;
          font-weight: 600;
          font-size: 16px;
          margin: 20px 0;
          transition: transform 0.2s, box-shadow 0.2s;
          text-align: center;
          display: block;
          box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
        }
        .cta-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(102, 126, 234, 0.6);
        }
        .tips-box {
          background: #f0f4ff;
          border-left: 4px solid #667eea;
          padding: 15px;
          margin: 20px 0;
          border-radius: 4px;
        }
        .tips-box strong {
          color: #667eea;
        }
        .footer {
          background: #f8f9fa;
          padding: 30px;
          text-align: center;
          border-top: 1px solid #e0e0e0;
          font-size: 14px;
          color: #666;
        }
        .footer-links {
          margin: 15px 0;
        }
        .footer-links a {
          color: #667eea;
          text-decoration: none;
          margin: 0 10px;
          font-weight: 500;
        }
        .timeline {
          margin: 20px 0;
        }
        .timeline-item {
          display: flex;
          margin-bottom: 20px;
          position: relative;
        }
        .timeline-item:not(:last-child):after {
          content: '';
          position: absolute;
          left: 15px;
          top: 35px;
          width: 2px;
          height: 30px;
          background: #e0e0e0;
        }
        .timeline-dot {
          width: 32px;
          height: 32px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: bold;
          flex-shrink: 0;
          margin-right: 15px;
          font-size: 14px;
        }
        .timeline-content {
          flex-grow: 1;
          padding-top: 3px;
        }
        .timeline-title {
          font-weight: 600;
          color: #2c3e50;
          margin-bottom: 4px;
        }
        .timeline-description {
          color: #666;
          font-size: 14px;
        }
        .stats-grid {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 15px;
          margin: 20px 0;
        }
        .stat-box {
          background: #f5f7fa;
          padding: 15px;
          border-radius: 8px;
          text-align: center;
          border-top: 3px solid #667eea;
        }
        .stat-number {
          font-size: 24px;
          font-weight: 700;
          color: #667eea;
        }
        .stat-label {
          font-size: 12px;
          color: #666;
          margin-top: 5px;
          text-transform: uppercase;
          font-weight: 600;
        }
        @media only screen and (max-width: 600px) {
          .email-container {
            margin: 10px;
          }
          .content {
            padding: 25px 20px;
          }
          .job-details {
            grid-template-columns: 1fr;
          }
          .stats-grid {
            grid-template-columns: 1fr;
          }
          .header h1 {
            font-size: 24px;
          }
          .job-title {
            font-size: 18px;
          }
        }
      </style>
    </head>
    <body>
      <div class="email-container">
        <!-- Header -->
        <div class="header">
          <h1>🎉 Application Submitted!</h1>
          <p class="subtitle">Your application has been successfully sent</p>
          <div class="success-badge">✓ Confirmed</div>
        </div>

        <!-- Content -->
        <div class="content">
          <!-- Greeting -->
          <p class="greeting">Hi ${userName},</p>
          <p style="color: #555; font-size: 15px; margin-bottom: 20px;">
            We're excited to confirm that your application for <strong>${job.job_title}</strong> at <strong>${job.company}</strong> has been successfully submitted! 🚀
          </p>

          <!-- Job Card -->
          <div class="job-card">
            <div class="job-title">${job.job_title}</div>
            <div class="company-info">${job.company}</div>
            <div class="job-details">
              <div class="detail-item">
                <span class="detail-label">📍 Location</span>
                <span class="detail-value">${job.location}</span>
              </div>
              <div class="detail-item">
                <span class="detail-label">🎯 Match Score</span>
                <span class="detail-value"><div class="match-score">${job.match_percentage}%</div></span>
              </div>
              <div class="detail-item">
                <span class="detail-label">⏰ Applied</span>
                <span class="detail-value">${formattedDate}</span>
              </div>
              <div class="detail-item">
                <span class="detail-label">🕐 Time</span>
                <span class="detail-value">${formattedTime}</span>
              </div>
            </div>
          </div>

          <!-- Timeline Section -->
          <div class="section">
            <h2 class="section-title">📋 What Happens Next?</h2>
            <div class="timeline">
              <div class="timeline-item">
                <div class="timeline-dot">1</div>
                <div class="timeline-content">
                  <div class="timeline-title">Application In Review</div>
                  <div class="timeline-description">Your application is now being reviewed by ${job.company}'s team</div>
                </div>
              </div>
              <div class="timeline-item">
                <div class="timeline-dot">2</div>
                <div class="timeline-content">
                  <div class="timeline-title">Initial Screening (1-5 days)</div>
                  <div class="timeline-description">Recruiters will review your qualifications and experience</div>
                </div>
              </div>
              <div class="timeline-item">
                <div class="timeline-dot">3</div>
                <div class="timeline-content">
                  <div class="timeline-title">Interview Stage (if selected)</div>
                  <div class="timeline-description">You'll be contacted for phone, video, or in-person interviews</div>
                </div>
              </div>
              <div class="timeline-item">
                <div class="timeline-dot">4</div>
                <div class="timeline-content">
                  <div class="timeline-title">Final Decision</div>
                  <div class="timeline-description">Receive offer or feedback from the hiring team</div>
                </div>
              </div>
            </div>
          </div>

          <!-- Action Items -->
          <div class="section">
            <h2 class="section-title">✅ Action Items for You</h2>
            <ul class="step-list">
              <li><strong>Keep an eye on your inbox</strong> - Watch for emails from ${job.company}</li>
              <li><strong>Check spam folder</strong> - If no response within 5 days, check your spam/promotions</li>
              <li><strong>Update your profile</strong> - Keep your HireLift profile fresh and current</li>
              <li><strong>Continue applying</strong> - Don't stop! Apply to similar positions to increase chances</li>
            </ul>
          </div>

          <!-- Pro Tips -->
          <div class="tips-box">
            <strong>💡 Pro Tip:</strong> While waiting for a response, strengthen your candidacy by:
            <ul style="margin: 10px 0; padding-left: 20px;">
              <li>Following ${job.company} on LinkedIn</li>
              <li>Researching the company culture and values</li>
              <li>Preparing answers to common interview questions</li>
              <li>Practicing your elevator pitch</li>
            </ul>
          </div>

          <!-- Stats -->
          <div class="stats-grid">
            <div class="stat-box">
              <div class="stat-number">${job.match_percentage}%</div>
              <div class="stat-label">Match Score</div>
            </div>
            <div class="stat-box">
              <div class="stat-number">1</div>
              <div class="stat-label">Application Sent</div>
            </div>
            <div class="stat-box">
              <div class="stat-number">🎯</div>
              <div class="stat-label">In Progress</div>
            </div>
          </div>

          <!-- CTA Button -->
          <a href="https://hirelift.app/dashboard" class="cta-button">
            → View Your Applications
          </a>

          <!-- Additional Info -->
          <p style="color: #999; font-size: 13px; margin-top: 20px; text-align: center;">
            This application has been tracked in your HireLift dashboard. You can view all your applications and track their status anytime.
          </p>
        </div>

        <!-- Footer -->
        <div class="footer">
          <strong style="color: #667eea; font-size: 16px;">HireLift</strong> - Your AI-Powered Job Application Assistant
          <div class="footer-links">
            <a href="https://hirelift.app/dashboard">Dashboard</a>
            <a href="https://hirelift.app/about">About</a>
            <a href="https://hirelift.app/resume-builder">Resume Builder</a>
            <a href="https://hirelift.app/linkedin">LinkedIn Optimizer</a>
          </div>
          <p style="margin: 15px 0; color: #999;">
            Questions? Contact us at <strong>support@hirelift.app</strong>
          </p>
          <p style="margin: 15px 0 0 0; color: #bbb; font-size: 12px;">
            © 2025 HireLift. All rights reserved.<br>
            This is an automated email. Please do not reply directly to this message.
          </p>
        </div>
      </div>
    </body>
    </html>
  `.trim();
};

/**
 * Send application confirmation email to user via EmailJS + fallback to localStorage
 * Note: Workday does not provide a public API for sending application confirmation emails directly from their platform. 
 * If you want to send emails through Workday, you must use their enterprise API or integration, which is not possible from a client-side app.
 * The best you can do is send confirmation emails from your own app (as implemented here) or via a backend.
 */
export const sendApplicationConfirmationEmail = async (
  profile: UserProfile,
  job: MatchedJob,
  applicationTime: string
): Promise<boolean> => {
  try {
    if (!profile.email) {
      console.error('❌ No email provided');
      return false;
    }

    // Generate both HTML and text versions
    const htmlContent = generateApplicationConfirmationHTML(profile.name, job, applicationTime);
    const textContent = generateApplicationConfirmationText(profile.name, job, applicationTime);

    const emailRecord = {
      timestamp: applicationTime,
      to: profile.email,
      subject: `✅ Application Confirmed: ${job.job_title} at ${job.company}`,
      applicantName: profile.name,
      jobTitle: job.job_title,
      company: job.company,
      location: job.location,
      matchScore: job.match_percentage,
      status: 'confirmed',
      emailContent: htmlContent
    };

    // Try to send via EmailJS npm package
    let emailSent = false;
    try {
      const response = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          to_email: profile.email,
          to_name: profile.name,
          subject: emailRecord.subject,
          html_message: htmlContent,
          message: textContent,
          job_title: job.job_title,
          company: job.company,
          location: job.location,
          match_score: String(job.match_percentage),
          from_name: 'HireLift Team',
          from_email: 'noreply@hirelift.app'
        },
        EMAILJS_PUBLIC_KEY
      );
      console.log('📤 EmailJS response:', response);
      console.log('📤 Response status:', response.status);
      if (response.status === 200) {
        console.log('✅ Email sent successfully via EmailJS');
        emailSent = true;
      } else {
        console.warn('⚠️ EmailJS returned status:', response.status);
        emailSent = false;
      }
    } catch (emailJsError: any) {
      console.error('❌ EmailJS send error:', emailJsError);
      console.error('❌ Error type:', emailJsError?.status || 'unknown');
      console.error('❌ Error text:', emailJsError?.text || 'no details');
      if (emailJsError?.status === 'failed') {
        console.error('❌ EmailJS response:', emailJsError?.response || 'no response data');
      }
    }

    // Always store in localStorage as backup
    const emails = JSON.parse(localStorage.getItem('hirelift_emails') || '[]');
    emails.push(emailRecord);
    localStorage.setItem('hirelift_emails', JSON.stringify(emails));

    // Send desktop notification
    sendDesktopNotification(profile.name, job.job_title, job.company);

    // Log with emoji indicators
    if (emailSent) {
      console.log('✅ Email sent via EmailJS + backed up to localStorage');
    } else {
      console.log('✅ Email backed up to localStorage (EmailJS unavailable or failed)');
    }

    return emailSent;

  } catch (error) {
    console.error('❌ Error sending email:', error);
    return false;
  }
};

/**
 * Send desktop browser notification with improved UI
 */
const sendDesktopNotification = (userName: string, jobTitle: string, company: string): void => {
  try {
    if ('Notification' in window) {
      const notifyUser = () => {
        try {
          new Notification('🎉 HireLift - Application Submitted!', {
            body: `${jobTitle}\n@ ${company}\n\nCheck your email for confirmation`,
            icon: '/favicon.ico',
            badge: '/favicon.ico',
            tag: 'hirelift-app-' + Date.now(),
            requireInteraction: true
          });
          console.log('✅ Desktop notification sent');
        } catch (notifError) {
          console.warn('Notification send failed:', notifError);
        }
      };

      if (Notification.permission === 'granted') {
        notifyUser();
      } else if (Notification.permission !== 'denied') {
        Notification.requestPermission().then(permission => {
          if (permission === 'granted') {
            notifyUser();
          }
        });
      }
    }
  } catch (err) {
    console.warn('⚠️ Desktop notification system unavailable:', err);
  }
};

/**
 * Send batch confirmation email (multiple jobs applied)
 */
export const sendBatchApplicationEmail = async (
  profile: UserProfile,
  jobs: MatchedJob[],
  totalApplied: number
): Promise<boolean> => {
  try {
    if (!profile.email) return false;

    const jobsList = jobs.slice(0, 5).map(j => 
      `• ${j.job_title} at ${j.company} (${j.match_percentage}% match)`
    ).join('\n');

    const batchEmailContent = `
Dear ${profile.name},

Great news! You've successfully applied to ${totalApplied} job(s) today! 🎯

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🏆 YOUR TOP APPLICATIONS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${jobsList}

${totalApplied > 5 ? `\n... and ${totalApplied - 5} more!\n` : ''}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
💡 PRO TIP
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Apply consistently to increase your chances of landing your dream job.
Check back tomorrow for new matching opportunities!

Happy job hunting! 🚀

Best regards,
HireLift Team
    `.trim();

    const batchRecord = {
      timestamp: new Date().toISOString(),
      to: profile.email,
      applicantName: profile.name,
      totalApplications: totalApplied,
      topMatches: jobs.slice(0, 5).map(j => ({ 
        title: j.job_title, 
        company: j.company, 
        match: j.match_percentage 
      })),
      status: 'batch_sent',
      emailContent: batchEmailContent
    };    // Try EmailJS first
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          to_email: profile.email,
          to_name: profile.name,
          subject: `✅ Batch Application Summary - ${totalApplied} jobs applied!`,
          message: batchEmailContent,
          job_title: `${totalApplied} applications`,
          company: 'HireLift Summary'
        }
      );
      console.log('✅ Batch email sent via EmailJS');
    } catch (emailJsError) {
      console.warn('⚠️ EmailJS batch failed, using localStorage:', emailJsError);
    }

    // Always store backup
    const batches = JSON.parse(localStorage.getItem('hirelift_batch_emails') || '[]');
    batches.push(batchRecord);
    localStorage.setItem('hirelift_batch_emails', JSON.stringify(batches));

    console.log('🎉 Batch applications recorded:', batchRecord);
    return true;

  } catch (error) {
    console.error('❌ Error sending batch email:', error);
    return true; // Still return true if localStorage saved
  }
};

/**
 * Send welcome email to new user
 */
export const sendWelcomeEmail = async (profile: UserProfile): Promise<boolean> => {
  try {
    if (!profile.email) return false;

    const welcomeContent = `
Hi ${profile.name}! 👋

Welcome to HireLift! 🚀

We're excited to have you on board. HireLift is your AI-powered job application assistant that helps you find and apply to your dream jobs instantly.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎯 GETTING STARTED
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. Complete your profile with skills and preferences
2. Let our AI find matching jobs
3. Apply with one click
4. Receive confirmation emails

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✨ FEATURES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✓ AI-powered job matching
✓ Instant applications
✓ Email confirmations
✓ Desktop notifications
✓ Batch applications
✓ Cover letter generation

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Ready to find your dream job? Start applying now!

Best regards,
HireLift Team
📧 support@hirelift.app
    `.trim();

    const welcomeRecord = {
      timestamp: new Date().toISOString(),
      to: profile.email,
      applicantName: profile.name,
      subject: 'Welcome to HireLift! 🚀',
      status: 'welcome_sent',
      emailContent: welcomeContent
    };    // Try EmailJS first
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          to_email: profile.email,
          to_name: profile.name,
          subject: 'Welcome to HireLift! 🚀',
          message: welcomeContent,
          job_title: 'Welcome',
          company: 'HireLift'
        }
      );
      console.log('✅ Welcome email sent via EmailJS');
    } catch (emailJsError) {
      console.warn('⚠️ EmailJS welcome failed, using localStorage:', emailJsError);
    }

    // Always store backup
    const welcomes = JSON.parse(localStorage.getItem('hirelift_welcome_emails') || '[]');
    welcomes.push(welcomeRecord);
    localStorage.setItem('hirelift_welcome_emails', JSON.stringify(welcomes));

    console.log('🚀 Welcome email recorded:', welcomeRecord);
    return true;

  } catch (error) {
    console.error('❌ Error sending welcome email:', error);
    return true; // Still return true if localStorage saved
  }
};

/**
 * Get all stored emails from localStorage
 */
export const getStoredEmails = (): any[] => {
  try {
    const emails = JSON.parse(localStorage.getItem('hirelift_emails') || '[]');
    const batches = JSON.parse(localStorage.getItem('hirelift_batch_emails') || '[]');
    const welcomes = JSON.parse(localStorage.getItem('hirelift_welcome_emails') || '[]');
    return [...welcomes, ...emails, ...batches];
  } catch (error) {
    console.error('Error retrieving stored emails:', error);
    return [];
  }
};

/**
 * Clear all stored emails
 */
export const clearStoredEmails = (): boolean => {
  try {
    localStorage.removeItem('hirelift_emails');
    localStorage.removeItem('hirelift_batch_emails');
    localStorage.removeItem('hirelift_welcome_emails');
    console.log('✅ All stored emails cleared');
    return true;
  } catch (error) {
    console.error('Error clearing emails:', error);
    return false;
  }
};

/**
 * Export emails as JSON for debugging
 */
export const exportEmailsAsJSON = (): string => {
  try {
    const allEmails = getStoredEmails();
    return JSON.stringify(allEmails, null, 2);
  } catch (error) {
    console.error('Error exporting emails:', error);
    return '[]';
  }
};
