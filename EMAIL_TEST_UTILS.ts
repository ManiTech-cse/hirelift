// Utility file for testing email functionality in browser console

/**
 * Email Testing Utilities
 * 
 * Usage: Copy these functions into your browser console (F12 → Console tab)
 * Then call the functions as needed
 */

// ============================================
// 1. CHECK EMAIL SERVICE STATUS
// ============================================

export const checkEmailStatus = () => {
  console.log('🔍 Checking Email Service Status...\n');

  // Check EmailJS (npm import, not window)
  try {
    // @ts-ignore
    const emailjs = require('@emailjs/browser');
    console.log('✅ EmailJS npm package loaded:', !!emailjs);
  } catch (e) {
    console.log('❌ EmailJS npm package not found');
  }

  // Check LocalStorage
  const emails = localStorage.getItem('hirelift_emails');
  const batches = localStorage.getItem('hirelift_batch_emails');
  const welcomes = localStorage.getItem('hirelift_welcome_emails');

  console.log('✅ LocalStorage - Application Emails:', !!emails);
  console.log('✅ LocalStorage - Batch Emails:', !!batches);
  console.log('✅ LocalStorage - Welcome Emails:', !!welcomes);

  // Check Notification Permission
  const notifPermission = (Notification as any)?.permission || 'unavailable';
  console.log('✅ Notification Permission:', notifPermission);

  console.log('\n📊 Summary:');
  console.log(`Applications stored: ${emails ? JSON.parse(emails).length : 0}`);
  console.log(`Batches stored: ${batches ? JSON.parse(batches).length : 0}`);
  console.log(`Welcomes stored: ${welcomes ? JSON.parse(welcomes).length : 0}`);
};

// ============================================
// 2. VIEW ALL EMAILS
// ============================================

export const viewAllEmails = () => {
  console.log('📧 All Stored Emails:\n');
  
  const emails = JSON.parse(localStorage.getItem('hirelift_emails') || '[]');
  const batches = JSON.parse(localStorage.getItem('hirelift_batch_emails') || '[]');
  const welcomes = JSON.parse(localStorage.getItem('hirelift_welcome_emails') || '[]');
  
  if (welcomes.length > 0) {
    console.log('🎉 Welcome Emails:');
    welcomes.forEach((email: any, i: number) => {
      console.log(`  ${i + 1}. To: ${email.to}`);
      console.log(`     Subject: ${email.subject}`);
      console.log(`     Time: ${email.timestamp}`);
      console.log('');
    });
  }
  
  if (emails.length > 0) {
    console.log('💼 Application Emails:');
    emails.forEach((email: any, i: number) => {
      console.log(`  ${i + 1}. To: ${email.to}`);
      console.log(`     Subject: ${email.subject}`);
      console.log(`     Job: ${email.jobTitle} @ ${email.company}`);
      console.log(`     Match: ${email.matchScore}%`);
      console.log(`     Time: ${email.timestamp}`);
      console.log('');
    });
  }
  
  if (batches.length > 0) {
    console.log('🎯 Batch Emails:');
    batches.forEach((email: any, i: number) => {
      console.log(`  ${i + 1}. To: ${email.to}`);
      console.log(`     Total Apps: ${email.totalApplications}`);
      console.log(`     Time: ${email.timestamp}`);
      console.log('');
    });
  }
  
  if (emails.length === 0 && batches.length === 0 && welcomes.length === 0) {
    console.log('❌ No emails stored yet');
  }
};

// ============================================
// 3. VIEW EMAIL DETAILS
// ============================================

export const viewEmailDetail = (index: number) => {
  const emails = JSON.parse(localStorage.getItem('hirelift_emails') || '[]');
  if (index >= 0 && index < emails.length) {
    const email = emails[index];
    console.log('📧 Email Details:\n');
    console.log(JSON.stringify(email, null, 2));
    console.log('\n📄 Email Content:\n');
    console.log(email.emailContent || 'No content stored');
  } else {
    console.log('❌ Email index out of range');
  }
};

// ============================================
// 4. EXPORT EMAILS
// ============================================

export const exportEmails = () => {
  const emails = JSON.parse(localStorage.getItem('hirelift_emails') || '[]');
  const batches = JSON.parse(localStorage.getItem('hirelift_batch_emails') || '[]');
  const welcomes = JSON.parse(localStorage.getItem('hirelift_welcome_emails') || '[]');
  
  const allEmails = {
    exported_at: new Date().toISOString(),
    total_count: emails.length + batches.length + welcomes.length,
    applications: emails,
    batches: batches,
    welcomes: welcomes
  };
  
  const jsonString = JSON.stringify(allEmails, null, 2);
  
  // Copy to clipboard
  navigator.clipboard.writeText(jsonString);
  console.log('✅ Exported to clipboard!\n');
  console.log('Preview:');
  console.log(jsonString);
  
  return jsonString;
};

// ============================================
// 5. DOWNLOAD EMAILS AS FILE
// ============================================

export const downloadEmails = () => {
  const emails = JSON.parse(localStorage.getItem('hirelift_emails') || '[]');
  const batches = JSON.parse(localStorage.getItem('hirelift_batch_emails') || '[]');
  const welcomes = JSON.parse(localStorage.getItem('hirelift_welcome_emails') || '[]');
  
  const allEmails = {
    exported_at: new Date().toISOString(),
    total_count: emails.length + batches.length + welcomes.length,
    applications: emails,
    batches: batches,
    welcomes: welcomes
  };
  
  const jsonString = JSON.stringify(allEmails, null, 2);
  const blob = new Blob([jsonString], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `hirelift-emails-${new Date().toISOString().split('T')[0]}.json`;
  a.click();
  URL.revokeObjectURL(url);
  
  console.log('✅ Downloaded emails as JSON file');
};

// ============================================
// 6. CLEAR ALL EMAILS
// ============================================

export const clearAllEmails = () => {
  if (confirm('🗑️  Are you sure? This will delete all stored emails.')) {
    localStorage.removeItem('hirelift_emails');
    localStorage.removeItem('hirelift_batch_emails');
    localStorage.removeItem('hirelift_welcome_emails');
    console.log('✅ All emails cleared');
  } else {
    console.log('❌ Clear cancelled');
  }
};

// ============================================
// 7. TEST NOTIFICATION
// ============================================

export const testNotification = () => {
  console.log('📢 Sending test notification...');
  
  if (!('Notification' in window)) {
    console.log('❌ Notifications not supported');
    return;
  }
  
  const permission = (Notification as any).permission;
  
  if (permission === 'granted') {
    new Notification('HireLift - Test Notification', {
      body: 'This is a test notification from HireLift',
      icon: '/favicon.ico',
      badge: '/favicon.ico',
      tag: 'hirelift-test',
      requireInteraction: true
    });
    console.log('✅ Notification sent');
  } else if (permission !== 'denied') {
    Notification.requestPermission().then((perm) => {
      if (perm === 'granted') {
        new Notification('HireLift - Notification Enabled', {
          body: 'Notifications are now enabled for HireLift',
          icon: '/favicon.ico',
          tag: 'hirelift-test',
          requireInteraction: true
        });
        console.log('✅ Notification sent');
      }
    });
  } else {
    console.log('❌ Notifications are blocked');
  }
};

// ============================================
// 8. REQUEST NOTIFICATION PERMISSION
// ============================================

export const requestNotificationPermission = async () => {
  if (!('Notification' in window)) {
    console.log('❌ Notifications not supported');
    return;
  }
  
  const permission = (Notification as any).permission;
  
  if (permission === 'granted') {
    console.log('✅ Notifications already allowed');
  } else if (permission !== 'denied') {
    const result = await Notification.requestPermission();
    console.log(`✅ Permission result: ${result}`);
  } else {
    console.log('❌ Notifications are blocked');
  }
};

// ============================================
// 9. GET EMAIL STATISTICS
// ============================================

export const getEmailStats = () => {
  const emails = JSON.parse(localStorage.getItem('hirelift_emails') || '[]');
  const batches = JSON.parse(localStorage.getItem('hirelift_batch_emails') || '[]');
  const welcomes = JSON.parse(localStorage.getItem('hirelift_welcome_emails') || '[]');
  
  console.log('📊 Email Statistics:\n');
  console.log(`Applications: ${emails.length}`);
  console.log(`Batches: ${batches.length}`);
  console.log(`Welcomes: ${welcomes.length}`);
  console.log(`Total: ${emails.length + batches.length + welcomes.length}`);
  
  if (emails.length > 0) {
    const companies = [...new Set(emails.map((e: any) => e.company))];
    console.log(`\nUnique Companies: ${companies.length}`);
    console.log(`Companies: ${companies.join(', ')}`);
    
    const avgMatch = Math.round(
      emails.reduce((sum: number, e: any) => sum + e.matchScore, 0) / emails.length
    );
    console.log(`Average Match Score: ${avgMatch}%`);
  }
  
  // Storage size
  let totalSize = 0;
  ['hirelift_emails', 'hirelift_batch_emails', 'hirelift_welcome_emails'].forEach(key => {
    const item = localStorage.getItem(key);
    if (item) {
      totalSize += item.length;
    }
  });
  console.log(`\nStorage Used: ${(totalSize / 1024).toFixed(2)} KB`);
};

// ============================================
// 10. QUICK HELP
// ============================================

export const emailTestHelp = () => {
  console.log(`
╔══════════════════════════════════════════════════╗
║     HireLift Email Testing Utilities             ║
╚══════════════════════════════════════════════════╝

📋 Available Commands:

1. checkEmailStatus()
   → Check current email service status

2. viewAllEmails()
   → View all stored emails

3. viewEmailDetail(index)
   → View details of a specific email
   → Example: viewEmailDetail(0)

4. exportEmails()
   → Export emails to clipboard

5. downloadEmails()
   → Download emails as JSON file

6. clearAllEmails()
   → Delete all stored emails

7. testNotification()
   → Send a test notification

8. requestNotificationPermission()
   → Request browser notification permission

9. getEmailStats()
   → Get email statistics

10. emailTestHelp()
    → Show this help menu

📧 Quick Test Flow:
1. Run: checkEmailStatus()
2. Apply to a job in the app
3. Run: viewAllEmails()
4. Check your email inbox
5. Run: getEmailStats()

🐛 Troubleshooting:
- No emails showing? Check if you've applied yet
- Notifications not working? Run requestNotificationPermission()
- Want to start fresh? Run clearAllEmails()

📞 Need help? Check EMAIL_IMPLEMENTATION_GUIDE.md
  `);
};

// Auto-export all functions to window for console access
if (typeof window !== 'undefined') {
  (window as any).emailTest = {
    checkStatus: checkEmailStatus,
    viewAll: viewAllEmails,
    viewDetail: viewEmailDetail,
    export: exportEmails,
    download: downloadEmails,
    clear: clearAllEmails,
    testNotif: testNotification,
    requestNotif: requestNotificationPermission,
    stats: getEmailStats,
    help: emailTestHelp
  };
  
  console.log('💡 Email testing utilities available as emailTest.*');
}

export {};
