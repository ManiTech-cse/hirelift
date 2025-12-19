// Company database with logos and career pages
export interface CompanyInfo {
  name: string;
  logo: string;
  careersUrl: string;
  category: 'enterprise' | 'startup' | 'tech-giant' | 'fintech' | 'ecommerce' | 'healthcare' | 'education';
}

export const COMPANY_DATABASE: Record<string, CompanyInfo> = {
  // Tech Giants
  'Google': {
    name: 'Google',
    logo: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"%3E%3Crect fill="%234285F4" width="64" height="64" rx="8"/%3E%3Ctext x="32" y="40" font-size="28" font-weight="bold" text-anchor="middle" fill="white"%3EG%3C/text%3E%3C/svg%3E',
    careersUrl: 'https://careers.google.com/',
    category: 'tech-giant'
  },
  'Microsoft': {
    name: 'Microsoft',
    logo: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"%3E%3Crect fill="%23CCCCCC" width="32" height="32" x="0" y="0"/%3E%3Crect fill="%237FBA00" width="32" height="32" x="32" y="0"/%3E%3Crect fill="%230078D4" width="32" height="32" x="0" y="32"/%3E%3Crect fill="%23FFB900" width="32" height="32" x="32" y="32"/%3E%3C/svg%3E',
    careersUrl: 'https://careers.microsoft.com/',
    category: 'tech-giant'
  },
  'Apple': {
    name: 'Apple',
    logo: 'https://www.apple.com/favicon.ico',
    careersUrl: 'https://www.apple.com/careers/',
    category: 'tech-giant'
  },
  'Amazon': {
    name: 'Amazon',
    logo: 'https://www.amazon.com/favicon.ico',
    careersUrl: 'https://www.amazon.jobs/',
    category: 'tech-giant'
  },
  'Meta': {
    name: 'Meta',
    logo: 'https://www.meta.com/favicon.ico',
    careersUrl: 'https://www.metacareers.com/',
    category: 'tech-giant'
  },

  // Indian IT Consulting Giants
  'Wipro': {
    name: 'Wipro',
    logo: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"%3E%3Crect fill="%23003366" width="64" height="64" rx="8"/%3E%3Ctext x="32" y="40" font-size="24" font-weight="bold" text-anchor="middle" fill="white"%3EW%3C/text%3E%3C/svg%3E',
    careersUrl: 'https://careers.wipro.com/',
    category: 'enterprise'
  },
  'TCS': {
    name: 'TCS',
    logo: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"%3E%3Crect fill="%23004B87" width="64" height="64" rx="8"/%3E%3Ctext x="32" y="40" font-size="22" font-weight="bold" text-anchor="middle" fill="white"%3ETCS%3C/text%3E%3C/svg%3E',
    careersUrl: 'https://www.tcs.com/careers',
    category: 'enterprise'
  },
  'Infosys': {
    name: 'Infosys',
    logo: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"%3E%3Crect fill="%2300ADA7" width="64" height="64" rx="8"/%3E%3Ctext x="32" y="40" font-size="20" font-weight="bold" text-anchor="middle" fill="white"%3EIN%3C/text%3E%3C/svg%3E',
    careersUrl: 'https://www.infosys.com/careers/',
    category: 'enterprise'
  },
  'Cognizant': {
    name: 'Cognizant',
    logo: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"%3E%3Crect fill="%230066B2" width="64" height="64" rx="8"/%3E%3Ctext x="32" y="40" font-size="20" font-weight="bold" text-anchor="middle" fill="white"%3ECog%3C/text%3E%3C/svg%3E',
    careersUrl: 'https://careers.cognizant.com/',
    category: 'enterprise'
  },
  'Accenture': {
    name: 'Accenture',
    logo: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"%3E%3Crect fill="%23A100F2" width="64" height="64" rx="8"/%3E%3Ctext x="32" y="40" font-size="20" font-weight="bold" text-anchor="middle" fill="white"%3EA%3C/text%3E%3C/svg%3E',
    careersUrl: 'https://www.accenture.com/us-en/careers',
    category: 'enterprise'
  },
  'HCL Technologies': {
    name: 'HCL Technologies',
    logo: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"%3E%3Crect fill="%234A90E2" width="64" height="64" rx="8"/%3E%3Ctext x="32" y="40" font-size="16" font-weight="bold" text-anchor="middle" fill="white"%3EHCL%3C/text%3E%3C/svg%3E',
    careersUrl: 'https://www.hcltech.com/careers',
    category: 'enterprise'
  },

  // Other Major Tech Companies
  'IBM': {
    name: 'IBM',
    logo: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"%3E%3Crect fill="%23054ADA" width="64" height="64" rx="8"/%3E%3Crect fill="%23054ADA" width="8" height="32" x="10" y="16"/%3E%3Crect fill="%23054ADA" width="8" height="32" x="22" y="16"/%3E%3Crect fill="%23054ADA" width="8" height="32" x="34" y="16"/%3E%3Crect fill="%23054ADA" width="8" height="32" x="46" y="16"/%3E%3C/svg%3E',
    careersUrl: 'https://www.ibm.com/careers/',
    category: 'tech-giant'
  },
  'Intel': {
    name: 'Intel',
    logo: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"%3E%3Crect fill="%230071C5" width="64" height="64" rx="8"/%3E%3Ctext x="32" y="40" font-size="20" font-weight="bold" text-anchor="middle" fill="white"%3E∫%3C/text%3E%3C/svg%3E',
    careersUrl: 'https://www.intel.com/content/www/us/en/careers/careers-home.html',
    category: 'tech-giant'
  },
  'Nvidia': {
    name: 'Nvidia',
    logo: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"%3E%3Crect fill="%23000000" width="64" height="64" rx="8"/%3E%3Ctext x="32" y="40" font-size="24" font-weight="bold" text-anchor="middle" fill="%2376B900"%3EN%3C/text%3E%3C/svg%3E',
    careersUrl: 'https://www.nvidia.com/en-us/about-nvidia/careers/',
    category: 'tech-giant'
  },
  'Qualcomm': {
    name: 'Qualcomm',
    logo: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"%3E%3Crect fill="%233953DC" width="64" height="64" rx="8"/%3E%3Ctext x="32" y="40" font-size="18" font-weight="bold" text-anchor="middle" fill="white"%3EQcom%3C/text%3E%3C/svg%3E',
    careersUrl: 'https://www.qualcomm.com/company/careers',
    category: 'enterprise'
  },
  'Cisco': {
    name: 'Cisco',
    logo: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"%3E%3Crect fill="%231BA0D7" width="64" height="64" rx="8"/%3E%3Ctext x="32" y="40" font-size="24" font-weight="bold" text-anchor="middle" fill="white"%3EC%3C/text%3E%3C/svg%3E',
    careersUrl: 'https://www.cisco.com/c/en/us/about/careers.html',
    category: 'enterprise'
  },

  // E-commerce & Retail
  'Flipkart': {
    name: 'Flipkart',
    logo: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"%3E%3Crect fill="%23FFCC00" width="64" height="64" rx="8"/%3E%3Ctext x="32" y="40" font-size="20" font-weight="bold" text-anchor="middle" fill="%23126DFF"%3EF%3C/text%3E%3C/svg%3E',
    careersUrl: 'https://www.flipkart.com/careers',
    category: 'ecommerce'
  },
  'Myntra': {
    name: 'Myntra',
    logo: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"%3E%3Crect fill="%23EE5A24" width="64" height="64" rx="8"/%3E%3Ctext x="32" y="40" font-size="20" font-weight="bold" text-anchor="middle" fill="white"%3EM%3C/text%3E%3C/svg%3E',
    careersUrl: 'https://www.myntra.com/careers',
    category: 'ecommerce'
  },
  'Shopify': {
    name: 'Shopify',
    logo: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"%3E%3Crect fill="%2396bf48" width="64" height="64" rx="8"/%3E%3Ctext x="32" y="40" font-size="24" font-weight="bold" text-anchor="middle" fill="white"%3ES%3C/text%3E%3C/svg%3E',
    careersUrl: 'https://www.shopify.com/careers',
    category: 'ecommerce'
  },

  // FinTech
  'PayPal': {
    name: 'PayPal',
    logo: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"%3E%3Crect fill="%23003087" width="64" height="64" rx="8"/%3E%3Ctext x="32" y="40" font-size="20" font-weight="bold" text-anchor="middle" fill="%23FFFFFF"%3EP%3C/text%3E%3C/svg%3E',
    careersUrl: 'https://careers.paypal.com/',
    category: 'fintech'
  },
  'Stripe': {
    name: 'Stripe',
    logo: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"%3E%3Crect fill="%23625AFA" width="64" height="64" rx="8"/%3E%3Ctext x="32" y="40" font-size="24" font-weight="bold" text-anchor="middle" fill="white"%3E$%3C/text%3E%3C/svg%3E',
    careersUrl: 'https://stripe.com/jobs',
    category: 'fintech'
  },
  'Square': {
    name: 'Square',
    logo: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"%3E%3Crect fill="%23FFFFFF" width="64" height="64" rx="8" stroke="%23000000" stroke-width="2"/%3E%3Crect fill="%23000000" width="30" height="30" x="17" y="17"/%3E%3C/svg%3E',
    careersUrl: 'https://www.square.com/careers',
    category: 'fintech'
  },
  'HDFC Bank': {
    name: 'HDFC Bank',
    logo: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"%3E%3Crect fill="%230066CC" width="64" height="64" rx="8"/%3E%3Ctext x="32" y="40" font-size="16" font-weight="bold" text-anchor="middle" fill="white"%3EHDFC%3C/text%3E%3C/svg%3E',
    careersUrl: 'https://www.hdfcbank.com/htdocs/Careers',
    category: 'fintech'
  },
  'ICICI Bank': {
    name: 'ICICI Bank',
    logo: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"%3E%3Crect fill="%23004B87" width="64" height="64" rx="8"/%3E%3Ctext x="32" y="40" font-size="16" font-weight="bold" text-anchor="middle" fill="white"%3EICICI%3C/text%3E%3C/svg%3E',
    careersUrl: 'https://www.icicibank.com/careers',
    category: 'fintech'
  },

  // Healthcare
  'Pharmeasy': {
    name: 'PharmEasy',
    logo: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"%3E%3Crect fill="%2335C3EB" width="64" height="64" rx="8"/%3E%3Ctext x="32" y="40" font-size="16" font-weight="bold" text-anchor="middle" fill="white"%3EPE%3C/text%3E%3C/svg%3E',
    careersUrl: 'https://www.pharmeasy.in/careers',
    category: 'healthcare'
  },
  'Teladoc': {
    name: 'Teladoc Health',
    logo: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"%3E%3Crect fill="%2300A3E0" width="64" height="64" rx="8"/%3E%3Ctext x="32" y="40" font-size="16" font-weight="bold" text-anchor="middle" fill="white"%3ETD%3C/text%3E%3C/svg%3E',
    careersUrl: 'https://www.teladochealth.com/careers/',
    category: 'healthcare'
  },

  // Education & EdTech
  'Byju\'s': {
    name: 'Byju\'s',
    logo: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"%3E%3Crect fill="%2300C7FD" width="64" height="64" rx="8"/%3E%3Ctext x="32" y="40" font-size="20" font-weight="bold" text-anchor="middle" fill="white"%3EB%3C/text%3E%3C/svg%3E',
    careersUrl: 'https://www.byjus.com/careers',
    category: 'education'
  },
  'Unacademy': {
    name: 'Unacademy',
    logo: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"%3E%3Crect fill="%23F67924" width="64" height="64" rx="8"/%3E%3Ctext x="32" y="40" font-size="16" font-weight="bold" text-anchor="middle" fill="white"%3EU%3C/text%3E%3C/svg%3E',
    careersUrl: 'https://www.unacademy.com/careers',
    category: 'education'
  },
  'Coursera': {
    name: 'Coursera',
    logo: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"%3E%3Crect fill="%230056D2" width="64" height="64" rx="8"/%3E%3Ctext x="32" y="40" font-size="16" font-weight="bold" text-anchor="middle" fill="white"%3ECour%3C/text%3E%3C/svg%3E',
    careersUrl: 'https://www.coursera.org/careers',
    category: 'education'
  },

  // Startups - India
  'OYO': {
    name: 'OYO',
    logo: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"%3E%3Crect fill="%232C2830" width="64" height="64" rx="8"/%3E%3Ctext x="32" y="40" font-size="24" font-weight="bold" text-anchor="middle" fill="white"%3EO%3C/text%3E%3C/svg%3E',
    careersUrl: 'https://www.oyorooms.com/careers',
    category: 'startup'
  },
  'Ola': {
    name: 'Ola',
    logo: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"%3E%3Crect fill="%23FCC200" width="64" height="64" rx="8"/%3E%3Ctext x="32" y="40" font-size="24" font-weight="bold" text-anchor="middle" fill="%23222"%3EO%3C/text%3E%3C/svg%3E',
    careersUrl: 'https://careers.olacabs.com/',
    category: 'startup'
  },
  'Zomato': {
    name: 'Zomato',
    logo: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"%3E%3Crect fill="%23EF4F5F" width="64" height="64" rx="8"/%3E%3Ctext x="32" y="40" font-size="24" font-weight="bold" text-anchor="middle" fill="white"%3EZ%3C/text%3E%3C/svg%3E',
    careersUrl: 'https://www.zomato.com/careers',
    category: 'startup'
  },
  'Swiggy': {
    name: 'Swiggy',
    logo: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"%3E%3Crect fill="%23FC6E1F" width="64" height="64" rx="8"/%3E%3Ctext x="32" y="40" font-size="24" font-weight="bold" text-anchor="middle" fill="white"%3ES%3C/text%3E%3C/svg%3E',
    careersUrl: 'https://www.swiggy.com/careers',
    category: 'startup'
  },
  'Paytm': {
    name: 'Paytm',
    logo: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"%3E%3Crect fill="%230066B2" width="64" height="64" rx="8"/%3E%3Ctext x="32" y="40" font-size="20" font-weight="bold" text-anchor="middle" fill="white"%3EP%3C/text%3E%3C/svg%3E',
    careersUrl: 'https://www.paytm.com/careers',
    category: 'startup'
  },
  'Razorpay': {
    name: 'Razorpay',
    logo: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"%3E%3Crect fill="%232E5090" width="64" height="64" rx="8"/%3E%3Ctext x="32" y="40" font-size="16" font-weight="bold" text-anchor="middle" fill="white"%3ERazor%3C/text%3E%3C/svg%3E',
    careersUrl: 'https://razorpay.com/careers/',
    category: 'startup'
  },
  'Freshworks': {
    name: 'Freshworks',
    logo: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"%3E%3Crect fill="%2301B075" width="64" height="64" rx="8"/%3E%3Ctext x="32" y="40" font-size="16" font-weight="bold" text-anchor="middle" fill="white"%3EFW%3C/text%3E%3C/svg%3E',
    careersUrl: 'https://www.freshworks.com/careers/',
    category: 'startup'
  },

  // Startups - Global
  'Uber': {
    name: 'Uber',
    logo: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"%3E%3Crect fill="%23000000" width="64" height="64" rx="8"/%3E%3Ctext x="32" y="40" font-size="24" font-weight="bold" text-anchor="middle" fill="white"%3EU%3C/text%3E%3C/svg%3E',
    careersUrl: 'https://www.uber.com/careers',
    category: 'startup'
  },
  'Airbnb': {
    name: 'Airbnb',
    logo: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"%3E%3Crect fill="%23FF5A5F" width="64" height="64" rx="8"/%3E%3Ctext x="32" y="40" font-size="24" font-weight="bold" text-anchor="middle" fill="white"%3EA%3C/text%3E%3C/svg%3E',
    careersUrl: 'https://www.airbnb.com/careers',
    category: 'startup'
  },
  'Spotify': {
    name: 'Spotify',
    logo: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"%3E%3Crect fill="%231DB954" width="64" height="64" rx="8"/%3E%3Ctext x="32" y="40" font-size="24" font-weight="bold" text-anchor="middle" fill="white"%3E♫%3C/text%3E%3C/svg%3E',
    careersUrl: 'https://www.spotify.com/careers/',
    category: 'startup'
  },
  'Slack': {
    name: 'Slack',
    logo: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"%3E%3Crect fill="%23E01E5A" width="64" height="64" rx="8"/%3E%3Ctext x="32" y="40" font-size="24" font-weight="bold" text-anchor="middle" fill="white"%3E%23%3C/text%3E%3C/svg%3E',
    careersUrl: 'https://slack.com/careers',
    category: 'startup'
  },
  'Notion': {
    name: 'Notion',
    logo: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"%3E%3Crect fill="%23000000" width="64" height="64" rx="8"/%3E%3Ctext x="32" y="40" font-size="24" font-weight="bold" text-anchor="middle" fill="white"%3EN%3C/text%3E%3C/svg%3E',
    careersUrl: 'https://www.notion.so/careers',
    category: 'startup'
  },
  'Figma': {
    name: 'Figma',
    logo: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"%3E%3Crect fill="%23F24E1E" width="64" height="64" rx="8"/%3E%3Ctext x="32" y="40" font-size="24" font-weight="bold" text-anchor="middle" fill="white"%3Ef%3C/text%3E%3C/svg%3E',
    careersUrl: 'https://www.figma.com/careers/',
    category: 'startup'
  },
  'Linear': {
    name: 'Linear',
    logo: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"%3E%3Crect fill="%23000000" width="64" height="64" rx="8"/%3E%3Cline x1="16" y1="16" x2="48" y2="48" stroke="white" stroke-width="3"/%3E%3C/svg%3E',
    careersUrl: 'https://linear.app/careers',
    category: 'startup'
  },
  'GitLab': {
    name: 'GitLab',
    logo: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"%3E%3Crect fill="%23FC6D26" width="64" height="64" rx="8"/%3E%3Ctext x="32" y="40" font-size="24" font-weight="bold" text-anchor="middle" fill="white"%3EG%3C/text%3E%3C/svg%3E',
    careersUrl: 'https://about.gitlab.com/jobs/',
    category: 'startup'
  },
  'Hashicorp': {
    name: 'HashiCorp',
    logo: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"%3E%3Crect fill="%23000000" width="64" height="64" rx="8"/%3E%3Ctext x="32" y="40" font-size="20" font-weight="bold" text-anchor="middle" fill="%2317CCEB"%3EHC%3C/text%3E%3C/svg%3E',
    careersUrl: 'https://www.hashicorp.com/careers/',
    category: 'startup'
  },
  'Databricks': {
    name: 'Databricks',
    logo: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"%3E%3Crect fill="%23FF3621" width="64" height="64" rx="8"/%3E%3Ctext x="32" y="40" font-size="20" font-weight="bold" text-anchor="middle" fill="white"%3EDB%3C/text%3E%3C/svg%3E',
    careersUrl: 'https://www.databricks.com/company/careers',
    category: 'startup'
  },
  'Canva': {
    name: 'Canva',
    logo: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"%3E%3Crect fill="%238B5FBF" width="64" height="64" rx="8"/%3E%3Ctext x="32" y="40" font-size="24" font-weight="bold" text-anchor="middle" fill="white"%3EC%3C/text%3E%3C/svg%3E',
    careersUrl: 'https://www.canva.com/careers/',
    category: 'startup'
  },
  'Duolingo': {
    name: 'Duolingo',
    logo: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"%3E%3Crect fill="%231CB0F6" width="64" height="64" rx="8"/%3E%3Ctext x="32" y="40" font-size="24" font-weight="bold" text-anchor="middle" fill="white"%3ED%3C/text%3E%3C/svg%3E',
    careersUrl: 'https://www.duolingo.com/careers',
    category: 'startup'
  },
};

/**
 * Get company info by name (case-insensitive)
 */
export const getCompanyInfo = (companyName: string): CompanyInfo | undefined => {
  // Try exact match first
  if (COMPANY_DATABASE[companyName]) {
    return COMPANY_DATABASE[companyName];
  }
  
  // Try case-insensitive match
  const key = Object.keys(COMPANY_DATABASE).find(
    k => k.toLowerCase() === companyName.toLowerCase()
  );
  
  return key ? COMPANY_DATABASE[key] : undefined;
};

/**
 * Get all companies by category
 */
export const getCompaniesByCategory = (category: CompanyInfo['category']): CompanyInfo[] => {
  return Object.values(COMPANY_DATABASE).filter(c => c.category === category);
};
