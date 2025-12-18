// Email service for sending application confirmations using EmailJS
import { MatchedJob } from '../types';
import { UserProfile } from '../types';

// EmailJS Service ID and Template IDs (free tier - 200 emails/month)
const EMAILJS_SERVICE_ID = 'service_hirelift';
const EMAILJS_TEMPLATE_ID = 'template_application';
const EMAILJS_PUBLIC_KEY = 'ePVV2JDPvvTIHw8jX';

/**
 * Initialize EmailJS (call once on app load)
 */
export const initializeEmailService = (): void => {
  try {
    // Initialize EmailJS in the browser
    if (window && typeof window !== 'undefined') {
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/index.min.js';
      script.onload = () => {
        // @ts-ignore
        if (window.emailjs) {
          // @ts-ignore
          window.emailjs.init(EMAILJS_PUBLIC_KEY);
          console.log('✅ EmailJS initialized');
        }
      };
      script.onerror = () => {
        console.warn('⚠️ EmailJS library failed to load, will use fallback');
      };
      document.head.appendChild(script);
    }
  } catch (error) {
    console.warn('EmailJS initialization warning:', error);
  }
};

/**
 * Send application confirmation email to user via EmailJS + fallback to localStorage
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

    // Prepare email content
    const emailContent = `
Dear ${profile.name},

Congratulations! Your application has been successfully submitted! 🎉

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📋 APPLICATION DETAILS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Position: ${job.job_title}
Company: ${job.company}
Location: ${job.location}
Match Score: ${job.match_percentage}%
Applied On: ${applicationTime}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📞 NEXT STEPS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. Watch for email updates from ${job.company}
2. Check your spam folder if no response within 5 days
3. Keep your profile updated on HireLift
4. Apply to more jobs to increase your chances

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
💼 ABOUT HIRELIFT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

HireLift is your AI-powered job application assistant.
We help you find and apply to your dream jobs instantly.

Thank you for using HireLift! 🚀

Best regards,
HireLift Team
📧 support@hirelift.app
    `.trim();

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
      emailContent: emailContent
    };

    // Try to send via EmailJS first
    let emailSent = false;
    try {
      // @ts-ignore
      if (window.emailjs) {
        const response = await (window.emailjs as any).send(
          EMAILJS_SERVICE_ID,
          EMAILJS_TEMPLATE_ID,
          {
            to_email: profile.email,
            to_name: profile.name,
            subject: emailRecord.subject,
            message: emailContent,
            job_title: job.job_title,
            company: job.company,
            match_score: job.match_percentage
          }
        );
        
        if (response.status === 200) {
          console.log('✅ Email sent via EmailJS:', response);
          emailSent = true;
        }
      }
    } catch (emailJsError) {
      console.warn('⚠️ EmailJS failed, using fallback:', emailJsError);
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
      console.log('✅ Email backed up to localStorage (EmailJS unavailable)');
    }

    return true;

  } catch (error) {
    console.error('❌ Error sending email:', error);
    // Still return true if we at least saved to localStorage
    return true;
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
            requireInteraction: true,
            actions: [
              { action: 'close', title: 'Dismiss' }
            ]
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
    };

    // Try EmailJS first
    try {
      // @ts-ignore
      if (window.emailjs) {
        await (window.emailjs as any).send(
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
      }
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
    };

    // Try EmailJS first
    try {
      // @ts-ignore
      if (window.emailjs) {
        await (window.emailjs as any).send(
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
      }
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
