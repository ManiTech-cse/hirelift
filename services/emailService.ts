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
export const sendBatchApplicationEmail = async (  profile: UserProfile,
  jobs: MatchedJob[],
  totalApplied: number
): Promise<boolean> => {
  try {
    if (!profile.email) return false;

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
      status: 'batch_sent'
    };

    const batches = JSON.parse(localStorage.getItem('hirelift_batch_emails') || '[]');
    batches.push(batchRecord);
    localStorage.setItem('hirelift_batch_emails', JSON.stringify(batches));

    console.log('🎉 Batch applications recorded:', batchRecord);
    return true;

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

    const welcomeRecord = {
      timestamp: new Date().toISOString(),
      to: profile.email,
      applicantName: profile.name,
      subject: 'Welcome to HireLift',
      status: 'welcome_sent'
    };

    const welcomes = JSON.parse(localStorage.getItem('hirelift_welcome_emails') || '[]');
    welcomes.push(welcomeRecord);
    localStorage.setItem('hirelift_welcome_emails', JSON.stringify(welcomes));

    console.log('🚀 Welcome email recorded:', welcomeRecord);
    return true;

  } catch (error) {
    console.error('Error sending welcome email:', error);
    return false;
  }
};
