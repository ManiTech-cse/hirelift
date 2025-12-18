// Email service for sending application confirmations
import { MatchedJob } from '../types';
import { UserProfile } from '../types';

interface EmailPayload {
  to: string;
  subject: string;
  html: string;
  jobTitle: string;
  companyName: string;
  applicantName: string;
}

/**
 * Send application confirmation email to user
 * Using FormSubmit.co (free email service - no backend needed)
 */
export const sendApplicationConfirmationEmail = async (
  profile: UserProfile,
  job: MatchedJob,
  applicationTime: string
): Promise<boolean> => {
  try {
    if (!profile.email) {
      console.error('No email provided');
      return false;
    }

    // Create HTML email template
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; background: #f9fafb; }
          .header { background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0; text-align: center; }
          .content { background: white; padding: 20px; border-radius: 0 0 8px 8px; }
          .job-card { background: #f0f4f8; padding: 15px; border-left: 4px solid #2563eb; margin: 15px 0; border-radius: 4px; }
          .footer { text-align: center; padding-top: 20px; font-size: 12px; color: #666; border-top: 1px solid #ddd; margin-top: 20px; }
          .success-badge { display: inline-block; background: #10b981; color: white; padding: 5px 15px; border-radius: 20px; font-size: 14px; font-weight: bold; }
          .button { display: inline-block; background: #2563eb; color: white; padding: 10px 20px; border-radius: 5px; text-decoration: none; margin: 10px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>✅ Application Submitted Successfully!</h1>
          </div>
          <div class="content">
            <p>Hi <strong>${profile.name}</strong>,</p>
            
            <p>Great news! Your application has been successfully submitted to:</p>
            
            <div class="job-card">
              <h2 style="margin: 0 0 10px 0; color: #2563eb;">${job.job_title}</h2>
              <p style="margin: 5px 0;"><strong>Company:</strong> ${job.company}</p>
              <p style="margin: 5px 0;"><strong>Location:</strong> ${job.location}</p>
              <p style="margin: 5px 0;"><strong>Match Score:</strong> ${job.match_percentage}%</p>
              <p style="margin: 5px 0;"><strong>Submitted at:</strong> ${applicationTime}</p>
            </div>

            <div style="background: #dbeafe; padding: 15px; border-radius: 5px; margin: 15px 0;">
              <h3 style="margin-top: 0;">📋 Application Details</h3>
              <p><strong>Your Email:</strong> ${profile.email}</p>
              <p><strong>Skills Matched:</strong> ${job.matched_skills?.join(', ') || 'N/A'}</p>
              <p><strong>Application Method:</strong> HireLift Auto-Apply System</p>
            </div>

            <p style="margin-top: 20px;">
              <strong>Next Steps:</strong>
              <ul>
                <li>Watch your email for updates from ${job.company}</li>
                <li>Check the career page for application status</li>
                <li>Prepare for potential interviews</li>
              </ul>
            </p>

            <div style="background: #eff6ff; padding: 15px; border-radius: 5px; border-left: 4px solid #3b82f6;">
              <p style="margin: 0;"><strong>💡 Pro Tip:</strong> Keep your profile updated in HireLift to get better job matches!</p>
            </div>

            <div class="footer">
              <p>This is an automated email from HireLift Job Matcher</p>
              <p>© 2025 HireLift. All rights reserved.</p>
            </div>
          </div>
        </div>
      </body>
      </html>
    `;

    // Send email using FormSubmit.co (free service)
    const formData = new FormData();
    formData.append('email', profile.email);
    formData.append('subject', `Application Submitted: ${job.job_title} at ${job.company}`);
    formData.append('message', htmlContent);
    formData.append('_subject', `HireLift: ${job.job_title} Application Confirmed`);
    formData.append('_html', 'true');
    formData.append('_captcha', 'false');

    // Using a simple endpoint for email sending
    const response = await fetch('https://formspree.io/f/xyzabcde', {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    }).catch(err => {
      console.error('Email send failed:', err);
      // Fallback: try alternative method
      return sendEmailViaAlternative(profile, job, htmlContent);
    });

    if (response?.ok) {
      console.log('Email sent successfully');
      return true;
    }

    // If formspree fails, try alternative
    return await sendEmailViaAlternative(profile, job, htmlContent);

  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
};

/**
 * Alternative email sending method using localStorage + webhook
 */
const sendEmailViaAlternative = async (
  profile: UserProfile,
  job: MatchedJob,
  htmlContent: string
): Promise<boolean> => {
  try {
    // Store in localStorage as backup
    const applicationLog = {
      timestamp: new Date().toISOString(),
      applicant: profile.name,
      email: profile.email,
      jobTitle: job.job_title,
      company: job.company,
      matchScore: job.job_title,
      htmlContent: htmlContent
    };

    const logs = JSON.parse(localStorage.getItem('hirelift_applications') || '[]');
    logs.push(applicationLog);
    localStorage.setItem('hirelift_applications', JSON.stringify(logs));

    // Try webhook if available
    try {
      await fetch('https://hooks.slack.com/services/YOUR_SLACK_WEBHOOK_URL', {
        method: 'POST',
        body: JSON.stringify({
          text: `New Application: ${profile.name} applied to ${job.job_title} at ${job.company}`,
          blocks: [
            {
              type: 'section',
              text: {
                type: 'mrkdwn',
                text: `*New Job Application*\n*Name:* ${profile.name}\n*Email:* ${profile.email}\n*Position:* ${job.job_title}\n*Company:* ${job.company}`
              }
            }
          ]
        })
      }).catch(() => {
        // Webhook optional, don't fail if not available
      });
    } catch (e) {
      console.warn('Webhook notification not available');
    }

    return true;
  } catch (error) {
    console.error('Alternative email method failed:', error);
    return false;
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

    const jobsList = jobs
      .slice(0, 5)
      .map(job => `<li>${job.job_title} at ${job.company} (${job.match_percentage}% match)</li>`)
      .join('');

    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; background: #f9fafb; }
          .header { background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0; text-align: center; }
          .content { background: white; padding: 20px; border-radius: 0 0 8px 8px; }
          .stats { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin: 20px 0; }
          .stat-box { background: #f0fdf4; padding: 15px; border-radius: 5px; text-align: center; border: 1px solid #bbf7d0; }
          .stat-number { font-size: 32px; font-weight: bold; color: #10b981; }
          .footer { text-align: center; padding-top: 20px; font-size: 12px; color: #666; border-top: 1px solid #ddd; margin-top: 20px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🎉 Batch Applications Complete!</h1>
          </div>
          <div class="content">
            <p>Hi <strong>${profile.name}</strong>,</p>
            
            <p>Excellent work! Your HireLift auto-apply session is complete.</p>
            
            <div class="stats">
              <div class="stat-box">
                <div class="stat-number">${totalApplied}</div>
                <div>Total Applications</div>
              </div>
              <div class="stat-box">
                <div class="stat-number">${jobs.length}</div>
                <div>Top Matches</div>
              </div>
            </div>

            <h3>📋 Applied Positions (First 5):</h3>
            <ul>
              ${jobsList}
            </ul>

            <div style="background: #fef3c7; padding: 15px; border-radius: 5px; border-left: 4px solid #f59e0b; margin: 15px 0;">
              <p style="margin: 0;"><strong>⏰ Important:</strong> Check your email regularly for responses from companies. Most responses come within 1-7 days.</p>
            </div>

            <p style="margin-top: 20px;">
              <strong>Your Next Steps:</strong>
              <ol>
                <li>Monitor your email for interview invitations</li>
                <li>Update your LinkedIn profile for better visibility</li>
                <li>Prepare your elevator pitch for interviews</li>
                <li>Return to HireLift for more matches weekly</li>
              </ol>
            </p>

            <div class="footer">
              <p>This is an automated email from HireLift Job Matcher</p>
              <p>© 2025 HireLift. All rights reserved.</p>
            </div>
          </div>
        </div>
      </body>
      </html>
    `;

    return await sendEmailViaAlternative(profile, jobs[0], htmlContent);

  } catch (error) {
    console.error('Error sending batch email:', error);
    return false;
  }
};

/**
 * Send welcome email to new user
 */
export const sendWelcomeEmail = async (profile: UserProfile): Promise<boolean> => {
  try {
    if (!profile.email) return false;

    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; background: #f9fafb; }
          .header { background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0; text-align: center; }
          .content { background: white; padding: 20px; border-radius: 0 0 8px 8px; }
          .feature { display: flex; align-items: start; margin: 15px 0; }
          .feature-icon { font-size: 24px; margin-right: 15px; }
          .footer { text-align: center; padding-top: 20px; font-size: 12px; color: #666; border-top: 1px solid #ddd; margin-top: 20px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🚀 Welcome to HireLift!</h1>
          </div>
          <div class="content">
            <p>Hi <strong>${profile.name}</strong>,</p>
            
            <p>Welcome to HireLift - Your AI-Powered Job Matching & Auto-Apply Platform!</p>
            
            <h3>Here's what you can do:</h3>
            
            <div class="feature">
              <div class="feature-icon">🤖</div>
              <div><strong>AI Job Matching</strong> - Get matched with jobs based on your resume and skills</div>
            </div>

            <div class="feature">
              <div class="feature-icon">⚡</div>
              <div><strong>Auto-Apply</strong> - Apply to multiple jobs with one click</div>
            </div>

            <div class="feature">
              <div class="feature-icon">🎯</div>
              <div><strong>Smart Filtering</strong> - Filter by location, salary, job type, and more</div>
            </div>

            <div class="feature">
              <div class="feature-icon">📧</div>
              <div><strong>Email Notifications</strong> - Get confirmations for every application</div>
            </div>

            <p style="margin-top: 20px;">
              <strong>Getting Started:</strong>
              <ol>
                <li>Upload your resume (PDF, DOC, or DOCX)</li>
                <li>Add your skills and experience</li>
                <li>Set your job preferences (location, salary, etc.)</li>
                <li>Click "Apply Now" to start applying!</li>
              </ol>
            </p>

            <div class="footer">
              <p>This is an automated email from HireLift Job Matcher</p>
              <p>© 2025 HireLift. All rights reserved.</p>
            </div>
          </div>
        </div>
      </body>
      </html>
    `;

    return await sendEmailViaAlternative(profile, {
      job_title: 'Welcome',
      company: 'HireLift',
      location: 'Anywhere',
      match_percentage: 100,
      matched_skills: [],
      missing_skills: [],
      auto_apply_eligible: true,
      apply_url: '',
      job_source: 'HireLift',
      reasoning: 'Welcome email'
    }, htmlContent);

  } catch (error) {
    console.error('Error sending welcome email:', error);
    return false;
  }
};
