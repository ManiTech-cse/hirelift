// Email service for sending application confirmations
import { MatchedJob } from '../types';
import { UserProfile } from '../types';

/**
 * Send application confirmation email to user
 * Stores in localStorage + sends desktop notification (client-side only)
 */
export const sendApplicationConfirmationEmail = async (
  profile: UserProfile,
  job: MatchedJob,
  applicationTime: string
): Promise<boolean> => {  try {
    if (!profile.email) {
      console.error('No email provided');
      return false;
    }

    // Log application to localStorage
    const emailRecord = {
      timestamp: applicationTime,
      to: profile.email,
      subject: `Application Submitted: ${job.job_title} at ${job.company}`,
      applicantName: profile.name,
      jobTitle: job.job_title,
      company: job.company,
      location: job.location,
      matchScore: job.match_percentage,
      status: 'confirmed'
    };

    const emails = JSON.parse(localStorage.getItem('hirelift_emails') || '[]');
    emails.push(emailRecord);
    localStorage.setItem('hirelift_emails', JSON.stringify(emails));

    // Send desktop notification
    sendDesktopNotification(profile.name, job.job_title, job.company);

    console.log('✅ Application confirmed:', emailRecord);
    return true;

  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
};

/**
 * Send desktop browser notification
 */
const sendDesktopNotification = (userName: string, jobTitle: string, company: string): void => {
  try {
    if ('Notification' in window) {
      if (Notification.permission === 'granted') {
        new Notification('HireLift - Application Submitted! ✅', {
          body: `${jobTitle} at ${company}`,
          icon: '/favicon.ico',
          tag: 'hirelift-app-' + Date.now(),
          requireInteraction: true
        });
      } else if (Notification.permission !== 'denied') {
        Notification.requestPermission().then(permission => {
          if (permission === 'granted') {
            new Notification('HireLift - Application Submitted! ✅', {
              body: `${jobTitle} at ${company}`,
              icon: '/favicon.ico',
              tag: 'hirelift-app-' + Date.now(),
              requireInteraction: true
            });
          }
        });
      }
    }
  } catch (err) {
    console.warn('Desktop notification not available:', err);
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
